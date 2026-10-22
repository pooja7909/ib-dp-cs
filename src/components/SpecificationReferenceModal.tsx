import React, { useState } from "react";
import { BookOpen, X, Layers, ListOrdered, FileCheck, Award, Code2, HelpCircle } from "lucide-react";
import { IB_TOPICS, IB_PAPERS, IB_COMMAND_TERMS } from "../data/ibSyllabus";

interface SpecificationReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "overview" | "topics" | "assessment" | "command_terms" | "programming";

const fmtTime = (min: number) => (min >= 60 ? `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60} min` : ""}` : `${min} min`);

export const SpecificationReferenceModal: React.FC<SpecificationReferenceModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>("topics");
  const [level, setLevel] = useState<"All" | "SL" | "HL">("All");

  if (!isOpen) return null;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "topics", label: "Syllabus topics", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "assessment", label: "Papers & IA", icon: <FileCheck className="w-3.5 h-3.5" /> },
    { id: "command_terms", label: "Command terms", icon: <ListOrdered className="w-3.5 h-3.5" /> },
    { id: "programming", label: "Python (Paper 2)", icon: <Code2 className="w-3.5 h-3.5" /> },
  ];

  const totalHours = (lv: "SL" | "HL") => IB_TOPICS.reduce((a, t) => a + t.hours[lv], 0);
  const themes = Array.from(new Set(IB_TOPICS.map((t) => t.theme)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-5xl h-[88vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm shadow-blue-600/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900">IB Diploma Programme Computer Science</h2>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-mono font-bold">First assessment 2027</span>
              </div>
              <p className="text-xs text-slate-500">
                Syllabus topics and subtopics (HL-only content tagged), papers and marks for SL and HL, internal assessment and IB command terms
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors" title="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 flex flex-wrap gap-1.5">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`spec-tab-${tab.id}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg border-b-2 transition-colors ${
                  active ? "border-blue-600 text-blue-800 bg-blue-50" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-slate-800">
          {activeTab === "overview" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themes.map((th) => (
                  <div key={th} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-xs font-extrabold text-slate-900">{th}</div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      {IB_TOPICS.filter((t) => t.theme === th)
                        .map((t) => `${t.code} ${t.title}`)
                        .join(" · ")}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 text-xs text-blue-950 space-y-1.5">
                <div className="font-bold">How SL and HL differ</div>
                <p>
                  SL and HL share the same topics. HL students study extra subtopics and learning outcomes (tagged <b>HL</b> in this guide),
                  including B4 Abstract data types, multiple-class OOP (B3.2), recursion, translation (A1.4), data warehouses (A3.4) and
                  machine learning approaches (A4.2-A4.3). Teaching hours: SL {totalHours("SL")} h, HL {totalHours("HL")} h (taught
                  syllabus), plus 35 h for the internal assessment.
                </p>
                <p>
                  Grades are awarded on the IB 7-1 scale (7 highest). In this app, grade boundaries can be set per assessment.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {(["SL", "HL"] as const).map((lv) => (
                  <div key={lv} className="p-4 rounded-xl border border-slate-200">
                    <div className="font-extrabold text-slate-900 mb-1">{lv === "SL" ? "Standard level (SL)" : "Higher level (HL)"}</div>
                    <ul className="space-y-0.5 text-slate-700">
                      <li>Paper 1: {IB_PAPERS[lv].paper1.marks} marks, {fmtTime(IB_PAPERS[lv].paper1.minutes)} ({IB_PAPERS[lv].paper1.weight}%)</li>
                      <li>Paper 2: {IB_PAPERS[lv].paper2.marks} marks, {fmtTime(IB_PAPERS[lv].paper2.minutes)} ({IB_PAPERS[lv].paper2.weight}%)</li>
                      <li>Internal assessment: {IB_PAPERS[lv].ia.marks} marks ({IB_PAPERS[lv].ia.weight}%)</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "topics" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">Show:</span>
                {(["All", "SL", "HL"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setLevel(v)}
                    className={`px-3 py-1 rounded-lg font-bold border ${
                      level === v ? "bg-indigo-700 text-white border-indigo-700" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {v === "All" ? "All content" : v === "SL" ? "SL content only" : "HL (SL + HL)"}
                  </button>
                ))}
              </div>
              {themes.map((th) => (
                <div key={th} className="space-y-2">
                  <h3 className="text-sm font-extrabold text-slate-900">{th}</h3>
                  {IB_TOPICS.filter((t) => t.theme === th).map((t) => {
                    const subs = t.subtopics.filter((s) => level !== "SL" || !s.hlOnly);
                    const hlOnlyTopic = t.subtopics.every((s) => s.hlOnly);
                    if (level === "SL" && hlOnlyTopic) {
                      return (
                        <div key={t.code} className="p-3 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
                          {t.code} {t.title} - HL only
                        </div>
                      );
                    }
                    return (
                      <div key={t.code} className="rounded-xl border border-slate-200 overflow-hidden" data-testid={`spec-topic-${t.code}`}>
                        <div className="px-4 py-2.5 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white font-mono text-xs font-bold">{t.code}</span>
                            <span className="text-sm font-bold text-slate-900">{t.title}</span>
                            {hlOnlyTopic && <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300 text-[10px] font-extrabold">HL only</span>}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {t.paper} · SL {t.hours.SL} h · HL {t.hours.HL} h
                          </div>
                        </div>
                        <ul className="divide-y divide-slate-100">
                          {subs.map((s) => (
                            <li key={s.code} className="px-4 py-2 flex items-center justify-between text-xs">
                              <span>
                                <span className="font-mono font-bold text-slate-700 mr-2">{s.code}</span>
                                {s.title}
                              </span>
                              {s.hlOnly && <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300 text-[10px] font-extrabold">HL</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ))}
              <p className="text-[11px] text-slate-500">
                Some individual learning outcomes inside SL subtopics are also HL only (for example A1.1.3 CPU vs GPU, A2.1.5 TCP/IP model,
                A3.3.4-A3.3.6 aggregate functions, views and transactions, B2.4.4-B2.4.5 recursion).
              </p>
            </div>
          )}

          {activeTab === "assessment" && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="text-left p-2.5">Component</th>
                      <th className="text-left p-2.5">Content</th>
                      <th className="text-center p-2.5">SL</th>
                      <th className="text-center p-2.5">HL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-bold">Paper 1</td>
                      <td className="p-2.5">
                        Section A: extended-response questions on theme A (A1-A4). Section B: questions on the pre-seen case study
                        (SL: two challenge questions, HL: four).
                      </td>
                      <td className="p-2.5 text-center">
                        {IB_PAPERS.SL.paper1.marks} marks ({IB_PAPERS.SL.paper1.sectionA} + {IB_PAPERS.SL.paper1.sectionB})<br />
                        {fmtTime(IB_PAPERS.SL.paper1.minutes)} · {IB_PAPERS.SL.paper1.weight}%
                      </td>
                      <td className="p-2.5 text-center">
                        {IB_PAPERS.HL.paper1.marks} marks ({IB_PAPERS.HL.paper1.sectionA} + {IB_PAPERS.HL.paper1.sectionB})<br />
                        {fmtTime(IB_PAPERS.HL.paper1.minutes)} · {IB_PAPERS.HL.paper1.weight}%
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Paper 2</td>
                      <td className="p-2.5">
                        Extended-response questions on theme B (B1-B4), Python version. One question tests algorithmic thinking without code.
                        Some questions prohibit specific built-in functions (e.g. sort, max, min).
                      </td>
                      <td className="p-2.5 text-center">
                        {IB_PAPERS.SL.paper2.marks} marks<br />
                        {fmtTime(IB_PAPERS.SL.paper2.minutes)} · {IB_PAPERS.SL.paper2.weight}%
                      </td>
                      <td className="p-2.5 text-center">
                        {IB_PAPERS.HL.paper2.marks} marks<br />
                        {fmtTime(IB_PAPERS.HL.paper2.minutes)} · {IB_PAPERS.HL.paper2.weight}%
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Internal assessment</td>
                      <td className="p-2.5">The computational solution (35 hours): internally assessed, externally moderated.</td>
                      <td className="p-2.5 text-center">
                        {IB_PAPERS.SL.ia.marks} marks · {IB_PAPERS.SL.ia.weight}%
                      </td>
                      <td className="p-2.5 text-center">
                        {IB_PAPERS.HL.ia.marks} marks · {IB_PAPERS.HL.ia.weight}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Markscheme conventions
                </div>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>One mark per valid point: "Award [1] for ...", with "[N max]" where more points exist than marks.</li>
                  <li>"Accept" / "Do not accept" notes list alternatives and common wrong answers.</li>
                  <li>Discuss / Evaluate / To what extent questions (normally 6+ marks) are marked with levels-based markbands.</li>
                  <li>Case study answers must be applied to the case study context.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "command_terms" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                The command term sets the depth of answer expected. AO1 = knowledge, AO2 = application, AO3 = analysis, evaluation and
                construction.
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="text-left p-2.5">Command term</th>
                      <th className="text-center p-2.5">AO</th>
                      <th className="text-left p-2.5">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {IB_COMMAND_TERMS.map((c) => (
                      <tr key={c.term}>
                        <td className="p-2.5 font-bold text-slate-900">{c.term}</td>
                        <td className="p-2.5 text-center">
                          <span
                            className={`px-1.5 py-0.5 rounded font-mono font-bold ${
                              c.ao === 1 ? "bg-slate-100 text-slate-700" : c.ao === 2 ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            AO{c.ao}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-700">{c.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "programming" && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Python expected for Paper 2 (SL and HL)</div>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                  <li>B2.1 variables and scope, data types, substrings, exceptions (try / except / finally), debugging and trace tables</li>
                  <li>B2.2 1D and 2D lists, static vs dynamic structures, stacks (push, pop, peek, isEmpty) and queues (enqueue, dequeue, front, isEmpty)</li>
                  <li>B2.3 sequence, selection (if / elif / else), counted and conditional loops, functions and modularisation</li>
                  <li>B2.4 Big O, linear and binary search, bubble sort and selection sort</li>
                  <li>B2.5 text files: open(), read(), readline(), write(), close() in read / write / append modes</li>
                  <li>B3.1 a single class: attributes, methods, constructors, encapsulation, static vs instance members</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
                <div className="font-bold text-indigo-950 mb-1">HL only</div>
                <ul className="list-disc pl-5 space-y-0.5 text-indigo-900">
                  <li>B2.4.4-B2.4.5 recursion (simple, non-branching recursive algorithms; quicksort as a concept)</li>
                  <li>B3.2 multiple classes: inheritance, polymorphism, aggregation / composition, UML</li>
                  <li>B4.1 abstract data types: linked lists, stacks and queues as ADTs, binary search trees, sets, hash tables</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-950 flex gap-2">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  Built-in functions such as sort, pop, len, max and min are allowed in general, but some exam questions prohibit specific
                  built-ins. The question says so clearly when it does.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex justify-between">
          <span>IB Diploma Programme Computer Science guide (first assessment 2027)</span>
          <span>The British International School, Budapest</span>
        </div>
      </div>
    </div>
  );
};
