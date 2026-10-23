// IB DP Computer Science (first assessment 2027) question bank:
// A3 Databases, A4 Machine learning and the 2027 case study (Generative AI for image creation).
// All questions are original practice items written to the IB guide's understandings and command terms.
import type { IGCSETask, MarkPoint, QuestionDifficulty, QuestionPart, TableCell, TableColumn } from "../types";

type Unit = "A3" | "A4" | "CS";
type Pt = string | { d: string; acc?: string[] };

const B = "```";
const UNIT_NAMES: Record<Unit, string> = {
  A3: "Databases",
  A4: "Machine learning",
  CS: "Case study 2027: Generative AI for image creation",
};

interface Base {
  unit: Unit;
  spec: string;
  hl?: boolean;
  cmd: string;
  diff: QuestionDifficulty;
  title: string;
  hint?: string;
  /** SQL questions: setup script for the student's SQL playground (tables shown + "try your query") */
  sqlSetup?: string;
}

interface Bands {
  indicative: string[];
}

interface SchemeOpts {
  pts?: Pt[];
  accept?: string[];
  reject?: string[];
  note?: string;
  example?: string;
  bands?: Bands;
}

const counters: Record<string, number> = {};
function nextId(unit: Unit): string {
  counters[unit] = (counters[unit] || 0) + 1;
  return `ib_${unit.toLowerCase()}_${String(counters[unit]).padStart(3, "0")}`;
}

function shell(o: Base, type: IGCSETask["type"], marks: number, brief: string, isMultiPart = false): IGCSETask {
  return {
    id: nextId(o.unit),
    unit: o.unit,
    unitName: UNIT_NAMES[o.unit],
    title: o.title,
    level: isMultiPart || o.diff === "Hard" ? "Exam-style" : o.diff === "Easy" ? "Starter" : "Core",
    difficulty: o.diff,
    type,
    brief,
    marks,
    ...(o.hint ? { hint: o.hint } : {}),
    examBoard: "IB",
    paper: "Paper 1",
    specReference: o.spec,
    commandWord: o.cmd,
    ibLevel: o.hl ? "HL" : "SL",
    ...(o.sqlSetup ? { sqlSetup: o.sqlSetup } : {}),
  };
}

const ptText = (p: Pt) => (typeof p === "string" ? p : p.d);
const ptAcc = (p: Pt) => (typeof p === "string" ? [p] : p.acc && p.acc.length ? p.acc : [p.d]);

function bandTable(max: number): string {
  if (max >= 8) {
    return [
      "Marks | Level descriptor",
      "0 | The response does not reach a standard described by the descriptors below.",
      "1-2 | Isolated, mostly descriptive points; little relevant knowledge; terminology rarely used; no link to the scenario; no conclusion.",
      "3-4 | Some relevant knowledge with some terminology; limited reference to the scenario; mainly descriptive with little analysis; any conclusion is unsupported.",
      "5-6 | Clear knowledge and understanding with mostly accurate terminology; explicit reference to the scenario; analysis of strengths and weaknesses, though it may be one-sided; a conclusion that is partly supported.",
      "7-8 | Detailed, accurate knowledge and terminology used throughout; consistent, explicit application to the scenario; balanced analysis of more than one perspective; a reasoned conclusion that follows from the analysis.",
    ].join("\n");
  }
  return [
    "Marks | Level descriptor",
    "0 | The response does not reach a standard described by the descriptors below.",
    "1-2 | Isolated points with limited knowledge; little or no reference to the scenario; no conclusion.",
    "3-4 | Relevant knowledge with some terminology and some reference to the scenario; analysis is limited or one-sided; conclusion weakly supported.",
    "5-6 | Accurate knowledge and terminology; explicit application to the scenario; balanced analysis of advantages and disadvantages; a justified conclusion.",
  ].join("\n");
}

function buildScheme(marks: number, s: SchemeOpts): string {
  const lines: string[] = [];
  if (s.bands) {
    lines.push("Mark holistically using the markbands below.");
    lines.push(bandTable(marks));
    lines.push("Indicative content (candidates are not expected to include all of these; credit other valid points):");
    s.bands.indicative.forEach((p) => lines.push(`- ${p}`));
  } else if (s.pts && s.pts.length) {
    lines.push(
      s.pts.length > marks
        ? `Award [1] for each of the following, up to [${marks}]:`
        : `Award [1] for each of the following (max [${marks}]):`
    );
    s.pts.forEach((p) => lines.push(`- ${ptText(p)} [1]`));
  }
  if (s.example) lines.push(`Example answer:\n${s.example}`);
  (s.accept || []).forEach((a) => lines.push(`Accept ${a}`));
  (s.reject || []).forEach((r) => lines.push(`Do not accept ${r}`));
  if (s.note) lines.push(`Note to examiners: ${s.note}`);
  return lines.join("\n");
}

function buildPoints(marks: number, s: SchemeOpts, prefix = ""): MarkPoint[] {
  if (s.bands) {
    const dims: [string, number][] =
      marks >= 8
        ? [
            ["Knowledge and understanding of the relevant concepts, using accurate terminology", 2],
            ["Explicit application to the scenario rather than generic points", 2],
            ["Balanced analysis of more than one perspective (advantages and disadvantages)", 2],
            ["Reasoned conclusion that follows from the analysis", 2],
          ]
        : [
            ["Knowledge and understanding of the relevant concepts, using accurate terminology", 2],
            ["Application to the scenario with analysis of advantages and disadvantages", 2],
            ["Justified conclusion that follows from the analysis", 2],
          ];
    return dims.map(([criterion, m], i) => ({
      id: `${prefix}MP${i + 1}`,
      marks: m,
      criterion,
      acceptedAnswers: s.bands!.indicative,
    }));
  }
  return (s.pts || []).map((p, i) => ({
    id: `${prefix}MP${i + 1}`,
    marks: 1,
    criterion: ptText(p),
    acceptedAnswers: ptAcc(p),
    ...(s.example && i === 0 ? { exemplarCode: s.example } : {}),
  }));
}

interface TheoryOpts extends Base, SchemeOpts {
  brief: string;
  marks: number;
  kw?: string[];
}

function theory(o: TheoryOpts): IGCSETask {
  const t = shell(o, "theory", o.marks, o.brief);
  t.markScheme = buildScheme(o.marks, o);
  t.markPoints = buildPoints(o.marks, o);
  if (o.example) t.solution = o.example;
  t.questions = [
    {
      q: o.brief,
      keywords: o.kw || [],
      maxMarks: o.marks,
      criteria: o.bands ? o.bands.indicative : (o.pts || []).map(ptText),
    },
  ];
  return t;
}

interface PartOpts extends SchemeOpts {
  q: string;
  marks: number;
  kw?: string[];
}

function structured(o: Base & { stem: string; parts: PartOpts[] }): IGCSETask {
  const labels = "abcdefgh";
  const total = o.parts.reduce((a, p) => a + p.marks, 0);
  const brief =
    o.stem +
    "\n\n" +
    o.parts.map((p, i) => `(${labels[i]}) ${p.q} [${p.marks}]`).join("\n\n") +
    "\n\nLabel each part of your answer (a), (b), ...";
  const t = shell(o, "theory", total, brief, true);
  const parts: QuestionPart[] = o.parts.map((p, i) => ({
    id: `p${labels[i]}`,
    label: `(${labels[i]})`,
    question: p.q,
    marks: p.marks,
    type: "theory",
    markScheme: buildScheme(p.marks, p),
    markPoints: buildPoints(p.marks, p),
  }));
  t.parts = parts;
  t.markScheme = parts.map((p) => `${p.label} [${p.marks}]\n${p.markScheme}`).join("\n\n");
  const examples = o.parts.map((p, i) => (p.example ? `(${labels[i]})\n${p.example}` : "")).filter(Boolean);
  if (examples.length) t.solution = examples.join("\n\n");
  t.questions = o.parts.map((p, i) => ({
    q: `(${labels[i]}) ${p.q}`,
    keywords: p.kw || [],
    maxMarks: p.marks,
    criteria: p.bands ? p.bands.indicative : (p.pts || []).map(ptText),
  }));
  return t;
}

interface McqItem {
  q: string;
  o: string[];
  a: number;
  why?: string;
}

function mcq(o: Base & { brief: string; qs: McqItem[] }): IGCSETask {
  const t = shell(o, "mcq", o.qs.length, o.brief);
  t.questions = o.qs.map((x) => ({ q: x.q, options: x.o, a: x.a }));
  t.markScheme =
    "Award [1] for each correct answer:\n" +
    o.qs.map((x, i) => `${i + 1}. ${"ABCD"[x.a]} (${x.o[x.a]})${x.why ? " - " + x.why : ""} [1]`).join("\n");
  return t;
}

interface InspItem {
  q: string;
  a: string[];
  why?: string;
}

function inspect(o: Base & { brief: string; qs: InspItem[]; marks?: number; note?: string }): IGCSETask {
  const marks = o.marks || o.qs.length;
  const t = shell(o, "inspect", marks, o.brief);
  t.questions = o.qs.map((x) => ({ q: x.q, a: x.a, ...(x.why ? { why: x.why } : {}) }));
  t.markScheme =
    `Award marks in proportion to correct answers (max [${marks}]):\n` +
    o.qs.map((x, i) => `${i + 1}. ${x.a[0]}${x.a.length > 1 ? " (accept " + x.a.slice(1).join(" / ") + ")" : ""}${x.why ? " - " + x.why : ""}`).join("\n") +
    (o.note ? `\nNote to examiners: ${o.note}` : "");
  return t;
}

// Table cells: a string starting with "=" is given (shown to the candidate); others are answers.
function table(o: Base & { brief: string; cols: TableColumn[]; rows: string[][]; marks?: number; note?: string }): IGCSETask {
  const rows: TableCell[][] = o.rows.map((r) =>
    r.map((c) => (c.startsWith("=") ? { v: c.slice(1), g: true } : { v: c, g: false }))
  );
  const fillable = rows.reduce((a, r) => a + r.filter((c) => !c.g).length, 0);
  const marks = o.marks || fillable;
  const t = shell(o, "table", marks, o.brief);
  t.columns = o.cols;
  t.rows = rows;
  t.markScheme =
    `Award marks in proportion to correct cells (${fillable} cells, max [${marks}]):\n` +
    rows
      .map((r) => {
        const given = r.filter((c) => c.g).map((c) => c.v).join(" / ");
        const ans = r.filter((c) => !c.g).map((c) => c.v.split("|")[0]).join(" / ");
        return `- ${given}: ${ans}`;
      })
      .join("\n") +
    (o.note ? `\nNote to examiners: ${o.note}` : "");
  return t;
}

const sel = (label: string, options: string[]): TableColumn => ({ label, type: "select", options });
const txt = (label: string): TableColumn => ({ label, type: "text" });

// ---------------------------------------------------------------------------
// Shared scenarios
// ---------------------------------------------------------------------------
const LIBRARY_SCHEMA = `A school library database contains these tables (primary keys are listed first):

${B}
STUDENT (StudentID, FirstName, LastName, Form)
BOOK    (BookID, Title, Author, Genre, PubYear)
LOAN    (LoanID, StudentID, BookID, LoanDate, ReturnDate)
${B}
LOAN.StudentID is a foreign key referencing STUDENT; LOAN.BookID is a foreign key referencing BOOK. ReturnDate is NULL while a book is still on loan.`;

const BOOK_DATA = `${B}
BOOK
BookID | Title            | Author    | Genre   | PubYear
B01    | The Silent Coast | Okafor    | Fiction | 2015
B02    | Atoms and Stars  | Lindqvist | Science | 2019
B03    | River of Glass   | Okafor    | Fiction | 2021
B04    | Code and Craft   | Mehta     | Science | 2012
B05    | Salt Roads       | Duarte    | History | 2019
B06    | Small Machines   | Mehta     | Science | 2023
${B}`;

const SHOP_SCHEMA = `An online craft shop uses these tables:

${B}
CUSTOMER (CustomerID, Name, Email, Town)
ORDERS   (OrderID, CustomerID, OrderDate, Total)
${B}
ORDERS.CustomerID is a foreign key referencing CUSTOMER.`;

const PRODUCT_DATA = `${B}
PRODUCT
ProductID | Name     | Category   | Price | Stock
P1        | Pencil   | Stationery | 0.50  | 120
P2        | Ruler    | Stationery | 1.20  | 40
P3        | Glue     | Craft      | 2.00  | 15
P4        | Paint    | Craft      | 3.50  | 8
P5        | Notebook | Stationery | 2.50  | 60
${B}`;

// ---------------------------------------------------------------------------
// SQL playground data for the "Construct an SQL query/statement" questions: the same tables as the question
// describes, with sample rows, so students can test their query before writing the final answer.
// (Model answers are checked against these by running them in SQLite.)
// ---------------------------------------------------------------------------
const LIBRARY_SQL = `CREATE TABLE STUDENT (
  StudentID VARCHAR(5) PRIMARY KEY,
  FirstName VARCHAR(20),
  LastName VARCHAR(20),
  Form VARCHAR(3)
);
INSERT INTO STUDENT VALUES
  ('S101', 'Aisha', 'McAllister', '10A'),
  ('S102', 'Ben', 'Murphy', '10A'),
  ('S103', 'Chen', 'McKenzie', '10B'),
  ('S104', 'Dara', 'McBride', '10C'),
  ('S105', 'Eli', 'Okafor', '10B'),
  ('S106', 'Fern', 'MacLeod', '10A'),
  ('S107', 'Gus', 'McCoy', '10B');
CREATE TABLE BOOK (
  BookID VARCHAR(3) PRIMARY KEY,
  Title VARCHAR(40),
  Author VARCHAR(30),
  Genre VARCHAR(15),
  PubYear INTEGER
);
INSERT INTO BOOK VALUES
  ('B01', 'The Silent Coast', 'Okafor', 'Fiction', 2015),
  ('B02', 'Atoms and Stars', 'Lindqvist', 'Science', 2019),
  ('B03', 'River of Glass', 'Okafor', 'Fiction', 2021),
  ('B04', 'Code and Craft', 'Mehta', 'Science', 2012),
  ('B05', 'Salt Roads', 'Duarte', 'History', 2019),
  ('B06', 'Small Machines', 'Mehta', 'Science', 2023);
CREATE TABLE LOAN (
  LoanID INTEGER PRIMARY KEY,
  StudentID VARCHAR(5) REFERENCES STUDENT(StudentID),
  BookID VARCHAR(3) REFERENCES BOOK(BookID),
  LoanDate DATE,
  ReturnDate DATE
);
INSERT INTO LOAN VALUES
  (1, 'S101', 'B02', '2026-09-02', '2026-09-16'),
  (2, 'S103', 'B05', '2026-09-08', NULL),
  (3, 'S102', 'B01', '2026-09-10', '2026-09-24'),
  (4, 'S105', 'B06', '2026-09-15', NULL),
  (5, 'S101', 'B04', '2026-09-21', NULL),
  (6, 'S107', 'B02', '2026-09-30', '2026-10-07'),
  (7, 'S104', 'B03', '2026-10-01', NULL);
`;

const CRAFT_SHOP_SQL = `CREATE TABLE CUSTOMER (
  CustomerID VARCHAR(4) PRIMARY KEY,
  Name VARCHAR(30),
  Email VARCHAR(40),
  Town VARCHAR(20)
);
INSERT INTO CUSTOMER VALUES
  ('C01', 'Hannah Price', 'hprice@example.com', 'Leeds'),
  ('C02', 'Imran Shah', 'ishah@example.com', 'York'),
  ('C03', 'Jade Wong', 'jwong@example.com', 'Leeds'),
  ('C04', 'Karl Evans', 'kevans@example.com', 'Leeds'),
  ('C05', 'Lena Novak', 'lnovak@example.com', 'Bradford');
CREATE TABLE ORDERS (
  OrderID INTEGER PRIMARY KEY,
  CustomerID VARCHAR(4) REFERENCES CUSTOMER(CustomerID),
  OrderDate DATE,
  Total REAL
);
INSERT INTO ORDERS VALUES
  (501, 'C01', '2026-09-01', 24.50),
  (502, 'C02', '2026-09-03', 35.00),
  (503, 'C03', '2026-09-05', 12.75),
  (504, 'C01', '2026-09-12', 50.00),
  (505, 'C04', '2026-09-14', 61.20),
  (506, 'C03', '2026-09-20', 20.00),
  (507, 'C05', '2026-09-22', 44.10),
  (508, 'C04', '2026-10-02', 18.90);
`;

const PRODUCT_SQL = `CREATE TABLE PRODUCT (
  ProductID VARCHAR(3) PRIMARY KEY,
  Name VARCHAR(20),
  Category VARCHAR(15),
  Price REAL,
  Stock INTEGER
);
INSERT INTO PRODUCT VALUES
  ('P1', 'Pencil', 'Stationery', 0.50, 120),
  ('P2', 'Ruler', 'Stationery', 1.20, 40),
  ('P3', 'Glue', 'Craft', 2.00, 15),
  ('P4', 'Paint', 'Craft', 3.50, 8),
  ('P5', 'Notebook', 'Stationery', 2.50, 60);
`;

const BOOKING_SQL = `CREATE TABLE BOOKING (
  BookingRef VARCHAR(6) PRIMARY KEY,
  PassengerSurname VARCHAR(30),
  FlightNumber VARCHAR(6),
  SeatNo VARCHAR(4)
);
INSERT INTO BOOKING VALUES
  ('BK201', 'Moreau', 'IB102', '12A'),
  ('BK202', 'Tanaka', 'IB102', '12B'),
  ('BK203', 'Osei', 'IB110', '3C'),
  ('BK204', 'Lindgren', 'IB114', '22F'),
  ('BK205', 'Costa', 'IB118', '7D');
`;

const RESULTS_SQL = `CREATE TABLE STUDENT (
  StudentID VARCHAR(5) PRIMARY KEY,
  Name VARCHAR(30),
  Form VARCHAR(3)
);
INSERT INTO STUDENT VALUES
  ('S201', 'Amira Haddad', '11A'),
  ('S202', 'Bruno Silva', '11A'),
  ('S203', 'Cara Doyle', '11B'),
  ('S204', 'Dev Patel', '11B'),
  ('S205', 'Eva Kowalski', '11C'),
  ('S206', 'Femi Adeyemi', '11C');
CREATE TABLE RESULT (
  StudentID VARCHAR(5) REFERENCES STUDENT(StudentID),
  Subject VARCHAR(20),
  Mark INTEGER,
  PRIMARY KEY (StudentID, Subject)
);
INSERT INTO RESULT VALUES
  ('S201', 'Mathematics', 72),
  ('S201', 'Physics', 65),
  ('S202', 'Mathematics', 58),
  ('S202', 'Physics', 70),
  ('S203', 'Mathematics', 81),
  ('S203', 'Physics', 49),
  ('S204', 'Mathematics', 77),
  ('S205', 'Mathematics', 44),
  ('S205', 'Physics', 62),
  ('S206', 'Mathematics', 59);
`;

const ACCOUNT_SQL = `CREATE TABLE ACCOUNT (
  AccountNo INTEGER PRIMARY KEY,
  Holder VARCHAR(30),
  Balance REAL
);
INSERT INTO ACCOUNT VALUES
  (1001, 'R. Mensah', 900.00),
  (2002, 'T. Ivanova', 120.00),
  (3003, 'J. Romero', 45.50);
`;

const FILM_ONLY_SQL = `CREATE TABLE FILM (
  FilmID VARCHAR(4) PRIMARY KEY,
  Title VARCHAR(40),
  Certificate VARCHAR(3),
  Minutes INTEGER
);
INSERT INTO FILM VALUES
  ('F01', 'Harbour Lights', 'PG', 104),
  ('F02', 'The Long Signal', '15', 131),
  ('F03', 'Paper Planets', 'U', 89);
`;

const CINEMA_BANK_SQL = FILM_ONLY_SQL + `CREATE TABLE SCREENING (
  ScreeningID INTEGER PRIMARY KEY,
  FilmID VARCHAR(4) REFERENCES FILM(FilmID),
  ScreenNo INTEGER,
  ShowDate DATE,
  TicketsSold INTEGER
);
INSERT INTO SCREENING VALUES
  (1, 'F01', 1, '2026-10-02', 64),
  (2, 'F02', 2, '2026-10-02', 88),
  (3, 'F03', 3, '2026-10-03', 120),
  (4, 'F01', 1, '2026-10-03', 41),
  (5, 'F02', 2, '2026-10-03', 97),
  (6, 'F03', 1, '2026-10-04', 75),
  (7, 'F02', 3, '2026-10-04', 52),
  (8, 'F03', 2, '2026-10-05', 33);
`;

const HOSPITAL_BANK_SQL = `CREATE TABLE WARD (
  WardID VARCHAR(3) PRIMARY KEY,
  WardName VARCHAR(20),
  Beds INTEGER
);
INSERT INTO WARD VALUES
  ('W1', 'Rowan', 20),
  ('W2', 'Birch', 16),
  ('W3', 'Cedar', 24),
  ('W4', 'Maple', 12);
CREATE TABLE PATIENT (
  PatientID VARCHAR(5) PRIMARY KEY,
  Name VARCHAR(30),
  Age INTEGER,
  WardID VARCHAR(3) REFERENCES WARD(WardID),
  AdmittedOn DATE
);
INSERT INTO PATIENT VALUES
  ('P101', 'Omar Said', 67, 'W3', '2026-10-01'),
  ('P102', 'Lucy Grant', 8, 'W1', '2026-10-03'),
  ('P103', 'Ana Silva', 45, 'W3', '2026-10-04'),
  ('P104', 'Jonas Berg', 81, 'W4', '2026-09-28'),
  ('P105', 'Priya Nair', 12, 'W1', '2026-10-05'),
  ('P106', 'Hugo Laurent', 73, 'W4', '2026-10-06');
`;

const ORDER_SQL = PRODUCT_SQL + `CREATE TABLE ORDERLINE (
  OrderID INTEGER,
  ProductID VARCHAR(3) REFERENCES PRODUCT(ProductID),
  Quantity INTEGER,
  PRIMARY KEY (OrderID, ProductID)
);
INSERT INTO ORDERLINE VALUES
  (901, 'P1', 10),
  (901, 'P5', 2),
  (902, 'P4', 3);
`;

// ---------------------------------------------------------------------------
// A3 Databases
// ---------------------------------------------------------------------------
const A3: IGCSETask[] = [
  mcq({
    unit: "A3", spec: "A3.1.1", cmd: "Identify", diff: "Easy", title: "A3.1 Keys in a relational database",
    brief: "Answer each question about keys and features of relational databases.",
    qs: [
      { q: "Which key uniquely identifies each record in a table?", o: ["Foreign key", "Primary key", "Secondary key", "Sort key"], a: 1 },
      { q: "A field in one table that refers to the primary key of another table is a:", o: ["composite key", "candidate key", "foreign key", "concatenated index"], a: 2 },
      { q: "In ENROLMENT(StudentID, CourseID, StartDate), the pair (StudentID, CourseID) is the primary key. This is an example of a:", o: ["composite key", "foreign key only", "surrogate key", "partial key"], a: 0 },
      { q: "Which statement best describes a relationship in a relational database?", o: ["A copy of a table stored on another server", "A rule that every field must be text", "A link between tables made by matching key values", "A sorted list of the records in one table"], a: 2 },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.1.1", cmd: "Define", diff: "Easy", title: "A3.1 Composite key",
    brief: "Define the term composite key. [2]",
    marks: 2,
    kw: ["two or more fields", "uniquely identify", "combination"],
    pts: [
      "A key made up of two or more fields/attributes",
      "whose combined values uniquely identify each record (when neither field does so on its own)",
    ],
    accept: ["\"attributes\" or \"columns\" for fields."],
  }),
  structured({
    unit: "A3", spec: "A3.1.1", cmd: "Explain", diff: "Moderate", title: "A3.1 Benefits of a relational database",
    stem: "A hospital currently stores patient details in several separate spreadsheets kept by different departments. It plans to move to a relational database.",
    parts: [
      { q: "Identify two features of a relational database that the new system would use.", marks: 2, pts: ["Tables (each storing one entity, e.g. PATIENT)", "Primary keys", "Foreign keys", "Relationships between tables", "Composite keys"] },
      {
        q: "Explain two benefits to the hospital of moving to a relational database.", marks: 4,
        kw: ["redundancy", "integrity", "consistency", "concurrency", "security"],
        pts: [
          "Reduced data duplication/redundancy: each patient's details are stored once and linked by keys",
          "...so there is less wasted storage / one update changes the details everywhere (no conflicting copies)",
          "Data integrity/consistency: constraints such as primary/foreign keys and validation prevent invalid or orphan records",
          "...so clinicians can rely on the data being accurate, e.g. an appointment cannot refer to a patient who does not exist",
          "Concurrency control: many staff can access/update records at the same time safely",
          "...because locking/transactions stop two updates overwriting each other",
          "Security features: user accounts/permissions/views restrict who can see sensitive data",
          "...which protects confidential medical records",
        ],
        note: "Award [1] for identifying a benefit and [1] for an explanation linked to it, for two benefits. Award the second mark only if it is linked to the hospital context or clearly explains the benefit.",
      },
    ],
  }),
  structured({
    unit: "A3", spec: "A3.1.1", cmd: "Outline", diff: "Moderate", title: "A3.1 Limitations of relational databases",
    stem: "A social media start-up stores user accounts, posts, photos and comment threads.",
    parts: [
      { q: "State one benefit of using a relational database for the user account details.", marks: 1, pts: ["Data integrity/consistency, e.g. unique usernames enforced by keys", "Security features such as access permissions", "Reduced redundancy", "Concurrency control / reliable transactions"] },
      {
        q: "Outline two limitations of using a relational database for the posts, photos and comment threads.", marks: 4,
        kw: ["unstructured", "rigid schema", "big data", "hierarchical", "scalability"],
        pts: [
          "Unstructured data handling: photos/free text do not fit neatly into fixed rows and columns",
          "Rigid schema: adding new post types/attributes requires changing table structures, which is slow/disruptive",
          "Hierarchical data handling: nested comment threads (comments on comments) are awkward to model/query in flat tables",
          "Big data scalability: very large, fast-growing data volumes are hard to scale horizontally across many servers",
          "Design complexity: many joined tables make the design and queries complex",
          "Object-relational impedance mismatch: application objects must be converted to/from table rows",
        ],
        note: "Award [1] for each limitation identified and [1] for a relevant outline, for two limitations.",
      },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.1.1", cmd: "Explain", diff: "Hard", title: "A3.1 Object-relational impedance mismatch",
    brief: "Explain what is meant by object-relational impedance mismatch and why it can be a limitation for developers. [3]",
    marks: 3,
    kw: ["objects", "tables", "mapping", "inheritance", "conversion"],
    pts: [
      "Programs written in an object-oriented language store data as objects (with attributes, methods, references, inheritance)",
      "A relational database stores data as rows in tables linked by keys, so the two models do not match directly",
      "Code (or a mapping layer) must convert objects to rows and back, which adds complexity/development time",
      "Some OOP features (inheritance, nested objects, collections) have no direct table equivalent, so mapping can be inefficient or error-prone",
    ],
  }),
  table({
    unit: "A3", spec: "A3.1.1", cmd: "Identify", diff: "Easy", title: "A3.1 Features, benefits, limitations",
    brief: "For each item, identify whether it is a feature, a benefit or a limitation of a relational database.",
    cols: [txt("Item"), sel("Category", ["Feature", "Benefit", "Limitation"])],
    rows: [
      ["=Foreign key", "Feature"],
      ["=Reduced data redundancy", "Benefit"],
      ["=Rigid schema", "Limitation"],
      ["=Concurrency control", "Benefit"],
      ["=Handling unstructured data such as video", "Limitation"],
      ["=Tables", "Feature"],
    ],
  }),
  theory({
    unit: "A3", spec: "A3.2.1", cmd: "Describe", diff: "Easy", title: "A3.2 Three levels of schema",
    brief: "Describe the conceptual, logical and physical schemas of a database. [3]",
    marks: 3,
    kw: ["conceptual", "logical", "physical", "entities", "storage"],
    pts: [
      "Conceptual schema: a high-level, abstract view of the entities and relationships the organisation needs (e.g. shown as an ERD), independent of any DBMS",
      "Logical schema: defines the tables, fields/attributes, data types, keys and constraints, without saying how they are stored",
      "Physical schema: how data is actually stored on the hardware, e.g. files, indexes, partitions, storage locations/access paths",
    ],
  }),
  table({
    unit: "A3", spec: "A3.2.1", cmd: "Identify", diff: "Easy", title: "A3.2 Matching statements to schemas",
    brief: "Identify the schema level that each statement describes.",
    cols: [txt("Statement"), sel("Schema", ["Conceptual", "Logical", "Physical"])],
    rows: [
      ["=The Patient table has a field DOB of type DATE", "Logical"],
      ["=An index on Surname is stored on a solid-state drive", "Physical"],
      ["=A patient can attend many appointments", "Conceptual"],
      ["=WardID in Patient is a foreign key referencing Ward", "Logical"],
    ],
  }),
  structured({
    unit: "A3", spec: "A3.2.2", cmd: "Construct", diff: "Hard", title: "A3.2 ERD for a sports club",
    stem: "A sports club records its members, the teams they play for and the matches each team plays. A member can play for several teams and each team has many members. Each team plays many matches, but each match is played by exactly one club team. Each team has one coach, who is also a member.",
    parts: [
      {
        q: "Identify the cardinality of the relationship between TEAM and MATCH.", marks: 1,
        pts: [{ d: "One-to-many (1:M): one team plays many matches; each match belongs to one team", acc: ["one-to-many", "1:M", "1 to many"] }],
      },
      {
        q: "Explain why the relationship between MEMBER and TEAM cannot be implemented directly in a relational database and how it should be resolved.", marks: 3,
        pts: [
          "It is a many-to-many (M:N) relationship",
          "A single foreign key field cannot hold several values (it would break atomicity / lead to repeating groups)",
          "Create a link/associative entity e.g. TEAM_MEMBER/SQUAD containing MemberID and TeamID",
          "...with a 1:M relationship from MEMBER and from TEAM to the link entity / (MemberID, TeamID) as a composite primary key",
        ],
      },
      {
        q: "Construct an ERD for the club, written in text form. List each entity with its key attributes and state each relationship with its cardinality (for example: ENTITY1 1 --- M ENTITY2).", marks: 4,
        pts: [
          "Entities MEMBER, TEAM, MATCH and a link entity (e.g. TEAM_MEMBER) with sensible primary keys",
          "MEMBER 1 --- M TEAM_MEMBER and TEAM 1 --- M TEAM_MEMBER",
          "TEAM 1 --- M MATCH (MATCH holds TeamID as a foreign key)",
          "Coach relationship: MEMBER 1 --- M TEAM (or 1:1) via a CoachID foreign key in TEAM",
        ],
        example: "MEMBER (MemberID, Name, ...)\nTEAM (TeamID, TeamName, CoachID)\nTEAM_MEMBER (MemberID, TeamID)\nMATCH (MatchID, TeamID, MatchDate, Opponent)\nMEMBER 1 --- M TEAM_MEMBER M --- 1 TEAM\nTEAM 1 --- M MATCH\nMEMBER 1 --- M TEAM (coaches)",
        note: "Accept crow's-foot or other notation described in words. Accept 1:1 for the coach relationship if justified.",
      },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.2.2", cmd: "Distinguish", diff: "Moderate", title: "A3.2 Cardinality and modality",
    brief: "Distinguish between cardinality and modality in an entity relationship diagram. Use the relationship between CUSTOMER and ORDER in an online shop as an example. [3]",
    marks: 3,
    kw: ["maximum", "minimum", "optional", "mandatory"],
    pts: [
      "Cardinality is the maximum number of instances of one entity that can be related to an instance of the other (one or many)",
      "Modality (optionality) is the minimum number: whether the relationship is optional (0) or mandatory (1)",
      "Example cardinality: one customer can place many orders; each order belongs to one customer (1:M)",
      "Example modality: a customer may have placed zero orders (optional) but every order must have a customer (mandatory)",
    ],
  }),
  mcq({
    unit: "A3", spec: "A3.2.2", cmd: "Identify", diff: "Easy", title: "A3.2 ERD relationships",
    brief: "Choose the correct answer for each question about relationships in ERDs.",
    qs: [
      { q: "In a school, each student has exactly one tutor and each tutor has many students. The relationship TUTOR to STUDENT is:", o: ["one-to-one", "one-to-many", "many-to-one", "many-to-many"], a: 1 },
      { q: "In a hospital, each patient can see many doctors and each doctor sees many patients. How many tables are needed to implement PATIENT, DOCTOR and this relationship?", o: ["2", "3", "4", "1"], a: 1 },
      { q: "Each country has one capital city and each capital city belongs to one country. This relationship is:", o: ["one-to-many", "many-to-many", "one-to-one", "zero-to-many"], a: 2 },
      { q: "In an ERD, where should the foreign key go in a one-to-many relationship?", o: ["In the table on the 'one' side", "In both tables", "In a new link table", "In the table on the 'many' side"], a: 3 },
    ],
  }),
  table({
    unit: "A3", spec: "A3.2.3", cmd: "Identify", diff: "Easy", title: "A3.2 Choosing data types",
    brief: "An employee table is being designed. Identify the most appropriate data type for each field.",
    cols: [txt("Field (example value)"), sel("Data type", ["INTEGER", "DECIMAL", "VARCHAR", "CHAR", "DATE", "BOOLEAN"])],
    rows: [
      ["=Surname (Okonkwo)", "VARCHAR"],
      ["=PhoneNumber (07700 900123)", "VARCHAR|CHAR"],
      ["=StartDate (2026-09-01)", "DATE"],
      ["=HourlyRate (14.75)", "DECIMAL"],
      ["=FullTime (yes or no)", "BOOLEAN"],
      ["=DaysHoliday (28)", "INTEGER"],
    ],
    note: "Phone numbers are text because they contain spaces/leading zeros and are not used in calculations; accept CHAR for a fixed-length format.",
  }),
  theory({
    unit: "A3", spec: "A3.2.3", cmd: "Outline", diff: "Moderate", title: "A3.2 Effects of the wrong data type",
    brief: "Outline two possible effects of choosing an inappropriate data type for a field in a relational database. Use an example for each. [4]",
    marks: 4,
    kw: ["leading zero", "sort", "calculation", "validation", "storage"],
    pts: [
      "Data may be lost or changed, e.g. a phone number stored as INTEGER loses its leading zero",
      "Calculations may be impossible or wrong, e.g. prices stored as VARCHAR cannot be summed/averaged correctly",
      "Sorting/comparison may be incorrect, e.g. dates stored as text sort alphabetically ('10/02' before '9/01')",
      "Invalid data may be accepted, e.g. a text date field accepts '31/02/2026' because no type checking occurs",
      "Storage is wasted / performance is reduced, e.g. a large VARCHAR used for a one-character code",
      "Inconsistency between tables, e.g. a foreign key with a different type from the primary key prevents joins or matching",
    ],
    note: "Award [1] for each effect and [1] for a valid example, for two effects.",
  }),
  structured({
    unit: "A3", spec: "A3.2.4", cmd: "Construct", diff: "Moderate", title: "A3.2 Link table with a composite key",
    stem: "A college stores STUDENT(StudentID, Name) and COURSE(CourseCode, Title). Each student may enrol on many courses and each course has many students. The date of enrolment and the final grade must be recorded for each enrolment.",
    parts: [
      { q: "Identify the type of relationship between STUDENT and COURSE.", marks: 1, pts: ["Many-to-many (M:N)"] },
      {
        q: "Construct the table needed to store the enrolments. State its fields, its primary key and any foreign keys.", marks: 4,
        kw: ["composite key", "foreign key", "StudentID", "CourseCode"],
        pts: [
          "A new table, e.g. ENROLMENT, containing StudentID and CourseCode",
          "Fields EnrolDate and Grade are included in this table",
          "Primary key is the composite (StudentID, CourseCode) (or a new EnrolmentID)",
          "StudentID is a foreign key referencing STUDENT and CourseCode is a foreign key referencing COURSE",
        ],
        example: "ENROLMENT (StudentID, CourseCode, EnrolDate, Grade)\nPrimary key: (StudentID, CourseCode)\nForeign keys: StudentID -> STUDENT.StudentID, CourseCode -> COURSE.CourseCode",
        accept: ["a surrogate primary key such as EnrolmentID if both foreign keys are still present."],
      },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.2.4", cmd: "Explain", diff: "Moderate", title: "A3.2 Keys and referential integrity",
    brief: "Explain how primary keys and foreign keys help to maintain data integrity in a relational database. [4]",
    marks: 4,
    kw: ["unique", "not null", "referential integrity", "orphan"],
    pts: [
      "A primary key must be unique (and not null), so every record can be identified without ambiguity",
      "...which prevents duplicate records being entered",
      "A foreign key value must match an existing primary key value in the referenced table (referential integrity)",
      "...so orphan records cannot be created, e.g. a loan for a book that does not exist",
      "The DBMS can block/cascade deletions or updates of a primary key that is referenced elsewhere",
    ],
  }),
  mcq({
    unit: "A3", spec: "A3.2.5", cmd: "Identify", diff: "Moderate", title: "A3.2 Normal forms",
    brief: "Answer each question about normal forms.",
    qs: [
      { q: "A table has a field Phones containing '0161 4960000, 07700 900456'. Which normal form does this break?", o: ["1NF", "2NF", "3NF", "None of the normal forms"], a: 0, why: "values must be atomic" },
      { q: "A table is in 1NF and has a single-field primary key. Which statement is true?", o: ["It must also be in 3NF", "It cannot contain transitive dependencies", "It is automatically in 2NF", "It is automatically not in 2NF"], a: 2, why: "partial dependencies need a composite key" },
      { q: "In ORDERLINE(OrderID, ProductID, Quantity, ProductName), ProductName depends only on ProductID. This is a:", o: ["transitive dependency", "partial (key) dependency", "multi-valued dependency", "full functional dependency"], a: 1 },
      { q: "In EMPLOYEE(EmpID, Name, DeptID, DeptName), DeptName depends on DeptID. This is a:", o: ["partial dependency", "composite key dependency", "transitive (non-key) dependency", "atomicity problem"], a: 2 },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.2.5", cmd: "Define", diff: "Easy", title: "A3.2 Functional dependency",
    brief: "Define the term functional dependency. [2]",
    marks: 2,
    kw: ["determines", "one value", "attribute"],
    pts: [
      "Attribute B is functionally dependent on attribute A if each value of A determines exactly one value of B",
      "e.g. StudentID -> StudentName: knowing the ID gives exactly one name",
    ],
    accept: ["any valid example for the second mark."],
  }),
  theory({
    unit: "A3", spec: "A3.2.5", cmd: "Explain", diff: "Moderate", title: "A3.2 2NF compared with 3NF",
    brief: "Explain the difference between second normal form (2NF) and third normal form (3NF). [4]",
    marks: 4,
    kw: ["partial dependency", "composite key", "transitive", "non-key"],
    pts: [
      "2NF: the table is in 1NF and has no partial (key) dependencies",
      "i.e. every non-key attribute depends on the whole of a composite primary key, not just part of it",
      "3NF: the table is in 2NF and has no transitive (non-key) dependencies",
      "i.e. no non-key attribute depends on another non-key attribute; non-key attributes depend only on the key",
      "A valid example illustrating either a partial or a transitive dependency",
    ],
  }),
  table({
    unit: "A3", spec: "A3.2.5", cmd: "Identify", diff: "Hard", title: "A3.2 Classifying dependencies",
    brief: "The table below is in 1NF:\n\nAPPOINTMENT (PatientID, AppointmentDate, PatientName, DoctorID, DoctorName, Room)\n\nThe primary key is (PatientID, AppointmentDate). Each doctor always works in the same room. Identify the type of each dependency.",
    cols: [txt("Dependency"), sel("Type", ["Full functional dependency on the key", "Partial dependency", "Transitive dependency"])],
    rows: [
      ["=PatientID -> PatientName", "Partial dependency"],
      ["=(PatientID, AppointmentDate) -> DoctorID", "Full functional dependency on the key"],
      ["=DoctorID -> DoctorName", "Transitive dependency"],
      ["=DoctorID -> Room", "Transitive dependency"],
    ],
  }),
  structured({
    unit: "A3", spec: "A3.2.6", cmd: "Construct", diff: "Hard", title: "A3.2 Normalising hospital admissions",
    stem: `A hospital records ward admissions in one table:\n\n${B}\nADMISSION (PatientID, PatientName, WardID, WardName, AdmitDate, Treatments)\n\nPatientID | PatientName | WardID | WardName | AdmitDate  | Treatments\nP17       | A. Rahman   | W2     | Maple    | 2026-03-04 | X-ray, Blood test\nP22       | L. Novak    | W1     | Cedar    | 2026-03-05 | ECG\nP17       | A. Rahman   | W1     | Cedar    | 2026-05-19 | Blood test, ECG, Scan\n${B}\nA patient can be admitted many times. Each admission is to one ward. TreatmentID values (e.g. T1 = X-ray) are available.`,
    parts: [
      {
        q: "State why the ADMISSION table is not in first normal form (1NF).", marks: 2,
        pts: [
          "The Treatments field holds more than one value / is not atomic",
          "...it is a repeating group (a list such as 'X-ray, Blood test')",
        ],
      },
      {
        q: "Identify one transitive dependency in the data and explain why it causes a problem.", marks: 2,
        pts: [
          { d: "WardID -> WardName (WardName depends on a non-key attribute)", acc: ["WardID -> WardName", "WardName depends on WardID"] },
          "Problem: ward names are repeated for every admission, so renaming a ward needs many updates / risks inconsistent data (update anomaly)",
        ],
      },
      {
        q: "Construct a set of tables in third normal form (3NF) for this data. Identify the primary key and any foreign keys in each table.", marks: 5,
        pts: [
          "PATIENT (PatientID, PatientName)",
          "WARD (WardID, WardName)",
          "ADMISSION (AdmissionID, PatientID, WardID, AdmitDate) with PatientID and WardID as foreign keys",
          "TREATMENT (TreatmentID, TreatmentName)",
          "ADMISSION_TREATMENT (AdmissionID, TreatmentID) with a composite primary key, both fields foreign keys",
        ],
        example: "PATIENT (PatientID, PatientName)\nWARD (WardID, WardName)\nADMISSION (AdmissionID, PatientID*, WardID*, AdmitDate)\nTREATMENT (TreatmentID, TreatmentName)\nADMISSION_TREATMENT (AdmissionID*, TreatmentID*)\n(* = foreign key)",
        accept: ["(PatientID, AdmitDate) as the primary key of ADMISSION instead of AdmissionID, with the link table using the same composite key."],
      },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.2.6", cmd: "Construct", diff: "Hard", title: "A3.2 Normalising an online order form",
    brief: `An e-commerce site stores each order line in one table:\n\n${B}\nORDERDATA (OrderID, ProductID, OrderDate, CustomerID, CustomerName, ProductName, UnitPrice, Quantity)\n${B}\nThe primary key is (OrderID, ProductID). Each order is placed by one customer on one date. Unit prices are fixed per product.\n\nConstruct a set of tables in 3NF for this data. Identify the primary key of each table and the foreign keys. [6]`,
    marks: 6,
    kw: ["CUSTOMER", "ORDERS", "PRODUCT", "ORDER_LINE", "composite key"],
    pts: [
      "CUSTOMER (CustomerID, CustomerName)",
      "ORDERS (OrderID, OrderDate, CustomerID)",
      "CustomerID is a foreign key in ORDERS (removes the transitive dependency OrderID -> CustomerID -> CustomerName)",
      "PRODUCT (ProductID, ProductName, UnitPrice)",
      "ORDER_LINE (OrderID, ProductID, Quantity)",
      "(OrderID, ProductID) composite primary key of ORDER_LINE; OrderID and ProductID are foreign keys",
    ],
    example: "CUSTOMER (CustomerID, CustomerName)\nORDERS (OrderID, OrderDate, CustomerID*)\nPRODUCT (ProductID, ProductName, UnitPrice)\nORDER_LINE (OrderID*, ProductID*, Quantity)",
    note: "Accept a design that also stores the price charged in ORDER_LINE if the candidate justifies it (prices may change over time).",
  }),
  structured({
    unit: "A3", spec: "A3.2.6", cmd: "Explain", diff: "Moderate", title: "A3.2 Crime reports to 3NF",
    stem: "A police force stores CRIME_REPORT (ReportID, ReportDate, OfficerID, OfficerName, StationID, StationName, CrimeType). Each officer is based at one station.",
    parts: [
      { q: "Identify the primary key of CRIME_REPORT.", marks: 1, pts: ["ReportID"] },
      { q: "State why CRIME_REPORT is already in second normal form (2NF), assuming it is in 1NF.", marks: 1, pts: ["Its primary key is a single field, so there can be no partial (key) dependencies"] },
      {
        q: "Explain how this table should be changed so that it is in 3NF.", marks: 4,
        kw: ["transitive", "OFFICER", "STATION", "foreign key"],
        pts: [
          "OfficerName and StationID depend on OfficerID, a non-key attribute (transitive dependency)",
          "StationName depends on StationID (another transitive dependency)",
          "Create OFFICER (OfficerID, OfficerName, StationID) and STATION (StationID, StationName)",
          "CRIME_REPORT keeps (ReportID, ReportDate, OfficerID, CrimeType) with OfficerID as a foreign key; StationID is a foreign key in OFFICER",
        ],
      },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.2.7", cmd: "Outline", diff: "Moderate", title: "A3.2 Why denormalise?",
    brief: "Outline one advantage and one disadvantage of denormalising a database. [4]",
    marks: 4,
    kw: ["joins", "read performance", "redundancy", "anomalies"],
    pts: [
      "Advantage: fewer tables to join, so read queries run faster",
      "...useful for read-intensive applications such as reporting dashboards / simpler query structure",
      "Disadvantage: data is duplicated (redundancy), using more storage",
      "...and updates must change several copies, risking inconsistency/update anomalies",
    ],
    note: "Award [1] for each of the advantage and disadvantage and [1] for each expansion.",
  }),
  theory({
    unit: "A3", spec: "A3.2.7", cmd: "Evaluate", diff: "Hard", title: "A3.2 Denormalising for a sales dashboard",
    brief: "A supermarket chain's database is normalised to 3NF. Head office runs thousands of read-only reporting queries every hour for a sales dashboard, each joining five tables. Sales data is written only once each night.\n\nEvaluate the decision to create denormalised tables for the dashboard. [6]",
    marks: 6,
    kw: ["joins", "read-intensive", "redundancy", "consistency", "nightly"],
    bands: {
      indicative: [
        "Removing joins makes the frequent read queries much faster and simpler to write",
        "The workload is read-intensive and data changes only once per night, so the redundancy is easier to control",
        "Pre-joined tables can be rebuilt in the nightly batch, keeping copies consistent",
        "Disadvantage: duplicated data uses more storage",
        "Risk of update anomalies/inconsistency if the denormalised copy is not refreshed correctly",
        "Dashboard data may be up to a day out of date",
        "Extra design and maintenance effort; the 3NF tables remain the source of truth for transactions",
        "Conclusion: justified here because reads far outnumber writes and writes are batched",
      ],
    },
  }),
  table({
    unit: "A3", spec: "A3.3.1", cmd: "Identify", diff: "Easy", title: "A3.3 DDL or DML?",
    brief: "Identify whether each SQL statement is data definition language (DDL) or data manipulation language (DML).",
    cols: [txt("Statement"), sel("Language type", ["DDL", "DML"])],
    rows: [
      ["=CREATE TABLE Ward (WardID CHAR(3) PRIMARY KEY, WardName VARCHAR(30));", "DDL"],
      ["=SELECT WardName FROM Ward;", "DML"],
      ["=ALTER TABLE Ward ADD Floor INTEGER;", "DDL"],
      ["=UPDATE Ward SET Floor = 2 WHERE WardID = 'W1';", "DML"],
      ["=DROP TABLE Visitor;", "DDL"],
      ["=INSERT INTO Ward VALUES ('W9', 'Birch', 3);", "DML"],
    ],
  }),
  theory({
    unit: "A3", spec: "A3.3.1", cmd: "Outline", diff: "Easy", title: "A3.3 DDL and DML",
    brief: "Outline the difference between data definition language (DDL) and data manipulation language (DML) in SQL. [2]",
    marks: 2,
    kw: ["structure", "CREATE", "data", "SELECT", "INSERT"],
    pts: [
      "DDL defines/changes the structure of the database, e.g. CREATE, ALTER, DROP tables",
      "DML retrieves or changes the data stored in the tables, e.g. SELECT, INSERT, UPDATE, DELETE",
    ],
  }),
  inspect({
    unit: "A3", spec: "A3.3.2", cmd: "State", diff: "Moderate", title: "A3.3 Predicting query results",
    brief: `${BOOK_DATA}\nState the result of each query on the BOOK table above.`,
    qs: [
      { q: "SELECT Title FROM BOOK WHERE Genre = 'Science' AND PubYear > 2015;  How many rows are returned?", a: ["2", "two"], why: "Atoms and Stars, Small Machines" },
      { q: "SELECT DISTINCT Author FROM BOOK WHERE Title LIKE 'S%' ORDER BY Author ASC;  What is the first author returned?", a: ["Duarte"], why: "Salt Roads (Duarte), Small Machines (Mehta)" },
      { q: "SELECT Title FROM BOOK WHERE PubYear BETWEEN 2015 AND 2019 ORDER BY PubYear DESC, Title ASC;  What is the first title returned?", a: ["Atoms and Stars"], why: "BETWEEN is inclusive; the 2019 books sorted by title" },
      { q: "SELECT Title FROM BOOK WHERE NOT Genre = 'Fiction' AND PubYear < 2020;  How many rows are returned?", a: ["3", "three"], why: "Atoms and Stars, Code and Craft, Salt Roads" },
      { q: "SELECT DISTINCT Author FROM BOOK WHERE Genre = 'Fiction' OR Genre = 'Science';  How many rows are returned?", a: ["3", "three"], why: "Okafor, Lindqvist, Mehta" },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.3.2", cmd: "Construct", diff: "Easy", title: "A3.3 SQL: filter and sort",
    sqlSetup: LIBRARY_SQL,
    brief: `${LIBRARY_SCHEMA}\n\nConstruct an SQL query to list the Title and PubYear of every book written by Mehta, newest first. [3]`,
    marks: 3,
    kw: ["SELECT", "WHERE", "ORDER BY", "DESC"],
    pts: [
      "SELECT Title, PubYear FROM BOOK",
      "WHERE Author = 'Mehta'",
      "ORDER BY PubYear DESC",
    ],
    example: "SELECT Title, PubYear\nFROM BOOK\nWHERE Author = 'Mehta'\nORDER BY PubYear DESC;",
    note: "Ignore minor syntax differences such as quote style or a missing semicolon.",
  }),
  theory({
    unit: "A3", spec: "A3.3.2", cmd: "Construct", diff: "Moderate", title: "A3.3 SQL: join two tables",
    sqlSetup: LIBRARY_SQL,
    brief: `${LIBRARY_SCHEMA}\n\nConstruct an SQL query to list the LoanDate and the Title of every book that is currently on loan (not yet returned), in order of LoanDate (oldest first). [4]`,
    marks: 4,
    kw: ["JOIN", "ON", "IS NULL", "ORDER BY"],
    pts: [
      "SELECT LOAN.LoanDate, BOOK.Title",
      "FROM LOAN JOIN BOOK ON LOAN.BookID = BOOK.BookID (or an equivalent WHERE join condition)",
      "WHERE LOAN.ReturnDate IS NULL",
      "ORDER BY LOAN.LoanDate ASC (ASC optional)",
    ],
    example: "SELECT LOAN.LoanDate, BOOK.Title\nFROM LOAN\nJOIN BOOK ON LOAN.BookID = BOOK.BookID\nWHERE LOAN.ReturnDate IS NULL\nORDER BY LOAN.LoanDate ASC;",
    accept: ["FROM LOAN, BOOK WHERE LOAN.BookID = BOOK.BookID AND ...", "INNER JOIN."],
    reject: ["ReturnDate = NULL for the third mark."],
  }),
  theory({
    unit: "A3", spec: "A3.3.2", cmd: "Construct", diff: "Moderate", title: "A3.3 SQL: LIKE and BETWEEN",
    sqlSetup: LIBRARY_SQL,
    brief: `${LIBRARY_SCHEMA}\n\nConstruct an SQL query to list the FirstName and LastName of each student whose LastName begins with 'Mc' and who is in form 10A or 10B, in alphabetical order of LastName. [4]`,
    marks: 4,
    kw: ["LIKE", "%", "OR", "ORDER BY"],
    pts: [
      "SELECT FirstName, LastName FROM STUDENT",
      "WHERE LastName LIKE 'Mc%'",
      "AND (Form = '10A' OR Form = '10B') with correct bracketing",
      "ORDER BY LastName (ASC)",
    ],
    example: "SELECT FirstName, LastName\nFROM STUDENT\nWHERE LastName LIKE 'Mc%'\n  AND (Form = '10A' OR Form = '10B')\nORDER BY LastName ASC;",
    accept: ["Form IN ('10A', '10B')", "Form LIKE '10_' only if limited to A and B by another condition."],
    note: "Withhold the third mark if the brackets are missing, because AND binds more tightly than OR.",
  }),
  structured({
    unit: "A3", spec: "A3.3.2", cmd: "Construct", diff: "Hard", title: "A3.3 Querying a craft shop",
    sqlSetup: CRAFT_SHOP_SQL,
    stem: `${SHOP_SCHEMA}`,
    parts: [
      {
        q: "State the purpose of the keyword DISTINCT in the query SELECT DISTINCT Town FROM CUSTOMER;", marks: 1,
        pts: ["Removes duplicate rows so each town is listed only once"],
      },
      {
        q: "Construct an SQL query to list the Name and Email of customers in the town 'Leeds' who have placed an order with a Total between 20 and 50 inclusive. Each customer should appear only once, sorted by Name.", marks: 5,
        pts: [
          "SELECT DISTINCT CUSTOMER.Name, CUSTOMER.Email",
          "FROM CUSTOMER JOIN ORDERS ON CUSTOMER.CustomerID = ORDERS.CustomerID",
          "WHERE CUSTOMER.Town = 'Leeds'",
          "AND ORDERS.Total BETWEEN 20 AND 50",
          "ORDER BY CUSTOMER.Name",
        ],
        example: "SELECT DISTINCT CUSTOMER.Name, CUSTOMER.Email\nFROM CUSTOMER\nJOIN ORDERS ON CUSTOMER.CustomerID = ORDERS.CustomerID\nWHERE CUSTOMER.Town = 'Leeds'\n  AND ORDERS.Total BETWEEN 20 AND 50\nORDER BY CUSTOMER.Name;",
        accept: ["Total >= 20 AND Total <= 50."],
      },
      {
        q: "Explain why the query needs a join condition linking the two tables.", marks: 2,
        pts: [
          "Without it every customer row is combined with every order row (a Cartesian product)",
          "...giving incorrect/meaningless results; the condition matches each order to the customer who placed it via the foreign key",
        ],
      },
    ],
  }),
  mcq({
    unit: "A3", spec: "A3.3.2", cmd: "Identify", diff: "Easy", title: "A3.3 SQL clauses",
    brief: "Choose the correct answer for each question about SQL.",
    qs: [
      { q: "Which condition matches every Title that contains the word 'Glass' anywhere?", o: ["Title = '%Glass%'", "Title LIKE 'Glass%'", "Title LIKE '%Glass%'", "Title LIKE '%Glass'"], a: 2 },
      { q: "PubYear BETWEEN 2012 AND 2015 includes:", o: ["2013 and 2014 only", "2012, 2013, 2014 and 2015", "2012, 2013 and 2014", "2013, 2014 and 2015"], a: 1 },
      { q: "Which clause filters groups after GROUP BY has been applied?", o: ["WHERE", "ORDER BY", "DISTINCT", "HAVING"], a: 3 },
      { q: "Which clause sorts the results of a query?", o: ["ORDER BY", "GROUP BY", "SORT", "ARRANGE BY"], a: 0 },
    ],
  }),
  structured({
    unit: "A3", spec: "A3.3.3", cmd: "Construct", diff: "Moderate", title: "A3.3 Updating the product table",
    sqlSetup: PRODUCT_SQL,
    stem: `A craft shop stores its stock in one table, PRODUCT (ProductID is the primary key). The table currently contains:\n\n${PRODUCT_DATA}`,
    parts: [
      {
        q: "Construct an SQL statement to add a new product P6, 'Scissors', in the Craft category, priced 4.25 with 30 in stock.", marks: 2,
        pts: ["INSERT INTO PRODUCT (with optional field list)", "VALUES ('P6', 'Scissors', 'Craft', 4.25, 30) in the correct order"],
        example: "INSERT INTO PRODUCT (ProductID, Name, Category, Price, Stock)\nVALUES ('P6', 'Scissors', 'Craft', 4.25, 30);",
      },
      {
        q: "Construct an SQL statement to increase the price of every Stationery product by 10%.", marks: 2,
        pts: ["UPDATE PRODUCT SET Price = Price * 1.1", "WHERE Category = 'Stationery'"],
        example: "UPDATE PRODUCT\nSET Price = Price * 1.1\nWHERE Category = 'Stationery';",
      },
      {
        q: "Construct an SQL statement to remove every product that has no stock.", marks: 2,
        pts: ["DELETE FROM PRODUCT", "WHERE Stock = 0"],
        example: "DELETE FROM PRODUCT\nWHERE Stock = 0;",
        accept: ["Stock <= 0 or Stock < 1."],
      },
    ],
  }),
  structured({
    unit: "A3", spec: "A3.3.3", cmd: "Explain", diff: "Hard", title: "A3.3 Updates and indexes",
    sqlSetup: BOOKING_SQL,
    stem: "An airline stores bookings in the table BOOKING (BookingRef, PassengerSurname, FlightNumber, SeatNo), with BookingRef as the primary key. The table has indexes on PassengerSurname and FlightNumber. Each night, about 200 000 rows are updated when flights are rescheduled.",
    parts: [
      { q: "Construct an SQL statement to change the flight number of booking 'BK204' to 'IB118'.", marks: 2, pts: ["UPDATE BOOKING SET FlightNumber = 'IB118'", "WHERE BookingRef = 'BK204'"], example: "UPDATE BOOKING\nSET FlightNumber = 'IB118'\nWHERE BookingRef = 'BK204';" },
      {
        q: "Explain the performance implications of updating data in indexed columns.", marks: 4,
        kw: ["index", "maintain", "rebuild", "fragmentation", "write"],
        pts: [
          "When an indexed value changes, the index must also be updated, so each write takes longer",
          "Many updates/inserts/deletes can leave the index fragmented/unbalanced",
          "...making searches that use the index slower than they should be",
          "After large batch changes the index may need to be rebuilt or reorganised",
          "This rebuilding uses processing time and may lock the table, so it is scheduled at quiet times (e.g. overnight)",
          "Trade-off: indexes speed up reads but slow down writes, so only frequently searched columns should be indexed",
        ],
      },
    ],
  }),
  inspect({
    unit: "A3", spec: "A3.3.3", cmd: "State", diff: "Easy", title: "A3.3 Effect of UPDATE and DELETE",
    brief: `${PRODUCT_DATA}\nEach statement below is run on the original table shown above (not one after another).`,
    qs: [
      { q: "UPDATE PRODUCT SET Price = Price * 2 WHERE Stock < 20;  How many rows are changed?", a: ["2", "two"], why: "Glue and Paint" },
      { q: "After the statement in question 1, what is the price of Paint?", a: ["7.00", "7", "7.0"] },
      { q: "DELETE FROM PRODUCT WHERE Category = 'Stationery' AND Price < 2.00;  How many rows remain in the table?", a: ["3", "three"], why: "Pencil and Ruler are removed" },
    ],
  }),
  inspect({
    unit: "A3", spec: "A3.3.4", hl: true, cmd: "State", diff: "Moderate", title: "A3.3 Aggregate function results",
    brief: `${BOOK_DATA}\nState the value returned by each query on the BOOK table above.`,
    qs: [
      { q: "SELECT COUNT(*) FROM BOOK WHERE Genre = 'Science';", a: ["3", "three"] },
      { q: "SELECT MIN(PubYear) FROM BOOK WHERE Author = 'Okafor';", a: ["2015"] },
      { q: "SELECT AVG(PubYear) FROM BOOK WHERE Genre = 'Fiction';", a: ["2018", "2018.0"] },
      { q: "SELECT MAX(PubYear) - MIN(PubYear) FROM BOOK;", a: ["11"] },
      { q: "SELECT Genre FROM BOOK GROUP BY Genre HAVING COUNT(*) > 1;  How many rows are returned?", a: ["2", "two"], why: "Fiction (2) and Science (3)" },
    ],
  }),
  structured({
    unit: "A3", spec: "A3.3.4", hl: true, cmd: "Construct", diff: "Hard", title: "A3.3 SQL: grouped averages",
    sqlSetup: RESULTS_SQL,
    stem: "A school stores two tables:\n\nSTUDENT (StudentID, Name, Form) - primary key StudentID\nRESULT (StudentID, Subject, Mark) - primary key (StudentID, Subject); RESULT.StudentID is a foreign key referencing STUDENT.",
    parts: [
      { q: "Outline the difference between the WHERE and HAVING clauses.", marks: 2, pts: ["WHERE filters individual rows before grouping", "HAVING filters groups after GROUP BY, so it can use aggregate functions such as AVG"] },
      {
        q: "Construct an SQL query that shows, for each form, the number of results and the average mark in Mathematics. Only include forms whose average Mathematics mark is above 60, highest average first.", marks: 5,
        kw: ["AVG", "COUNT", "GROUP BY", "HAVING", "JOIN"],
        pts: [
          "SELECT STUDENT.Form, COUNT(*), AVG(RESULT.Mark)",
          "FROM STUDENT JOIN RESULT ON STUDENT.StudentID = RESULT.StudentID",
          "WHERE RESULT.Subject = 'Mathematics'",
          "GROUP BY STUDENT.Form HAVING AVG(RESULT.Mark) > 60",
          "ORDER BY AVG(RESULT.Mark) DESC",
        ],
        example: "SELECT STUDENT.Form, COUNT(*) AS NumResults, AVG(RESULT.Mark) AS AvgMark\nFROM STUDENT\nJOIN RESULT ON STUDENT.StudentID = RESULT.StudentID\nWHERE RESULT.Subject = 'Mathematics'\nGROUP BY STUDENT.Form\nHAVING AVG(RESULT.Mark) > 60\nORDER BY AvgMark DESC;",
        accept: ["AVERAGE in place of AVG (syntax varies between database systems).", "COUNT(RESULT.Mark) or COUNT(RESULT.StudentID)."],
        reject: ["the HAVING condition placed in the WHERE clause."],
      },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.3.4", hl: true, cmd: "Explain", diff: "Moderate", title: "A3.3 Aggregates for decision-making",
    brief: "A cinema chain stores every ticket sale. Explain how aggregate functions on grouped data could help managers decide which films to show at each cinema. [3]",
    marks: 3,
    kw: ["GROUP BY", "SUM", "COUNT", "AVG", "report"],
    pts: [
      "Grouping sales by cinema and film (GROUP BY) summarises thousands of rows into one row per group",
      "COUNT/SUM give the number of tickets sold or revenue per film per cinema",
      "AVG/MAX/MIN show typical or peak attendance, e.g. average tickets per screening",
      "Managers can compare these totals to keep popular films and drop poorly attended ones at each site",
    ],
  }),
  theory({
    unit: "A3", spec: "A3.3.5", hl: true, cmd: "Distinguish", diff: "Moderate", title: "A3.3 Virtual and materialised views",
    brief: "Distinguish between a virtual view and a materialised (snapshot) view. [3]",
    marks: 3,
    kw: ["stored query", "recomputed", "stored result", "refresh", "up to date"],
    pts: [
      "A virtual view stores only the query; its result is generated each time the view is used",
      "...so it always shows current data but can be slow for complex queries",
      "A materialised view stores the query result physically",
      "...so it is fast to read but may be out of date until it is refreshed / uses extra storage",
    ],
  }),
  structured({
    unit: "A3", spec: "A3.3.5", hl: true, cmd: "Describe", diff: "Moderate", title: "A3.3 Views in a hospital",
    stem: "A hospital database contains full patient records, including diagnoses. Receptionists need to see only names and appointment times.",
    parts: [
      {
        q: "Describe two ways in which database views would benefit the hospital.", marks: 4,
        kw: ["security", "hide", "simplify", "independence", "read-only"],
        pts: [
          "Security: a view showing only names and appointment times can be granted to receptionists",
          "...so confidential diagnoses are hidden from staff who do not need them",
          "Hiding complexity / query simplification: a view can pre-join several tables",
          "...so staff run simple queries against the view rather than writing complex joins",
          "Data independence: if the underlying tables change, the view can be redefined so applications keep working",
          "Read-only views prevent receptionists from changing clinical data / consistency of the data presented",
        ],
      },
      { q: "Outline why a materialised view might be used for a large daily ward-occupancy report.", marks: 2, pts: ["The result is stored, so the report reads quickly without re-running complex joins/aggregates", "Data only needs to be current once a day, so refreshing the view daily is acceptable"] },
    ],
  }),
  table({
    unit: "A3", spec: "A3.3.6", hl: true, cmd: "Identify", diff: "Easy", title: "A3.3 ACID properties",
    brief: "Identify the ACID property described by each statement.",
    cols: [txt("Statement"), sel("Property", ["Atomicity", "Consistency", "Isolation", "Durability"])],
    rows: [
      ["=Once a transaction is committed, it survives a power cut", "Durability"],
      ["=Either all steps of a transaction happen or none do", "Atomicity"],
      ["=Two transactions running at the same time do not see each other's unfinished changes", "Isolation"],
      ["=A transaction moves the database from one valid state to another, obeying all rules", "Consistency"],
    ],
  }),
  structured({
    unit: "A3", spec: "A3.3.6", hl: true, cmd: "Construct", diff: "Hard", title: "A3.3 Transferring money safely",
    sqlSetup: ACCOUNT_SQL,
    stem: "A bank stores accounts in the table ACCOUNT (AccountNo, Holder, Balance), with AccountNo as the primary key. A customer transfers 250 from account 1001 to account 2002.",
    parts: [
      {
        q: "Construct the SQL transaction for this transfer, using transaction control language (TCL) commands.", marks: 4,
        pts: [
          "BEGIN TRANSACTION at the start",
          "UPDATE ACCOUNT SET Balance = Balance - 250 WHERE AccountNo = 1001",
          "UPDATE ACCOUNT SET Balance = Balance + 250 WHERE AccountNo = 2002",
          "COMMIT at the end (with ROLLBACK if an error occurs)",
        ],
        example: "BEGIN TRANSACTION;\nUPDATE ACCOUNT SET Balance = Balance - 250 WHERE AccountNo = 1001;\nUPDATE ACCOUNT SET Balance = Balance + 250 WHERE AccountNo = 2002;\nCOMMIT;\n-- if either update fails: ROLLBACK;",
      },
      {
        q: "Explain the role of ROLLBACK if the server fails after the first UPDATE.", marks: 2,
        pts: [
          "ROLLBACK undoes the completed first update, restoring account 1001's balance",
          "...so money is not lost: the transfer happens completely or not at all (atomicity)",
        ],
      },
      {
        q: "Describe how isolation protects the balances if two transfers from account 1001 happen at the same time.", marks: 2,
        pts: [
          "Each transaction runs as if it were alone; the DBMS locks/serialises access to the rows",
          "...so one transaction cannot read a balance the other has not yet committed, preventing a lost update/overdrawn account",
        ],
      },
    ],
  }),
  table({
    unit: "A3", spec: "A3.4.1", hl: true, cmd: "Identify", diff: "Easy", title: "A3.4 Choosing a database model",
    brief: "Identify the most suitable database model for each scenario.",
    cols: [txt("Scenario"), sel("Database model", ["NoSQL", "Cloud", "Spatial", "In-memory"])],
    rows: [
      ["=A delivery firm finds all depots within 20 km of a postcode", "Spatial"],
      ["=A social media platform stores posts with varying fields at huge scale", "NoSQL"],
      ["=A trading system analyses market prices in microseconds", "In-memory"],
      ["=A small charity wants a managed database without buying servers", "Cloud"],
    ],
  }),
  theory({
    unit: "A3", spec: "A3.4.1", hl: true, cmd: "Outline", diff: "Moderate", title: "A3.4 NoSQL for e-commerce",
    brief: "Outline two reasons why a large e-commerce platform might store its product catalogue in a NoSQL database rather than a relational database. [4]",
    marks: 4,
    kw: ["flexible schema", "horizontal scaling", "documents", "key-value"],
    pts: [
      "Flexible/schema-less structure: products have different attributes (a shirt has sizes, a laptop has specifications)",
      "...each product can be stored as a document without empty fields or schema changes",
      "Horizontal scalability: data can be spread across many cheap servers",
      "...to handle very large catalogues and peak traffic (e.g. sales events)",
      "Fast reads of a whole product as one document/key-value lookup without joins",
    ],
  }),
  structured({
    unit: "A3", spec: "A3.4.2", hl: true, cmd: "Explain", diff: "Moderate", title: "A3.4 Data warehouse characteristics",
    stem: "A supermarket chain loads data from its tills, website and loyalty scheme into a data warehouse.",
    parts: [
      { q: "Outline one difference between the data warehouse and the operational database used by the tills.", marks: 2, pts: ["The operational database handles many small, frequent updates (transactions) for day-to-day work", "The warehouse holds integrated historical data optimised for complex read/analysis queries rather than updates"] },
      {
        q: "Explain why the warehouse data is described as integrated, time-variant and non-volatile.", marks: 6,
        kw: ["integrated", "time-variant", "non-volatile", "append-only", "history"],
        pts: [
          "Integrated: data from different sources is cleaned and converted to consistent formats/codes",
          "...so till, web and loyalty data can be analysed together",
          "Time-variant: data is stored with time stamps and historical data is kept",
          "...so trends can be analysed over months or years",
          "Non-volatile: once loaded, data is not updated or deleted (append-only)",
          "...so reports are stable and repeatable, unlike the constantly changing operational database",
        ],
      },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.4.3", hl: true, cmd: "Explain", diff: "Moderate", title: "A3.4 OLAP for business intelligence",
    brief: "Explain how online analytical processing (OLAP) helps the managers of a clothing retailer make decisions. [4]",
    marks: 4,
    kw: ["multidimensional", "cube", "drill down", "slice", "aggregate"],
    pts: [
      "OLAP organises warehouse data into multidimensional cubes, e.g. product x store x time",
      "Managers can drill down/roll up, e.g. from yearly sales by region to weekly sales in one store",
      "Slice and dice operations compare subsets, e.g. coats sold in northern stores in winter",
      "Aggregates are pre-computed so complex analytical queries return quickly",
      "This supports decisions such as stock levels, pricing or which lines to discontinue",
    ],
  }),
  table({
    unit: "A3", spec: "A3.4.3", hl: true, cmd: "Identify", diff: "Moderate", title: "A3.4 Data mining techniques",
    brief: "Identify the data mining technique being used in each business scenario.",
    cols: [txt("Scenario"), sel("Technique", ["Classification", "Clustering", "Regression", "Association rule discovery", "Sequential pattern discovery", "Anomaly detection"])],
    rows: [
      ["=A bank flags a card payment that is very unlike the customer's usual spending", "Anomaly detection"],
      ["=A shop finds that customers who buy tents often also buy sleeping mats", "Association rule discovery"],
      ["=An insurer labels each new claim as 'likely fraud' or 'genuine'", "Classification"],
      ["=A gym groups members into segments with similar attendance habits, without predefined labels", "Clustering"],
      ["=An estate agent predicts the selling price of a house", "Regression"],
      ["=A streaming service finds that viewers who watch episode 1 then episode 2 often cancel next", "Sequential pattern discovery"],
    ],
  }),
  structured({
    unit: "A3", spec: "A3.4.4", hl: true, cmd: "Describe", diff: "Moderate", title: "A3.4 Features of distributed databases",
    stem: "A retail chain stores its database across servers in five countries.",
    parts: [
      {
        q: "Describe three features of a distributed database that would benefit the chain.", marks: 6,
        kw: ["replication", "fault tolerance", "partitioning", "location transparency", "scalability"],
        pts: [
          "Replication: copies of data are kept at several sites",
          "...so local reads are faster and data survives the loss of one site",
          "Fault tolerance: if one server fails, others continue to provide the service",
          "Data partitioning: each country's data can be stored on its local server",
          "...reducing network traffic / meeting local data laws",
          "Location/distribution transparency: users query the database as if it were one system without knowing where data is stored",
          "Scalability: new servers/sites can be added as the chain grows",
          "Global query processing: a query can combine data from several sites",
        ],
        note: "Award [1] for each feature and [1] for a linked description, for three features.",
      },
      { q: "Outline why ACID properties are harder to guarantee in a distributed database than in one on a single server.", marks: 2, pts: ["A transaction may update data at several sites, which must all commit or all roll back (atomicity across sites)", "Network delays/failures and replicas make it harder to keep every copy consistent and isolated at the same moment"] },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.4.4", hl: true, cmd: "To what extent", diff: "Hard", title: "A3.4 Distributed databases and networks",
    brief: "An international hotel group uses a distributed database for bookings, with sites in Europe, Asia and North America.\n\nTo what extent is the effectiveness of this distributed database determined by the network that connects its sites? [8]",
    marks: 8,
    kw: ["latency", "bandwidth", "replication", "consistency", "ACID", "concurrency"],
    bands: {
      indicative: [
        "Network latency affects how quickly a global query or replication update completes",
        "Bandwidth limits how much data can be replicated between sites and how fast",
        "Keeping replicas consistent (e.g. two people booking the last room) requires network communication; slow or failed links risk conflicts",
        "Distributed transactions need all sites to agree before COMMIT (ACID); a network failure can block or roll back transactions",
        "Network partition forces a trade-off between availability and consistency",
        "However, other factors matter: data partitioning design, local storage/processing, concurrency control, security and DBMS software",
        "Good partitioning (each region mainly accesses local data) reduces dependence on the network",
        "Fault tolerance and replication allow sites to continue locally if a link fails",
        "Conclusion: the network is a major but not the only factor; design choices can reduce its impact",
      ],
    },
  }),
  // ----- extra A3.3 coverage (appended so that existing question ids stay the same) -----
  structured({
    unit: "A3", spec: "A3.3.1", cmd: "Construct", diff: "Hard", title: "A3.3 Defining a table with DDL",
    sqlSetup: FILM_ONLY_SQL,
    stem: "A cinema's database already contains the table FILM (FilmID, Title, Certificate, Minutes), with FilmID as the primary key. A second table is needed to store each screening of a film.",
    parts: [
      {
        q: "Construct an SQL statement to create the table SCREENING with the fields ScreeningID (an integer primary key), FilmID (a foreign key referencing FILM), ScreenNo (an integer) and ShowDate (a date).", marks: 4,
        kw: ["CREATE TABLE", "PRIMARY KEY", "REFERENCES", "data types"],
        pts: [
          "CREATE TABLE SCREENING ( ... )",
          "ScreeningID INTEGER PRIMARY KEY",
          "FilmID with a suitable data type and REFERENCES FILM(FilmID) / FOREIGN KEY (FilmID) REFERENCES FILM(FilmID)",
          "ScreenNo INTEGER and ShowDate DATE (suitable data types for every field)",
        ],
        example: "CREATE TABLE SCREENING (\n  ScreeningID INTEGER PRIMARY KEY,\n  FilmID VARCHAR(4) REFERENCES FILM(FilmID),\n  ScreenNo INTEGER,\n  ShowDate DATE\n);",
        accept: ["a separate FOREIGN KEY (FilmID) REFERENCES FILM(FilmID) clause.", "CHAR/VARCHAR/TEXT for FilmID."],
      },
      {
        q: "The cinema later wants to record the number of tickets sold for each screening. Construct an SQL statement to add the field TicketsSold to SCREENING.", marks: 2,
        pts: ["ALTER TABLE SCREENING", "ADD TicketsSold INTEGER (or ADD COLUMN)"],
        example: "ALTER TABLE SCREENING ADD TicketsSold INTEGER;",
      },
      {
        q: "State whether each of the statements in (a) and (b), and the statement SELECT Title FROM FILM; belongs to DDL or DML. Justify your answer for the SELECT statement.", marks: 2,
        pts: ["(a) and (b) are DDL (they define/change the structure)", "SELECT is DML, because it retrieves data from the tables rather than changing their structure"],
      },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.3.1", cmd: "Explain", diff: "Moderate", title: "A3.3 DROP TABLE or DELETE?",
    brief: "A technician wants to remove all the records of last year's clubs from the table CLUB but keep the table for next year. They are deciding between the statements DROP TABLE CLUB; and DELETE FROM CLUB;\n\nExplain which statement should be used, referring to the SQL data language types. [3]",
    marks: 3,
    kw: ["DDL", "DML", "structure", "data", "DELETE", "DROP"],
    pts: [
      "DROP TABLE is DDL: it removes the table structure itself (and all its data)",
      "DELETE FROM is DML: it removes records but the table definition (fields, keys) remains",
      "So DELETE FROM CLUB should be used, because the table is needed again next year",
    ],
  }),
  structured({
    unit: "A3", spec: "A3.3.3", cmd: "Construct", diff: "Hard", title: "A3.3 Keeping hospital records up to date",
    sqlSetup: HOSPITAL_BANK_SQL,
    stem: "A hospital stores two tables:\n\nWARD (WardID, WardName, Beds) - primary key WardID\nPATIENT (PatientID, Name, Age, WardID, AdmittedOn) - primary key PatientID; PATIENT.WardID is a foreign key referencing WARD.",
    parts: [
      {
        q: "Construct an SQL statement to add a new patient: P107, Mara Costa, aged 29, admitted to ward W2 on 2026-10-07.", marks: 2,
        pts: ["INSERT INTO PATIENT (field list optional)", "VALUES ('P107', 'Mara Costa', 29, 'W2', '2026-10-07') in the correct order with text/dates in quotes"],
        example: "INSERT INTO PATIENT (PatientID, Name, Age, WardID, AdmittedOn)\nVALUES ('P107', 'Mara Costa', 29, 'W2', '2026-10-07');",
      },
      {
        q: "Ward W4 is closing. Construct an SQL statement to move every patient on ward W4 to ward W3.", marks: 2,
        pts: ["UPDATE PATIENT SET WardID = 'W3'", "WHERE WardID = 'W4'"],
        example: "UPDATE PATIENT\nSET WardID = 'W3'\nWHERE WardID = 'W4';",
      },
      {
        q: "Construct an SQL statement to remove the records of patients aged over 60 who were admitted before 2026-10-01.", marks: 2,
        pts: ["DELETE FROM PATIENT", "WHERE Age > 60 AND AdmittedOn < '2026-10-01'"],
        example: "DELETE FROM PATIENT\nWHERE Age > 60 AND AdmittedOn < '2026-10-01';",
      },
      {
        q: "Explain why the DBMS would reject an attempt to delete ward W1 from WARD while patients are still assigned to it.", marks: 2,
        pts: ["PATIENT.WardID is a foreign key referring to W1", "deleting W1 would leave patients referring to a ward that does not exist, breaking referential integrity, so the DBMS refuses"],
      },
    ],
  }),
  theory({
    unit: "A3", spec: "A3.3.4", hl: true, cmd: "Construct", diff: "Moderate", title: "A3.3 SQL: cinema attendance report",
    sqlSetup: CINEMA_BANK_SQL,
    brief: "A cinema stores two tables:\n\nFILM (FilmID, Title, Certificate, Minutes) - primary key FilmID\nSCREENING (ScreeningID, FilmID, ScreenNo, ShowDate, TicketsSold) - primary key ScreeningID; SCREENING.FilmID is a foreign key referencing FILM.\n\nConstruct an SQL query that shows the Title of each film with the total number of tickets sold and the highest number sold at a single screening, for films with a total of more than 150 tickets. [5]",
    marks: 5,
    kw: ["SUM", "MAX", "GROUP BY", "HAVING", "JOIN"],
    pts: [
      "SELECT FILM.Title, SUM(SCREENING.TicketsSold), MAX(SCREENING.TicketsSold)",
      "FROM FILM JOIN SCREENING",
      "ON FILM.FilmID = SCREENING.FilmID",
      "GROUP BY FILM.Title (or FILM.FilmID)",
      "HAVING SUM(SCREENING.TicketsSold) > 150",
    ],
    example: "SELECT FILM.Title, SUM(SCREENING.TicketsSold) AS Total, MAX(SCREENING.TicketsSold) AS Best\nFROM FILM\nJOIN SCREENING ON FILM.FilmID = SCREENING.FilmID\nGROUP BY FILM.Title\nHAVING SUM(SCREENING.TicketsSold) > 150;",
    reject: ["the condition on the total placed in WHERE."],
  }),
  theory({
    unit: "A3", spec: "A3.3.5", hl: true, cmd: "Construct", diff: "Moderate", title: "A3.3 Creating and using a view",
    sqlSetup: PRODUCT_SQL,
    brief: "A craft shop stores PRODUCT (ProductID, Name, Category, Price, Stock), with ProductID as the primary key. Staff who reorder stock only need the name and stock level of products with fewer than 20 items in stock.\n\nConstruct SQL statements to create a view called LOWSTOCK for these staff, and then to list the contents of the view in order of Stock (lowest first). [4]",
    marks: 4,
    kw: ["CREATE VIEW", "AS SELECT", "WHERE", "ORDER BY"],
    pts: [
      "CREATE VIEW LOWSTOCK AS",
      "SELECT Name, Stock FROM PRODUCT",
      "WHERE Stock < 20",
      "SELECT * FROM LOWSTOCK ORDER BY Stock (ASC)",
    ],
    example: "CREATE VIEW LOWSTOCK AS\nSELECT Name, Stock\nFROM PRODUCT\nWHERE Stock < 20;\n\nSELECT * FROM LOWSTOCK ORDER BY Stock ASC;",
  }),
  mcq({
    unit: "A3", spec: "A3.3.5", hl: true, cmd: "Identify", diff: "Easy", title: "A3.3 Database views",
    brief: "Choose the correct answer for each question about database views.",
    qs: [
      { q: "What does a virtual view store?", o: ["A copy of the result rows", "Only the query that defines it", "An index on every column", "A backup of the base tables"], a: 1 },
      { q: "Which is the main disadvantage of a materialised view?", o: ["It cannot be queried with SELECT", "Its data can be out of date until it is refreshed", "It always runs the query again", "It cannot include a join"], a: 1 },
      { q: "A view that shows staff names but not salaries mainly provides:", o: ["security", "durability", "normalisation", "atomicity"], a: 0 },
      { q: "Which view is most likely to be read-only?", o: ["SELECT Name, Email FROM CUSTOMER WHERE Town = 'Leeds'", "SELECT Town, COUNT(*) FROM CUSTOMER GROUP BY Town", "SELECT CustomerID, Name FROM CUSTOMER", "SELECT * FROM CUSTOMER"], a: 1, why: "views with aggregates/GROUP BY cannot map changes back to single base rows" },
    ],
  }),
  structured({
    unit: "A3", spec: "A3.3.6", hl: true, cmd: "Construct", diff: "Hard", title: "A3.3 Recording an order in a transaction",
    sqlSetup: ORDER_SQL,
    stem: "A craft shop stores PRODUCT (ProductID, Name, Category, Price, Stock) and ORDERLINE (OrderID, ProductID, Quantity), where ORDERLINE.ProductID is a foreign key referencing PRODUCT. When a customer orders 5 tubes of Glue (P3) in order 903, a line is added to ORDERLINE and the stock of P3 is reduced by 5.",
    parts: [
      {
        q: "Construct the SQL transaction that records this order.", marks: 4,
        pts: [
          "BEGIN TRANSACTION",
          "INSERT INTO ORDERLINE VALUES (903, 'P3', 5)",
          "UPDATE PRODUCT SET Stock = Stock - 5 WHERE ProductID = 'P3'",
          "COMMIT (at the end, after both statements)",
        ],
        example: "BEGIN TRANSACTION;\nINSERT INTO ORDERLINE (OrderID, ProductID, Quantity) VALUES (903, 'P3', 5);\nUPDATE PRODUCT SET Stock = Stock - 5 WHERE ProductID = 'P3';\nCOMMIT;",
      },
      {
        q: "Describe when ROLLBACK would be used in this transaction and its effect.", marks: 2,
        pts: ["If a step fails or a check fails, e.g. the stock would become negative / the insert is rejected", "ROLLBACK undoes every change since BEGIN TRANSACTION, so the order line and stock change are both cancelled (atomicity)"],
      },
      {
        q: "Explain how the consistency property of ACID applies to this transaction.", marks: 2,
        pts: ["The database must move from one valid state to another, obeying all rules/constraints", "e.g. stock never negative and every order line refers to an existing product; the stock reduction always matches the quantity ordered"],
      },
    ],
  }),
  mcq({
    unit: "A3", spec: "A3.3.6", hl: true, cmd: "Identify", diff: "Easy", title: "A3.3 Transactions and TCL",
    brief: "Choose the correct answer for each question about transactions.",
    qs: [
      { q: "Which command makes the changes in a transaction permanent?", o: ["ROLLBACK", "COMMIT", "BEGIN TRANSACTION", "SAVE TABLE"], a: 1 },
      { q: "A transfer debits one account, then the server crashes before the credit. Which property ensures the debit is undone?", o: ["Durability", "Isolation", "Atomicity", "Consistency"], a: 2 },
      { q: "Two users book the last seat at the same moment, but only one succeeds. Which property is shown?", o: ["Isolation", "Atomicity", "Durability", "Normalisation"], a: 0 },
      { q: "Which statement about ROLLBACK is true?", o: ["It deletes the table", "It undoes all changes made since BEGIN TRANSACTION", "It only undoes the last statement after COMMIT", "It saves a backup copy"], a: 1 },
    ],
  }),
];

// ---------------------------------------------------------------------------
// A4 Machine learning
// ---------------------------------------------------------------------------
const A4: IGCSETask[] = [
  mcq({
    unit: "A4", spec: "A4.1.1", cmd: "Identify", diff: "Easy", title: "A4.1 Types of machine learning",
    brief: "Choose the correct answer for each question about types of machine learning.",
    qs: [
      { q: "A model is trained on emails already labelled 'spam' or 'not spam'. This is:", o: ["unsupervised learning", "supervised learning", "reinforcement learning", "transfer learning"], a: 1 },
      { q: "A model groups shoppers by behaviour without being given any labels. This is:", o: ["supervised learning", "reinforcement learning", "unsupervised learning", "deep learning only"], a: 2 },
      { q: "A robot learns to walk by receiving a reward when it moves forward without falling. This is:", o: ["reinforcement learning", "unsupervised learning", "supervised learning", "transfer learning"], a: 0 },
      { q: "A model trained on millions of general photos is adapted to recognise skin conditions using a small medical data set. This is:", o: ["reinforcement learning", "unsupervised learning", "clustering", "transfer learning"], a: 3 },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.1.1", cmd: "Compare", diff: "Moderate", title: "A4.1 Supervised and unsupervised learning",
    brief: "Compare supervised learning and unsupervised learning. [4]",
    marks: 4,
    kw: ["labelled", "unlabelled", "predict", "patterns", "clusters"],
    pts: [
      "Similarity: both learn patterns from a training data set / both build a model that can be applied to new data",
      "Supervised learning uses labelled data (inputs paired with the correct output)",
      "Unsupervised learning uses unlabelled data and finds structure/patterns itself",
      "Supervised learning predicts a known target (classification/regression), e.g. diagnosing disease from labelled scans",
      "Unsupervised learning discovers groups/associations, e.g. customer segmentation or market basket analysis",
      "Supervised learning can be evaluated directly against the true labels; unsupervised results are harder to evaluate",
    ],
    note: "A comparison needs at least one similarity and one difference for full marks.",
  }),
  table({
    unit: "A4", spec: "A4.1.1", cmd: "Identify", diff: "Easy", title: "A4.1 Matching applications to approaches",
    brief: "Identify the machine learning approach most closely associated with each real-world application.",
    cols: [txt("Application"), sel("Approach", ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Transfer learning"])],
    rows: [
      ["=Market basket analysis of supermarket receipts", "Unsupervised learning"],
      ["=Sentiment analysis trained on reviews labelled positive or negative", "Supervised learning"],
      ["=A warehouse robot learning a route by trial and error", "Reinforcement learning"],
      ["=Reusing a pre-trained language model to answer questions about law", "Transfer learning"],
      ["=Detecting tumours in scans using images labelled by radiologists", "Supervised learning"],
    ],
  }),
  structured({
    unit: "A4", spec: "A4.1.1", cmd: "Describe", diff: "Moderate", title: "A4.1 Transfer learning in medical imaging",
    stem: "A hospital wants a model to detect fractures in X-ray images but has only 2000 labelled X-rays.",
    parts: [
      { q: "Identify the type of machine learning used when the model learns from X-rays labelled 'fracture' or 'no fracture'.", marks: 1, pts: ["Supervised learning"] },
      {
        q: "Describe how transfer learning could be used.", marks: 3,
        kw: ["pre-trained", "fine-tune", "features", "small data set"],
        pts: [
          "Start with a model (e.g. a deep neural network) already trained on a very large general image data set",
          "Its early layers have already learned general features such as edges, shapes and textures, which are reused",
          "The later layers are retrained/fine-tuned on the 2000 labelled X-rays",
          "This needs far less data, time and computing power than training from scratch",
        ],
      },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.1.1", cmd: "Describe", diff: "Easy", title: "A4.1 Deep learning",
    brief: "Describe deep learning, with reference to one real-world application. [3]",
    marks: 3,
    kw: ["neural network", "many layers", "features", "large data"],
    pts: [
      "Deep learning uses artificial neural networks with many (hidden) layers",
      "Each layer learns increasingly abstract features automatically from raw data",
      "It needs very large data sets and substantial processing power (e.g. GPUs) to train",
      "Valid application, e.g. object detection in self-driving cars / speech recognition / natural language processing",
    ],
  }),
  theory({
    unit: "A4", spec: "A4.1.1", cmd: "Outline", diff: "Easy", title: "A4.1 Sentiment analysis",
    brief: "Outline how machine learning can be used for sentiment analysis by a company that sells headphones. [2]",
    marks: 2,
    kw: ["reviews", "positive", "negative", "natural language processing"],
    pts: [
      "A natural language processing model classifies text such as reviews/social media posts as positive, negative or neutral",
      "The company can track opinion about its headphones at scale / identify common complaints",
    ],
  }),
  table({
    unit: "A4", spec: "A4.1.2", cmd: "Identify", diff: "Easy", title: "A4.1 Hardware for machine learning",
    brief: "Identify the most suitable hardware configuration for each machine learning scenario.",
    cols: [txt("Scenario"), sel("Hardware", ["Standard laptop", "GPU workstation", "TPU / cloud-based platform", "Edge device", "FPGA", "ASIC", "HPC centre"])],
    rows: [
      ["=A student trains a small decision tree on a 500-row spreadsheet", "Standard laptop"],
      ["=A smart doorbell recognises faces without sending video to the internet", "Edge device"],
      ["=A start-up rents large-scale tensor hardware to train a language model for a few weeks", "TPU / cloud-based platform"],
      ["=A national weather service runs climate models on thousands of linked processors", "HPC centre"],
      ["=A manufacturer needs reprogrammable low-latency hardware for a prototype vision system", "FPGA"],
      ["=A phone maker builds millions of chips designed only to run its neural networks", "ASIC"],
    ],
  }),
  theory({
    unit: "A4", spec: "A4.1.2", cmd: "Explain", diff: "Moderate", title: "A4.1 GPUs for training",
    brief: "Explain why graphics processing units (GPUs) are often used instead of CPUs to train deep learning models. [3]",
    marks: 3,
    kw: ["parallel", "cores", "matrix", "throughput"],
    pts: [
      "Training involves huge numbers of similar calculations (matrix/vector multiplications)",
      "A GPU has thousands of simpler cores that perform these calculations in parallel",
      "A CPU has fewer, more complex cores optimised for sequential/general tasks",
      "So GPUs give much higher throughput and train models in a fraction of the time",
    ],
  }),
  structured({
    unit: "A4", spec: "A4.1.2", cmd: "Explain", diff: "Moderate", title: "A4.1 Machine learning on a smart doorbell",
    stem: "A company sells a smart doorbell that uses a trained neural network to recognise family members' faces. The model is trained by the company, then installed on the doorbell.",
    parts: [
      {
        q: "Define the term edge device.", marks: 1,
        pts: ["A device at the edge of the network, close to where data is collected, that processes data locally rather than sending it to a central server/cloud"],
      },
      {
        q: "Explain two reasons for running face recognition on the doorbell itself rather than in the cloud.", marks: 4,
        pts: [
          "Lower latency: recognition happens instantly without a round trip to a server",
          "...so the door can respond in real time",
          "Privacy: video of visitors does not leave the house",
          "...reducing the risk of interception/data breaches",
          "Works without an internet connection / reduces bandwidth use and cloud costs",
        ],
      },
      {
        q: "Outline why the model is trained by the company rather than on the doorbell.", marks: 2,
        pts: [
          "Training needs large data sets and very high processing power/memory (e.g. GPUs, cloud)",
          "The doorbell has limited processing power, storage and battery, so it is only suitable for inference",
        ],
      },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.1.2", cmd: "Compare", diff: "Hard", title: "A4.1 FPGA and ASIC",
    brief: "Compare field-programmable gate arrays (FPGAs) and application-specific integrated circuits (ASICs) as hardware for machine learning. [4]",
    marks: 4,
    kw: ["reprogrammable", "custom", "efficiency", "cost", "volume"],
    pts: [
      "Similarity: both are specialised hardware that can run ML workloads faster/more efficiently than a general CPU",
      "An FPGA can be reprogrammed after manufacture, so it adapts to new models/algorithms",
      "An ASIC is fixed at manufacture for one task and cannot be changed",
      "ASICs give the best speed and energy efficiency for that task (e.g. TPUs)",
      "ASICs have very high design costs, so are only worthwhile in large volumes; FPGAs suit prototypes/small volumes",
    ],
    note: "At least one similarity and one difference are needed for full marks.",
  }),
  theory({
    unit: "A4", spec: "A4.2.1", hl: true, cmd: "Describe", diff: "Easy", title: "A4.2 Why clean data?",
    brief: "Describe the significance of data cleaning for the performance of a machine learning model. [3]",
    marks: 3,
    kw: ["garbage in", "accuracy", "errors", "bias", "missing"],
    pts: [
      "A model learns patterns from its training data, so errors in the data are learned too ('garbage in, garbage out')",
      "Duplicates, outliers or incorrect values can bias the model / distort what it learns",
      "Missing or badly formatted data may cause training to fail or rows to be lost",
      "Clean data improves accuracy and the model's ability to generalise to new data",
    ],
  }),
  table({
    unit: "A4", spec: "A4.2.1", hl: true, cmd: "Identify", diff: "Moderate", title: "A4.2 Data cleaning techniques",
    brief: "A gym is preparing member data for a model that predicts cancellations. Identify the most appropriate cleaning technique for each problem.",
    cols: [txt("Problem"), sel("Technique", ["Imputation", "Remove or consolidate duplicates", "Handle outlier", "Transform format", "Filter irrelevant data", "Identify incorrect data"])],
    rows: [
      ["=Some members have no value for Age; the rest of the row is useful", "Imputation"],
      ["=The same member appears twice after two systems were merged", "Remove or consolidate duplicates"],
      ["=Join dates are stored as 03/04/2025 in some rows and 2025-04-03 in others", "Transform format"],
      ["=One member is recorded as visiting 900 times in a month", "Handle outlier"],
      ["=A column records the colour of the member's locker key", "Filter irrelevant data"],
      ["=A member's age is recorded as -4", "Identify incorrect data"],
    ],
    note: "Accept 'Handle outlier' for the -4 age only if the candidate also marks it as an error; the expected answer is 'Identify incorrect data'.",
  }),
  inspect({
    unit: "A4", spec: "A4.2.1", hl: true, cmd: "Calculate", diff: "Easy", title: "A4.2 Normalisation and standardisation",
    brief: "A data set has a feature Temperature.\n\nMin-max normalisation: x' = (x - min) / (max - min)\nStandardisation: z = (x - mean) / standard deviation\n\nThe temperatures range from a minimum of 10 to a maximum of 60. Their mean is 50 and their standard deviation is 10. Give exact decimal answers.",
    qs: [
      { q: "What is the normalised value of 30?", a: ["0.4", ".4", "0.40"] },
      { q: "What is the normalised value of 60?", a: ["1", "1.0"] },
      { q: "What is the standardised value of 65?", a: ["1.5", "1.50"] },
      { q: "What is the standardised value of 35?", a: ["-1.5", "-1.50"] },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.2.1", hl: true, cmd: "Explain", diff: "Moderate", title: "A4.2 Why scale features?",
    brief: "A K-nearest neighbours model uses two features: annual income (in thousands, 15 to 200) and number of children (0 to 6). Explain why the features should be normalised or standardised before training. [3]",
    marks: 3,
    kw: ["scale", "distance", "dominate", "range"],
    pts: [
      "K-NN uses distances between data points",
      "Income has a much larger range, so it would dominate the distance calculation",
      "Number of children would have almost no effect on which neighbours are chosen",
      "Scaling puts both features on a comparable range so each contributes fairly / improves accuracy",
    ],
  }),
  mcq({
    unit: "A4", spec: "A4.2.2", hl: true, cmd: "Identify", diff: "Easy", title: "A4.2 Feature selection strategies",
    brief: "Choose the correct answer for each question about feature selection.",
    qs: [
      { q: "Features are ranked by their correlation with the target before any model is trained. This is a:", o: ["wrapper method", "filter method", "embedded method", "clustering method"], a: 1 },
      { q: "Different subsets of features are tried by repeatedly training a model and keeping the best-performing subset. This is a:", o: ["filter method", "embedded method", "wrapper method", "imputation method"], a: 2 },
      { q: "A decision tree learns which features to split on during training, ignoring weak ones. This is a:", o: ["embedded method", "filter method", "wrapper method", "normalisation method"], a: 0 },
      { q: "What is the main purpose of feature selection?", o: ["To add more features to the data set", "To label unlabelled data", "To fill in missing values", "To keep the most informative attributes and remove the rest"], a: 3 },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.2.2", hl: true, cmd: "Describe", diff: "Hard", title: "A4.2 Wrapper and filter methods",
    brief: "Describe one advantage and one disadvantage of using a wrapper method for feature selection compared with a filter method. [4]",
    marks: 4,
    kw: ["model performance", "interactions", "computationally expensive", "overfitting"],
    pts: [
      "Advantage: a wrapper method evaluates feature subsets using the actual model's performance",
      "...so it can find combinations of features that work well together (interactions), often giving higher accuracy",
      "Disadvantage: it must train the model many times, so it is computationally expensive/slow with many features",
      "...and it risks overfitting to the validation data; filter methods are fast and model-independent",
    ],
  }),
  theory({
    unit: "A4", spec: "A4.2.3", hl: true, cmd: "Describe", diff: "Moderate", title: "A4.2 Curse of dimensionality",
    brief: "Describe two effects of the curse of dimensionality on a machine learning model, and state why dimensionality reduction helps. [5]",
    marks: 5,
    kw: ["sparse", "overfitting", "distance", "computation", "memory", "visualisation"],
    pts: [
      "Data sparsity: as dimensions increase, data points become spread out so far more samples are needed",
      "Overfitting: with many features the model can fit noise in the training data and generalise poorly",
      "Distance metrics become less meaningful: points become almost equally far apart, harming K-NN/clustering",
      "Computational complexity and memory usage increase with every extra feature",
      "High-dimensional data cannot be visualised directly",
      "Dimensionality reduction reduces the number of variables while keeping the relevant information, so models train faster and generalise better",
    ],
    note: "Award up to [2] for each effect described (identify + consequence) and [1] for why dimensionality reduction helps.",
  }),
  structured({
    unit: "A4", spec: "A4.2.1", hl: true, cmd: "Describe", diff: "Hard", title: "A4.2 Preparing patient data",
    stem: "A hospital is building a model to predict whether patients will be readmitted within 30 days. The data set has 12 000 patient records and 350 features. 8% of blood pressure values are missing, some patients appear more than once and some features, such as the ward's paint colour, are unrelated to health.",
    parts: [
      {
        q: "Describe two ways the missing blood pressure values could be handled.", marks: 4,
        pts: [
          "Imputation: replace missing values with the mean/median of the feature",
          "...keeps the records but may reduce variance / introduce slight bias",
          "Deletion: remove records (or the feature) with missing values",
          "...simple but loses data, and may bias the sample if values are not missing at random",
          "Predictive modelling: predict the missing value from other features (e.g. age, weight)",
        ],
      },
      {
        q: "Outline why duplicate patient records should be removed or consolidated.", marks: 2,
        pts: [
          "Duplicates give some patients more weight in training, biasing the model",
          "They may also appear in both training and test sets, giving an over-optimistic evaluation",
        ],
      },
      {
        q: "Explain why the number of features should be reduced before training.", marks: 3,
        pts: [
          "350 features relative to 12 000 records risks overfitting / curse of dimensionality",
          "Irrelevant features (e.g. paint colour) add noise and can produce spurious patterns",
          "Fewer features reduce training time and memory, and make the model easier to interpret",
        ],
      },
    ],
  }),
  inspect({
    unit: "A4", spec: "A4.3.1", hl: true, cmd: "Calculate", diff: "Easy", title: "A4.3 Using a regression equation",
    brief: "A linear regression model predicts a student's test score (y) from hours of revision (x):\n\ny = 2.5x + 40\n\nThe model has r² = 0.81.",
    qs: [
      { q: "What score does the model predict for 12 hours of revision?", a: ["70", "70.0"] },
      { q: "What score does the model predict for a student who does no revision?", a: ["40", "40.0"] },
      { q: "By how much does the predicted score increase for each extra hour of revision?", a: ["2.5"] },
      { q: "What percentage of the variation in scores is explained by the model?", a: ["81", "81%", "0.81"] },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.3.1", hl: true, cmd: "Explain", diff: "Moderate", title: "A4.3 Interpreting linear regression",
    brief: "An estate agent uses linear regression to predict house price from floor area. Explain the meaning of the slope, the intercept and the value of r² in this model. [4]",
    marks: 4,
    kw: ["independent", "dependent", "slope", "intercept", "r squared", "fit"],
    pts: [
      "Floor area is the independent (predictor) variable; price is the dependent (response) variable",
      "The slope is the predicted change in price for each extra unit (e.g. square metre) of floor area",
      "The intercept is the predicted price when floor area is zero (the baseline; may have no real meaning)",
      "r² measures how well the line fits the data: the proportion of variation in price explained by floor area (0 to 1, closer to 1 is a better fit)",
    ],
  }),
  inspect({
    unit: "A4", spec: "A4.3.2", hl: true, cmd: "Calculate", diff: "Hard", title: "A4.3 K-nearest neighbours by hand",
    brief: `A K-NN classifier uses two scaled features. The training points are:\n\n${B}\nPoint | (x, y)   | Class\nA     | (8, 9)   | Red\nB     | (5, 2)   | Blue\nC     | (1, 5)   | Blue\nD     | (11, 13) | Red\nE     | (5, 11)  | Red\n${B}\nA new point N = (5, 5) is to be classified using Euclidean distance.`,
    qs: [
      { q: "What is the distance from N to A?", a: ["5", "5.0"] },
      { q: "What is the distance from N to D?", a: ["10", "10.0"] },
      { q: "Which training point is nearest to N?", a: ["B"] },
      { q: "What class is predicted when k = 3?", a: ["Blue"], why: "B (3), C (4), A (5): two Blue, one Red" },
      { q: "What class is predicted when k = 5?", a: ["Red"], why: "three Red, two Blue" },
    ],
  }),
  structured({
    unit: "A4", spec: "A4.3.2", hl: true, cmd: "Explain", diff: "Moderate", title: "A4.3 Decision tree for diagnosis",
    stem: "A hospital trains a decision tree on labelled patient records to suggest diagnoses.",
    parts: [
      {
        q: "Explain how the decision tree could be used to suggest a diagnosis for a new patient.", marks: 4,
        kw: ["node", "split", "feature", "leaf", "labelled"],
        pts: [
          "The tree is built from labelled records (symptoms/test results with a confirmed diagnosis)",
          "Each internal node tests one feature, e.g. 'temperature > 38 C?', chosen because it best separates the classes",
          "The new patient's data follows the branches that match their answers from the root downwards",
          "The leaf reached gives the predicted diagnosis (class)",
          "The path is easy to explain to doctors, which supports trust/transparency",
        ],
      },
      { q: "State one reason why the decision tree may overfit and one way to prevent it.", marks: 2, pts: ["Reason: the tree grows very deep, creating branches for individual/noisy records", "Prevention: limit the maximum depth / minimum samples per leaf / prune the tree (hyperparameter tuning)"] },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.3.2", hl: true, cmd: "Describe", diff: "Moderate", title: "A4.3 K-NN recommendations",
    brief: "Describe how K-NN can be used in a collaborative filtering system that recommends films. [3]",
    marks: 3,
    kw: ["similar users", "ratings", "neighbours", "recommend"],
    pts: [
      "Each user is represented by their ratings of films (a feature vector)",
      "The k users most similar to the target user (smallest distance) are found",
      "Films that these neighbours rated highly but the target user has not watched are recommended",
    ],
  }),
  inspect({
    unit: "A4", spec: "A4.3.3", hl: true, cmd: "Calculate", diff: "Hard", title: "A4.3 Evaluation metrics",
    brief: `A model screens 100 X-rays for a disease. Its results are:\n\n${B}\n                   Predicted positive | Predicted negative\nActually positive         40          |         20\nActually negative         10          |         30\n${B}\nGive each answer as a decimal rounded to 2 decimal places.`,
    qs: [
      { q: "Accuracy", a: ["0.70", "0.7", "70%"] },
      { q: "Precision", a: ["0.80", "0.8", "80%"] },
      { q: "Recall", a: ["0.67", "0.667", "67%"] },
      { q: "F1 score", a: ["0.73", "0.727", "73%"] },
    ],
    note: "Accuracy = (40+30)/100; precision = 40/(40+10); recall = 40/(40+20); F1 = 2PR/(P+R).",
  }),
  theory({
    unit: "A4", spec: "A4.3.3", hl: true, cmd: "Explain", diff: "Moderate", title: "A4.3 Overfitting, underfitting and tuning",
    brief: "Explain the difference between overfitting and underfitting, and how hyperparameter tuning can address them. [4]",
    marks: 4,
    kw: ["training data", "generalise", "too simple", "validation", "hyperparameter"],
    pts: [
      "Overfitting: the model learns noise/detail of the training data, scoring well on training data but poorly on unseen data",
      "Underfitting: the model is too simple to capture the pattern, scoring poorly on both training and unseen data",
      "Hyperparameters are settings chosen before training, e.g. k in K-NN, maximum tree depth, learning rate",
      "Tuning tries different values and compares performance on a validation set to choose the best",
      "e.g. limiting tree depth reduces overfitting; increasing model complexity/k=1 vs larger k addresses underfitting/overfitting",
    ],
  }),
  structured({
    unit: "A4", spec: "A4.3.3", hl: true, cmd: "Explain", diff: "Hard", title: "A4.3 Tuning a spam filter",
    stem: "An email provider trains a classifier to move spam into a separate folder. Users rarely check the spam folder.",
    parts: [
      {
        q: "Define the term precision in the context of this classifier.", marks: 2,
        pts: [
          "Of the emails the classifier labelled as spam,",
          "the proportion that really were spam (TP / (TP + FP))",
        ],
      },
      {
        q: "Explain why the provider may prefer high precision to high recall.", marks: 3,
        pts: [
          "A false positive moves a genuine email to spam, where the user may never see it",
          "Missing an important genuine email is more harmful than letting a few spam emails through (a false negative)",
          "High precision minimises false positives, even if recall falls slightly",
        ],
      },
      {
        q: "Explain the role of hyperparameter tuning when developing this classifier.", marks: 3,
        pts: [
          "Hyperparameters (e.g. decision threshold, tree depth, k) are not learned from data and must be chosen",
          "Several values are tried and evaluated on validation data (e.g. cross-validation) using metrics such as precision/F1",
          "The setting that balances precision and recall without overfitting is chosen, then tested on unseen test data",
        ],
      },
    ],
  }),
  structured({
    unit: "A4", spec: "A4.3.4", hl: true, cmd: "Describe", diff: "Moderate", title: "A4.3 Clustering customers",
    stem: "A supermarket wants to segment its customers using their purchasing data.",
    parts: [
      { q: "State why clustering is an example of unsupervised learning.", marks: 1, pts: ["The data has no labels/predefined groups; the algorithm finds the groups itself"] },
      {
        q: "Describe how a clustering algorithm could be used to segment the customers.", marks: 4,
        kw: ["unlabelled", "similarity", "features", "centroid", "segments"],
        pts: [
          "It is unsupervised: customers are not labelled with segments in advance",
          "Each customer is described by features, e.g. spend per visit, visit frequency, product categories bought",
          "The algorithm groups customers whose features are similar (close together), e.g. assigning each to the nearest cluster centre and updating centres repeatedly",
          "The resulting segments (e.g. 'weekly family shoppers', 'occasional premium buyers') are interpreted and used for targeted offers",
        ],
      },
    ],
  }),
  inspect({
    unit: "A4", spec: "A4.3.5", hl: true, cmd: "Calculate", diff: "Hard", title: "A4.3 Support, confidence and lift",
    brief: "A bakery analyses 1000 transactions:\n- 200 transactions contain bread\n- 100 transactions contain butter\n- 80 transactions contain both bread and butter\n\nsupport(X -> Y) = transactions containing X and Y / all transactions\nconfidence(X -> Y) = transactions containing X and Y / transactions containing X\nlift(X -> Y) = confidence(X -> Y) / support(Y)",
    qs: [
      { q: "support(bread -> butter)", a: ["0.08", "8%"] },
      { q: "confidence(bread -> butter)", a: ["0.4", "0.40", "40%"] },
      { q: "lift(bread -> butter)", a: ["4", "4.0"] },
      { q: "confidence(butter -> bread)", a: ["0.8", "0.80", "80%"] },
    ],
  }),
  structured({
    unit: "A4", spec: "A4.3.5", hl: true, cmd: "Describe", diff: "Moderate", title: "A4.3 Association rules in crime analysis",
    stem: "A police force applies association rule mining to incident data and finds the rule {vandalism} -> {theft} with confidence 0.7 and lift 2.5.",
    parts: [
      { q: "Define the term support in association rule mining.", marks: 1, pts: ["The proportion of all records/transactions that contain all the items in the rule"] },
      {
        q: "Describe what this result means and how the police could use it.", marks: 4,
        kw: ["confidence", "lift", "co-occur", "resources", "correlation"],
        pts: [
          "Confidence 0.7: in 70% of areas/records with vandalism, theft also occurs",
          "Lift 2.5: theft is 2.5 times more likely where vandalism occurs than in general, so the link is stronger than chance",
          "The police could send more patrols / crime prevention resources to areas with rising vandalism (predictive policing)",
          "The rule shows association, not causation, so it should be combined with other evidence",
        ],
      },
    ],
  }),
  table({
    unit: "A4", spec: "A4.3.6", hl: true, cmd: "Identify", diff: "Easy", title: "A4.3 Reinforcement learning terms",
    brief: "A program learns to play a maze game. Identify the reinforcement learning term described by each statement.",
    cols: [txt("Statement"), sel("Term", ["Agent", "Environment", "State", "Action", "Reward", "Policy"])],
    rows: [
      ["=The program that decides how to move", "Agent"],
      ["=The current position in the maze", "State"],
      ["=+10 points for reaching the exit, -1 for each move", "Reward"],
      ["=Moving one square left", "Action"],
      ["=The strategy mapping each position to the best move", "Policy"],
      ["=The maze itself, which responds to each move", "Environment"],
    ],
  }),
  structured({
    unit: "A4", spec: "A4.3.6", hl: true, cmd: "Describe", diff: "Moderate", title: "A4.3 Exploration and exploitation",
    stem: "A delivery robot uses reinforcement learning to find quick routes around a warehouse. It receives a reward when it delivers a parcel and a small penalty for each second taken.",
    parts: [
      { q: "Identify a state, an action and a reward for the robot.", marks: 3, pts: ["State: e.g. the robot's current location/whether it is carrying a parcel", "Action: e.g. move forward, turn left, pick up a parcel", "Reward: e.g. positive reward for a delivery / penalty for time taken"] },
      {
        q: "Describe the exploration versus exploitation trade-off in this situation.", marks: 4,
        kw: ["explore", "exploit", "cumulative reward", "trade-off"],
        pts: [
          "Exploitation: the robot uses the route it currently believes gives the highest (cumulative) reward",
          "Exploration: the robot tries new or less-used routes to discover whether they are better",
          "Too much exploitation may leave it stuck on a sub-optimal route, never finding a quicker one",
          "Too much exploration wastes time on poor routes; strategies such as exploring often at first and less later balance the two",
        ],
      },
    ],
  }),
  structured({
    unit: "A4", spec: "A4.3.7", hl: true, cmd: "Describe", diff: "Moderate", title: "A4.3 Genetic algorithm for delivery routes",
    stem: "A courier company uses a genetic algorithm to find a short route that visits 40 drop-off points once each and returns to the depot (a travelling salesperson problem).",
    parts: [
      {
        q: "State what each individual in the population represents.", marks: 1,
        pts: [{ d: "One complete candidate route: an ordering of the 40 drop-off points", acc: ["a route", "an order of drop-off points", "a possible solution"] }],
      },
      {
        q: "Describe a suitable fitness function.", marks: 2,
        pts: [
          "Calculate the total distance (or time) of the route",
          "Shorter routes receive higher fitness (e.g. fitness = 1 / total distance)",
        ],
      },
      {
        q: "Outline the purpose of crossover and mutation.", marks: 2,
        pts: [
          "Crossover combines parts of two fit parent routes to make offspring that may inherit the best features of both",
          "Mutation makes small random changes (e.g. swapping two stops) to keep diversity and avoid getting stuck in a local optimum",
        ],
      },
      {
        q: "Identify two possible termination conditions.", marks: 2,
        pts: [
          "A set number of generations has been reached",
          "Fitness has stopped improving for several generations",
          "A route shorter than a target distance has been found / a time limit is reached",
        ],
      },
    ],
  }),
  inspect({
    unit: "A4", spec: "A4.3.8", hl: true, cmd: "Calculate", diff: "Moderate", title: "A4.3 Perceptron output",
    brief: "A perceptron has three inputs with weights w1 = 0.6, w2 = -0.4, w3 = 0.3 and bias b = -0.5. It uses a step activation function: output 1 if the weighted sum (including bias) is 0 or more, otherwise output 0.",
    qs: [
      { q: "Inputs (1, 0, 1): what is the weighted sum including the bias?", a: ["0.4", ".4"] },
      { q: "Inputs (1, 0, 1): what is the output?", a: ["1"] },
      { q: "Inputs (0, 1, 1): what is the weighted sum including the bias?", a: ["-0.6", "-.6"] },
      { q: "Inputs (0, 1, 1): what is the output?", a: ["0"] },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.3.8", hl: true, cmd: "Outline", diff: "Moderate", title: "A4.3 Multi-layer perceptron",
    brief: "Outline the structure of a multi-layer perceptron (MLP) and why hidden layers allow it to model complex patterns. [4]",
    marks: 4,
    kw: ["input layer", "hidden layer", "output layer", "weights", "non-linear"],
    pts: [
      "An input layer with one node per input feature",
      "One or more hidden layers of neurons, each connected to the next layer by weighted connections (plus biases)",
      "An output layer producing the prediction (e.g. one node per class)",
      "Each neuron applies a (non-linear) activation function to its weighted sum",
      "Stacking hidden layers lets the network combine simple features into complex, non-linear patterns that a single perceptron cannot represent",
    ],
  }),
  mcq({
    unit: "A4", spec: "A4.3.9", hl: true, cmd: "Identify", diff: "Easy", title: "A4.3 CNN layers",
    brief: "Choose the correct answer for each question about convolutional neural networks (CNNs).",
    qs: [
      { q: "Which layer slides small learnable filters (kernels) across the image to detect features?", o: ["Pooling layer", "Fully connected layer", "Convolutional layer", "Output layer"], a: 2 },
      { q: "What is the main purpose of a max pooling layer?", o: ["To reduce the spatial size while keeping the strongest responses", "To add colour channels to the image", "To convert the image to text", "To label the training data"], a: 0 },
      { q: "Increasing the stride of a convolution from 1 to 2 will:", o: ["double the size of the output feature map", "approximately halve the width and height of the output", "have no effect on the output size", "increase the number of filters"], a: 1 },
      { q: "Which layer typically combines all extracted features to produce class scores?", o: ["Input layer", "Convolutional layer", "Pooling layer", "Fully connected layer"], a: 3 },
    ],
  }),
  inspect({
    unit: "A4", spec: "A4.3.9", hl: true, cmd: "Calculate", diff: "Hard", title: "A4.3 Convolution and pooling sizes",
    brief: `For a convolution with no padding: output width = (input width - kernel width) / stride + 1.\n\nA 2 x 2 max pooling layer with stride 2 is applied to this 4 x 4 feature map:\n\n${B}\n1 3 2 0\n4 6 1 2\n0 2 5 7\n1 1 3 4\n${B}`,
    qs: [
      { q: "A 32 x 32 image passes through a 3 x 3 kernel with stride 1. What is the output width?", a: ["30"] },
      { q: "A 28 x 28 image passes through a 5 x 5 kernel with stride 1. What is the output width?", a: ["24"] },
      { q: "What is the top-left value after max pooling the 4 x 4 feature map?", a: ["6"] },
      { q: "What is the bottom-right value after max pooling the 4 x 4 feature map?", a: ["7"] },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.3.9", hl: true, cmd: "Describe", diff: "Moderate", title: "A4.3 Spatial hierarchies in CNNs",
    brief: "Describe how a CNN learns a hierarchy of features when classifying photos of animals. [4]",
    marks: 4,
    kw: ["edges", "textures", "parts", "objects", "kernels", "pooling"],
    pts: [
      "Early convolutional layers learn simple local features such as edges and colour changes",
      "Deeper layers combine these into more complex features such as textures and shapes (fur, eyes, ears)",
      "The deepest layers respond to whole parts/objects (e.g. a cat's face)",
      "Pooling reduces spatial size so later layers see larger regions of the image (and adds tolerance to position)",
      "Kernel weights are learned during training by minimising a loss function, not hand-designed",
    ],
  }),
  theory({
    unit: "A4", spec: "A4.3.10", hl: true, cmd: "Evaluate", diff: "Hard", title: "A4.3 Choosing a model for diagnosis",
    brief: "A clinic wants a model to predict whether patients have type 2 diabetes from 12 numerical test results. It has 3000 labelled records. Doctors must be able to understand why a prediction was made.\n\nEvaluate the use of a decision tree compared with a K-nearest neighbours (K-NN) model for this problem. [6]",
    marks: 6,
    kw: ["interpretability", "scaling", "overfitting", "prediction time", "accuracy"],
    bands: {
      indicative: [
        "Decision tree: transparent rules that doctors can follow, meeting the explainability requirement",
        "Decision tree: fast predictions; no need to scale features",
        "Decision tree: can overfit unless depth is limited/pruned; small data changes can alter the tree",
        "K-NN: no training phase; simple; can capture complex boundaries",
        "K-NN: needs feature scaling; slower predictions as it compares with all 3000 records; distance less meaningful with many features",
        "K-NN: harder to explain beyond 'similar patients had diabetes'",
        "Both should be compared on validation data using recall/precision (missing a diabetic patient is costly)",
        "Conclusion: decision tree is likely preferred because explainability is required, provided its accuracy is comparable",
      ],
    },
  }),
  theory({
    unit: "A4", spec: "A4.3.10", hl: true, cmd: "Explain", diff: "Moderate", title: "A4.3 Why compare models?",
    brief: "Explain why data scientists usually train and compare several different machine learning models before choosing one. [4]",
    marks: 4,
    kw: ["no single best", "data characteristics", "complexity", "metrics", "validation"],
    pts: [
      "No single algorithm performs best on every problem; results depend on the data and type of problem",
      "Data characteristics (size, number of features, noise, linear or non-linear relationships) favour different models",
      "Requirements differ, e.g. interpretability, prediction speed, hardware limits, training cost",
      "Comparing models on the same validation data with suitable metrics (accuracy, F1, r²) gives evidence for the choice",
    ],
  }),
  theory({
    unit: "A4", spec: "A4.4.1", cmd: "Outline", diff: "Moderate", title: "A4.4 Bias in training data",
    brief: "Outline two ways in which bias can enter the training data of a machine learning model, and one consequence. [3]",
    marks: 3,
    kw: ["unrepresentative", "historical", "labelling", "unfair"],
    pts: [
      "Sampling bias: the data does not represent the population (e.g. a face data set with few darker-skinned faces)",
      "Historical bias: the data reflects past discrimination (e.g. past hiring decisions favoured one group)",
      "Labelling bias: human labellers' prejudices or inconsistent labels are learned",
      "Consequence: the model makes less accurate or unfair decisions for under-represented groups / reinforces discrimination",
    ],
  }),
  structured({
    unit: "A4", spec: "A4.4.1", cmd: "Discuss", diff: "Hard", title: "A4.4 Machine learning in recruitment",
    stem: "A large company plans to use a machine learning model to shortlist job applicants from their CVs. The model will be trained on the CVs of people the company hired over the last ten years.",
    parts: [
      { q: "Outline how bias could enter the model through this training data.", marks: 2, pts: ["Past hiring decisions may have favoured certain groups (historical bias)", "the model learns these patterns as if they predict success, including via proxy features such as school or postcode"] },
      {
        q: "Discuss the ethical implications of this plan.", marks: 6,
        kw: ["bias", "fairness", "accountability", "transparency", "consent", "privacy"],
        bands: {
          indicative: [
            "Historical bias: if past hiring favoured certain groups, the model learns and repeats this (algorithmic unfairness)",
            "Proxy features (e.g. postcode, school, gaps in employment) can discriminate even without protected attributes",
            "Transparency: applicants may not know an algorithm is used or why they were rejected",
            "Accountability: unclear who is responsible for a wrong or unfair rejection",
            "Consent and privacy: were past employees' CVs collected for this purpose?",
            "Benefits: consistent, fast processing of large numbers of applications; may reduce some individual human bias if audited",
            "Mitigations: bias audits, balanced data, human review of decisions, explanation of decisions",
            "Conclusion: acceptable only with safeguards and human oversight",
          ],
        },
      },
    ],
  }),
  structured({
    unit: "A4", spec: "A4.4.1", cmd: "Explain", diff: "Moderate", title: "A4.4 Facial recognition and privacy",
    stem: "A city council installs cameras that use machine learning to identify people in public spaces.",
    parts: [
      { q: "Identify the type of machine learning used to train the recogniser on photos labelled with people's identities.", marks: 1, pts: ["Supervised learning (deep learning / CNN accepted)"] },
      { q: "Outline one hardware consideration if recognition runs on the cameras themselves.", marks: 2, pts: ["The cameras act as edge devices with limited processing power/memory", "so a compact model or specialised chip (ASIC/FPGA/low-power GPU) is needed for real-time inference"] },
      {
        q: "Explain two ethical concerns raised by this system.", marks: 4,
        kw: ["privacy", "consent", "bias", "security", "surveillance"],
        pts: [
          "Privacy: people are tracked and identified without their knowledge",
          "...movements can be stored and combined, creating detailed profiles / mass surveillance",
          "Consent: people cannot opt out of being scanned in a public space",
          "Bias: recognition may be less accurate for some demographic groups",
          "...leading to wrongful identification/stops of innocent people",
          "Security: stored biometric data could be stolen or misused",
        ],
        note: "Award [1] for each concern and [1] for an explanation linked to the scenario, for two concerns.",
      },
    ],
  }),
  theory({
    unit: "A4", spec: "A4.4.1", cmd: "Discuss", diff: "Hard", title: "A4.4 ML in online communication",
    brief: "A social media platform uses machine learning both to recommend posts and to remove harassment automatically.\n\nDiscuss the ethical implications of using machine learning in this way. [6]",
    marks: 6,
    kw: ["misinformation", "filter bubble", "harassment", "free expression", "anonymity", "bias"],
    bands: {
      indicative: [
        "Recommendation systems optimise engagement, which can spread misinformation and sensational content",
        "Filter bubbles/echo chambers can polarise users",
        "Automatic moderation removes harassment at a scale humans cannot manage, protecting users",
        "False positives can censor legitimate speech; bias in training data can over-flag some dialects/groups",
        "Anonymity enables harassment but also protects vulnerable users",
        "Transparency and accountability: users rarely know why content was shown or removed; appeals process needed",
        "Privacy: recommendations rely on extensive data collection about behaviour",
        "Conclusion: benefits depend on human oversight, transparency and regular auditing",
      ],
    },
  }),
  theory({
    unit: "A4", spec: "A4.4.2", cmd: "Discuss", diff: "Hard", title: "A4.4 Emerging technologies in daily life",
    brief: "Discuss the ethical implications of the increasing use of augmented reality (AR) glasses that recognise objects and people in everyday life. [6]",
    marks: 6,
    kw: ["privacy", "consent", "equity", "individual rights", "guidelines"],
    bands: {
      indicative: [
        "Privacy of bystanders: people may be recorded or identified without consent",
        "Data collection: continuous capture of location, behaviour and surroundings by companies",
        "Benefits: accessibility (e.g. describing surroundings to visually impaired users), navigation, education",
        "Equity: cost may create a digital divide between those who can and cannot afford devices",
        "Safety and wellbeing: distraction, over-reliance, manipulation through overlaid advertising",
        "Laws and ethical guidelines lag behind technology and must be continually reassessed",
        "Conclusion: benefits are real but require strong privacy protections and updated regulation",
      ],
    },
  }),
  theory({
    unit: "A4", spec: "A4.4.2", cmd: "Outline", diff: "Easy", title: "A4.4 Reassessing ethical guidelines",
    brief: "Outline why ethical guidelines for computing need to be reassessed regularly as technology advances. [2]",
    marks: 2,
    kw: ["new risks", "unforeseen", "laws lag"],
    pts: [
      "New technologies (e.g. quantum computing, generative AI) create situations and risks the existing guidelines did not anticipate",
      "Guidelines must be updated so that individual rights, privacy and equity remain protected / regulation keeps pace",
    ],
  }),
  mcq({
    unit: "A4", spec: "A4.4.1", cmd: "Identify", diff: "Easy", title: "A4.4 Ethical issues in ML",
    brief: "Identify the ethical issue each situation mainly illustrates.",
    qs: [
      { q: "A bank cannot explain to a customer why its model refused their loan.", o: ["Environmental impact", "Lack of transparency", "Data duplication", "Underfitting"], a: 1 },
      { q: "Training one very large model uses as much electricity as hundreds of homes in a year.", o: ["Environmental impact", "Consent", "Algorithmic fairness", "Anonymity"], a: 0 },
      { q: "Photos uploaded to a hobby website are used to train a commercial model without asking users.", o: ["Overfitting", "Accountability", "Consent", "Concurrency"], a: 2 },
      { q: "A self-driving car crashes and the manufacturer, programmer and owner each say they are not responsible.", o: ["Bias", "Data sparsity", "Transparency", "Accountability"], a: 3 },
    ],
  }),
];

// ---------------------------------------------------------------------------
// CS Case study 2027: Generative AI for image creation (Paper 1 Section B)
// ---------------------------------------------------------------------------
const STUDIO = "Visionary Studios, a creative company, wants to use generative AI to produce images for advertising campaigns.";

const CS: IGCSETask[] = [
  theory({
    unit: "CS", spec: "CS", cmd: "Define", diff: "Easy", title: "CS Noise injection",
    brief: "Define the term noise injection in the context of a diffusion model. [2]",
    marks: 2,
    kw: ["random", "Gaussian", "noise", "forward process"],
    pts: [
      "Adding random (usually Gaussian) noise to an image's pixel/latent values",
      "...gradually over many timesteps in the forward process, until the image becomes pure noise",
    ],
  }),
  theory({
    unit: "CS", spec: "CS", cmd: "Outline", diff: "Easy", title: "CS Conditional and unconditional generation",
    brief: "Outline one difference between conditional and unconditional image generation. [2]",
    marks: 2,
    kw: ["guiding input", "prompt", "label", "no input", "distribution"],
    pts: [
      "Conditional generation is guided by an input such as a text prompt, class label, sketch or segmentation map",
      "Unconditional generation has no guiding input; it samples any image from the distribution it learned, so the user cannot control the content",
    ],
  }),
  mcq({
    unit: "CS", spec: "CS", cmd: "Identify", diff: "Easy", title: "CS Key terms in image generation",
    brief: `${STUDIO}\n\nChoose the correct answer for each question.`,
    qs: [
      { q: "In text-to-image generation, the prompt is first converted into:", o: ["a segmentation map", "an embedding vector", "a noise schedule", "a greyscale image"], a: 1 },
      { q: "Which input tells the model WHERE each kind of object should appear, pixel by pixel?", o: ["A segmentation map", "A text prompt", "A random seed", "A class label"], a: 0 },
      { q: "In a diffusion model, the reverse process:", o: ["adds noise to a training image", "compresses the image into a JPEG", "iteratively removes predicted noise to form an image", "labels each pixel with a class"], a: 2 },
      { q: "Turning a rough pencil sketch into a photorealistic image is an example of:", o: ["unconditional generation", "noise injection", "dataset curation", "image-to-image translation"], a: 3 },
      { q: "Which statement about training stability is most accurate?", o: ["Diffusion models generally train more stably than GANs but generate more slowly", "GANs train more stably and generate more slowly", "Both train equally stably and equally fast", "Diffusion models cannot be trained on GPUs"], a: 0 },
    ],
  }),
  table({
    unit: "CS", spec: "CS", cmd: "Identify", diff: "Easy", title: "CS Image generation techniques",
    brief: `${STUDIO}\n\nIdentify the image generation technique used in each request.`,
    cols: [txt("Request"), sel("Technique", ["Text-to-image", "Image-to-image translation", "Conditional generation from a segmentation map", "Unconditional generation"])],
    rows: [
      ["=\"A red bicycle leaning on a sunny café wall, watercolour style\"", "Text-to-image"],
      ["=Colourise an old black-and-white photo of the client's first shop", "Image-to-image translation"],
      ["=A layout marking sky in the top third, sea in the middle and beach at the bottom", "Conditional generation from a segmentation map"],
      ["=Generate random sample faces from a model, with no input, to inspect its quality", "Unconditional generation"],
    ],
  }),
  theory({
    unit: "CS", spec: "CS", cmd: "Describe", diff: "Moderate", title: "CS Forward and reverse diffusion",
    brief: "Describe the forward and reverse processes in a denoising diffusion probabilistic model (DDPM). [4]",
    marks: 4,
    kw: ["forward", "timesteps", "Gaussian noise", "reverse", "learned", "denoise"],
    pts: [
      "Forward process: small amounts of Gaussian noise are added to a training image over T timesteps",
      "...until the image is indistinguishable from pure noise (this process is fixed, not learned)",
      "Reverse process: a neural network is trained to predict the noise present at each timestep",
      "To generate, the model starts from pure random noise and repeatedly removes the predicted noise, step by step, until an image emerges",
    ],
  }),
  theory({
    unit: "CS", spec: "CS", cmd: "Describe", diff: "Moderate", title: "CS Role of the CNN denoiser",
    brief: "Describe the role of the convolutional neural network (CNN) in a diffusion model. [3]",
    marks: 3,
    kw: ["U-Net", "predict noise", "features", "each step"],
    pts: [
      "The CNN (usually a U-Net) is the denoiser: at each timestep it takes the noisy image (and timestep/prompt) as input",
      "It predicts the noise contained in the image, which is subtracted to give a slightly cleaner image",
      "Its learnable filters detect spatial features at several scales (edges -> textures -> objects), so the structure of the image is preserved/built up",
    ],
  }),
  theory({
    unit: "CS", spec: "CS", cmd: "Identify", diff: "Easy", title: "CS Measuring computational efficiency",
    brief: "Identify two factors to consider when assessing the computational efficiency of an image generation model. [2]",
    marks: 2,
    kw: ["inference time", "timesteps", "memory", "GPU", "energy"],
    pts: [
      "Time to generate one image (inference time/latency)",
      "Number of denoising steps (timesteps) required",
      "Memory (VRAM) required / size of the model",
      "Hardware needed, e.g. GPU/TPU, and its cost",
      "Energy consumption per image / training time and cost",
      "Image resolution, or whether the model works in pixel space or latent space",
    ],
  }),
  theory({
    unit: "CS", spec: "CS", cmd: "Explain", diff: "Moderate", title: "CS Why diffusion is computationally demanding",
    brief: "Explain why a diffusion model needs significant computational resources to generate a single image. [4]",
    marks: 4,
    kw: ["iterative", "timesteps", "network", "every step", "resolution", "GPU"],
    pts: [
      "Generation is iterative: the image is denoised over many timesteps (e.g. tens to hundreds)",
      "At every step the whole (large) neural network must be run once",
      "Each pass processes every pixel/latent value, so cost grows with image size (cost is roughly timesteps x image size)",
      "This needs large numbers of parallel calculations and memory, so GPUs/TPUs are required for acceptable speed",
    ],
  }),
  inspect({
    unit: "CS", spec: "CS", cmd: "Calculate", diff: "Moderate", title: "CS Latent space savings",
    brief: "A 512 x 512 RGB image has 3 values per pixel. A latent diffusion model instead works on a 64 x 64 latent with 4 channels. Assume the cost of one denoising step is proportional to the number of values processed.",
    qs: [
      { q: "How many values are in the 512 x 512 RGB image?", a: ["786432", "786 432", "786,432"] },
      { q: "How many values are in the 64 x 64 x 4 latent?", a: ["16384", "16 384", "16,384"] },
      { q: "How many times fewer values does the latent contain?", a: ["48", "48 times"] },
      { q: "If the number of denoising steps is reduced from 1000 to 50, how many times fewer steps are run?", a: ["20", "20 times"] },
    ],
  }),
  structured({
    unit: "CS", spec: "CS", cmd: "Explain", diff: "Hard", title: "CS Challenge 1: managing denoising costs",
    stem: `${STUDIO} The studio needs hundreds of campaign images each week. Its current diffusion model takes about 40 seconds per image on a single GPU, which is too slow.`,
    parts: [
      {
        q: "Outline the effect of reducing the number of denoising timesteps.", marks: 2,
        pts: [
          "Fewer steps means fewer network passes, so each image is generated faster/with less computation",
          "...but quality may fall (less detail, more artefacts/residual noise): a quality versus speed trade-off",
        ],
      },
      {
        q: "Explain how performing diffusion in latent space reduces the computational demands.", marks: 3,
        pts: [
          "An encoder (e.g. a VAE) compresses the image into a much smaller latent representation (e.g. 64 x 64 instead of 512 x 512)",
          "Every denoising step operates on far fewer values, reducing calculations and memory per step",
          "A decoder converts the final latent back to a full-resolution image once, at the end",
        ],
      },
      {
        q: "Describe the hardware the studio would need for inference compared with fine-tuning the model on its own brand images.", marks: 3,
        pts: [
          "Inference can run on one or a few GPUs with enough memory (VRAM) for the model, possibly a workstation",
          "Fine-tuning needs more memory and compute because gradients must be calculated and weights updated, e.g. high-memory GPUs or rented cloud GPUs/TPUs",
          "Training from scratch would need very large GPU/TPU clusters (HPC/cloud), which the studio is unlikely to afford; cloud renting allows scaling up only when needed",
        ],
      },
    ],
  }),
  structured({
    unit: "CS", spec: "CS", cmd: "Explain", diff: "Moderate", title: "CS Character consistency",
    stem: "Visionary Studios, a creative company, wants to use generative AI to produce images for advertising campaigns. A client wants the same cartoon mascot to appear in 30 different advertisements.",
    parts: [
      { q: "Define the term embedding in the context of image generation.", marks: 2, pts: ["A vector of numbers representing a concept/image in a learned space", "in which similar concepts are positioned close together"] },
      {
        q: "Explain why character consistency is difficult for a diffusion model and how an embedding-based approach can help.", marks: 4,
        kw: ["independent noise", "random", "embedding", "vector", "reference"],
        pts: [
          "Each image is generated from new, independent random noise, so details of the character vary between images",
          "A text prompt alone cannot describe every detail (face shape, colours, proportions) precisely",
          "An embedding-based approach learns a vector representing the mascot from reference images",
          "This embedding is fed into every generation as conditioning, steering the model to reproduce the same character across images",
        ],
      },
    ],
  }),
  theory({
    unit: "CS", spec: "CS", cmd: "Describe", diff: "Easy", title: "CS Using segmentation maps",
    brief: `${STUDIO} An art director wants precise control over where a product, a person and the background appear in a billboard image.\n\nDescribe how a segmentation map could be used to achieve this. [3]`,
    marks: 3,
    kw: ["pixel", "class", "region", "layout", "conditioning"],
    pts: [
      "The art director draws a map in which each pixel/region is labelled with a class (product, person, background)",
      "The map is given to the model as a conditioning input alongside the prompt",
      "The model generates content matching each labelled region, so objects appear exactly where specified",
    ],
  }),
  structured({
    unit: "CS", spec: "CS", cmd: "Explain", diff: "Moderate", title: "CS Dataset curation",
    stem: "Visionary Studios, a creative company, wants to use generative AI to produce images for advertising campaigns. It plans to fine-tune a model on a large set of images.",
    parts: [
      { q: "Define the term dataset curation.", marks: 2, pts: ["Deliberately selecting and filtering the data used for training", "including licence-checking, cleaning and removing unwanted/low-quality items"] },
      {
        q: "Explain two reasons why careful dataset curation is important.", marks: 4,
        kw: ["licence", "copyright", "quality", "bias", "filtering"],
        pts: [
          "Legal: checking licences/consent avoids training on copyrighted images without permission",
          "...reducing the risk of legal action or outputs that copy protected work/watermarks",
          "Bias: a balanced, representative data set reduces stereotyped or unrepresentative outputs",
          "...so generated people reflect diverse audiences in advertising",
          "Quality: removing low-quality, duplicate or irrelevant images improves the quality of outputs",
          "...and reduces memorisation of duplicated images",
        ],
        note: "Award [1] for each reason and [1] for the explanation, for two reasons.",
      },
    ],
  }),
  structured({
    unit: "CS", spec: "CS", cmd: "Explain", diff: "Hard", title: "CS Challenge 2: bias in training data",
    stem: `${STUDIO} When asked for "a photo of a company director", the studio's model almost always produces images of middle-aged men.`,
    parts: [
      {
        q: "Define the term bias mitigation.", marks: 2,
        pts: [
          "Actions taken to reduce unfair or unrepresentative patterns that a model learns from its data",
          "...e.g. rebalancing data, reweighting, filtering, guardrails or auditing outputs",
        ],
      },
      {
        q: "Explain why the model produces this output.", marks: 2,
        pts: [
          "The training images are unbalanced: most images labelled 'director' show middle-aged men",
          "The model learns and reproduces (or amplifies) the statistical patterns in its training data",
        ],
      },
      {
        q: "Outline two bias mitigation strategies the studio could use and explain why bias can be reduced but not eliminated.", marks: 5,
        pts: [
          "Rebalance or augment the data set with more images of directors of different genders, ages and ethnicities",
          "Reweight under-represented examples during fine-tuning",
          "Use prompt-level guardrails/diversity settings that vary generated attributes",
          "Audit outputs regularly with human reviewers and adjust",
          "Bias cannot be fully eliminated: the data reflects real-world inequalities, 'fairness' is subjective, and new biases may appear in unseen prompts",
        ],
      },
    ],
  }),
  theory({
    unit: "CS", spec: "CS", cmd: "Discuss", diff: "Hard", title: "CS Licensed-only or opt-out datasets",
    brief: `${STUDIO} It must choose between training on a smaller data set of fully licensed images or a much larger data set scraped from the web where artists can request removal (opt-out).\n\nDiscuss which approach the studio should take. [6]`,
    marks: 6,
    kw: ["licence", "consent", "opt-out", "copyright", "quality", "diversity", "reputation"],
    bands: {
      indicative: [
        "Licensed-only: clear consent and permission; lower legal risk; protects reputation with clients",
        "Licensed-only: smaller, more expensive data set; may reduce diversity/quality of outputs",
        "Opt-out: much larger and more diverse data improves output quality and range of styles",
        "Opt-out: places the burden on artists, many of whom never learn their work was used; consent is not genuine",
        "Legal position on training with scraped images is unresolved and varies by jurisdiction; some laws require respecting opt-outs and publishing training-data summaries",
        "Advertising clients may demand guarantees that images do not infringe copyright",
        "Conclusion: for a commercial studio, the licensed-only approach (possibly supplemented by a fine-tuned licensed base model) is usually easier to justify",
      ],
    },
  }),
  structured({
    unit: "CS", spec: "CS", cmd: "Explain", diff: "Moderate", title: "CS Transparency and disclosure",
    stem: "Visionary Studios, a creative company, wants to use generative AI to produce images for advertising campaigns. A client asks whether images in its campaign should be labelled as AI-generated.",
    parts: [
      { q: "Identify one way a viewer could check how an image was produced.", marks: 1, pts: ["Content provenance metadata / content credentials attached to the file", "A visible label or invisible watermark identifying AI generation"] },
      {
        q: "Explain two reasons why the studio should disclose its use of generative AI.", marks: 4,
        kw: ["trust", "misleading", "provenance", "content credentials", "regulation"],
        pts: [
          "Trust: audiences may feel deceived if they later learn realistic images were synthetic",
          "...harming the client's and studio's reputation",
          "Avoiding misinformation: realistic AI images could be mistaken for real events or real people",
          "...provenance metadata/content credentials let viewers check how an image was made",
          "Regulation and platform rules increasingly require AI-generated content to be labelled",
        ],
        note: "Award [1] for each reason and [1] for an explanation, for two reasons.",
      },
    ],
  }),
  table({
    unit: "CS", spec: "CS", hl: true, cmd: "Identify", diff: "Moderate", title: "CS Comparing diffusion models and GANs",
    brief: "For each evaluation criterion, identify which type of model usually performs better.",
    cols: [txt("Criterion"), sel("Usually better", ["Diffusion model", "GAN"])],
    rows: [
      ["=Training stability", "Diffusion model"],
      ["=Speed of generating one image (inference)", "GAN"],
      ["=Diversity of outputs (avoiding mode collapse)", "Diffusion model"],
      ["=Controllability from detailed text prompts", "Diffusion model"],
      ["=Number of network passes needed per image", "GAN"],
    ],
  }),
  theory({
    unit: "CS", spec: "CS", hl: true, cmd: "Describe", diff: "Easy", title: "CS The discriminator",
    brief: "Describe the function of the discriminator in a generative adversarial network (GAN). [3]",
    marks: 3,
    kw: ["classifier", "real", "fake", "feedback", "loss"],
    pts: [
      "The discriminator is a classifier that receives both real training images and images made by the generator",
      "It outputs the probability that an image is real rather than generated",
      "Its judgement provides the feedback (a learned loss function) used to update the generator, pushing it towards more realistic images",
    ],
  }),
  structured({
    unit: "CS", spec: "CS", hl: true, cmd: "Explain", diff: "Moderate", title: "CS Mode collapse in advertising",
    stem: "Visionary Studios, a creative company, wants to use generative AI to produce images for advertising campaigns. It is testing a GAN to produce varied lifestyle images for a clothing brand.",
    parts: [
      { q: "Describe the function of the generator in a GAN.", marks: 2, pts: ["It maps a random noise vector to a candidate image", "and is trained to produce images the discriminator classifies as real"] },
      {
        q: "Explain how mode collapse would affect the studio's advertising work.", marks: 4,
        kw: ["narrow", "variety", "fool the discriminator", "repetitive"],
        pts: [
          "Mode collapse: the generator produces only a narrow set of outputs that reliably fool the discriminator",
          "Generated images would look very similar (same pose, model, setting) regardless of the input noise",
          "The campaign would lack the variety of people, styles and scenes the client needs / could under-represent groups",
          "Staff would waste time regenerating/filtering, or need another model, increasing cost",
        ],
      },
    ],
  }),
  theory({
    unit: "CS", spec: "CS", hl: true, cmd: "Outline", diff: "Easy", title: "CS Flow-based models",
    brief: "Outline one advantage of a flow-based model over a GAN for Visionary Studios. [2]",
    marks: 2,
    kw: ["invertible", "exact", "traceable", "reproducible", "stable"],
    pts: [
      "A flow-based model uses an exact, invertible mapping between noise and images",
      "...so an image can be traced back to its exact latent/noise and reproduced or edited reliably (useful for audits/consistency); training is also more stable with no adversarial game",
    ],
  }),
  structured({
    unit: "CS", spec: "CS", hl: true, cmd: "Explain", diff: "Hard", title: "CS Challenge 3: balancing a GAN",
    stem: `${STUDIO} Its engineers are training a GAN that takes a 128-dimensional noise vector. After a few hours, the discriminator correctly identifies almost every generated image and the generator stops improving.`,
    parts: [
      {
        q: "Describe the adversarial dynamic between the generator and the discriminator.", marks: 3,
        pts: [
          "The generator maps a random noise vector to an image and tries to make the discriminator classify it as real",
          "The discriminator tries to distinguish real images from generated ones",
          "They are trained in alternation: each improves in response to the other, a competitive feedback loop that ideally drives the generator towards realistic images",
        ],
      },
      {
        q: "Explain why the generator stops improving when the discriminator becomes too strong.", marks: 3,
        pts: [
          "If the discriminator rejects every fake with near certainty, its output barely changes when the generator changes",
          "The gradients passed back to the generator become very small (vanishing gradients)",
          "So the generator receives almost no useful signal about how to improve and its training stalls",
        ],
      },
      {
        q: "Outline two techniques the engineers could use to keep the two networks balanced.", marks: 4,
        pts: [
          "Use a Wasserstein loss, which gives useful gradients even when the discriminator is confident",
          "Spectral normalisation/limiting the discriminator's capacity or learning rate so it does not overpower the generator",
          "Minibatch discrimination: let the discriminator compare samples in a batch, penalising lack of variety (reduces mode collapse)",
          "Feature matching: train the generator to match statistics of the discriminator's intermediate features rather than just fool it",
          "Train the generator more often than the discriminator / add noise or label smoothing to real labels",
        ],
        note: "Award [1] for each technique and [1] for an outline of how it helps, for two techniques.",
      },
    ],
  }),
  mcq({
    unit: "CS", spec: "CS", hl: true, cmd: "Identify", diff: "Easy", title: "CS GANs, VAEs and flows",
    brief: "Choose the correct answer for each question about generative models.",
    qs: [
      { q: "Which model encodes images into a smooth latent space and decodes them, often producing slightly blurry results?", o: ["Variational autoencoder (VAE)", "GAN", "Flow-based model", "Decision tree"], a: 0 },
      { q: "What is a D-dimensional noise vector in a GAN?", o: ["A list of D labels for the image", "D random numbers used as the generator's input", "The discriminator's D output classes", "D copies of the training image"], a: 1 },
      { q: "Which model provides an exact, invertible mapping between noise and images?", o: ["GAN", "VAE", "Flow-based model", "K-NN"], a: 2 },
      { q: "Stable Diffusion is described as a hybrid model because it combines:", o: ["a GAN and a decision tree", "two discriminators", "a flow-based model and K-means", "a VAE, a text encoder and a U-Net diffusion model"], a: 3 },
    ],
  }),
  theory({
    unit: "CS", spec: "CS", hl: true, cmd: "Describe", diff: "Moderate", title: "CS Latent space",
    brief: "Describe what is meant by a latent space and why it is useful in a hybrid image generation model. [4]",
    marks: 4,
    kw: ["compressed", "representation", "similar close", "interpolation", "efficiency"],
    pts: [
      "A latent space is a compressed, learned representation of the data (fewer dimensions than the pixels)",
      "Similar images are mapped to points that are close together",
      "Moving smoothly between points (interpolation) produces meaningful, gradual changes in the image",
      "Running diffusion in latent space (via a VAE encoder/decoder) is far cheaper than in pixel space, which is the efficiency trick of latent diffusion",
    ],
  }),
  table({
    unit: "CS", spec: "CS", hl: true, cmd: "Identify", diff: "Hard", title: "CS Challenge 4: strengths of each model",
    brief: "Visionary Studios is considering a hybrid model. Identify the model type that is generally strongest for each criterion.",
    cols: [txt("Criterion"), sel("Strongest model", ["GAN", "VAE", "Flow-based model", "Diffusion model"])],
    rows: [
      ["=Fastest single-pass generation of sharp images", "GAN"],
      ["=Exact traceability: each image maps back to exactly one latent", "Flow-based model"],
      ["=Highest image quality and diversity from text prompts", "Diffusion model"],
      ["=Smooth latent space that compresses images efficiently", "VAE"],
      ["=Most stable training with good coverage of the data", "Diffusion model"],
      ["=Least stable training (adversarial)", "GAN"],
    ],
  }),
  theory({
    unit: "CS", spec: "CS", hl: true, cmd: "Evaluate", diff: "Hard", title: "CS Hybrid versus pure diffusion",
    brief: `${STUDIO} It must choose between a pure pixel-space diffusion model and a hybrid model (a VAE to compress images into latent space plus a diffusion model, with a fast GAN-style refinement step).\n\nEvaluate the use of the hybrid model for Visionary Studios. [8]`,
    marks: 8,
    kw: ["latent space", "VAE", "quality", "speed", "stability", "complexity"],
    bands: {
      indicative: [
        "Hybrid: VAE latent space reduces computation per step, giving much faster generation and lower GPU costs for hundreds of weekly images",
        "Hybrid: GAN-style refinement can sharpen detail and reduce the number of diffusion steps needed",
        "Hybrid: keeps diffusion's training stability, diversity and prompt controllability",
        "Hybrid drawbacks: VAE decoding can lose fine detail or add artefacts (e.g. small text, logos); more components to train, tune and maintain",
        "GAN component may reintroduce instability or mode collapse if not carefully managed",
        "Pure diffusion: simpler architecture and potentially highest fidelity, but slow and costly at high resolutions",
        "Criteria such as quality, speed, stability, diversity, controllability and character consistency should be weighed for advertising deadlines",
        "Conclusion: the hybrid is likely better for a commercial studio needing volume and speed, provided output quality is checked for brand-critical detail",
      ],
    },
  }),
  theory({
    unit: "CS", spec: "CS", hl: true, cmd: "Discuss", diff: "Hard", title: "CS Training on scraped images",
    brief: `${STUDIO} An engineer proposes training the studio's own model on millions of images collected automatically from public websites.\n\nDiscuss the ethical and legal issues the studio should consider before doing this. [8]`,
    marks: 8,
    kw: ["copyright", "consent", "intellectual property", "bias", "privacy", "transparency"],
    bands: {
      indicative: [
        "Copyright/intellectual property: images are publicly visible but not free to use; legality of training on scraped data is unresolved and differs between countries",
        "Outputs may reproduce copyrighted styles, characters, logos or watermarks, exposing clients to claims",
        "Consent: artists and photographers did not agree; opt-out mechanisms place the burden on creators",
        "Privacy: scraped images may include identifiable people, children or personal data",
        "Bias: web images over-represent some groups and stereotypes, which the model would learn",
        "Transparency: some regulations require summaries of training data and respect for opt-outs",
        "Benefits: scale and diversity improve quality; reduces cost compared with licensing",
        "Mitigations: dataset curation, licence checking, removing personal data, filtering watermarks, documenting sources",
        "Conclusion: proceed only with a clear dataset policy, or prefer licensed data, given legal and reputational risk",
      ],
    },
  }),
  theory({
    unit: "CS", spec: "CS", hl: true, cmd: "To what extent", diff: "Hard", title: "CS Responsibility for infringing outputs",
    brief: `${STUDIO} A user of a public image generator produces an advert that closely copies a famous illustrator's character.\n\nTo what extent should responsibility for infringing outputs lie with the model provider rather than the user? [8]`,
    marks: 8,
    kw: ["accountability", "provider", "user", "training data", "guardrails", "intent"],
    bands: {
      indicative: [
        "Provider: chose the training data; if copyrighted works were included, the provider enabled the copying",
        "Provider: controls guardrails, filters and output checks and profits from the service",
        "Provider: can publish training-data summaries and respect opt-outs",
        "User: wrote the prompt, chose to publish the image commercially and is best placed to check it",
        "User: may deliberately request a protected character, showing intent",
        "Courts have found that model weights do not simply store copies, which complicates claims against providers; the law remains unsettled",
        "Shared responsibility: provider for reasonable safeguards and transparent data; user for how outputs are used",
        "Conclusion: responsibility should be shared, weighted by who had knowledge and control in the specific case",
      ],
    },
  }),
];

export const IB_TASKS_A34CS: IGCSETask[] = [...A3, ...A4, ...CS];
