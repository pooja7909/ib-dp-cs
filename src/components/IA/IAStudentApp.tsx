import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Flag,
  Loader2,
  Lock,
  MessageSquare,
  Plus,
  Send,
  Target,
  Trash2,
  Video,
} from "lucide-react";
import {
  APPENDIX_CHECKLIST,
  DOCUMENT_CHECKLIST,
  IA_CRITERIA,
  IA_CRITERION_IDS,
  IA_TOTAL_MARKS,
  IA_VIDEO_MAX_SECONDS,
  IA_WORD_LIMIT,
  VIDEO_CHECKLIST,
  countWords,
  emptySections,
  parseDuration,
  totalMark,
  type CriterionId,
  type IAClassInfo,
  type IAProject,
  type MilestoneStatus,
} from "./iaCriteria";

type Tab = "write" | "criteria" | "plan" | "tests" | "evidence" | "submit";
type SaveState = "saved" | "unsaved" | "saving" | "error";

const EDITABLE_KEYS = [
  "title",
  "sections",
  "successCriteria",
  "milestoneStatus",
  "ownMilestones",
  "testPlan",
  "video",
  "videoLength",
  "appendix",
  "documentChecks",
] as const;

const uid = (p: string) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const niceDate = (d: string) => {
  if (!d) return "";
  const t = new Date(d + "T00:00:00");
  return isNaN(t.getTime()) ? d : t.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
};
export const niceTime = (t?: number) =>
  t ? new Date(t).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";

function editablePart(p: IAProject) {
  const out: Record<string, any> = {};
  for (const k of EDITABLE_KEYS) out[k] = (p as any)[k];
  return out;
}

/** Keeps the student's own (maybe unsaved) edits and takes everything the teacher controls from the server. */
function mergeServer(local: IAProject | null, server: IAProject): IAProject {
  if (!local) return normalise(server);
  return normalise({ ...server, ...editablePart(local) } as IAProject);
}

function normalise(p: IAProject): IAProject {
  return {
    ...p,
    title: p.title || "",
    sections: { ...emptySections(), ...((p.sections || {}) as Partial<Record<CriterionId, string>>) },
    successCriteria: p.successCriteria || [],
    milestoneStatus: p.milestoneStatus || {},
    ownMilestones: p.ownMilestones || [],
    testPlan: p.testPlan || [],
    video: p.video || {},
    videoLength: p.videoLength || "",
    appendix: p.appendix || {},
    documentChecks: p.documentChecks || {},
  };
}

const STATUS_LABEL: Record<MilestoneStatus, string> = { todo: "Not started", doing: "In progress", done: "Done" };

export default function IAStudentApp({ code }: { code: string }) {
  const CODE = code.trim().toUpperCase();
  // The browser remembers the signed-in student (id + session token), so the PIN is only typed once per device
  const sessionKey = `ibcs_ia_session_${CODE}`;
  const readSession = (): { sid: string; token: string } | null => {
    try {
      const v = JSON.parse(localStorage.getItem(sessionKey) || "null");
      return v && v.sid && v.token ? { sid: String(v.sid), token: String(v.token) } : null;
    } catch {
      return null;
    }
  };
  const session = useRef<{ sid: string; token: string } | null>(readSession());
  const storeSession = (s: { sid: string; token: string } | null) => {
    session.current = s;
    try {
      if (s) localStorage.setItem(sessionKey, JSON.stringify(s));
      else localStorage.removeItem(sessionKey);
    } catch {}
  };
  const authHeaders = (): Record<string, string> => ({
    "Content-Type": "application/json",
    ...(session.current ? { "x-ia-token": session.current.token } : {}),
  });

  const [cls, setCls] = useState<IAClassInfo | null>(null);
  const [project, setProject] = useState<IAProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [pin2, setPin2] = useState("");
  const [step, setStep] = useState<"name" | "new" | "pin" | "setPin">("name");
  const [joining, setJoining] = useState(false);
  const [relogin, setRelogin] = useState(false); // session ended while working: ask for the PIN again, keep the work
  const [tab, setTab] = useState<Tab>("write");
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [saveMsg, setSaveMsg] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const projectRef = useRef<IAProject | null>(null);
  projectRef.current = project;
  const editVersion = useRef(0);
  const savedVersion = useRef(0);
  const timer = useRef<number | null>(null);
  const saving = useRef(false);

  const api = (p: string) => `/api/ia/c/${encodeURIComponent(CODE)}${p}`;

  // ---------- load / sign in ----------
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const s = session.current;
        if (s) {
          const r = await fetch(api(`/me?sid=${encodeURIComponent(s.sid)}`), { headers: authHeaders() });
          if (r.ok) {
            const d = await r.json();
            setCls(d.class);
            setProject(normalise(d.project));
            return;
          }
          if (r.status === 401 || r.status === 404) storeSession(null);
        }
        const r = await fetch(api(""));
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || "IA class not found");
        setCls(d.class);
      } catch (e: any) {
        setError(e?.message || "Could not load your IA.");
      } finally {
        setLoading(false);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** Step 1 sends only the name (the server says whether to choose or enter a PIN); step 2 sends name + PIN. */
  const join = async (asName = name, withPin?: string) => {
    setJoining(true);
    setError(null);
    try {
      const r = await fetch(api("/join"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(withPin !== undefined ? { name: asName, pin: withPin } : { name: asName }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Could not open your IA");
      if (d.step) {
        setStep(d.step);
        setPin("");
        setPin2("");
        return;
      }
      storeSession({ sid: d.project.studentId, token: d.token });
      setCls(d.class);
      setPin("");
      setPin2("");
      if (relogin) {
        // keep what is on screen, then save it
        setProject((cur) => mergeServer(cur, d.project));
        setRelogin(false);
        editVersion.current += 1;
        scheduleSave(200);
      } else {
        setProject(normalise(d.project));
      }
    } catch (e: any) {
      setError(e?.message || "Could not open your IA");
    } finally {
      setJoining(false);
    }
  };
  const signOut = async () => {
    const s = session.current;
    if (s) {
      try {
        await fetch(api("/logout"), { method: "POST", headers: authHeaders(), body: JSON.stringify({ studentId: s.sid }) });
      } catch {}
    }
    storeSession(null);
    setProject(null);
    setStep("name");
    setName("");
  };
  const sessionEnded = (r: Response) => {
    if (r.status === 401) {
      setRelogin(true);
      return true;
    }
    return false;
  };

  // ---------- autosave ----------
  const save = useCallback(async (): Promise<boolean> => {
    const p = projectRef.current;
    if (!p || p.final) return true;
    if (saving.current) return false;
    if (savedVersion.current === editVersion.current) return true;
    saving.current = true;
    const version = editVersion.current;
    setSaveState("saving");
    try {
      const r = await fetch(api("/project"), {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ studentId: p.studentId, ...editablePart(p) }),
      });
      const d = await r.json().catch(() => ({}));
      if (sessionEnded(r)) {
        setSaveState("error");
        setSaveMsg("Not saved - enter your PIN to keep saving.");
        return false;
      }
      if (!r.ok) {
        if (d.project) setProject((cur) => mergeServer(cur, d.project));
        throw new Error(d.error || "Could not save");
      }
      savedVersion.current = version;
      setProject((cur) => mergeServer(cur, d.project));
      setLastSavedAt(Date.now());
      setSaveMsg("");
      setSaveState(editVersion.current === version ? "saved" : "unsaved");
      return true;
    } catch (e: any) {
      setSaveState("error");
      setSaveMsg(e?.message === "Failed to fetch" ? "No connection - your work will be saved when you are back online." : e?.message || "Could not save");
      return false;
    } finally {
      saving.current = false;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scheduleSave = (ms = 2000) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      timer.current = null;
      const ok = await save();
      if (!ok || savedVersion.current !== editVersion.current) scheduleSave(ok ? 500 : 8000);
    }, ms);
  };

  const update = (fn: (p: IAProject) => IAProject) => {
    setProject((cur) => {
      if (!cur || cur.final) return cur;
      return fn(cur);
    });
    editVersion.current += 1;
    setSaveState("unsaved");
    scheduleSave();
  };

  // Save straight away when the student leaves the page
  useEffect(() => {
    const flush = () => {
      const p = projectRef.current;
      if (!p || p.final || savedVersion.current === editVersion.current) return;
      try {
        fetch(api("/project"), {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify({ studentId: p.studentId, ...editablePart(p) }),
          keepalive: true,
        });
      } catch {}
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("beforeunload", flush);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Pick up teacher feedback / released marks / new deadlines now and then
  useEffect(() => {
    if (!project?.studentId) return;
    const refresh = async () => {
      try {
        const r = await fetch(api(`/me?sid=${encodeURIComponent(project.studentId)}`), { headers: authHeaders() });
        if (sessionEnded(r) || !r.ok) return;
        const d = await r.json();
        setCls(d.class);
        setProject((cur) => mergeServer(cur, d.project));
      } catch {}
    };
    const iv = window.setInterval(refresh, 120_000);
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(iv);
      window.removeEventListener("focus", onFocus);
    };
  }, [project?.studentId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- submit draft / final ----------
  const [confirmDraft, setConfirmDraft] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [confirmFinal, setConfirmFinal] = useState(false);
  const [submitBusy, setSubmitBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const submit = async (kind: "draft" | "final") => {
    const p = projectRef.current;
    if (!p) return;
    setSubmitBusy(true);
    setSubmitError("");
    if (timer.current) window.clearTimeout(timer.current);
    try {
      const r = await fetch(api(`/${kind}`), {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ studentId: p.studentId, ...editablePart(p), ...(kind === "final" ? { declaration: true } : {}) }),
      });
      const d = await r.json().catch(() => ({}));
      if (sessionEnded(r)) throw new Error("Please enter your PIN again (at the top of the page), then submit.");
      if (d.project) setProject((cur) => mergeServer(cur, d.project));
      if (!r.ok) throw new Error(d.error || "Could not submit");
      savedVersion.current = editVersion.current;
      setSaveState("saved");
      setLastSavedAt(Date.now());
      setConfirmDraft(false);
      setConfirmFinal(false);
    } catch (e: any) {
      setSubmitError(e?.message || "Could not submit");
    } finally {
      setSubmitBusy(false);
    }
  };

  // ---------- derived ----------
  const words = useMemo(() => {
    const w = {} as Record<CriterionId, number>;
    for (const id of IA_CRITERION_IDS) w[id] = countWords(project?.sections?.[id] || "");
    return w;
  }, [project?.sections]);
  const totalWords = IA_CRITERION_IDS.reduce((n, id) => n + words[id], 0);
  const today = localToday();
  const locked = !!project?.final;

  // ---------- render: loading / join ----------
  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading your IA...
      </div>
    );
  }
  if (!project) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-600" />
          <h1 className="text-lg font-bold text-slate-900">Computer Science IA</h1>
        </div>
        {cls ? (
          step === "name" ? (
            <>
              <p className="text-sm text-slate-600">
                <span className="font-semibold">{cls.name}</span> ({cls.level}) - your computational solution workspace. Type your full name to open your IA.
                Use the same name every time (on any device) to get back to your work.
              </p>
              <input
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                placeholder="Your full name"
                value={name}
                maxLength={60}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && name.trim().length >= 2 && join()}
              />
              <button
                disabled={joining || name.trim().length < 2}
                onClick={() => join()}
                className="w-full py-2 rounded-lg bg-indigo-600 text-white font-bold text-sm disabled:opacity-50"
              >
                {joining ? "Checking..." : "Next"}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                <b>{name.trim()}</b>{" "}
                {step === "pin"
                  ? "- enter your IA PIN."
                  : step === "setPin"
                    ? "- your teacher has reset your PIN. Choose a new 4 to 6 digit PIN."
                    : "- this is your first time. Choose a 4 to 6 digit PIN. You will need it to open your IA on another device, so remember it (do not use your birthday)."}
              </p>
              <PinInput value={pin} onChange={setPin} placeholder={step === "pin" ? "PIN" : "Choose a PIN"} onEnter={() => step === "pin" && /^\d{4,6}$/.test(pin) && join(name, pin)} />
              {step !== "pin" && <PinInput value={pin2} onChange={setPin2} placeholder="Type the PIN again" onEnter={() => /^\d{4,6}$/.test(pin) && pin === pin2 && join(name, pin)} />}
              {step !== "pin" && pin2 && pin !== pin2 && <p className="text-xs text-rose-600">The two PINs are different.</p>}
              <button
                disabled={joining || !/^\d{4,6}$/.test(pin) || (step !== "pin" && pin !== pin2)}
                onClick={() => join(name, pin)}
                className="w-full py-2 rounded-lg bg-indigo-600 text-white font-bold text-sm disabled:opacity-50"
              >
                {joining ? "Opening..." : step === "pin" ? "Open my IA" : "Save PIN and open my IA"}
              </button>
              <button
                onClick={() => {
                  setStep("name");
                  setError(null);
                }}
                className="w-full text-xs text-slate-500 underline"
              >
                Not {name.trim()}? Go back
              </button>
              {step === "pin" && <p className="text-xs text-slate-500">Forgotten your PIN? Ask your teacher to reset it.</p>}
            </>
          )
        ) : null}
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>
    );
  }

  const releasedTotal = project.marksReleased ? totalMark(project) : null;

  // ---------- render: workspace ----------
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "write", label: "Documentation A-E", icon: <FileText className="w-4 h-4" /> },
    { id: "criteria", label: "Success criteria", icon: <Target className="w-4 h-4" /> },
    { id: "plan", label: "Milestones", icon: <CalendarClock className="w-4 h-4" /> },
    { id: "tests", label: "Test plan", icon: <ClipboardList className="w-4 h-4" /> },
    { id: "evidence", label: "Video & appendices", icon: <Video className="w-4 h-4" /> },
    { id: "submit", label: "Draft & submit", icon: <Send className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="flex flex-wrap items-start gap-3 justify-between">
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-wide text-indigo-600">
              {cls?.name} · {cls?.level} · Internal Assessment ({IA_TOTAL_MARKS} marks)
            </div>
            <div className="text-sm text-slate-500">{project.name}</div>
          </div>
          <div className="flex items-center gap-2">
            <SaveIndicator state={locked ? "saved" : saveState} lastSavedAt={lastSavedAt} msg={saveMsg} locked={locked} />
            <button onClick={signOut} className="text-xs text-slate-500 underline" title="Sign out on this device (e.g. a shared computer)">
              Sign out
            </button>
          </div>
        </div>
        {relogin && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 space-y-2">
            <p className="text-sm font-semibold text-amber-900">You have been signed out. Enter your PIN to keep saving - your work on this page is kept.</p>
            <div className="flex flex-wrap gap-2 items-center">
              <PinInput value={pin} onChange={setPin} placeholder="PIN" onEnter={() => /^\d{4,6}$/.test(pin) && join(project.name, pin)} />
              <button
                disabled={joining || !/^\d{4,6}$/.test(pin)}
                onClick={() => join(project.name, pin)}
                className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold disabled:opacity-50"
              >
                {joining ? "Checking..." : "Continue"}
              </button>
            </div>
            {error && <p className="text-xs text-rose-600">{error}</p>}
          </div>
        )}
        <input
          className="w-full text-lg font-bold border-b border-slate-200 focus:border-indigo-500 outline-none py-1 disabled:bg-transparent"
          placeholder="Title of your computational solution"
          value={project.title}
          maxLength={200}
          disabled={locked}
          onChange={(e) => update((p) => ({ ...p, title: e.target.value }))}
        />
        <WordBar words={words} total={totalWords} />
        {project.draftFeedback && (
          <button onClick={() => setTab("submit")} className="w-full text-left text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg px-3 py-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 shrink-0" /> Your teacher has given feedback on your draft - open "Draft & submit" to read it.
          </button>
        )}
        {locked && (
          <div className="text-sm bg-slate-100 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 flex items-center gap-2">
            <Lock className="w-4 h-4 shrink-0" /> Final version submitted on {niceTime(project.final!.submittedAt)}. It can no longer be changed.
          </div>
        )}
        {releasedTotal !== null && (
          <button onClick={() => setTab("submit")} className="w-full text-left text-sm bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg px-3 py-2">
            Your teacher has released your IA marks: <b>{releasedTotal} / {IA_TOTAL_MARKS}</b> (internal marks, may change after IB moderation).
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto bg-white rounded-xl border border-slate-200 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap ${
              tab === t.id ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {tab === "write" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 px-1">
            Write each section here or paste it in from your document. Put code excerpts between lines of three backticks (```) - code, comments and diagrams do not count towards
            the {IA_WORD_LIMIT.toLocaleString()}-word limit. Recommended counts are a guide; the {IA_WORD_LIMIT.toLocaleString()} total is the limit.
          </p>
          {IA_CRITERIA.map((c) => (
            <SectionEditor
              key={c.id}
              crit={c}
              text={project.sections[c.id]}
              words={words[c.id]}
              locked={locked}
              onChange={(t) => update((p) => ({ ...p, sections: { ...p.sections, [c.id]: t } }))}
            />
          ))}
        </div>
      )}

      {tab === "criteria" && (
        <Card title="Success criteria" icon={<Target className="w-5 h-5 text-indigo-600" />}>
          <p className="text-sm text-slate-600 mb-3">
            Measurable outcomes that show your product works (from criterion A). You will use them in your plan (B), test plan (C), development and video (D) and evaluation
            (E). Tick each one once you have tested it.
          </p>
          <div className="space-y-2">
            {project.successCriteria.map((s, i) => (
              <div key={s.id} className="flex items-start gap-2">
                <span className="mt-2 text-xs font-bold text-slate-500 w-10 shrink-0">SC{i + 1}</span>
                <textarea
                  rows={1}
                  className="flex-1 border border-slate-300 rounded-lg px-2 py-1.5 text-sm resize-y disabled:bg-slate-50"
                  value={s.text}
                  maxLength={600}
                  disabled={locked}
                  placeholder="e.g. The user can add a new booking and it is saved to the database"
                  onChange={(e) =>
                    update((p) => ({ ...p, successCriteria: p.successCriteria.map((x) => (x.id === s.id ? { ...x, text: e.target.value } : x)) }))
                  }
                />
                <label className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={s.tested}
                    disabled={locked}
                    onChange={(e) =>
                      update((p) => ({ ...p, successCriteria: p.successCriteria.map((x) => (x.id === s.id ? { ...x, tested: e.target.checked } : x)) }))
                    }
                  />
                  Tested
                </label>
                {!locked && (
                  <button
                    className="mt-1.5 text-slate-400 hover:text-rose-600"
                    title="Remove"
                    onClick={() => update((p) => ({ ...p, successCriteria: p.successCriteria.filter((x) => x.id !== s.id) }))}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {!locked && project.successCriteria.length < 40 && (
            <button
              className="mt-3 flex items-center gap-1 text-sm font-bold text-indigo-600"
              onClick={() => update((p) => ({ ...p, successCriteria: [...p.successCriteria, { id: uid("sc"), text: "", tested: false }] }))}
            >
              <Plus className="w-4 h-4" /> Add a success criterion
            </button>
          )}
          <p className="mt-3 text-xs text-slate-500">
            {project.successCriteria.filter((s) => s.tested).length} of {project.successCriteria.length} tested.
          </p>
        </Card>
      )}

      {tab === "plan" && (
        <Card title="Milestones" icon={<CalendarClock className="w-5 h-5 text-indigo-600" />}>
          <h3 className="text-sm font-bold text-slate-800 mb-2">Deadlines from your teacher</h3>
          {(cls?.milestones || []).length === 0 && <p className="text-sm text-slate-500 mb-3">Your teacher has not set any deadlines yet.</p>}
          <div className="space-y-1.5 mb-5">
            {(cls?.milestones || []).map((m) => {
              const st: MilestoneStatus = project.milestoneStatus[m.id] || "todo";
              const late = m.due && m.due < today && st !== "done";
              return (
                <div key={m.id} className={`flex flex-wrap items-center gap-2 border rounded-lg px-3 py-2 ${late ? "border-rose-300 bg-rose-50" : "border-slate-200"}`}>
                  <Flag className={`w-4 h-4 ${late ? "text-rose-600" : "text-slate-400"}`} />
                  <span className="flex-1 min-w-[10rem] text-sm font-semibold text-slate-800">{m.title}</span>
                  <span className={`text-xs ${late ? "text-rose-700 font-bold" : "text-slate-500"}`}>{m.due ? `Due ${niceDate(m.due)}` : "No date"}</span>
                  <StatusSelect value={st} disabled={locked} onChange={(v) => update((p) => ({ ...p, milestoneStatus: { ...p.milestoneStatus, [m.id]: v } }))} />
                </div>
              );
            })}
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-2">My own steps</h3>
          <div className="space-y-1.5">
            {project.ownMilestones.map((m) => {
              const late = m.due && m.due < today && m.status !== "done";
              const set = (patch: Partial<typeof m>) =>
                update((p) => ({ ...p, ownMilestones: p.ownMilestones.map((x) => (x.id === m.id ? { ...x, ...patch } : x)) }));
              return (
                <div key={m.id} className={`flex flex-wrap items-center gap-2 border rounded-lg px-3 py-2 ${late ? "border-rose-300 bg-rose-50" : "border-slate-200"}`}>
                  <input
                    className="flex-1 min-w-[10rem] border border-slate-300 rounded px-2 py-1 text-sm"
                    value={m.title}
                    maxLength={160}
                    disabled={locked}
                    placeholder="e.g. Finish login screen"
                    onChange={(e) => set({ title: e.target.value })}
                  />
                  <input type="date" className="border border-slate-300 rounded px-2 py-1 text-sm" value={m.due} disabled={locked} onChange={(e) => set({ due: e.target.value })} />
                  <StatusSelect value={m.status} disabled={locked} onChange={(v) => set({ status: v })} />
                  {!locked && (
                    <button className="text-slate-400 hover:text-rose-600" onClick={() => update((p) => ({ ...p, ownMilestones: p.ownMilestones.filter((x) => x.id !== m.id) }))}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {!locked && project.ownMilestones.length < 40 && (
            <button
              className="mt-3 flex items-center gap-1 text-sm font-bold text-indigo-600"
              onClick={() => update((p) => ({ ...p, ownMilestones: [...p.ownMilestones, { id: uid("om"), title: "", due: "", status: "todo" }] }))}
            >
              <Plus className="w-4 h-4" /> Add a step
            </button>
          )}
        </Card>
      )}

      {tab === "tests" && (
        <Card title="Test plan" icon={<ClipboardList className="w-5 h-5 text-indigo-600" />}>
          <p className="text-sm text-slate-600 mb-3">
            Plan your tests in criterion C, then fill in the actual results as you test during development (D). Include normal, boundary and invalid / unexpected data, and
            test correctness, reliability and efficiency. Link each test to a success criterion (e.g. SC2).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-xs uppercase text-slate-500">
                  <th className="p-1 w-8">#</th>
                  <th className="p-1 w-20">SC</th>
                  <th className="p-1">Test (what / test data)</th>
                  <th className="p-1">Expected result</th>
                  <th className="p-1">Actual result</th>
                  <th className="p-1 w-24">Pass?</th>
                  <th className="p-1 w-6"></th>
                </tr>
              </thead>
              <tbody>
                {project.testPlan.map((r, i) => {
                  const set = (patch: Partial<typeof r>) => update((p) => ({ ...p, testPlan: p.testPlan.map((x) => (x.id === r.id ? { ...x, ...patch } : x)) }));
                  const cell = (k: "test" | "expected" | "actual") => (
                    <td className="p-1 align-top">
                      <textarea
                        rows={2}
                        className="w-full border border-slate-300 rounded px-2 py-1 text-sm resize-y disabled:bg-slate-50"
                        value={r[k]}
                        maxLength={600}
                        disabled={locked}
                        onChange={(e) => set({ [k]: e.target.value } as any)}
                      />
                    </td>
                  );
                  return (
                    <tr key={r.id} className={r.pass === "pass" ? "bg-emerald-50" : r.pass === "fail" ? "bg-rose-50" : ""}>
                      <td className="p-1 align-top pt-2 text-xs text-slate-500">{i + 1}</td>
                      <td className="p-1 align-top">
                        <input className="w-full border border-slate-300 rounded px-2 py-1 text-sm" value={r.criterion} maxLength={40} disabled={locked} onChange={(e) => set({ criterion: e.target.value })} />
                      </td>
                      {cell("test")}
                      {cell("expected")}
                      {cell("actual")}
                      <td className="p-1 align-top">
                        <select className="w-full border border-slate-300 rounded px-1 py-1 text-sm" value={r.pass} disabled={locked} onChange={(e) => set({ pass: e.target.value as any })}>
                          <option value="">Not run</option>
                          <option value="pass">Pass</option>
                          <option value="fail">Fail</option>
                        </select>
                      </td>
                      <td className="p-1 align-top pt-2">
                        {!locked && (
                          <button className="text-slate-400 hover:text-rose-600" onClick={() => update((p) => ({ ...p, testPlan: p.testPlan.filter((x) => x.id !== r.id) }))}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!locked && project.testPlan.length < 80 && (
            <button
              className="mt-3 flex items-center gap-1 text-sm font-bold text-indigo-600"
              onClick={() => update((p) => ({ ...p, testPlan: [...p.testPlan, { id: uid("t"), criterion: "", test: "", expected: "", actual: "", pass: "" }] }))}
            >
              <Plus className="w-4 h-4" /> Add a test
            </button>
          )}
          <p className="mt-3 text-xs text-slate-500">
            {project.testPlan.filter((r) => r.pass === "pass").length} passed · {project.testPlan.filter((r) => r.pass === "fail").length} failed ·{" "}
            {project.testPlan.filter((r) => !r.pass).length} not run yet
          </p>
        </Card>
      )}

      {tab === "evidence" && (
        <div className="space-y-4">
          <Card title="Video (max 5 minutes)" icon={<Video className="w-5 h-5 text-indigo-600" />}>
            <p className="text-sm text-slate-600 mb-3">The video is the evidence that your product works and shows examples of your testing. It is marked as part of criterion D.</p>
            <VideoLength value={project.videoLength} disabled={locked} onChange={(v) => update((p) => ({ ...p, videoLength: v }))} />
            <Checklist items={VIDEO_CHECKLIST} values={project.video} disabled={locked} onChange={(id, v) => update((p) => ({ ...p, video: { ...p.video, [id]: v } }))} />
            <h4 className="text-xs font-bold uppercase text-slate-500 mt-4 mb-1">Shows each success criterion working</h4>
            {project.successCriteria.length === 0 && <p className="text-sm text-slate-500">Add your success criteria first.</p>}
            <Checklist
              items={project.successCriteria.map((s, i) => ({ id: "sc_" + s.id, label: `SC${i + 1}: ${s.text || "(no text yet)"}` }))}
              values={project.video}
              disabled={locked}
              onChange={(id, v) => update((p) => ({ ...p, video: { ...p.video, [id]: v } }))}
            />
          </Card>
          <Card title="Appendices" icon={<FileText className="w-5 h-5 text-indigo-600" />}>
            <p className="text-sm text-slate-600 mb-3">Appendices are a single PDF. They are not marked, but they must contain your full source code.</p>
            <Checklist items={APPENDIX_CHECKLIST} values={project.appendix} disabled={locked} onChange={(id, v) => update((p) => ({ ...p, appendix: { ...p.appendix, [id]: v } }))} />
          </Card>
          <Card title="Documentation" icon={<FileText className="w-5 h-5 text-indigo-600" />}>
            <Checklist
              items={DOCUMENT_CHECKLIST}
              values={project.documentChecks}
              disabled={locked}
              onChange={(id, v) => update((p) => ({ ...p, documentChecks: { ...p.documentChecks, [id]: v } }))}
            />
          </Card>
        </div>
      )}

      {tab === "submit" && (
        <div className="space-y-4">
          <Card title="1. Draft for feedback (once only)" icon={<MessageSquare className="w-5 h-5 text-indigo-600" />}>
            {!project.draft ? (
              <>
                <p className="text-sm text-slate-600">
                  The IB allows your teacher to read and give advice on <b>one draft</b> of your work. Submit it when all five sections are as complete as you can make them -
                  you cannot submit a second draft. Your teacher will advise you but will not edit your work.
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Current total: <b>{totalWords.toLocaleString()}</b> words. Empty sections: {IA_CRITERION_IDS.filter((id) => !words[id]).join(", ") || "none"}.
                </p>
                {!locked &&
                  (!confirmDraft ? (
                    <button onClick={() => setConfirmDraft(true)} className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold">
                      Submit draft for feedback
                    </button>
                  ) : (
                    <div className="mt-3 p-3 rounded-lg border border-amber-300 bg-amber-50 space-y-2">
                      <p className="text-sm text-amber-900 font-semibold">You can only do this once. Submit this version as your draft?</p>
                      <div className="flex gap-2">
                        <button disabled={submitBusy} onClick={() => submit("draft")} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold disabled:opacity-50">
                          {submitBusy ? "Submitting..." : "Yes, submit my draft"}
                        </button>
                        <button onClick={() => setConfirmDraft(false)} className="px-4 py-2 rounded-lg border border-slate-300 text-sm">
                          Not yet
                        </button>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <>
                <p className="text-sm text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Draft submitted on {niceTime(project.draft.submittedAt)}.
                </p>
                {project.draftFeedback ? (
                  <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                    <div className="text-xs font-bold uppercase text-emerald-700 mb-1">
                      Teacher feedback · {niceTime(project.draftFeedback.givenAt)}
                      {project.draftFeedback.by ? ` · ${project.draftFeedback.by}` : ""}
                    </div>
                    <div className="text-sm text-slate-800 whitespace-pre-wrap">{project.draftFeedback.text}</div>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">Waiting for your teacher's feedback. Keep working on your IA in the meantime.</p>
                )}
              </>
            )}
          </Card>

          <Card title="2. Final submission" icon={<Lock className="w-5 h-5 text-indigo-600" />}>
            {locked ? (
              <p className="text-sm text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Final version submitted on {niceTime(project.final!.submittedAt)} with your authenticity declaration.
              </p>
            ) : (
              <>
                <p className="text-sm text-slate-600 mb-2">
                  Once you submit your final version it <b>cannot be taken back</b> or changed. Make sure your documentation (PDF), video and appendices are also handed in the way
                  your teacher has asked.
                </p>
                {totalWords > IA_WORD_LIMIT && (
                  <p className="text-sm text-rose-700 font-semibold flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4" /> Your documentation is {totalWords - IA_WORD_LIMIT} words over the {IA_WORD_LIMIT.toLocaleString()}-word limit.
                  </p>
                )}
                <label className="flex items-start gap-2 text-sm text-slate-800 p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <input type="checkbox" className="mt-1" checked={declaration} onChange={(e) => setDeclaration(e.target.checked)} />
                  <span>
                    I confirm that this work is my own authentic work, that all sources, code libraries and help I have used are acknowledged, and that this is the final
                    version of my internal assessment.
                  </span>
                </label>
                {!confirmFinal ? (
                  <button
                    disabled={!declaration}
                    onClick={() => setConfirmFinal(true)}
                    className="mt-3 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-bold disabled:opacity-40"
                  >
                    Final submit
                  </button>
                ) : (
                  <div className="mt-3 p-3 rounded-lg border border-rose-300 bg-rose-50 space-y-2">
                    <p className="text-sm text-rose-900 font-semibold">This is final and cannot be undone. Submit now?</p>
                    <div className="flex gap-2">
                      <button
                        disabled={submitBusy || !declaration}
                        onClick={() => submit("final")}
                        className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-bold disabled:opacity-50"
                      >
                        {submitBusy ? "Submitting..." : "Yes, submit my final version"}
                      </button>
                      <button onClick={() => setConfirmFinal(false)} className="px-4 py-2 rounded-lg border border-slate-300 text-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            {submitError && <p className="mt-2 text-sm text-rose-600">{submitError}</p>}
          </Card>

          {project.marksReleased && project.marks && (
            <Card title="Your marks" icon={<CheckCircle2 className="w-5 h-5 text-indigo-600" />}>
              <p className="text-xs text-slate-500 mb-2">These are your teacher's internal marks. The IB may adjust them after moderation.</p>
              <table className="w-full text-sm">
                <tbody>
                  {IA_CRITERIA.map((c) => {
                    const m = project.marks?.[c.id];
                    return (
                      <tr key={c.id} className="border-t border-slate-100 align-top">
                        <td className="py-2 pr-2 font-semibold whitespace-nowrap">
                          {c.id}. {c.name}
                        </td>
                        <td className="py-2 pr-2 whitespace-nowrap">{typeof m?.mark === "number" ? m.mark : "-"} / {c.max}</td>
                        <td className="py-2 text-slate-600 whitespace-pre-wrap">{m?.comment || ""}</td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-slate-300 font-bold">
                    <td className="py-2">Total</td>
                    <td className="py-2">
                      {totalMark(project) ?? "-"} / {IA_TOTAL_MARKS}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

// ---------- small pieces ----------
function PinInput({ value, onChange, placeholder, onEnter }: { value: string; onChange: (v: string) => void; placeholder: string; onEnter: () => void }) {
  return (
    <input
      type="password"
      inputMode="numeric"
      autoComplete="off"
      pattern="[0-9]*"
      maxLength={6}
      className="block w-full border border-slate-300 rounded-lg px-3 py-2 text-lg font-mono tracking-[0.4em] placeholder:tracking-normal placeholder:font-sans placeholder:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
      onKeyDown={(e) => e.key === "Enter" && onEnter()}
    />
  );
}

function SaveIndicator({ state, lastSavedAt, msg, locked }: { state: SaveState; lastSavedAt: number | null; msg: string; locked: boolean }) {
  if (locked)
    return (
      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
        <Lock className="w-3.5 h-3.5" /> Submitted
      </span>
    );
  const map: Record<SaveState, { cls: string; text: string }> = {
    saved: { cls: "text-emerald-700 bg-emerald-50 border-emerald-200", text: lastSavedAt ? `All changes saved ${new Date(lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "All changes saved" },
    unsaved: { cls: "text-slate-600 bg-slate-50 border-slate-200", text: "Unsaved changes..." },
    saving: { cls: "text-indigo-700 bg-indigo-50 border-indigo-200", text: "Saving..." },
    error: { cls: "text-rose-700 bg-rose-50 border-rose-200", text: msg || "Not saved - retrying" },
  };
  const s = map[state];
  return (
    <span className={`text-xs font-semibold border rounded-full px-2.5 py-1 flex items-center gap-1 max-w-xs ${s.cls}`} aria-live="polite">
      {state === "saving" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : state === "saved" ? <CheckCircle2 className="w-3.5 h-3.5" /> : state === "error" ? <AlertTriangle className="w-3.5 h-3.5" /> : null}
      {s.text}
    </span>
  );
}

function WordBar({ words, total }: { words: Record<CriterionId, number>; total: number }) {
  const over = total > IA_WORD_LIMIT;
  const near = !over && total >= IA_WORD_LIMIT * 0.9;
  const pct = Math.min(100, (total / IA_WORD_LIMIT) * 100);
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
        <span className={`font-bold ${over ? "text-rose-700" : near ? "text-amber-700" : "text-slate-700"}`}>
          {total.toLocaleString()} / {IA_WORD_LIMIT.toLocaleString()} words{over ? ` - ${total - IA_WORD_LIMIT} over the limit!` : ""}
        </span>
        <span className="text-slate-500 flex flex-wrap gap-x-3">
          {IA_CRITERIA.map((c) => (
            <span key={c.id} className={words[c.id] > c.words * 1.2 ? "text-amber-700 font-semibold" : ""}>
              {c.id}: {words[c.id]}/{c.words}
            </span>
          ))}
        </span>
      </div>
      <div className="h-2 mt-1 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full ${over ? "bg-rose-500" : near ? "bg-amber-500" : "bg-indigo-500"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function SectionEditor({
  crit,
  text,
  words,
  locked,
  onChange,
}: {
  crit: (typeof IA_CRITERIA)[number];
  text: string;
  words: number;
  locked: boolean;
  onChange: (t: string) => void;
}) {
  const [open, setOpen] = useState(!text);
  const over = words > crit.words * 1.2;
  const ratio = crit.words ? words / crit.words : 0;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <h2 className="font-bold text-slate-900">
          <span className="inline-flex w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 items-center justify-center mr-2">{crit.id}</span>
          {crit.name} <span className="text-xs font-semibold text-slate-500">({crit.max} marks)</span>
        </h2>
        <span
          className={`text-xs font-bold rounded-full px-2.5 py-1 ${
            over ? "bg-amber-100 text-amber-800" : ratio >= 0.8 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
          }`}
          title="Recommended, not a hard limit - the 2,000 total is the limit"
        >
          {words} / {crit.words} words recommended
        </span>
      </div>
      <button onClick={() => setOpen(!open)} className="mt-2 text-xs font-bold text-indigo-600 flex items-center gap-1">
        {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />} What to include
      </button>
      {open && (
        <div className="mt-2 rounded-lg bg-indigo-50/60 border border-indigo-100 p-3 text-sm text-slate-700 space-y-2">
          <p className="font-semibold">{crit.student.summary}</p>
          <ul className="list-disc pl-5 space-y-0.5">
            {crit.student.include.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
          <div className="text-xs text-slate-600 space-y-0.5">
            {crit.student.tips.map((x, i) => (
              <p key={i}>Tip: {x}</p>
            ))}
          </div>
        </div>
      )}
      <textarea
        className="mt-3 w-full min-h-[10rem] border border-slate-300 rounded-lg px-3 py-2 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-slate-50"
        value={text}
        disabled={locked}
        maxLength={40000}
        placeholder={`Write criterion ${crit.id} here...`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}

function StatusSelect({ value, disabled, onChange }: { value: MilestoneStatus; disabled?: boolean; onChange: (v: MilestoneStatus) => void }) {
  const cls = value === "done" ? "bg-emerald-50 text-emerald-800 border-emerald-300" : value === "doing" ? "bg-amber-50 text-amber-800 border-amber-300" : "bg-white text-slate-600 border-slate-300";
  return (
    <select className={`border rounded px-2 py-1 text-xs font-semibold ${cls}`} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value as MilestoneStatus)}>
      {(Object.keys(STATUS_LABEL) as MilestoneStatus[]).map((k) => (
        <option key={k} value={k}>
          {STATUS_LABEL[k]}
        </option>
      ))}
    </select>
  );
}

function Checklist({
  items,
  values,
  disabled,
  onChange,
}: {
  items: { id: string; label: string; hint?: string }[];
  values: Record<string, boolean>;
  disabled?: boolean;
  onChange: (id: string, v: boolean) => void;
}) {
  return (
    <div className="space-y-1">
      {items.map((it) => (
        <label key={it.id} className="flex items-start gap-2 text-sm text-slate-700 py-0.5">
          <input type="checkbox" className="mt-1" checked={!!values[it.id]} disabled={disabled} onChange={(e) => onChange(it.id, e.target.checked)} />
          <span>
            {it.label}
            {it.hint && <span className="block text-xs text-slate-500">{it.hint}</span>}
          </span>
        </label>
      ))}
    </div>
  );
}

function VideoLength({ value, disabled, onChange }: { value: string; disabled?: boolean; onChange: (v: string) => void }) {
  const secs = parseDuration(value);
  const over = secs !== null && secs > IA_VIDEO_MAX_SECONDS;
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <label className="text-sm font-semibold text-slate-700">Video length (m:ss)</label>
      <input
        className={`w-24 border rounded px-2 py-1 text-sm ${over ? "border-rose-400 bg-rose-50" : "border-slate-300"}`}
        placeholder="4:30"
        value={value}
        maxLength={12}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && secs === null && <span className="text-xs text-slate-500">Type it like 4:30</span>}
      {over && <span className="text-xs font-bold text-rose-700">Over the 5-minute limit - cut it down.</span>}
      {secs !== null && !over && <span className="text-xs font-semibold text-emerald-700">Within the 5-minute limit</span>}
    </div>
  );
}
