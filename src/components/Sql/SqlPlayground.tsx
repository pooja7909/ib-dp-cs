// A real SQL playground (SQLite in the browser): the tables first (name, columns with types and keys, sample rows),
// then an editor with Run (Ctrl+Enter) and Reset data, and the result grid. Each playground has its own database.
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Database as DbIcon, KeyRound, Link2, Loader2, AlertTriangle, ClipboardPaste } from "lucide-react";
import type { Database } from "sql.js";
import { createDb, describeDb, runSql, type SqlResultSet, type SqlRunOutcome, type SqlValue, type TableInfo } from "./sqlEngine";

const KEYWORDS = new Set(
  (
    "SELECT DISTINCT FROM WHERE AND OR NOT BETWEEN LIKE IN IS NULL ORDER BY GROUP HAVING ASC DESC JOIN INNER LEFT RIGHT OUTER ON AS " +
    "INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE VIEW DROP ALTER ADD PRIMARY KEY FOREIGN REFERENCES BEGIN TRANSACTION COMMIT ROLLBACK " +
    "COUNT SUM AVG AVERAGE MIN MAX ROUND LIMIT CASE WHEN THEN ELSE END INTEGER REAL TEXT VARCHAR CHAR DATE"
  ).split(" ")
);

/** Very small SQL colouring for the editor overlay and read-only code. */
export function colourSql(src: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /('(?:[^']|'')*'?)|(--[^\n]*)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+|.)/g;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(src))) {
    const [t, str, com, num, word] = m;
    if (str) out.push(<span key={i++} className="text-emerald-700">{t}</span>);
    else if (com) out.push(<span key={i++} className="text-slate-400 italic">{t}</span>);
    else if (num) out.push(<span key={i++} className="text-amber-700">{t}</span>);
    else if (word && KEYWORDS.has(word.toUpperCase())) out.push(<span key={i++} className="text-purple-700 font-semibold">{t}</span>);
    else out.push(t);
  }
  return out;
}

const cell = (v: SqlValue) =>
  v === null || v === undefined ? (
    <span className="italic text-slate-400">NULL</span>
  ) : typeof v === "number" && !Number.isInteger(v) ? (
    String(Math.round(v * 1e6) / 1e6)
  ) : (
    String(v)
  );

export const ResultGrid: React.FC<{ result: SqlResultSet; maxHeight?: string; testId?: string; caption?: string }> = ({ result, maxHeight = "18rem", testId, caption }) => (
  <div className="rounded-lg border border-slate-200 bg-white overflow-auto" style={{ maxHeight }} data-testid={testId}>
    <table className="text-xs border-collapse min-w-full">
      <thead className="sticky top-0">
        <tr>
          {result.columns.map((c, i) => (
            <th key={i} className="px-2 py-1.5 bg-slate-100 border-b border-slate-200 text-left font-mono font-bold text-slate-700 whitespace-nowrap">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {result.rows.map((r, ri) => (
          <tr key={ri} className="odd:bg-white even:bg-slate-50">
            {r.map((v, ci) => (
              <td key={ci} className="px-2 py-1 border-b border-slate-100 font-mono text-slate-800 whitespace-nowrap">
                {cell(v)}
              </td>
            ))}
          </tr>
        ))}
        {result.rows.length === 0 && (
          <tr>
            <td colSpan={Math.max(1, result.columns.length)} className="px-2 py-2 text-slate-500 italic">
              No rows
            </td>
          </tr>
        )}
      </tbody>
    </table>
    {caption && <div className="px-2 py-1 text-[11px] text-slate-500 border-t border-slate-100">{caption}</div>}
  </div>
);

export const TablesPanel: React.FC<{ tables: TableInfo[]; changed?: Set<string> }> = ({ tables, changed }) => (
  <div className="space-y-3" data-testid="sql-tables">
    {tables.map((t) => (
      <div key={t.name} className={`rounded-xl border bg-white overflow-hidden ${changed?.has(t.name) ? "border-amber-400 ring-1 ring-amber-200" : "border-slate-200"}`}>
        <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-bold text-slate-900 text-sm inline-flex items-center gap-1.5">
            <DbIcon className="w-4 h-4 text-indigo-600" />
            {t.name}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${t.kind === "view" ? "bg-sky-100 text-sky-800" : "bg-indigo-100 text-indigo-800"}`}>
            {t.kind === "view" ? "view" : "table"}
          </span>
          <span className="text-[11px] text-slate-500">
            {t.rowCount} row{t.rowCount === 1 ? "" : "s"}
          </span>
          {changed?.has(t.name) && <span className="text-[11px] font-bold text-amber-700">changed by your SQL</span>}
        </div>
        <div className="px-3 py-2 flex flex-wrap gap-1.5 border-b border-slate-100">
          {t.columns.map((c) => (
            <span key={c.name} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-mono">
              {c.pk && (
                <span className="inline-flex items-center gap-0.5 px-1 rounded bg-amber-100 text-amber-800 font-bold" title="Primary key">
                  <KeyRound className="w-3 h-3" />
                  PK
                </span>
              )}
              <span className={`font-bold ${c.pk ? "underline" : ""} text-slate-800`}>{c.name}</span>
              {c.type && <span className="text-slate-500">{c.type}</span>}
              {c.fk && (
                <span className="inline-flex items-center gap-0.5 px-1 rounded bg-sky-100 text-sky-800 font-bold" title={`Foreign key referencing ${c.fk}`}>
                  <Link2 className="w-3 h-3" />
                  FK → {c.fk}
                </span>
              )}
            </span>
          ))}
        </div>
        {t.kind === "view" && t.sql && <pre className="px-3 py-1.5 text-[11px] font-mono text-slate-600 whitespace-pre-wrap border-b border-slate-100">{colourSql(t.sql)}</pre>}
        <div className="p-2">
          <ResultGrid result={{ columns: t.columns.map((c) => c.name), rows: t.rows }} maxHeight="14rem" caption={t.rows.length < t.rowCount ? `Showing the first ${t.rows.length} of ${t.rowCount} rows` : undefined} />
        </div>
      </div>
    ))}
  </div>
);

export interface SqlPlaygroundProps {
  setup: string;
  initialQuery?: string;
  /** Controlled query text (optional) */
  query?: string;
  onQueryChange?: (q: string) => void;
  title?: string;
  intro?: React.ReactNode;
  /** Extra buttons next to Run / Reset (e.g. "Check answer") */
  actions?: React.ReactNode;
  /** Shows a "copy into my answer" button */
  onUseQuery?: (q: string) => void;
  useQueryLabel?: string;
  disabled?: boolean;
  /** Collapse the tables panel behind a toggle (it starts open) */
  collapsibleTables?: boolean;
  testId?: string;
}

export const SqlPlayground: React.FC<SqlPlaygroundProps> = ({
  setup,
  initialQuery = "",
  query,
  onQueryChange,
  title = "SQL playground",
  intro,
  actions,
  onUseQuery,
  useQueryLabel = "Copy into my answer",
  disabled,
  collapsibleTables,
  testId = "sql-playground",
}) => {
  const dbRef = useRef<Database | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [loadError, setLoadError] = useState("");
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [changed, setChanged] = useState<Set<string>>(new Set());
  const [ownQuery, setOwnQuery] = useState(initialQuery);
  const [outcome, setOutcome] = useState<SqlRunOutcome | null>(null);
  const [showTables, setShowTables] = useState(true);
  const text = query !== undefined ? query : ownQuery;
  const setText = (q: string) => {
    if (query === undefined) setOwnQuery(q);
    onQueryChange?.(q);
  };
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);

  const fresh = useCallback(async () => {
    try {
      dbRef.current?.close();
    } catch {
      /* ignore */
    }
    dbRef.current = null;
    const db = await createDb(setup);
    dbRef.current = db;
    setTables(describeDb(db));
    setChanged(new Set());
  }, [setup]);

  useEffect(() => {
    let live = true;
    setStatus("loading");
    fresh()
      .then(() => live && setStatus("ready"))
      .catch((e) => {
        if (!live) return;
        setLoadError(String(e?.message || e));
        setStatus("failed");
      });
    return () => {
      live = false;
      try {
        dbRef.current?.close();
      } catch {
        /* ignore */
      }
      dbRef.current = null;
    };
  }, [fresh]);

  const run = () => {
    const db = dbRef.current;
    if (!db || !text.trim()) return;
    const before = new Map(tables.map((t) => [t.name, JSON.stringify(t.rows) + t.rowCount]));
    const res = runSql(db, text);
    setOutcome(res);
    const now = describeDb(db);
    const ch = new Set(changed);
    for (const t of now) if (before.get(t.name) !== JSON.stringify(t.rows) + t.rowCount) ch.add(t.name);
    setTables(now);
    setChanged(ch);
  };

  const reset = async () => {
    await fresh();
    setOutcome(null);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const s = el.selectionStart;
      const v = text.slice(0, s) + "  " + text.slice(el.selectionEnd);
      setText(v);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 2;
      });
    }
  };

  const lines = Math.min(14, Math.max(4, text.split("\n").length + 1));

  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-3 space-y-3" data-testid={testId}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-bold text-indigo-950 inline-flex items-center gap-1.5">
          <DbIcon className="w-4 h-4" /> {title}
        </div>
        {collapsibleTables && (
          <button type="button" onClick={() => setShowTables((s) => !s)} className="text-xs font-bold text-indigo-700 hover:underline">
            {showTables ? "Hide the tables" : "Show the tables"}
          </button>
        )}
      </div>
      {intro && <div className="text-sm text-slate-700">{intro}</div>}

      {status === "loading" && (
        <div className="p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-600 inline-flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading the SQL engine...
        </div>
      )}
      {status === "failed" && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-900">The SQL engine could not be loaded in this browser ({loadError}). Try reloading the page.</div>
      )}

      {status === "ready" && (
        <>
          {showTables && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Tables in this database</div>
              <TablesPanel tables={tables} changed={changed} />
            </div>
          )}

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Your SQL</div>
            <div className="relative rounded-xl border-2 border-slate-300 bg-white focus-within:border-indigo-500 overflow-hidden">
              <pre
                ref={preRef}
                aria-hidden
                className="absolute inset-0 m-0 p-3 font-mono text-[13px] leading-6 whitespace-pre-wrap break-words text-slate-900 pointer-events-none overflow-hidden"
              >
                {colourSql(text)}
                {"\n"}
              </pre>
              <textarea
                ref={taRef}
                value={text}
                disabled={disabled}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                rows={lines}
                data-testid="sql-editor"
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKey}
                onScroll={(e) => {
                  if (preRef.current) preRef.current.scrollTop = e.currentTarget.scrollTop;
                }}
                placeholder="SELECT ... FROM ... WHERE ...;"
                className="relative block w-full m-0 p-3 font-mono text-[13px] leading-6 whitespace-pre-wrap break-words bg-transparent text-transparent caret-slate-900 outline-none resize-y disabled:opacity-70 placeholder:text-slate-400"
                style={{ WebkitTextFillColor: "transparent" }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              data-testid="sql-run"
              onClick={run}
              disabled={disabled || !text.trim()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold inline-flex items-center gap-1.5 disabled:opacity-40"
              title="Run (Ctrl+Enter)"
            >
              <Play className="w-4 h-4" /> Run
            </button>
            <button
              type="button"
              data-testid="sql-reset"
              onClick={reset}
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-700 inline-flex items-center gap-1.5"
              title="Put the tables back to their original data"
            >
              <RotateCcw className="w-4 h-4" /> Reset data
            </button>
            {onUseQuery && (
              <button
                type="button"
                data-testid="sql-use"
                disabled={!text.trim()}
                onClick={() => onUseQuery(text)}
                className="px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-sm font-bold text-emerald-800 inline-flex items-center gap-1.5 disabled:opacity-40"
              >
                <ClipboardPaste className="w-4 h-4" /> {useQueryLabel}
              </button>
            )}
            {actions}
            <span className="text-[11px] text-slate-500">Ctrl+Enter runs. AVERAGE(...) works as well as AVG(...).</span>
          </div>

          {outcome && (
            <div className="space-y-2" data-testid="sql-output">
              {outcome.error && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-900 flex gap-2" data-testid="sql-error">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{outcome.error}</span>
                </div>
              )}
              {outcome.messages.length > 0 && (
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 space-y-0.5">
                  {outcome.messages.map((m, i) => (
                    <div key={i}>{m}</div>
                  ))}
                  {outcome.changed > 0 && <div className="font-sans text-amber-800 font-semibold">The tables above now show the changed data. Press Reset data to undo.</div>}
                </div>
              )}
              {outcome.result && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Result: {outcome.result.rows.length} row{outcome.result.rows.length === 1 ? "" : "s"}
                  </div>
                  <ResultGrid result={outcome.result} testId="sql-result" />
                </div>
              )}
              {!outcome.error && !outcome.result && outcome.messages.length === 0 && <div className="text-xs text-slate-500">Done - nothing to show.</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SqlPlayground;
