// IB Diploma Programme Computer Science (first assessment 2027) - topic catalogue used across the app.
export type IBLevel = "SL" | "HL";

/** One understanding statement from the IB guide (short paraphrase), e.g. "A1.1.1". */
export interface IBStatement {
  code: string;
  text: string;
  hlOnly: boolean;
}

export interface IBTopic {
  code: string; // unit code used on every question, e.g. "A1"
  title: string;
  theme: "Theme A: Concepts of computer science" | "Theme B: Computational thinking and problem-solving" | "Case study";
  paper: "Paper 1" | "Paper 2";
  subtopics: { code: string; title: string; hlOnly?: boolean; statements: IBStatement[] }[];
  hours: { SL: number; HL: number };
}

const S = (xs: IBStatement[]) => xs;

export const IB_TOPICS: IBTopic[] = [
  {
    code: "A1", title: "Computer fundamentals", theme: "Theme A: Concepts of computer science", paper: "Paper 1", hours: { SL: 11, HL: 18 },
    subtopics: [
      { code: "A1.1", title: "Computer hardware and operation", statements: S([
        { code: "A1.1.1", text: "Functions and interactions of the main CPU components", hlOnly: false },
        { code: "A1.1.2", text: "Role of a graphics processing unit (GPU)", hlOnly: false },
        { code: "A1.1.3", text: "Differences between the CPU and the GPU", hlOnly: true },
        { code: "A1.1.4", text: "Purposes of different types of primary memory", hlOnly: false },
        { code: "A1.1.5", text: "The fetch, decode and execute cycle", hlOnly: false },
        { code: "A1.1.6", text: "Pipelining in multi-core architectures", hlOnly: true },
        { code: "A1.1.7", text: "Internal and external secondary storage", hlOnly: false },
        { code: "A1.1.8", text: "The concept of compression (lossy and lossless)", hlOnly: false },
        { code: "A1.1.9", text: "Types of cloud computing services (SaaS, PaaS, IaaS)", hlOnly: false },
      ]) },
      { code: "A1.2", title: "Data representation and computer logic", statements: S([
        { code: "A1.2.1", text: "Binary and hexadecimal representation and conversions", hlOnly: false },
        { code: "A1.2.2", text: "How binary is used to store different kinds of data", hlOnly: false },
        { code: "A1.2.3", text: "Purpose and use of logic gates", hlOnly: false },
        { code: "A1.2.4", text: "Constructing and analysing truth tables", hlOnly: false },
        { code: "A1.2.5", text: "Constructing logic diagrams", hlOnly: false },
      ]) },
      { code: "A1.3", title: "Operating systems and control systems", statements: S([
        { code: "A1.3.1", text: "Role of operating systems", hlOnly: false },
        { code: "A1.3.2", text: "Functions of an operating system", hlOnly: false },
        { code: "A1.3.3", text: "Comparing approaches to scheduling", hlOnly: false },
        { code: "A1.3.4", text: "Evaluating polling and interrupt handling", hlOnly: false },
        { code: "A1.3.5", text: "OS management of multitasking and resource allocation", hlOnly: true },
        { code: "A1.3.6", text: "Control system components", hlOnly: true },
        { code: "A1.3.7", text: "Control systems in real-world applications", hlOnly: true },
      ]) },
      { code: "A1.4", title: "Translation", hlOnly: true, statements: S([
        { code: "A1.4.1", text: "Translation by interpreters and compilers", hlOnly: true },
      ]) },
    ],
  },
  {
    code: "A2", title: "Networks", theme: "Theme A: Concepts of computer science", paper: "Paper 1", hours: { SL: 11, HL: 18 },
    subtopics: [
      { code: "A2.1", title: "Network fundamentals", statements: S([
        { code: "A2.1.1", text: "Purpose and characteristics of networks", hlOnly: false },
        { code: "A2.1.2", text: "Modern digital infrastructures: purpose, benefits, limitations", hlOnly: false },
        { code: "A2.1.3", text: "Functions of network devices", hlOnly: false },
        { code: "A2.1.4", text: "Transport and application protocols", hlOnly: false },
        { code: "A2.1.5", text: "Function of the TCP/IP model", hlOnly: true },
      ]) },
      { code: "A2.2", title: "Network architecture", statements: S([
        { code: "A2.2.1", text: "Network topologies: functions and applications", hlOnly: false },
        { code: "A2.2.2", text: "Function of servers", hlOnly: true },
        { code: "A2.2.3", text: "Comparing networking models (client-server, peer-to-peer)", hlOnly: false },
        { code: "A2.2.4", text: "Segmentation: uses of segmenting, subnetting and VLANs", hlOnly: false },
      ]) },
      { code: "A2.3", title: "Data transmissions", statements: S([
        { code: "A2.3.1", text: "Types of IP addressing", hlOnly: false },
        { code: "A2.3.2", text: "Comparing transmission media", hlOnly: false },
        { code: "A2.3.3", text: "Packet switching across a network", hlOnly: false },
        { code: "A2.3.4", text: "Static and dynamic routing", hlOnly: true },
      ]) },
      { code: "A2.4", title: "Network security", statements: S([
        { code: "A2.4.1", text: "Effectiveness of firewalls", hlOnly: false },
        { code: "A2.4.2", text: "Common network vulnerabilities", hlOnly: true },
        { code: "A2.4.3", text: "Common network countermeasures", hlOnly: true },
        { code: "A2.4.4", text: "Encryption and digital certificates", hlOnly: false },
      ]) },
    ],
  },
  {
    code: "A3", title: "Databases", theme: "Theme A: Concepts of computer science", paper: "Paper 1", hours: { SL: 11, HL: 18 },
    subtopics: [
      { code: "A3.1", title: "Database fundamentals", statements: S([
        { code: "A3.1.1", text: "Relational databases: features, benefits and limitations", hlOnly: false },
      ]) },
      { code: "A3.2", title: "Database design", statements: S([
        { code: "A3.2.1", text: "Database schemas", hlOnly: false },
        { code: "A3.2.2", text: "Constructing entity-relationship diagrams (ERDs)", hlOnly: false },
        { code: "A3.2.3", text: "Data types in relational databases", hlOnly: false },
        { code: "A3.2.4", text: "Constructing tables for relational databases", hlOnly: false },
        { code: "A3.2.5", text: "Differences between normal forms", hlOnly: false },
        { code: "A3.2.6", text: "Normalizing a database to 3NF", hlOnly: false },
        { code: "A3.2.7", text: "Evaluating the need for denormalization", hlOnly: false },
      ]) },
      { code: "A3.3", title: "Database programming", statements: S([
        { code: "A3.3.1", text: "Data language types within SQL (DDL, DML)", hlOnly: false },
        { code: "A3.3.2", text: "SQL queries across two tables", hlOnly: false },
        { code: "A3.3.3", text: "Updating data with SQL", hlOnly: false },
        { code: "A3.3.4", text: "SQL aggregate functions", hlOnly: true },
        { code: "A3.3.5", text: "Database views", hlOnly: true },
        { code: "A3.3.6", text: "Transactions and data integrity", hlOnly: true },
      ]) },
      { code: "A3.4", title: "Alternative databases and data warehouses", hlOnly: true, statements: S([
        { code: "A3.4.1", text: "Types of databases as approaches to storing data", hlOnly: true },
        { code: "A3.4.2", text: "Objectives of data warehouses", hlOnly: true },
        { code: "A3.4.3", text: "OLAP and data mining for business intelligence", hlOnly: true },
        { code: "A3.4.4", text: "Features of distributed databases", hlOnly: true },
      ]) },
    ],
  },
  {
    code: "A4", title: "Machine learning", theme: "Theme A: Concepts of computer science", paper: "Paper 1", hours: { SL: 5, HL: 18 },
    subtopics: [
      { code: "A4.1", title: "Machine learning fundamentals", statements: S([
        { code: "A4.1.1", text: "Types of machine learning and their applications", hlOnly: false },
        { code: "A4.1.2", text: "Hardware requirements for machine learning scenarios", hlOnly: false },
      ]) },
      { code: "A4.2", title: "Data preprocessing", hlOnly: true, statements: S([
        { code: "A4.2.1", text: "Significance of data cleaning", hlOnly: true },
        { code: "A4.2.2", text: "Role of feature selection", hlOnly: true },
        { code: "A4.2.3", text: "Importance of dimensionality reduction", hlOnly: true },
      ]) },
      { code: "A4.3", title: "Machine learning approaches", hlOnly: true, statements: S([
        { code: "A4.3.1", text: "Linear regression for continuous outcomes", hlOnly: true },
        { code: "A4.3.2", text: "Classification techniques for discrete outcomes", hlOnly: true },
        { code: "A4.3.3", text: "Hyperparameter tuning in supervised learning", hlOnly: true },
        { code: "A4.3.4", text: "Clustering in unsupervised learning", hlOnly: true },
        { code: "A4.3.5", text: "Association rule learning", hlOnly: true },
        { code: "A4.3.6", text: "Reinforcement learning: agents learning by interaction", hlOnly: true },
        { code: "A4.3.7", text: "Genetic algorithms in real-world situations", hlOnly: true },
        { code: "A4.3.8", text: "Structure and function of artificial neural networks", hlOnly: true },
        { code: "A4.3.9", text: "Convolutional neural networks (CNNs) for images", hlOnly: true },
        { code: "A4.3.10", text: "Model selection and comparison", hlOnly: true },
      ]) },
      { code: "A4.4", title: "Ethical considerations", statements: S([
        { code: "A4.4.1", text: "Ethical implications of machine learning", hlOnly: false },
        { code: "A4.4.2", text: "Ethics of computer technologies in daily life", hlOnly: false },
      ]) },
    ],
  },
  {
    code: "B1", title: "Computational thinking", theme: "Theme B: Computational thinking and problem-solving", paper: "Paper 2", hours: { SL: 5, HL: 5 },
    subtopics: [{ code: "B1.1", title: "Approaches to computational thinking", statements: S([
        { code: "B1.1.1", text: "Constructing a problem specification", hlOnly: false },
        { code: "B1.1.2", text: "Fundamental concepts of computational thinking", hlOnly: false },
        { code: "B1.1.3", text: "Applying computational thinking to solve problems", hlOnly: false },
        { code: "B1.1.4", text: "Tracing flowcharts", hlOnly: false },
      ]) }],
  },
  {
    code: "B2", title: "Programming", theme: "Theme B: Computational thinking and problem-solving", paper: "Paper 2", hours: { SL: 40, HL: 42 },
    subtopics: [
      { code: "B2.1", title: "Programming fundamentals", statements: S([
        { code: "B2.1.1", text: "Variables, data types and global/local scope", hlOnly: false },
        { code: "B2.1.2", text: "Extracting and manipulating substrings", hlOnly: false },
        { code: "B2.1.3", text: "Exception handling techniques", hlOnly: false },
        { code: "B2.1.4", text: "Debugging techniques", hlOnly: false },
      ]) },
      { code: "B2.2", title: "Data structures", statements: S([
        { code: "B2.2.1", text: "Static and dynamic data structures", hlOnly: false },
        { code: "B2.2.2", text: "Programs using arrays and lists", hlOnly: false },
        { code: "B2.2.3", text: "Stacks: last in, first out (LIFO)", hlOnly: false },
        { code: "B2.2.4", text: "Queues: first in, first out (FIFO)", hlOnly: false },
      ]) },
      { code: "B2.3", title: "Programming constructs", statements: S([
        { code: "B2.3.1", text: "Sequencing instructions to meet program objectives", hlOnly: false },
        { code: "B2.3.2", text: "Selection structures", hlOnly: false },
        { code: "B2.3.3", text: "Looping structures", hlOnly: false },
        { code: "B2.3.4", text: "Functions and modularization", hlOnly: false },
      ]) },
      { code: "B2.4", title: "Programming algorithms", statements: S([
        { code: "B2.4.1", text: "Algorithm efficiency and Big O notation", hlOnly: false },
        { code: "B2.4.2", text: "Linear search and binary search", hlOnly: false },
        { code: "B2.4.3", text: "Bubble sort and selection sort", hlOnly: false },
        { code: "B2.4.4", text: "Concept and applications of recursion", hlOnly: true },
        { code: "B2.4.5", text: "Constructing and tracing recursive algorithms", hlOnly: true },
      ]) },
      { code: "B2.5", title: "File processing", statements: S([
        { code: "B2.5.1", text: "File-processing operations", hlOnly: false },
      ]) },
    ],
  },
  {
    code: "B3", title: "Object-oriented programming", theme: "Theme B: Computational thinking and problem-solving", paper: "Paper 2", hours: { SL: 7, HL: 23 },
    subtopics: [
      { code: "B3.1", title: "Fundamentals of OOP for a single class", statements: S([
        { code: "B3.1.1", text: "Evaluating the fundamentals of OOP", hlOnly: false },
        { code: "B3.1.2", text: "Designing classes, their methods and behaviour", hlOnly: false },
        { code: "B3.1.3", text: "Static and non-static variables and methods", hlOnly: false },
        { code: "B3.1.4", text: "Defining classes and instantiating objects", hlOnly: false },
        { code: "B3.1.5", text: "Encapsulation and information hiding", hlOnly: false },
      ]) },
      { code: "B3.2", title: "Fundamentals of OOP for multiple classes", hlOnly: true, statements: S([
        { code: "B3.2.1", text: "Inheritance and code reusability", hlOnly: true },
        { code: "B3.2.2", text: "Polymorphism, e.g. method overriding", hlOnly: true },
        { code: "B3.2.3", text: "Abstraction in OOP", hlOnly: true },
        { code: "B3.2.4", text: "Composition and aggregation", hlOnly: true },
        { code: "B3.2.5", text: "Common OOP design patterns", hlOnly: true },
      ]) },
    ],
  },
  {
    code: "B4", title: "Abstract data types", theme: "Theme B: Computational thinking and problem-solving", paper: "Paper 2", hours: { SL: 0, HL: 23 },
    subtopics: [{ code: "B4.1", title: "Fundamentals of ADTs", hlOnly: true, statements: S([
        { code: "B4.1.1", text: "Properties and purpose of ADTs", hlOnly: true },
        { code: "B4.1.2", text: "Evaluating linked lists", hlOnly: true },
        { code: "B4.1.3", text: "Singly, doubly and circular linked lists", hlOnly: true },
        { code: "B4.1.4", text: "Binary search trees (BSTs)", hlOnly: true },
        { code: "B4.1.5", text: "Sets as an ADT", hlOnly: true },
        { code: "B4.1.6", text: "Core principles of ADTs", hlOnly: true },
      ]) }],
  },
  {
    code: "CS", title: "Case study 2027: Generative AI for image creation", theme: "Case study", paper: "Paper 1", hours: { SL: 15, HL: 30 },
    subtopics: [{ code: "CS", title: "Pre-seen case study (Paper 1 Section B)", statements: S([
        { code: "CS", text: "Pre-seen case study: generative AI for image creation", hlOnly: false },
      ]) }],
  },
];

export const IB_TOPIC_MAP: Record<string, IBTopic> = Object.fromEntries(IB_TOPICS.map((t) => [t.code, t]));

/** Every guide understanding statement, in syllabus order, with its topic and subtopic codes. */
export const IB_STATEMENTS: (IBStatement & { topic: string; subtopic: string })[] = IB_TOPICS.flatMap((t) =>
  t.subtopics.flatMap((s) => s.statements.map((st) => ({ ...st, topic: t.code, subtopic: s.code })))
);

export const IB_STATEMENT_MAP: Record<string, IBStatement & { topic: string; subtopic: string }> = Object.fromEntries(
  IB_STATEMENTS.map((s) => [s.code, s])
);

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
