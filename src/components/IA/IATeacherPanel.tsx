import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileText,
  Flag,
  KeyRound,
  Loader2,
  Lock,
  Plus,
  Printer,
  RefreshCw,
  Save,
  Trash2,
  Unlock,
  Users,
  X,
} from "lucide-react";
import { teacherFetch } from "../../utils/teacherAuth";
import { studentOrigin } from "../../utils/studentSite";
import { copyToClipboard } from "../../utils/clipboard";
import {
  APPENDIX_CHECKLIST,
  DEFAULT_MILESTONES,
  DOCUMENT_CHECKLIST,
  IA_CRITERIA,
  IA_CRITERION_IDS,
  IA_TOTAL_MARKS,
  IA_VIDEO_MAX_SECONDS,
  IA_WORD_LIMIT,
  IA_ZERO_BAND,
  VIDEO_CHECKLIST,
  bandFor,
  countWords,
  parseDuration,
  totalMark,
  type CriterionId,
  type IAClassInfo,
  type IAClassMilestone,
  type IAMark,
  type IAProject,
} from "./iaCriteria";

const uid = (p: string) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const niceTime = (t?: number) =>
  t ? new Date(t).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
const niceDate = (d: string) => {
  if (!d) return "";
  const t = new Date(d + "T00:00:00");
  return isNaN(t.getTime()) ? d : t.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};
const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const linkFor = (code: string) => `${studentOrigin()}/?ia=${encodeURIComponent(code)}`;
const esc = (s: any) =>
  String(s ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

async function call<T = any>(url: string, method = "GET", body?: any): Promise<T> {
  const r = await teacherFetch(url, {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) {
    const e: any = new Error(d.error || `Request failed (${r.status})`);
    e.data = d;
    throw e;
  }
  return d as T;
}

function sectionWords(p: IAProject): Record<CriterionId, number> {
  const w = {} as Record<CriterionId, number>;
  for (const id of IA_CRITERION_IDS) w[id] = countWords(p.sections?.[id] || "");
  return w;
}

function milestoneSummary(p: IAProject, cls: IAClassInfo) {
  const ms = cls.milestones || [];
  const today = localToday();
  let done = 0;
  let late = 0;
  for (const m of ms) {
    const st = p.milestoneStatus?.[m.id] || "todo";
    if (st === "done") done++;
    else if (m.due && m.due < today) late++;
  }
  return { done, late, total: ms.length };
}

// ======================================================================
export default function IATeacherPanel() {
  const [classes, setClasses] = useState<IAClassInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const loadClasses = async () => {
    setLoading(true);
    setError("");
    try {
      const d = await call<{ classes: IAClassInfo[] }>("/api/ia/classes");
      setClasses(d.classes || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadClasses();
  }, []);

  const selected = classes.find((c) => c.id === selectedId) || null;

  if (selected) {
    return (
      <ClassView
        cls={selected}
        onBack={() => {
          setSelectedId(null);
          loadClasses();
        }}
        onClassChanged={(c) => setClasses((cs) => cs.map((x) => (x.id === c.id ? { ...x, ...c } : x)))}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> Internal Assessment - computational solution
            </h2>
            <p className="text-sm text-slate-500">
              {IA_TOTAL_MARKS} marks · SL 30% / HL 20% · same task and criteria at SL and HL · max {IA_WORD_LIMIT.toLocaleString()} words + video up to 5 minutes + appendices.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadClasses} className="px-3 py-2 rounded-lg border border-slate-300 text-sm flex items-center gap-1">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button onClick={() => setCreating(true)} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold flex items-center gap-1">
              <Plus className="w-4 h-4" /> New IA class
            </button>
          </div>
        </div>
      </div>

      {creating && (
        <ClassForm
          onCancel={() => setCreating(false)}
          onSaved={(c) => {
            setCreating(false);
            setClasses((cs) => [c, ...cs]);
          }}
        />
      )}

      {error && <p className="text-sm text-rose-600">{error}</p>}
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading IA classes...</div>
      ) : classes.length === 0 ? (
        <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">No IA classes yet. Create one to get a student link.</div>
      ) : (
        <div className="grid gap-3">
          {classes.map((c) => (
            <ClassRow key={c.id} cls={c} onOpen={() => setSelectedId(c.id)} onDeleted={() => setClasses((cs) => cs.filter((x) => x.id !== c.id))} />
          ))}
        </div>
      )}
    </div>
  );
}

function CopyLink({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const link = linkFor(code);
  return (
    <div className="flex items-center gap-1 min-w-0">
      <code className="text-xs bg-slate-100 border border-slate-200 rounded px-2 py-1 truncate max-w-[18rem]" title={link}>
        {link}
      </code>
      <button
        className="p-1.5 rounded border border-slate-300 hover:bg-slate-50"
        title="Copy student link"
        onClick={async () => {
          if (await copyToClipboard(link)) {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }
        }}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

function ClassRow({ cls, onOpen, onDeleted }: { cls: IAClassInfo; onOpen: () => void; onDeleted: () => void }) {
  const [confirm, setConfirm] = useState(false);
  const [err, setErr] = useState("");
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-center gap-3">
      <button onClick={onOpen} className="text-left flex-1 min-w-[12rem]">
        <div className="font-bold text-slate-900">
          {cls.name} <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">{cls.level}</span>
          {!cls.open && <span className="ml-1 text-xs font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">closed</span>}
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Users className="w-3.5 h-3.5" /> {cls.studentCount || 0} students · code <b>{cls.code}</b>
          {cls.lastActiveAt ? ` · last active ${niceTime(cls.lastActiveAt)}` : ""}
        </div>
      </button>
      <CopyLink code={cls.code} />
      <button onClick={onOpen} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold">
        Open
      </button>
      {!confirm ? (
        <button onClick={() => setConfirm(true)} className="p-1.5 text-slate-400 hover:text-rose-600" title="Delete class">
          <Trash2 className="w-4 h-4" />
        </button>
      ) : (
        <span className="flex items-center gap-1 text-xs">
          <span className="text-rose-700 font-semibold">Delete class and all student work?</span>
          <button
            className="px-2 py-1 rounded bg-rose-600 text-white font-bold"
            onClick={async () => {
              try {
                await call(`/api/ia/classes/${cls.id}`, "DELETE");
                onDeleted();
              } catch (e: any) {
                setErr(e.message);
              }
            }}
          >
            Delete
          </button>
          <button className="px-2 py-1 rounded border border-slate-300" onClick={() => setConfirm(false)}>
            Cancel
          </button>
        </span>
      )}
      {err && <p className="w-full text-xs text-rose-600">{err}</p>}
    </div>
  );
}

function ClassForm({ initial, onCancel, onSaved }: { initial?: IAClassInfo; onCancel: () => void; onSaved: (c: IAClassInfo) => void }) {
  const [name, setName] = useState(initial?.name || "");
  const [level, setLevel] = useState<"SL" | "HL">(initial?.level || "SL");
  const [open, setOpen] = useState(initial ? initial.open : true);
  const [milestones, setMilestones] = useState<IAClassMilestone[]>(
    initial?.milestones?.length ? initial.milestones : initial ? [] : DEFAULT_MILESTONES.map((t) => ({ id: uid("m"), title: t, due: "" }))
  );
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const saveIt = async () => {
    setBusy(true);
    setErr("");
    try {
      const body = { name, level, open, milestones: milestones.filter((m) => m.title.trim()) };
      const d = initial ? await call(`/api/ia/classes/${initial.id}`, "PUT", body) : await call("/api/ia/classes", "POST", body);
      onSaved(d.class);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-5 space-y-3">
      <h3 className="font-bold text-slate-900">{initial ? "Edit IA class" : "New IA class"}</h3>
      <div className="flex flex-wrap gap-3 items-end">
        <label className="text-sm flex-1 min-w-[12rem]">
          <span className="block text-xs font-bold text-slate-500 mb-1">Class name</span>
          <input className="w-full border border-slate-300 rounded-lg px-3 py-2" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. DP2 CS 2027" />
        </label>
        <label className="text-sm">
          <span className="block text-xs font-bold text-slate-500 mb-1">Level</span>
          <select className="border border-slate-300 rounded-lg px-3 py-2" value={level} onChange={(e) => setLevel(e.target.value as any)}>
            <option value="SL">SL (IA = 30%)</option>
            <option value="HL">HL (IA = 20%)</option>
          </select>
        </label>
        {initial && (
          <label className="text-sm flex items-center gap-2 pb-2">
            <input type="checkbox" checked={open} onChange={(e) => setOpen(e.target.checked)} /> Open to new students
          </label>
        )}
      </div>
      <div>
        <div className="text-xs font-bold text-slate-500 mb-1">Milestones and deadlines (students see these and mark their progress)</div>
        <div className="space-y-1.5">
          {milestones.map((m) => (
            <div key={m.id} className="flex flex-wrap gap-2 items-center">
              <input
                className="flex-1 min-w-[12rem] border border-slate-300 rounded px-2 py-1 text-sm"
                maxLength={120}
                value={m.title}
                onChange={(e) => setMilestones((ms) => ms.map((x) => (x.id === m.id ? { ...x, title: e.target.value } : x)))}
              />
              <input
                type="date"
                className="border border-slate-300 rounded px-2 py-1 text-sm"
                value={m.due}
                onChange={(e) => setMilestones((ms) => ms.map((x) => (x.id === m.id ? { ...x, due: e.target.value } : x)))}
              />
              <button className="text-slate-400 hover:text-rose-600" onClick={() => setMilestones((ms) => ms.filter((x) => x.id !== m.id))}>
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button className="mt-2 text-sm font-bold text-indigo-600 flex items-center gap-1" onClick={() => setMilestones((ms) => [...ms, { id: uid("m"), title: "", due: "" }])}>
          <Plus className="w-4 h-4" /> Add milestone
        </button>
      </div>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      <div className="flex gap-2">
        <button disabled={busy || !name.trim()} onClick={saveIt} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold disabled:opacity-50">
          {busy ? "Saving..." : initial ? "Save changes" : "Create class"}
        </button>
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-300 text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ======================================================================
function ClassView({ cls: initialCls, onBack, onClassChanged }: { cls: IAClassInfo; onBack: () => void; onClassChanged: (c: IAClassInfo) => void }) {
  const [cls, setCls] = useState<IAClassInfo>(initialCls);
  const [projects, setProjects] = useState<IAProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [openSid, setOpenSid] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const d = await call<{ class: IAClassInfo; projects: IAProject[] }>(`/api/ia/classes/${initialCls.id}/projects`);
      setCls(d.class);
      setProjects(d.projects || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, [initialCls.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const replaceProject = (p: IAProject) => setProjects((ps) => ps.map((x) => (x.studentId === p.studentId ? p : x)));

  const exportCsv = () => {
    const head = [
      "Student",
      "Level",
      "Title",
      ...IA_CRITERIA.map((c) => `${c.id} (/${c.max})`),
      `Total (/${IA_TOTAL_MARKS})`,
      "Percent",
      "Total words",
      ...IA_CRITERIA.map((c) => `${c.id} words`),
      "Draft submitted",
      "Draft feedback given",
      "Final submitted",
      "Moderation sample",
      "Marks released",
      ...IA_CRITERIA.map((c) => `${c.id} comment`),
    ];
    const rows = projects.map((p) => {
      const w = sectionWords(p);
      const t = totalMark(p);
      return [
        p.name,
        cls.level,
        p.title,
        ...IA_CRITERIA.map((c) => (typeof p.marks?.[c.id]?.mark === "number" ? p.marks![c.id]!.mark : "")),
        t ?? "",
        t === null ? "" : `${Math.round((t / IA_TOTAL_MARKS) * 100)}%`,
        IA_CRITERION_IDS.reduce((n, id) => n + w[id], 0),
        ...IA_CRITERION_IDS.map((id) => w[id]),
        p.draft ? new Date(p.draft.submittedAt).toISOString().slice(0, 10) : "",
        p.draftFeedback ? new Date(p.draftFeedback.givenAt).toISOString().slice(0, 10) : "",
        p.final ? new Date(p.final.submittedAt).toISOString().slice(0, 10) : "",
        p.sample ? "yes" : "",
        p.marksReleased ? "yes" : "",
        ...IA_CRITERIA.map((c) => p.marks?.[c.id]?.comment || ""),
      ];
    });
    const csv = [head, ...rows]
      .map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`).join(","))
      .join("\r\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `IA marks - ${cls.name}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  const releaseAll = async (released: boolean) => {
    try {
      await call(`/api/ia/classes/${cls.id}/release`, "POST", { released });
      setProjects((ps) => ps.map((p) => ({ ...p, marksReleased: released })));
      setNotice(released ? "Marks released to every student in this class." : "Marks hidden from every student in this class.");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const open = projects.find((p) => p.studentId === openSid) || null;
  if (open) {
    return (
      <ProjectView
        cls={cls}
        project={open}
        onBack={() => setOpenSid(null)}
        onChanged={replaceProject}
        onDeleted={() => {
          setProjects((ps) => ps.filter((p) => p.studentId !== open.studentId));
          setOpenSid(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1.5 rounded-lg border border-slate-300" title="All IA classes">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {cls.name} <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">{cls.level}</span>
              </h2>
              <div className="text-xs text-slate-500">
                {projects.length} students · {cls.level === "SL" ? "IA is 30% of the SL grade" : "IA is 20% of the HL grade"}
              </div>
            </div>
          </div>
          <CopyLink code={cls.code} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={load} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button onClick={() => setEditing(!editing)} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold">
            Edit class & deadlines
          </button>
          <button onClick={exportCsv} disabled={!projects.length} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold flex items-center gap-1 disabled:opacity-40">
            <Download className="w-3.5 h-3.5" /> Export marks (CSV)
          </button>
          <button onClick={() => releaseAll(true)} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Release all marks
          </button>
          <button onClick={() => releaseAll(false)} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold flex items-center gap-1">
            <EyeOff className="w-3.5 h-3.5" /> Hide all marks
          </button>
        </div>
        {notice && <p className="text-xs text-emerald-700">{notice}</p>}
        {(cls.milestones || []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 text-xs">
            {cls.milestones.map((m) => (
              <span key={m.id} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {m.title}
                {m.due ? ` · ${niceDate(m.due)}` : ""}
              </span>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <ClassForm
          initial={cls}
          onCancel={() => setEditing(false)}
          onSaved={(c) => {
            setCls((x) => ({ ...x, ...c }));
            onClassChanged(c);
            setEditing(false);
          }}
        />
      )}

      {error && <p className="text-sm text-rose-600">{error}</p>}
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
          No students yet. Share the link above - students type their name to open their IA.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="p-2 text-left">Student</th>
                {IA_CRITERIA.map((c) => (
                  <th key={c.id} className="p-2 text-right" title={`${c.name}: recommended ${c.words} words`}>
                    {c.id} words
                  </th>
                ))}
                <th className="p-2 text-right">Total</th>
                <th className="p-2 text-center">SC</th>
                <th className="p-2 text-center">Milestones</th>
                <th className="p-2 text-center">Draft</th>
                <th className="p-2 text-center">Final</th>
                <th className="p-2 text-right">Marks</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const w = sectionWords(p);
                const tw = IA_CRITERION_IDS.reduce((n, id) => n + w[id], 0);
                const ms = milestoneSummary(p, cls);
                const t = totalMark(p);
                const sc = p.successCriteria || [];
                return (
                  <tr key={p.studentId} className="border-t border-slate-100 hover:bg-indigo-50/40 cursor-pointer" onClick={() => setOpenSid(p.studentId)}>
                    <td className="p-2">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        {p.name}
                        {p.sample && <Flag className="w-3.5 h-3.5 text-amber-600" aria-label="Moderation sample" />}
                        {p.pinLocked && <Lock className="w-3.5 h-3.5 text-rose-600" aria-label="PIN locked" />}
                      </div>
                      <div className="text-xs text-slate-500 truncate max-w-[14rem]">{p.title || "(no title)"}</div>
                    </td>
                    {IA_CRITERIA.map((c) => (
                      <td key={c.id} className={`p-2 text-right tabular-nums ${w[c.id] > c.words * 1.2 ? "text-amber-700 font-semibold" : "text-slate-600"}`}>
                        {w[c.id]}
                      </td>
                    ))}
                    <td className={`p-2 text-right tabular-nums font-bold ${tw > IA_WORD_LIMIT ? "text-rose-700" : "text-slate-800"}`}>{tw}</td>
                    <td className="p-2 text-center text-xs">
                      {sc.filter((s) => s.tested).length}/{sc.length} tested
                    </td>
                    <td className="p-2 text-center text-xs">
                      {ms.total ? `${ms.done}/${ms.total}` : "-"}
                      {ms.late > 0 && <span className="ml-1 text-rose-700 font-bold">{ms.late} late</span>}
                    </td>
                    <td className="p-2 text-center text-xs">
                      {p.draftFeedback ? (
                        <span className="text-emerald-700 font-semibold">Feedback given</span>
                      ) : p.draft ? (
                        <span className="text-amber-700 font-bold">Needs feedback</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-2 text-center text-xs">{p.final ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-400">-</span>}</td>
                    <td className="p-2 text-right font-bold tabular-nums">
                      {t === null ? <span className="text-slate-400 font-normal">-</span> : `${t}/${IA_TOTAL_MARKS}`}
                      {p.marksReleased && <Eye className="w-3.5 h-3.5 inline ml-1 text-indigo-500" aria-label="Released" />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ======================================================================
function ProjectView({
  cls,
  project,
  onBack,
  onChanged,
  onDeleted,
}: {
  cls: IAClassInfo;
  project: IAProject;
  onBack: () => void;
  onChanged: (p: IAProject) => void;
  onDeleted: () => void;
}) {
  const p = project;
  const [view, setView] = useState<"current" | "draft">("current");
  const words = useMemo(() => sectionWords(p), [p]);
  const draftWords = useMemo(() => {
    const w = {} as Record<CriterionId, number>;
    for (const id of IA_CRITERION_IDS) w[id] = countWords(p.draft?.sections?.[id] || "");
    return w;
  }, [p]);
  const shown = view === "draft" && p.draft ? p.draft.sections : p.sections;
  const shownWords = view === "draft" && p.draft ? draftWords : words;
  const totalWords = IA_CRITERION_IDS.reduce((n, id) => n + shownWords[id], 0);
  const today = localToday();
  const videoSecs = parseDuration(p.videoLength || "");

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <button onClick={onBack} className="p-1.5 rounded-lg border border-slate-300" title="Back to class">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <div className="font-bold text-slate-900">
              {p.name} <span className="text-xs text-slate-500">· {cls.name} ({cls.level})</span>
            </div>
            <div className="text-sm text-slate-600 truncate">{p.title || "(no title)"}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-slate-100">Joined {niceTime(p.joinedAt)}</span>
          <span className="px-2 py-1 rounded-full bg-slate-100">Last edit {niceTime(p.updatedAt)}</span>
          {p.final ? (
            <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">Final submitted {niceTime(p.final.submittedAt)}</span>
          ) : (
            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">Not final yet</span>
          )}
          <button onClick={() => printModeration(cls, p)} className="px-2.5 py-1 rounded-lg border border-slate-300 font-bold flex items-center gap-1">
            <Printer className="w-3.5 h-3.5" /> Moderation summary
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_26rem] gap-4 items-start">
        {/* ---------- read-only work ---------- */}
        <div className="space-y-4 min-w-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="font-bold text-slate-900">Documentation (read-only)</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-bold ${totalWords > IA_WORD_LIMIT ? "text-rose-700" : "text-slate-700"}`}>
                  {totalWords.toLocaleString()} / {IA_WORD_LIMIT.toLocaleString()} words
                </span>
                {p.draft && (
                  <div className="flex rounded-lg border border-slate-300 overflow-hidden font-bold">
                    <button onClick={() => setView("current")} className={`px-2 py-1 ${view === "current" ? "bg-indigo-600 text-white" : ""}`}>
                      Current
                    </button>
                    <button onClick={() => setView("draft")} className={`px-2 py-1 ${view === "draft" ? "bg-indigo-600 text-white" : ""}`}>
                      Draft ({niceDate(new Date(p.draft.submittedAt).toISOString().slice(0, 10))})
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              {IA_CRITERIA.map((c) => (
                <div key={c.id}>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-800 border-b border-slate-100 pb-1 mb-1">
                    <span>
                      {c.id}. {c.name}
                    </span>
                    <span className={`text-xs ${shownWords[c.id] > c.words * 1.2 ? "text-amber-700" : "text-slate-500"}`}>
                      {shownWords[c.id]} / {c.words} words
                    </span>
                  </div>
                  <div className="text-sm text-slate-700 whitespace-pre-wrap break-words max-h-[28rem] overflow-y-auto">
                    {shown?.[c.id] || <span className="text-slate-400 italic">Nothing written yet.</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Success criteria</h4>
              {(p.successCriteria || []).length === 0 && <p className="text-slate-400">None yet.</p>}
              <ol className="space-y-1">
                {(p.successCriteria || []).map((s, i) => (
                  <li key={s.id} className="flex gap-2">
                    <span className="font-bold text-slate-500 w-9 shrink-0">SC{i + 1}</span>
                    <span className="flex-1">{s.text}</span>
                    {s.tested && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-label="tested" />}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Milestones</h4>
              <ul className="space-y-0.5">
                {(cls.milestones || []).map((m) => {
                  const st = p.milestoneStatus?.[m.id] || "todo";
                  const late = m.due && m.due < today && st !== "done";
                  return (
                    <li key={m.id} className={late ? "text-rose-700" : ""}>
                      {st === "done" ? "✔" : st === "doing" ? "…" : "○"} {m.title} {m.due ? <span className="text-xs text-slate-500">({niceDate(m.due)})</span> : null}
                    </li>
                  );
                })}
                {(p.ownMilestones || []).map((m) => (
                  <li key={m.id} className="text-slate-600">
                    {m.status === "done" ? "✔" : m.status === "doing" ? "…" : "○"} {m.title} <span className="text-xs">(own{m.due ? `, ${niceDate(m.due)}` : ""})</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Video</h4>
              <p className={`text-xs mb-1 ${videoSecs !== null && videoSecs > IA_VIDEO_MAX_SECONDS ? "text-rose-700 font-bold" : "text-slate-500"}`}>
                Length: {p.videoLength || "not given"}
                {videoSecs !== null && videoSecs > IA_VIDEO_MAX_SECONDS ? " - over 5 minutes" : ""}
              </p>
              <TickList items={VIDEO_CHECKLIST} values={p.video || {}} />
              <TickList
                items={(p.successCriteria || []).map((s, i) => ({ id: "sc_" + s.id, label: `Shows SC${i + 1} working` }))}
                values={p.video || {}}
              />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Appendices & documentation</h4>
              <TickList items={APPENDIX_CHECKLIST} values={p.appendix || {}} />
              <TickList items={DOCUMENT_CHECKLIST} values={p.documentChecks || {}} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
            <h4 className="font-bold text-slate-800 mb-2 text-sm">Test plan</h4>
            {(p.testPlan || []).length === 0 ? (
              <p className="text-sm text-slate-400">No tests yet.</p>
            ) : (
              <table className="w-full text-xs min-w-[640px]">
                <thead className="text-left text-slate-500 uppercase">
                  <tr>
                    <th className="p-1">#</th>
                    <th className="p-1">SC</th>
                    <th className="p-1">Test</th>
                    <th className="p-1">Expected</th>
                    <th className="p-1">Actual</th>
                    <th className="p-1">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {p.testPlan.map((r, i) => (
                    <tr key={r.id} className="border-t border-slate-100 align-top">
                      <td className="p-1">{i + 1}</td>
                      <td className="p-1">{r.criterion}</td>
                      <td className="p-1 whitespace-pre-wrap">{r.test}</td>
                      <td className="p-1 whitespace-pre-wrap">{r.expected}</td>
                      <td className="p-1 whitespace-pre-wrap">{r.actual}</td>
                      <td className={`p-1 font-bold ${r.pass === "pass" ? "text-emerald-700" : r.pass === "fail" ? "text-rose-700" : "text-slate-400"}`}>
                        {r.pass || "not run"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* ---------- marking ---------- */}
        <div className="space-y-4 lg:sticky lg:top-4">
          <DraftFeedbackBox cls={cls} project={p} onChanged={onChanged} />
          <MarkingPanel cls={cls} project={p} onChanged={onChanged} />
          <FlagsBox cls={cls} project={p} onChanged={onChanged} onDeleted={onDeleted} />
        </div>
      </div>
    </div>
  );
}

function TickList({ items, values }: { items: { id: string; label: string }[]; values: Record<string, boolean> }) {
  return (
    <ul className="space-y-0.5 text-xs mb-1">
      {items.map((it) => (
        <li key={it.id} className={values[it.id] ? "text-emerald-800" : "text-slate-500"}>
          {values[it.id] ? "☑" : "☐"} {it.label}
        </li>
      ))}
    </ul>
  );
}

function DraftFeedbackBox({ cls, project: p, onChanged }: { cls: IAClassInfo; project: IAProject; onChanged: (p: IAProject) => void }) {
  const [text, setText] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const send = async () => {
    setBusy(true);
    setErr("");
    try {
      const d = await call<{ project: IAProject }>(`/api/ia/classes/${cls.id}/projects/${p.studentId}/draft-feedback`, "POST", { text });
      onChanged(d.project);
      setConfirm(false);
    } catch (e: any) {
      if (e.data?.project) onChanged(e.data.project);
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <h3 className="font-bold text-slate-900 mb-1">Draft feedback (one draft only)</h3>
      {p.draftFeedback ? (
        <>
          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Given {niceTime(p.draftFeedback.givenAt)}
            {p.draftFeedback.by ? ` by ${p.draftFeedback.by}` : ""} - locked.
          </p>
          <div className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 rounded-lg p-2 max-h-60 overflow-y-auto">{p.draftFeedback.text}</div>
        </>
      ) : !p.draft ? (
        <p className="text-sm text-slate-500">The student has not submitted a draft yet.</p>
      ) : (
        <>
          <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 mb-2 flex gap-1.5">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            The IB allows written or oral advice on ONE draft only, and you must not edit the work. Once sent, this feedback is locked and cannot be added to.
          </p>
          <p className="text-xs text-slate-500 mb-1">Draft submitted {niceTime(p.draft.submittedAt)} - use the "Draft" view on the left to read it.</p>
          <textarea
            className="w-full min-h-[8rem] border border-slate-300 rounded-lg px-2 py-1.5 text-sm"
            maxLength={10000}
            value={text}
            placeholder="Advice on how the work could be improved, criterion by criterion..."
            onChange={(e) => setText(e.target.value)}
          />
          {!confirm ? (
            <button disabled={!text.trim()} onClick={() => setConfirm(true)} className="mt-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold disabled:opacity-40">
              Send feedback
            </button>
          ) : (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-rose-700">Send now? This can only be done once.</span>
              <button disabled={busy} onClick={send} className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold disabled:opacity-50">
                {busy ? "Sending..." : "Yes, send"}
              </button>
              <button onClick={() => setConfirm(false)} className="px-3 py-1.5 rounded-lg border border-slate-300">
                Cancel
              </button>
            </div>
          )}
        </>
      )}
      {err && <p className="text-xs text-rose-600 mt-1">{err}</p>}
    </div>
  );
}

function MarkingPanel({ cls, project: p, onChanged }: { cls: IAClassInfo; project: IAProject; onChanged: (pr: IAProject) => void }) {
  const fromProject = () => {
    const m = {} as Record<CriterionId, IAMark>;
    for (const id of IA_CRITERION_IDS) m[id] = { mark: p.marks?.[id]?.mark ?? null, comment: p.marks?.[id]?.comment || "" };
    return m;
  };
  const [marks, setMarks] = useState<Record<CriterionId, IAMark>>(fromProject);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [openCrit, setOpenCrit] = useState<CriterionId | null>("A");
  useEffect(() => {
    if (!dirty) setMarks(fromProject());
  }, [p.marks]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (id: CriterionId, patch: Partial<IAMark>) => {
    setMarks((m) => ({ ...m, [id]: { ...m[id], ...patch } }));
    setDirty(true);
    setMsg("");
  };
  const total = IA_CRITERION_IDS.reduce((n, id) => n + (marks[id].mark ?? 0), 0);
  const markedCount = IA_CRITERION_IDS.filter((id) => marks[id].mark !== null).length;

  const save = async () => {
    setBusy(true);
    setErr("");
    try {
      const d = await call<{ project: IAProject }>(`/api/ia/classes/${cls.id}/projects/${p.studentId}/marks`, "PUT", { marks });
      setDirty(false);
      onChanged(d.project);
      setMsg("Marks saved.");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900">Marking (best fit)</h3>
        <span className="text-lg font-black text-indigo-700 tabular-nums">
          {markedCount ? total : "-"} / {IA_TOTAL_MARKS}
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-3">
        Read the descriptors and pick the band that best fits; award the upper mark in a band if the qualities are shown to a great extent, the lower if to a lesser extent.
        Descriptors are paraphrased - check the IB guide.
      </p>
      <div className="space-y-2">
        {IA_CRITERIA.map((c) => {
          const m = marks[c.id];
          const band = bandFor(c, m.mark);
          const isOpen = openCrit === c.id;
          return (
            <div key={c.id} className="border border-slate-200 rounded-xl">
              <button onClick={() => setOpenCrit(isOpen ? null : c.id)} className="w-full flex items-center justify-between px-3 py-2 text-left">
                <span className="text-sm font-bold text-slate-800">
                  {c.id}. {c.name}
                </span>
                <span className={`text-sm font-bold tabular-nums ${m.mark === null ? "text-slate-400" : "text-indigo-700"}`}>
                  {m.mark ?? "-"} / {c.max}
                </span>
              </button>
              {isOpen && (
                <div className="px-3 pb-3 space-y-2">
                  <button
                    onClick={() => set(c.id, { mark: 0 })}
                    className={`w-full text-left rounded-lg border p-2 text-xs ${m.mark === 0 ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}
                  >
                    <b>0</b> - {IA_ZERO_BAND}
                  </button>
                  {c.bands.map((b) => {
                    const active = band === b && m.mark !== 0;
                    return (
                      <div
                        key={b.min}
                        role="button"
                        tabIndex={0}
                        onClick={() => !active && set(c.id, { mark: b.max })}
                        onKeyDown={(e) => e.key === "Enter" && !active && set(c.id, { mark: b.max })}
                        className={`rounded-lg border p-2 text-xs cursor-pointer ${active ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}
                      >
                        <div className="font-bold mb-0.5">
                          {b.min}–{b.max} marks
                        </div>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                          {b.points.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                        {active && (
                          <div className="flex gap-1 mt-2">
                            {Array.from({ length: b.max - b.min + 1 }, (_, i) => b.min + i).map((n) => (
                              <button
                                key={n}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  set(c.id, { mark: n });
                                }}
                                className={`w-8 h-8 rounded-lg font-bold ${m.mark === n ? "bg-indigo-600 text-white" : "bg-white border border-slate-300"}`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <details className="text-xs text-slate-500">
                    <summary className="cursor-pointer font-semibold">Clarifications</summary>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5">
                      {c.teacherNotes.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  </details>
                  <textarea
                    className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs"
                    rows={2}
                    maxLength={1500}
                    placeholder={`Comment on criterion ${c.id} (justify the mark)`}
                    value={m.comment}
                    onChange={(e) => set(c.id, { comment: e.target.value })}
                  />
                  {m.mark !== null && (
                    <button onClick={() => set(c.id, { mark: null })} className="text-xs text-slate-500 underline">
                      Clear mark
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-lg bg-slate-50 border border-slate-200 p-2 text-xs text-slate-600">
        <b>
          {markedCount ? total : 0} / {IA_TOTAL_MARKS} = {markedCount ? Math.round((total / IA_TOTAL_MARKS) * 100) : 0}%
        </b>
        {markedCount < 5 && ` (${5 - markedCount} criteria not marked yet)`}. Indicative only: IA grade boundaries are set by the IB each session, so no grade is shown. Marks
        may change after moderation.
      </div>
      <div className="flex items-center gap-2 mt-3">
        <button disabled={busy || !dirty} onClick={save} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center gap-1 disabled:opacity-40">
          {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save marks
        </button>
        {dirty && <span className="text-xs text-amber-700">Unsaved changes</span>}
        {msg && !dirty && <span className="text-xs text-emerald-700">{msg}</span>}
      </div>
      {err && <p className="text-xs text-rose-600 mt-1">{err}</p>}
      {p.markedAt && <p className="text-xs text-slate-400 mt-1">Last saved {niceTime(p.markedAt)}</p>}
    </div>
  );
}

function FlagsBox({ cls, project: p, onChanged, onDeleted }: { cls: IAClassInfo; project: IAProject; onChanged: (p: IAProject) => void; onDeleted: () => void }) {
  const [note, setNote] = useState(p.moderationNote || "");
  const [err, setErr] = useState("");
  const [confirmDel, setConfirmDel] = useState(false);
  const [confirmReopen, setConfirmReopen] = useState(false);
  const [confirmPin, setConfirmPin] = useState(false);
  const base = `/api/ia/classes/${cls.id}/projects/${p.studentId}`;
  const flags = async (body: any) => {
    setErr("");
    try {
      const d = await call<{ project: IAProject }>(`${base}/flags`, "PUT", body);
      onChanged(d.project);
    } catch (e: any) {
      setErr(e.message);
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-sm">
      <label className="flex items-center gap-2 font-semibold">
        <input type="checkbox" checked={!!p.marksReleased} onChange={(e) => flags({ marksReleased: e.target.checked })} />
        {p.marksReleased ? <Eye className="w-4 h-4 text-indigo-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
        Release marks and comments to this student
      </label>
      <label className="flex items-center gap-2 font-semibold">
        <input type="checkbox" checked={!!p.sample} onChange={(e) => flags({ sample: e.target.checked })} />
        <Flag className="w-4 h-4 text-amber-600" /> In the IB moderation sample
      </label>
      <div>
        <div className="text-xs font-bold text-slate-500 mb-1">Moderation / authenticity notes (teacher only)</div>
        <textarea
          className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs"
          rows={3}
          maxLength={3000}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => note !== (p.moderationNote || "") && flags({ moderationNote: note })}
          placeholder="e.g. Authenticity checked in discussion on 12 Jan; annotations for the moderator..."
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={p.pinLocked ? "text-rose-700 font-bold" : "text-slate-600"}>
          PIN: {p.pinLocked ? "locked (too many wrong tries)" : p.hasPin ? "set" : "not set - student chooses one next time"}
        </span>
        {p.hasPin &&
          (!confirmPin ? (
            <button onClick={() => setConfirmPin(true)} className="px-2 py-1 rounded border border-slate-300 font-bold flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" /> Reset PIN
            </button>
          ) : (
            <>
              <span className="text-amber-800">Sign the student out everywhere and let them choose a new PIN?</span>
              <button
                className="px-2 py-1 rounded bg-amber-600 text-white font-bold"
                onClick={async () => {
                  try {
                    const d = await call<{ project: IAProject }>(`${base}/reset-pin`, "POST", {});
                    onChanged(d.project);
                    setConfirmPin(false);
                  } catch (e: any) {
                    setErr(e.message);
                  }
                }}
              >
                Reset
              </button>
              <button className="px-2 py-1 rounded border border-slate-300" onClick={() => setConfirmPin(false)}>
                Cancel
              </button>
            </>
          ))}
      </div>
      {p.final && (
        <div>
          {!confirmReopen ? (
            <button onClick={() => setConfirmReopen(true)} className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <Unlock className="w-3.5 h-3.5" /> Reopen final submission (mistakes only)
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-rose-700 font-semibold">IB rules: an officially submitted final cannot be retracted. Reopen only if it was submitted by mistake.</span>
              <button
                className="px-2 py-1 rounded bg-rose-600 text-white font-bold"
                onClick={async () => {
                  try {
                    const d = await call<{ project: IAProject }>(`${base}/reopen`, "POST", {});
                    onChanged(d.project);
                    setConfirmReopen(false);
                  } catch (e: any) {
                    setErr(e.message);
                  }
                }}
              >
                Reopen
              </button>
              <button className="px-2 py-1 rounded border border-slate-300" onClick={() => setConfirmReopen(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
      <div>
        {!confirmDel ? (
          <button onClick={() => setConfirmDel(true)} className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> Remove this student
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-rose-700 font-semibold">Delete all of {p.name}'s IA work?</span>
            <button
              className="px-2 py-1 rounded bg-rose-600 text-white font-bold"
              onClick={async () => {
                try {
                  await call(base, "DELETE");
                  onDeleted();
                } catch (e: any) {
                  setErr(e.message);
                }
              }}
            >
              Delete
            </button>
            <button className="px-2 py-1 rounded border border-slate-300" onClick={() => setConfirmDel(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
      {err && <p className="text-xs text-rose-600">{err}</p>}
    </div>
  );
}

// ---------- printable moderation summary ----------
function printModeration(cls: IAClassInfo, p: IAProject) {
  const w = sectionWords(p);
  const tw = IA_CRITERION_IDS.reduce((n, id) => n + w[id], 0);
  const t = totalMark(p);
  const rows = IA_CRITERIA.map((c) => {
    const m = p.marks?.[c.id];
    const b = bandFor(c, m?.mark);
    const desc = m?.mark === 0 ? IA_ZERO_BAND : b ? `<b>${b.min}–${b.max}:</b> ${b.points.map(esc).join("; ")}` : "";
    return `<tr><td><b>${c.id}</b>. ${esc(c.name)}</td><td class="n">${typeof m?.mark === "number" ? m.mark : "–"} / ${c.max}</td><td class="n">${w[c.id]} / ${c.words}</td><td>${desc}</td><td>${esc(m?.comment || "").replace(/\n/g, "<br>")}</td></tr>`;
  }).join("");
  const sc = (p.successCriteria || []).map((s, i) => `<li>SC${i + 1}: ${esc(s.text)}${s.tested ? " ✔ tested" : ""}${p.video?.["sc_" + s.id] ? " · shown in video" : ""}</li>`).join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>IA moderation summary - ${esc(p.name)}</title>
<style>
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;margin:24px;font-size:12px}
h1{font-size:18px;margin:0 0 4px}h2{font-size:14px;margin:18px 0 6px}
table{border-collapse:collapse;width:100%}td,th{border:1px solid #bbb;padding:5px;vertical-align:top;text-align:left}
th{background:#f1f1f1}.n{white-space:nowrap;text-align:right}.meta{color:#444}
.box{border:1px solid #bbb;padding:8px;white-space:pre-wrap}
@media print{body{margin:10mm}}
</style></head><body>
<h1>IB DP Computer Science – Internal Assessment moderation summary</h1>
<div class="meta">Student: <b>${esc(p.name)}</b> · Class: ${esc(cls.name)} (${cls.level}) · Title: ${esc(p.title || "(none)")}</div>
<div class="meta">Draft submitted: ${esc(niceTime(p.draft?.submittedAt) || "–")} · Draft feedback given: ${esc(niceTime(p.draftFeedback?.givenAt) || "–")} · Final submitted: ${esc(niceTime(p.final?.submittedAt) || "–")}${p.final ? " (authenticity declaration ticked)" : ""} · Moderation sample: ${p.sample ? "yes" : "no"}</div>
<h2>Marks</h2>
<table><thead><tr><th>Criterion</th><th>Mark</th><th>Words / rec.</th><th>Band applied (paraphrased descriptor)</th><th>Teacher comment</th></tr></thead>
<tbody>${rows}<tr><th>Total</th><th class="n">${t ?? "–"} / ${IA_TOTAL_MARKS}</th><th class="n">${tw} / ${IA_WORD_LIMIT}</th><th colspan="2">${t === null ? "" : Math.round((t / IA_TOTAL_MARKS) * 100) + "%"} · video length: ${esc(p.videoLength || "not given")}</th></tr></tbody></table>
<h2>Success criteria</h2><ol style="list-style:none;padding-left:0">${sc || "<li>None recorded</li>"}</ol>
${p.draftFeedback ? `<h2>Feedback given on the draft</h2><div class="box">${esc(p.draftFeedback.text)}</div>` : ""}
${p.moderationNote ? `<h2>Teacher notes for the moderator</h2><div class="box">${esc(p.moderationNote)}</div>` : ""}
<p class="meta" style="margin-top:18px">Descriptors are paraphrased from the IB guide; marks are internal and subject to moderation. Printed ${esc(new Date().toLocaleString())}.</p>
<script>window.onload=function(){window.print()}</script>
</body></html>`;
  const win = window.open("", "_blank");
  if (!win) {
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `IA moderation - ${p.name}.html`;
    a.click();
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}
