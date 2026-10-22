// IB DP Computer Science Internal Assessment (computational solution) tracker.
// Teacher IA classes with milestone deadlines + one project record per student.
// Same pattern as learnServer.ts: plain in-memory records, saved to a local JSON file, and shared
// between server copies by server.ts through SyncedCollection("ia_classes") / ("ia_projects").
import type express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { IA_CRITERIA, IA_CRITERION_IDS, VIDEO_CHECKLIST, APPENDIX_CHECKLIST, DOCUMENT_CHECKLIST } from "./src/components/IA/iaCriteria.js";

export const iaClassesDb: Record<string, any> = {};
export const iaProjectsDb: Record<string, any> = {}; // key: `${classId}::${studentId}`

let dataFile = "";

export function loadIAData(dataDir: string) {
  dataFile = path.join(dataDir, "ia_db.json");
  try {
    if (fs.existsSync(dataFile)) {
      const d = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
      Object.assign(iaClassesDb, d.classes || {});
      Object.assign(iaProjectsDb, d.projects || {});
    }
  } catch (e) {
    console.warn("Could not load IA data:", e);
  }
}

function saveIAData() {
  if (!dataFile) return;
  try {
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
    fs.writeFileSync(dataFile, JSON.stringify({ classes: iaClassesDb, projects: iaProjectsDb }));
  } catch (e) {
    console.warn("Could not save IA data:", e);
  }
}

// ---------- limits ----------
const MAX_SECTION_CHARS = 40_000; // ~2,000 words of prose plus code excerpts
const MAX_TITLE = 200;
const MAX_ITEM_TEXT = 600;
const MAX_SC = 40;
const MAX_MILESTONES = 40;
const MAX_TEST_ROWS = 80;
const MAX_FEEDBACK = 10_000;
const MAX_COMMENT = 1_500;
const MAX_NOTE = 3_000;

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function newCode(): string {
  for (;;) {
    let c = "I";
    for (let i = 0; i < 5; i++) c += CODE_CHARS[crypto.randomInt(CODE_CHARS.length)];
    if (!Object.values(iaClassesDb).some((x: any) => x && x.code === c)) return c;
  }
}

function findClassByCode(code: string): any | null {
  const c = String(code || "").trim().toUpperCase();
  return Object.values(iaClassesDb).find((x: any) => x && x.code === c) || null;
}

const str = (v: any, max: number) => String(v ?? "").slice(0, max);
const oneLine = (v: any, max: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
const cleanName = (n: any) => oneLine(n, 60);
const isDate = (d: any) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d);
const shortId = (v: any, prefix: string) => {
  const s = String(v ?? "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 24);
  return s || prefix + crypto.randomBytes(4).toString("hex");
};
const STATUSES = new Set(["todo", "doing", "done"]);

function cleanMilestones(list: any): any[] {
  if (!Array.isArray(list)) return [];
  return list
    .slice(0, MAX_MILESTONES)
    .map((m: any) => ({ id: shortId(m?.id, "m_"), title: oneLine(m?.title, 120), due: isDate(m?.due) ? m.due : "" }))
    .filter((m) => m.title);
}

function publicClass(c: any) {
  return {
    id: c.id,
    code: c.code,
    name: c.name,
    level: c.level === "HL" ? "HL" : "SL",
    open: c.open !== false,
    milestones: Array.isArray(c.milestones) ? c.milestones : [],
    ownerName: c.ownerName,
  };
}

function emptySections() {
  return { A: "", B: "", C: "", D: "", E: "" } as Record<string, string>;
}

function blankProject(classId: string, studentId: string, name: string) {
  const now = Date.now();
  return {
    classId,
    studentId,
    name,
    joinedAt: now,
    updatedAt: now,
    lastActiveAt: now,
    title: "",
    sections: emptySections(),
    successCriteria: [],
    milestoneStatus: {},
    ownMilestones: [],
    testPlan: [],
    video: {},
    videoLength: "",
    appendix: {},
    documentChecks: {},
    draft: null,
    draftFeedback: null,
    final: null,
    marks: {},
    marksReleased: false,
    sample: false,
    moderationNote: "",
  };
}

// ---------- student PIN + session tokens ----------
const PIN_RE = /^\d{4,6}$/;
const MAX_PIN_FAILS = 5;
const LOCK_MS = 15 * 60 * 1000;
const MAX_SESSIONS = 8;
const SESSION_DAYS = 400;

function hashPin(pin: string, salt: string): string {
  return crypto.scryptSync(pin, salt, 32).toString("hex");
}
function setPin(p: any, pin: string) {
  p.pinSalt = crypto.randomBytes(16).toString("hex");
  p.pinHash = hashPin(pin, p.pinSalt);
  p.pinFails = 0;
  p.pinLockedUntil = 0;
  p.sessions = [];
}
function pinMatches(p: any, pin: string): boolean {
  if (!p.pinHash || !p.pinSalt) return false;
  const a = Buffer.from(hashPin(pin, p.pinSalt), "hex");
  const b = Buffer.from(String(p.pinHash), "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
function issueToken(p: any): string {
  const token = crypto.randomBytes(32).toString("hex");
  const now = Date.now();
  const fresh = (Array.isArray(p.sessions) ? p.sessions : []).filter((s: any) => s && now - s.at < SESSION_DAYS * 86400000);
  p.sessions = [...fresh, { h: sha256(token), at: now }].slice(-MAX_SESSIONS);
  return token;
}
function tokenValid(p: any, token: string): boolean {
  if (!token || !p.pinHash || !Array.isArray(p.sessions)) return false;
  const h = sha256(token);
  const now = Date.now();
  return p.sessions.some((s: any) => s && s.h === h && now - s.at < SESSION_DAYS * 86400000);
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const SECRET_KEYS = ["pinHash", "pinSalt", "pinFails", "pinLockedUntil", "sessions"];
function withoutSecrets(p: any) {
  const out: any = { ...p, hasPin: !!p.pinHash };
  for (const k of SECRET_KEYS) delete out[k];
  return out;
}

/** What a teacher sees of a project (no PIN hashes or session tokens). */
function teacherView(p: any) {
  return { ...withoutSecrets(p), pinLocked: (p.pinLockedUntil || 0) > Date.now() };
}

/** What a student is allowed to see of their own project. */
function studentView(p: any) {
  const { marks, markedAt, markedBy, sample, moderationNote, ...rest } = withoutSecrets(p);
  return p.marksReleased ? { ...rest, marks: marks || {}, markedAt } : rest;
}

function cleanChecks(v: any, allowed: Set<string>, extraPrefix?: string): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  if (!v || typeof v !== "object") return out;
  let n = 0;
  for (const [k, val] of Object.entries(v)) {
    if (n++ > 120) break;
    if (allowed.has(k) || (extraPrefix && k.startsWith(extraPrefix) && k.length <= 40)) out[k] = Boolean(val);
  }
  return out;
}

const VIDEO_IDS = new Set(VIDEO_CHECKLIST.map((x) => x.id));
const APPENDIX_IDS = new Set(APPENDIX_CHECKLIST.map((x) => x.id));
const DOC_IDS = new Set(DOCUMENT_CHECKLIST.map((x) => x.id));

/** Applies the student-editable parts of a save. Returns an error message for oversized input. */
function applyStudentSave(p: any, c: any, b: any): string | null {
  if (b.title !== undefined) p.title = oneLine(b.title, MAX_TITLE);
  if (b.sections && typeof b.sections === "object") {
    for (const id of IA_CRITERION_IDS) {
      if (b.sections[id] === undefined) continue;
      const t = String(b.sections[id] ?? "");
      if (t.length > MAX_SECTION_CHARS) return `Section ${id} is too long to save (over ${MAX_SECTION_CHARS.toLocaleString()} characters).`;
      p.sections[id] = t;
    }
  }
  if (b.successCriteria !== undefined) {
    if (!Array.isArray(b.successCriteria) || b.successCriteria.length > MAX_SC) return `At most ${MAX_SC} success criteria.`;
    p.successCriteria = b.successCriteria.map((s: any) => ({
      id: shortId(s?.id, "sc_"),
      text: str(s?.text, MAX_ITEM_TEXT),
      tested: Boolean(s?.tested),
    }));
  }
  if (b.milestoneStatus && typeof b.milestoneStatus === "object") {
    const ids = new Set((c.milestones || []).map((m: any) => m.id));
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries<any>(b.milestoneStatus)) if (ids.has(k) && STATUSES.has(v)) out[k] = v;
    p.milestoneStatus = out;
  }
  if (b.ownMilestones !== undefined) {
    if (!Array.isArray(b.ownMilestones) || b.ownMilestones.length > MAX_MILESTONES) return `At most ${MAX_MILESTONES} milestones of your own.`;
    p.ownMilestones = b.ownMilestones.map((m: any) => ({
      id: shortId(m?.id, "om_"),
      title: str(m?.title, 160),
      due: isDate(m?.due) ? m.due : "",
      status: STATUSES.has(m?.status) ? m.status : "todo",
    }));
  }
  if (b.testPlan !== undefined) {
    if (!Array.isArray(b.testPlan) || b.testPlan.length > MAX_TEST_ROWS) return `At most ${MAX_TEST_ROWS} rows in the test plan.`;
    p.testPlan = b.testPlan.map((r: any) => ({
      id: shortId(r?.id, "t_"),
      criterion: str(r?.criterion, 40),
      test: str(r?.test, MAX_ITEM_TEXT),
      expected: str(r?.expected, MAX_ITEM_TEXT),
      actual: str(r?.actual, MAX_ITEM_TEXT),
      pass: r?.pass === "pass" || r?.pass === "fail" ? r.pass : "",
    }));
  }
  if (b.video !== undefined) p.video = cleanChecks(b.video, VIDEO_IDS, "sc_");
  if (b.videoLength !== undefined) p.videoLength = oneLine(b.videoLength, 12);
  if (b.appendix !== undefined) p.appendix = cleanChecks(b.appendix, APPENDIX_IDS);
  if (b.documentChecks !== undefined) p.documentChecks = cleanChecks(b.documentChecks, DOC_IDS);
  return null;
}

/** IA requests that refer to a class or student this server copy has not seen need fresh data. */
export function iaNeedsFresh(req: express.Request): boolean {
  if (req.method !== "GET") return true;
  const m = req.path.match(/^\/ia\/c\/([^/]+)/);
  if (!m) return /^\/ia\//.test(req.path);
  const c = findClassByCode(decodeURIComponent(m[1]));
  if (!c) return true;
  const sid = (req.query as any)?.sid;
  if (sid && !iaProjectsDb[`${c.id}::${sid}`]) return true;
  return false;
}

export function registerIARoutes(app: express.Express, deps: { requireTeacher: express.RequestHandler }) {
  const { requireTeacher } = deps;

  const getClass = (req: express.Request, res: express.Response) => {
    const c = iaClassesDb[req.params.id];
    if (!c) res.status(404).json({ error: "IA class not found" });
    return c || null;
  };
  const getProject = (req: express.Request, res: express.Response) => {
    const p = iaProjectsDb[`${req.params.id}::${req.params.sid}`];
    if (!p) res.status(404).json({ error: "Student project not found" });
    return p || null;
  };

  // ---------------- Teacher ----------------
  app.get("/api/ia/classes", requireTeacher, (_req, res) => {
    const classes = Object.values(iaClassesDb).map((c: any) => {
      const ps = Object.values(iaProjectsDb).filter((p: any) => p && p.classId === c.id);
      return {
        ...publicClass(c),
        createdAt: c.createdAt,
        ownerId: c.ownerId,
        studentCount: ps.length,
        lastActiveAt: ps.reduce((m: number, p: any) => Math.max(m, p.lastActiveAt || 0), 0),
      };
    });
    classes.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
    res.json({ classes });
  });

  app.post("/api/ia/classes", requireTeacher, (req, res) => {
    const b = req.body || {};
    const name = cleanName(b.name);
    if (!name) {
      res.status(400).json({ error: "Please give the class a name." });
      return;
    }
    const teacher = (req as any).teacher;
    const id = "ia_" + Date.now().toString(36) + crypto.randomBytes(3).toString("hex");
    const c = {
      id,
      code: newCode(),
      name,
      level: b.level === "HL" ? "HL" : "SL",
      open: true,
      milestones: cleanMilestones(b.milestones),
      ownerId: teacher?.id || "t_primary",
      ownerName: teacher?.name || "",
      createdAt: Date.now(),
    };
    iaClassesDb[id] = c;
    saveIAData();
    res.json({ class: { ...publicClass(c), createdAt: c.createdAt, studentCount: 0 } });
  });

  app.put("/api/ia/classes/:id", requireTeacher, (req, res) => {
    const c = getClass(req, res);
    if (!c) return;
    const b = req.body || {};
    if (b.name !== undefined && cleanName(b.name)) c.name = cleanName(b.name);
    if (b.level !== undefined) c.level = b.level === "HL" ? "HL" : "SL";
    if (b.open !== undefined) c.open = Boolean(b.open);
    if (b.milestones !== undefined) c.milestones = cleanMilestones(b.milestones);
    saveIAData();
    res.json({ class: { ...publicClass(c), createdAt: c.createdAt } });
  });

  app.delete("/api/ia/classes/:id", requireTeacher, (req, res) => {
    const c = getClass(req, res);
    if (!c) return;
    for (const k of Object.keys(iaProjectsDb)) if (k.startsWith(c.id + "::")) delete iaProjectsDb[k];
    delete iaClassesDb[c.id];
    saveIAData();
    res.json({ success: true });
  });

  app.get("/api/ia/classes/:id/projects", requireTeacher, (req, res) => {
    const c = getClass(req, res);
    if (!c) return;
    const projects = Object.values(iaProjectsDb)
      .filter((p: any) => p && p.classId === c.id)
      .sort((a: any, b: any) => String(a.name).localeCompare(String(b.name)))
      .map(teacherView);
    res.json({ class: { ...publicClass(c), createdAt: c.createdAt }, projects });
  });

  app.put("/api/ia/classes/:id/projects/:sid/marks", requireTeacher, (req, res) => {
    const p = getProject(req, res);
    if (!p) return;
    const b = req.body?.marks;
    if (!b || typeof b !== "object") {
      res.status(400).json({ error: "No marks sent." });
      return;
    }
    const marks: Record<string, any> = { ...(p.marks || {}) };
    for (const crit of IA_CRITERIA) {
      const m = b[crit.id];
      if (m === undefined) continue;
      let mark: number | null = null;
      if (m?.mark !== null && m?.mark !== undefined && m?.mark !== "") {
        const n = Number(m.mark);
        if (!Number.isInteger(n) || n < 0 || n > crit.max) {
          res.status(400).json({ error: `Criterion ${crit.id} must be a whole number from 0 to ${crit.max}.` });
          return;
        }
        mark = n;
      }
      marks[crit.id] = { mark, comment: str(m?.comment, MAX_COMMENT) };
    }
    p.marks = marks;
    p.markedAt = Date.now();
    p.markedBy = (req as any).teacher?.name || "";
    saveIAData();
    res.json({ project: teacherView(p) });
  });

  app.post("/api/ia/classes/:id/projects/:sid/draft-feedback", requireTeacher, (req, res) => {
    const p = getProject(req, res);
    if (!p) return;
    if (p.draftFeedback) {
      res.status(409).json({ error: "Feedback has already been given on this student's draft. The IB allows feedback on one draft only.", project: teacherView(p) });
      return;
    }
    if (!p.draft) {
      res.status(400).json({ error: "This student has not submitted a draft yet." });
      return;
    }
    const text = String(req.body?.text ?? "").trim();
    if (!text) {
      res.status(400).json({ error: "Please write the feedback first." });
      return;
    }
    if (text.length > MAX_FEEDBACK) {
      res.status(400).json({ error: `Feedback is too long (max ${MAX_FEEDBACK.toLocaleString()} characters).` });
      return;
    }
    p.draftFeedback = { text, givenAt: Date.now(), by: (req as any).teacher?.name || "" };
    saveIAData();
    res.json({ project: teacherView(p) });
  });

  app.put("/api/ia/classes/:id/projects/:sid/flags", requireTeacher, (req, res) => {
    const p = getProject(req, res);
    if (!p) return;
    const b = req.body || {};
    if (b.sample !== undefined) p.sample = Boolean(b.sample);
    if (b.marksReleased !== undefined) p.marksReleased = Boolean(b.marksReleased);
    if (b.moderationNote !== undefined) p.moderationNote = str(b.moderationNote, MAX_NOTE);
    saveIAData();
    res.json({ project: teacherView(p) });
  });

  // Release / hide marks for the whole class
  app.post("/api/ia/classes/:id/release", requireTeacher, (req, res) => {
    const c = getClass(req, res);
    if (!c) return;
    const on = Boolean(req.body?.released);
    for (const p of Object.values<any>(iaProjectsDb)) if (p && p.classId === c.id) p.marksReleased = on;
    saveIAData();
    res.json({ success: true });
  });

  // For a mistaken final submission only: lets the student edit again
  app.post("/api/ia/classes/:id/projects/:sid/reopen", requireTeacher, (req, res) => {
    const p = getProject(req, res);
    if (!p) return;
    p.final = null;
    saveIAData();
    res.json({ project: teacherView(p) });
  });

  // Forgotten PIN: the student chooses a new one next time they open the link (all devices signed out)
  app.post("/api/ia/classes/:id/projects/:sid/reset-pin", requireTeacher, (req, res) => {
    const p = getProject(req, res);
    if (!p) return;
    for (const k of SECRET_KEYS) delete p[k];
    saveIAData();
    res.json({ project: teacherView(p) });
  });

  app.delete("/api/ia/classes/:id/projects/:sid", requireTeacher, (req, res) => {
    const p = getProject(req, res);
    if (!p) return;
    delete iaProjectsDb[`${req.params.id}::${req.params.sid}`];
    saveIAData();
    res.json({ success: true });
  });

  // ---------------- Students ----------------
  /** Every student request after joining carries the student id and the session token (header x-ia-token). */
  const studentProject = (req: express.Request, res: express.Response, sid: string) => {
    const c = findClassByCode(req.params.code);
    const p = c && iaProjectsDb[`${c.id}::${String(sid || "")}`];
    if (!c || !p) {
      res.status(404).json({ error: "Please open your IA again with your name.", needLogin: true });
      return null;
    }
    const token = String(req.headers["x-ia-token"] || "");
    if (!tokenValid(p, token)) {
      res.status(401).json({ error: "Please sign in to your IA again with your name and PIN.", needLogin: true });
      return null;
    }
    return { c, p };
  };

  app.get("/api/ia/c/:code", (req, res) => {
    const c = findClassByCode(req.params.code);
    if (!c) {
      res.status(404).json({ error: "This IA link is not valid. Please check it with your teacher." });
      return;
    }
    res.json({ class: publicClass(c) });
  });

  // Sign in / first open. Step 1: {name} -> {step: "new" | "pin" | "setPin"}. Step 2: {name, pin} -> {project, token}.
  app.post("/api/ia/c/:code/join", async (req, res) => {
    const c = findClassByCode(req.params.code);
    if (!c) {
      res.status(404).json({ error: "This IA link is not valid." });
      return;
    }
    const name = cleanName(req.body?.name);
    if (!name || name.length < 2) {
      res.status(400).json({ error: "Please type your full name." });
      return;
    }
    const pinRaw = req.body?.pin;
    const pin = pinRaw === undefined || pinRaw === null ? "" : String(pinRaw).trim();
    const same: any = Object.values(iaProjectsDb).find(
      (p: any) => p && p.classId === c.id && String(p.name).toLowerCase() === name.toLowerCase()
    );

    if (!same) {
      if (c.open === false) {
        res.status(403).json({ error: "Your teacher has closed this IA class to new students." });
        return;
      }
      if (!pin) {
        res.json({ step: "new" });
        return;
      }
      if (!PIN_RE.test(pin)) {
        res.status(400).json({ error: "Your PIN must be 4 to 6 digits." });
        return;
      }
      const sid = "is_" + Date.now().toString(36) + crypto.randomBytes(3).toString("hex");
      const p: any = blankProject(c.id, sid, name);
      setPin(p, pin);
      const token = issueToken(p);
      iaProjectsDb[`${c.id}::${sid}`] = p;
      saveIAData();
      res.json({ project: studentView(p), class: publicClass(c), token });
      return;
    }

    // Existing student whose PIN was reset by the teacher (or never set): choose a new one
    if (!same.pinHash) {
      if (!pin) {
        res.json({ step: "setPin" });
        return;
      }
      if (!PIN_RE.test(pin)) {
        res.status(400).json({ error: "Your PIN must be 4 to 6 digits." });
        return;
      }
      setPin(same, pin);
      const token = issueToken(same);
      saveIAData();
      res.json({ project: studentView(same), class: publicClass(c), token });
      return;
    }

    const now = Date.now();
    if ((same.pinLockedUntil || 0) > now) {
      const mins = Math.ceil((same.pinLockedUntil - now) / 60000);
      res.status(429).json({ error: `Too many wrong PINs. Try again in ${mins} minute${mins === 1 ? "" : "s"}, or ask your teacher to reset your PIN.`, locked: true });
      return;
    }
    if (!pin) {
      res.json({ step: "pin" });
      return;
    }
    if (!PIN_RE.test(pin) || !pinMatches(same, pin)) {
      same.pinFails = (same.pinFails || 0) + 1;
      // small, growing delay on every wrong try; lock after MAX_PIN_FAILS
      await sleep(Math.min(3000, 400 * same.pinFails));
      if (same.pinFails >= MAX_PIN_FAILS) {
        same.pinFails = 0;
        same.pinLockedUntil = Date.now() + LOCK_MS;
        saveIAData();
        res.status(429).json({ error: "Too many wrong PINs. Your IA is locked for 15 minutes - ask your teacher if you have forgotten your PIN.", locked: true });
        return;
      }
      saveIAData();
      const left = MAX_PIN_FAILS - same.pinFails;
      res.status(401).json({ error: `Wrong PIN. ${left} tr${left === 1 ? "y" : "ies"} left before your IA is locked for 15 minutes.`, triesLeft: left });
      return;
    }
    same.pinFails = 0;
    same.pinLockedUntil = 0;
    const token = issueToken(same);
    saveIAData();
    res.json({ project: studentView(same), class: publicClass(c), token });
  });

  app.post("/api/ia/c/:code/logout", (req, res) => {
    const c = findClassByCode(req.params.code);
    const p = c && iaProjectsDb[`${c.id}::${String(req.body?.studentId || "")}`];
    const token = String(req.headers["x-ia-token"] || "");
    if (p && token && Array.isArray(p.sessions)) {
      const h = sha256(token);
      p.sessions = p.sessions.filter((s: any) => s && s.h !== h);
      saveIAData();
    }
    res.json({ success: true });
  });

  app.get("/api/ia/c/:code/me", (req, res) => {
    const r = studentProject(req, res, String((req.query as any).sid || ""));
    if (!r) return;
    res.json({ project: studentView(r.p), class: publicClass(r.c) });
  });

  app.put("/api/ia/c/:code/project", (req, res) => {
    const b = req.body || {};
    const r = studentProject(req, res, b.studentId);
    if (!r) return;
    const { c, p } = r;
    if (p.final) {
      res.status(403).json({ error: "Your final version has been submitted, so it can no longer be changed.", project: studentView(p) });
      return;
    }
    const err = applyStudentSave(p, c, b);
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    p.updatedAt = Date.now();
    p.lastActiveAt = p.updatedAt;
    saveIAData();
    res.json({ project: studentView(p) });
  });

  app.post("/api/ia/c/:code/draft", (req, res) => {
    const b = req.body || {};
    const r = studentProject(req, res, b.studentId);
    if (!r) return;
    const { c, p } = r;
    if (p.draft) {
      res.status(409).json({ error: "You have already submitted your draft. Your teacher can give feedback on one draft only.", project: studentView(p) });
      return;
    }
    if (p.final) {
      res.status(403).json({ error: "Your final version has already been submitted.", project: studentView(p) });
      return;
    }
    // Save whatever was sent with it first, so the draft is exactly what's on screen
    const err = applyStudentSave(p, c, b);
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    const now = Date.now();
    p.draft = { submittedAt: now, sections: { ...p.sections }, title: p.title };
    p.updatedAt = now;
    p.lastActiveAt = now;
    saveIAData();
    res.json({ project: studentView(p) });
  });

  app.post("/api/ia/c/:code/final", (req, res) => {
    const b = req.body || {};
    const r = studentProject(req, res, b.studentId);
    if (!r) return;
    const { c, p } = r;
    if (p.final) {
      res.json({ project: studentView(p) });
      return;
    }
    if (b.declaration !== true) {
      res.status(400).json({ error: "Please tick the authenticity declaration first." });
      return;
    }
    const err = applyStudentSave(p, c, b);
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    const now = Date.now();
    p.final = { submittedAt: now, declaration: true };
    p.updatedAt = now;
    p.lastActiveAt = now;
    saveIAData();
    res.json({ project: studentView(p) });
  });
}
