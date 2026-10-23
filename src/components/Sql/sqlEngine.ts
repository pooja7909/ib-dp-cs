// In-browser SQL (SQLite compiled to WebAssembly via sql.js). Client-only: never import from server code.
// The engine (and its .wasm, bundled by Vite - no CDN) is loaded lazily the first time a playground is shown.
import type { Database, SqlJsStatic } from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm-browser.wasm?url";

export type SqlValue = string | number | null;

export interface SqlResultSet {
  columns: string[];
  rows: SqlValue[][];
}

export interface SqlRunOutcome {
  /** The last statement that returned rows (SELECT), if any */
  result: SqlResultSet | null;
  /** One line per statement that changed data or structure, e.g. "UPDATE: 2 rows changed" */
  messages: string[];
  /** Total rows changed by INSERT / UPDATE / DELETE */
  changed: number;
  error?: string;
  /** True if AVERAGE( was rewritten to AVG( */
  usedAverage?: boolean;
}

export interface TableInfo {
  name: string;
  kind: "table" | "view";
  columns: { name: string; type: string; pk: boolean; notNull: boolean; fk?: string }[];
  rows: SqlValue[][];
  rowCount: number;
  sql?: string; // view definition
}

let sqlPromise: Promise<SqlJsStatic> | null = null;

export function loadSql(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = import("sql.js")
      .then((m: any) => {
        const init = (m && (m.default || m)) as (cfg: any) => Promise<SqlJsStatic>;
        return init({ locateFile: () => wasmUrl });
      })
      .catch((e) => {
        sqlPromise = null;
        throw e;
      });
  }
  return sqlPromise;
}

/** A fresh database with the setup script (CREATE TABLE + INSERT) already run. */
export async function createDb(setup: string): Promise<Database> {
  const SQL = await loadSql();
  const db = new SQL.Database();
  db.run("PRAGMA foreign_keys = ON;");
  if (setup && setup.trim()) db.exec(setup);
  return db;
}

/** The IB guide writes AVERAGE(...); SQLite (like most systems) calls it AVG(...). */
export function rewriteAverage(sql: string): { sql: string; used: boolean } {
  let used = false;
  // only outside quoted strings
  const out = sql.replace(/('(?:[^']|'')*')|\bAVERAGE(\s*\()/gi, (m, str, paren) => {
    if (str) return str;
    used = true;
    return "AVG" + paren;
  });
  return { sql: out, used };
}

function friendlyError(msg: string, db: Database): string {
  const m = String(msg || "").replace(/^Error:\s*/, "");
  let tables: string[] = [];
  try {
    const r = db.exec("SELECT name FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY name");
    tables = r[0] ? r[0].values.map((v) => String(v[0])) : [];
  } catch {
    /* ignore */
  }
  let x: RegExpMatchArray | null;
  if ((x = m.match(/no such table: (\S+)/i)))
    return `There is no table called "${x[1]}". The tables here are: ${tables.join(", ") || "(none)"}. Check the spelling.`;
  if ((x = m.match(/no such column: (\S+)/i)))
    return `There is no column called "${x[1]}". Check the spelling in the Tables panel. Text values need single quotes ('Red'), otherwise they are read as column names.`;
  if ((x = m.match(/ambiguous column name: (\S+)/i)))
    return `"${x[1]}" is in more than one table. Write Table.${x[1]} to say which one you mean.`;
  if ((x = m.match(/near "([^"]*)": syntax error/i)))
    return `Syntax error near "${x[1]}". Check commas between columns, quotes around text, and the clause order: SELECT ... FROM ... (JOIN ... ON ...) WHERE ... GROUP BY ... HAVING ... ORDER BY ...`;
  if (/incomplete input/i.test(m)) return "The statement is not finished - is a bracket, quote or part of a clause missing?";
  if ((x = m.match(/UNIQUE constraint failed: (\S+)/i))) return `That value of ${x[1]} is already in the table - a primary key must be unique.`;
  if (/FOREIGN KEY constraint failed/i.test(m)) return "Referential integrity: the foreign key value does not exist in the other table (or other rows still refer to this one).";
  if ((x = m.match(/NOT NULL constraint failed: (\S+)/i))) return `${x[1]} must have a value (it cannot be NULL).`;
  if (/misuse of aggregate/i.test(m)) return `${m}. Aggregate functions such as COUNT or SUM cannot go in WHERE - use HAVING after GROUP BY.`;
  if (/cannot start a transaction within a transaction/i.test(m)) return "A transaction is already open - finish it with COMMIT or ROLLBACK first (or press Reset data).";
  if (/cannot (commit|rollback) - no transaction is active/i.test(m)) return "There is no open transaction - start one with BEGIN TRANSACTION first.";
  if (/table \S+ already exists/i.test(m) || /view \S+ already exists/i.test(m)) return `${m}. Press "Reset data" to start again with the original tables.`;
  return m;
}

/** Run one or more statements. Data changes stay in this database (until it is reset). */
export function runSql(db: Database, sqlText: string): SqlRunOutcome {
  const { sql, used } = rewriteAverage(sqlText);
  const out: SqlRunOutcome = { result: null, messages: [], changed: 0, usedAverage: used };
  if (!sql.trim()) return { ...out, error: "Type a query first." };
  try {
    for (const stmt of db.iterateStatements(sql)) {
      try {
        const cols = stmt.getColumnNames();
        const text = (stmt.getSQL() || "").trim();
        const verb = (text.match(/^\s*(\w+)/) || ["", ""])[1].toUpperCase();
        if (cols.length) {
          const rows: SqlValue[][] = [];
          while (stmt.step()) rows.push(stmt.get() as SqlValue[]);
          out.result = { columns: cols, rows };
        } else {
          stmt.step();
          const n = db.getRowsModified();
          if (["INSERT", "UPDATE", "DELETE", "REPLACE"].includes(verb)) {
            out.changed += n;
            out.messages.push(`${verb}: ${n} row${n === 1 ? "" : "s"} changed`);
          } else if (verb) {
            const what = text.replace(/\s+/g, " ").slice(0, 48);
            out.messages.push(`${what}${text.length > 48 ? "..." : ""} - done`);
          }
        }
      } finally {
        stmt.free();
      }
    }
  } catch (e: any) {
    out.error = friendlyError(e?.message || String(e), db);
  }
  return out;
}

export function describeDb(db: Database, maxRows = 200): TableInfo[] {
  const list = db.exec(
    "SELECT name, type, sql FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY CASE type WHEN 'table' THEN 0 ELSE 1 END, rowid"
  );
  const out: TableInfo[] = [];
  for (const [name, type, sql] of list[0]?.values || []) {
    const n = String(name);
    const q = `"${n.replace(/"/g, '""')}"`;
    const fks: Record<string, string> = {};
    try {
      const fk = db.exec(`PRAGMA foreign_key_list(${q})`);
      if (fk[0]) {
        const c = fk[0].columns;
        for (const v of fk[0].values) {
          const from = String(v[c.indexOf("from")]);
          const to = v[c.indexOf("to")];
          fks[from] = `${v[c.indexOf("table")]}${to ? "." + to : ""}`;
        }
      }
    } catch {
      /* ignore */
    }
    const info = db.exec(`PRAGMA table_info(${q})`);
    const ic = info[0]?.columns || [];
    const columns = (info[0]?.values || []).map((v) => ({
      name: String(v[ic.indexOf("name")]),
      type: String(v[ic.indexOf("type")] || ""),
      pk: Number(v[ic.indexOf("pk")]) > 0,
      notNull: Number(v[ic.indexOf("notnull")]) > 0,
      ...(fks[String(v[ic.indexOf("name")])] ? { fk: fks[String(v[ic.indexOf("name")])] } : {}),
    }));
    let rows: SqlValue[][] = [];
    let rowCount = 0;
    try {
      const cnt = db.exec(`SELECT COUNT(*) FROM ${q}`);
      rowCount = Number(cnt[0]?.values[0][0] || 0);
      const r = db.exec(`SELECT * FROM ${q} LIMIT ${maxRows}`);
      rows = (r[0]?.values || []) as SqlValue[][];
    } catch {
      /* a broken view */
    }
    out.push({ name: n, kind: type === "view" ? "view" : "table", columns, rows, rowCount, ...(type === "view" ? { sql: String(sql || "") } : {}) });
  }
  return out;
}

// ---------------- checking a student's answer against the model result ----------------
export function normValue(v: SqlValue): string {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") {
    if (Number.isInteger(v)) return String(v);
    return String(Math.round(v * 1e6) / 1e6);
  }
  const s = String(v);
  if (/^-?\d+(\.\d+)?$/.test(s.trim())) return normValue(Number(s));
  return s;
}

export function sameRows(a: SqlValue[][], b: SqlValue[][], ordered: boolean): boolean {
  if (a.length !== b.length) return false;
  const ka = a.map((r) => JSON.stringify(r.map(normValue)));
  const kb = b.map((r) => JSON.stringify(r.map(normValue)));
  if (!ordered) {
    ka.sort();
    kb.sort();
  }
  return ka.every((x, i) => x === kb[i]);
}

export interface SqlCheckSpec {
  setup: string;
  expected: SqlResultSet;
  ordered?: boolean;
  checkTable?: string;
  require?: string[];
}

export interface SqlCheckResult {
  ok: boolean;
  message: string;
  got?: SqlResultSet | null;
}

/** Runs the student's SQL on a fresh copy of the data and compares with the model's result. */
export async function checkSql(spec: SqlCheckSpec, studentSql: string): Promise<SqlCheckResult> {
  const db = await createDb(spec.setup);
  try {
    const plain = studentSql.replace(/'(?:[^']|'')*'/g, "''").replace(/--[^\n]*/g, "").toUpperCase().replace(/\s+/g, " ");
    for (const r of spec.require || []) {
      if (!plain.includes(r.toUpperCase())) return { ok: false, message: `Your answer needs to use ${r}.` };
    }
    const run = runSql(db, studentSql);
    if (run.error) return { ok: false, message: run.error };
    let got: SqlResultSet | null = run.result;
    if (spec.checkTable) {
      const t = describeDb(db, 100000).find((x) => x.name.toLowerCase() === spec.checkTable!.toLowerCase());
      if (!t) return { ok: false, message: `The table ${spec.checkTable} no longer exists.` };
      got = { columns: t.columns.map((c) => c.name), rows: t.rows };
      if (sameRows(got.rows, spec.expected.rows, false) && got.columns.length === spec.expected.columns.length)
        return { ok: true, message: "The table now holds exactly the right data.", got };
      const diff = got.rows.length - spec.expected.rows.length;
      return {
        ok: false,
        got,
        message:
          diff !== 0
            ? `${spec.checkTable} now has ${got.rows.length} row${got.rows.length === 1 ? "" : "s"}, but it should have ${spec.expected.rows.length}.`
            : run.changed === 0
            ? `Your statement did not change any rows in ${spec.checkTable}.`
            : `${spec.checkTable} does not hold the right values yet - compare it with the expected table.`,
      };
    }
    if (!got) return { ok: false, message: "Your SQL did not return any rows to compare - the answer needs a SELECT query." };
    if (got.columns.length !== spec.expected.columns.length)
      return { ok: false, got, message: `Your result has ${got.columns.length} column${got.columns.length === 1 ? "" : "s"}, but ${spec.expected.columns.length} ${spec.expected.columns.length === 1 ? "is" : "are"} needed.` };
    if (got.rows.length !== spec.expected.rows.length)
      return { ok: false, got, message: `Your result has ${got.rows.length} row${got.rows.length === 1 ? "" : "s"}, but it should have ${spec.expected.rows.length}.` };
    if (sameRows(got.rows, spec.expected.rows, Boolean(spec.ordered))) return { ok: true, got, message: "Your result matches the expected result." };
    if (spec.ordered && sameRows(got.rows, spec.expected.rows, false))
      return { ok: false, got, message: "The right rows, but in the wrong order - check your ORDER BY (ASC or DESC? which column?)." };
    return { ok: false, got, message: "The number of rows is right, but some values are different - check the columns you chose (and their order) and your conditions." };
  } finally {
    db.close();
  }
}
