# IA tracker - integration

New files (nothing else was edited): `iaServer.ts`, `src/components/IA/{iaCriteria.ts, IAStudentApp.tsx, IATeacherPanel.tsx}`.
Student link: `/?ia=CODE` (6 chars, codes start with `I`). Treat it as a **long-lived link like `?learn=`** (120 days), not a day-long task/assessment lock.

## 1. server.ts

```ts
// imports (next to the learnServer import, line ~15)
import { registerIARoutes, loadIAData, iaClassesDb, iaProjectsDb, iaNeedsFresh } from "./iaServer.js";

// right after registerLearnRoutes(...) (line ~6928)
loadIAData(DATA_DIR);
registerIARoutes(app, { requireTeacher });

// in initSharedCollections(), after learnProgress
const iaClasses = new SyncedCollection("ia_classes", () => iaClassesDb, (id, value) => {
  if (value === null) delete iaClassesDb[id];
  else iaClassesDb[id] = value;
});
const iaProjects = new SyncedCollection("ia_projects", () => iaProjectsDb, (id, value) => {
  if (value === null) delete iaProjectsDb[id];
  else iaProjectsDb[id] = value;
});
// and add them to the list:
sharedCollections = [assessments, students, questions, teachers, settings, dataFiles, learnClasses, learnProgress, iaClasses, iaProjects];

// HOT_COLLECTIONS: add "ia_classes", "ia_projects"
const HOT_COLLECTIONS = new Set(["assessments", "students", "learn_classes", "learn_progress", "ia_classes", "ia_projects"]);

// needsFreshData(): next to the Learning Hub line
if (/^\/ia\//.test(req.path)) return iaNeedsFresh(req);
```

## 2. src/App.tsx

```tsx
// top, next to LearnStudentApp
const IAStudentApp = React.lazy(() => import("./components/IA/IAStudentApp"));
```

`rememberStudentLink()` - add a branch before the `learn` one (long-lived, like learn):
```ts
else if (p.get("ia")) {
  link = `?ia=${encodeURIComponent(p.get("ia")!.trim().toUpperCase())}`;
  days = 120;
}
```

`keepStudentOnTheirLink()` - add `p.get("ia")` to BOTH `isStudentLink` and `studentLink` conditions
(`... || p.get("learn") || p.get("ia") || ...`).

In `App()` next to the `learnCode` state:
```tsx
const [iaCode] = useState<string>(() => {
  try {
    return (new URLSearchParams(window.location.search).get("ia") || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  } catch {
    return "";
  }
});
```
and in the `learnCode` initializer, make an IA link win over the Learning Hub lock - change
`if (isStaffAddress() || params.has("task") || params.has("assessment") || ...) return "";` to also include `params.has("ia")`.

Guards so the Learning Hub / exam-lock redirects never pull a student off their IA:
- in the "send locked students back" effect: after `if (learnCode) return;` add `if (iaCode) return;`
- in `parseUrlRoute`: after `if (learnCode) return;` add `if (iaCode) return;`

Render, just before `if (learnCode) { ... }`:
```tsx
if (iaCode) {
  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">CS</span>
          <span className="font-bold text-slate-900">Computer Science IA</span>
        </div>
      </header>
      <main className="flex-1 w-full px-4 sm:px-6 py-6">
        <React.Suspense fallback={<div className="p-8 text-center text-slate-500">Loading your IA...</div>}>
          <IAStudentApp code={iaCode} />
        </React.Suspense>
      </main>
    </div>
  );
}
```

`StudentCodeLanding.go()` (optional, lets a student type the code): before the learn check
```ts
const ia = await fetch(`/api/ia/c/${encodeURIComponent(c)}`);
if (ia.ok) {
  window.location.href = `/?ia=${encodeURIComponent(c)}`;
  return;
}
```

## 3. src/components/TeacherDashboard/TeacherDashboard.tsx

```tsx
// next to LearnTeacherPanel (line ~15)
const IATeacherPanel = React.lazy(() => import("../IA/IATeacherPanel"));

// activeTab union (line ~70): add "ia"
useState<"live" | ... | "learn" | "combined" | "ia">("live")

// tab button, right after the Learning Hub button
<button
  data-testid="teacher-tab-ia"
  onClick={() => setActiveTab("ia")}
  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
    activeTab === "ia" ? "bg-purple-600 text-white shadow-sm shadow-purple-600/20" : "text-indigo-700 hover:text-indigo-950 hover:bg-indigo-50"
  }`}
  title="Internal Assessment tracker: drafts, milestones, marking"
>
  <span>📝 IA</span>
</button>

// panel, next to the learn panel
{activeTab === "ia" && (
  <React.Suspense fallback={<div className="p-8 text-center text-slate-500">Loading the IA tracker...</div>}>
    <IATeacherPanel />
  </React.Suspense>
)}
```

## API summary
Teacher (requireTeacher): `GET/POST /api/ia/classes`, `PUT/DELETE /api/ia/classes/:id`, `GET /api/ia/classes/:id/projects`,
`PUT .../projects/:sid/marks`, `POST .../projects/:sid/draft-feedback` (409 if already given), `PUT .../projects/:sid/flags`
(marksReleased, sample, moderationNote), `POST /api/ia/classes/:id/release`, `POST .../projects/:sid/reopen`, `DELETE .../projects/:sid`.
Student: `GET /api/ia/c/:code`, `POST /api/ia/c/:code/join` (name -> `{step}`; name+PIN -> `{project, token}`), `POST /api/ia/c/:code/logout`, `GET /api/ia/c/:code/me?sid=`, `PUT /api/ia/c/:code/project`,
`POST /api/ia/c/:code/draft` (once), `POST /api/ia/c/:code/final` (needs `declaration: true`; locks the project).
Teacher also: `POST .../projects/:sid/reset-pin` (clears PIN + all sessions; the student chooses a new PIN next time).

Student identity: name + 4-6 digit PIN chosen on first open (scrypt hash + random salt stored on the project). After 5 wrong PINs the project is locked for 15 minutes, with a growing delay (0.4s per wrong try) on each failure. A successful sign-in returns a random session token (only its SHA-256 is stored, max 8 per student, 400-day life); the browser keeps `{sid, token}` in localStorage `ibcs_ia_session_<CODE>` and sends it as header `x-ia-token` on every student request (`/me`, `/project`, `/draft`, `/final`). No server.ts/App.tsx change is needed for this beyond the steps above. PIN hashes, salts, fail counters and sessions are never sent to students or teachers (teachers get `hasPin` / `pinLocked`).

Students never receive marks, sample flag or moderation notes unless `marksReleased` (marks/comments only).
