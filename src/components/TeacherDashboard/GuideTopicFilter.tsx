import React, { useMemo } from "react";
import { IB_TOPICS, IB_TOPIC_MAP, IB_STATEMENT_MAP } from "../../data/ibSyllabus";
import type { IGCSETask } from "../../types";

/** Guide-topic filter: topic (A1..CS) -> subtopic (A1.1) -> understanding statement (A1.1.1). "" = any. */
export interface GuideFilterValue {
  topic: string;
  subtopic: string;
  statement: string;
}

export const EMPTY_GUIDE_FILTER: GuideFilterValue = { topic: "", subtopic: "", statement: "" };

type RefTask = Pick<IGCSETask, "unit" | "specReference">;

const refOf = (t: RefTask) => String(t.specReference || "").trim();

/** True when the question's specReference belongs to the chosen subtopic (e.g. "A2.2" matches "A2.2.4" and "A2.2"). */
function inSubtopic(t: RefTask, sub: string): boolean {
  const ref = refOf(t);
  if (sub === "CS") return t.unit === "CS" || ref === "CS";
  return ref === sub || ref.startsWith(sub + ".");
}

export function matchesGuideFilter(t: RefTask, v: GuideFilterValue): boolean {
  if (v.statement) return refOf(t) === v.statement;
  if (v.subtopic) return inSubtopic(t, v.subtopic);
  if (v.topic) return t.unit === v.topic;
  return true;
}

/** Small badge with the question's guide statement code; the short statement text is the tooltip. */
export const StatementBadge: React.FC<{ task: RefTask; className?: string }> = ({ task, className }) => {
  const ref = refOf(task);
  if (!ref) return null;
  const st = IB_STATEMENT_MAP[ref];
  return (
    <span
      data-testid="statement-badge"
      title={st ? `${st.code} ${st.text}${st.hlOnly ? " (HL only)" : ""}` : `${ref} (not a single guide statement)`}
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
        st ? "bg-sky-50 text-sky-800 border-sky-200" : "bg-slate-100 text-slate-600 border-slate-300"
      } ${className || ""}`}
    >
      {ref}
    </span>
  );
};

interface Props {
  value: GuideFilterValue;
  onChange: (v: GuideFilterValue) => void;
  /** Questions that pass every other filter; used for the counts shown next to each entry. */
  tasks: RefTask[];
  /** Hide the statement chip list (compact mode). */
  compact?: boolean;
}

export const GuideTopicFilter: React.FC<Props> = ({ value, onChange, tasks, compact }) => {
  const counts = useMemo(() => {
    const byRef: Record<string, number> = {};
    const byUnit: Record<string, number> = {};
    for (const t of tasks) {
      const r = refOf(t);
      byRef[r] = (byRef[r] || 0) + 1;
      byUnit[t.unit] = (byUnit[t.unit] || 0) + 1;
    }
    const sub = (code: string) => tasks.filter((t) => inSubtopic(t, code)).length;
    const subCounts: Record<string, number> = {};
    for (const tp of IB_TOPICS) for (const s of tp.subtopics) subCounts[s.code] = sub(s.code);
    return { byRef, byUnit, subCounts };
  }, [tasks]);

  const topic = value.topic && IB_TOPIC_MAP[value.topic] ? IB_TOPIC_MAP[value.topic] : null;
  const subtopic = topic?.subtopics.find((s) => s.code === value.subtopic) || null;
  const statements = subtopic ? subtopic.statements : topic ? topic.subtopics.flatMap((s) => s.statements) : [];
  const stmtCount = (code: string) => (code === "CS" ? counts.subCounts.CS || 0 : counts.byRef[code] || 0);

  const sel = "text-xs py-1.5 px-2 border border-slate-200 rounded-lg bg-white font-semibold text-slate-800 normal-case tracking-normal min-w-0 w-full";
  const lab = "flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 min-w-0";

  return (
    <div className="space-y-2" data-testid="guide-topic-filter">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <label className={lab}>
          Guide topic
          <select
            data-testid="guide-topic"
            value={value.topic}
            onChange={(e) => onChange({ topic: e.target.value, subtopic: "", statement: "" })}
            className={sel}
          >
            <option value="">All topics</option>
            {IB_TOPICS.map((t) => (
              <option key={t.code} value={t.code}>
                {t.code} {t.title} ({counts.byUnit[t.code] || 0})
              </option>
            ))}
          </select>
        </label>
        <label className={lab}>
          Subtopic
          <select
            data-testid="guide-subtopic"
            value={value.subtopic}
            disabled={!topic}
            onChange={(e) => onChange({ ...value, subtopic: e.target.value, statement: "" })}
            className={`${sel} disabled:bg-slate-100 disabled:text-slate-400`}
          >
            <option value="">{topic ? `All subtopics of ${topic.code}` : "Choose a topic first"}</option>
            {topic?.subtopics.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} {s.title}
                {s.hlOnly ? " (HL)" : ""} ({counts.subCounts[s.code] || 0})
              </option>
            ))}
          </select>
        </label>
        <label className={lab}>
          Statement
          <select
            data-testid="guide-statement"
            value={value.statement}
            disabled={!topic}
            onChange={(e) => {
              const code = e.target.value;
              const st = IB_STATEMENT_MAP[code];
              onChange({ ...value, statement: code, subtopic: st ? st.subtopic : value.subtopic });
            }}
            className={`${sel} disabled:bg-slate-100 disabled:text-slate-400`}
          >
            <option value="">{topic ? "All statements" : "Choose a topic first"}</option>
            {statements.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} {s.text}
                {s.hlOnly ? " (HL)" : ""} ({stmtCount(s.code)})
              </option>
            ))}
          </select>
        </label>
      </div>
      {!compact && topic && statements.length > 0 && (
        <div className="flex flex-wrap gap-1.5" data-testid="guide-statement-chips">
          {statements.map((s) => {
            const n = stmtCount(s.code);
            const active = value.statement === s.code;
            return (
              <button
                key={s.code}
                type="button"
                title={`${s.code} ${s.text}${s.hlOnly ? " (HL only)" : ""} - ${n} question${n === 1 ? "" : "s"}`}
                onClick={() =>
                  onChange(active ? { ...value, statement: "" } : { ...value, statement: s.code, subtopic: IB_STATEMENT_MAP[s.code]?.subtopic || value.subtopic })
                }
                className={`max-w-full text-left px-2 py-1 rounded-lg border text-[11px] leading-tight transition-colors ${
                  active
                    ? "bg-sky-700 text-white border-sky-700"
                    : n === 0
                    ? "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-sky-50"
                }`}
              >
                <span className="font-mono font-bold">{s.code}</span> <span className="break-words">{s.text}</span>
                {s.hlOnly && <span className={`ml-1 font-extrabold ${active ? "text-sky-100" : "text-indigo-700"}`}>HL</span>}
                <span className={`ml-1 font-bold ${active ? "text-white" : "text-slate-500"}`}>({n})</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
