// IB Diploma Programme Computer Science (first assessment 2027) - topic catalogue used across the app.
export type IBLevel = "SL" | "HL";

export interface IBTopic {
  code: string; // unit code used on every question, e.g. "A1"
  title: string;
  theme: "Theme A: Concepts of computer science" | "Theme B: Computational thinking and problem-solving" | "Case study";
  paper: "Paper 1" | "Paper 2";
  subtopics: { code: string; title: string; hlOnly?: boolean }[];
  hours: { SL: number; HL: number };
}

export const IB_TOPICS: IBTopic[] = [
  {
    code: "A1", title: "Computer fundamentals", theme: "Theme A: Concepts of computer science", paper: "Paper 1", hours: { SL: 11, HL: 18 },
    subtopics: [
      { code: "A1.1", title: "Computer hardware and operation" },
      { code: "A1.2", title: "Data representation and computer logic" },
      { code: "A1.3", title: "Operating systems and control systems" },
      { code: "A1.4", title: "Translation", hlOnly: true },
    ],
  },
  {
    code: "A2", title: "Networks", theme: "Theme A: Concepts of computer science", paper: "Paper 1", hours: { SL: 11, HL: 18 },
    subtopics: [
      { code: "A2.1", title: "Network fundamentals" },
      { code: "A2.2", title: "Network architecture" },
      { code: "A2.3", title: "Data transmissions" },
      { code: "A2.4", title: "Network security" },
    ],
  },
  {
    code: "A3", title: "Databases", theme: "Theme A: Concepts of computer science", paper: "Paper 1", hours: { SL: 11, HL: 18 },
    subtopics: [
      { code: "A3.1", title: "Database fundamentals" },
      { code: "A3.2", title: "Database design" },
      { code: "A3.3", title: "Database programming" },
      { code: "A3.4", title: "Alternative databases and data warehouses", hlOnly: true },
    ],
  },
  {
    code: "A4", title: "Machine learning", theme: "Theme A: Concepts of computer science", paper: "Paper 1", hours: { SL: 5, HL: 18 },
    subtopics: [
      { code: "A4.1", title: "Machine learning fundamentals" },
      { code: "A4.2", title: "Data preprocessing", hlOnly: true },
      { code: "A4.3", title: "Machine learning approaches", hlOnly: true },
      { code: "A4.4", title: "Ethical considerations" },
    ],
  },
  {
    code: "B1", title: "Computational thinking", theme: "Theme B: Computational thinking and problem-solving", paper: "Paper 2", hours: { SL: 5, HL: 5 },
    subtopics: [{ code: "B1.1", title: "Approaches to computational thinking" }],
  },
  {
    code: "B2", title: "Programming", theme: "Theme B: Computational thinking and problem-solving", paper: "Paper 2", hours: { SL: 40, HL: 42 },
    subtopics: [
      { code: "B2.1", title: "Programming fundamentals" },
      { code: "B2.2", title: "Data structures" },
      { code: "B2.3", title: "Programming constructs" },
      { code: "B2.4", title: "Programming algorithms" },
      { code: "B2.5", title: "File processing" },
    ],
  },
  {
    code: "B3", title: "Object-oriented programming", theme: "Theme B: Computational thinking and problem-solving", paper: "Paper 2", hours: { SL: 7, HL: 23 },
    subtopics: [
      { code: "B3.1", title: "Fundamentals of OOP for a single class" },
      { code: "B3.2", title: "Fundamentals of OOP for multiple classes", hlOnly: true },
    ],
  },
  {
    code: "B4", title: "Abstract data types", theme: "Theme B: Computational thinking and problem-solving", paper: "Paper 2", hours: { SL: 0, HL: 23 },
    subtopics: [{ code: "B4.1", title: "Fundamentals of ADTs", hlOnly: true }],
  },
  {
    code: "CS", title: "Case study 2027: Generative AI for image creation", theme: "Case study", paper: "Paper 1", hours: { SL: 15, HL: 30 },
    subtopics: [{ code: "CS", title: "Pre-seen case study (Paper 1 Section B)" }],
  },
];

export const IB_TOPIC_MAP: Record<string, IBTopic> = Object.fromEntries(IB_TOPICS.map((t) => [t.code, t]));

// Paper facts (IB guide, first assessment 2027)
export const IB_PAPERS = {
  SL: { paper1: { minutes: 75, marks: 50, sectionA: 38, sectionB: 12, weight: 35 }, paper2: { minutes: 75, marks: 50, weight: 35 }, ia: { marks: 30, weight: 30 } },
  HL: { paper1: { minutes: 120, marks: 80, sectionA: 56, sectionB: 24, weight: 40 }, paper2: { minutes: 120, marks: 80, weight: 40 }, ia: { marks: 30, weight: 20 } },
};

// IB command terms (paraphrased from the guide's appendix) with assessment objective level
export const IB_COMMAND_TERMS: { term: string; ao: 1 | 2 | 3; meaning: string }[] = [
  { term: "Calculate", ao: 2, meaning: "Work out a numerical answer, showing the stages of working." },
  { term: "Compare", ao: 3, meaning: "Give similarities between two or more items, referring to all of them throughout." },
  { term: "Construct", ao: 3, meaning: "Show information in a diagram or logical form (e.g. code, a table, an ERD)." },
  { term: "Deduce", ao: 3, meaning: "Reach a conclusion from the information given." },
  { term: "Define", ao: 1, meaning: "Give the precise meaning of a term." },
  { term: "Describe", ao: 2, meaning: "Give a detailed account." },
  { term: "Discuss", ao: 3, meaning: "A considered, balanced review with a range of arguments and a supported conclusion." },
  { term: "Distinguish", ao: 2, meaning: "Make the differences between two or more items clear." },
  { term: "Estimate", ao: 2, meaning: "Find an approximate value." },
  { term: "Evaluate", ao: 3, meaning: "Weigh up strengths and limitations to make an appraisal." },
  { term: "Explain", ao: 3, meaning: "A detailed account including reasons or causes." },
  { term: "Identify", ao: 2, meaning: "Give an answer from a number of possibilities." },
  { term: "Justify", ao: 3, meaning: "Give valid reasons or evidence to support an answer or conclusion." },
  { term: "Label", ao: 1, meaning: "Add labels to a diagram." },
  { term: "List", ao: 1, meaning: "Give a sequence of brief answers with no explanation." },
  { term: "Outline", ao: 2, meaning: "Give a brief account or summary." },
  { term: "Sketch", ao: 3, meaning: "A labelled diagram giving the general idea with the relevant features." },
  { term: "State", ao: 1, meaning: "A specific name, value or brief answer without explanation." },
  { term: "Suggest", ao: 3, meaning: "Propose a solution, hypothesis or possible answer." },
  { term: "To what extent", ao: 3, meaning: "Consider the merits of an argument, with a clear, supported conclusion." },
  { term: "Trace", ao: 2, meaning: "Follow and record the actions of an algorithm." },
];
