/**
 * Shared IB Diploma Programme Computer Science examiner context for every AI prompt
 * (marking, Generate Similar, past-paper conversion, feedback, diagnostics, scaffolds).
 * Source: IB DP Computer Science guide, first assessment 2027.
 */
import { IB_TOPICS, IB_COMMAND_TERMS, IB_PAPERS } from "./src/data/ibSyllabus.js";

export const IB_QUALIFICATION = "IB Diploma Programme Computer Science (first assessment 2027)";
export const IB_EXAM_BOARD = "International Baccalaureate (IB)";
export const IB_SCHOOL = "The British International School, Budapest";

/** One line per role, e.g. `You are ${IB_EXAMINER_ROLE}.` */
export const IB_EXAMINER_ROLE =
  "an experienced IB Diploma Programme Computer Science examiner (guide for first assessment 2027, SL and HL, Python version of Paper 2)";

// Learning outcomes that are HL only (from the guide). SL candidates are never assessed on these.
export const IB_HL_ONLY_OUTCOMES = [
  "A1.1.3 CPU vs GPU differences",
  "A1.1.6 pipelining in multi-core architectures",
  "A1.3.5 OS multitasking and resource allocation",
  "A1.3.6-A1.3.7 control systems (open/closed loop, real-world control systems)",
  "A1.4 Translation (interpreters vs compilers, JIT, bytecode)",
  "A2.1.5 TCP/IP model",
  "A2.2.2 servers (DNS, DHCP, file, mail, proxy, web)",
  "A2.3.4 static and dynamic routing",
  "A2.4.2-A2.4.3 network vulnerabilities and countermeasures",
  "A3.3.4-A3.3.6 SQL aggregate functions, database views, transactions/ACID",
  "A3.4 alternative databases and data warehouses (NoSQL, OLAP, data mining, distributed databases)",
  "A4.2 data preprocessing (cleaning, feature selection, dimensionality reduction)",
  "A4.3 machine learning approaches (linear regression, classification, hyperparameters, clustering, association rules, reinforcement learning, genetic algorithms, ANNs, CNNs, model selection)",
  "B2.4.4-B2.4.5 recursion (simple, non-branching recursive algorithms only; quicksort as a concept)",
  "B3.2 OOP for multiple classes (inheritance, polymorphism, aggregation/composition, UML for several classes)",
  "B4 abstract data types (linked lists, stacks/queues as ADTs, binary search trees, sets, hash tables/dictionaries)",
];

export const IB_SCOPE_TEXT = [
  "IB DP COMPUTER SCIENCE SYLLABUS (topic codes used on every question):",
  ...IB_TOPICS.map(
    (t) =>
      `- ${t.code} ${t.title} [${t.paper}${t.code === "CS" ? ", Section B" : ""}]: ` +
      t.subtopics.map((s) => `${s.code} ${s.title}${s.hlOnly ? " (HL only)" : ""}`).join("; ")
  ),
  "HL-ONLY learning outcomes (never set or expect these for SL): " + IB_HL_ONLY_OUTCOMES.join("; ") + ".",
  `Papers: Paper 1 = theme A (Section A) + pre-seen case study (Section B). SL ${IB_PAPERS.SL.paper1.marks} marks / ${IB_PAPERS.SL.paper1.minutes} min, HL ${IB_PAPERS.HL.paper1.marks} marks / ${IB_PAPERS.HL.paper1.minutes} min. ` +
    `Paper 2 = theme B, Python version. SL ${IB_PAPERS.SL.paper2.marks} marks / ${IB_PAPERS.SL.paper2.minutes} min, HL ${IB_PAPERS.HL.paper2.marks} marks / ${IB_PAPERS.HL.paper2.minutes} min. ` +
    "One Paper 2 question focuses on algorithmic thinking without reading or writing code. HL papers repeat SL questions with additional HL-only parts.",
].join("\n");

export const IB_UNIT_CODES_TEXT = IB_TOPICS.map((t) => `${t.code}: ${t.title}${t.subtopics.every((s) => s.hlOnly) ? " (HL only)" : ""}`).join("\n");

export const IB_COMMAND_TERMS_TEXT =
  "IB COMMAND TERMS (the term sets the depth of answer and the marks):\n" +
  IB_COMMAND_TERMS.map((c) => `- ${c.term} (AO${c.ao}): ${c.meaning}`).join("\n") +
  "\nAO1 terms (Define, State, List, Label) usually earn [1] per correct point with no explanation needed. AO2 terms (Describe, Outline, Identify, Trace, Calculate, Distinguish) need a point plus some development. AO3 terms (Explain, Compare, Construct, Deduce, Suggest, Justify, Evaluate, Discuss, To what extent) need reasons, links to the context and, for Evaluate/Discuss/To what extent, a balanced argument and a supported conclusion.";

export const IB_MARKSCHEME_RULES = `IB MARKSCHEME CONVENTIONS:
- Point-based questions: one mark per valid, distinct point. Write each mark point as "Award [1] for ..." (or "Award [1] for ... and [1] for ..." for paired identification + development points), with "Award [N max]" where more valid points exist than marks.
- List acceptable alternatives explicitly ("Accept ...", "Accept equivalent wording") and common wrong answers ("Do not accept ...", "Do not award for ..."). Do not penalise the same error twice (follow-through / "ECF" where a later part uses an earlier wrong value correctly).
- Construct/code questions: award marks for each correct element of the algorithm or program (e.g. correct loop, correct condition, correct update, correct return/output); credit any valid Python solution that meets the requirements, not only the model answer. Minor syntax slips do not lose marks unless they change the logic, unless the question is specifically about syntax.
- Extended response (Discuss, Evaluate, To what extent, Justify; normally 6+ marks): use levels-based markbands, e.g. [0] no relevant knowledge; [1-2] basic, mostly descriptive, little use of the context; [3-4] some analysis with relevant points, partly linked to the context, conclusion may be unsupported; [5-6] (or the top band) balanced analysis of several points, consistently linked to the context, with a reasoned conclusion. Award the band that best fits, then the mark within the band.
- Case study (Paper 1 Section B) answers must apply knowledge to the case study context; generic answers lose development marks.
- SL vs HL: never expect HL-only content from an SL candidate. HL questions may extend an SL question with extra HL parts.`;

export const IB_PYTHON_RULES = `PROGRAMMING (Paper 2, Python version):
- Candidates write Python 3. Expected: variables and scope (local/global), data types (bool, str, int, float), substrings and string manipulation, try/except/finally, debugging and trace tables, 1D and 2D lists, stacks and queues with lists, selection (if/elif/else, and/or/not, relational operators), counted and conditional loops, functions and modularisation, linear and binary search, bubble sort and selection sort, Big O of these algorithms, text file processing with open(), read(), readline(), readlines(), write(), close() and "with".
- OOP (B3): classes, objects, constructors (__init__), attributes, methods, encapsulation (private attributes with getters/setters), static vs instance members. Multiple classes, inheritance, polymorphism, aggregation/composition and UML for several classes are HL only.
- HL only: recursion (simple, non-branching), B4 ADTs (linked lists, stacks/queues as ADTs, binary search trees, sets, hash tables/dictionaries).
- Built-in functions such as sort, sorted, pop, len, max and min are allowed in general, but IB questions may PROHIBIT specific built-ins (for example "without using the built-in sort or max functions"). When a question prohibits a built-in, say so clearly in the brief and do not credit solutions that use it; when it does not, accept any correct approach.
- Algorithmic-thinking questions (one per paper) can be answered without code (flowcharts, trace tables, written steps).
- 2D lists are rectangular lists of rows (numbers and/or strings).`;

/** Full context block to paste into examiner prompts. */
export function ibExaminerContext(opts: { level?: "SL" | "HL" | string; includeScope?: boolean; includePython?: boolean } = {}): string {
  const lvl = opts.level === "SL" || opts.level === "HL" ? opts.level : "";
  return [
    opts.includeScope === false ? "" : IB_SCOPE_TEXT,
    IB_COMMAND_TERMS_TEXT,
    IB_MARKSCHEME_RULES,
    opts.includePython === false ? "" : IB_PYTHON_RULES,
    lvl
      ? `LEVEL: ${lvl}. ${lvl === "SL" ? "Use SL content only - no HL-only learning outcomes." : "HL: SL and HL content may be used."}`
      : "LEVEL: if the question is HL-only content, mark it \"ibLevel\": \"HL\"; otherwise \"SL\" (SL questions are taken by SL and HL candidates).",
  ]
    .filter(Boolean)
    .join("\n\n");
}
