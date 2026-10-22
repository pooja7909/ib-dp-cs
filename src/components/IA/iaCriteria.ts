// IB DP Computer Science (first assessment 2027) - Internal Assessment: the computational solution.
// 30 marks, same task and criteria at SL (30% of the grade) and HL (20%).
// The level descriptors below are PARAPHRASED from the IB guide (which is copyright); the mark
// ranges are exactly the guide's. Teachers should mark with the official guide to hand.

export type CriterionId = "A" | "B" | "C" | "D" | "E";

export interface IABand {
  min: number;
  max: number;
  points: string[]; // paraphrased level descriptor bullet points
}

export interface IACriterion {
  id: CriterionId;
  name: string;
  max: number;
  words: number; // recommended word count
  bands: IABand[]; // excluding the 0 band
  teacherNotes: string[]; // paraphrased clarifications
  student: {
    summary: string;
    include: string[];
    tips: string[];
  };
}

export const IA_TOTAL_MARKS = 30;
export const IA_WORD_LIMIT = 2000;
export const IA_VIDEO_MAX_SECONDS = 5 * 60;
export const IA_ZERO_BAND = "The work does not reach the standard of the lowest band below.";

export const IA_CRITERIA: IACriterion[] = [
  {
    id: "A",
    name: "Problem specification",
    max: 4,
    words: 300,
    bands: [
      {
        min: 1,
        max: 2,
        points: [
          "Gives only a brief outline of the problem situation.",
          "Success criteria are given but are limited.",
          "Briefly outlines what kind of computational solution is intended.",
        ],
      },
      {
        min: 3,
        max: 4,
        points: [
          "Describes the problem situation in terms of solution requirements that can be measured.",
          "Success criteria given are suitable for the problem.",
          "Explains why the chosen computational context suits the solution.",
        ],
      },
    ],
    teacherNotes: [
      "Problem scenario: a clear account of the problem and its measurable requirements, tied to a real situation, another subject area or a current computing issue.",
      "Success criteria: measurable outcomes, taken from the requirements, that show the product has been developed successfully.",
      "Computational context: the particular area of computing chosen for the solution.",
      "The success criteria set here are reused in criteria B, D and E.",
    ],
    student: {
      summary: "Explain the problem you are solving, who it is for, and how you will know your product works.",
      include: [
        "The problem scenario: who has the problem, what is going wrong now, and why it matters.",
        "Requirements that can be measured (numbers, times, things a user must be able to do).",
        "A numbered list of success criteria - each one something you can test and tick off.",
        "The computational context: what kind of software you will build (e.g. web app with a database, game, simulation) and WHY that choice fits the problem.",
        "That you have the skills, hardware, software and data you need.",
      ],
      tips: [
        "Write success criteria as testable statements, e.g. \"The user can search 1,000 records in under 1 second\".",
        "Avoid vague criteria like \"easy to use\" unless you say how you will measure it.",
        "Your success criteria come back in Planning, Development and Evaluation - get them right now.",
      ],
    },
  },
  {
    id: "B",
    name: "Planning",
    max: 4,
    words: 150,
    bands: [
      {
        min: 1,
        max: 2,
        points: [
          "Breaks the problem scenario down only partly (partial decomposition).",
          "The plan covers some of the success criteria.",
        ],
      },
      {
        min: 3,
        max: 4,
        points: [
          "Breaks the problem down sensibly into its essential parts (reasonable decomposition).",
          "The plan covers the success criteria.",
        ],
      },
    ],
    teacherNotes: [
      "Decomposition: splitting the problem from criterion A into smaller, manageable sub-problems or components; diagrams work well.",
      "A reasonable decomposition reaches the essential components and supports building the plan.",
      "The plan should give a timeline for planning, design, development, testing and evaluation (e.g. Gantt or agile chart) and may include research such as code libraries.",
    ],
    student: {
      summary: "Show how you broke the problem into smaller parts and when you will do each part.",
      include: [
        "A decomposition diagram that splits the problem into sub-problems / components.",
        "A timeline (Gantt chart, agile sprint board, etc.) covering planning, design, development, testing and evaluation.",
        "Which success criteria each part of the plan addresses.",
        "Any research you did, e.g. libraries or tools you will use.",
      ],
      tips: [
        "Diagrams do not count towards your word count - let them do the work.",
        "Make sure every success criterion appears somewhere in your plan.",
      ],
    },
  },
  {
    id: "C",
    name: "System overview",
    max: 6,
    words: 150,
    bands: [
      {
        min: 1,
        max: 2,
        points: [
          "Outlines a system model that is limited.",
          "Identifies (names) algorithms for the components of the system model.",
          "Identifies a testing strategy for at least one success criterion.",
        ],
      },
      {
        min: 3,
        max: 4,
        points: [
          "Builds a system model, but it is incomplete.",
          "Builds algorithms for the components that would give the product only partial functionality.",
          "Outlines a testing strategy linked to at least three success criteria.",
        ],
      },
      {
        min: 5,
        max: 6,
        points: [
          "Builds a complete system model.",
          "Builds algorithms for the components that would allow the product to work.",
          "Describes a testing strategy linked to the success criteria.",
        ],
      },
    ],
    teacherNotes: [
      "System model: diagrams of the components and how they connect, including the user interface design. A complete model does not itself contain the algorithms.",
      "Algorithms may be in natural language, flowcharts or pseudocode and should address each component of the model.",
      "Testing strategy: a systematic way to check the solution works as intended, including unexpected or invalid input - a table of test data and expected results works well.",
      "The overview should be clear enough for a third party to recreate the product.",
    ],
    student: {
      summary: "Design your system so clearly that someone else could build it from your overview.",
      include: [
        "A system model: diagram(s) of the components and how they connect (e.g. structure chart, class diagram, data flow, database design).",
        "User interface designs (sketches or wireframes).",
        "Algorithms for each component: flowcharts, pseudocode or clear steps.",
        "A testing strategy: a test plan table with test data (normal, boundary, invalid) and expected results, linked to your success criteria.",
      ],
      tips: [
        "Diagrams, flowcharts and pseudocode do not count towards the word limit.",
        "Link each test to a success criterion number.",
        "Use the Test plan section of this page to build your table.",
      ],
    },
  },
  {
    id: "D",
    name: "Development",
    max: 12,
    words: 1000,
    bands: [
      {
        min: 1,
        max: 3,
        points: [
          "The product built has very limited functionality.",
          "No appropriate techniques are used to implement the algorithms.",
          "States the choices made when implementing the algorithms.",
          "States the testing strategy used.",
        ],
      },
      {
        min: 4,
        max: 6,
        points: [
          "The product built has limited functionality.",
          "At least one appropriate technique is used to implement the algorithms.",
          "Outlines the choices made when implementing the algorithms.",
          "States how effective the testing strategy was.",
        ],
      },
      {
        min: 7,
        max: 9,
        points: [
          "The product built is partly functional.",
          "Some appropriate techniques are used to implement the algorithms.",
          "Explains the choices made when implementing the algorithms.",
          "Describes how effective the testing strategy was.",
        ],
      },
      {
        min: 10,
        max: 12,
        points: [
          "The product built is fully functional.",
          "Appropriate techniques are used to implement the algorithms.",
          "Evaluates the choices made when implementing the algorithms.",
          "Justifies how effective the testing strategy was.",
        ],
      },
    ],
    teacherNotes: [
      "Techniques = programming the algorithms in code (e.g. loops, data structures, libraries, integrating software tools). Key code for efficient functioning should be highlighted.",
      "Code shown must be commented, consistent and readable, and excerpts referenced to the full source code in the appendix.",
      "Testing must cover correctness, reliability and efficiency, be described and justified in the documentation, with examples seen in the video.",
      "The video is evidence of functionality. Without the full source code in an appendix, full marks for techniques cannot be awarded.",
    ],
    student: {
      summary: "Show HOW you built the product, WHY you made your choices, and prove it works through testing.",
      include: [
        "The structure of your product and why that structure is appropriate.",
        "Key code excerpts (with comments) showing the techniques you used - loops, data structures, libraries, file/database handling, etc.",
        "For each technique: why you chose it and how well it worked (evaluate the choices, not just describe them).",
        "References from each code excerpt to the full source code in your appendix (file name + line numbers).",
        "Your testing: correctness, reliability (bad/unexpected input) and efficiency, with results and why your testing approach was effective.",
      ],
      tips: [
        "Code excerpts and comments do not count towards the word limit - but your explanations do.",
        "Do not paste the whole program here: put the full code in the appendix.",
        "Show examples of your tests in the video too.",
      ],
    },
  },
  {
    id: "E",
    name: "Evaluation",
    max: 4,
    words: 400,
    bands: [
      {
        min: 1,
        max: 2,
        points: ["States how far the success criteria were met.", "Describes improvements that could be made to the product."],
      },
      {
        min: 3,
        max: 4,
        points: ["Evaluates how far the success criteria were met.", "Justifies improvements to the product."],
      },
    ],
    teacherNotes: ["The evaluation must be consistent with the problem specification and success criteria from criterion A."],
    student: {
      summary: "Judge honestly how well your product meets each success criterion, and suggest well-reasoned improvements.",
      include: [
        "Each success criterion, one by one: met, partly met or not met - with evidence (test results, video timestamps, user feedback).",
        "Strengths and weaknesses of the product.",
        "Improvements, each with a reason: why it would help and how it could be done.",
      ],
      tips: [
        "\"Evaluate\" means weighing up - say how well, not just yes/no.",
        "\"Justify\" improvements: give the reason and the benefit, not just a wish list.",
      ],
    },
  },
];

export const IA_CRITERIA_MAP: Record<CriterionId, IACriterion> = Object.fromEntries(IA_CRITERIA.map((c) => [c.id, c])) as any;
export const IA_CRITERION_IDS: CriterionId[] = ["A", "B", "C", "D", "E"];

/** The band (or the 0 band) that a mark sits in. */
export function bandFor(c: IACriterion, mark: number | null | undefined): IABand | null {
  if (mark === null || mark === undefined) return null;
  return c.bands.find((b) => mark >= b.min && mark <= b.max) || null;
}

/** Words as the IB counts them (roughly): runs of letters/numbers. Code is not counted when it is in ``` fences. */
export function countWords(text: string): number {
  if (!text) return 0;
  const noCode = String(text).replace(/```[\s\S]*?(```|$)/g, " ");
  const m = noCode.match(/[A-Za-z0-9À-ɏЀ-ӿ][A-Za-z0-9À-ɏЀ-ӿ'’\-_.]*/g);
  return m ? m.length : 0;
}

export type CheckItem = { id: string; label: string; hint?: string };

export const VIDEO_CHECKLIST: CheckItem[] = [
  { id: "under5", label: "The video is no longer than 5 minutes" },
  { id: "format", label: "Saved as a common format (e.g. .mp4, .avi, .wmv) and handed in as a separate file" },
  { id: "full", label: "Shows the full functionality of the product" },
  { id: "testing", label: "Shows examples of my testing strategy (including unexpected / invalid input)" },
  { id: "clear", label: "Screen and narration/captions are clear enough to follow" },
];

export const APPENDIX_CHECKLIST: CheckItem[] = [
  { id: "fullcode", label: "Full source code of the product", hint: "Without it, full marks for techniques in criterion D are not possible." },
  { id: "resources", label: "Any other resources I made and refer to (data files, database schema, extra diagrams)" },
  { id: "referenced", label: "Code excerpts in the documentation point to the right place in the appendix (file + line numbers)" },
  { id: "singlepdf", label: "Appendices combined into a single PDF" },
  { id: "consent", label: "Consent obtained from anyone involved / owner of any existing system used (if relevant)" },
];

export const DOCUMENT_CHECKLIST: CheckItem[] = [
  { id: "sections", label: "Five separate sections, one for each criterion A-E" },
  { id: "wordcount", label: "Total word count written on the first page (max 2,000, not counting code, comments or diagrams)" },
  { id: "pdf", label: "Documentation saved as a single PDF" },
  { id: "references", label: "All sources and libraries used are acknowledged" },
];

export const DEFAULT_MILESTONES = [
  "Topic and problem agreed with teacher",
  "A: Problem specification and success criteria",
  "B: Planning (decomposition and timeline)",
  "C: System overview and test plan",
  "D: Product working",
  "Draft submitted for feedback",
  "Final submission (documentation, video, appendices)",
];

// ---------- Shared data shapes (server: iaServer.ts) ----------
export type MilestoneStatus = "todo" | "doing" | "done";
export interface IAClassMilestone {
  id: string;
  title: string;
  due: string; // YYYY-MM-DD or ""
}
export interface IAClassInfo {
  id: string;
  code: string;
  name: string;
  level: "SL" | "HL";
  open: boolean;
  milestones: IAClassMilestone[];
  ownerName?: string;
  createdAt?: number;
  studentCount?: number;
  lastActiveAt?: number;
}
export interface IASuccessCriterion {
  id: string;
  text: string;
  tested: boolean;
}
export interface IAOwnMilestone {
  id: string;
  title: string;
  due: string;
  status: MilestoneStatus;
}
export interface IATestRow {
  id: string;
  criterion: string; // success criterion number(s) it tests, e.g. "SC3"
  test: string;
  expected: string;
  actual: string;
  pass: "" | "pass" | "fail";
}
export interface IAMark {
  mark: number | null;
  comment: string;
}
export interface IAProject {
  classId: string;
  studentId: string;
  name: string;
  joinedAt: number;
  updatedAt: number;
  lastActiveAt: number;
  title: string;
  sections: Record<CriterionId, string>;
  successCriteria: IASuccessCriterion[];
  milestoneStatus: Record<string, MilestoneStatus>;
  ownMilestones: IAOwnMilestone[];
  testPlan: IATestRow[];
  video: Record<string, boolean>; // VIDEO_CHECKLIST ids + "sc_<id>" per success criterion
  videoLength: string; // "m:ss"
  appendix: Record<string, boolean>;
  documentChecks: Record<string, boolean>;
  draft: null | { submittedAt: number; sections: Record<CriterionId, string>; title: string };
  draftFeedback: null | { text: string; givenAt: number; by: string };
  final: null | { submittedAt: number; declaration: true };
  // teacher only (removed from student responses unless marksReleased)
  marks?: Partial<Record<CriterionId, IAMark>>;
  markedAt?: number;
  marksReleased?: boolean;
  sample?: boolean;
  moderationNote?: string;
  hasPin?: boolean; // teacher view: the student has a PIN set
  pinLocked?: boolean; // teacher view: locked after too many wrong PINs
}

export function emptySections(): Record<CriterionId, string> {
  return { A: "", B: "", C: "", D: "", E: "" };
}

export function totalMark(p: Pick<IAProject, "marks">): number | null {
  const m = p.marks || {};
  let any = false;
  let t = 0;
  for (const id of IA_CRITERION_IDS) {
    const v = m[id]?.mark;
    if (typeof v === "number") {
      any = true;
      t += v;
    }
  }
  return any ? t : null;
}

/** "4:35" / "275" / "4m 35s" -> seconds, or null when it can't be read. */
export function parseDuration(s: string): number | null {
  const t = String(s || "").trim();
  if (!t) return null;
  let m = t.match(/^(\d{1,2}):(\d{1,2})$/);
  if (m) return Number(m[1]) * 60 + Number(m[2]);
  m = t.match(/^(\d+)\s*m(?:in)?\s*(?:(\d+)\s*s(?:ec)?)?$/i);
  if (m) return Number(m[1]) * 60 + Number(m[2] || 0);
  m = t.match(/^(\d+)\s*s?$/i);
  if (m) return Number(m[1]);
  return null;
}
