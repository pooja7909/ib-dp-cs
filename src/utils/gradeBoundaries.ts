// IB Diploma Programme grades 7 (highest) to 1 (lowest). There is no "U": anything below
// the grade 2 boundary is a grade 1.
export interface GradeBoundaries {
  7: number; // minimum % for grade 7 (e.g. 80)
  6: number; // minimum % for grade 6 (e.g. 68)
  5: number; // minimum % for grade 5 (e.g. 56)
  4: number; // minimum % for grade 4 (e.g. 45)
  3: number; // minimum % for grade 3 (e.g. 34)
  2: number; // minimum % for grade 2 (e.g. 20); below this is grade 1
}

export type GradeTier = "7" | "6" | "5" | "4" | "3" | "2" | "1";

/** Grades from highest to lowest, for tables, charts and exports. */
export const IB_GRADES: GradeTier[] = ["7", "6", "5", "4", "3", "2", "1"];

/** Grades that have their own boundary (grade 1 is everything below grade 2). */
export const IB_BOUNDARY_GRADES: (keyof GradeBoundaries)[] = [7, 6, 5, 4, 3, 2];

export interface GradeBoundaryPreset {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  boundaries: GradeBoundaries;
}

export const IB_STANDARD_BOUNDARIES: GradeBoundaries = {
  7: 80,
  6: 68,
  5: 56,
  4: 45,
  3: 34,
  2: 20,
};

export const DEFAULT_GRADE_BOUNDARIES: GradeBoundaries = IB_STANDARD_BOUNDARIES;

export const GRADE_BOUNDARY_PRESETS: GradeBoundaryPreset[] = [
  {
    id: "standard",
    name: "IB DP Computer Science default",
    shortLabel: "IB default",
    description: "Default percentage boundaries for IB DP Computer Science grades 7-1 (grade 1 is below the grade 2 boundary).",
    boundaries: { ...IB_STANDARD_BOUNDARIES },
  },
  {
    id: "ib_typical_sl",
    name: "IB typical SL",
    shortLabel: "Typical SL",
    description: "Boundaries in line with recent standard level computer science exam papers.",
    boundaries: { 7: 78, 6: 66, 5: 54, 4: 43, 3: 32, 2: 18 },
  },
  {
    id: "ib_typical_hl",
    name: "IB typical HL",
    shortLabel: "Typical HL",
    description: "Boundaries in line with recent higher level computer science exam papers (slightly lower, longer papers).",
    boundaries: { 7: 75, 6: 63, 5: 52, 4: 41, 3: 30, 2: 17 },
  },
  {
    id: "strict_mock",
    name: "Strict",
    shortLabel: "Strict",
    description: "Higher thresholds for internal mocks, to stretch candidates aiming for a 6 or 7.",
    boundaries: { 7: 85, 6: 74, 5: 62, 4: 50, 3: 38, 2: 24 },
  },
  {
    id: "lenient_diagnostic",
    name: "Lenient",
    shortLabel: "Lenient",
    description: "Accessible boundaries for formative tasks, topic tests and early-course diagnostics.",
    boundaries: { 7: 72, 6: 60, 5: 48, 4: 38, 3: 28, 2: 15 },
  },
];

export interface GradeAward {
  grade: GradeTier;
  color: string;
  badgeBg: string;
  textClass: string;
  label: string;
  minPct: number;
  minMarks?: number;
}

/**
 * Boundaries to use: the custom ones when they are valid IB boundaries (7..2), otherwise the
 * default. Older boundaries with keys 9/8 (another grading scale) are ignored.
 */
export const resolveBoundaries = (customBoundaries?: Partial<GradeBoundaries> | Record<string, any> | null): GradeBoundaries => {
  const c: any = customBoundaries || {};
  if (c[9] !== undefined || c[8] !== undefined) return { ...IB_STANDARD_BOUNDARIES };
  const out: any = { ...IB_STANDARD_BOUNDARIES };
  for (const g of IB_BOUNDARY_GRADES) {
    const v = Number(c[g]);
    if (c[g] !== undefined && c[g] !== null && !isNaN(v)) out[g] = v;
  }
  return out as GradeBoundaries;
};

const STYLES: Record<GradeTier, { color: string; badgeBg: string; textClass: string; label: string }> = {
  "7": { color: "bg-emerald-100 text-emerald-800 border-emerald-300", badgeBg: "bg-emerald-500", textClass: "text-emerald-700", label: "Grade 7 (Excellent)" },
  "6": { color: "bg-teal-50 text-teal-700 border-teal-200", badgeBg: "bg-teal-500", textClass: "text-teal-700", label: "Grade 6 (Very good)" },
  "5": { color: "bg-blue-50 text-blue-700 border-blue-200", badgeBg: "bg-blue-500", textClass: "text-blue-700", label: "Grade 5 (Good)" },
  "4": { color: "bg-amber-50 text-amber-700 border-amber-200", badgeBg: "bg-amber-500", textClass: "text-amber-700", label: "Grade 4 (Satisfactory)" },
  "3": { color: "bg-orange-50 text-orange-700 border-orange-200", badgeBg: "bg-orange-500", textClass: "text-orange-700", label: "Grade 3 (Mediocre)" },
  "2": { color: "bg-orange-100 text-orange-800 border-orange-300", badgeBg: "bg-orange-400", textClass: "text-orange-800", label: "Grade 2 (Poor)" },
  "1": { color: "bg-red-50 text-red-700 border-red-200", badgeBg: "bg-red-500", textClass: "text-red-700", label: "Grade 1 (Very poor)" },
};

/** Tailwind classes and label for a grade (e.g. for badges in tables). */
export const gradeStyle = (grade: GradeTier | string) => STYLES[(String(grade) as GradeTier)] || STYLES["1"];

/**
 * Returns the IB grade (7-1) for a percentage, using the given or default boundaries.
 */
export const getIBGrade = (
  pct: number,
  customBoundaries?: Partial<GradeBoundaries> | null,
  maxMarks?: number
): GradeAward => {
  const b = resolveBoundaries(customBoundaries);

  const getMarks = (thresholdPct: number) => {
    if (!maxMarks || maxMarks <= 0) return undefined;
    return Math.ceil((thresholdPct / 100) * maxMarks - 1e-3);
  };

  for (const g of IB_BOUNDARY_GRADES) {
    if (pct >= b[g]) {
      const tier = String(g) as GradeTier;
      return { grade: tier, ...STYLES[tier], minPct: b[g], minMarks: getMarks(b[g]) };
    }
  }
  return { grade: "1", ...STYLES["1"], minPct: 0, minMarks: 0 };
};

/**
 * Validates that grade boundaries are strictly decreasing: 100 >= 7 > 6 > 5 > 4 > 3 > 2 >= 0
 */
export const validateGradeBoundaries = (b: GradeBoundaries): { valid: boolean; error?: string } => {
  const grades = IB_BOUNDARY_GRADES;
  for (let i = 0; i < grades.length; i++) {
    const g = grades[i];
    const val = Number(b[g]);
    if (isNaN(val) || val < 0 || val > 100) {
      return { valid: false, error: `Grade ${g} boundary must be a percentage between 0 and 100.` };
    }
    if (i > 0) {
      const prevGrade = grades[i - 1];
      const prevVal = Number(b[prevGrade]);
      if (val >= prevVal) {
        return {
          valid: false,
          error: `Grade ${prevGrade} boundary (${prevVal}%) must be strictly higher than Grade ${g} boundary (${val}%).`,
        };
      }
    }
  }
  return { valid: true };
};

/**
 * Checks whether the given boundaries differ from the default IB boundaries
 */
export const isCustomBoundaries = (boundaries?: GradeBoundaries | null): boolean => {
  if (!boundaries) return false;
  const b = resolveBoundaries(boundaries);
  return IB_BOUNDARY_GRADES.some((g) => b[g] !== IB_STANDARD_BOUNDARIES[g]);
};

/**
 * Formats a boundary interval string (e.g. "80%+" or "68-79%"; grade 1 is "<20%")
 */
export const formatBoundaryRange = (grade: GradeTier, boundaries: GradeBoundaries, maxMarks?: number): string => {
  const b = resolveBoundaries(boundaries);
  const numGrade = Number(grade);

  if (grade === "7") {
    const min = b[7];
    if (maxMarks && maxMarks > 0) {
      const minM = Math.ceil((min / 100) * maxMarks - 1e-3);
      return `${min}%+ (${minM}/${maxMarks} marks)`;
    }
    return `${min}%+`;
  }

  if (grade === "1") {
    const g2 = b[2];
    if (maxMarks && maxMarks > 0) {
      const maxM = Math.max(0, Math.ceil((g2 / 100) * maxMarks - 1e-3) - 1);
      return `<${g2}% (0–${maxM} marks)`;
    }
    return `<${g2}%`;
  }

  const min = b[numGrade as keyof GradeBoundaries] ?? 0;
  const nextHigherGrade = (numGrade + 1) as keyof GradeBoundaries;
  const max = b[nextHigherGrade] - 1;

  if (maxMarks && maxMarks > 0) {
    const minM = Math.ceil((min / 100) * maxMarks - 1e-3);
    const maxM = Math.max(minM, Math.ceil((b[nextHigherGrade] / 100) * maxMarks - 1e-3) - 1);
    return `${min}%–${max}% (${minM}–${maxM} marks)`;
  }
  return `${min}%–${max}%`;
};
