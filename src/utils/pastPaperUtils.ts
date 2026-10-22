import { IGCSETask, IGCSEUnit } from "../types";

export interface PastPaperGroup {
  id: string; // e.g. "uploaded_ib_dp_cs_may_2027_paper_2_hl", "paper_2027_may"
  seriesLabel: string; // e.g. "May 2027", "November 2027"
  paperTitle: string; // e.g. "IB DP Computer Science May 2027 Paper 2 HL"
  year: number;
  session: string; // "May", "November", "Specimen", "Practice", "Other"
  unitCode?: string;
  tasks: IGCSETask[];
}

/**
 * Robustly checks if a task originates from a past examination paper.
 */
export function isPastPaperTask(task: IGCSETask): boolean {
  if (!task) return false;
  // Note: task.paper ("Paper 1"/"Paper 2") and examBoard are set on EVERY bank question, so
  // they do not mean the question came from a real past paper.
  if (task.paperTitle) return true;
  if (task.year !== undefined && task.year > 2000) return true;
  if (task.session) return true;
  if (task.source && (task.source.paper || task.source.year || task.source.session)) return true;

  const unit = (task.unit || "").toUpperCase();
  if (unit.startsWith("PAST") || unit.startsWith("EXAM")) return true;

  const uName = (task.unitName || "").toLowerCase();
  if (uName.includes("past paper") || uName.includes("past exam")) return true;

  const id = (task.id || "").toLowerCase();
  if (id.startsWith("exam_") || id.startsWith("q_paper_") || id.startsWith("past_")) return true;

  return false;
}

/**
 * The paper name of a question that came from an uploaded paper, e.g.
 * "IB DP Computer Science May 2027 Paper 2 HL" (stored as plain text in task.source).
 */
export function uploadedPaperName(task: IGCSETask): string {
  const src = (task as any)?.source;
  if (typeof src === "string") return src.trim();
  // Older uploads stored the paper details as an object
  if (src && typeof src === "object" && String(task.id || "").startsWith("q_paper_")) {
    return [src.examBoard, src.session, src.year, src.paper].filter(Boolean).join(" ").trim();
  }
  return "";
}

/** Text used when a teacher searches for a question (includes the uploaded paper name). */
export function taskSearchText(task: IGCSETask): string {
  return [
    task.title,
    task.brief,
    task.id,
    task.level,
    task.unitName,
    task.starterFileName,
    task.paperTitle,
    uploadedPaperName(task),
  ]
    .map((x) => String(x || "").toLowerCase())
    .join(" \n ");
}

/**
 * Returns canonical metadata for a past paper task.
 */
export function getPastPaperInfo(task: IGCSETask): {
  year: number;
  session: string;
  seriesLabel: string;
  paperTitle: string;
  groupId: string;
} {
  // A paper the teacher uploaded gets its own folder named after the paper
  // (it is not mixed into the built-in folders, and the year/series come from the upload)
  const uploaded = uploadedPaperName(task);
  if (uploaded && String(task.id || "").startsWith("q_paper_")) {
    const low = uploaded.toLowerCase();
    const y = low.match(/\b(20\d\d)\b/);
    const year = task.year || (y ? parseInt(y[1], 10) : new Date().getFullYear());
    const session = /nov|autumn/.test(low)
      ? "November"
      : /specimen|sample|sams/.test(low)
      ? "Specimen"
      : /mock|practice/.test(low)
      ? "Practice"
      : "May";
    return {
      year,
      session,
      seriesLabel: `${session} ${year} (uploaded)`,
      paperTitle: `${uploaded} (uploaded by you)`,
      groupId: "uploaded_" + low.replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    };
  }

  const text = `${task.paperTitle || ""} ${task.unitName || ""} ${task.title || ""} ${task.unit || ""} ${task.id || ""}`.toLowerCase();

  // Uploaded or Custom past paper. Only look for the year in the paper's own name (not in
  // the question title - "2048 items" is not a year), and never accept a future year.
  const paperText = `${task.paperTitle || ""} ${task.session || ""} ${(task.source && (task.source as any).year) || ""}`;
  const yearMatch = paperText.match(/\b(20[0-4]\d)\b/);
  const thisYear = new Date().getFullYear();
  let detectedYear = task.year || (yearMatch ? parseInt(yearMatch[1], 10) : 0);
  if (!detectedYear || detectedYear > thisYear || detectedYear < 2000) detectedYear = 0;
  if (!detectedYear) {
    return {
      year: 0,
      session: "Other",
      seriesLabel: "Other papers",
      paperTitle: task.paperTitle || task.unitName || "Other exam-style questions",
      groupId: "other_papers_" + String(task.paperTitle || task.unitName || "misc").toLowerCase().replace(/[^a-z0-9]+/g, "_"),
    };
  }
  const session = text.includes("nov") ? "November" : text.includes("specimen") ? "Specimen" : "May";
  const title = task.paperTitle || task.unitName || `IB DP Computer Science paper (${detectedYear})`;

  return {
    year: detectedYear,
    session,
    seriesLabel: `${session} ${detectedYear}`,
    paperTitle: title,
    groupId: `paper_${detectedYear}_${session.toLowerCase()}`,
  };
}

/**
 * Organizes an array of tasks into neat folders grouped by Year & Series.
 */
export function groupPastPapersByYearAndSeries(tasks: IGCSETask[]): PastPaperGroup[] {
  const pastTasks = tasks.filter(isPastPaperTask);
  const map: Record<string, PastPaperGroup> = {};

  for (const t of pastTasks) {
    const info = getPastPaperInfo(t);
    if (!map[info.groupId]) {
      map[info.groupId] = {
        id: info.groupId,
        seriesLabel: info.seriesLabel,
        paperTitle: info.paperTitle,
        year: info.year,
        session: info.session,
        unitCode: t.unit,
        tasks: [],
      };
    }
    map[info.groupId].tasks.push(t);
  }

  // Sort groups descending by year, then by session
  return Object.values(map).sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.session.localeCompare(b.session);
  });
}

// IB topics examined on Paper 1 (theme A + case study). Theme B (B1-B4) is Paper 2 (Python).
export const PAPER1_UNITS = ["A1", "A2", "A3", "A4", "CS"];

/** Which paper a question belongs to: the paper's own name first, then the question, then its topic. */
export function getTaskPaper(task: IGCSETask, unitPaper?: string): "Paper 1" | "Paper 2" {
  const text = `${task.paperTitle || ""} ${typeof (task as any).source === "string" ? (task as any).source : ""}`;
  if (/paper\s*1\b/i.test(text)) return "Paper 1";
  if (/paper\s*2\b/i.test(text)) return "Paper 2";
  if (task.paper === "Paper 1" || task.paper === "Paper 2") return task.paper as any;
  if (unitPaper === "Paper 1" || unitPaper === "Paper 2") return unitPaper as any;
  return PAPER1_UNITS.includes(task.unit) ? "Paper 1" : "Paper 2";
}
