import { IGCSETask, IGCSEUnit } from "../types";
import { ibPaperForUnit } from "./ibTopics";

/** IB DP Computer Science papers: Paper 1 = theme A + case study, Paper 2 = theme B (Python). */
export type IBPaper = "Paper 1" | "Paper 2";

export type Paper2QuestionStyle =
  | "all"
  | "algorithmic_thinking"
  | "trace_debug"
  | "construct_code"
  | "file_processing"
  | "oop"
  | "adt_hl"
  | "past_paper";

export interface QuestionStyleMeta {
  id: Paper2QuestionStyle;
  label: string;
  shortLabel: string;
  badge: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export const PAPER_2_STYLES: Record<Paper2QuestionStyle, QuestionStyleMeta> = {
  all: {
    id: "all",
    label: "All Question Styles",
    shortLabel: "All Styles",
    badge: "All Papers & Topics",
    color: "text-slate-700",
    bgColor: "bg-slate-100",
    borderColor: "border-slate-200",
    description: "Browse all IB DP Computer Science Paper 2 (theme B) questions and uploaded papers.",
  },
  algorithmic_thinking: {
    id: "algorithmic_thinking",
    label: "Algorithmic thinking (no code)",
    shortLabel: "Algorithmic thinking",
    badge: "B1 Algorithmic thinking",
    color: "text-blue-800",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "Problem specifications, flowcharts and step-by-step algorithms answered without writing code (B1).",
  },
  trace_debug: {
    id: "trace_debug",
    label: "Trace tables & debugging",
    shortLabel: "Trace / debug",
    badge: "B2.1.4 Trace & debug",
    color: "text-amber-800",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: "Trace tables, predicting output, finding and fixing errors, exception handling (B2.1).",
  },
  construct_code: {
    id: "construct_code",
    label: "Construct code: functions, searching and sorting",
    shortLabel: "Construct code",
    badge: "B2.3-B2.4 Construct",
    color: "text-purple-800",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    description: "Construct functions, selection and loops, linear/binary search, bubble/selection sort (built-ins may be prohibited).",
  },
  file_processing: {
    id: "file_processing",
    label: "File processing",
    shortLabel: "Files",
    badge: "B2.5 Files",
    color: "text-teal-800",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    description: "Reading, writing and appending text files with open(), readline(), write() and close().",
  },
  oop: {
    id: "oop",
    label: "Object-oriented programming",
    shortLabel: "OOP",
    badge: "B3 OOP",
    color: "text-rose-800",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    description: "Classes, objects, constructors, encapsulation (SL); inheritance, polymorphism and multiple classes (HL).",
  },
  adt_hl: {
    id: "adt_hl",
    label: "Abstract data types (HL)",
    shortLabel: "ADTs (HL)",
    badge: "B4 ADTs (HL)",
    color: "text-indigo-800",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    description: "Linked lists, stacks, queues, binary search trees, sets and hash tables (HL only).",
  },
  past_paper: {
    id: "past_paper",
    label: "Uploaded exam papers",
    shortLabel: "Exam papers",
    badge: "Exam paper",
    color: "text-indigo-800",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    description: "Question sets converted from IB DP Computer Science papers uploaded by teachers.",
  },
};

/**
 * Determines whether a unit belongs to Paper 1 (A1-A4, CS) or Paper 2 (B1-B4).
 */
export function getUnitPaper(unit: IGCSEUnit): IBPaper {
  if (unit.paper === "Paper 1") return "Paper 1";
  if (unit.paper === "Paper 2") return "Paper 2";
  return ibPaperForUnit(unit.code) || "Paper 2";
}

/**
 * Detects the IB Paper 2 style of a task.
 */
export function getPaper2TaskStyle(task: IGCSETask): Paper2QuestionStyle {
  const brief = (task.brief || "").toLowerCase();
  const title = (task.title || "").toLowerCase();
  const starter = (task.starter || "").toLowerCase();
  const unit = task.unit || "";
  const spec = (task.specReference || "").toUpperCase();

  if (task.year || task.session || task.paperTitle) return "past_paper";
  if (unit === "B4" || spec.startsWith("B4")) return "adt_hl";
  if (unit === "B3" || spec.startsWith("B3") || /\bclass\b|__init__|inheritance|polymorphism/.test(brief + starter)) return "oop";
  if (unit === "B1" || spec.startsWith("B1") || brief.includes("flowchart") || brief.includes("without writing code")) return "algorithmic_thinking";
  if (spec.startsWith("B2.5") || brief.includes("file") || brief.includes(".txt") || brief.includes(".csv") || starter.includes("open(")) {
    return "file_processing";
  }
  if (
    task.type === "table" ||
    task.type === "inspect" ||
    spec.startsWith("B2.1.4") ||
    brief.includes("trace") ||
    brief.includes("debug") ||
    brief.includes("error") ||
    title.includes("fix")
  ) {
    return "trace_debug";
  }
  return "construct_code";
}
