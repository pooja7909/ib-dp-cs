import React, { useState, useMemo } from "react";
import { IGCSEUnit, IGCSETask, MarkResult } from "../types";
import { QuestionCard } from "./QuestionCard";
import {
  getUnitPaper,
  getPaper2TaskStyle,
  PAPER_2_STYLES,
  Paper2QuestionStyle,
  IBPaper,
} from "../utils/examPaperStyles";
import { IB_TOPICS, IB_PAPERS } from "../data/ibSyllabus";
import { matchesIBLevel } from "../utils/ibTopics";
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Award,
  ChevronRight,
  Code2,
  Sparkles,
  HelpCircle,
  FileText,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  Clock,
  ShieldAlert,
  Flame,
  Binary,
  Globe,
  HardDrive,
  Scale,
  BrainCircuit,
} from "lucide-react";

interface PracticeModeProps {
  units: IGCSEUnit[];
  allTasks: Record<string, IGCSETask>;
  onOpenHelpGuide?: () => void;
  allowCopyPaste?: boolean;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  units,
  allTasks,
  onOpenHelpGuide,
  allowCopyPaste,
}) => {
  // Active Paper: default is "Paper 2" (theme B, Python programming)
  const [selectedPaper, setSelectedPaper] = useState<IBPaper>("Paper 2");

  // Filter units by paper
  const paperUnits = useMemo(() => {
    return units.filter((u) => getUnitPaper(u) === selectedPaper);
  }, [units, selectedPaper]);

  const [selectedUnitCode, setSelectedUnitCode] = useState<string>(() => {
    const firstP2 = units.find((u) => getUnitPaper(u) === "Paper 2");
    return firstP2?.code || "B2";
  });

  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  // IB level: SL hides HL-only questions
  const [ibLevelFilter, setIbLevelFilter] = useState<"All" | "SL" | "HL">("All");
  const [questionStyleFilter, setQuestionStyleFilter] = useState<Paper2QuestionStyle>("all");
  const [isAssessmentMode, setIsAssessmentMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [results, setResults] = useState<Record<string, MarkResult>>({});

  // When switching paper, ensure an appropriate unit is selected
  const handleSelectPaper = (paper: IBPaper) => {
    setSelectedPaper(paper);
    const available = units.filter((u) => getUnitPaper(u) === paper);
    if (available.length > 0) {
      setSelectedUnitCode(available[0].code);
      if (available[0].tasks && available[0].tasks[0]) {
        setSelectedTaskId(available[0].tasks[0].id);
      }
    }
  };

  const activeUnit = paperUnits.find((u) => u.code === selectedUnitCode) || paperUnits[0] || units[0];

  // Filter tasks within active unit
  const filteredTasks = useMemo(() => {
    if (!activeUnit) return [];
    return (activeUnit.tasks || []).filter((task) => {
      if (levelFilter !== "all" && task.level !== levelFilter) return false;
      if (!matchesIBLevel(task, ibLevelFilter)) return false;
      if (selectedPaper === "Paper 2" && questionStyleFilter !== "all") {
        const style = getPaper2TaskStyle(task);
        if (style !== questionStyleFilter) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(q) ||
          task.brief.toLowerCase().includes(q) ||
          (task.unit && task.unit.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [activeUnit, levelFilter, ibLevelFilter, questionStyleFilter, searchQuery, selectedPaper]);

  const currentTask =
    (selectedTaskId && allTasks[selectedTaskId]) ||
    filteredTasks[0] ||
    activeUnit?.tasks[0];

  const handleAnswerChange = (newAns: any) => {
    if (!currentTask) return;
    setAnswers((prev) => ({
      ...prev,
      [currentTask.id]: newAns,
    }));
  };

  const handleCheck = (result: MarkResult) => {
    if (!currentTask) return;
    setResults((prev) => ({
      ...prev,
      [currentTask.id]: result,
    }));
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* SECTION 1: TWO MAIN HEADINGS - PAPER 1 & PAPER 2                          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(["Paper 1", "Paper 2"] as const).map((paper) => {
          const active = selectedPaper === paper;
          const isP1 = paper === "Paper 1";
          const sl = isP1 ? IB_PAPERS.SL.paper1 : IB_PAPERS.SL.paper2;
          const hl = isP1 ? IB_PAPERS.HL.paper1 : IB_PAPERS.HL.paper2;
          return (
            <button
              key={paper}
              type="button"
              onClick={() => handleSelectPaper(paper)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                active
                  ? isP1
                    ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-500/40"
                    : "bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-500/40"
                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:shadow-sm"
              }`}
            >
              <span
                className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  active ? "bg-white/15 text-white border border-white/30" : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {isP1 ? "Paper 1 • Theme A + case study" : "Paper 2 • Theme B • Python"}
              </span>
              <h3 className={`text-lg font-black tracking-tight mt-2.5 ${active ? "text-white" : "text-slate-900"}`}>
                {isP1 ? "Paper 1: Concepts of computer science" : "Paper 2: Computational thinking and problem-solving"}
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${active ? "text-slate-200/90" : "text-slate-500"}`}>
                SL {sl.marks} marks • {sl.minutes} min • {sl.weight}% &nbsp;|&nbsp; HL {hl.marks} marks • {hl.minutes} min • {hl.weight}%
                <br />
                {isP1
                  ? "A1 Computer fundamentals, A2 Networks, A3 Databases, A4 Machine learning and the pre-seen case study."
                  : "B1 Computational thinking, B2 Programming, B3 OOP, B4 Abstract data types (HL) - with the browser Python runner."}
              </p>
            </button>
          );
        })}
      </div>

      {/* Topic picker for the selected paper */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {selectedPaper}
            </span>
            {activeUnit?.spec && (
              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">{activeUnit.spec}</span>
            )}
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                allowCopyPaste ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-amber-800 bg-amber-50 border-amber-200"
              }`}
              title={
                allowCopyPaste
                  ? "Teacher setting: Copy and paste is permitted in practice mode"
                  : "Teacher setting: Copy and paste is disabled in practice mode"
              }
            >
              <ShieldAlert className="w-3 h-3" />
              {allowCopyPaste ? "Copy/Paste: Allowed" : "Copy/Paste: Disabled by Teacher"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {activeUnit ? (activeUnit.title.startsWith(activeUnit.code) ? activeUnit.title : `${activeUnit.code}: ${activeUnit.title}`) : selectedPaper}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Auto-marked practice for IB Diploma Programme Computer Science (SL and HL).
            {activeUnit && IB_TOPICS.find((t) => t.code === activeUnit.code)
              ? " " +
                IB_TOPICS.find((t) => t.code === activeUnit.code)!
                  .subtopics.map((st) => `${st.code} ${st.title}${st.hlOnly ? " (HL)" : ""}`)
                  .join(" · ")
              : ""}
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            {(["All", "SL", "HL"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setIbLevelFilter(v)}
                title={v === "SL" ? "Hide HL-only questions" : v === "HL" ? "SL and HL questions" : "All questions"}
                className={`px-3 py-1.5 rounded-lg ${ibLevelFilter === v ? "bg-indigo-700 text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                {v}
              </button>
            ))}
          </div>

          {onOpenHelpGuide && (
            <button
              type="button"
              onClick={onOpenHelpGuide}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors cursor-pointer shrink-0"
              title="Learn how Practice Mode, Python runner, and AI Scaffolding work"
            >
              <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
              <span>Features Guide</span>
            </button>
          )}

          <select
            value={selectedUnitCode}
            onChange={(e) => {
              setSelectedUnitCode(e.target.value);
              const nextUnit = paperUnits.find((u) => u.code === e.target.value);
              if (nextUnit && nextUnit.tasks && nextUnit.tasks[0]) {
                setSelectedTaskId(nextUnit.tasks[0].id);
              }
            }}
            className="w-full sm:w-80 px-3.5 py-2.5 text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
          >
            {paperUnits.map((u) => (
              <option key={u.code} value={u.code}>
                {u.title.startsWith(u.code) ? u.title : `${u.code}: ${u.title}`} ({(u.tasks || []).length} questions)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Question style filter (Paper 2) */}
      {selectedPaper === "Paper 2" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs">
          <div className="flex items-center gap-2 mb-2 px-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Filter by question style:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {(Object.keys(PAPER_2_STYLES) as Paper2QuestionStyle[]).map((styleKey) => {
              const meta = PAPER_2_STYLES[styleKey];
              const isSelected = questionStyleFilter === styleKey;
              return (
                <button
                  key={styleKey}
                  type="button"
                  onClick={() => setQuestionStyleFilter(styleKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected ? "bg-slate-900 text-white shadow-xs" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                  title={meta.description}
                >
                  <span>{meta.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Student Mode Switcher: Guided Practice vs Assessment Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-700">Student Mode:</span>
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setIsAssessmentMode(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                !isAssessmentMode
                  ? "bg-white text-purple-900 shadow-xs ring-1 ring-purple-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Guided Practice (AI Tutor Active)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAssessmentMode(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isAssessmentMode
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Assessment Mode (Exam Conditions)</span>
            </button>
          </div>
        </div>

        {isAssessmentMode ? (
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Assessment Mode: AI Practice Tutor, clues, and scaffolding are strictly hidden</span>
          </div>
        ) : (
          <div className="text-xs text-slate-500 font-medium hidden md:block">
            Switch to Assessment Mode when testing yourself under strict examination conditions.
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MAIN TWO-COLUMN QUESTION WORKSPACE                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Task Sidebar with Exam Style Metadata */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Topic Questions ({(filteredTasks || []).length})
              </span>
              <span className="text-xs text-slate-400">
                {Object.keys(results).length} completed
              </span>
            </div>

            {/* Difficulty Filter buttons */}
            <div className="flex items-center gap-1">
              {(["all", "starter", "core", "exam"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`text-[11px] font-semibold px-2 py-1 rounded-md capitalize transition-colors cursor-pointer ${
                    levelFilter === lvl
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Task list items */}
            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {filteredTasks.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                  No questions match this filter style.
                </div>
              ) : (
                filteredTasks.map((t) => {
                  const isSelected = currentTask && currentTask.id === t.id;
                  const res = results[t.id];
                  const styleKey = getPaper2TaskStyle(t);
                  const styleMeta = PAPER_2_STYLES[styleKey] || PAPER_2_STYLES.all;

                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTaskId(t.id)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex flex-col gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50/90 border-emerald-400 text-emerald-950 font-semibold shadow-sm ring-1 ring-emerald-400/50"
                          : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 w-full">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {res ? (
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                res.passed ? "text-emerald-600" : "text-amber-500"
                              }`}
                            />
                          ) : (
                            <div className="w-3 h-3 rounded-full border border-slate-300 shrink-0" />
                          )}
                          <span className="truncate font-bold text-slate-900 block">
                            {t.title}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 shrink-0">
                          {t.ibLevel === "HL" && (
                            <span className="text-[9px] font-extrabold px-1 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300">HL</span>
                          )}
                          <span className="text-[10px] text-slate-500 font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded">{t.marks}m</span>
                        </span>
                      </div>

                      {/* Exam Style Badge */}
                      {selectedPaper === "Paper 2" && (
                        <div className="flex items-center gap-1 flex-wrap">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${styleMeta.bgColor} ${styleMeta.color} ${styleMeta.borderColor}`}
                          >
                            {styleMeta.badge}
                          </span>
                          <span className="text-[10px] text-slate-400 capitalize">
                            • {t.level}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right: Active Question Card */}
        <div className="lg:col-span-3">
          {currentTask ? (
            <QuestionCard
              key={currentTask.id}
              task={currentTask}
              mode={isAssessmentMode ? "exam" : "practice"}
              hideAiScaffold={isAssessmentMode}
              studentAnswer={answers[currentTask.id]}
              onAnswerChange={handleAnswerChange}
              onCheck={handleCheck}
              allowCopyPaste={allowCopyPaste}
            />
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-2">
              <p className="font-bold text-slate-700">No question selected</p>
              <p className="text-xs text-slate-400">
                Choose a question from the sidebar or adjust your filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
