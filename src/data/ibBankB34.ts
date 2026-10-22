import type { IGCSETask, MarkPoint, MCQQuestion, InspectQuestion, QuestionPart, TableColumn, TableCell, CodeTestCase } from "../types";

/**
 * IB DP Computer Science (first assessment 2027) - built-in question bank
 * B3 Object-oriented programming (B3.1 SL/HL, B3.2 HL only)
 * B4 Abstract data types (HL only)
 * Paper 2 (Theme B). Python code tasks have been run against every test case.
 */

type Unit = "B3" | "B4";
type Diff = "Easy" | "Moderate" | "Hard";
type Lvl = "Starter" | "Core" | "Exam-style";
/** A mark point: plain text, or [criterion, accepted answers]. */
type Pt = string | [string, string[]];

interface Meta {
  id: string;
  unit: Unit;
  title: string;
  spec: string;
  hl?: boolean;
  cmd: string;
  diff: Diff;
  level: Lvl;
  hint?: string;
  code?: string;
}

const UNIT_NAME: Record<Unit, string> = {
  B3: "B3 Object-oriented programming",
  B4: "B4 Abstract data types",
};

function base(m: Meta) {
  const t: Partial<IGCSETask> = {
    id: m.id,
    unit: m.unit,
    unitName: UNIT_NAME[m.unit],
    title: m.title,
    specReference: m.spec,
    ibLevel: m.hl ? "HL" : "SL",
    paper: "Paper 2",
    examBoard: "IB",
    commandWord: m.cmd,
    difficulty: m.diff,
    level: m.level,
  };
  if (m.hint) t.hint = m.hint;
  if (m.code) t.code = m.code;
  return t;
}

const ptText = (p: Pt) => (typeof p === "string" ? p : p[0]);

function bullets(marks: number, pts: Pt[], notes?: string): string {
  return (
    `Award [1] for each of the following, up to [${marks}]:\n` +
    pts.map((p) => `• ${ptText(p)} [1]`).join("\n") +
    (notes ? `\n${notes}` : "")
  );
}

function toMPs(marks: number, pts: Pt[]): MarkPoint[] {
  return pts.slice(0, marks).map((p, i) => ({
    id: `MP${i + 1}`,
    marks: 1,
    criterion: ptText(p),
    acceptedAnswers: typeof p === "string" ? [p] : p[1],
  }));
}

function keywordsOf(pts: Pt[]): string[] {
  const out: string[] = [];
  for (const p of pts) if (typeof p !== "string") for (const a of p[1]) if (a.length <= 30 && !out.includes(a)) out.push(a);
  return out.slice(0, 10);
}

/** Single written question (Define/State/Outline/Explain/Distinguish/Evaluate...). */
function theory(m: Meta & { brief: string; marks: number; points: Pt[]; keywords?: string[]; notes?: string; bands?: string[] }): IGCSETask {
  const ms = m.bands
    ? `Use the markbands below.\nMarks | Level descriptor\n${m.bands.join("\n")}\n\nIndicative content (other valid points are credited):\n` +
      m.points.map((p) => `• ${ptText(p)}`).join("\n") +
      (m.notes ? `\n${m.notes}` : "")
    : bullets(m.marks, m.points, m.notes);
  return {
    ...base(m),
    type: "theory",
    brief: m.brief,
    marks: m.marks,
    markScheme: ms,
    markPoints: toMPs(m.marks, m.points),
    questions: [{ q: m.brief, keywords: m.keywords || keywordsOf(m.points), maxMarks: m.marks, criteria: m.points.map(ptText) }],
  } as IGCSETask;
}

interface PartSpec {
  label: string;
  q: string;
  marks: number;
  points: Pt[];
  notes?: string;
  exemplar?: string;
  keywords?: string[];
}

/** Structured exam-style question with parts (a), (b), (c)... */
function multi(m: Meta & { stem: string; parts: PartSpec[] }): IGCSETask {
  const marks = m.parts.reduce((a, p) => a + p.marks, 0);
  const parts: QuestionPart[] = m.parts.map((p) => ({
    id: `${m.id}_${p.label.replace(/[()]/g, "")}`,
    label: p.label,
    question: p.q,
    marks: p.marks,
    type: "theory",
    markPoints: toMPs(p.marks, p.points),
    ...(p.exemplar ? { solution: p.exemplar } : {}),
  }));
  const brief = m.stem + "\n\n" + m.parts.map((p) => `${p.label} ${p.q} [${p.marks}]`).join("\n\n");
  const markScheme = m.parts
    .map((p) => `${p.label} ` + bullets(p.marks, p.points, p.notes) + (p.exemplar ? `\nExample answer:\n${p.exemplar}` : ""))
    .join("\n\n");
  return {
    ...base(m),
    type: "theory",
    brief,
    marks,
    parts,
    markScheme,
    questions: m.parts.map((p) => ({
      q: `${p.label} ${p.q}`,
      keywords: p.keywords || keywordsOf(p.points),
      maxMarks: p.marks,
      criteria: p.points.map(ptText),
    })),
  } as IGCSETask;
}

/** Python program marked by automated tests (prompts are ignored by the runner). */
function code(m: Meta & { brief: string; marks: number; starter: string; solution: string; tests: CodeTestCase[]; points?: Pt[]; notes?: string }): IGCSETask {
  const testNote = "Automated tests: marks are awarded for each test case whose output matches exactly.";
  return {
    ...base(m),
    type: "code",
    brief: m.brief,
    marks: m.marks,
    starter: m.starter,
    solution: m.solution,
    tests: m.tests,
    markScheme: (m.points ? bullets(m.marks, m.points, m.notes) + "\n" : "") + testNote,
    ...(m.points ? { markPoints: toMPs(m.marks, m.points) } : {}),
  } as IGCSETask;
}

/** Short exact answers (output, trace, identify). marks are spread evenly over the sub-questions. */
function inspect(m: Meta & { brief: string; marks: number; qs: InspectQuestion[]; notes?: string }): IGCSETask {
  const each = m.marks / m.qs.length;
  return {
    ...base(m),
    type: "inspect",
    brief: m.brief,
    marks: m.marks,
    questions: m.qs,
    markScheme:
      `Award [${Number.isInteger(each) ? each : each.toFixed(1)}] for each correct answer:\n` +
      m.qs.map((q, i) => `${i + 1}. ${q.a[0]}` + (q.a.length > 1 ? ` (accept ${q.a.slice(1).join(" / ")})` : "") + " [1]").join("\n") +
      (m.notes ? `\n${m.notes}` : ""),
  } as IGCSETask;
}

const LETTERS = ["A", "B", "C", "D"];

function mcq(m: Meta & { brief: string; qs: MCQQuestion[]; notes?: string }): IGCSETask {
  return {
    ...base(m),
    type: "mcq",
    brief: m.brief,
    marks: m.qs.length,
    questions: m.qs,
    markScheme:
      "Award [1] for each correct option:\n" +
      m.qs.map((q, i) => `${i + 1}. ${LETTERS[q.a]} (${q.options[q.a]}) [1]`).join("\n") +
      (m.notes ? `\n${m.notes}` : ""),
  } as IGCSETask;
}

/** Table cells: a string starting with "=" is given (pre-filled); others are answered by the student. "|" separates accepted answers. */
function table(m: Meta & { brief: string; marks: number; columns: TableColumn[]; rows: string[][]; notes?: string }): IGCSETask {
  const rows: TableCell[][] = m.rows.map((r) => r.map((c) => (c.startsWith("=") ? { v: c.slice(1), g: true } : { v: c, g: false })));
  const answers = m.rows
    .map((r) => r.filter((c) => !c.startsWith("=")).map((c) => c.split("|")[0]))
    .filter((r) => r.length)
    .map((r) => r.join(", "));
  return {
    ...base(m),
    type: "table",
    brief: m.brief,
    marks: m.marks,
    columns: m.columns,
    rows,
    markScheme:
      `Award marks in proportion to the number of correct cells, up to [${m.marks}]. Expected entries row by row:\n` +
      answers.map((a) => `• ${a}`).join("\n") +
      (m.notes ? `\n${m.notes}` : ""),
  } as IGCSETask;
}

/** Accepted spellings of a sequence of values: spaces, commas, comma-space. */
function seq(...vals: (string | number)[]): string[] {
  const v = vals.map(String);
  return [v.join(" "), v.join(", "), v.join(","), v.join(" -> "), v.join("->")];
}

const BANDS6 = [
  "0 | The response does not reach a standard described by the descriptors below.",
  "1-2 | Limited understanding; points are mostly descriptive, with little or no reference to the scenario; no conclusion.",
  "3-4 | Adequate understanding; some advantages and disadvantages are explained with some reference to the scenario; a conclusion is stated but not fully supported.",
  "5-6 | Detailed understanding; a balanced evaluation of both sides, consistently linked to the scenario, leading to a justified conclusion.",
];

const BANDS8 = [
  "0 | The response does not reach a standard described by the descriptors below.",
  "1-2 | Limited, mostly descriptive response; relevant terminology is rarely used; no judgement is made.",
  "3-4 | Some understanding; a few relevant points are explained but the response is one-sided or generic; any conclusion is weakly supported.",
  "5-6 | Clear understanding; strengths and limitations are explained with technical terms and linked to the scenario; a conclusion is reached with some justification.",
  "7-8 | Detailed, balanced and well-structured evaluation using accurate terminology throughout; every main point is applied to the scenario; the conclusion is fully justified by the arguments.",
];

export const IB_TASKS_B34: IGCSETask[] = [
  // =====================================================================
  // B3.1 Fundamentals of OOP for a single class (SL and HL)
  // =====================================================================
  mcq({
    id: "ib_b3_001", unit: "B3", title: "B3.1 Classes, objects and attributes", spec: "B3.1.1", cmd: "Identify", diff: "Easy", level: "Starter",
    brief: "Answer the following questions on the basic vocabulary of object-oriented programming.",
    qs: [
      {
        q: "Which statement best describes the relationship between a class and an object?",
        options: [
          "An object is a template from which classes are created",
          "A class and an object are two names for the same thing",
          "A class is a template; an object is an instance created from it",
          "A class is a single value stored in memory at run time",
        ],
        a: 2,
      },
      {
        q: "Which term describes the data an object holds, such as a customer's name or an account balance?",
        options: ["Attributes", "Methods", "Constructors", "Parameters"],
        a: 0,
      },
      {
        q: "A Dog object d has a method bark(). What happens when d.bark() is called?",
        options: [
          "A new Dog class is created",
          "The object d is deleted",
          "The class Dog becomes a subclass",
          "The behaviour defined in the Dog class runs on the object d",
        ],
        a: 3,
      },
    ],
  }),

  theory({
    id: "ib_b3_002", unit: "B3", title: "B3.1 Define object", spec: "B3.1.4", cmd: "Define", diff: "Easy", level: "Starter",
    brief: "Define the term object in object-oriented programming.",
    marks: 2,
    points: [
      ["An instance of a class / created from a class (template)", ["instance", "instance of a class", "created from a class"]],
      ["That has its own state (attribute values) and behaviour (methods)", ["state", "attributes", "behaviour", "methods"]],
    ],
    notes: "Do not accept 'a thing in the program' without reference to a class.",
  }),

  theory({
    id: "ib_b3_003", unit: "B3", title: "B3.1 Limitations of OOP for a small script", spec: "B3.1.1", cmd: "Outline", diff: "Moderate", level: "Core",
    brief:
      "A developer needs a 40-line script that reads a list of temperatures and prints their average.\n\nOutline two reasons why an object-oriented approach may not be the best choice for this script.",
    marks: 4,
    points: [
      ["Designing classes adds unnecessary structure/boilerplate for a simple, linear task", ["boilerplate", "unnecessary", "overhead", "more code"]],
      ["…so the program takes longer to write / is longer than a procedural version", ["longer", "more time", "development time"]],
      ["A procedural solution is easier to read and follow for a short, single-purpose task", ["procedural", "simpler", "easier to read"]],
      ["Creating objects uses extra memory/processing which gives no benefit here", ["memory", "performance", "slower"]],
      ["The benefits of OOP (reuse, inheritance, team development) are not needed for a one-off script", ["reuse", "not needed", "one-off"]],
    ],
    notes: "Note to examiners: award [1] for each reason and [1] for its development, up to [2] per reason.",
  }),

  theory({
    id: "ib_b3_004", unit: "B3", title: "B3.1 Evaluate OOP for a hospital system", spec: "B3.1.1", cmd: "Evaluate", diff: "Hard", level: "Exam-style",
    brief:
      "A hospital is commissioning a system to manage patients, doctors, nurses, appointments and wards. Several programmers will work on the system and it will be extended over many years.\n\nEvaluate the use of object-oriented programming (OOP) for this system.",
    marks: 6,
    bands: BANDS6,
    points: [
      ["Real-world entities (Patient, Doctor, Ward, Appointment) map naturally onto classes, making the design easier to understand", ["entities", "classes", "real-world"]],
      ["Encapsulation/information hiding protects sensitive patient data, allowing access only through methods that validate changes", ["encapsulation", "private", "integrity"]],
      ["Inheritance (e.g. Staff → Doctor, Nurse) reuses common code and reduces duplication", ["inheritance", "reuse"]],
      ["Modularity lets different programmers work on different classes at the same time; classes can be tested separately", ["modular", "team", "testing"]],
      ["Maintenance/extension is easier: new types (e.g. Pharmacist) can be added with little change to existing code", ["maintenance", "extend"]],
      ["Disadvantage: more design time is needed up front (UML, class relationships)", ["design time", "UML", "planning"]],
      ["Disadvantage: badly designed hierarchies can become complex and tightly coupled", ["complex", "coupling"]],
      ["Disadvantage: objects can use more memory/processing than a procedural design", ["memory", "performance"]],
      ["Conclusion: for a large, long-lived, multi-programmer system the benefits outweigh the costs", ["conclusion", "outweigh"]],
    ],
    notes: "Note to examiners: a response without a conclusion cannot reach the top markband.",
  }),

  multi({
    id: "ib_b3_005", unit: "B3", title: "B3.1 Library book class design (UML)", spec: "B3.1.2", cmd: "Construct", diff: "Moderate", level: "Exam-style",
    stem:
      "A school library wants a program to keep track of its books. Each book has a title, an author, an ISBN and a record of whether it is currently on loan. A book can be borrowed and returned, and the program must be able to report whether a book is available.",
    parts: [
      {
        label: "(a)", q: "Identify two attributes of the class Book.", marks: 2,
        points: [
          ["One of: title / author / ISBN / onLoan", ["title", "author", "isbn", "onloan", "on loan"]],
          ["A second, different attribute from the list", ["title", "author", "isbn", "onloan", "on loan"]],
        ],
      },
      {
        label: "(b)", q: "Construct a UML class diagram for the class Book. Show each attribute with a data type and visibility, and the methods needed.", marks: 4,
        points: [
          ["Three-section box with class name Book at the top", ["Book", "class name"]],
          ["Attributes with data types e.g. title : String, isbn : String, onLoan : boolean", ["String", "boolean", "data type"]],
          ["Attributes shown as private (-)", ["-", "private"]],
          ["Public (+) methods e.g. borrow(), returnBook(), isAvailable() : boolean", ["+", "borrow", "isAvailable"]],
        ],
        exemplar:
          "+----------------------------+\n|            Book            |\n+----------------------------+\n| - title : String           |\n| - author : String          |\n| - isbn : String            |\n| - onLoan : boolean         |\n+----------------------------+\n| + Book(title, author, isbn)|\n| + borrow() : void          |\n| + returnBook() : void      |\n| + isAvailable() : boolean  |\n+----------------------------+",
      },
      {
        label: "(c)", q: "Explain why the attribute that records whether a book is on loan should be private.", marks: 2,
        points: [
          ["It can only be changed through methods such as borrow()/returnBook() (controlled access)", ["methods", "controlled", "borrow"]],
          ["…so it cannot be set to an invalid/inconsistent state by other code, protecting the integrity of the object", ["integrity", "invalid", "inconsistent"]],
        ],
      },
    ],
  }),

  inspect({
    id: "ib_b3_006", unit: "B3", title: "B3.1 Reading a UML class diagram", spec: "B3.1.2", cmd: "Identify", diff: "Easy", level: "Starter",
    brief: "The UML class diagram below describes a class used by a theatre. Static members are marked {static} (they would be underlined in a hand-drawn diagram). Answer the questions.",
    code:
      "+--------------------------------------+\n|               Ticket                 |\n+--------------------------------------+\n| - code : String                      |\n| - price : float                      |\n| + soldCount : int {static}           |\n+--------------------------------------+\n| + Ticket(code : String, price : float)|\n| + getPrice() : float                 |\n| + applyDiscount(pct : int) : void    |\n| - validate() : boolean               |\n+--------------------------------------+",
    marks: 5,
    qs: [
      { q: "State the name of the class.", a: ["Ticket"] },
      { q: "State the visibility of the attribute code.", a: ["private", "-", "private (-)"] },
      { q: "Identify the method that can only be called from inside the class.", a: ["validate", "validate()"] },
      { q: "State the return type of getPrice.", a: ["float"] },
      { q: "Identify the attribute that is shared by every Ticket object.", a: ["soldCount"] },
    ],
  }),

  multi({
    id: "ib_b3_007", unit: "B3", title: "B3.1 Static and instance variables: parking", spec: "B3.1.3", cmd: "Distinguish", diff: "Moderate", level: "Exam-style",
    stem: "A car park program contains the following class.",
    code:
      "class Car:\n    spaces_free = 120\n\n    def __init__(self, reg):\n        self.reg = reg\n        self.minutes = 0\n        Car.spaces_free -= 1\n\n    def stay(self, m):\n        self.minutes += m",
    parts: [
      {
        label: "(a)", q: "Identify the static (class) variable and one instance variable in the class Car.", marks: 2,
        points: [
          ["Static: spaces_free", ["spaces_free"]],
          ["Instance: reg / minutes", ["reg", "minutes"]],
        ],
      },
      {
        label: "(b)", q: "Distinguish between a static variable and an instance variable, with reference to the class Car.", marks: 4,
        points: [
          ["A static variable belongs to the class; there is one copy shared by all Car objects", ["one copy", "shared", "belongs to the class"]],
          ["e.g. spaces_free is the same value for every car / changes seen by all cars", ["spaces_free"]],
          ["An instance variable belongs to each object; every Car has its own copy", ["each object", "own copy"]],
          ["e.g. reg and minutes are different for each car; created when the constructor runs", ["reg", "minutes", "constructor"]],
        ],
      },
      {
        label: "(c)", q: "Three Car objects are created and none has left. State the value of Car.spaces_free.", marks: 1,
        points: [["117", ["117"]]],
      },
    ],
  }),

  inspect({
    id: "ib_b3_008", unit: "B3", title: "B3.1 Tracing a static counter", spec: "B3.1.3", cmd: "State", diff: "Easy", level: "Core",
    brief: "Study the Python code and answer the questions.",
    code:
      'class Player:\n    total_players = 0\n\n    def __init__(self, name):\n        self.name = name\n        self.score = 0\n        Player.total_players += 1\n\n    def add_points(self, p):\n        self.score += p\n\na = Player("Asha")\nb = Player("Ben")\na.add_points(5)\nb.add_points(3)\na.add_points(2)\nc = Player("Cai")\nprint(Player.total_players)\nprint(a.score, b.score, c.score)\nprint(b.total_players)',
    marks: 5,
    qs: [
      { q: "State the first line of output.", a: ["3"] },
      { q: "State the second line of output.", a: ["7 3 0"] },
      { q: "State the third line of output.", a: ["3"] },
      { q: "Identify the static variable.", a: ["total_players", "Player.total_players"] },
      { q: "Identify one instance variable.", a: ["score", "name", "self.score", "self.name"] },
    ],
  }),

  inspect({
    id: "ib_b3_009", unit: "B3", title: "B3.1 Class variable shadowed by instance", spec: "B3.1.3", cmd: "State", diff: "Hard", level: "Exam-style",
    brief:
      "A programmer intended the class below to count how many Counter objects have been created, but it does not work as intended. Study the code and answer the questions.",
    code:
      "class Counter:\n    count = 0\n\n    def __init__(self):\n        self.count += 1\n\nx = Counter()\ny = Counter()\nprint(Counter.count)\nprint(x.count)\ny.count = 10\nprint(y.count, Counter.count)",
    marks: 4,
    qs: [
      { q: "State the first line of output.", a: ["0"] },
      { q: "State the second line of output.", a: ["1"] },
      { q: "State the third line of output.", a: ["10 0"] },
      { q: "State the corrected version of line 5 so the class counts objects correctly.", a: ["Counter.count += 1", "Counter.count = Counter.count + 1", "type(self).count += 1"] },
    ],
    notes:
      "Note to examiners: self.count += 1 reads the class variable (0) but then creates a new instance variable on the object, so the class variable never changes.",
  }),

  code({
    id: "ib_b3_010", unit: "B3", title: "B3.1 Rectangle class", spec: "B3.1.4", cmd: "Construct", diff: "Easy", level: "Starter",
    brief:
      'Construct a class Rectangle with:\n• a constructor that takes width and height and stores them as attributes\n• a method area() that returns width × height\n• a method perimeter() that returns 2 × (width + height).\n\nThe main program reads two integers with input("Width: ") and input("Height: "), creates a Rectangle object and prints its area and perimeter.\n\nExample (inputs 3 and 4):\nArea: 12\nPerimeter: 14',
    marks: 3,
    starter:
      'class Rectangle:\n    def __init__(self, width, height):\n        # store the attributes\n        pass\n\n    # add area() and perimeter() here\n\n\nw = int(input("Width: "))\nh = int(input("Height: "))\n# create a Rectangle object and print its area and perimeter\n',
    solution:
      'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height\n\n    def perimeter(self):\n        return 2 * (self.width + self.height)\n\n\nw = int(input("Width: "))\nh = int(input("Height: "))\nr = Rectangle(w, h)\nprint("Area:", r.area())\nprint("Perimeter:", r.perimeter())\n',
    tests: [
      { in: ["3", "4"], out: "Area: 12\nPerimeter: 14", m: 1 },
      { in: ["5", "5"], out: "Area: 25\nPerimeter: 20", m: 1 },
      { in: ["1", "10"], out: "Area: 10\nPerimeter: 22", m: 1 },
    ],
    points: [
      ["Constructor stores width and height as attributes using self", ["self.width", "self.height"]],
      ["area() and perimeter() defined as methods returning the correct values", ["def area", "def perimeter"]],
      ["Object instantiated and its methods called to produce the output", ["Rectangle(", "r.area()"]],
    ],
  }),

  code({
    id: "ib_b3_011", unit: "B3", title: "B3.1 Bank account commands", spec: "B3.1.4", cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'Construct a class BankAccount with:\n• a constructor that takes the owner\'s name; the balance starts at 0\n• deposit(amount) which adds amount to the balance\n• withdraw(amount) which returns True and reduces the balance if there are enough funds, otherwise returns False and leaves the balance unchanged.\n\nThe main program reads the owner with input("Owner: ") and creates the account. It then repeatedly reads a command with input("Command: "):\n• "D 50" deposits 50\n• "W 20" withdraws 20; if the withdrawal fails it prints Insufficient funds\n• "END" stops the loop.\nFinally it prints <owner> balance: <balance>.\n\nExample (inputs Raj, W 10, D 5, END):\nInsufficient funds\nRaj balance: 5',
    marks: 4,
    starter:
      'class BankAccount:\n    def __init__(self, owner):\n        pass\n\n    def deposit(self, amount):\n        pass\n\n    def withdraw(self, amount):\n        pass\n\n\nowner = input("Owner: ")\n# create the account and process commands until END\n',
    solution:
      'class BankAccount:\n    def __init__(self, owner):\n        self.owner = owner\n        self.balance = 0\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n            return True\n        return False\n\n\nowner = input("Owner: ")\nacc = BankAccount(owner)\ncommand = input("Command: ")\nwhile command != "END":\n    action, value = command.split()\n    if action == "D":\n        acc.deposit(int(value))\n    elif action == "W":\n        if not acc.withdraw(int(value)):\n            print("Insufficient funds")\n    command = input("Command: ")\nprint(acc.owner, "balance:", acc.balance)\n',
    tests: [
      { in: ["Mia", "D 50", "W 20", "END"], out: "Mia balance: 30", m: 1 },
      { in: ["Raj", "W 10", "D 5", "END"], out: "Insufficient funds\nRaj balance: 5", m: 1 },
      { in: ["Lee", "D 100", "W 100", "W 1", "END"], out: "Insufficient funds\nLee balance: 0", m: 1 },
      { in: ["Zoe", "END"], out: "Zoe balance: 0", m: 1 },
    ],
    points: [
      ["Constructor sets owner and balance = 0", ["self.balance = 0"]],
      ["withdraw checks funds and returns True/False without changing balance on failure", ["return False", "<="]],
      ["Loop processes commands until END, calling the correct method", ["while", "END"]],
      ["Correct final output format", ["balance:"]],
    ],
  }),

  code({
    id: "ib_b3_012", unit: "B3", title: "B3.1 Student marks class", spec: "B3.1.4", cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'Construct a class Student with:\n• a constructor taking a name; it also creates an empty list of marks\n• add_mark(mark) which appends a mark\n• average() which returns the mean mark, or 0 if there are no marks\n• highest() which returns the highest mark, or None if there are no marks.\n\nThe main program reads input("Name: "), then input("How many marks? ") and that many integers with input("Mark: "). It prints:\n<name>: <n> marks, average <average to 1 d.p.>\nHighest: <highest>   (or Highest: none when there are no marks)\n\nExample (inputs Ana, 3, 70, 80, 95):\nAna: 3 marks, average 81.7\nHighest: 95',
    marks: 4,
    starter:
      'class Student:\n    def __init__(self, name):\n        pass\n\n    # add_mark, average and highest\n\n\nname = input("Name: ")\nn = int(input("How many marks? "))\n# read the marks, then print the results\n',
    solution:
      'class Student:\n    def __init__(self, name):\n        self.name = name\n        self.marks = []\n\n    def add_mark(self, mark):\n        self.marks.append(mark)\n\n    def average(self):\n        if len(self.marks) == 0:\n            return 0\n        return sum(self.marks) / len(self.marks)\n\n    def highest(self):\n        if len(self.marks) == 0:\n            return None\n        return max(self.marks)\n\n\nname = input("Name: ")\nn = int(input("How many marks? "))\ns = Student(name)\nfor i in range(n):\n    s.add_mark(int(input("Mark: ")))\nprint(f"{s.name}: {n} marks, average {s.average():.1f}")\nh = s.highest()\nif h is None:\n    print("Highest: none")\nelse:\n    print("Highest:", h)\n',
    tests: [
      { in: ["Ana", "3", "70", "80", "95"], out: "Ana: 3 marks, average 81.7\nHighest: 95", m: 1 },
      { in: ["Tom", "1", "50"], out: "Tom: 1 marks, average 50.0\nHighest: 50", m: 1 },
      { in: ["Kim", "0"], out: "Kim: 0 marks, average 0.0\nHighest: none", m: 1 },
      { in: ["Eli", "4", "60", "60", "61", "59"], out: "Eli: 4 marks, average 60.0\nHighest: 61", m: 1 },
    ],
    points: [
      ["Constructor initialises name and an empty list attribute", ["self.marks = []"]],
      ["add_mark appends to the object's list", ["append"]],
      ["average/highest handle the empty case", ["== 0", "None"]],
      ["Output formatted to 1 decimal place", [":.1f"]],
    ],
  }),

  code({
    id: "ib_b3_013", unit: "B3", title: "B3.1 Ticket numbers with a class variable", spec: "B3.1.3", cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'A deli counter gives each customer the next ticket number.\n\nConstruct a class Ticket with:\n• a static (class) variable issued, starting at 0, shared by all tickets\n• a constructor taking the customer\'s name; it increases issued by 1 and stores the new value as the ticket\'s own number (an instance variable).\n\nThe main program reads input("How many customers? ") and then that many names with input("Name: "), creating a Ticket for each. It then prints <name> has ticket <number> for each customer in order, followed by Tickets issued: <issued> (read from the class).\n\nExample (inputs 2, Ava, Bo):\nAva has ticket 1\nBo has ticket 2\nTickets issued: 2',
    marks: 4,
    starter:
      'class Ticket:\n    # static variable here\n\n    def __init__(self, name):\n        pass\n\n\nn = int(input("How many customers? "))\n',
    solution:
      'class Ticket:\n    issued = 0\n\n    def __init__(self, name):\n        Ticket.issued += 1\n        self.name = name\n        self.number = Ticket.issued\n\n\nn = int(input("How many customers? "))\ntickets = []\nfor i in range(n):\n    tickets.append(Ticket(input("Name: ")))\nfor t in tickets:\n    print(t.name, "has ticket", t.number)\nprint("Tickets issued:", Ticket.issued)\n',
    tests: [
      { in: ["2", "Ava", "Bo"], out: "Ava has ticket 1\nBo has ticket 2\nTickets issued: 2", m: 1 },
      { in: ["1", "Cy"], out: "Cy has ticket 1\nTickets issued: 1", m: 1 },
      { in: ["3", "Ana", "Ben", "Col"], out: "Ana has ticket 1\nBen has ticket 2\nCol has ticket 3\nTickets issued: 3", m: 1 },
      { in: ["0"], out: "Tickets issued: 0", m: 1 },
    ],
    points: [
      ["Class variable issued declared at class level (not in __init__)", ["issued = 0"]],
      ["Constructor updates the class variable via the class name", ["Ticket.issued += 1"]],
      ["Each object stores its own number as an instance variable", ["self.number"]],
      ["Final count read from the class", ["Ticket.issued"]],
    ],
  }),

  code({
    id: "ib_b3_014", unit: "B3", title: "B3.1 Static methods: temperature converter", spec: "B3.1.3", cmd: "Construct", diff: "Easy", level: "Core",
    brief:
      'Some methods do not need any object data. Construct a class Converter containing two static methods (use @staticmethod):\n• c_to_f(c) returns c × 9 / 5 + 32\n• f_to_c(f) returns (f − 32) × 5 / 9.\n\nThe main program must call the methods through the class name without creating an object. It reads input("Mode (CF or FC): ") and a decimal number with input("Value: "), then prints Result: <value to 1 d.p.>.\n\nExample (inputs CF, 100):\nResult: 212.0',
    marks: 4,
    starter:
      'class Converter:\n    # two static methods\n    pass\n\n\nmode = input("Mode (CF or FC): ")\nvalue = float(input("Value: "))\n',
    solution:
      'class Converter:\n    @staticmethod\n    def c_to_f(c):\n        return c * 9 / 5 + 32\n\n    @staticmethod\n    def f_to_c(f):\n        return (f - 32) * 5 / 9\n\n\nmode = input("Mode (CF or FC): ")\nvalue = float(input("Value: "))\nif mode == "CF":\n    result = Converter.c_to_f(value)\nelse:\n    result = Converter.f_to_c(value)\nprint(f"Result: {result:.1f}")\n',
    tests: [
      { in: ["CF", "100"], out: "Result: 212.0", m: 1 },
      { in: ["FC", "32"], out: "Result: 0.0", m: 1 },
      { in: ["CF", "-40"], out: "Result: -40.0", m: 1 },
      { in: ["FC", "98.6"], out: "Result: 37.0", m: 1 },
    ],
    points: [
      ["Both methods decorated with @staticmethod and have no self parameter", ["@staticmethod"]],
      ["Correct conversion formulae", ["9 / 5", "5 / 9"]],
      ["Methods called through the class name, no object created", ["Converter.c_to_f"]],
      ["Output to 1 decimal place", [":.1f"]],
    ],
  }),

  code({
    id: "ib_b3_015", unit: "B3", title: "B3.1 Encapsulated thermostat", spec: "B3.1.5", cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'Construct a class Thermostat that hides its target temperature:\n• a private attribute __target that starts at 20\n• get_target() returns the target\n• set_target(value) changes the target only if value is between 10 and 30 inclusive, returning True; otherwise it returns False and leaves the target unchanged.\n\nThe main program reads input("Number of requests: ") and then that many integers with input("Requested: "). For each request it prints Set to <value> or Rejected <value>. Finally it prints Target: <target> using get_target().\n\nExample (inputs 3, 25, 35, 18):\nSet to 25\nRejected 35\nSet to 18\nTarget: 18',
    marks: 4,
    starter:
      'class Thermostat:\n    def __init__(self):\n        pass\n\n    def get_target(self):\n        pass\n\n    def set_target(self, value):\n        pass\n\n\nn = int(input("Number of requests: "))\n',
    solution:
      'class Thermostat:\n    def __init__(self):\n        self.__target = 20\n\n    def get_target(self):\n        return self.__target\n\n    def set_target(self, value):\n        if 10 <= value <= 30:\n            self.__target = value\n            return True\n        return False\n\n\nn = int(input("Number of requests: "))\nt = Thermostat()\nfor i in range(n):\n    v = int(input("Requested: "))\n    if t.set_target(v):\n        print("Set to", v)\n    else:\n        print("Rejected", v)\nprint("Target:", t.get_target())\n',
    tests: [
      { in: ["3", "25", "35", "18"], out: "Set to 25\nRejected 35\nSet to 18\nTarget: 18", m: 1 },
      { in: ["1", "9"], out: "Rejected 9\nTarget: 20", m: 1 },
      { in: ["2", "10", "30"], out: "Set to 10\nSet to 30\nTarget: 30", m: 1 },
      { in: ["0"], out: "Target: 20", m: 1 },
    ],
    points: [
      ["Attribute made private with a double underscore", ["__target"]],
      ["Getter returns the private value", ["get_target"]],
      ["Setter validates the range 10-30 inclusive before changing", ["10 <=", "<= 30"]],
      ["Main program only uses the public methods", ["set_target(", "get_target()"]],
    ],
  }),

  code({
    id: "ib_b3_016", unit: "B3", title: "B3.1 User account with lockout", spec: "B3.1.5", cmd: "Construct", diff: "Moderate", level: "Exam-style",
    brief:
      'Construct a class UserAccount whose password and security state cannot be read or changed from outside the class:\n• constructor(username, password): stores the username (public) and the password (private); the private failed-attempt counter starts at 0 and the account is not locked\n• login(attempt) returns a message:\n   – "Locked" if the account is already locked\n   – "Welcome <username>" if the attempt is correct (the failed counter is reset to 0)\n   – otherwise the failed counter increases; on the 3rd consecutive failure the account becomes locked and "Account locked" is returned, else "Wrong password".\n\nThe main program reads input("Username: ") and input("Password: "), then repeatedly reads input("Attempt: ") and prints the result of login, until the attempt is QUIT.\n\nExample (inputs jo, secret99, a, b, c, secret99, QUIT):\nWrong password\nWrong password\nAccount locked\nLocked',
    marks: 5,
    starter:
      'class UserAccount:\n    def __init__(self, username, password):\n        pass\n\n    def login(self, attempt):\n        pass\n\n\nuser = input("Username: ")\npw = input("Password: ")\n',
    solution:
      'class UserAccount:\n    def __init__(self, username, password):\n        self.username = username\n        self.__password = password\n        self.__failed = 0\n        self.__locked = False\n\n    def login(self, attempt):\n        if self.__locked:\n            return "Locked"\n        if attempt == self.__password:\n            self.__failed = 0\n            return "Welcome " + self.username\n        self.__failed += 1\n        if self.__failed == 3:\n            self.__locked = True\n            return "Account locked"\n        return "Wrong password"\n\n\nuser = input("Username: ")\npw = input("Password: ")\nacc = UserAccount(user, pw)\nattempt = input("Attempt: ")\nwhile attempt != "QUIT":\n    print(acc.login(attempt))\n    attempt = input("Attempt: ")\n',
    tests: [
      { in: ["sam", "pass1234", "abc", "pass1234", "QUIT"], out: "Wrong password\nWelcome sam", m: 1 },
      { in: ["jo", "secret99", "a", "b", "c", "secret99", "QUIT"], out: "Wrong password\nWrong password\nAccount locked\nLocked", m: 1 },
      { in: ["li", "pw", "pw", "QUIT"], out: "Welcome li", m: 1 },
      {
        in: ["al", "k9", "1", "2", "k9", "3", "4", "5", "k9", "QUIT"],
        out: "Wrong password\nWrong password\nWelcome al\nWrong password\nWrong password\nAccount locked\nLocked",
        m: 2,
      },
    ],
    points: [
      ["Password, failed counter and locked flag are private (double underscore)", ["__password", "__failed", "__locked"]],
      ["Locked state checked first", ["Locked"]],
      ["Correct password resets the counter", ["__failed = 0"]],
      ["Third consecutive failure locks the account", ["== 3"]],
      ["Main loop until QUIT printing the returned message", ["QUIT"]],
    ],
  }),

  multi({
    id: "ib_b3_017", unit: "B3", title: "B3.1 Encapsulation of a fitness tracker", spec: "B3.1.5", cmd: "Explain", diff: "Moderate", level: "Exam-style",
    stem:
      "A fitness tracker app has a class Tracker with a public attribute steps. Other parts of the program sometimes set steps to a negative number by mistake.",
    parts: [
      {
        label: "(a)", q: "Outline the principle of information hiding.", marks: 2,
        points: [
          ["The internal data/implementation details of an object are hidden from other classes", ["hidden", "internal"]],
          ["Other code can only interact with the object through its public interface (methods)", ["interface", "methods", "public"]],
        ],
      },
      {
        label: "(b)", q: "Explain how encapsulation could be used to prevent steps becoming negative.", marks: 3,
        points: [
          ["Make steps private (e.g. __steps / private access modifier)", ["private", "__steps"]],
          ["Provide a public method (setter/add_steps) to change it", ["setter", "method", "add_steps"]],
          ["The method validates the value and rejects/ignores negative numbers, so the object's state stays valid", ["validate", "reject", "negative"]],
        ],
      },
      {
        label: "(c)", q: "Distinguish between the public and private access modifiers.", marks: 2,
        points: [
          ["Public members can be accessed from any class/anywhere in the program", ["public", "anywhere"]],
          ["Private members can only be accessed from inside the class in which they are declared", ["private", "inside the class"]],
        ],
      },
    ],
  }),

  inspect({
    id: "ib_b3_018", unit: "B3", title: "B3.1 Accessing a private attribute", spec: "B3.1.5", cmd: "State", diff: "Easy", level: "Core",
    brief: "Study the Python code and answer the questions.",
    code:
      "class Wallet:\n    def __init__(self, amount):\n        self.__amount = amount\n\n    def get_amount(self):\n        return self.__amount\n\n    def spend(self, cost):\n        if cost <= self.__amount:\n            self.__amount -= cost\n            return True\n        return False\n\nw = Wallet(20)\nprint(w.spend(15))\nprint(w.spend(10))\nprint(w.get_amount())\nprint(w.__amount)",
    marks: 4,
    qs: [
      { q: "State the first line of output.", a: ["True"] },
      { q: "State the second line of output.", a: ["False"] },
      { q: "State the third line of output.", a: ["5"] },
      { q: "State the type of error raised by the last line.", a: ["AttributeError"] },
    ],
  }),

  table({
    id: "ib_b3_019", unit: "B3", title: "B3.1 Trace an object's state", spec: "B3.1.4", cmd: "Trace", diff: "Easy", level: "Core",
    brief: "Complete the table to show the value of s.qty and the value returned after each statement is executed.",
    code:
      'class Stock:\n    def __init__(self, item, qty):\n        self.item = item\n        self.qty = qty\n\n    def sell(self, n):\n        if n <= self.qty:\n            self.qty -= n\n            return "OK"\n        return "SHORT"\n\n    def restock(self, n):\n        self.qty += n\n\ns = Stock("pens", 10)\nr1 = s.sell(4)\ns.restock(3)\nr2 = s.sell(12)\nr3 = s.sell(9)',
    marks: 4,
    columns: [{ label: "Statement" }, { label: "s.qty" }, { label: "Value returned" }],
    rows: [
      ['=s = Stock("pens", 10)', "10", "=—"],
      ["=r1 = s.sell(4)", "6", "OK|\"OK\""],
      ["=s.restock(3)", "9", "=None"],
      ["=r2 = s.sell(12)", "9", "SHORT|\"SHORT\""],
      ["=r3 = s.sell(9)", "0", "OK|\"OK\""],
    ],
  }),

  mcq({
    id: "ib_b3_020", unit: "B3", title: "B3.1 Constructors and self", spec: "B3.1.4", cmd: "Identify", diff: "Easy", level: "Starter",
    brief: "Answer the following questions about constructors in Python.",
    qs: [
      { q: "Which method acts as the constructor of a Python class?", options: ["__init__", "__str__", "__new_object__", "constructor"], a: 0 },
      {
        q: "Inside a method, what does the parameter self refer to?",
        options: ["The class itself", "The parent class", "The object on which the method was called", "The first argument typed by the user"],
        a: 2,
      },
      {
        q: "class Car has the constructor def __init__(self, make): self.make = make. Which statement correctly creates an object?",
        options: ["Car.make = 'Fiat'", "c = Car('Fiat')", "c = Car()", "c = __init__('Fiat')"],
        a: 1,
      },
    ],
  }),

  multi({
    id: "ib_b3_021", unit: "B3", title: "B3.1 Gym members: static and instance", spec: "B3.1.3", cmd: "Construct", diff: "Hard", level: "Exam-style",
    stem:
      "A gym records its members. Every member has a name and a membership number. Numbers are allocated in order starting at 1. The monthly fee is the same for every member (30) unless the gym changes it for everyone at once.",
    parts: [
      {
        label: "(a)", q: "Identify which data should be stored in static (class) variables and which in instance variables.", marks: 2,
        points: [
          ["Static: monthly fee and the next membership number / member count", ["static", "fee", "count", "next number"]],
          ["Instance: name and membership number of each member", ["instance", "name", "membership number"]],
        ],
      },
      {
        label: "(b)", q: "Construct a Python class Member whose constructor takes a name and assigns the next membership number.", marks: 4,
        points: [
          ["Class-level variables for fee (30) and the counter", ["fee = 30", "count = 0"]],
          ["Constructor with self and name parameters storing self.name", ["def __init__(self, name)", "self.name"]],
          ["Counter incremented through the class name", ["Member.count += 1"]],
          ["Instance number assigned from the counter", ["self.number = Member.count"]],
        ],
        exemplar:
          "class Member:\n    fee = 30\n    count = 0\n\n    def __init__(self, name):\n        Member.count += 1\n        self.name = name\n        self.number = Member.count",
      },
      {
        label: "(c)", q: "Distinguish between a static method and an instance (non-static) method, using the class Member as an example.", marks: 3,
        points: [
          ["A static method belongs to the class and can be called without creating an object (e.g. Member.change_fee(35))", ["static", "without an object", "class name"]],
          ["…it cannot access instance variables such as name/number", ["cannot access", "no self"]],
          ["An instance method is called on an object and can read/change that object's attributes (e.g. m.get_number())", ["instance method", "self", "object"]],
        ],
      },
      {
        label: "(d)", q: "Outline the role of the constructor when a Member object is created.", marks: 2,
        points: [
          ["It runs automatically when the object is instantiated", ["automatically", "instantiated"]],
          ["It sets the initial values of the object's attributes (its initial state)", ["initial", "attributes", "state"]],
        ],
      },
    ],
  }),

  code({
    id: "ib_b3_022", unit: "B3", title: "B3.1 Clock class with wrap-around", spec: "B3.1.4", cmd: "Construct", diff: "Moderate", level: "Exam-style",
    brief:
      'Construct a class Clock that stores a 24-hour time:\n• constructor(hours, minutes)\n• tick(m) adds m minutes, wrapping past midnight (e.g. 23:50 plus 20 minutes is 00:10)\n• display() returns the time as HH:MM with leading zeros.\n\nThe main program reads input("Hours: "), input("Minutes: ") and input("Minutes to add: ") as integers, then prints Start <time> and End <time>.\n\nExample (inputs 9, 5, 90):\nStart 09:05\nEnd 10:35',
    marks: 5,
    starter:
      'class Clock:\n    def __init__(self, hours, minutes):\n        pass\n\n    def tick(self, m):\n        pass\n\n    def display(self):\n        pass\n\n\nh = int(input("Hours: "))\nm = int(input("Minutes: "))\nadd = int(input("Minutes to add: "))\n',
    solution:
      'class Clock:\n    def __init__(self, hours, minutes):\n        self.hours = hours\n        self.minutes = minutes\n\n    def tick(self, m):\n        total = (self.hours * 60 + self.minutes + m) % (24 * 60)\n        self.hours = total // 60\n        self.minutes = total % 60\n\n    def display(self):\n        return f"{self.hours:02d}:{self.minutes:02d}"\n\n\nh = int(input("Hours: "))\nm = int(input("Minutes: "))\nadd = int(input("Minutes to add: "))\nc = Clock(h, m)\nprint("Start", c.display())\nc.tick(add)\nprint("End", c.display())\n',
    tests: [
      { in: ["9", "5", "90"], out: "Start 09:05\nEnd 10:35", m: 1 },
      { in: ["23", "50", "20"], out: "Start 23:50\nEnd 00:10", m: 1 },
      { in: ["0", "0", "1440"], out: "Start 00:00\nEnd 00:00", m: 1 },
      { in: ["12", "30", "3000"], out: "Start 12:30\nEnd 14:30", m: 2 },
    ],
    points: [
      ["Constructor stores hours and minutes", ["self.hours", "self.minutes"]],
      ["tick converts to total minutes and adds", ["* 60"]],
      ["Wraps using modulo 1440", ["% (24 * 60)", "% 1440"]],
      ["display pads with leading zeros", [":02d", "zfill"]],
      ["Object state changed by tick, then displayed", ["c.tick"]],
    ],
  }),

  theory({
    id: "ib_b3_023", unit: "B3", title: "B3.1 Instance or class variable?", spec: "B3.1.3", cmd: "Explain", diff: "Easy", level: "Core",
    brief:
      "A school timetable program has a class Classroom. Each classroom has a room number and a capacity, and the school has a single rule that no lesson may last longer than 60 minutes.\n\nExplain, with reference to this class, when an instance variable should be used rather than a class (static) variable.",
    marks: 3,
    points: [
      ["An instance variable is used when the value can differ from object to object", ["differ", "each object"]],
      ["e.g. room number and capacity are different for each Classroom so they are instance variables", ["room number", "capacity"]],
      ["A class variable suits a value shared by all objects, e.g. the 60-minute maximum; storing it per object would waste memory/risk inconsistent values", ["shared", "60", "inconsistent"]],
    ],
  }),

  inspect({
    id: "ib_b3_024", unit: "B3", title: "B3.1 Find the errors in a class", spec: "B3.1.4", cmd: "Identify", diff: "Easy", level: "Core",
    brief: "The class below contains three errors. Answer the questions to correct them.",
    code:
      "class Circle:\n    pi = 3.14159\n\n    def __init__(radius):\n        self.radius = radius\n\n    def area(self):\n        return pi * self.radius ** 2\n\nc = Circle(2)\nprint(c.area)",
    marks: 3,
    qs: [
      { q: "Line 4: state the parameter missing from the constructor's parameter list.", a: ["self"] },
      { q: "Line 8: state how the class variable pi must be referred to inside the method.", a: ["Circle.pi", "self.pi"] },
      { q: "Line 11: write the corrected statement.", a: ["print(c.area())"] },
    ],
  }),

  multi({
    id: "ib_b3_025", unit: "B3", title: "B3.1 Modelling a cinema booking system", spec: "B3.1.1", cmd: "Identify", diff: "Moderate", level: "Exam-style",
    stem:
      "A cinema wants a booking system. Customers choose a film screening (a film shown in a particular screen at a particular time) and book one or more seats.",
    parts: [
      {
        label: "(a)", q: "Identify two classes that could be used to model this system.", marks: 2,
        points: [
          ["One of: Film / Screening / Screen / Seat / Booking / Customer", ["Film", "Screening", "Screen", "Seat", "Booking", "Customer"]],
          ["A second, different class from the list", ["Film", "Screening", "Screen", "Seat", "Booking", "Customer"]],
        ],
      },
      {
        label: "(b)", q: "For a class Screening, state two attributes and two methods.", marks: 4,
        points: [
          ["Attribute e.g. startTime / film / screenNumber", ["startTime", "film", "screen"]],
          ["Second attribute e.g. seatsAvailable / price", ["seats", "price"]],
          ["Method e.g. bookSeat(seat)", ["book"]],
          ["Method e.g. getSeatsAvailable() / cancelBooking(seat)", ["cancel", "available"]],
        ],
      },
      {
        label: "(c)", q: "Outline one advantage of modelling the system using objects.", marks: 2,
        points: [
          ["Classes correspond to real-world entities so the design is easier to understand/communicate", ["real-world", "understand"]],
          ["…changes are localised to one class / classes can be reused or tested separately", ["reuse", "localised", "tested"]],
        ],
      },
    ],
  }),

  multi({
    id: "ib_b3_026", unit: "B3", title: "B3.1 Protecting a patient's heart rate", spec: "B3.1.5", cmd: "Construct", diff: "Hard", level: "Exam-style",
    stem: "A hospital monitoring program uses the class below.",
    code: "class Patient:\n    def __init__(self, name, heart_rate):\n        self.name = name\n        self.heart_rate = heart_rate",
    parts: [
      {
        label: "(a)", q: "Outline one risk of heart_rate being a public attribute.", marks: 2,
        points: [
          ["Any part of the program can change it directly", ["directly", "any code"]],
          ["…so an invalid value (e.g. -5 or 900) could be stored, corrupting the record", ["invalid", "corrupt"]],
        ],
      },
      {
        label: "(b)", q: "Construct a modified version of Patient in which heart_rate is private, with a getter and a setter. The setter must only accept values from 20 to 250 inclusive and must return True or False.", marks: 4,
        points: [
          ["Private attribute e.g. self.__heart_rate", ["__heart_rate"]],
          ["Getter returns the private value", ["get_heart_rate", "return self.__heart_rate"]],
          ["Setter checks the range 20-250", ["20 <=", "<= 250"]],
          ["Setter updates only when valid and returns True/False", ["return True", "return False"]],
        ],
        exemplar:
          "class Patient:\n    def __init__(self, name, heart_rate):\n        self.name = name\n        self.__heart_rate = heart_rate\n\n    def get_heart_rate(self):\n        return self.__heart_rate\n\n    def set_heart_rate(self, value):\n        if 20 <= value <= 250:\n            self.__heart_rate = value\n            return True\n        return False",
      },
      {
        label: "(c)", q: "Explain why limiting access to an object's attributes improves the security and integrity of the system.", marks: 2,
        points: [
          ["All changes pass through methods that validate them, so the object can never hold invalid data (integrity)", ["validate", "integrity"]],
          ["Sensitive data cannot be read/changed by unauthorised code; internal changes do not affect other classes", ["sensitive", "unauthorised", "security"]],
        ],
      },
    ],
  }),
  // =====================================================================
  // B3.2 Fundamentals of OOP for multiple classes (HL only)
  // =====================================================================
  code({
    id: "ib_b3_027", unit: "B3", title: "B3.2 Animal sounds by overriding", spec: "B3.2.2", hl: true, cmd: "Construct", diff: "Easy", level: "Core",
    brief:
      'Construct a class Animal with a constructor taking a name, a method speak() that returns "..." and a method describe() that returns "<name> says <speak()>".\nConstruct subclasses Dog, Cat and Cow that override only speak(), returning "Woof", "Meow" and "Moo".\n\nThe main program reads input("How many animals? "), then for each animal input("Type: ") and input("Name: "). The type dog, cat or cow creates that subclass; any other type creates a plain Animal. It then prints describe() for every animal in order.\n\nExample (inputs 2, dog, Rex, cat, Tom):\nRex says Woof\nTom says Meow',
    marks: 4,
    starter:
      'class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\n    def describe(self):\n        pass\n\n# subclasses Dog, Cat and Cow\n\n\nn = int(input("How many animals? "))\n',
    solution:
      'class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\n    def describe(self):\n        return self.name + " says " + self.speak()\n\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\n\n\nclass Cat(Animal):\n    def speak(self):\n        return "Meow"\n\n\nclass Cow(Animal):\n    def speak(self):\n        return "Moo"\n\n\nn = int(input("How many animals? "))\nanimals = []\nfor i in range(n):\n    kind = input("Type: ")\n    name = input("Name: ")\n    if kind == "dog":\n        animals.append(Dog(name))\n    elif kind == "cat":\n        animals.append(Cat(name))\n    elif kind == "cow":\n        animals.append(Cow(name))\n    else:\n        animals.append(Animal(name))\nfor a in animals:\n    print(a.describe())\n',
    tests: [
      { in: ["2", "dog", "Rex", "cat", "Tom"], out: "Rex says Woof\nTom says Meow", m: 1 },
      { in: ["1", "cow", "Daisy"], out: "Daisy says Moo", m: 1 },
      { in: ["3", "fish", "Nemo", "dog", "Fido", "cow", "Bess"], out: "Nemo says ...\nFido says Woof\nBess says Moo", m: 2 },
    ],
    points: [
      ["Subclasses declared with Animal as parent", ["class Dog(Animal)"]],
      ["speak() overridden in each subclass", ["def speak"]],
      ["describe() defined once in the parent and calls self.speak() (dynamic binding)", ["self.speak()"]],
      ["Correct object created for each type, Animal for unknown", ["else"]],
    ],
  }),

  code({
    id: "ib_b3_028", unit: "B3", title: "B3.2 Polymorphic shapes and total area", spec: "B3.2.2", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Construct an abstract-style class Shape whose area() method raises NotImplementedError, and three subclasses:\n• Circle(r): area = π r² (use math.pi)\n• Rectangle(w, h): area = w × h\n• Square(side): a subclass of Rectangle whose constructor calls the parent constructor with side, side.\n\nThe main program reads input("Number of shapes: ") and then one line per shape with input("Shape: "), e.g. circle 2, rect 3 4 or square 5. It stores the objects in one list, then prints for each shape its class name and area to 2 d.p., followed by the total area to 2 d.p. The loop that prints must not test the type of the shape.\n\nExample (inputs 2, circle 1, rect 2 3):\nCircle 3.14\nRectangle 6.00\nTotal 9.14',
    marks: 6,
    starter:
      'import math\n\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n\n# Circle, Rectangle and Square\n\n\nn = int(input("Number of shapes: "))\n',
    solution:
      'import math\n\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n\n    def name(self):\n        return type(self).__name__\n\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n\n    def area(self):\n        return math.pi * self.r ** 2\n\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n\n    def area(self):\n        return self.w * self.h\n\n\nclass Square(Rectangle):\n    def __init__(self, side):\n        super().__init__(side, side)\n\n\nn = int(input("Number of shapes: "))\nshapes = []\nfor i in range(n):\n    parts = input("Shape: ").split()\n    if parts[0] == "circle":\n        shapes.append(Circle(float(parts[1])))\n    elif parts[0] == "rect":\n        shapes.append(Rectangle(float(parts[1]), float(parts[2])))\n    else:\n        shapes.append(Square(float(parts[1])))\ntotal = 0\nfor s in shapes:\n    a = s.area()\n    total += a\n    print(f"{s.name()} {a:.2f}")\nprint(f"Total {total:.2f}")\n',
    tests: [
      { in: ["2", "circle 1", "rect 2 3"], out: "Circle 3.14\nRectangle 6.00\nTotal 9.14", m: 1 },
      { in: ["1", "square 4"], out: "Square 16.00\nTotal 16.00", m: 2 },
      { in: ["3", "square 1", "circle 2", "rect 1 1"], out: "Square 1.00\nCircle 12.57\nRectangle 1.00\nTotal 14.57", m: 2 },
      { in: ["0"], out: "Total 0.00", m: 1 },
    ],
    points: [
      ["Shape.area raises NotImplementedError (abstract method)", ["NotImplementedError"]],
      ["Circle and Rectangle inherit from Shape and override area()", ["class Circle(Shape)", "def area"]],
      ["Square inherits from Rectangle", ["class Square(Rectangle)"]],
      ["Square calls the parent constructor with super()", ["super().__init__"]],
      ["Single loop calls s.area() polymorphically without type checks", ["s.area()"]],
      ["Output and total formatted to 2 d.p.", [":.2f"]],
    ],
  }),

  code({
    id: "ib_b3_029", unit: "B3", title: "B3.2 Employees and managers (super)", spec: "B3.2.1", hl: true, cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'Construct a class Employee with a constructor (name, salary) and a method annual_pay() returning the salary.\nConstruct a subclass Manager whose constructor takes (name, salary, bonus) and calls the parent constructor with super(). Manager overrides annual_pay() so it returns the parent\'s annual_pay() plus the bonus (it must call the parent method, not repeat its code).\n\nThe main program reads input("Number of staff: "), then one line per person with input("Staff: "): E name salary or M name salary bonus (all integers). It prints <name>: <annual pay> for each person and then Payroll total: <total>.\n\nExample (inputs 2, E Ann 30000, M Bob 40000 5000):\nAnn: 30000\nBob: 45000\nPayroll total: 75000',
    marks: 4,
    starter:
      'class Employee:\n    def __init__(self, name, salary):\n        pass\n\n    def annual_pay(self):\n        pass\n\n# class Manager\n\n\nn = int(input("Number of staff: "))\n',
    solution:
      'class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    def annual_pay(self):\n        return self.salary\n\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        super().__init__(name, salary)\n        self.bonus = bonus\n\n    def annual_pay(self):\n        return super().annual_pay() + self.bonus\n\n\nn = int(input("Number of staff: "))\nstaff = []\nfor i in range(n):\n    p = input("Staff: ").split()\n    if p[0] == "M":\n        staff.append(Manager(p[1], int(p[2]), int(p[3])))\n    else:\n        staff.append(Employee(p[1], int(p[2])))\ntotal = 0\nfor s in staff:\n    print(f"{s.name}: {s.annual_pay()}")\n    total += s.annual_pay()\nprint("Payroll total:", total)\n',
    tests: [
      { in: ["2", "E Ann 30000", "M Bob 40000 5000"], out: "Ann: 30000\nBob: 45000\nPayroll total: 75000", m: 1 },
      { in: ["1", "M Cara 50000 0"], out: "Cara: 50000\nPayroll total: 50000", m: 1 },
      { in: ["3", "E Al 1", "E Bea 2", "M Cy 3 4"], out: "Al: 1\nBea: 2\nCy: 7\nPayroll total: 10", m: 2 },
    ],
    points: [
      ["Manager declared as a subclass of Employee", ["class Manager(Employee)"]],
      ["Manager constructor calls super().__init__(name, salary)", ["super().__init__"]],
      ["annual_pay overridden and calls super().annual_pay()", ["super().annual_pay()"]],
      ["Correct objects created and total calculated", ["Payroll total"]],
    ],
  }),

  inspect({
    id: "ib_b3_030", unit: "B3", title: "B3.2 Tracing inheritance and super()", spec: "B3.2.1", hl: true, cmd: "State", diff: "Moderate", level: "Core",
    brief: "Study the Python code and state each line of output.",
    code:
      'class Vehicle:\n    def __init__(self, wheels):\n        self.wheels = wheels\n\n    def describe(self):\n        return "Vehicle with " + str(self.wheels) + " wheels"\n\nclass Bike(Vehicle):\n    def __init__(self):\n        super().__init__(2)\n\n    def describe(self):\n        return "Bike: " + super().describe()\n\nclass Lorry(Vehicle):\n    def __init__(self, wheels, load):\n        super().__init__(wheels)\n        self.load = load\n\nv = [Bike(), Lorry(6, 12), Vehicle(4)]\nfor x in v:\n    print(x.describe())\nprint(isinstance(v[0], Vehicle))\nprint(isinstance(v[2], Bike))',
    marks: 5,
    qs: [
      { q: "Line 1 of output", a: ["Bike: Vehicle with 2 wheels"] },
      { q: "Line 2 of output", a: ["Vehicle with 6 wheels"] },
      { q: "Line 3 of output", a: ["Vehicle with 4 wheels"] },
      { q: "Line 4 of output", a: ["True"] },
      { q: "Line 5 of output", a: ["False"] },
    ],
  }),

  mcq({
    id: "ib_b3_031", unit: "B3", title: "B3.2 Access modifiers and inheritance", spec: "B3.2.1", hl: true, cmd: "Identify", diff: "Easy", level: "Core",
    brief: "Answer the following questions about how access modifiers affect inherited members.",
    qs: [
      {
        q: "In Java, an attribute of a parent class is declared protected. Where can it be accessed directly?",
        options: [
          "Only inside the parent class",
          "Anywhere in the program",
          "Inside the parent class, its subclasses and classes in the same package",
          "Only inside subclasses, never in the parent class",
        ],
        a: 2,
      },
      {
        q: "A parent class has a private attribute balance. Which statement is correct for a subclass?",
        options: [
          "The subclass cannot access balance directly; it must use the parent's public or protected methods",
          "The subclass can read and change balance directly",
          "balance automatically becomes public in the subclass",
          "balance is deleted when a subclass object is created",
        ],
        a: 0,
      },
      {
        q: "In Python, what does a single leading underscore, as in self._speed, indicate?",
        options: ["A private member enforced by the interpreter", "A protected member by convention only", "A static variable", "A constant that cannot change"],
        a: 1,
      },
      {
        q: "Which Python function lets a subclass's constructor call its parent class's constructor?",
        options: ["self()", "this()", "parent()", "super()"],
        a: 3,
      },
    ],
  }),

  multi({
    id: "ib_b3_032", unit: "B3", title: "B3.2 Static and dynamic polymorphism", spec: "B3.2.2", hl: true, cmd: "Distinguish", diff: "Moderate", level: "Exam-style",
    stem:
      "A drawing application has a class Shape with subclasses Circle and Triangle. Each class has its own draw() method. A utility class Geometry has two methods called distance: one takes two points, and one takes four numbers (x1, y1, x2, y2).",
    parts: [
      {
        label: "(a)", q: "Define the term polymorphism.", marks: 1,
        points: [["The ability of the same method name/interface to behave differently depending on the object/arguments", ["same method name", "different", "many forms"]]],
      },
      {
        label: "(b)", q: "Distinguish between static and dynamic polymorphism, with reference to this application.", marks: 4,
        points: [
          ["Static polymorphism is method overloading: same name, different parameter lists", ["overloading", "parameter"]],
          ["…the version is chosen at compile time from the arguments, e.g. the two distance methods", ["compile time", "distance"]],
          ["Dynamic polymorphism is method overriding: a subclass redefines a parent method with the same signature", ["overriding", "subclass"]],
          ["…the version is chosen at run time from the object's actual class, e.g. shape.draw() calls Circle's or Triangle's draw()", ["run time", "draw"]],
        ],
      },
      {
        label: "(c)", q: "Explain how polymorphism makes it easier to add a new shape, Hexagon, to the application.", marks: 3,
        points: [
          ["Hexagon inherits from Shape and overrides draw()", ["inherit", "override"]],
          ["Existing code that loops through a list of Shape objects calling draw() needs no change", ["no change", "loop"]],
          ["This reduces the risk of errors / improves flexibility and maintainability", ["flexibility", "maintain", "errors"]],
        ],
      },
    ],
  }),

  code({
    id: "ib_b3_033", unit: "B3", title: "B3.2 Overloading-style total method", spec: "B3.2.2", hl: true, cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'Python does not allow two methods with the same name in one class, so static polymorphism (overloading) is modelled with default parameter values.\n\nConstruct a class Calculator with one method total(a, b, c=0) that can be called with either two or three numbers and returns their sum. Also add a method describe(a, b, c=None) that returns "2 values" or "3 values" depending on whether c was supplied.\n\nThe main program reads one line with input("Numbers: ") containing two or three integers separated by spaces, calls both methods with exactly that many arguments, and prints:\nTotal of <describe result>: <total>\n\nExample (input 1 2 3):\nTotal of 3 values: 6',
    marks: 4,
    starter:
      'class Calculator:\n    def total(self, a, b, c=0):\n        pass\n\n    def describe(self, a, b, c=None):\n        pass\n\n\nnums = [int(x) for x in input("Numbers: ").split()]\n',
    solution:
      'class Calculator:\n    def total(self, a, b, c=0):\n        return a + b + c\n\n    def describe(self, a, b, c=None):\n        if c is None:\n            return "2 values"\n        return "3 values"\n\n\nnums = [int(x) for x in input("Numbers: ").split()]\ncalc = Calculator()\nif len(nums) == 2:\n    t = calc.total(nums[0], nums[1])\n    d = calc.describe(nums[0], nums[1])\nelse:\n    t = calc.total(nums[0], nums[1], nums[2])\n    d = calc.describe(nums[0], nums[1], nums[2])\nprint(f"Total of {d}: {t}")\n',
    tests: [
      { in: ["3 4"], out: "Total of 2 values: 7", m: 1 },
      { in: ["1 2 3"], out: "Total of 3 values: 6", m: 1 },
      { in: ["10 -4"], out: "Total of 2 values: 6", m: 1 },
      { in: ["0 0 5"], out: "Total of 3 values: 5", m: 1 },
    ],
    points: [
      ["total uses a default parameter so it accepts 2 or 3 arguments", ["c=0"]],
      ["describe distinguishes the call by testing for the default value", ["is None"]],
      ["Methods called with the number of arguments supplied", ["calc.total("]],
      ["Correct output format", ["Total of"]],
    ],
  }),

  multi({
    id: "ib_b3_034", unit: "B3", title: "B3.2 Abstraction in a sensor network", spec: "B3.2.3", hl: true, cmd: "Explain", diff: "Moderate", level: "Exam-style",
    stem:
      "A weather station collects readings from many sensors: temperature, humidity and wind speed. Each sensor is read differently, but the main program must be able to ask any sensor for a reading and a unit.",
    parts: [
      {
        label: "(a)", q: "Explain the significance of abstraction in developing modular code for this system.", marks: 3,
        points: [
          ["Abstraction hides the details of how each sensor is read and exposes only essential operations", ["hides", "essential"]],
          ["The main program depends only on a common interface (read(), unit()), not on each sensor's implementation", ["interface", "depends"]],
          ["Sensor classes can be developed, tested and replaced independently (modules), reducing complexity", ["independently", "modular", "complexity"]],
        ],
      },
      {
        label: "(b)", q: "Construct an abstract class Sensor with an abstract method read() and a concrete subclass TemperatureSensor whose read() returns a stored value.", marks: 4,
        points: [
          ["Sensor class defined with read() that has no implementation (raises NotImplementedError or @abstractmethod)", ["NotImplementedError", "abstractmethod"]],
          ["TemperatureSensor inherits from Sensor", ["class TemperatureSensor(Sensor)"]],
          ["TemperatureSensor constructor stores a value", ["self.value"]],
          ["read() overridden to return the value", ["def read(self)", "return self.value"]],
        ],
        exemplar:
          "class Sensor:\n    def read(self):\n        raise NotImplementedError(\"read() must be overridden\")\n\nclass TemperatureSensor(Sensor):\n    def __init__(self, value):\n        self.value = value\n\n    def read(self):\n        return self.value",
        notes: "Accept a solution that uses abc.ABC and @abstractmethod.",
      },
      {
        label: "(c)", q: "State why an abstract class cannot be instantiated.", marks: 1,
        points: [["It is incomplete: it has at least one abstract method with no implementation, so it only serves as a base/interface for subclasses", ["incomplete", "no implementation", "abstract method"]]],
      },
    ],
  }),

  inspect({
    id: "ib_b3_035", unit: "B3", title: "B3.2 Abstract payment class", spec: "B3.2.3", hl: true, cmd: "State", diff: "Moderate", level: "Core",
    brief: "Study the Python code and answer the questions.",
    code:
      'class Payment:\n    def __init__(self, amount):\n        self.amount = amount\n\n    def fee(self):\n        raise NotImplementedError("Subclass must implement fee()")\n\n    def total(self):\n        return self.amount + self.fee()\n\nclass Card(Payment):\n    def fee(self):\n        return round(self.amount * 0.02, 2)\n\nclass Cash(Payment):\n    def fee(self):\n        return 0\n\nitems = [Card(50), Cash(30), Card(10)]\nprint([p.total() for p in items])\np = Payment(5)\nprint(p.total())',
    marks: 4,
    qs: [
      { q: "State the first line of output.", a: ["[51.0, 30, 10.2]"] },
      { q: "State the type of exception raised by the last line.", a: ["NotImplementedError"] },
      { q: "Identify the method that every subclass must provide.", a: ["fee", "fee()"] },
      { q: "State the term for a class such as Payment that is designed only to be inherited from.", a: ["abstract class", "abstract", "an abstract class"] },
    ],
  }),

  multi({
    id: "ib_b3_036", unit: "B3", title: "B3.2 Composition and aggregation in a school", spec: "B3.2.4", hl: true, cmd: "Distinguish", diff: "Moderate", level: "Exam-style",
    stem:
      "A school system has a class School. A School object contains Classroom objects, which are created when the School is created and are deleted with it. A School also has Teacher objects; teachers exist in the system before they join a school and can move to another school.",
    parts: [
      {
        label: "(a)", q: "Identify the relationship between School and Classroom, and between School and Teacher.", marks: 2,
        points: [
          ["School–Classroom: composition", ["composition"]],
          ["School–Teacher: aggregation", ["aggregation"]],
        ],
      },
      {
        label: "(b)", q: "Distinguish between composition and aggregation.", marks: 4,
        points: [
          ["Both are 'has-a' relationships in which an object is built from component objects", ["has-a", "component"]],
          ["In composition the parts are created/owned by the whole and cannot exist without it", ["cannot exist", "owned"]],
          ["…when the whole is destroyed the parts are destroyed too (strong/tight coupling)", ["destroyed", "tightly coupled"]],
          ["In aggregation the parts exist independently and may be shared or outlive the whole (weak coupling)", ["independently", "outlive", "shared"]],
        ],
      },
      {
        label: "(c)", q: "State how the two relationships are shown in a UML class diagram.", marks: 2,
        points: [
          ["Composition: line with a filled (black) diamond at the whole (School) end", ["filled diamond"]],
          ["Aggregation: line with a hollow (white) diamond at the whole end", ["hollow diamond", "empty diamond"]],
        ],
      },
    ],
  }),

  code({
    id: "ib_b3_037", unit: "B3", title: "B3.2 Team aggregates players", spec: "B3.2.4", hl: true, cmd: "Construct", diff: "Easy", level: "Core",
    brief:
      'A Team aggregates Player objects: players are created first and then added to the team, so they could exist without it.\n\nConstruct:\n• class Player with constructor (name, age)\n• class Team with constructor (name), a list of players, add_player(player), roster() returning the names joined by ", " and average_age().\n\nThe main program reads input("Team: "), then input("Players: ") and that many lines with input("Player: ") in the form name age. It creates each Player, adds it to the Team, then prints:\n<team> (<n> players)\nRoster: <roster>\nAverage age: <average to 1 d.p.>\n\nExample (inputs Hawks, 2, Ali 16, Bea 17):\nHawks (2 players)\nRoster: Ali, Bea\nAverage age: 16.5',
    marks: 4,
    starter:
      'class Player:\n    def __init__(self, name, age):\n        pass\n\n\nclass Team:\n    def __init__(self, name):\n        pass\n\n\nteam_name = input("Team: ")\nn = int(input("Players: "))\n',
    solution:
      'class Player:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n\nclass Team:\n    def __init__(self, name):\n        self.name = name\n        self.players = []\n\n    def add_player(self, player):\n        self.players.append(player)\n\n    def roster(self):\n        return ", ".join(p.name for p in self.players)\n\n    def average_age(self):\n        return sum(p.age for p in self.players) / len(self.players)\n\n\nteam_name = input("Team: ")\nn = int(input("Players: "))\nteam = Team(team_name)\nfor i in range(n):\n    name, age = input("Player: ").split()\n    p = Player(name, int(age))\n    team.add_player(p)\nprint(f"{team.name} ({len(team.players)} players)")\nprint("Roster:", team.roster())\nprint(f"Average age: {team.average_age():.1f}")\n',
    tests: [
      { in: ["Hawks", "2", "Ali 16", "Bea 17"], out: "Hawks (2 players)\nRoster: Ali, Bea\nAverage age: 16.5", m: 1 },
      { in: ["Owls", "1", "Cy 15"], out: "Owls (1 players)\nRoster: Cy\nAverage age: 15.0", m: 1 },
      { in: ["Kites", "3", "Di 14", "Ed 18", "Flo 16"], out: "Kites (3 players)\nRoster: Di, Ed, Flo\nAverage age: 16.0", m: 2 },
    ],
    points: [
      ["Player objects created outside the Team and passed in (aggregation)", ["add_player(p)"]],
      ["Team stores a list of Player objects", ["self.players"]],
      ["roster and average_age use the players' attributes", ["p.name", "p.age"]],
      ["Correct output format", ["Average age"]],
    ],
  }),

  code({
    id: "ib_b3_038", unit: "B3", title: "B3.2 Order composed of order lines", spec: "B3.2.4", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'An Order is composed of OrderLine objects: the Order creates its own lines inside add_item, and the lines cannot exist without the order.\n\nConstruct:\n• class OrderLine(product, price, qty) with subtotal() = price × qty\n• class Order with add_item(product, price, qty), which creates an OrderLine and stores it, and total(). If the sum of the subtotals is greater than 100, total() applies a 10% discount.\n\nThe main program reads lines with input("Item: ") in the form product price qty until DONE. It prints each line as <product> x<qty> = <subtotal to 2 d.p.>. If a discount applies it then prints Discount: -<amount to 2 d.p.>. Finally it prints Total: <total to 2 d.p.>.\n\nExample (inputs bag 60 2, DONE):\nbag x2 = 120.00\nDiscount: -12.00\nTotal: 108.00',
    marks: 6,
    starter:
      'class OrderLine:\n    def __init__(self, product, price, qty):\n        pass\n\n\nclass Order:\n    def __init__(self):\n        pass\n\n\nitem = input("Item: ")\n',
    solution:
      'class OrderLine:\n    def __init__(self, product, price, qty):\n        self.product = product\n        self.price = price\n        self.qty = qty\n\n    def subtotal(self):\n        return self.price * self.qty\n\n\nclass Order:\n    def __init__(self):\n        self.lines = []\n\n    def add_item(self, product, price, qty):\n        self.lines.append(OrderLine(product, price, qty))\n\n    def gross(self):\n        return sum(line.subtotal() for line in self.lines)\n\n    def discount(self):\n        if self.gross() > 100:\n            return self.gross() * 0.1\n        return 0\n\n    def total(self):\n        return self.gross() - self.discount()\n\n\norder = Order()\nitem = input("Item: ")\nwhile item != "DONE":\n    product, price, qty = item.split()\n    order.add_item(product, float(price), int(qty))\n    item = input("Item: ")\nfor line in order.lines:\n    print(f"{line.product} x{line.qty} = {line.subtotal():.2f}")\nif order.discount() > 0:\n    print(f"Discount: -{order.discount():.2f}")\nprint(f"Total: {order.total():.2f}")\n',
    tests: [
      { in: ["pen 1.50 4", "book 12.00 1", "DONE"], out: "pen x4 = 6.00\nbook x1 = 12.00\nTotal: 18.00", m: 1 },
      { in: ["bag 60 2", "DONE"], out: "bag x2 = 120.00\nDiscount: -12.00\nTotal: 108.00", m: 2 },
      { in: ["DONE"], out: "Total: 0.00", m: 1 },
      { in: ["cap 50 2", "DONE"], out: "cap x2 = 100.00\nTotal: 100.00", m: 2 },
    ],
    points: [
      ["OrderLine stores its attributes and calculates subtotal()", ["def subtotal"]],
      ["Order holds a list of OrderLine objects", ["self.lines"]],
      ["add_item creates the OrderLine inside Order (composition)", ["OrderLine(product, price, qty)"]],
      ["Discount applied only when strictly over 100", ["> 100"]],
      ["Loop reads items until DONE", ["DONE"]],
      ["All money values formatted to 2 d.p.", [":.2f"]],
    ],
  }),

  mcq({
    id: "ib_b3_039", unit: "B3", title: "B3.2 Choosing a design pattern", spec: "B3.2.5", hl: true, cmd: "Identify", diff: "Easy", level: "Core",
    brief: "Identify the most suitable design pattern for each situation.",
    qs: [
      {
        q: "A program must have exactly one object that manages the connection to its settings file, and every part of the program must use that same object.",
        options: ["Observer", "Factory", "Singleton", "Composition"],
        a: 2,
      },
      {
        q: "A game reads a level file and must create Goblin, Troll or Dragon objects from a code letter, without the main game loop naming each subclass.",
        options: ["Factory", "Singleton", "Observer", "Encapsulation"],
        a: 0,
      },
      {
        q: "When a share price changes, a chart, a ticker and an alert service must all update automatically.",
        options: ["Singleton", "Factory", "Inheritance", "Observer"],
        a: 3,
      },
    ],
  }),

  code({
    id: "ib_b3_040", unit: "B3", title: "B3.2 Ticket factory", spec: "B3.2.5", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'A cinema sells adult (price 12), child (price 6) and senior (price 8) tickets.\n\nConstruct a base class Ticket with a method price(), subclasses AdultTicket, ChildTicket and SeniorTicket that override price(), and a class TicketFactory with a static method create(kind) that returns the correct object for "adult", "child" or "senior", and returns None for any other kind. The main program must only create tickets through the factory.\n\nThe main program reads input("Number of tickets: ") and then that many kinds with input("Ticket type: "). For an unknown kind it prints Unknown type: <kind>. It then prints Total tickets: <number of valid tickets> and Total price: <sum of prices>.\n\nExample (inputs 2, adult, pirate):\nUnknown type: pirate\nTotal tickets: 1\nTotal price: 12',
    marks: 5,
    starter:
      'class Ticket:\n    def price(self):\n        return 0\n\n# subclasses and TicketFactory\n\n\nn = int(input("Number of tickets: "))\n',
    solution:
      'class Ticket:\n    def price(self):\n        return 0\n\n\nclass AdultTicket(Ticket):\n    def price(self):\n        return 12\n\n\nclass ChildTicket(Ticket):\n    def price(self):\n        return 6\n\n\nclass SeniorTicket(Ticket):\n    def price(self):\n        return 8\n\n\nclass TicketFactory:\n    @staticmethod\n    def create(kind):\n        if kind == "adult":\n            return AdultTicket()\n        if kind == "child":\n            return ChildTicket()\n        if kind == "senior":\n            return SeniorTicket()\n        return None\n\n\nn = int(input("Number of tickets: "))\ntickets = []\nfor i in range(n):\n    kind = input("Ticket type: ")\n    t = TicketFactory.create(kind)\n    if t is None:\n        print("Unknown type:", kind)\n    else:\n        tickets.append(t)\nprint("Total tickets:", len(tickets))\nprint("Total price:", sum(t.price() for t in tickets))\n',
    tests: [
      { in: ["3", "adult", "child", "senior"], out: "Total tickets: 3\nTotal price: 26", m: 1 },
      { in: ["2", "adult", "pirate"], out: "Unknown type: pirate\nTotal tickets: 1\nTotal price: 12", m: 2 },
      { in: ["1", "child"], out: "Total tickets: 1\nTotal price: 6", m: 1 },
      { in: ["4", "senior", "senior", "adult", "child"], out: "Total tickets: 4\nTotal price: 34", m: 1 },
    ],
    points: [
      ["Three subclasses override price()", ["class AdultTicket(Ticket)"]],
      ["Factory has a static create method", ["@staticmethod", "def create"]],
      ["create returns the correct subclass object or None", ["return None"]],
      ["Main program creates tickets only through TicketFactory.create", ["TicketFactory.create"]],
      ["Totals calculated polymorphically from price()", ["t.price()"]],
    ],
  }),

  code({
    id: "ib_b3_041", unit: "B3", title: "B3.2 Observer: weather station", spec: "B3.2.5", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Implement the observer pattern.\n• class WeatherStation keeps a list of observers; subscribe(observer) adds one; set_temperature(t) stores t and calls update(t) on every observer in the order they subscribed.\n• class PhoneDisplay: update(t) prints Phone: <t> C\n• class AlertService: update(t) prints ALERT: <t> C only when t is 30 or more.\n\nThe main program reads input("Displays: "), a space-separated list of observer types (phone and/or alert) and subscribes a new object of each type in that order. It then reads input("Readings: ") and that many integers with input("Temperature: "), passing each one to set_temperature.\n\nExample (inputs phone alert, 2, 25, 35):\nPhone: 25 C\nPhone: 35 C\nALERT: 35 C',
    marks: 5,
    starter:
      'class WeatherStation:\n    def __init__(self):\n        self.observers = []\n\n# PhoneDisplay and AlertService\n\n\nkinds = input("Displays: ").split()\n',
    solution:
      'class WeatherStation:\n    def __init__(self):\n        self.observers = []\n        self.temperature = None\n\n    def subscribe(self, observer):\n        self.observers.append(observer)\n\n    def set_temperature(self, t):\n        self.temperature = t\n        for o in self.observers:\n            o.update(t)\n\n\nclass PhoneDisplay:\n    def update(self, t):\n        print(f"Phone: {t} C")\n\n\nclass AlertService:\n    def update(self, t):\n        if t >= 30:\n            print(f"ALERT: {t} C")\n\n\nkinds = input("Displays: ").split()\nstation = WeatherStation()\nfor k in kinds:\n    if k == "phone":\n        station.subscribe(PhoneDisplay())\n    elif k == "alert":\n        station.subscribe(AlertService())\nn = int(input("Readings: "))\nfor i in range(n):\n    station.set_temperature(int(input("Temperature: ")))\n',
    tests: [
      { in: ["phone", "2", "20", "31"], out: "Phone: 20 C\nPhone: 31 C", m: 1 },
      { in: ["phone alert", "2", "25", "35"], out: "Phone: 25 C\nPhone: 35 C\nALERT: 35 C", m: 1 },
      { in: ["alert phone", "1", "30"], out: "ALERT: 30 C\nPhone: 30 C", m: 2 },
      { in: ["alert", "3", "10", "40", "29"], out: "ALERT: 40 C", m: 1 },
    ],
    points: [
      ["Subject keeps a list of observers and a subscribe method", ["self.observers", "def subscribe"]],
      ["set_temperature notifies every observer by calling update", ["o.update(t)"]],
      ["PhoneDisplay.update prints every reading", ["Phone:"]],
      ["AlertService.update prints only for 30 or more", [">= 30"]],
      ["Observers subscribed in input order", ["subscribe("]],
    ],
  }),

  code({
    id: "ib_b3_042", unit: "B3", title: "B3.2 Singleton logger", spec: "B3.2.5", hl: true, cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'Implement the singleton pattern. Construct a class Logger with:\n• a class variable _instance, initially None\n• a static method get_instance() that creates a Logger the first time it is called and returns that same object every time\n• a list of messages and a method log(message).\n\nThe main program reads input("Messages: ") and that many messages with input("Message: "). Each message must be logged by calling Logger.get_instance().log(message) (so a new call to get_instance is made for every message). It then prints Same object: <True/False> (whether two calls to get_instance return the identical object), Logged: <number of messages in the logger> and every logged message numbered from 1.\n\nExample (inputs 2, start, stop):\nSame object: True\nLogged: 2\n1. start\n2. stop',
    marks: 3,
    starter:
      'class Logger:\n    _instance = None\n\n    def __init__(self):\n        self.messages = []\n\n\nn = int(input("Messages: "))\n',
    solution:
      'class Logger:\n    _instance = None\n\n    def __init__(self):\n        self.messages = []\n\n    @staticmethod\n    def get_instance():\n        if Logger._instance is None:\n            Logger._instance = Logger()\n        return Logger._instance\n\n    def log(self, message):\n        self.messages.append(message)\n\n\nn = int(input("Messages: "))\nfor i in range(n):\n    Logger.get_instance().log(input("Message: "))\nprint("Same object:", Logger.get_instance() is Logger.get_instance())\nlogger = Logger.get_instance()\nprint("Logged:", len(logger.messages))\nfor i, m in enumerate(logger.messages, 1):\n    print(f"{i}. {m}")\n',
    tests: [
      { in: ["2", "start", "stop"], out: "Same object: True\nLogged: 2\n1. start\n2. stop", m: 1 },
      { in: ["1", "hello"], out: "Same object: True\nLogged: 1\n1. hello", m: 1 },
      { in: ["3", "a", "b", "c"], out: "Same object: True\nLogged: 3\n1. a\n2. b\n3. c", m: 1 },
    ],
    points: [
      ["get_instance creates the object only when _instance is None", ["is None"]],
      ["get_instance always returns the stored instance", ["return Logger._instance"]],
      ["Every message logged through Logger.get_instance()", ["Logger.get_instance().log"]],
    ],
  }),

  theory({
    id: "ib_b3_043", unit: "B3", title: "B3.2 Inheritance versus composition", spec: "B3.2.4", hl: true, cmd: "To what extent", diff: "Hard", level: "Exam-style",
    brief:
      "A studio is designing a large adventure game with many kinds of characters. Some characters can fly, some can swim, some can cast spells, and many can do several of these things. One designer proposes a deep inheritance hierarchy (Character → FlyingCharacter → FlyingSwimmingCharacter …); another proposes building characters from smaller ability objects (composition).\n\nTo what extent should the studio prefer composition over inheritance for this game?",
    marks: 8,
    bands: BANDS8,
    points: [
      ["Inheritance gives code reuse: common attributes/methods (health, move) written once in Character", ["reuse", "Character"]],
      ["Inheritance supports polymorphism: a list of Character objects can be processed with overridden methods", ["polymorphism", "override"]],
      ["Combinations of abilities cause a 'class explosion' of subclasses in a deep hierarchy", ["class explosion", "combinations"]],
      ["Deep hierarchies are tightly coupled: a change to a parent class can break many subclasses (fragile base class)", ["tightly coupled", "fragile"]],
      ["Composition: a Character has-a list of ability objects (Fly, Swim, Spell), mixing any combination", ["has-a", "ability objects"]],
      ["Composition allows behaviour to be changed at run time (e.g. a character gains flight)", ["run time"]],
      ["Composition needs more objects and delegation code; design is less obvious to beginners", ["delegation", "more objects"]],
      ["A mixed approach: shallow inheritance for the core type plus composition for abilities", ["mixed", "shallow"]],
      ["Conclusion: composition is largely preferable here because of the many combinations, while inheritance remains useful for the common base", ["conclusion"]],
    ],
  }),

  multi({
    id: "ib_b3_044", unit: "B3", title: "B3.2 Fleet of vehicles", spec: "B3.2.1", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    stem: "A delivery company uses the following class.",
    code:
      "class Vehicle:\n    def __init__(self, reg, capacity):\n        self.reg = reg\n        self._capacity = capacity   # protected by convention\n\n    def max_load(self):\n        return self._capacity\n\n    def info(self):\n        return self.reg + \" can carry \" + str(self.max_load()) + \" kg\"",
    parts: [
      {
        label: "(a)", q: "State the type of relationship between Vehicle and a subclass Truck.", marks: 1,
        points: [["Inheritance / 'is-a' relationship (Truck is a Vehicle; Vehicle is the parent/superclass)", ["inheritance", "is-a", "is a"]]],
      },
      {
        label: "(b)", q: "Construct a subclass Truck with an extra attribute trailer (True or False). A truck's max_load() is the capacity, plus 5000 kg when it has a trailer. Use super() wherever possible.", marks: 4,
        points: [
          ["Class header class Truck(Vehicle)", ["class Truck(Vehicle)"]],
          ["Constructor calls super().__init__(reg, capacity)", ["super().__init__"]],
          ["Stores self.trailer", ["self.trailer"]],
          ["Overrides max_load() using super().max_load() / self._capacity and adds 5000 when trailer is True", ["super().max_load()", "5000"]],
        ],
        exemplar:
          "class Truck(Vehicle):\n    def __init__(self, reg, capacity, trailer):\n        super().__init__(reg, capacity)\n        self.trailer = trailer\n\n    def max_load(self):\n        if self.trailer:\n            return super().max_load() + 5000\n        return super().max_load()",
      },
      {
        label: "(c)", q: "Explain why the inherited info() method gives the correct result for a Truck object without being rewritten.", marks: 3,
        points: [
          ["info() is inherited from Vehicle (code reuse)", ["inherited", "reuse"]],
          ["info() calls self.max_load(), and self refers to the Truck object", ["self.max_load()", "self"]],
          ["Dynamic binding/overriding means Truck's max_load() runs at run time, including the trailer", ["dynamic", "run time", "overrid"]],
        ],
      },
      {
        label: "(d)", q: "Outline the effect on Truck if _capacity were declared private instead of protected (for example in Java).", marks: 2,
        points: [
          ["Truck could not access the attribute directly", ["could not access", "directly"]],
          ["It would need to use the parent's public/protected methods such as max_load() or a getter", ["getter", "max_load", "methods"]],
        ],
      },
    ],
  }),

  multi({
    id: "ib_b3_045", unit: "B3", title: "B3.2 Hospital wards, beds and patients", spec: "B3.2.4", hl: true, cmd: "Explain", diff: "Hard", level: "Exam-style",
    stem:
      "In a hospital system, a Ward object is created with a fixed number of Bed objects, which are created inside the Ward constructor. Patient objects are created at admission and are later assigned to a ward; a patient can be moved between wards.",
    parts: [
      {
        label: "(a)", q: "Explain which relationship (composition or aggregation) exists between Ward and Bed, and between Ward and Patient.", marks: 4,
        points: [
          ["Ward–Bed is composition", ["composition"]],
          ["…because beds are created by the ward and cannot exist without it", ["created by", "cannot exist"]],
          ["Ward–Patient is aggregation", ["aggregation"]],
          ["…because patients exist independently and can be moved to another ward", ["independently", "moved"]],
        ],
      },
      {
        label: "(b)", q: "Construct the Ward class constructor and an admit(patient) method to show both relationships in Python.", marks: 4,
        points: [
          ["Constructor takes the number of beds", ["def __init__(self", "num_beds"]],
          ["Bed objects are created inside the constructor", ["Bed("]],
          ["An empty list for patients is created", ["self.patients = []"]],
          ["admit receives an existing Patient object and adds it to the list", ["def admit(self, patient)", "append(patient)"]],
        ],
        exemplar:
          "class Ward:\n    def __init__(self, name, num_beds):\n        self.name = name\n        self.beds = [Bed(i) for i in range(num_beds)]\n        self.patients = []\n\n    def admit(self, patient):\n        self.patients.append(patient)",
      },
      {
        label: "(c)", q: "Outline what happens to the Bed and Patient objects if a Ward object is deleted.", marks: 2,
        points: [
          ["The Bed objects are deleted with the ward (composition)", ["beds are deleted", "destroyed"]],
          ["The Patient objects still exist and can be assigned elsewhere (aggregation)", ["still exist", "patients"]],
        ],
      },
    ],
  }),

  multi({
    id: "ib_b3_046", unit: "B3", title: "B3.2 Design patterns in an online shop", spec: "B3.2.5", hl: true, cmd: "Explain", diff: "Moderate", level: "Exam-style",
    stem:
      "An online shop is being redesigned. It has a single shopping-basket service used by every page, customers can ask to be notified when an item is back in stock, and payments can be made by card, voucher or bank transfer.",
    parts: [
      {
        label: "(a)", q: "Identify the design pattern that ensures only one basket service object exists.", marks: 1,
        points: [["Singleton", ["singleton"]]],
      },
      {
        label: "(b)", q: "Explain how the observer pattern could be used to notify customers when an item is back in stock.", marks: 4,
        points: [
          ["The Item (subject) keeps a list of observers (customers/notifiers)", ["subject", "list of observers"]],
          ["Customers subscribe/register with the item", ["subscribe", "register"]],
          ["When stock changes from 0 the item calls a notify/update method on each observer", ["notify", "update"]],
          ["The item does not need to know the details of each observer (loose coupling); observers can be added/removed at run time", ["loose coupling", "added", "removed"]],
        ],
      },
      {
        label: "(c)", q: "Describe how the factory pattern could be used to create payment objects.", marks: 3,
        points: [
          ["A factory class/method receives the payment type (e.g. 'card')", ["factory", "type"]],
          ["It returns an object of the matching subclass (CardPayment, VoucherPayment…) of a common Payment class", ["subclass", "returns"]],
          ["Client code uses the common interface and does not name the concrete classes, so new payment types only change the factory", ["interface", "new payment"]],
        ],
      },
      {
        label: "(d)", q: "Outline one disadvantage of the singleton pattern.", marks: 2,
        points: [
          ["It acts like a global variable / hidden dependency", ["global", "hidden dependency"]],
          ["…making code harder to test (cannot easily substitute it) or causing problems when accessed concurrently", ["test", "concurren"]],
        ],
      },
    ],
  }),

  table({
    id: "ib_b3_047", unit: "B3", title: "B3.2 Trace polymorphic method calls", spec: "B3.2.2", hl: true, cmd: "Trace", diff: "Moderate", level: "Core",
    brief: "Complete the table to show, for each object in accs, the class whose month_end() method is executed and the value printed.",
    code:
      "class Account:\n    def __init__(self, b):\n        self.balance = b\n\n    def month_end(self):\n        return self.balance\n\nclass Savings(Account):\n    def month_end(self):\n        self.balance = self.balance * 1.1\n        return round(self.balance, 2)\n\nclass Current(Account):\n    def month_end(self):\n        self.balance = self.balance - 5\n        return self.balance\n\naccs = [Savings(100), Current(100), Account(100), Savings(50)]\nfor a in accs:\n    print(a.month_end())",
    marks: 4,
    columns: [
      { label: "Object" },
      { label: "Method executed in class", type: "select", options: ["Account", "Savings", "Current"] },
      { label: "Value printed" },
    ],
    rows: [
      ["=accs[0]", "Savings", "110.0|110"],
      ["=accs[1]", "Current", "95"],
      ["=accs[2]", "Account", "100"],
      ["=accs[3]", "Savings", "55.0|55"],
    ],
  }),

  inspect({
    id: "ib_b3_048", unit: "B3", title: "B3.2 Overriding: birds", spec: "B3.2.2", hl: true, cmd: "State", diff: "Easy", level: "Starter",
    brief: "Study the Python code and answer the questions.",
    code:
      'class Bird:\n    def move(self):\n        return "flies"\n\nclass Penguin(Bird):\n    def move(self):\n        return "swims"\n\nclass Parrot(Bird):\n    pass\n\nfor b in [Bird(), Penguin(), Parrot()]:\n    print(b.move())',
    marks: 4,
    qs: [
      { q: "Line 1 of output", a: ["flies"] },
      { q: "Line 2 of output", a: ["swims"] },
      { q: "Line 3 of output", a: ["flies"] },
      { q: "Identify the class that overrides move().", a: ["Penguin"] },
    ],
  }),

  multi({
    id: "ib_b3_049", unit: "B3", title: "B3.2 Staff hierarchy in a school", spec: "B3.2.1", hl: true, cmd: "Construct", diff: "Moderate", level: "Exam-style",
    stem: "A school system has the following parent class.",
    code:
      "class Staff:\n    def __init__(self, name, staff_id):\n        self.name = name\n        self.staff_id = staff_id\n\n    def describe(self):\n        return self.name + \" (\" + self.staff_id + \")\"",
    parts: [
      {
        label: "(a)", q: "Explain how inheritance promotes code reusability in this system.", marks: 3,
        points: [
          ["Subclasses (Teacher, Technician…) inherit the attributes and methods of Staff", ["inherit"]],
          ["Common code (name, staff_id, describe) is written once, so it is not duplicated", ["written once", "duplicat"]],
          ["Changes/fixes made in Staff automatically apply to every subclass; subclasses only add/extend what is different", ["automatically", "extend"]],
        ],
      },
      {
        label: "(b)", q: "Construct a subclass Teacher with an additional attribute subject, whose describe() returns the Staff description followed by \" teaches \" and the subject.", marks: 4,
        points: [
          ["class Teacher(Staff)", ["class Teacher(Staff)"]],
          ["Constructor calls super().__init__(name, staff_id)", ["super().__init__"]],
          ["Stores self.subject", ["self.subject"]],
          ["describe overridden, reusing super().describe()", ["super().describe()"]],
        ],
        exemplar:
          "class Teacher(Staff):\n    def __init__(self, name, staff_id, subject):\n        super().__init__(name, staff_id)\n        self.subject = subject\n\n    def describe(self):\n        return super().describe() + \" teaches \" + self.subject",
      },
      {
        label: "(c)", q: "State the output of print(Teacher(\"Ms Lin\", \"T07\", \"Physics\").describe()).", marks: 1,
        points: [["Ms Lin (T07) teaches Physics", ["Ms Lin (T07) teaches Physics"]]],
      },
    ],
  }),

  inspect({
    id: "ib_b3_050", unit: "B3", title: "B3.2 isinstance and method lookup", spec: "B3.2.1", hl: true, cmd: "State", diff: "Moderate", level: "Exam-style",
    brief: "Study the Python code and state each line of output.",
    code:
      'class A:\n    def who(self):\n        return "A"\n\n    def greet(self):\n        return "Hi from " + self.who()\n\nclass B(A):\n    def who(self):\n        return "B"\n\nclass C(B):\n    def greet(self):\n        return super().greet() + "!"\n\nprint(B().greet())\nprint(C().greet())\nprint(isinstance(C(), A))\nprint(issubclass(A, B))',
    marks: 4,
    qs: [
      { q: "Line 1 of output", a: ["Hi from B"] },
      { q: "Line 2 of output", a: ["Hi from B!"] },
      { q: "Line 3 of output", a: ["True"] },
      { q: "Line 4 of output", a: ["False"] },
    ],
  }),
  // =====================================================================
  // B4.1 Abstract data types (HL only): ADTs and linked lists
  // =====================================================================
  multi({
    id: "ib_b4_001", unit: "B4", title: "B4.1 Purpose of abstract data types", spec: "B4.1.1", hl: true, cmd: "Explain", diff: "Moderate", level: "Exam-style",
    stem:
      "A games company has several teams. One team writes a Leaderboard ADT with the operations add_score(name, score), top(n) and remove(name). Other teams use the leaderboard in their games.",
    parts: [
      {
        label: "(a)", q: "Define the term abstract data type (ADT).", marks: 2,
        points: [
          ["A logical description of a data type in terms of the data it holds and the operations that can be performed on it", ["operations", "logical description"]],
          ["…which does not specify how it is implemented", ["implementation", "not specify how"]],
        ],
      },
      {
        label: "(b)", q: "Explain two benefits to the company of providing the leaderboard as an ADT.", marks: 4,
        points: [
          ["Other teams only need to know the operations (interface), not the implementation details", ["interface", "only need to know"]],
          ["…so they can use it more easily and with fewer errors (abstraction reduces complexity)", ["complexity", "fewer errors"]],
          ["The implementation (e.g. list → BST → hash table) can be changed without changing the games that use it", ["changed without", "implementation"]],
          ["…this supports modularity / independent development and testing / code reuse", ["modular", "reuse", "testing"]],
        ],
      },
    ],
  }),

  mcq({
    id: "ib_b4_002", unit: "B4", title: "B4.1 ADT basics", spec: "B4.1.1", hl: true, cmd: "Identify", diff: "Easy", level: "Starter",
    brief: "Answer the following questions about abstract data types.",
    qs: [
      {
        q: "Which statement best describes an abstract data type?",
        options: [
          "A type defined by its values and operations, independent of how it is implemented",
          "A type that can only store abstract classes",
          "A built-in primitive type such as int or float",
          "A data structure that is always stored in secondary storage",
        ],
        a: 0,
      },
      { q: "Which ADT stores unique elements with no defined order?", options: ["Queue", "Stack", "Set", "Linked list"], a: 2 },
      {
        q: "Which element does pop() return from a stack?",
        options: ["The first element added", "The most recently added element", "The smallest element", "A random element"],
        a: 1,
      },
      { q: "Python's dict type is implemented internally as a…", options: ["binary search tree", "singly linked list", "sorted array", "hash table"], a: 3 },
    ],
  }),

  theory({
    id: "ib_b4_003", unit: "B4", title: "B4.1 Evaluate linked lists for a text editor", spec: "B4.1.2", hl: true, cmd: "Evaluate", diff: "Hard", level: "Exam-style",
    brief:
      "A text editor stores each line of a document as an element of a data structure. Users frequently insert and delete lines in the middle of long documents, and also jump directly to a line number.\n\nEvaluate the use of a linked list rather than an array to store the lines.",
    marks: 6,
    bands: BANDS6,
    points: [
      ["Insertion/deletion in a linked list only changes pointers (O(1) once the position is found); an array must shift elements (O(n))", ["pointers", "shift", "O(1)"]],
      ["A linked list grows and shrinks dynamically; no need to allocate a fixed size or resize/copy an array", ["dynamic", "resize"]],
      ["Memory is allocated per node so there is no wasted unused capacity", ["memory", "capacity"]],
      ["Each node needs extra memory for pointer(s), more for a doubly linked list", ["extra memory", "pointer"]],
      ["Jumping to line n requires traversal from the head: O(n), whereas an array gives O(1) direct (random) access by index", ["traversal", "random access", "index"]],
      ["Nodes are not contiguous in memory, so caching is less efficient", ["contiguous", "cache"]],
      ["A doubly linked list helps moving up/down lines from the cursor position", ["doubly"]],
      ["Conclusion: frequent edits favour a linked list, but direct jumps favour an array; a justified judgement for this editor", ["conclusion"]],
    ],
  }),

  multi({
    id: "ib_b4_004", unit: "B4", title: "B4.1 Singly, doubly and circular lists", spec: "B4.1.2", hl: true, cmd: "Compare", diff: "Moderate", level: "Exam-style",
    stem: "A music app stores a playlist of songs as a linked list.",
    parts: [
      {
        label: "(a)", q: "Compare a singly linked list with a doubly linked list.", marks: 4,
        points: [
          ["Both are made of nodes holding data and pointer(s), accessed from the head by traversal", ["both", "nodes", "traversal"]],
          ["A singly linked list node has one pointer (next); a doubly linked list node has two (next and previous)", ["one pointer", "two pointers", "previous"]],
          ["A doubly linked list can be traversed in both directions; singly in one direction only", ["both directions"]],
          ["A doubly linked list uses more memory and needs more pointer updates on insertion/deletion", ["more memory", "more pointer updates"]],
        ],
      },
      {
        label: "(b)", q: "Outline how a circular linked list would support a 'repeat playlist' feature.", marks: 2,
        points: [
          ["The last node's next pointer points back to the first node (head)", ["last node", "head"]],
          ["So moving on from the last song automatically continues with the first song without a special case", ["automatically", "first song"]],
        ],
      },
    ],
  }),

  table({
    id: "ib_b4_005", unit: "B4", title: "B4.1 Linked list stored in arrays", spec: "B4.1.2", hl: true, cmd: "Trace", diff: "Easy", level: "Core",
    brief:
      "A linked list of names, kept in alphabetical order, is stored using two arrays: Data and Next. A Next value of -1 marks the end of the list, and Head stores the index of the first node.\n\nBefore: Head = 0\nIndex 0: Data = Ali, Next = 2\nIndex 1: Data = Zed, Next = -1\nIndex 2: Data = Kim, Next = 1\nIndex 3: free\n\nThe name Leo is inserted into index 3 so that the list stays in alphabetical order. Complete the table to show the arrays and Head after the insertion.",
    marks: 3,
    columns: [{ label: "Index" }, { label: "Data" }, { label: "Next" }],
    rows: [
      ["=0", "=Ali", "2"],
      ["=1", "=Zed", "-1"],
      ["=2", "=Kim", "3"],
      ["=3", "Leo", "1"],
      ["=Head", "=", "0"],
    ],
  }),

  inspect({
    id: "ib_b4_006", unit: "B4", title: "B4.1 Traversing an array-based list", spec: "B4.1.2", hl: true, cmd: "State", diff: "Moderate", level: "Core",
    brief: "A linked list is stored in two arrays. A Next value of -1 marks the end of the list. Answer the questions.",
    code: 'Index:   0    1    2    3    4\nData:   "P"  "Q"  "R"  "S"  "T"\nNext:    3   -1    4    1    0\nhead = 2',
    marks: 4,
    qs: [
      { q: "State the data values in the order a traversal visits them (letters only, no spaces).", a: ["RTPSQ", "R T P S Q", "R, T, P, S, Q", "R,T,P,S,Q"] },
      { q: "State the data value in the last node.", a: ["Q"] },
      { q: "State how many nodes are visited before the node containing S is reached.", a: ["3"] },
      { q: "If Next[1] were changed from -1 to 2, state the type of linked list that would be formed.", a: ["circular", "circular linked list", "a circular linked list"] },
    ],
  }),

  code({
    id: "ib_b4_007", unit: "B4", title: "B4.1 Build and traverse a singly linked list", spec: "B4.1.3", hl: true, cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'Construct a singly linked list without using a Python list to store the values.\n• class Node with attributes data and next\n• class LinkedList with a head attribute and methods append(value) (adds at the end), length() (counts nodes by traversal) and display(), which returns the values joined by " -> ", or "empty".\n\nThe main program reads input("How many values? ") and then that many integers with input("Value: "), appending each. It prints display() and then Length: <length()>.\n\nExample (inputs 3, 3, 5, 7):\n3 -> 5 -> 7\nLength: 3',
    marks: 4,
    starter:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n    # append, length, display\n\n\nn = int(input("How many values? "))\n',
    solution:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n    def append(self, value):\n        node = Node(value)\n        if self.head is None:\n            self.head = node\n            return\n        cur = self.head\n        while cur.next is not None:\n            cur = cur.next\n        cur.next = node\n\n    def length(self):\n        count = 0\n        cur = self.head\n        while cur is not None:\n            count += 1\n            cur = cur.next\n        return count\n\n    def display(self):\n        if self.head is None:\n            return "empty"\n        out = str(self.head.data)\n        cur = self.head.next\n        while cur is not None:\n            out += " -> " + str(cur.data)\n            cur = cur.next\n        return out\n\n\nn = int(input("How many values? "))\nll = LinkedList()\nfor i in range(n):\n    ll.append(int(input("Value: ")))\nprint(ll.display())\nprint("Length:", ll.length())\n',
    tests: [
      { in: ["3", "3", "5", "7"], out: "3 -> 5 -> 7\nLength: 3", m: 1 },
      { in: ["1", "42"], out: "42\nLength: 1", m: 1 },
      { in: ["0"], out: "empty\nLength: 0", m: 1 },
      { in: ["4", "1", "1", "2", "1"], out: "1 -> 1 -> 2 -> 1\nLength: 4", m: 1 },
    ],
    points: [
      ["append handles the empty list by setting head", ["self.head = node"]],
      ["append traverses to the last node and links the new node", ["cur.next = node"]],
      ["length counts nodes by following next pointers until None", ["cur = cur.next"]],
      ["display builds the required format, including empty", ["empty", " -> "]],
    ],
  }),

  code({
    id: "ib_b4_008", unit: "B4", title: "B4.1 Ordered insertion in a linked list", spec: "B4.1.3", hl: true, cmd: "Construct", diff: "Moderate", level: "Exam-style",
    brief:
      'Construct a singly linked list class SortedList with a method insert(value) that places each new node in ascending order (equal values go after existing equal values). Do not sort a Python list.\n\nThe main program reads one line of space-separated integers with input("Values: "), inserts each one in turn, and prints the list with values joined by " -> ".\n\nExample (input 5 1 9 3):\n1 -> 3 -> 5 -> 9',
    marks: 4,
    starter:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass SortedList:\n    def __init__(self):\n        self.head = None\n\n    def insert(self, value):\n        pass\n\n\nvalues = [int(x) for x in input("Values: ").split()]\n',
    solution:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass SortedList:\n    def __init__(self):\n        self.head = None\n\n    def insert(self, value):\n        node = Node(value)\n        if self.head is None or value < self.head.data:\n            node.next = self.head\n            self.head = node\n            return\n        cur = self.head\n        while cur.next is not None and cur.next.data <= value:\n            cur = cur.next\n        node.next = cur.next\n        cur.next = node\n\n    def display(self):\n        parts = []\n        cur = self.head\n        while cur is not None:\n            parts.append(str(cur.data))\n            cur = cur.next\n        return " -> ".join(parts)\n\n\nvalues = [int(x) for x in input("Values: ").split()]\nsl = SortedList()\nfor v in values:\n    sl.insert(v)\nprint(sl.display())\n',
    tests: [
      { in: ["5 1 9 3"], out: "1 -> 3 -> 5 -> 9", m: 1 },
      { in: ["7"], out: "7", m: 1 },
      { in: ["4 4 2 8 2"], out: "2 -> 2 -> 4 -> 4 -> 8", m: 1 },
      { in: ["10 9 8"], out: "8 -> 9 -> 10", m: 1 },
    ],
    points: [
      ["Insertion before the head (empty list or smallest value) updates head", ["self.head = node"]],
      ["Traversal stops at the correct position using cur.next", ["cur.next.data <= value"]],
      ["New node linked in: node.next = cur.next", ["node.next = cur.next"]],
      ["Previous node linked to new node: cur.next = node", ["cur.next = node"]],
    ],
  }),

  code({
    id: "ib_b4_009", unit: "B4", title: "B4.1 Deleting from a linked list", spec: "B4.1.3", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Construct a singly linked list with append(value), display() (values joined by " -> ", or "empty") and delete(value), which removes the first node holding value and returns True, or returns False if the value is not found. Your delete must handle the head node correctly.\n\nThe main program reads space-separated integers with input("Values: ") and appends them in order, then reads input("Delete: "). It prints Deleted <value> or <value> not found, then the list.\n\nExample (inputs 4 8 15, 4):\nDeleted 4\n8 -> 15',
    marks: 5,
    starter:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntarget = int(input("Delete: "))\n',
    solution:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n\n    def append(self, value):\n        node = Node(value)\n        if self.head is None:\n            self.head = node\n        else:\n            self.tail.next = node\n        self.tail = node\n\n    def delete(self, value):\n        prev = None\n        cur = self.head\n        while cur is not None and cur.data != value:\n            prev = cur\n            cur = cur.next\n        if cur is None:\n            return False\n        if prev is None:\n            self.head = cur.next\n        else:\n            prev.next = cur.next\n        if cur is self.tail:\n            self.tail = prev\n        return True\n\n    def display(self):\n        if self.head is None:\n            return "empty"\n        parts = []\n        cur = self.head\n        while cur is not None:\n            parts.append(str(cur.data))\n            cur = cur.next\n        return " -> ".join(parts)\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntarget = int(input("Delete: "))\nll = LinkedList()\nfor v in values:\n    ll.append(v)\nif ll.delete(target):\n    print("Deleted", target)\nelse:\n    print(target, "not found")\nprint(ll.display())\n',
    tests: [
      { in: ["4 8 15 16", "15"], out: "Deleted 15\n4 -> 8 -> 16", m: 1 },
      { in: ["4 8 15", "4"], out: "Deleted 4\n8 -> 15", m: 2 },
      { in: ["4 8", "9"], out: "9 not found\n4 -> 8", m: 1 },
      { in: ["6", "6"], out: "Deleted 6\nempty", m: 1 },
    ],
    points: [
      ["Traverses with a previous pointer until the value or the end is found", ["prev = cur"]],
      ["Returns False when the value is not found", ["return False"]],
      ["Deleting the head updates head", ["self.head = cur.next"]],
      ["Deleting another node bypasses it: prev.next = cur.next", ["prev.next = cur.next"]],
      ["Output messages and list in the required format", ["not found"]],
    ],
  }),

  code({
    id: "ib_b4_010", unit: "B4", title: "B4.1 Searching a linked list", spec: "B4.1.3", hl: true, cmd: "Construct", diff: "Easy", level: "Core",
    brief:
      'Construct a singly linked list with append(value) and search(value). search returns a pair (position, checked): position is the 1-based position of the first matching node or 0 if not found, and checked is the number of nodes examined.\n\nThe main program reads space-separated integers with input("Values: "), appends them, then reads input("Search: "). It prints Found at position <p> or Not found, followed by Nodes checked: <checked>.\n\nExample (inputs 3 9 12 9, 9):\nFound at position 2\nNodes checked: 2',
    marks: 3,
    starter:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntarget = int(input("Search: "))\n',
    solution:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n    def append(self, value):\n        node = Node(value)\n        if self.head is None:\n            self.head = node\n            return\n        cur = self.head\n        while cur.next is not None:\n            cur = cur.next\n        cur.next = node\n\n    def search(self, value):\n        checked = 0\n        cur = self.head\n        while cur is not None:\n            checked += 1\n            if cur.data == value:\n                return checked, checked\n            cur = cur.next\n        return 0, checked\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntarget = int(input("Search: "))\nll = LinkedList()\nfor v in values:\n    ll.append(v)\npos, checked = ll.search(target)\nif pos > 0:\n    print("Found at position", pos)\nelse:\n    print("Not found")\nprint("Nodes checked:", checked)\n',
    tests: [
      { in: ["3 9 12 9", "9"], out: "Found at position 2\nNodes checked: 2", m: 1 },
      { in: ["3 9 12", "5"], out: "Not found\nNodes checked: 3", m: 1 },
      { in: ["7", "7"], out: "Found at position 1\nNodes checked: 1", m: 1 },
    ],
    points: [
      ["Linear traversal from head following next pointers", ["cur = cur.next"]],
      ["Stops at the first match and returns its position", ["return"]],
      ["Counts the nodes examined, including when not found", ["checked += 1"]],
    ],
  }),

  code({
    id: "ib_b4_011", unit: "B4", title: "B4.1 Doubly linked list removal", spec: "B4.1.3", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Construct a doubly linked list with head and tail pointers. Each node has data, prev and next.\n• append(value) adds a node at the tail\n• remove(value) removes the first node holding value, correctly updating head and/or tail where needed\n• forward() and backward() return the values joined by " <-> " (backward starts at the tail and follows prev pointers), or "empty".\n\nThe main program reads space-separated words with input("Values: "), appends them, reads input("Remove: ") and removes that word if present (if absent, nothing changes). It then prints forward() and backward().\n\nExample (inputs a b c d, c):\na <-> b <-> d\nd <-> b <-> a',
    marks: 5,
    starter:
      'class DNode:\n    def __init__(self, data):\n        self.data = data\n        self.prev = None\n        self.next = None\n\n\nclass DoublyLinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n\n\nwords = input("Values: ").split()\ntarget = input("Remove: ")\n',
    solution:
      'class DNode:\n    def __init__(self, data):\n        self.data = data\n        self.prev = None\n        self.next = None\n\n\nclass DoublyLinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n\n    def append(self, value):\n        node = DNode(value)\n        if self.tail is None:\n            self.head = node\n            self.tail = node\n        else:\n            node.prev = self.tail\n            self.tail.next = node\n            self.tail = node\n\n    def remove(self, value):\n        cur = self.head\n        while cur is not None and cur.data != value:\n            cur = cur.next\n        if cur is None:\n            return False\n        if cur.prev is None:\n            self.head = cur.next\n        else:\n            cur.prev.next = cur.next\n        if cur.next is None:\n            self.tail = cur.prev\n        else:\n            cur.next.prev = cur.prev\n        return True\n\n    def forward(self):\n        parts = []\n        cur = self.head\n        while cur is not None:\n            parts.append(cur.data)\n            cur = cur.next\n        return " <-> ".join(parts) if parts else "empty"\n\n    def backward(self):\n        parts = []\n        cur = self.tail\n        while cur is not None:\n            parts.append(cur.data)\n            cur = cur.prev\n        return " <-> ".join(parts) if parts else "empty"\n\n\nwords = input("Values: ").split()\ntarget = input("Remove: ")\ndll = DoublyLinkedList()\nfor w in words:\n    dll.append(w)\ndll.remove(target)\nprint(dll.forward())\nprint(dll.backward())\n',
    tests: [
      { in: ["a b c d", "c"], out: "a <-> b <-> d\nd <-> b <-> a", m: 1 },
      { in: ["a b c", "a"], out: "b <-> c\nc <-> b", m: 1 },
      { in: ["a b c", "c"], out: "a <-> b\nb <-> a", m: 1 },
      { in: ["x", "x"], out: "empty\nempty", m: 1 },
      { in: ["p q", "z"], out: "p <-> q\nq <-> p", m: 1 },
    ],
    points: [
      ["append links new node both ways and updates tail", ["node.prev = self.tail", "self.tail.next = node"]],
      ["remove updates the previous node's next (or head)", ["cur.prev.next = cur.next", "self.head = cur.next"]],
      ["remove updates the next node's prev (or tail)", ["cur.next.prev = cur.prev", "self.tail = cur.prev"]],
      ["backward traverses from tail using prev", ["cur = cur.prev"]],
      ["Handles value not present and list becoming empty", ["empty"]],
    ],
  }),

  code({
    id: "ib_b4_012", unit: "B4", title: "B4.1 Circular list: elimination game", spec: "B4.1.3", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Players sit in a circle. Starting with the first player, count k players clockwise (the first player counted is 1); the k-th player leaves. Counting restarts with the next player. This repeats until one player remains.\n\nConstruct a circular singly linked list of names (the last node points back to the first) and use it to run the game; do not use list indexing to simulate the circle.\n\nThe main program reads space-separated names with input("Names: ") and k with input("Step: "). It prints Out: <name> for each player in the order they leave, then Winner: <name>.\n\nExample (inputs A B C D E, 2):\nOut: B\nOut: D\nOut: A\nOut: E\nWinner: C',
    marks: 5,
    starter:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nnames = input("Names: ").split()\nk = int(input("Step: "))\n# build the circular list, then play the game\n',
    solution:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass CircularList:\n    def __init__(self):\n        self.tail = None\n        self.size = 0\n\n    def append(self, value):\n        node = Node(value)\n        if self.tail is None:\n            node.next = node\n        else:\n            node.next = self.tail.next\n            self.tail.next = node\n        self.tail = node\n        self.size += 1\n\n\nnames = input("Names: ").split()\nk = int(input("Step: "))\ncircle = CircularList()\nfor nm in names:\n    circle.append(nm)\nprev = circle.tail\ncur = circle.tail.next\nwhile circle.size > 1:\n    for i in range(k - 1):\n        prev = cur\n        cur = cur.next\n    print("Out:", cur.data)\n    prev.next = cur.next\n    cur = cur.next\n    circle.size -= 1\nprint("Winner:", cur.data)\n',
    tests: [
      { in: ["A B C D E", "2"], out: "Out: B\nOut: D\nOut: A\nOut: E\nWinner: C", m: 1 },
      { in: ["A B C", "1"], out: "Out: A\nOut: B\nWinner: C", m: 1 },
      { in: ["Kai Lu Mo Ned", "3"], out: "Out: Mo\nOut: Lu\nOut: Ned\nWinner: Kai", m: 2 },
      { in: ["Solo", "5"], out: "Winner: Solo", m: 1 },
    ],
    points: [
      ["Last node's next points back to the first node", ["node.next = node", "self.tail.next = node"]],
      ["Counting moves k-1 steps keeping a previous pointer", ["range(k - 1)"]],
      ["Removal by bypassing the node: prev.next = cur.next", ["prev.next = cur.next"]],
      ["Loop continues until one node remains", ["size > 1"]],
      ["Correct output order and winner", ["Winner"]],
    ],
  }),

  code({
    id: "ib_b4_013", unit: "B4", title: "B4.1 Stack ADT using a linked list", spec: "B4.1.1", hl: true, cmd: "Construct", diff: "Easy", level: "Core",
    brief:
      'Implement a stack ADT using linked nodes (the top of the stack is the head node). Provide push(value), pop() and peek(), where pop and peek return None when the stack is empty, plus a size attribute.\n\nThe main program repeatedly reads input("Command: ") until END:\n• PUSH x pushes x\n• POP prints the removed value, or Stack empty\n• PEEK prints the top value, or Stack empty.\nFinally it prints Size: <size>.\n\nExample (inputs PUSH 5, PUSH 9, POP, PEEK, END):\n9\n5\nSize: 1',
    marks: 4,
    starter:
      'class Node:\n    def __init__(self, data, next_node=None):\n        self.data = data\n        self.next = next_node\n\n\nclass Stack:\n    def __init__(self):\n        self.top = None\n        self.size = 0\n\n\ncommand = input("Command: ")\n',
    solution:
      'class Node:\n    def __init__(self, data, next_node=None):\n        self.data = data\n        self.next = next_node\n\n\nclass Stack:\n    def __init__(self):\n        self.top = None\n        self.size = 0\n\n    def push(self, value):\n        self.top = Node(value, self.top)\n        self.size += 1\n\n    def pop(self):\n        if self.top is None:\n            return None\n        value = self.top.data\n        self.top = self.top.next\n        self.size -= 1\n        return value\n\n    def peek(self):\n        if self.top is None:\n            return None\n        return self.top.data\n\n\ns = Stack()\ncommand = input("Command: ")\nwhile command != "END":\n    parts = command.split()\n    if parts[0] == "PUSH":\n        s.push(parts[1])\n    else:\n        v = s.pop() if parts[0] == "POP" else s.peek()\n        print("Stack empty" if v is None else v)\n    command = input("Command: ")\nprint("Size:", s.size)\n',
    tests: [
      { in: ["PUSH 5", "PUSH 9", "POP", "PEEK", "END"], out: "9\n5\nSize: 1", m: 1 },
      { in: ["POP", "PUSH 1", "END"], out: "Stack empty\nSize: 1", m: 1 },
      { in: ["PUSH 2", "PUSH 3", "PUSH 4", "POP", "POP", "POP", "POP", "PEEK", "END"], out: "4\n3\n2\nStack empty\nStack empty\nSize: 0", m: 2 },
    ],
    points: [
      ["push creates a node that points to the old top", ["Node(value, self.top)"]],
      ["pop removes the top node and returns its data", ["self.top = self.top.next"]],
      ["Empty stack handled for pop and peek", ["Stack empty"]],
      ["Size maintained", ["self.size"]],
    ],
  }),

  code({
    id: "ib_b4_014", unit: "B4", title: "B4.1 Queue ADT using a linked list", spec: "B4.1.1", hl: true, cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'Implement a queue ADT using linked nodes with front and rear pointers. enqueue adds at the rear and dequeue removes from the front (returning None if the queue is empty). Remember to reset rear when the queue becomes empty.\n\nThe main program repeatedly reads input("Command: ") until END:\n• JOIN name enqueues name\n• SERVE dequeues and prints Serving <name>, or Queue empty.\nFinally it prints Waiting: followed by the waiting names from front to rear joined by ", ", or Waiting: none.\n\nExample (inputs JOIN Amy, JOIN Ben, SERVE, JOIN Cal, END):\nServing Amy\nWaiting: Ben, Cal',
    marks: 4,
    starter:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass Queue:\n    def __init__(self):\n        self.front = None\n        self.rear = None\n\n\ncommand = input("Command: ")\n',
    solution:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\n\nclass Queue:\n    def __init__(self):\n        self.front = None\n        self.rear = None\n\n    def enqueue(self, value):\n        node = Node(value)\n        if self.rear is None:\n            self.front = node\n        else:\n            self.rear.next = node\n        self.rear = node\n\n    def dequeue(self):\n        if self.front is None:\n            return None\n        value = self.front.data\n        self.front = self.front.next\n        if self.front is None:\n            self.rear = None\n        return value\n\n    def items(self):\n        out = []\n        cur = self.front\n        while cur is not None:\n            out.append(cur.data)\n            cur = cur.next\n        return out\n\n\nq = Queue()\ncommand = input("Command: ")\nwhile command != "END":\n    parts = command.split()\n    if parts[0] == "JOIN":\n        q.enqueue(parts[1])\n    elif parts[0] == "SERVE":\n        v = q.dequeue()\n        print("Queue empty" if v is None else "Serving " + v)\n    command = input("Command: ")\nwaiting = q.items()\nprint("Waiting:", ", ".join(waiting) if waiting else "none")\n',
    tests: [
      { in: ["JOIN Amy", "JOIN Ben", "SERVE", "JOIN Cal", "END"], out: "Serving Amy\nWaiting: Ben, Cal", m: 1 },
      { in: ["SERVE", "END"], out: "Queue empty\nWaiting: none", m: 1 },
      { in: ["JOIN Xi", "SERVE", "SERVE", "JOIN Yu", "END"], out: "Serving Xi\nQueue empty\nWaiting: Yu", m: 2 },
    ],
    points: [
      ["enqueue links the new node after rear (or sets front when empty)", ["self.rear.next = node"]],
      ["dequeue removes from front and returns the data", ["self.front = self.front.next"]],
      ["rear reset to None when the queue empties", ["self.rear = None"]],
      ["Waiting list printed front to rear", ["Waiting"]],
    ],
  }),

  inspect({
    id: "ib_b4_015", unit: "B4", title: "B4.1 Pointer changes in a doubly linked list", spec: "B4.1.2", hl: true, cmd: "State", diff: "Easy", level: "Core",
    brief:
      "A doubly linked list contains three nodes: A <-> B <-> C, where A is the head and C is the tail. Write node names, or None for a null pointer.",
    marks: 5,
    qs: [
      { q: "Node B is deleted. State the node that A.next now points to.", a: ["C"] },
      { q: "After deleting B, state the node that C.prev now points to.", a: ["A"] },
      { q: "State the number of pointer assignments needed to unlink a node from the middle of a doubly linked list.", a: ["2", "two"] },
      { q: "Starting again from A <-> B <-> C, node A is deleted. State the node that becomes the head.", a: ["B"] },
      { q: "After deleting A, state the value of B.prev.", a: ["None", "null", "nil"] },
    ],
  }),

  mcq({
    id: "ib_b4_016", unit: "B4", title: "B4.1 Linked list efficiency", spec: "B4.1.2", hl: true, cmd: "Identify", diff: "Easy", level: "Core",
    brief: "Answer the following questions on the performance of linked lists. n is the number of nodes.",
    qs: [
      { q: "What is the time complexity of accessing the k-th element of a singly linked list?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], a: 2 },
      { q: "What is the time complexity of inserting a new node at the head of a singly linked list?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], a: 0 },
      {
        q: "Which is a disadvantage of a linked list compared with an array?",
        options: [
          "It cannot grow at run time",
          "Insertion always requires shifting elements",
          "It can only store integers",
          "Each node needs extra memory for one or more pointers",
        ],
        a: 3,
      },
      {
        q: "In a circular singly linked list, the next pointer of the last node…",
        options: ["is null", "points to the head node", "points to itself", "points to the previous node"],
        a: 1,
      },
    ],
  }),

  table({
    id: "ib_b4_017", unit: "B4", title: "B4.1 Trace linked list operations", spec: "B4.1.3", hl: true, cmd: "Trace", diff: "Moderate", level: "Core",
    brief:
      "A singly linked list is empty. The operations below are carried out in order. Complete the table to show the contents of the list (from head, written like 7 -> 4) and the data in the head node after each operation.",
    marks: 5,
    columns: [{ label: "Operation" }, { label: "List after the operation" }, { label: "Head data" }],
    rows: [
      ["=insert_front(4)", "4", "4"],
      ["=insert_front(7)", "7 -> 4|7->4|7, 4|7 4|7,4", "7"],
      ["=append(2)", "7 -> 4 -> 2|7->4->2|7, 4, 2|7 4 2|7,4,2", "7"],
      ["=delete(7)", "4 -> 2|4->2|4, 2|4 2|4,2", "4"],
      ["=insert_front(9)", "9 -> 4 -> 2|9->4->2|9, 4, 2|9 4 2|9,4,2", "9"],
    ],
  }),

  inspect({
    id: "ib_b4_018", unit: "B4", title: "B4.1 Traversing a circular list", spec: "B4.1.3", hl: true, cmd: "State", diff: "Moderate", level: "Exam-style",
    brief: "Study the Python code and answer the questions.",
    code:
      'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\na, b, c, d = Node("W"), Node("X"), Node("Y"), Node("Z")\na.next = b\nb.next = c\nc.next = d\nd.next = a\n\ncur = c\nout = ""\nfor i in range(6):\n    out += cur.data\n    cur = cur.next\nprint(out)\n\ncur = a\ncount = 0\nwhile True:\n    count += 1\n    cur = cur.next\n    if cur is a:\n        break\nprint(count)',
    marks: 3,
    qs: [
      { q: "State the first line of output.", a: ["YZWXYZ"] },
      { q: "State the second line of output.", a: ["4"] },
      {
        q: "The while loop is replaced by: while cur is not None: count += 1; cur = cur.next. State what happens.",
        a: ["infinite loop", "it loops forever", "loops forever", "never terminates", "it never stops", "runs forever", "the loop never ends"],
      },
    ],
  }),

  multi({
    id: "ib_b4_019", unit: "B4", title: "B4.1 Music playlist as a doubly linked list", spec: "B4.1.3", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    stem:
      "A music player stores the current playlist as a doubly linked list of Song nodes. Each node has the attributes title, prev and next. The playlist object has head and tail pointers. Users press 'next' and 'previous' and can add a song straight after the one currently playing.",
    parts: [
      {
        label: "(a)", q: "State why a doubly linked list is suitable for this player.", marks: 2,
        points: [
          ["Each node has a prev pointer as well as next", ["prev pointer"]],
          ["So both 'next' and 'previous' are O(1) moves from the current node, with no traversal from the head", ["previous", "O(1)", "no traversal"]],
        ],
      },
      {
        label: "(b)", q: "Construct a method insert_after(self, current, title) that inserts a new song immediately after the node current, updating tail if necessary.", marks: 4,
        points: [
          ["Creates a new node and sets new.prev = current and new.next = current.next", ["new.prev = current", "new.next = current.next"]],
          ["If current.next exists, its prev is set to the new node", ["current.next.prev = new"]],
          ["Otherwise (current was the tail) tail is updated to the new node", ["self.tail = new"]],
          ["current.next set to the new node (in the correct order)", ["current.next = new"]],
        ],
        exemplar:
          "def insert_after(self, current, title):\n    new = Song(title)\n    new.prev = current\n    new.next = current.next\n    if current.next is not None:\n        current.next.prev = new\n    else:\n        self.tail = new\n    current.next = new",
      },
      {
        label: "(c)", q: "Outline how the playlist could be changed so that 'repeat all' works without a special case at the end.", marks: 2,
        points: [
          ["Make it circular: tail.next points to head", ["tail.next", "circular"]],
          ["and head.prev points to tail, so next/previous wrap around automatically", ["head.prev", "wrap"]],
        ],
      },
      {
        label: "(d)", q: "Outline one disadvantage of using a linked list rather than an array for the playlist.", marks: 2,
        points: [
          ["Jumping to the song at position n needs traversal (O(n)) instead of direct indexing", ["traversal", "index"]],
          ["Each node uses extra memory for two pointers", ["extra memory", "pointers"]],
        ],
      },
    ],
  }),

  multi({
    id: "ib_b4_020", unit: "B4", title: "B4.1 Faulty linked list deletion", spec: "B4.1.3", hl: true, cmd: "Identify", diff: "Hard", level: "Exam-style",
    stem: "The method below is meant to remove the first node containing value from a singly linked list.",
    code:
      "def delete(self, value):\n    prev = self.head\n    cur = self.head.next\n    while cur is not None:\n        if cur.data == value:\n            prev.next = cur.next\n            return True\n        prev = cur\n        cur = cur.next\n    return False",
    parts: [
      {
        label: "(a)", q: "The list is 3 -> 8 -> 5 -> 8. State the list after delete(8) is called.", marks: 1,
        points: [["3 -> 5 -> 8", ["3 -> 5 -> 8", "3, 5, 8"]]],
      },
      {
        label: "(b)", q: "Identify two situations in which the method does not work correctly.", marks: 2,
        points: [
          ["When the value is in the head node it is never checked / never deleted", ["head"]],
          ["When the list is empty (head is None), self.head.next causes an error (AttributeError)", ["empty", "AttributeError"]],
        ],
      },
      {
        label: "(c)", q: "Construct a corrected version of the method.", marks: 4,
        points: [
          ["Handles an empty list (returns False)", ["is None", "return False"]],
          ["Checks the head and updates self.head = self.head.next when it matches", ["self.head = self.head.next"]],
          ["Traverses with prev/cur pointers", ["prev = cur"]],
          ["Bypasses the matching node and returns True", ["prev.next = cur.next"]],
        ],
        exemplar:
          "def delete(self, value):\n    if self.head is None:\n        return False\n    if self.head.data == value:\n        self.head = self.head.next\n        return True\n    prev = self.head\n    cur = self.head.next\n    while cur is not None:\n        if cur.data == value:\n            prev.next = cur.next\n            return True\n        prev = cur\n        cur = cur.next\n    return False",
      },
    ],
  }),
  // =====================================================================
  // B4.1 Binary search trees
  // =====================================================================
  multi({
    id: "ib_b4_021", unit: "B4", title: "B4.1 Structure and properties of a BST", spec: "B4.1.4", hl: true, cmd: "Explain", diff: "Moderate", level: "Exam-style",
    stem: "A sports club stores member numbers in a binary search tree (BST) so that members can be found quickly.",
    parts: [
      {
        label: "(a)", q: "Describe the structure of a BST.", marks: 3,
        points: [
          ["Made of nodes, each with a key/data and up to two child pointers (left and right)", ["left", "right", "two children"]],
          ["The top node is the root; nodes with no children are leaves", ["root", "leaf"]],
          ["Every key in a node's left subtree is less than the node's key and every key in the right subtree is greater", ["left subtree", "less", "greater"]],
        ],
      },
      {
        label: "(b)", q: "Explain why searching a balanced BST is faster than searching an unordered linked list.", marks: 3,
        points: [
          ["At each node one comparison decides whether to go left or right", ["comparison", "left or right"]],
          ["…so half of the remaining tree is discarded at each step", ["half", "discard"]],
          ["Search is O(log n) for a balanced BST compared with O(n) linear search of a linked list", ["O(log n)", "O(n)"]],
        ],
      },
      {
        label: "(c)", q: "State the effect on search performance if members are inserted in ascending order of member number.", marks: 2,
        points: [
          ["The tree becomes unbalanced/degenerate: every node has only a right child, like a linked list", ["degenerate", "unbalanced", "linked list"]],
          ["Search becomes O(n)", ["O(n)"]],
        ],
      },
    ],
  }),

  table({
    id: "ib_b4_022", unit: "B4", title: "B4.1 Building a BST", spec: "B4.1.4", hl: true, cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      "The following keys are inserted, in this order, into an empty binary search tree:\n50, 30, 70, 20, 40, 60, 80, 35\n\nComplete the table to describe the resulting tree. Write none where there is no parent or child.",
    marks: 6,
    columns: [{ label: "Node" }, { label: "Parent" }, { label: "Left child" }, { label: "Right child" }],
    rows: [
      ["=50", "=none", "30", "70"],
      ["=30", "50", "20", "40"],
      ["=70", "50", "60", "80"],
      ["=20", "30", "none|-|null", "none|-|null"],
      ["=40", "30", "35", "none|-|null"],
      ["=60", "70", "none|-|null", "none|-|null"],
      ["=80", "70", "none|-|null", "none|-|null"],
      ["=35", "40", "none|-|null", "none|-|null"],
    ],
  }),

  inspect({
    id: "ib_b4_023", unit: "B4", title: "B4.1 BST traversals", spec: "B4.1.4", hl: true, cmd: "State", diff: "Moderate", level: "Core",
    brief:
      "The keys 8, 3, 10, 1, 6, 14, 4, 7, 13 are inserted in this order into an empty binary search tree. Write traversal sequences with the keys separated by spaces.",
    marks: 4,
    qs: [
      { q: "State the in-order traversal.", a: seq(1, 3, 4, 6, 7, 8, 10, 13, 14) },
      { q: "State the pre-order traversal.", a: seq(8, 3, 1, 6, 4, 7, 10, 14, 13) },
      { q: "State the post-order traversal.", a: seq(1, 4, 7, 6, 3, 13, 14, 10, 8) },
      { q: "State the number of nodes compared when searching for 7.", a: ["4", "four"] },
    ],
  }),

  code({
    id: "ib_b4_024", unit: "B4", title: "B4.1 BST insert and traversals", spec: "B4.1.4", hl: true, cmd: "Construct", diff: "Moderate", level: "Core",
    brief:
      'Construct a binary search tree with a TreeNode class (key, left, right) and a BST class with insert(key) (duplicates are ignored), and recursive in_order() and pre_order() methods that return lists of keys.\n\nThe main program reads space-separated integers with input("Values: "), inserts them in order, and prints:\nIn-order: <keys separated by spaces>\nPre-order: <keys separated by spaces>\n\nExample (input 50 30 70 20 40):\nIn-order: 20 30 40 50 70\nPre-order: 50 30 20 40 70',
    marks: 4,
    starter:
      'class TreeNode:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n\nvalues = [int(x) for x in input("Values: ").split()]\n',
    solution:
      'class TreeNode:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n    def insert(self, key):\n        if self.root is None:\n            self.root = TreeNode(key)\n            return\n        cur = self.root\n        while True:\n            if key == cur.key:\n                return\n            if key < cur.key:\n                if cur.left is None:\n                    cur.left = TreeNode(key)\n                    return\n                cur = cur.left\n            else:\n                if cur.right is None:\n                    cur.right = TreeNode(key)\n                    return\n                cur = cur.right\n\n    def in_order(self, node="start"):\n        if node == "start":\n            node = self.root\n        if node is None:\n            return []\n        return self.in_order(node.left) + [node.key] + self.in_order(node.right)\n\n    def pre_order(self, node="start"):\n        if node == "start":\n            node = self.root\n        if node is None:\n            return []\n        return [node.key] + self.pre_order(node.left) + self.pre_order(node.right)\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntree = BST()\nfor v in values:\n    tree.insert(v)\nprint("In-order:", " ".join(str(k) for k in tree.in_order()))\nprint("Pre-order:", " ".join(str(k) for k in tree.pre_order()))\n',
    tests: [
      { in: ["50 30 70 20 40"], out: "In-order: 20 30 40 50 70\nPre-order: 50 30 20 40 70", m: 1 },
      { in: ["1 2 3"], out: "In-order: 1 2 3\nPre-order: 1 2 3", m: 1 },
      { in: ["5 3 5 8"], out: "In-order: 3 5 8\nPre-order: 5 3 8", m: 1 },
      { in: ["9"], out: "In-order: 9\nPre-order: 9", m: 1 },
    ],
    points: [
      ["insert compares keys and goes left if smaller, right if larger", ["key < cur.key"]],
      ["New node attached at an empty child position; duplicates ignored", ["cur.left = TreeNode(key)"]],
      ["in_order visits left subtree, node, right subtree recursively", ["in_order(node.left)"]],
      ["pre_order visits node, left subtree, right subtree recursively", ["pre_order(node.left)"]],
    ],
  }),

  code({
    id: "ib_b4_025", unit: "B4", title: "B4.1 BST search with comparison count", spec: "B4.1.4", hl: true, cmd: "Construct", diff: "Moderate", level: "Exam-style",
    brief:
      'Construct a BST (duplicates ignored) with a method search(key) that returns a pair (found, comparisons), where comparisons is the number of nodes whose key was compared with the target.\n\nThe main program reads space-separated integers with input("Values: "), inserts them in order, reads input("Search: ") and prints either Found after <c> comparisons or Not found after <c> comparisons.\n\nExample (inputs 50 30 70 20 40, 65):\nNot found after 2 comparisons',
    marks: 4,
    starter:
      'class TreeNode:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntarget = int(input("Search: "))\n',
    solution:
      'class TreeNode:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n    def insert(self, key):\n        if self.root is None:\n            self.root = TreeNode(key)\n            return\n        cur = self.root\n        while True:\n            if key == cur.key:\n                return\n            if key < cur.key:\n                if cur.left is None:\n                    cur.left = TreeNode(key)\n                    return\n                cur = cur.left\n            else:\n                if cur.right is None:\n                    cur.right = TreeNode(key)\n                    return\n                cur = cur.right\n\n    def search(self, key):\n        comparisons = 0\n        cur = self.root\n        while cur is not None:\n            comparisons += 1\n            if key == cur.key:\n                return True, comparisons\n            if key < cur.key:\n                cur = cur.left\n            else:\n                cur = cur.right\n        return False, comparisons\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntarget = int(input("Search: "))\ntree = BST()\nfor v in values:\n    tree.insert(v)\nfound, c = tree.search(target)\nif found:\n    print(f"Found after {c} comparisons")\nelse:\n    print(f"Not found after {c} comparisons")\n',
    tests: [
      { in: ["50 30 70 20 40", "40"], out: "Found after 3 comparisons", m: 1 },
      { in: ["50 30 70 20 40", "65"], out: "Not found after 2 comparisons", m: 1 },
      { in: ["50 30 70", "50"], out: "Found after 1 comparisons", m: 1 },
      { in: ["1 2 3 4 5", "5"], out: "Found after 5 comparisons", m: 1 },
    ],
    points: [
      ["Search starts at the root", ["self.root"]],
      ["Moves left when the target is smaller, right when larger", ["cur.left", "cur.right"]],
      ["Counts each node compared", ["comparisons += 1"]],
      ["Stops when found or when an empty subtree is reached", ["is not None"]],
    ],
  }),

  code({
    id: "ib_b4_026", unit: "B4", title: "B4.1 BST height, minimum and maximum", spec: "B4.1.4", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Construct a BST (duplicates ignored) with:\n• height(): the number of edges on the longest path from the root to a leaf (a tree with one node has height 0)\n• minimum() and maximum(), found by following left or right pointers (do not use min() or max() on a list).\n\nThe main program reads space-separated integers with input("Values: "), inserts them in order and prints:\nHeight: <h>\nMinimum: <min>\nMaximum: <max>\n\nExample (input 1 2 3 4):\nHeight: 3\nMinimum: 1\nMaximum: 4',
    marks: 5,
    starter:
      'class TreeNode:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n\nvalues = [int(x) for x in input("Values: ").split()]\n',
    solution:
      'class TreeNode:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n    def insert(self, key):\n        self.root = self._insert(self.root, key)\n\n    def _insert(self, node, key):\n        if node is None:\n            return TreeNode(key)\n        if key < node.key:\n            node.left = self._insert(node.left, key)\n        elif key > node.key:\n            node.right = self._insert(node.right, key)\n        return node\n\n    def height(self):\n        return self._height(self.root)\n\n    def _height(self, node):\n        if node is None:\n            return -1\n        return 1 + max(self._height(node.left), self._height(node.right))\n\n    def minimum(self):\n        cur = self.root\n        while cur.left is not None:\n            cur = cur.left\n        return cur.key\n\n    def maximum(self):\n        cur = self.root\n        while cur.right is not None:\n            cur = cur.right\n        return cur.key\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntree = BST()\nfor v in values:\n    tree.insert(v)\nprint("Height:", tree.height())\nprint("Minimum:", tree.minimum())\nprint("Maximum:", tree.maximum())\n',
    tests: [
      { in: ["50 30 70 20 40 60 80"], out: "Height: 2\nMinimum: 20\nMaximum: 80", m: 1 },
      { in: ["1 2 3 4"], out: "Height: 3\nMinimum: 1\nMaximum: 4", m: 1 },
      { in: ["10"], out: "Height: 0\nMinimum: 10\nMaximum: 10", m: 1 },
      { in: ["8 3 10 1 6 14 4 7 13"], out: "Height: 3\nMinimum: 1\nMaximum: 14", m: 2 },
    ],
    points: [
      ["Correct BST insertion", ["insert"]],
      ["Recursive height with an empty subtree as -1 (or equivalent)", ["return -1"]],
      ["Height = 1 + larger of the two subtree heights", ["1 + max"]],
      ["Minimum by following left pointers", ["cur.left"]],
      ["Maximum by following right pointers", ["cur.right"]],
    ],
  }),

  code({
    id: "ib_b4_027", unit: "B4", title: "B4.1 Deleting a node from a BST", spec: "B4.1.4", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Construct a BST (duplicates ignored) with a delete(key) method that handles all three cases: a leaf, a node with one child, and a node with two children (replace its key with the in-order successor, the smallest key in its right subtree, then delete that successor). delete returns True if the key was found, otherwise False.\n\nThe main program reads space-separated integers with input("Values: "), inserts them, reads input("Delete: ") and deletes that key. If the key was not in the tree it prints Not found. It then prints\nIn-order: <keys>\nPre-order: <keys>\n\nExample (inputs 50 30 70 20 40 60 80, 30):\nIn-order: 20 40 50 60 70 80\nPre-order: 50 40 20 70 60 80',
    marks: 6,
    starter:
      'class TreeNode:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntarget = int(input("Delete: "))\n',
    solution:
      'class TreeNode:\n    def __init__(self, key):\n        self.key = key\n        self.left = None\n        self.right = None\n\n\nclass BST:\n    def __init__(self):\n        self.root = None\n        self.found = False\n\n    def insert(self, key):\n        self.root = self._insert(self.root, key)\n\n    def _insert(self, node, key):\n        if node is None:\n            return TreeNode(key)\n        if key < node.key:\n            node.left = self._insert(node.left, key)\n        elif key > node.key:\n            node.right = self._insert(node.right, key)\n        return node\n\n    def delete(self, key):\n        self.found = False\n        self.root = self._delete(self.root, key)\n        return self.found\n\n    def _delete(self, node, key):\n        if node is None:\n            return None\n        if key < node.key:\n            node.left = self._delete(node.left, key)\n        elif key > node.key:\n            node.right = self._delete(node.right, key)\n        else:\n            self.found = True\n            if node.left is None:\n                return node.right\n            if node.right is None:\n                return node.left\n            succ = node.right\n            while succ.left is not None:\n                succ = succ.left\n            node.key = succ.key\n            node.right = self._delete(node.right, succ.key)\n        return node\n\n    def in_order(self, node):\n        if node is None:\n            return []\n        return self.in_order(node.left) + [node.key] + self.in_order(node.right)\n\n    def pre_order(self, node):\n        if node is None:\n            return []\n        return [node.key] + self.pre_order(node.left) + self.pre_order(node.right)\n\n\nvalues = [int(x) for x in input("Values: ").split()]\ntarget = int(input("Delete: "))\ntree = BST()\nfor v in values:\n    tree.insert(v)\nif not tree.delete(target):\n    print("Not found")\nprint("In-order:", " ".join(str(k) for k in tree.in_order(tree.root)))\nprint("Pre-order:", " ".join(str(k) for k in tree.pre_order(tree.root)))\n',
    tests: [
      { in: ["50 30 70 20 40 60 80", "30"], out: "In-order: 20 40 50 60 70 80\nPre-order: 50 40 20 70 60 80", m: 1 },
      { in: ["50 30 70 20", "20"], out: "In-order: 30 50 70\nPre-order: 50 30 70", m: 1 },
      { in: ["50 30 70 60", "70"], out: "In-order: 30 50 60\nPre-order: 50 30 60", m: 1 },
      { in: ["50 30 70 60 80", "50"], out: "In-order: 30 60 70 80\nPre-order: 60 30 70 80", m: 2 },
      { in: ["5 3", "9"], out: "Not found\nIn-order: 3 5\nPre-order: 5 3", m: 1 },
    ],
    points: [
      ["Locates the node by comparing keys and recursing left/right", ["key < node.key"]],
      ["Leaf removed (parent's pointer set to None)", ["return node.right", "None"]],
      ["Node with one child replaced by that child", ["return node.left"]],
      ["Two children: finds the in-order successor (leftmost in right subtree)", ["succ.left"]],
      ["Copies the successor key and deletes the successor from the right subtree", ["node.key = succ.key"]],
      ["Reports Not found and prints both traversals", ["Not found"]],
    ],
  }),

  multi({
    id: "ib_b4_028", unit: "B4", title: "B4.1 Deleting nodes from a BST", spec: "B4.1.4", hl: true, cmd: "Describe", diff: "Moderate", level: "Exam-style",
    stem: "The keys 40, 20, 60, 10, 30, 50, 70, 55 have been inserted, in this order, into an empty BST.",
    parts: [
      {
        label: "(a)", q: "State the in-order traversal of the tree.", marks: 1,
        points: [["10 20 30 40 50 55 60 70", seq(10, 20, 30, 40, 50, 55, 60, 70)]],
      },
      {
        label: "(b)", q: "Describe how the node 60, which has two children, is deleted using the in-order successor.", marks: 3,
        points: [
          ["Find the in-order successor: the smallest key in 60's right subtree, i.e. 70", ["successor", "70", "smallest in right subtree"]],
          ["Copy the successor's key (70) into the node that held 60", ["copy", "replace"]],
          ["Delete the successor from its original position (70 is a leaf, so its parent's pointer is set to null)", ["delete the successor", "leaf"]],
        ],
        notes: "Accept the in-order predecessor method: largest key in the left subtree (55) replaces 60, then 55 is removed.",
      },
      {
        label: "(c)", q: "State the pre-order traversal after node 60 has been deleted using the in-order successor.", marks: 1,
        points: [["40 20 10 30 70 50 55", seq(40, 20, 10, 30, 70, 50, 55)]],
      },
      {
        label: "(d)", q: "Outline why the resulting structure is still a valid BST.", marks: 2,
        points: [
          ["The successor (70) is greater than every key remaining in the left subtree of that position (50, 55)", ["greater than", "left subtree"]],
          ["…and smaller than or equal to every key in the right subtree (none left), so the ordering property is preserved", ["ordering", "preserved"]],
        ],
      },
    ],
  }),

  mcq({
    id: "ib_b4_029", unit: "B4", title: "B4.1 BST facts", spec: "B4.1.4", hl: true, cmd: "Identify", diff: "Easy", level: "Core",
    brief: "Answer the following questions about binary search trees.",
    qs: [
      { q: "The keys 10, 20, 30, 40, 50 are inserted into an empty BST in that order. What is the height of the tree (in edges)?", options: ["2", "3", "4", "5"], a: 2 },
      { q: "Which traversal of a BST visits the keys in ascending order?", options: ["Pre-order", "In-order", "Post-order", "Level-order"], a: 1 },
      { q: "What is the time complexity of searching a balanced BST containing n keys?", options: ["O(1)", "O(n)", "O(n log n)", "O(log n)"], a: 3 },
      {
        q: "When a node with two children is deleted using the in-order successor, which key replaces it?",
        options: ["The smallest key in its right subtree", "The largest key in its right subtree", "The key of its parent", "The key of its left child"],
        a: 0,
      },
    ],
  }),

  multi({
    id: "ib_b4_030", unit: "B4", title: "B4.1 Library catalogue BST", spec: "B4.1.4", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    stem: "A library stores catalogue numbers in a BST. The numbers 45, 22, 67, 12, 30, 50, 80, 25 are inserted in that order into an empty tree.",
    parts: [
      {
        label: "(a)", q: "Sketch the BST (you may describe it by listing each node's left and right child).", marks: 3,
        points: [
          ["Root 45 with left child 22 and right child 67", ["45", "22", "67"]],
          ["22 has children 12 (left) and 30 (right); 67 has children 50 (left) and 80 (right)", ["12", "30", "50", "80"]],
          ["25 is the left child of 30", ["25"]],
        ],
      },
      {
        label: "(b)", q: "State the in-order traversal of the tree.", marks: 1,
        points: [["12 22 25 30 45 50 67 80", seq(12, 22, 25, 30, 45, 50, 67, 80)]],
      },
      {
        label: "(c)", q: "Explain why inserting catalogue numbers that are already in ascending order would reduce search efficiency.", marks: 3,
        points: [
          ["Each new key is larger than all existing keys, so it is always inserted as the right child of the last node", ["right child"]],
          ["The tree degenerates into a linked-list shape with height n − 1", ["degenerate", "linked list", "height"]],
          ["Searching becomes O(n) instead of O(log n)", ["O(n)", "O(log n)"]],
        ],
      },
      {
        label: "(d)", q: "Construct a recursive function search(node, key) that returns True if key is in the subtree rooted at node, otherwise False.", marks: 4,
        points: [
          ["Base case: node is None → return False", ["is None", "return False"]],
          ["Base case: node.key == key → return True", ["== key", "return True"]],
          ["Recursive call on the left subtree when key < node.key", ["search(node.left, key)"]],
          ["Recursive call on the right subtree otherwise, returning the result", ["search(node.right, key)"]],
        ],
        exemplar:
          "def search(node, key):\n    if node is None:\n        return False\n    if node.key == key:\n        return True\n    if key < node.key:\n        return search(node.left, key)\n    return search(node.right, key)",
      },
    ],
  }),

  // =====================================================================
  // B4.1 Sets
  // =====================================================================
  code({
    id: "ib_b4_031", unit: "B4", title: "B4.1 Set ADT built from a list", spec: "B4.1.5", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Construct a set ADT class MySet that stores its elements in a Python list, without using Python\'s built-in set type or set operators. Provide:\n• add(x) (ignores duplicates), remove(x), contains(x)\n• union(other), intersection(other) and difference(other), each returning a new MySet\n• is_subset(other)\n• items(), returning the elements in ascending order.\n\nThe main program reads two lines of space-separated integers with input("Set A: ") and input("Set B: "), builds A and B, and prints (lists shown in Python list format):\nA = <A.items()>\nB = <B.items()>\nUnion = <...>\nIntersection = <...>\nA - B = <...>\nA subset of B: <True/False>\n\nExample (inputs 2 2, 1 2 3):\nA = [2]\nB = [1, 2, 3]\nUnion = [1, 2, 3]\nIntersection = [2]\nA - B = []\nA subset of B: True',
    marks: 6,
    starter:
      'class MySet:\n    def __init__(self):\n        self.elements = []\n\n    def add(self, x):\n        pass\n\n\na_vals = [int(x) for x in input("Set A: ").split()]\nb_vals = [int(x) for x in input("Set B: ").split()]\n',
    solution:
      'class MySet:\n    def __init__(self):\n        self.elements = []\n\n    def contains(self, x):\n        for e in self.elements:\n            if e == x:\n                return True\n        return False\n\n    def add(self, x):\n        if not self.contains(x):\n            self.elements.append(x)\n\n    def remove(self, x):\n        if self.contains(x):\n            self.elements.remove(x)\n\n    def union(self, other):\n        result = MySet()\n        for e in self.elements:\n            result.add(e)\n        for e in other.elements:\n            result.add(e)\n        return result\n\n    def intersection(self, other):\n        result = MySet()\n        for e in self.elements:\n            if other.contains(e):\n                result.add(e)\n        return result\n\n    def difference(self, other):\n        result = MySet()\n        for e in self.elements:\n            if not other.contains(e):\n                result.add(e)\n        return result\n\n    def is_subset(self, other):\n        for e in self.elements:\n            if not other.contains(e):\n                return False\n        return True\n\n    def items(self):\n        return sorted(self.elements)\n\n\na_vals = [int(x) for x in input("Set A: ").split()]\nb_vals = [int(x) for x in input("Set B: ").split()]\nA = MySet()\nB = MySet()\nfor v in a_vals:\n    A.add(v)\nfor v in b_vals:\n    B.add(v)\nprint("A =", A.items())\nprint("B =", B.items())\nprint("Union =", A.union(B).items())\nprint("Intersection =", A.intersection(B).items())\nprint("A - B =", A.difference(B).items())\nprint("A subset of B:", A.is_subset(B))\n',
    tests: [
      { in: ["1 2 3 3", "2 3 4"], out: "A = [1, 2, 3]\nB = [2, 3, 4]\nUnion = [1, 2, 3, 4]\nIntersection = [2, 3]\nA - B = [1]\nA subset of B: False", m: 1 },
      { in: ["2 2", "1 2 3"], out: "A = [2]\nB = [1, 2, 3]\nUnion = [1, 2, 3]\nIntersection = [2]\nA - B = []\nA subset of B: True", m: 2 },
      { in: ["5 6", "7"], out: "A = [5, 6]\nB = [7]\nUnion = [5, 6, 7]\nIntersection = []\nA - B = [5, 6]\nA subset of B: False", m: 2 },
      { in: ["4", "4"], out: "A = [4]\nB = [4]\nUnion = [4]\nIntersection = [4]\nA - B = []\nA subset of B: True", m: 1 },
    ],
    points: [
      ["contains checks membership by traversal", ["def contains"]],
      ["add rejects duplicates (uniqueness)", ["if not self.contains(x)"]],
      ["union adds every element of both sets", ["def union"]],
      ["intersection keeps elements found in both", ["def intersection"]],
      ["difference keeps elements of A not in B", ["def difference"]],
      ["is_subset checks every element of A is in B", ["def is_subset"]],
    ],
  }),

  code({
    id: "ib_b4_032", unit: "B4", title: "B4.1 Club membership with Python sets", spec: "B4.1.5", hl: true, cmd: "Construct", diff: "Easy", level: "Starter",
    brief:
      'Use Python\'s built-in set type.\n\nThe program reads the members of two clubs as space-separated names with input("Club A: ") and input("Club B: "). Names may be repeated by mistake. It prints:\nBoth: <names in both clubs, alphabetical, separated by spaces, or none>\nOnly A: <names only in club A, alphabetical, or none>\nAll: <number of different people in either club>\n\nExample (inputs amy ben cal, ben dan):\nBoth: ben\nOnly A: amy cal\nAll: 4',
    marks: 3,
    starter: 'a = input("Club A: ").split()\nb = input("Club B: ").split()\n# convert to sets and use set operations\n',
    solution:
      'a = set(input("Club A: ").split())\nb = set(input("Club B: ").split())\nboth = sorted(a & b)\nonly_a = sorted(a - b)\nprint("Both:", " ".join(both) if both else "none")\nprint("Only A:", " ".join(only_a) if only_a else "none")\nprint("All:", len(a | b))\n',
    tests: [
      { in: ["amy ben cal", "ben dan"], out: "Both: ben\nOnly A: amy cal\nAll: 4", m: 1 },
      { in: ["xi yu", "zoe"], out: "Both: none\nOnly A: xi yu\nAll: 3", m: 1 },
      { in: ["pat quin pat", "quin pat"], out: "Both: pat quin\nOnly A: none\nAll: 2", m: 1 },
    ],
    points: [
      ["Intersection used for Both", ["&", "intersection"]],
      ["Difference used for Only A", ["-", "difference"]],
      ["Union size counts each person once", ["|", "union"]],
    ],
  }),

  code({
    id: "ib_b4_033", unit: "B4", title: "B4.1 Subset and superset check", spec: "B4.1.5", hl: true, cmd: "Construct", diff: "Easy", level: "Core",
    brief:
      'A recruitment program compares the skills required for a job with a candidate\'s skills. Use Python sets and their subset/superset operations.\n\nThe program reads space-separated words with input("Required skills: ") and input("Candidate skills: ") and prints exactly one line:\n• Exact match – if the two sets are equal\n• Qualified with extra skills: <extra skills, alphabetical, separated by spaces> – if the candidate set is a proper superset of the required set\n• Missing: <missing skills, alphabetical, separated by spaces> – otherwise.\n\nExample (inputs python, python java):\nQualified with extra skills: java',
    marks: 4,
    starter: 'required = input("Required skills: ").split()\ncandidate = input("Candidate skills: ").split()\n',
    solution:
      'required = set(input("Required skills: ").split())\ncandidate = set(input("Candidate skills: ").split())\nif candidate == required:\n    print("Exact match")\nelif candidate.issuperset(required):\n    print("Qualified with extra skills:", " ".join(sorted(candidate - required)))\nelse:\n    print("Missing:", " ".join(sorted(required - candidate)))\n',
    tests: [
      { in: ["python sql", "sql python"], out: "Exact match", m: 1 },
      { in: ["python", "python java"], out: "Qualified with extra skills: java", m: 1 },
      { in: ["python sql html", "python"], out: "Missing: html sql", m: 1 },
      { in: ["cad", "art"], out: "Missing: cad", m: 1 },
    ],
    points: [
      ["Inputs converted to sets (order and duplicates ignored)", ["set("]],
      ["Equality test for exact match", ["=="]],
      ["Superset (or subset) test used", ["issuperset", ">=", "issubset", "<="]],
      ["Differences sorted and printed in the required format", ["sorted"]],
    ],
  }),

  inspect({
    id: "ib_b4_034", unit: "B4", title: "B4.1 Set operations in Python", spec: "B4.1.5", hl: true, cmd: "State", diff: "Easy", level: "Starter",
    brief: "Study the Python code and state each line of output.",
    code: "a = {3, 5, 7, 9}\nb = {5, 6, 7}\nprint(sorted(a | b))\nprint(sorted(a & b))\nprint(sorted(a - b))\nprint(b <= a)\na.add(5)\nprint(len(a))",
    marks: 5,
    qs: [
      { q: "Line 1 of output", a: ["[3, 5, 6, 7, 9]", "[3,5,6,7,9]"] },
      { q: "Line 2 of output", a: ["[5, 7]", "[5,7]"] },
      { q: "Line 3 of output", a: ["[3, 9]", "[3,9]"] },
      { q: "Line 4 of output", a: ["False"] },
      { q: "Line 5 of output", a: ["4"] },
    ],
  }),

  multi({
    id: "ib_b4_035", unit: "B4", title: "B4.1 Event attendance as sets", spec: "B4.1.5", hl: true, cmd: "Construct", diff: "Moderate", level: "Exam-style",
    stem:
      "A school records the students attending a two-day science fair.\nMonday = {Ana, Ben, Cai, Dev}\nTuesday = {Ben, Dev, Eli}",
    parts: [
      {
        label: "(a)", q: "State two fundamental characteristics of a set.", marks: 2,
        points: [
          ["Elements are unique: no duplicates are stored", ["unique", "no duplicates"]],
          ["Elements are unordered: there is no index/position", ["unordered", "no order"]],
        ],
      },
      {
        label: "(b)", q: "State the result of: (i) Monday ∪ Tuesday (ii) Monday ∩ Tuesday (iii) Monday − Tuesday.", marks: 3,
        points: [
          ["(i) {Ana, Ben, Cai, Dev, Eli}", ["Ana, Ben, Cai, Dev, Eli"]],
          ["(ii) {Ben, Dev}", ["Ben, Dev"]],
          ["(iii) {Ana, Cai}", ["Ana, Cai"]],
        ],
      },
      {
        label: "(c)", q: "Construct a Python function is_subset(a, b) that returns True if every element of set a is in set b. Do not use the built-in subset operators or methods.", marks: 3,
        points: [
          ["Iterates over every element of a", ["for x in a"]],
          ["Returns False as soon as an element is not in b", ["not in b", "return False"]],
          ["Returns True after the loop", ["return True"]],
        ],
        exemplar: "def is_subset(a, b):\n    for x in a:\n        if x not in b:\n            return False\n    return True",
      },
      {
        label: "(d)", q: "Explain why testing whether a name is in a Python set is, on average, faster than testing whether it is in a Python list.", marks: 3,
        points: [
          ["A Python set is implemented as a hash table", ["hash table"]],
          ["The name is hashed to find its bucket/slot directly, so on average O(1)", ["hash", "O(1)"]],
          ["A list must be searched linearly, comparing each element: O(n)", ["linear", "O(n)"]],
        ],
      },
    ],
  }),

  // =====================================================================
  // B4.1 Hash tables, dict and set
  // =====================================================================
  multi({
    id: "ib_b4_036", unit: "B4", title: "B4.1 How a hash table works", spec: "B4.1.6", hl: true, cmd: "Explain", diff: "Moderate", level: "Exam-style",
    stem: "An online shop stores product records in a hash table, using the product code as the key.",
    parts: [
      {
        label: "(a)", q: "Outline the role of the hashing function.", marks: 2,
        points: [
          ["It converts the key (product code) into an index/address in the table", ["index", "address"]],
          ["so the record can be stored and later found directly without searching the whole table", ["directly", "without searching"]],
        ],
      },
      {
        label: "(b)", q: "Explain what a collision is and how separate chaining resolves it.", marks: 3,
        points: [
          ["A collision occurs when two different keys hash to the same index", ["same index", "two keys"]],
          ["In separate chaining each slot holds a list/linked list (bucket) of entries", ["linked list", "bucket", "chain"]],
          ["Colliding records are added to the chain; a search hashes the key then searches that chain only", ["added to the chain", "search the chain"]],
        ],
      },
      {
        label: "(c)", q: "Define load factor and explain its effect on performance.", marks: 3,
        points: [
          ["Load factor = number of stored entries ÷ number of slots", ["entries", "slots", "÷"]],
          ["A higher load factor means more collisions / longer chains or probe sequences", ["more collisions", "longer"]],
          ["…so average operations slow down from O(1); the table is resized/rehashed when it passes a threshold (e.g. 0.7)", ["resize", "rehash", "0.7"]],
        ],
      },
    ],
  }),

  table({
    id: "ib_b4_037", unit: "B4", title: "B4.1 Linear probing", spec: "B4.1.6", hl: true, cmd: "Trace", diff: "Moderate", level: "Core",
    brief:
      "A hash table has 11 slots (indices 0 to 10). The hash function is h(k) = k mod 11 and collisions are resolved by linear probing (try the next slot, wrapping from 10 to 0).\n\nThe keys 22, 31, 4, 15, 28, 17, 88, 59 are inserted in this order. Complete the table to show the key stored in each slot. Slots shown as — remain empty.",
    marks: 4,
    columns: [{ label: "Index" }, { label: "Key" }],
    rows: [
      ["=0", "22"],
      ["=1", "88"],
      ["=2", "=—"],
      ["=3", "=—"],
      ["=4", "4"],
      ["=5", "15"],
      ["=6", "28"],
      ["=7", "17"],
      ["=8", "59"],
      ["=9", "31"],
      ["=10", "=—"],
    ],
  }),

  inspect({
    id: "ib_b4_038", unit: "B4", title: "B4.1 Chaining and load factor", spec: "B4.1.6", hl: true, cmd: "Calculate", diff: "Easy", level: "Core",
    brief:
      "A hash table has 7 slots, uses the hash function h(k) = k mod 7 and resolves collisions by separate chaining. The keys 10, 24, 17, 3, 31, 5 are inserted in this order.",
    marks: 4,
    qs: [
      { q: "State the index for key 24.", a: ["3"] },
      { q: "State how many keys are in the chain at index 3.", a: ["5", "five"] },
      { q: "Calculate the load factor, to 2 decimal places.", a: ["0.86", ".86"] },
      { q: "State, in Big O notation, the worst-case time to search this table for a key when all n keys share one chain.", a: ["O(n)"] },
    ],
  }),

  code({
    id: "ib_b4_039", unit: "B4", title: "B4.1 Hash table with linear probing", spec: "B4.1.6", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Construct a class HashTable that stores integer keys in a fixed-size list of slots (None means empty).\n• h(k) = k mod size\n• insert(key) uses linear probing (step 1, wrapping round to index 0) and returns the index used, or -1 if the table is full\n• load_factor() returns the number of stored keys ÷ size.\n\nThe main program reads input("Size: ") and space-separated keys with input("Keys: "). For each key it prints <key> -> <index>, or <key> -> FULL if it could not be stored. Finally it prints Load factor: <value to 2 d.p.>.\n\nExample (inputs 3, 1 4 7 2):\n1 -> 1\n4 -> 2\n7 -> 0\n2 -> FULL\nLoad factor: 1.00',
    marks: 6,
    starter:
      'class HashTable:\n    def __init__(self, size):\n        self.size = size\n        self.slots = [None] * size\n        self.count = 0\n\n\nsize = int(input("Size: "))\nkeys = [int(x) for x in input("Keys: ").split()]\n',
    solution:
      'class HashTable:\n    def __init__(self, size):\n        self.size = size\n        self.slots = [None] * size\n        self.count = 0\n\n    def h(self, k):\n        return k % self.size\n\n    def insert(self, key):\n        index = self.h(key)\n        for step in range(self.size):\n            i = (index + step) % self.size\n            if self.slots[i] is None:\n                self.slots[i] = key\n                self.count += 1\n                return i\n        return -1\n\n    def load_factor(self):\n        return self.count / self.size\n\n\nsize = int(input("Size: "))\nkeys = [int(x) for x in input("Keys: ").split()]\ntable = HashTable(size)\nfor k in keys:\n    i = table.insert(k)\n    print(k, "->", "FULL" if i == -1 else i)\nprint(f"Load factor: {table.load_factor():.2f}")\n',
    tests: [
      { in: ["11", "22 31 4 15 28 17 88 59"], out: "22 -> 0\n31 -> 9\n4 -> 4\n15 -> 5\n28 -> 6\n17 -> 7\n88 -> 1\n59 -> 8\nLoad factor: 0.73", m: 1 },
      { in: ["5", "5 10 15"], out: "5 -> 0\n10 -> 1\n15 -> 2\nLoad factor: 0.60", m: 1 },
      { in: ["3", "1 4 7 2"], out: "1 -> 1\n4 -> 2\n7 -> 0\n2 -> FULL\nLoad factor: 1.00", m: 2 },
      { in: ["7", "13 6"], out: "13 -> 6\n6 -> 0\nLoad factor: 0.29", m: 2 },
    ],
    points: [
      ["Hash function k mod size", ["% self.size"]],
      ["Probes the next slot when occupied", ["index + step"]],
      ["Wraps round to index 0", ["% self.size"]],
      ["Stops and returns -1 when every slot has been tried", ["return -1"]],
      ["Keeps a count of stored keys for the load factor", ["self.count += 1"]],
      ["Output in the required format, load factor to 2 d.p.", [":.2f"]],
    ],
  }),

  code({
    id: "ib_b4_040", unit: "B4", title: "B4.1 Phone book with separate chaining", spec: "B4.1.6", hl: true, cmd: "Construct", diff: "Hard", level: "Exam-style",
    brief:
      'Construct a class ChainedHashTable for a phone book. Each bucket is a list of [name, number] pairs.\n• h(name) = (sum of the character codes of name, using ord) mod size\n• put(name, number) adds the pair to the end of its bucket, or replaces the number if the name is already there\n• get(name) returns the number, or None.\n\nThe main program reads input("Size: "), input("Entries: ") and that many lines with input("Entry: ") in the form name number. It then reads input("Lookup: "). It prints every bucket in index order as Bucket <i>: <names in the bucket separated by ", "> or Bucket <i>: empty, then <name>: <number> or <name> not found.\n\nExample (inputs 4, 2, x 9, x 7, x):\nBucket 0: x\nBucket 1: empty\nBucket 2: empty\nBucket 3: empty\nx: 7',
    marks: 5,
    starter:
      'class ChainedHashTable:\n    def __init__(self, size):\n        self.size = size\n        self.buckets = [[] for i in range(size)]\n\n\nsize = int(input("Size: "))\nn = int(input("Entries: "))\n',
    solution:
      'class ChainedHashTable:\n    def __init__(self, size):\n        self.size = size\n        self.buckets = [[] for i in range(size)]\n\n    def h(self, name):\n        total = 0\n        for ch in name:\n            total += ord(ch)\n        return total % self.size\n\n    def put(self, name, number):\n        bucket = self.buckets[self.h(name)]\n        for pair in bucket:\n            if pair[0] == name:\n                pair[1] = number\n                return\n        bucket.append([name, number])\n\n    def get(self, name):\n        for pair in self.buckets[self.h(name)]:\n            if pair[0] == name:\n                return pair[1]\n        return None\n\n\nsize = int(input("Size: "))\nn = int(input("Entries: "))\ntable = ChainedHashTable(size)\nfor i in range(n):\n    name, number = input("Entry: ").split()\n    table.put(name, number)\nlookup = input("Lookup: ")\nfor i in range(size):\n    names = [pair[0] for pair in table.buckets[i]]\n    print(f"Bucket {i}:", ", ".join(names) if names else "empty")\nresult = table.get(lookup)\nif result is None:\n    print(lookup, "not found")\nelse:\n    print(f"{lookup}: {result}")\n',
    tests: [
      { in: ["5", "3", "amy 111", "bob 222", "eve 333", "bob"], out: "Bucket 0: eve\nBucket 1: empty\nBucket 2: amy, bob\nBucket 3: empty\nBucket 4: empty\nbob: 222", m: 1 },
      { in: ["3", "2", "al 1", "la 2", "la"], out: "Bucket 0: empty\nBucket 1: al, la\nBucket 2: empty\nla: 2", m: 1 },
      { in: ["4", "2", "x 9", "x 7", "x"], out: "Bucket 0: x\nBucket 1: empty\nBucket 2: empty\nBucket 3: empty\nx: 7", m: 2 },
      { in: ["2", "1", "zed 5", "amy"], out: "Bucket 0: empty\nBucket 1: zed\namy not found", m: 1 },
    ],
    points: [
      ["Hash function sums ord values and takes mod size", ["ord", "% self.size"]],
      ["put appends to the correct bucket", ["bucket.append"]],
      ["put replaces the number for an existing name", ["pair[1] = number"]],
      ["get searches only the bucket for that name", ["self.buckets[self.h(name)]"]],
      ["Buckets and lookup result printed in the required format", ["not found", "empty"]],
    ],
  }),

  code({
    id: "ib_b4_041", unit: "B4", title: "B4.1 Word frequencies with a dict", spec: "B4.1.6", hl: true, cmd: "Construct", diff: "Easy", level: "Starter",
    brief:
      'Python\'s dict is a hash table that maps keys to values. Use a dict to count words.\n\nThe program reads a line of text with input("Text: "), converts it to lower case and splits it into words. It prints each different word with its count, in the order the words first appear, as <word>: <count>. It then prints Most common: <word> (if there is a tie, the word that appeared first).\n\nExample (input the cat the dog):\nthe: 2\ncat: 1\ndog: 1\nMost common: the',
    marks: 3,
    starter: 'words = input("Text: ").lower().split()\ncounts = {}\n',
    solution:
      'words = input("Text: ").lower().split()\ncounts = {}\nfor w in words:\n    if w in counts:\n        counts[w] += 1\n    else:\n        counts[w] = 1\nbest = None\nfor w in counts:\n    print(f"{w}: {counts[w]}")\n    if best is None or counts[w] > counts[best]:\n        best = w\nprint("Most common:", best)\n',
    tests: [
      { in: ["the cat the dog"], out: "the: 2\ncat: 1\ndog: 1\nMost common: the", m: 1 },
      { in: ["A a b B b"], out: "a: 2\nb: 3\nMost common: b", m: 1 },
      { in: ["hello"], out: "hello: 1\nMost common: hello", m: 1 },
    ],
    points: [
      ["Dictionary used with words as keys", ["counts[w]"]],
      ["Counts incremented, new words added with 1", ["+= 1"]],
      ["Most common found with ties going to the first word", ["Most common"]],
    ],
  }),

  mcq({
    id: "ib_b4_042", unit: "B4", title: "B4.1 Hash table facts", spec: "B4.1.6", hl: true, cmd: "Identify", diff: "Easy", level: "Core",
    brief: "Answer the following questions about hash tables.",
    qs: [
      { q: "A hash table has 20 slots and holds 15 keys. What is its load factor?", options: ["0.25", "0.75", "1.33", "15"], a: 1 },
      {
        q: "Which collision resolution strategy stores all keys that hash to the same index in a list at that index?",
        options: ["Linear probing", "Quadratic probing", "Double hashing", "Separate chaining"],
        a: 3,
      },
      {
        q: "Which property is most important for a good hashing function?",
        options: [
          "It spreads keys evenly over the table and is quick to calculate",
          "It always returns the same index for every key",
          "It sorts the keys into ascending order",
          "It produces values larger than the table size",
        ],
        a: 0,
      },
      {
        q: "Why is a hash table often resized (rehashed) when its load factor rises above about 0.7?",
        options: [
          "To store the keys in sorted order",
          "To make the keys immutable",
          "To keep collisions low so average operations stay close to O(1)",
          "To convert the table into a binary search tree",
        ],
        a: 2,
      },
    ],
  }),

  multi({
    id: "ib_b4_043", unit: "B4", title: "B4.1 Student IDs in a hash table", spec: "B4.1.6", hl: true, cmd: "Calculate", diff: "Moderate", level: "Exam-style",
    stem:
      "A school stores student records in a hash table with 13 slots. The hash function is h(id) = id mod 13 and collisions are resolved by linear probing.",
    parts: [
      {
        label: "(a)", q: "Calculate the index for student ID 2031.", marks: 1,
        points: [["3", ["3"]]],
      },
      {
        label: "(b)", q: "Student 2044 is inserted after 2031. Describe how linear probing determines where it is stored.", marks: 2,
        points: [
          ["2044 mod 13 = 3, which is already occupied (collision)", ["3", "collision", "occupied"]],
          ["The next slots are checked in turn until a free one is found; if index 4 is free it is stored there", ["next slot", "4"]],
        ],
      },
      {
        label: "(c)", q: "Calculate the load factor after 9 students have been stored, to 2 decimal places.", marks: 1,
        points: [["9/13 = 0.69", ["0.69"]]],
      },
      {
        label: "(d)", q: "Explain why performance degrades as the load factor approaches 1 when linear probing is used.", marks: 3,
        points: [
          ["More slots are occupied so collisions become more likely", ["collisions"]],
          ["Occupied slots form clusters (primary clustering), so probe sequences become long", ["cluster", "probe"]],
          ["Insertions and searches approach O(n) instead of O(1)", ["O(n)", "O(1)"]],
        ],
      },
      {
        label: "(e)", q: "Outline why keys in a Python dict must be immutable (hashable).", marks: 2,
        points: [
          ["The key's hash value decides the slot where the entry is stored", ["hash value", "slot"]],
          ["If a key could change, its hash would change and the entry could no longer be found", ["change", "no longer be found"]],
        ],
      },
    ],
  }),

  multi({
    id: "ib_b4_044", unit: "B4", title: "B4.1 Open addressing versus chaining", spec: "B4.1.6", hl: true, cmd: "Distinguish", diff: "Moderate", level: "Exam-style",
    stem: "A developer must choose a collision resolution strategy for a hash table that will hold sensor readings keyed by timestamp.",
    parts: [
      {
        label: "(a)", q: "Distinguish between open addressing (linear probing) and separate chaining.", marks: 4,
        points: [
          ["Open addressing stores every entry inside the table array itself", ["inside the table"]],
          ["…on a collision it probes other slots (e.g. the next slot) until a free one is found", ["probe", "next slot"]],
          ["Separate chaining stores a list/linked list at each slot", ["linked list", "chain"]],
          ["…colliding entries are added to that list, so the table never becomes 'full' and the load factor can exceed 1", ["exceed 1", "never full"]],
        ],
      },
      {
        label: "(b)", q: "Outline one problem with deleting an entry when open addressing is used.", marks: 2,
        points: [
          ["Simply emptying the slot breaks the probe sequence for keys stored after it", ["breaks", "probe sequence"]],
          ["…so a 'deleted' marker (tombstone) must be used instead", ["tombstone", "marker"]],
        ],
      },
    ],
  }),

  theory({
    id: "ib_b4_045", unit: "B4", title: "B4.1 Choosing an ADT for patient records", spec: "B4.1.6", hl: true, cmd: "Evaluate", diff: "Hard", level: "Exam-style",
    brief:
      "A hospital needs to store about 50 000 patient records in memory. Records are looked up by patient number many times per second, new patients are added daily, and staff sometimes need a list of patients in patient-number order or all patients within a range of numbers.\n\nEvaluate the use of a hash table, a binary search tree and a linked list for storing these records.",
    marks: 8,
    bands: BANDS8,
    points: [
      ["Hash table: average O(1) look-up and insertion by patient number – ideal for frequent look-ups", ["hash table", "O(1)"]],
      ["Hash table: keys are unordered, so ordered listings and range queries need all keys to be sorted (O(n log n))", ["unordered", "range"]],
      ["Hash table: performance depends on the hash function and load factor; resizing is costly", ["load factor", "resizing"]],
      ["BST: O(log n) search/insert when balanced", ["O(log n)", "balanced"]],
      ["BST: in-order traversal gives patients in order and range queries are efficient", ["in-order", "range"]],
      ["BST: can degenerate to O(n) if patient numbers arrive in ascending order (likely for new patients) unless self-balancing", ["degenerate", "ascending"]],
      ["Linked list: simple, dynamic size, but O(n) search is too slow for 50 000 records many times per second", ["linked list", "O(n)"]],
      ["Memory overheads: pointers in BST/linked list; empty slots in a hash table", ["memory", "pointers"]],
      ["Justified conclusion, e.g. hash table for look-ups plus a balanced tree/ordered index when ordered reports are needed", ["conclusion"]],
    ],
  }),

  multi({
    id: "ib_b4_046", unit: "B4", title: "B4.1 Stack and queue ADTs in an editor", spec: "B4.1.1", hl: true, cmd: "Explain", diff: "Moderate", level: "Exam-style",
    stem: "A document editor sends documents to a shared printer and lets users undo their most recent edits.",
    parts: [
      {
        label: "(a)", q: "Identify the most suitable ADT for (i) the print jobs (ii) the undo history, justifying each choice.", marks: 4,
        points: [
          ["(i) Queue", ["queue"]],
          ["…because jobs are printed in the order they were sent (FIFO)", ["FIFO", "first in first out"]],
          ["(ii) Stack", ["stack"]],
          ["…because the most recent edit must be undone first (LIFO)", ["LIFO", "last in first out"]],
        ],
      },
      {
        label: "(b)", q: "Explain how a queue could be implemented as a linked list.", marks: 3,
        points: [
          ["Keep pointers to the front (head) and rear (tail) nodes", ["front", "rear"]],
          ["Enqueue: create a node, link it after the rear and move the rear pointer", ["enqueue", "rear"]],
          ["Dequeue: return the front node's data and move the front pointer to the next node (resetting rear when empty)", ["dequeue", "front"]],
        ],
      },
      {
        label: "(c)", q: "Outline why the editor's code should use the queue only through its operations.", marks: 2,
        points: [
          ["The internal implementation (linked list or array) is hidden behind the ADT interface", ["interface", "hidden"]],
          ["so it can be changed without affecting the editor / prevents invalid changes to the structure", ["changed without", "invalid"]],
        ],
      },
    ],
  }),
];
