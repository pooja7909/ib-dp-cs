import type { IGCSETask, IGCSEUnit } from "../types";
import { IB_TOPICS } from "./ibSyllabus.js";
import { IB_PAPER1_TASKS } from "./ibBankPaper1.js";
import { IB_PAPER2_TASKS } from "./ibBankPaper2.js";

/** Every built-in IB question, grouped into one unit per IB topic (A1-A4, B1-B4, CS). */
export function getIBUnits(): IGCSEUnit[] {
  const all = [...IB_PAPER1_TASKS, ...IB_PAPER2_TASKS];
  return IB_TOPICS.map((t) => ({
    code: t.code,
    title: `${t.code} ${t.title}`,
    spec: t.subtopics.map((s) => s.code).join(", "),
    blurb: t.subtopics.map((s) => s.title + (s.hlOnly ? " (HL)" : "")).join(" · "),
    topicGroup: t.theme,
    paper: t.paper,
    tasks: all.filter((q) => q.unit === t.code).map((q) => ({ ...q, unitName: q.unitName || `${t.code} ${t.title}` })),
  }));
}

export function getAllIBTasks(): IGCSETask[] {
  return getIBUnits().flatMap((u) => u.tasks);
}
