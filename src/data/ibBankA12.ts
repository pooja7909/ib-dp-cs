import type { IGCSETask, MarkPoint, QuestionPart, TableCell, TableColumn, QuestionDifficulty, QuestionLevel } from "../types";

// IB DP Computer Science (first assessment 2027) - built-in bank for
// A1 Computer fundamentals and A2 Networks (Paper 1). Original questions.

type Unit = "A1" | "A2";
/** A mark point: the text, optionally followed by accepted answer phrasings. */
type P = string | string[];

interface Meta {
  u: Unit;
  ref: string; // e.g. "A1.2.3"
  title: string;
  d: QuestionDifficulty;
  cmd: string; // IB command term
  hl?: boolean;
  lvl?: QuestionLevel;
}

interface PartDef {
  q: string;
  m: number;
  cmd?: string;
  pts: P[];
  kw: string[];
  notes?: string[];
  bands?: string[][]; // [range, descriptor]
}

const counters: Record<Unit, number> = { A1: 0, A2: 0 };

function base(s: Meta): IGCSETask {
  counters[s.u] += 1;
  const n = String(counters[s.u]).padStart(3, "0");
  return {
    id: `ib_${s.u.toLowerCase()}_${n}`,
    unit: s.u,
    title: s.title,
    difficulty: s.d,
    level: s.lvl ?? (s.d === "Easy" ? "Starter" : s.d === "Moderate" ? "Core" : "Exam-style"),
    type: "theory",
    brief: "",
    marks: 0,
    specReference: s.ref,
    ibLevel: s.hl ? "HL" : "SL",
    paper: "Paper 1",
    commandWord: s.cmd,
    examBoard: "IB",
    source: { examBoard: "IB", qualification: "IB Diploma Programme Computer Science" },
  };
}

const ptText = (p: P) => (Array.isArray(p) ? p[0] : p);
const ptAlts = (p: P) => (Array.isArray(p) ? p.slice(1).concat(p[0]) : [p]);

function schemeText(p: PartDef): string {
  const lines: string[] = [];
  if (p.bands) {
    lines.push("Use the markbands below.");
    lines.push("| Marks | Level descriptor |");
    lines.push("|---|---|");
    for (const [r, dsc] of p.bands) lines.push(`| ${r} | ${dsc} |`);
    lines.push("Indicative content (answers may include, but are not limited to):");
    for (const pt of p.pts) lines.push(`- ${ptText(pt)}`);
  } else {
    lines.push(`Award [1] for each of the following, up to [${p.m}]:`);
    for (const pt of p.pts) lines.push(`- ${ptText(pt)} [1]`);
  }
  for (const n of p.notes ?? []) lines.push(n);
  return lines.join("\n");
}

function markPoints(p: PartDef): MarkPoint[] {
  return p.pts.map((pt, i) => ({
    id: `MP${i + 1}`,
    marks: 1,
    criterion: ptText(pt),
    acceptedAnswers: ptAlts(pt),
  }));
}

/** Single written question. */
function theory(s: Meta, brief: string, p: Omit<PartDef, "q"> & { q?: string }): IGCSETask {
  const t = base(s);
  const part: PartDef = { ...p, q: p.q ?? brief, cmd: p.cmd ?? s.cmd };
  t.type = "theory";
  t.marks = p.m;
  t.brief = `${brief} [${p.m}]`;
  t.markScheme = schemeText(part);
  t.markPoints = markPoints(part);
  t.questions = [{ q: part.q, keywords: p.kw, maxMarks: p.m, criteria: p.pts.map(ptText) }];
  return t;
}

/** Structured exam-style question with parts (a), (b), ... */
function multi(s: Meta, stem: string, parts: PartDef[]): IGCSETask {
  const t = base(s);
  t.type = "theory";
  t.level = s.lvl ?? "Exam-style";
  const letters = "abcdefgh";
  const qp: QuestionPart[] = parts.map((p, i) => ({
    id: letters[i],
    label: `(${letters[i]})`,
    question: p.q,
    marks: p.m,
    type: "theory",
    markScheme: schemeText(p),
    markPoints: markPoints(p),
  }));
  t.parts = qp;
  t.marks = parts.reduce((a, p) => a + p.m, 0);
  t.brief =
    stem +
    "\n\n" +
    parts.map((p, i) => `(${letters[i]}) ${p.q} [${p.m}]`).join("\n\n") +
    "\n\nLabel each part of your answer (a), (b), ...";
  t.markScheme = qp.map((p) => `${p.label} [${p.marks}]\n${p.markScheme}`).join("\n\n");
  t.questions = parts.map((p, i) => ({
    q: `(${letters[i]}) ${p.q}`,
    keywords: p.kw,
    maxMarks: p.m,
    criteria: p.pts.map(ptText),
  }));
  return t;
}

/** Multiple choice: one mark per question unless stated. */
function mcq(s: Meta, brief: string, qs: { q: string; o: string[]; a: number }[], marks?: number): IGCSETask {
  const t = base(s);
  t.type = "mcq";
  t.brief = brief;
  t.marks = marks ?? qs.length;
  t.questions = qs.map((x) => ({ q: x.q, options: x.o, a: x.a }));
  t.markScheme =
    `Award [1] for each correct answer, up to [${t.marks}]:\n` +
    qs.map((x, i) => `- Q${i + 1}: ${x.o[x.a]} [1]`).join("\n");
  return t;
}

/** Short exact answers. */
function inspect(s: Meta, brief: string, qs: { q: string; a: string[]; why?: string }[], code?: string, marks?: number): IGCSETask {
  const t = base(s);
  t.type = "inspect";
  t.brief = brief;
  if (code) t.code = code;
  t.marks = marks ?? qs.length;
  t.questions = qs.map((x) => ({ q: x.q, a: x.a, why: x.why }));
  t.markScheme =
    `Award [1] for each correct answer, up to [${t.marks}]:\n` +
    qs.map((x, i) => `- ${i + 1}. ${x.a[0]}${x.a.length > 1 ? ` (accept ${x.a.slice(1).join(" / ")})` : ""} [1]`).join("\n");
  return t;
}

/** Table: cells starting with "=" are given; others are answered. "|" separates accepted alternatives. */
function table(s: Meta, brief: string, columns: TableColumn[], rows: string[][], marks: number, note?: string): IGCSETask {
  const t = base(s);
  t.type = "table";
  t.brief = brief;
  t.columns = columns;
  const cells: TableCell[][] = rows.map((r) =>
    r.map((c) => (c.startsWith("=") ? { v: c.slice(1), g: true } : { v: c, g: false }))
  );
  t.rows = cells;
  t.marks = marks;
  const fill = cells.flat().filter((c) => !c.g).length;
  t.markScheme =
    `${fill} cells to complete; award marks in proportion to correct cells, up to [${marks}].\n` +
    "Expected table:\n" +
    columns.map((c) => c.label).join(" | ") +
    "\n" +
    cells.map((r) => r.map((c) => c.v.split("|")[0]).join(" | ")).join("\n") +
    (note ? `\nNote to examiners: ${note}` : "");
  return t;
}

const BANDS6: string[][] = [
  ["0", "The response does not reach a standard described by the descriptors below."],
  ["1-2", "Limited understanding of the issues. Points are mostly listed with little development and little or no reference to the scenario. No real evaluation or conclusion."],
  ["3-4", "Some understanding. Several relevant points are developed and partly applied to the scenario, but the analysis is one-sided or uneven. A conclusion may be stated with limited support."],
  ["5-6", "Clear understanding. A balanced analysis of strengths and weaknesses is consistently applied to the scenario, using correct terminology. A reasoned conclusion follows from the analysis."],
];

const BANDS8: string[][] = [
  ["0", "The response does not reach a standard described by the descriptors below."],
  ["1-2", "Limited knowledge; a few relevant points are listed with little explanation and no link to the scenario."],
  ["3-4", "Some knowledge and understanding; points are partly explained, with limited application to the scenario. Evaluation is mostly one-sided."],
  ["5-6", "Good understanding; most points are explained and applied to the scenario. Both sides are considered, though some judgements are not fully supported."],
  ["7-8", "Detailed understanding with accurate terminology throughout. A balanced, well-developed evaluation consistently linked to the scenario, ending in a justified conclusion."],
];

const TF = ["0", "1"];
const tt = (label: string): TableColumn => ({ label, type: "select", options: TF });
const given = (label: string): TableColumn => ({ label });

// =====================================================================
// A1 Computer fundamentals
// =====================================================================
const A1: IGCSETask[] = [
  // ---------------- A1.1.1 CPU components ----------------
  mcq(
    { u: "A1", ref: "A1.1.1", title: "A1.1 CPU registers and buses", d: "Easy", cmd: "Identify" },
    "Answer each question about the components of the central processing unit (CPU).",
    [
      { q: "Which register holds the memory address of the next instruction to be fetched?", o: ["Memory address register (MAR)", "Program counter (PC)", "Instruction register (IR)", "Accumulator (AC)"], a: 1 },
      { q: "Which bus carries data in one direction only, from the CPU to memory?", o: ["Data bus", "Control bus", "Address bus", "System bus"], a: 2 },
      { q: "Which component performs comparisons such as checking whether one value is greater than another?", o: ["Arithmetic logic unit (ALU)", "Control unit (CU)", "Memory data register (MDR)", "Program counter (PC)"], a: 0 },
      { q: "Which register temporarily stores the result of a calculation carried out by the ALU?", o: ["Instruction register (IR)", "Memory address register (MAR)", "Program counter (PC)", "Accumulator (AC)"], a: 3 },
    ]
  ),
  inspect(
    { u: "A1", ref: "A1.1.1", title: "A1.1 Naming CPU registers", d: "Easy", cmd: "Identify" },
    "Identify the register described in each statement. Give the abbreviation (for example PC).",
    [
      { q: "Holds the instruction currently being decoded and executed.", a: ["IR", "instruction register"] },
      { q: "Holds the address of the memory location that is about to be read from or written to.", a: ["MAR", "memory address register"] },
      { q: "Holds the data or instruction that has just been read from memory, or is about to be written to memory.", a: ["MDR", "memory data register", "MBR", "memory buffer register"] },
      { q: "Is incremented during the fetch stage so that it points to the next instruction.", a: ["PC", "program counter"] },
      { q: "Holds intermediate results produced by the ALU.", a: ["AC", "ACC", "accumulator"] },
    ]
  ),
  theory(
    { u: "A1", ref: "A1.1.1", title: "A1.1 Role of the control unit", d: "Easy", cmd: "Describe" },
    "Describe the role of the control unit (CU) in a CPU.",
    {
      m: 2,
      kw: ["control signals", "decode", "coordinates", "fetch", "timing", "clock"],
      pts: [
        "Decodes the instruction held in the IR / determines what operation is required",
        "Sends control signals (via the control bus) to other components such as the ALU, registers and memory",
        "Coordinates / manages the fetch-decode-execute cycle and the flow of data within the CPU",
        "Synchronizes operations using the clock / controls timing",
      ],
      notes: ["Do not accept 'it controls the computer' without further description."],
    }
  ),
  theory(
    { u: "A1", ref: "A1.1.1", title: "A1.1 Multi-core processors and co-processors", d: "Moderate", cmd: "Describe" },
    "A games console contains a multi-core processor and a co-processor. Describe how a multi-core processor and a co-processor each improve the performance of the console compared with a single core processor.",
    {
      m: 3,
      kw: ["multiple cores", "parallel", "threads", "co-processor", "specialized", "offload"],
      pts: [
        "A multi-core processor has two or more independent processing units (cores) on one chip",
        "Different cores can execute different instructions / threads / processes at the same time (in parallel)",
        "A single core processor can only execute one instruction stream at a time (it must switch between tasks)",
        "A co-processor is a separate processor that performs specialized tasks (e.g. graphics, floating-point, audio, encryption)",
        "Offloading specialized tasks to the co-processor frees the main CPU to carry on with other work",
      ],
    }
  ),
  // ---------------- A1.1.2 / A1.1.3 GPU ----------------
  theory(
    { u: "A1", ref: "A1.1.2", title: "A1.1 Role of a GPU in machine learning", d: "Moderate", cmd: "Describe" },
    "A research team trains an artificial intelligence (AI) model on millions of images. Describe why a graphics processing unit (GPU) is suitable for this task.",
    {
      m: 3,
      kw: ["thousands of cores", "parallel", "matrix", "same operation", "high bandwidth", "throughput"],
      pts: [
        "A GPU contains a very large number (hundreds or thousands) of simple cores",
        "These cores perform the same operation on many data items at the same time (massive parallelism / SIMD)",
        "Training involves large numbers of repetitive, independent calculations such as matrix / vector multiplications",
        "GPUs have high-bandwidth dedicated memory so large data sets can be supplied to the cores quickly",
        "This gives high throughput, so training is completed much faster than on a CPU alone",
      ],
    }
  ),
  theory(
    { u: "A1", ref: "A1.1.3", title: "A1.1 CPU versus GPU design", d: "Moderate", cmd: "Explain", hl: true },
    "Explain the differences between a CPU and a GPU in terms of their design philosophy and core architecture.",
    {
      m: 4,
      kw: ["latency", "throughput", "few powerful cores", "many simple cores", "control logic", "cache", "general purpose"],
      pts: [
        "A CPU is designed for low latency / to complete a single task (sequential instruction stream) as fast as possible",
        "A GPU is designed for high throughput / to complete many similar tasks at once",
        "A CPU has a small number of powerful, complex cores with large caches and sophisticated control logic (e.g. branch prediction)",
        "A GPU has a very large number of simpler cores that share control logic and execute the same instruction on different data",
        "Therefore a CPU suits general-purpose, branching, varied tasks, whereas a GPU suits data-parallel tasks such as rendering pixels",
        "A GPU usually has its own high-bandwidth memory whereas a CPU accesses main memory through a cache hierarchy",
      ],
      notes: ["Award marks for a difference only if both sides are stated or clearly implied."],
    }
  ),
  multi(
    { u: "A1", ref: "A1.1.3", title: "A1.1 CPU and GPU in a video-editing studio", d: "Hard", cmd: "Explain", hl: true },
    "A video-editing studio uses workstations that contain both a CPU and a GPU. Editors apply colour filters to every frame of 4K video and then export the finished film.",
    [
      { q: "Identify one task in this scenario that is better suited to the GPU than the CPU.", m: 1, cmd: "Identify", kw: ["filter", "pixels", "rendering", "encoding"], pts: [["Applying the colour filter to every pixel of each frame", "rendering frames", "encoding / exporting the video frames", "applying effects to frames"]] },
      {
        q: "Explain how the CPU and the GPU work together when a filter is applied to the video.",
        m: 3,
        cmd: "Explain",
        kw: ["task division", "copies data", "GPU memory", "kernel", "coordinates", "results returned"],
        pts: [
          "The CPU runs the editing software and divides the work, sending the parallel (pixel) work to the GPU",
          "Frame data is copied / shared from main memory to the GPU memory (or a shared memory region)",
          "The GPU processes many pixels simultaneously while the CPU continues with other tasks (e.g. user interface, file I/O)",
          "The CPU coordinates execution / synchronizes and the results are returned to the CPU / main memory to be displayed or saved",
        ],
      },
      {
        q: "Outline why a GPU can be more power efficient than a CPU for this type of task.",
        m: 2,
        cmd: "Outline",
        kw: ["performance per watt", "simple cores", "parallel", "finishes faster"],
        pts: [
          "GPU cores are simple, with less control logic per core, so more of the energy is used for calculation",
          "For highly parallel work a GPU completes more operations per watt / finishes the job much faster, using less total energy",
          "Less energy is spent on complex control logic / caches per operation than in a CPU",
        ],
        notes: ["Note to examiners: a GPU draws more power overall when busy, so it is less efficient for small sequential tasks; credit candidates who make this point as part of a valid outline."],
      },
    ]
  ),
  // ---------------- A1.1.4 Primary memory ----------------
  mcq(
    { u: "A1", ref: "A1.1.4", title: "A1.1 Types of primary memory", d: "Easy", cmd: "Identify" },
    "Answer each question about primary memory.",
    [
      { q: "Which type of memory is volatile and holds the programs and data currently in use?", o: ["ROM", "RAM", "Flash memory", "Optical disk"], a: 1 },
      { q: "Which type of memory stores the firmware needed to start up the computer?", o: ["Cache", "Registers", "ROM", "RAM"], a: 2 },
      { q: "What is a cache hit?", o: ["The data required by the CPU is found in the cache", "The cache is full and must be emptied", "The CPU writes data directly to secondary storage", "The data required is not found in the cache"], a: 0 },
      { q: "Which list orders memory from fastest to slowest?", o: ["RAM, L1 cache, registers, L3 cache", "L3 cache, L1 cache, registers, RAM", "Registers, L1 cache, L3 cache, RAM", "Registers, RAM, L1 cache, L3 cache"], a: 2 },
    ]
  ),
  multi(
    { u: "A1", ref: "A1.1.4", title: "A1.1 Cache levels, hits and misses", d: "Moderate", cmd: "Explain" },
    "A laptop CPU has three levels of cache (L1, L2 and L3) as well as 16 GB of RAM.",
    [
      { q: "Outline why L1 cache is faster than L3 cache.", m: 2, cmd: "Outline", kw: ["closer to core", "smaller", "per core", "shared"], pts: ["L1 is located inside / closest to each core, so signals travel a shorter distance", "L1 is smaller, so it is quicker to search / access", "L3 is larger and shared between cores, which increases access time"] },
      {
        q: "Explain how the terms 'cache hit' and 'cache miss' relate to the performance of the CPU.",
        m: 3,
        cmd: "Explain",
        kw: ["found in cache", "not found", "fetch from RAM", "delay", "hit rate"],
        pts: [
          "A cache hit occurs when the required data / instruction is found in the cache, so it is supplied quickly",
          "A cache miss occurs when it is not in the cache, so the next level of cache or RAM must be accessed",
          "A miss causes a delay / the CPU waits (stalls) because RAM is much slower",
          "The data is then copied into the cache so later requests are hits; a higher hit rate gives better performance",
        ],
      },
      { q: "State one reason why ROM is still needed in the laptop.", m: 1, cmd: "State", kw: ["non-volatile", "boot", "firmware"], pts: [["It is non-volatile so it keeps the start-up / boot firmware (BIOS / UEFI) when the power is off", "non-volatile", "stores the bootstrap / BIOS / firmware"]] },
    ]
  ),
  table(
    { u: "A1", ref: "A1.1.4", title: "A1.1 Matching primary memory types", d: "Moderate", cmd: "Identify" },
    "For each statement, select the type of primary memory that it describes.",
    [given("Statement"), { label: "Memory type", type: "select", options: ["RAM", "ROM", "Cache", "Registers"] }],
    [
      ["=Contents are retained when the power is switched off and it holds the start-up instructions", "ROM"],
      ["=The fastest memory, located inside the CPU, holding values currently being processed", "Registers"],
      ["=Small, fast memory that holds copies of frequently used data and instructions from main memory", "Cache"],
      ["=Volatile main memory that holds the operating system and open applications", "RAM"],
      ["=Organized into levels named L1, L2 and L3", "Cache"],
    ],
    5
  ),
  // ---------------- A1.1.5 Fetch-decode-execute ----------------
  table(
    { u: "A1", ref: "A1.1.5", title: "A1.1 Register trace of the fetch stage", d: "Moderate", cmd: "Construct" },
    "The program counter (PC) contains 200. Memory location 200 holds the instruction ADD 57.\nComplete the table to show the contents of the registers after each step of the fetch stage. Leave no cell blank.",
    [given("Step"), given("Operation"), { label: "PC" }, { label: "MAR" }, { label: "MDR" }, { label: "IR" }],
    [
      ["=0", "=Start", "=200", "=-", "=-", "=-"],
      ["=1", "=Copy PC to MAR", "200", "200", "-", "-"],
      ["=2", "=Read memory at MAR into MDR; increment PC", "201", "200", "ADD 57", "-"],
      ["=3", "=Copy MDR to IR", "201", "200", "ADD 57", "ADD 57"],
    ],
    4,
    "Use '-' for a register whose contents are unknown. Accept the PC being incremented in step 1 or 2 if the candidate states this."
  ),
  multi(
    { u: "A1", ref: "A1.1.5", title: "A1.1 Fetch-decode-execute and the buses", d: "Moderate", cmd: "Describe" },
    "A CPU executes a program stored in RAM. It is connected to RAM by an address bus, a data bus and a control bus.",
    [
      { q: "State the purpose of the memory data register (MDR).", m: 1, cmd: "State", kw: ["holds data", "read from", "written to memory"], pts: [["Holds the data / instruction that has been read from memory or is to be written to memory", "temporarily stores data transferred to or from memory"]] },
      {
        q: "Describe how the address bus, data bus and control bus are used during the fetch stage.",
        m: 3,
        cmd: "Describe",
        kw: ["address of instruction", "MAR", "read signal", "data bus", "MDR"],
        pts: [
          "The address in the MAR (copied from the PC) is sent along the address bus to RAM",
          "The control unit sends a 'memory read' signal along the control bus",
          "The instruction stored at that address is returned along the data bus into the MDR",
        ],
      },
      {
        q: "Describe what happens during the decode and execute stages.",
        m: 2,
        cmd: "Describe",
        kw: ["control unit", "opcode", "operand", "ALU", "carried out"],
        pts: [
          "Decode: the control unit interprets the instruction in the IR, separating opcode and operand / identifying what is required",
          "Execute: the instruction is carried out, e.g. the ALU performs a calculation, data is loaded / stored, or the PC is changed for a jump",
        ],
      },
    ]
  ),
  theory(
    { u: "A1", ref: "A1.1.1", title: "A1.1 Why more cores is not always faster", d: "Hard", cmd: "Explain" },
    "A student upgrades from a dual-core to an eight-core processor but finds that her spreadsheet program runs no faster. Explain why increasing the number of cores does not always increase performance.",
    {
      m: 4,
      kw: ["parallel", "sequential", "threads", "dependent", "overhead", "shared resources", "bottleneck"],
      pts: [
        "The program may not be written to use multiple threads / may be sequential, so it runs on only one core",
        "Some tasks have steps that depend on the result of earlier steps, so they cannot be split up to run in parallel",
        "Splitting work between cores adds overhead for coordination / communication / synchronization",
        "Cores share resources such as the L3 cache, memory bandwidth and buses, which can become a bottleneck",
        "Performance may be limited by other factors such as clock speed, RAM size or secondary storage speed",
      ],
    }
  ),
  // ---------------- A1.1.6 Pipelining (HL) ----------------
  theory(
    { u: "A1", ref: "A1.1.6", title: "A1.1 Pipelining", d: "Moderate", cmd: "Describe", hl: true },
    "Describe how pipelining improves the performance of a processor core.",
    {
      m: 3,
      kw: ["stages", "overlap", "fetch", "decode", "execute", "write-back", "throughput"],
      pts: [
        "Instruction processing is split into stages: fetch, decode, execute and write-back",
        "Different instructions are at different stages at the same time / stages overlap (e.g. one instruction is fetched while the previous is decoded)",
        "Each stage is busy every clock cycle, so ideally one instruction completes per cycle, increasing throughput",
        "In a multi-core processor each core has its own pipeline, so cores process separate instruction streams independently and in parallel",
      ],
      notes: ["Note to examiners: the time for an individual instruction is not reduced; award a mark if the candidate states this correctly."],
    }
  ),
  inspect(
    { u: "A1", ref: "A1.1.6", title: "A1.1 Counting pipeline clock cycles", d: "Hard", cmd: "Calculate", hl: true },
    "A processor core uses four stages: fetch, decode, execute and write-back. Each stage takes exactly one clock cycle. Assume there are no stalls or hazards. Give each answer as a whole number.",
    [
      { q: "How many clock cycles are needed to complete 10 instructions without pipelining?", a: ["40"], why: "10 instructions x 4 cycles each." },
      { q: "How many clock cycles are needed to complete 10 instructions with pipelining?", a: ["13"], why: "4 cycles to fill the pipeline, then one more instruction completes each cycle: 4 + (10 - 1)." },
      { q: "The 10 independent instructions are split equally between two cores, each with its own pipeline. How many clock cycles are needed?", a: ["8"], why: "Each core runs 5 instructions: 4 + (5 - 1) = 8, in parallel." },
    ]
  ),
  // ---------------- A1.1.7 Secondary storage ----------------
  mcq(
    { u: "A1", ref: "A1.1.7", title: "A1.1 Choosing secondary storage", d: "Easy", cmd: "Identify" },
    "Choose the most suitable secondary storage for each scenario.",
    [
      { q: "A low-cost smartphone needs small, cheap internal storage soldered to the circuit board.", o: ["Embedded multimedia card (eMMC)", "Hard disk drive (HDD)", "Optical drive", "Network attached storage (NAS)"], a: 0 },
      { q: "A family wants to store photographs centrally so that every device on the home network can access them.", o: ["Memory card", "Network attached storage (NAS)", "Optical drive", "Internal eMMC"], a: 1 },
      { q: "A digital camera needs small, removable storage.", o: ["Memory card", "Internal HDD", "NAS", "Optical disc"], a: 0 },
      { q: "A server needs to store very large amounts of rarely accessed archive data at the lowest cost per gigabyte.", o: ["Solid state drive (SSD)", "Hard disk drive (HDD)", "eMMC", "Flash drive"], a: 1 },
    ]
  ),
  multi(
    { u: "A1", ref: "A1.1.7", title: "A1.1 Storage for a school", d: "Moderate", cmd: "Compare" },
    "A school is replacing its staff laptops and its storage for shared teaching resources.",
    [
      { q: "Identify two types of external storage that a teacher could use to carry lesson files between home and school.", m: 2, cmd: "Identify", kw: ["flash drive", "external SSD", "external HDD", "memory card", "optical"], pts: [["Flash drive / USB memory stick", "usb stick", "pen drive"], ["External SSD", "portable SSD"], ["External HDD", "portable hard drive"], ["Memory card", "SD card"], ["Optical disc (CD / DVD / Blu-ray)", "dvd", "cd"]], notes: ["Do not accept 'cloud storage' (not a drive)."] },
      { q: "Describe one benefit to the school of storing shared resources on network attached storage (NAS).", m: 2, cmd: "Describe", kw: ["central", "accessible", "network", "backup", "share"], pts: ["Files are stored in one central place on the network", "So all staff can access the same / latest version from any connected device", "Easier to back up / manage permissions centrally", "Capacity can be expanded by adding drives"] },
      {
        q: "Compare solid state drives (SSDs) and hard disk drives (HDDs) as the internal storage for the new laptops.",
        m: 4,
        cmd: "Compare",
        kw: ["moving parts", "faster", "durable", "cost per GB", "capacity", "power"],
        pts: [
          "Both are non-volatile and store the operating system, applications and files",
          "SSDs have no moving parts, so they are more robust if the laptop is dropped / carried around; HDDs have spinning platters and moving heads",
          "SSDs have much faster read / write / access times, so the laptop boots and loads files faster",
          "SSDs use less power / produce less heat and noise, improving battery life",
          "HDDs are cheaper per gigabyte / offer larger capacities for the same price",
        ],
        notes: ["A comparison requires both similarities and differences; award a maximum of [3] if no similarity is given."],
      },
    ]
  ),
  // ---------------- A1.1.8 Compression ----------------
  inspect(
    { u: "A1", ref: "A1.1.8", title: "A1.1 Run-length encoding", d: "Easy", cmd: "Construct" },
    "A run-length encoding (RLE) scheme writes each run as a count followed by the character, for example WWWB becomes 3W1B. Give your answers with no spaces.",
    [
      { q: "Encode the string AAAABBBCCD.", a: ["4A3B2C1D"] },
      { q: "Decode the string 3W2B4W.", a: ["WWWBBWWWW"] },
      { q: "Encode the string XYXY.", a: ["1X1Y1X1Y"], why: "No runs: the encoded version is longer than the original, showing RLE is unsuitable for data without repetition." },
    ]
  ),
  theory(
    { u: "A1", ref: "A1.1.8", title: "A1.1 Lossy versus lossless compression", d: "Moderate", cmd: "Compare" },
    "Compare lossy compression and lossless compression.",
    {
      m: 4,
      kw: ["file size", "permanently removed", "original restored", "quality", "RLE", "transform coding"],
      pts: [
        "Both reduce the size of a file, so it needs less storage space / is transmitted faster",
        "Lossy compression permanently removes data, so the original file cannot be reconstructed exactly",
        "Lossless compression allows the original file to be restored exactly / no data is lost",
        "Lossy usually achieves a much greater reduction in file size than lossless",
        "Lossy is suitable for images, audio and video where some loss is not noticed; lossless is needed for text, program code and databases",
        "Example of lossless: run-length encoding; example of lossy: transform coding",
      ],
    }
  ),
  multi(
    { u: "A1", ref: "A1.1.8", title: "A1.1 Compression for a streaming service", d: "Hard", cmd: "Explain" },
    "A video streaming service compresses its films before sending them to customers. It also distributes the app that customers install.",
    [
      { q: "State why lossy compression is appropriate for the films.", m: 1, cmd: "State", kw: ["smaller", "bandwidth", "not noticeable"], pts: [["It gives a much smaller file so it streams with less bandwidth, and the lost detail is not noticeable to viewers", "much smaller files", "loss not noticed by viewers"]] },
      {
        q: "Describe how transform coding reduces the size of a video frame.",
        m: 2,
        cmd: "Describe",
        kw: ["frequency", "transform", "discard", "high-frequency", "quantize"],
        pts: [
          "Blocks of pixel data are transformed into frequency components (e.g. using a discrete cosine transform)",
          "Components that the human eye is less sensitive to (fine, high-frequency detail) are discarded / stored with less precision (quantized)",
          "The remaining coefficients need fewer bits to store",
        ],
      },
      {
        q: "Explain why run-length encoding would be ineffective for compressing photographs.",
        m: 2,
        cmd: "Explain",
        kw: ["runs", "adjacent pixels", "colours vary", "larger"],
        pts: ["RLE only saves space when there are long runs of identical values", "In photographs neighbouring pixels usually have slightly different colours, so there are few runs", "The encoded file may be no smaller, or even larger, than the original"],
      },
      {
        q: "Explain why the app must be compressed using lossless compression.",
        m: 2,
        cmd: "Explain",
        kw: ["every bit", "program", "instructions", "corrupt", "exactly"],
        pts: ["Program files must be restored exactly / bit for bit", "Losing any data would change instructions, so the program would be corrupted / fail to run"],
      },
    ]
  ),
  // ---------------- A1.1.9 Cloud services ----------------
  mcq(
    { u: "A1", ref: "A1.1.9", title: "A1.1 SaaS, PaaS or IaaS", d: "Easy", cmd: "Identify" },
    "Identify the cloud service model used in each scenario.",
    [
      { q: "A school uses an online word processor through a web browser; the provider manages everything.", o: ["IaaS", "PaaS", "SaaS", "None of these"], a: 2 },
      { q: "A company rents virtual servers and storage, and installs and manages its own operating system.", o: ["SaaS", "IaaS", "PaaS", "None of these"], a: 1 },
      { q: "Developers deploy their web application code to a provider that manages the operating system, runtime and scaling.", o: ["PaaS", "SaaS", "IaaS", "None of these"], a: 0 },
    ]
  ),
  multi(
    { u: "A1", ref: "A1.1.9", title: "A1.1 Cloud models for a start-up", d: "Hard", cmd: "Evaluate" },
    "A small start-up company is building an online booking system for gyms. It has two developers and no system administrator. It is deciding whether to host the system using infrastructure as a service (IaaS) or platform as a service (PaaS).",
    [
      { q: "Define infrastructure as a service (IaaS).", m: 1, cmd: "Define", kw: ["virtual machines", "storage", "networking", "rented"], pts: [["A cloud model in which the provider supplies virtualized computing resources (servers, storage, networking) and the customer manages the operating system and software", "renting virtual hardware over the internet"]] },
      {
        q: "Outline one difference in the level of control the customer has when using PaaS compared with software as a service (SaaS).",
        m: 2,
        cmd: "Outline",
        kw: ["deploy own code", "configure", "ready-made", "no control"],
        pts: ["With PaaS the customer develops / deploys and configures its own applications on the platform", "With SaaS the customer only uses a finished application and controls little more than user settings / data"],
      },
      {
        q: "Evaluate the use of IaaS and PaaS for the start-up's booking system.",
        m: 6,
        cmd: "Evaluate",
        bands: BANDS6,
        kw: ["control", "flexibility", "administration", "scaling", "cost", "lock-in", "security"],
        pts: [
          "IaaS gives full control over the operating system, software versions and configuration, giving maximum flexibility",
          "IaaS requires the company to install, patch, secure and back up servers itself, which is difficult with no system administrator",
          "PaaS hides the infrastructure, so the two developers can concentrate on writing the booking system",
          "PaaS usually provides automatic scaling / load balancing to cope with peak booking times",
          "PaaS limits choice of languages / frameworks and can lead to vendor lock-in, making a later move costly",
          "Costs: both are pay-as-you-go; IaaS may be cheaper for raw resources but needs more staff time",
          "Conclusion: PaaS is likely to be more suitable for a small team with limited expertise, with IaaS considered if more control is needed later",
        ],
      },
    ]
  ),
  // ---------------- A1.2.1 Binary and hexadecimal ----------------
  inspect(
    { u: "A1", ref: "A1.2.1", title: "A1.2 Binary, denary and hexadecimal", d: "Easy", cmd: "Calculate" },
    "Carry out each conversion. Give binary answers in 8 bits and hexadecimal answers in capitals without a prefix.",
    [
      { q: "Convert the binary number 10110110 to denary.", a: ["182"] },
      { q: "Convert the binary number 10110110 to hexadecimal.", a: ["B6", "0xB6"] },
      { q: "Convert the hexadecimal number 3F to denary.", a: ["63"] },
      { q: "Convert the denary number 200 to 8-bit binary.", a: ["11001000", "1100 1000"] },
    ]
  ),
  inspect(
    { u: "A1", ref: "A1.2.1", title: "A1.2 Larger hexadecimal conversions", d: "Moderate", cmd: "Calculate" },
    "Carry out each conversion. Give hexadecimal answers in capitals without a prefix.",
    [
      { q: "Convert the hexadecimal number 2AC to denary.", a: ["684"], why: "2x256 + 10x16 + 12 = 684" },
      { q: "Convert the denary number 1000 to hexadecimal.", a: ["3E8", "0x3E8"], why: "1000 = 3x256 + 14x16 + 8" },
      { q: "Convert the binary number 111100001010 to hexadecimal.", a: ["F0A", "0xF0A"], why: "Split into nibbles 1111 0000 1010." },
      { q: "Convert the hexadecimal number 7D to 8-bit binary.", a: ["01111101", "0111 1101", "1111101"] },
    ]
  ),
  mcq(
    { u: "A1", ref: "A1.2.1", title: "A1.2 Representing integers", d: "Easy", cmd: "Identify" },
    "Answer each question about representing integers.",
    [
      { q: "Why do programmers often write binary values in hexadecimal?", o: ["Hexadecimal uses less memory inside the computer", "Hexadecimal is shorter and easier for humans to read, with less chance of error", "The CPU can only process hexadecimal", "Hexadecimal can store negative numbers but binary cannot"], a: 1 },
      { q: "What is the largest denary value that can be stored in 8 bits as an unsigned integer?", o: ["127", "128", "255", "256"], a: 2 },
      { q: "What is the minimum number of bits needed to give a unique code to each of 300 items?", o: ["8", "9", "10", "300"], a: 1 },
      { q: "How many bits are represented by one hexadecimal digit?", o: ["2", "4", "8", "16"], a: 1 },
    ]
  ),
  // ---------------- A1.2.2 Storing data in binary ----------------
  inspect(
    { u: "A1", ref: "A1.2.2", title: "A1.2 Image and sound file sizes", d: "Moderate", cmd: "Calculate" },
    "Calculate each value. Ignore metadata and compression. Give whole numbers without units or separators.",
    [
      { q: "How many different colours can be represented with a colour depth of 8 bits?", a: ["256"] },
      { q: "An image is 800 x 600 pixels with a colour depth of 24 bits. What is its size in bytes?", a: ["1440000"], why: "800 x 600 x 24 / 8 = 1 440 000 bytes" },
      { q: "A 10-second stereo (2 channel) recording uses a sample rate of 44 100 Hz and a sample resolution of 16 bits. What is its size in bytes?", a: ["1764000"], why: "44 100 x 16 x 2 x 10 / 8 = 1 764 000 bytes" },
      { q: "A video is 30 seconds long at 25 frames per second. How many frames does it contain?", a: ["750"] },
    ]
  ),
  theory(
    { u: "A1", ref: "A1.2.2", title: "A1.2 Storing characters and strings", d: "Moderate", cmd: "Explain" },
    "Explain how characters and strings are stored in binary, and why Unicode is used in preference to 7-bit ASCII for a multilingual website.",
    {
      m: 4,
      kw: ["character set", "unique code", "ASCII", "Unicode", "sequence", "bits per character"],
      pts: [
        "Each character is given a unique numeric code from a character set, which is stored in binary",
        "A string is stored as a sequence of these character codes (often with a length or terminator)",
        "7-bit ASCII can represent only 128 characters, enough for English letters, digits and punctuation",
        "Unicode uses more bits per character (e.g. UTF-8 / UTF-16 / UTF-32), so it can represent over a million characters",
        "This includes the alphabets / scripts of many languages and symbols such as emoji, so all text on the website can be displayed",
        "Unicode includes ASCII as its first 128 codes, so it remains compatible",
      ],
    }
  ),
  multi(
    { u: "A1", ref: "A1.2.2", title: "A1.2 Storing images, audio and video", d: "Hard", cmd: "Explain" },
    "A security camera records colour video with sound and stores it on a local drive.",
    [
      { q: "Define the term colour depth.", m: 1, cmd: "Define", kw: ["bits per pixel", "colour"], pts: [["The number of bits used to store the colour of each pixel", "bits per pixel"]] },
      {
        q: "Explain how increasing the image resolution of the camera affects the storage and retrieval of the video.",
        m: 3,
        cmd: "Explain",
        kw: ["more pixels", "larger file", "storage capacity", "transfer time", "detail"],
        pts: [
          "Higher resolution means more pixels per frame, so more bits are stored per frame",
          "The video files are larger, so less footage fits on the drive / the drive fills sooner",
          "Larger files take longer to read / transfer / search, so retrieval is slower or needs more bandwidth",
          "The benefit is more detail, e.g. faces can be identified more clearly",
        ],
      },
      {
        q: "Explain how the video and its sound are represented in binary.",
        m: 4,
        cmd: "Explain",
        kw: ["frames", "pixels", "frame rate", "sampling", "amplitude", "sample rate", "bit depth"],
        pts: [
          "Video is stored as a sequence of still images (frames) displayed quickly, e.g. 25 frames per second",
          "Each frame is a bitmap of pixels and each pixel's colour is stored as a binary number",
          "Sound is sampled: the amplitude of the analogue wave is measured at regular intervals",
          "Each sample is stored as a binary number using a fixed number of bits (sample resolution / bit depth); the sample rate is the number of samples per second",
          "The audio and video streams are stored together in a container file with synchronization / timing information",
        ],
      },
    ]
  ),
  // ---------------- A1.2.3 Logic gates ----------------
  mcq(
    { u: "A1", ref: "A1.2.3", title: "A1.2 Logic gate behaviour", d: "Easy", cmd: "Identify" },
    "Answer each question about logic gates.",
    [
      { q: "Which gate outputs 1 only when its two inputs are different?", o: ["XNOR", "XOR", "NAND", "OR"], a: 1 },
      { q: "What is the output of a NAND gate when both inputs are 1?", o: ["0", "1", "It depends on the previous output", "Undefined"], a: 0 },
      { q: "Which gate outputs 1 only when both inputs are 0?", o: ["NOR", "NAND", "XOR", "AND"], a: 0 },
      { q: "Which gate outputs 1 when its two inputs are the same?", o: ["XOR", "NOR", "XNOR", "NOT"], a: 2 },
    ]
  ),
  theory(
    { u: "A1", ref: "A1.2.3", title: "A1.2 Purpose of logic gates", d: "Easy", cmd: "Outline" },
    "Outline the role of logic gates in a computer system.",
    {
      m: 2,
      kw: ["binary inputs", "Boolean", "output", "circuits", "adder", "memory", "decisions"],
      pts: [
        "A logic gate performs a Boolean operation on one or more binary inputs to produce a single binary output",
        "Gates are combined to build circuits that perform processing, e.g. adders in the ALU, comparators, multiplexers",
        "Gates are used to build memory elements such as flip-flops / registers",
        "They implement decision making in hardware, e.g. turning on an alarm when conditions are met",
      ],
    }
  ),
  // ---------------- A1.2.4 Truth tables ----------------
  table(
    { u: "A1", ref: "A1.2.4", title: "A1.2 Truth table for four gates", d: "Easy", cmd: "Construct" },
    "Complete the truth table for the NAND, NOR, XOR and XNOR gates with inputs A and B.",
    [given("A"), given("B"), tt("A NAND B"), tt("A NOR B"), tt("A XOR B"), tt("A XNOR B")],
    [
      ["=0", "=0", "1", "1", "0", "1"],
      ["=0", "=1", "1", "0", "1", "0"],
      ["=1", "=0", "1", "0", "1", "0"],
      ["=1", "=1", "0", "0", "0", "1"],
    ],
    4
  ),
  table(
    { u: "A1", ref: "A1.2.4", title: "A1.2 Truth table from an expression", d: "Moderate", cmd: "Construct" },
    "Complete the truth table for the expression Q = (A AND B) OR (NOT C).",
    [given("A"), given("B"), given("C"), tt("A AND B"), tt("NOT C"), tt("Q")],
    [
      ["=0", "=0", "=0", "0", "1", "1"],
      ["=0", "=0", "=1", "0", "0", "0"],
      ["=0", "=1", "=0", "0", "1", "1"],
      ["=0", "=1", "=1", "0", "0", "0"],
      ["=1", "=0", "=0", "0", "1", "1"],
      ["=1", "=0", "=1", "0", "0", "0"],
      ["=1", "=1", "=0", "1", "1", "1"],
      ["=1", "=1", "=1", "1", "0", "1"],
    ],
    4,
    "Award follow-through for Q if the intermediate columns are wrong but Q is consistent with them."
  ),
  table(
    { u: "A1", ref: "A1.2.4", title: "A1.2 Truth table for a home alarm", d: "Moderate", cmd: "Construct" },
    "A home alarm has three inputs:\n- D = 1 when the door is open\n- S = 1 when the system is armed\n- P = 1 when the panic button is pressed\nThe alarm X sounds (X = 1) when the door is open while the system is armed, or whenever the panic button is pressed.\nComplete the truth table for X.",
    [given("D"), given("S"), given("P"), tt("X")],
    [
      ["=0", "=0", "=0", "0"],
      ["=0", "=0", "=1", "1"],
      ["=0", "=1", "=0", "0"],
      ["=0", "=1", "=1", "1"],
      ["=1", "=0", "=0", "0"],
      ["=1", "=0", "=1", "1"],
      ["=1", "=1", "=0", "1"],
      ["=1", "=1", "=1", "1"],
    ],
    4,
    "X = (D AND S) OR P."
  ),
  table(
    { u: "A1", ref: "A1.2.4", title: "A1.2 Truth table from a logic diagram", d: "Moderate", cmd: "Construct" },
    "A logic circuit is built as follows:\n- inputs A and B go into a NOR gate, whose output is P\n- P and input C go into an XOR gate, whose output is Q\nComplete the truth table for P and Q.",
    [given("A"), given("B"), given("C"), tt("P"), tt("Q")],
    [
      ["=0", "=0", "=0", "1", "1"],
      ["=0", "=0", "=1", "1", "0"],
      ["=0", "=1", "=0", "0", "0"],
      ["=0", "=1", "=1", "0", "1"],
      ["=1", "=0", "=0", "0", "0"],
      ["=1", "=0", "=1", "0", "1"],
      ["=1", "=1", "=0", "0", "0"],
      ["=1", "=1", "=1", "0", "1"],
    ],
    4,
    "Q = (A NOR B) XOR C."
  ),
  inspect(
    { u: "A1", ref: "A1.2.4", title: "A1.2 Boolean algebra simplification", d: "Hard", cmd: "Construct" },
    "Simplify each Boolean expression as far as possible. Write AND as '.', OR as '+' and NOT as a prefix NOT (for example NOT A + B).",
    [
      { q: "A.B + A.NOT B", a: ["A"], why: "A.(B + NOT B) = A.1 = A" },
      { q: "(A + B).(A + NOT B)", a: ["A"], why: "A + B.NOT B = A + 0 = A" },
      { q: "NOT (NOT A . NOT B)", a: ["A + B", "A+B", "B + A", "B+A", "A OR B"], why: "De Morgan's law" },
      { q: "A + A.B", a: ["A"], why: "Absorption: A.(1 + B) = A" },
    ]
  ),
  multi(
    { u: "A1", ref: "A1.2.4", title: "A1.2 Karnaugh map simplification", d: "Hard", cmd: "Construct" },
    "A circuit has inputs A, B and C. Its output Q is 1 only for these input combinations (A B C): 001, 011, 101, 110 and 111. It is 0 for all other combinations.",
    [
      {
        q: "Construct the sum-of-products Boolean expression for Q directly from these rows.",
        m: 2,
        cmd: "Construct",
        kw: ["sum of products", "minterms"],
        pts: [
          "Five product terms, one for each row: NOT A.NOT B.C + NOT A.B.C + A.NOT B.C + A.B.NOT C + A.B.C",
          "Each term correctly negates the inputs that are 0 in that row",
        ],
      },
      {
        q: "Use a Karnaugh map to simplify the expression. Describe the groups you form and state the simplified expression.",
        m: 3,
        cmd: "Construct",
        kw: ["Karnaugh", "group", "quad", "pair", "C + A.B"],
        pts: [
          "A group of four 1s covering all cells where C = 1, giving the term C",
          "A group of two 1s covering A = 1, B = 1 (cells 110 and 111), giving the term A.B",
          ["Simplified expression Q = C + A.B", "Q = AB + C", "C OR (A AND B)"],
        ],
        notes: ["Accept a correctly drawn map described in words. Award the final mark for the correct expression even without the map."],
      },
      {
        q: "Describe the logic diagram for your simplified expression, naming each gate and its inputs.",
        m: 2,
        cmd: "Construct",
        kw: ["AND gate", "OR gate", "inputs"],
        pts: ["An AND gate with inputs A and B", "An OR gate whose inputs are the output of the AND gate and C, producing Q"],
      },
    ]
  ),
  // ---------------- A1.2.5 Logic diagrams ----------------
  theory(
    { u: "A1", ref: "A1.2.5", title: "A1.2 Constructing a logic diagram", d: "Moderate", cmd: "Construct" },
    "A logic diagram is to be drawn for Q = (A AND NOT B) OR (B XNOR C). Construct the diagram by describing, in order, each gate used and what is connected to its inputs and output.",
    {
      m: 4,
      kw: ["NOT gate", "AND gate", "XNOR gate", "OR gate", "inputs", "output"],
      pts: [
        "A NOT gate with input B",
        "An AND gate with inputs A and the output of the NOT gate",
        "An XNOR gate with inputs B and C",
        "An OR gate with inputs from the AND gate and the XNOR gate, whose output is Q",
      ],
      notes: ["Note to examiners: if a drawn diagram is submitted, accept standard gate symbols with clearly labelled connections."],
    }
  ),
  // ---------------- A1.3.1 / A1.3.2 Operating systems ----------------
  theory(
    { u: "A1", ref: "A1.3.1", title: "A1.3 Role of an operating system", d: "Easy", cmd: "Describe" },
    "Describe the role of an operating system in hiding the complexity of the hardware.",
    {
      m: 2,
      kw: ["abstraction", "interface", "resources", "drivers", "applications"],
      pts: [
        "It provides an abstraction / interface between the user or applications and the hardware",
        "Applications request services (e.g. save a file, print) through system calls without needing to know how the specific hardware works",
        "It manages the system's resources (CPU time, memory, devices, storage) on behalf of programs",
      ],
    }
  ),
  mcq(
    { u: "A1", ref: "A1.3.2", title: "A1.3 Functions of an operating system", d: "Easy", cmd: "Identify" },
    "Identify the operating system function described in each case.",
    [
      { q: "Recording how much CPU time and storage each user has used.", o: ["Accounting", "Scheduling", "Virtualization", "Networking"], a: 0 },
      { q: "Allocating space in RAM to processes and preventing one process from overwriting another's memory.", o: ["File system management", "Memory management", "Device management", "Security"], a: 1 },
      { q: "Using drivers to communicate with a printer and a scanner.", o: ["Device management", "Accounting", "Scheduling", "Memory management"], a: 0 },
      { q: "Running several isolated virtual machines on a single physical computer.", o: ["Networking", "Graphical user interface", "Virtualization", "Scheduling"], a: 2 },
    ]
  ),
  multi(
    { u: "A1", ref: "A1.3.2", title: "A1.3 Operating system functions in a school", d: "Moderate", cmd: "Describe" },
    "A school network runs many computers, each with an operating system, and a server that hosts several virtual machines.",
    [
      { q: "Describe how the operating system performs memory management.", m: 2, cmd: "Describe", kw: ["allocate", "deallocate", "protect", "virtual memory", "paging"], pts: ["Allocates memory to processes when they start and frees it when they finish", "Keeps each process's memory separate / protected from other processes", "Uses virtual memory / paging to move data between RAM and secondary storage when RAM is full"] },
      { q: "Describe how the file system function helps users.", m: 2, cmd: "Describe", kw: ["directories", "names", "permissions", "locate"], pts: ["Organizes data into named files and folders / directories", "Keeps track of where each file is physically stored so it can be located and retrieved", "Controls access permissions (read / write) for files"] },
      { q: "Describe one benefit to the school of virtualization on the server.", m: 2, cmd: "Describe", kw: ["several virtual machines", "one physical", "isolation", "cost"], pts: ["Several virtual servers run on one physical machine, reducing hardware cost / space / power", "Each virtual machine is isolated, so a fault or attack in one does not affect the others", "Virtual machines can be created, copied or backed up quickly"] },
    ]
  ),
  // ---------------- A1.3.3 Scheduling ----------------
  inspect(
    { u: "A1", ref: "A1.3.3", title: "A1.3 FCFS and round robin timings", d: "Moderate", cmd: "Calculate" },
    "Three processes arrive at time 0 in the order P1, P2, P3. Their CPU burst times are P1 = 8, P2 = 4 and P3 = 2 time units. Ignore context-switch time.",
    [
      { q: "Using first-come first-served (FCFS), at what time does P3 finish?", a: ["14"] },
      { q: "Using FCFS, what is the waiting time of P2?", a: ["8"] },
      { q: "Using round robin with a time quantum of 3, which process finishes first?", a: ["P3"], why: "P1 0-3, P2 3-6, P3 6-8 (finished)." },
      { q: "Using round robin with a time quantum of 3, at what time does P2 finish?", a: ["12"], why: "P1 8-11, P2 11-12 (finished), P1 12-14." },
    ]
  ),
  theory(
    { u: "A1", ref: "A1.3.3", title: "A1.3 FCFS versus round robin", d: "Moderate", cmd: "Compare" },
    "Compare first-come first-served (FCFS) and round robin scheduling.",
    {
      m: 4,
      kw: ["queue", "order of arrival", "time slice", "quantum", "pre-emptive", "convoy", "responsiveness", "context switch"],
      pts: [
        "Both allocate CPU time to processes in the order they join a queue / neither uses priorities",
        "FCFS runs each process to completion before the next starts (non-pre-emptive)",
        "Round robin gives each process a fixed time slice (quantum) and then moves it to the back of the queue (pre-emptive)",
        "In FCFS a long process can make short processes wait a long time (convoy effect)",
        "Round robin gives better response times / fairness for interactive users",
        "Round robin has more overhead because of frequent context switches",
      ],
    }
  ),
  theory(
    { u: "A1", ref: "A1.3.3", title: "A1.3 Priority and multilevel queue scheduling", d: "Hard", cmd: "Compare" },
    "Compare priority scheduling and multilevel queue scheduling, referring to how each would handle system processes and background print jobs.",
    {
      m: 4,
      kw: ["priority", "starvation", "ageing", "separate queues", "categories", "own algorithm"],
      pts: [
        "Both give preference to more important processes, so system processes can run before print jobs",
        "Priority scheduling gives each process a priority value and always runs the highest-priority ready process",
        "Multilevel queue scheduling places processes into separate queues by type (e.g. system, interactive, batch), each queue with its own scheduling algorithm",
        "In multilevel queues, processes are permanently assigned to a queue and queues are served in priority order or given fixed shares of CPU time",
        "Both risk starvation of low-priority print jobs; ageing (gradually raising priority) or time-sharing between queues can prevent this",
      ],
    }
  ),
  // ---------------- A1.3.4 Polling and interrupts ----------------
  multi(
    { u: "A1", ref: "A1.3.4", title: "A1.3 Polling or interrupts for a sensor", d: "Hard", cmd: "Evaluate" },
    "A battery-powered wildlife camera contains a motion sensor. Animals pass the camera unpredictably, perhaps a few times each night. When motion is detected, the camera must take a photograph within 0.1 seconds.",
    [
      { q: "Define the term interrupt.", m: 1, cmd: "Define", kw: ["signal", "processor", "attention", "event"], pts: [["A signal sent to the processor by a device or program indicating that an event needs immediate attention", "a signal that causes the CPU to stop its current task to service an event"]] },
      { q: "Outline how polling would be used to detect motion.", m: 2, cmd: "Outline", kw: ["repeatedly checks", "regular intervals", "status"], pts: ["The processor repeatedly checks / reads the sensor's status at regular intervals", "If motion is detected during a check, it runs the routine to take the photograph"] },
      {
        q: "Evaluate the use of polling and interrupt handling for this camera.",
        m: 6,
        cmd: "Evaluate",
        bands: BANDS6,
        kw: ["event frequency", "overhead", "battery", "predictability", "latency", "sleep"],
        pts: [
          "Events are infrequent and unpredictable, so polling would mostly find nothing, wasting CPU cycles",
          "Polling keeps the processor awake, using battery power; with interrupts the processor can sleep until motion occurs",
          "Interrupts give a fast response (low latency) as soon as motion occurs; polling latency depends on the polling interval",
          "Polling frequently enough to meet 0.1 s increases overhead further; polling slowly risks missing the deadline",
          "Polling is simpler to program and its timing is predictable / controlled, which can suit frequent, regular events",
          "Interrupt handlers add complexity and a faulty or spoofed interrupt source could be a security / reliability concern",
          "Conclusion: interrupt handling is more suitable because events are rare, unpredictable and the device is battery powered",
        ],
      },
    ]
  ),
  mcq(
    { u: "A1", ref: "A1.3.4", title: "A1.3 Choosing polling or interrupts", d: "Moderate", cmd: "Identify" },
    "Select the most appropriate statement for each scenario.",
    [
      { q: "A keyboard on a desktop computer: key presses happen at unpredictable times.", o: ["Interrupts are better, because the CPU does not waste time checking when no key is pressed", "Polling is better, because key presses are predictable", "Polling is better, because interrupts cannot be used for input devices", "Neither is needed"], a: 0 },
      { q: "A factory controller reads a temperature sensor that produces a new reading exactly every 10 ms and the value is needed every time.", o: ["Interrupts are always better than polling", "Polling at a 10 ms interval is reasonable because the events are frequent and predictable", "Polling should be done once a minute to save power", "The sensor should be read only when the user requests it"], a: 1 },
      { q: "Which is a disadvantage of interrupts compared with polling?", o: ["They always waste more CPU time", "They cannot be prioritized", "They add complexity, and a very high rate of interrupts can overload the CPU", "They only work on mains-powered devices"], a: 2 },
    ]
  ),
  // ---------------- A1.3.5 Multitasking and resource allocation (HL) ----------------
  theory(
    { u: "A1", ref: "A1.3.5", title: "A1.3 Deadlock", d: "Moderate", cmd: "Explain", hl: true },
    "Explain, using an example, how deadlock can occur in a multitasking operating system.",
    {
      m: 4,
      kw: ["holds", "waits", "resource", "circular wait", "neither can continue"],
      pts: [
        "Deadlock is a situation where two or more processes are each waiting for a resource held by another, so none can continue",
        "Example: process P1 holds the printer and requests the scanner",
        "while process P2 holds the scanner and requests the printer",
        "Neither releases its resource while waiting (hold and wait / no pre-emption), creating a circular wait",
        "Resources are non-shareable (mutual exclusion), so only one process can use each at a time",
      ],
    }
  ),
  multi(
    { u: "A1", ref: "A1.3.5", title: "A1.3 Multitasking and resource contention", d: "Hard", cmd: "Explain", hl: true },
    "A hospital server runs many processes at once, including a patient database, a backup service and a report generator. They share CPU time, memory, files and a printer.",
    [
      { q: "Define resource contention.", m: 1, cmd: "Define", kw: ["compete", "same resource", "at the same time"], pts: [["When several processes compete for the same limited resource at the same time", "processes competing for a shared resource"]] },
      {
        q: "Explain how the operating system enables these processes to multitask on a single core.",
        m: 3,
        cmd: "Explain",
        kw: ["scheduler", "time slice", "context switch", "save state", "illusion"],
        pts: [
          "The scheduler allocates the CPU to each process in turn for short periods",
          "When a process is paused, its state (registers, PC) is saved in its process control block and another process's state is loaded (context switch)",
          "Switching happens so quickly that the processes appear to run at the same time",
          "Processes waiting for I/O are blocked so the CPU can be given to ready processes",
        ],
      },
      {
        q: "Explain two strategies the operating system could use to deal with deadlock between these processes.",
        m: 4,
        cmd: "Explain",
        kw: ["prevention", "avoidance", "detection", "recovery", "ordering", "pre-empt"],
        pts: [
          "Prevention: require processes to request all resources at once / in a fixed order",
          "This removes hold-and-wait / circular wait, so deadlock cannot occur",
          "Avoidance: check each request and only grant it if the system remains in a safe state (e.g. banker's algorithm)",
          "Detection and recovery: periodically detect a cycle of waiting processes",
          "then recover by terminating a process or pre-empting / rolling back one of its resources",
        ],
        notes: ["Award [2] per strategy: [1] for identifying it and [1] for explaining how it handles deadlock."],
      },
    ]
  ),
  // ---------------- A1.3.6 / A1.3.7 Control systems (HL) ----------------
  mcq(
    { u: "A1", ref: "A1.3.6", title: "A1.3 Control system components", d: "Easy", cmd: "Identify", hl: true },
    "Answer each question about control systems.",
    [
      { q: "Which component converts a signal from the controller into physical movement, such as opening a valve?", o: ["Sensor", "Actuator", "Transducer", "Control algorithm"], a: 1 },
      { q: "Which type of control system uses feedback from its output to adjust its behaviour?", o: ["Open-loop", "Closed-loop", "Batch", "Manual"], a: 1 },
      { q: "A washing machine that runs each stage for a fixed time without measuring the result is an example of:", o: ["closed-loop control", "open-loop control", "feedback control", "adaptive control"], a: 1 },
      { q: "What is a transducer?", o: ["A device that converts energy or a signal from one form into another", "A program that decides what action to take", "A storage device for sensor readings", "A network device that forwards packets"], a: 0 },
    ]
  ),
  multi(
    { u: "A1", ref: "A1.3.6", title: "A1.3 Automatic irrigation control", d: "Moderate", cmd: "Explain", hl: true },
    "A farm uses an automatic irrigation system to keep the soil of a field at a suitable moisture level.",
    [
      { q: "Identify one sensor the system would use.", m: 1, cmd: "Identify", kw: ["moisture", "humidity", "rain"], pts: [["Soil moisture sensor", "moisture sensor", "humidity sensor", "rain sensor"]] },
      { q: "Identify one actuator the system would use.", m: 1, cmd: "Identify", kw: ["valve", "pump", "motor"], pts: [["A motorized valve / water pump", "solenoid valve", "pump", "motor"]] },
      {
        q: "Explain how feedback is used to maintain the soil moisture level.",
        m: 3,
        cmd: "Explain",
        kw: ["compare", "set point", "threshold", "continuously", "adjust"],
        pts: [
          "The sensor continuously measures the moisture level and sends readings (via an ADC) to the controller",
          "The control algorithm compares the reading with the required set point / threshold",
          "If too dry, the controller signals the actuator to open the valve / start the pump; when the target is reached it closes",
          "The effect of watering is measured again, so output affects the next input (closed loop)",
        ],
      },
      { q: "Distinguish between open-loop and closed-loop control, using irrigation as an example.", m: 2, cmd: "Distinguish", kw: ["timer", "no feedback", "measures"], pts: ["Open-loop: watering runs on a fixed schedule / timer regardless of the actual soil moisture (no feedback)", "Closed-loop: watering depends on measured moisture, so the output is adjusted using feedback"] },
    ]
  ),
  theory(
    { u: "A1", ref: "A1.3.7", title: "A1.3 Control in automatic doors", d: "Moderate", cmd: "Explain", hl: true },
    "Explain how a control system operates the automatic doors at the entrance of a supermarket.",
    {
      m: 4,
      kw: ["infrared", "motion sensor", "pressure", "controller", "motor", "timer", "obstruction", "feedback"],
      pts: [
        "A motion / infrared / pressure sensor detects a person approaching",
        "The controller (microprocessor) receives the input and the control algorithm decides to open the doors",
        "The controller sends a signal to an actuator (motor) to open the doors",
        "The doors stay open while the sensor continues to detect a person / for a set time",
        "A safety sensor detects obstructions so the doors do not close on a person (feedback / closed loop)",
        "The process repeats continuously",
      ],
    }
  ),
  // ---------------- A1.4 Translation (HL) ----------------
  mcq(
    { u: "A1", ref: "A1.4.1", title: "A1.4 Compilers, interpreters and JIT", d: "Easy", cmd: "Identify", hl: true },
    "Answer each question about translation.",
    [
      { q: "Which translator converts the whole source program into machine code before it is run?", o: ["Interpreter", "Compiler", "Assembler", "Linker"], a: 1 },
      { q: "Which translator stops at the first error it meets while the program is running?", o: ["Compiler", "Interpreter", "Just-in-time compiler", "Loader"], a: 1 },
      { q: "What is bytecode?", o: ["Machine code for a specific CPU", "An intermediate, platform-independent code executed by a virtual machine", "Source code written in a high-level language", "A compressed executable file"], a: 1 },
      { q: "What does a just-in-time (JIT) compiler do?", o: ["Compiles frequently executed parts of a program into machine code while the program runs", "Compiles the whole program before it is distributed", "Translates machine code back into source code", "Checks the program for syntax errors only"], a: 0 },
    ]
  ),
  multi(
    { u: "A1", ref: "A1.4.1", title: "A1.4 Choosing a translation approach", d: "Hard", cmd: "Evaluate", hl: true },
    "A software company has three projects:\n- a prototype app that will be changed and tested many times a day\n- a physics engine for games where execution speed is critical\n- a desktop tool that must run on Windows, macOS and Linux computers.",
    [
      { q: "Outline how just-in-time (JIT) compilation works.", m: 2, cmd: "Outline", kw: ["bytecode", "run time", "hot code", "machine code", "cache"], pts: ["Source is first translated to intermediate bytecode", "At run time, frequently used sections of bytecode are compiled to native machine code and cached for re-use"] },
      { q: "Distinguish between a compiler and an interpreter in how they detect and report errors.", m: 2, cmd: "Distinguish", kw: ["all errors", "before running", "line by line", "first error"], pts: ["A compiler checks the whole program and reports all (syntax) errors before the program can run", "An interpreter reports an error only when it reaches that line, stopping execution there"] },
      {
        q: "Evaluate the use of compilers, interpreters and JIT / bytecode approaches for the company's three projects.",
        m: 8,
        cmd: "Evaluate",
        bands: BANDS8,
        kw: ["rapid development", "performance", "portability", "error detection", "translation time", "virtual machine"],
        pts: [
          "Prototype: an interpreter allows code to be run immediately with no separate compile step, supporting rapid development and testing",
          "Prototype: errors are reported at the point they occur, making debugging easier, but some errors are only found when that line runs",
          "Physics engine: a compiler produces optimized native machine code, giving the fastest execution",
          "Physics engine: compilation takes time and the executable runs only on the target platform; source code is not distributed",
          "Desktop tool: compiling to bytecode for a virtual machine means one version runs on all three operating systems (portability)",
          "Desktop tool: JIT compilation recovers much of the speed lost by interpreting bytecode, but adds start-up delay and memory use",
          "Interpreted programs run more slowly and need the interpreter installed on each machine",
          "Conclusion: interpreter for the prototype, native compiler for the engine, bytecode + JIT for the cross-platform tool, with justification",
        ],
      },
    ]
  ),
];

// =====================================================================
// A2 Networks
// =====================================================================
const A2: IGCSETask[] = [
  // ---------------- A2.1.1 Types of network ----------------
  mcq(
    { u: "A2", ref: "A2.1.1", title: "A2.1 Types of network", d: "Easy", cmd: "Identify" },
    "Identify the type of network described in each scenario.",
    [
      { q: "A smartwatch connected to a phone using a short-range wireless link.", o: ["LAN", "WAN", "PAN", "VPN"], a: 2 },
      { q: "Computers in one school building connected through switches.", o: ["LAN", "WAN", "PAN", "VPN"], a: 0 },
      { q: "A bank connecting its branches in several countries.", o: ["PAN", "LAN", "VPN", "WAN"], a: 3 },
      { q: "An employee working from home securely accessing the office network through an encrypted tunnel over the internet.", o: ["PAN", "VPN", "LAN", "WAN"], a: 1 },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.1.1", title: "A2.1 Purpose of a VPN", d: "Moderate", cmd: "Describe" },
    "A hospital allows doctors to access patient records from home. Describe how a virtual private network (VPN) makes this access secure.",
    {
      m: 3,
      kw: ["encrypted tunnel", "public internet", "authentication", "private network", "intercept"],
      pts: [
        "A VPN creates an encrypted 'tunnel' between the doctor's device and the hospital network across the public internet",
        "Data is encrypted, so if it is intercepted it cannot be read",
        "Users must authenticate before connecting, so only authorized staff gain access",
        "The remote device behaves as if it were on the hospital's private network, so internal resources can be used without exposing them to the internet",
      ],
    }
  ),
  theory(
    { u: "A2", ref: "A2.1.1", title: "A2.1 LAN and PAN", d: "Easy", cmd: "Distinguish" },
    "Distinguish between a local area network (LAN) and a personal area network (PAN).",
    {
      m: 2,
      kw: ["building", "site", "one person", "few metres", "Bluetooth"],
      pts: [
        "A LAN connects devices over a small geographical area such as a building or site, often for many users",
        "A PAN connects devices belonging to one person over a very short range (a few metres), e.g. phone and earbuds",
      ],
    }
  ),
  // ---------------- A2.1.2 Digital infrastructure ----------------
  multi(
    { u: "A2", ref: "A2.1.2", title: "A2.1 Edge computing for smart traffic lights", d: "Moderate", cmd: "Describe" },
    "A city installs smart traffic lights. Cameras at each junction detect queues of vehicles and adjust the light timings.",
    [
      { q: "Define edge computing.", m: 1, cmd: "Define", kw: ["near the source", "local processing"], pts: [["Processing data close to where it is generated (at the edge of the network) instead of in a distant data centre", "processing data locally near its source"]] },
      { q: "Describe one benefit of using edge computing for the traffic lights.", m: 2, cmd: "Describe", kw: ["latency", "real time", "bandwidth", "works offline"], pts: ["Video is processed at the junction, so decisions are made with very low latency / in real time", "Only results are sent to the central system, reducing bandwidth use", "The lights continue to work if the connection to the central server fails"] },
      { q: "Outline one limitation of edge computing in this scenario.", m: 2, cmd: "Outline", kw: ["cost", "maintenance", "security", "limited processing"], pts: ["Each junction needs its own processing hardware, increasing cost / maintenance", "Many distributed devices are harder to secure and update", "Edge devices have limited processing power compared with a data centre"] },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.1.2", title: "A2.1 Distributed systems and blockchains", d: "Hard", cmd: "Describe" },
    "A cryptocurrency stores its transactions in a blockchain held on thousands of computers worldwide. Describe the benefits and limitations of using a distributed system for this purpose.",
    {
      m: 4,
      kw: ["no single point of failure", "copies", "consensus", "tamper", "energy", "slow", "scalability"],
      pts: [
        "Benefit: there is no single point of failure; if some nodes fail, others still hold copies of the ledger",
        "Benefit: no central authority is needed; the nodes agree on transactions by consensus",
        "Benefit: tampering is difficult because a change would have to be made on most copies at once",
        "Limitation: reaching consensus across many nodes is slow, so fewer transactions per second can be processed",
        "Limitation: storing copies on every node and running consensus uses a lot of storage / energy",
        "Limitation: harder to manage, update and regulate than a centralized system",
      ],
      notes: ["Award a maximum of [3] if only benefits or only limitations are given."],
    }
  ),
  mcq(
    { u: "A2", ref: "A2.1.2", title: "A2.1 Modern digital infrastructure", d: "Easy", cmd: "Identify" },
    "Answer each question about modern digital infrastructure.",
    [
      { q: "Which statement about the internet and the World Wide Web (WWW) is correct?", o: ["They are the same thing", "The WWW is a service of linked web pages that runs on the internet", "The internet runs on the WWW", "The WWW is a type of LAN"], a: 1 },
      { q: "Which is a benefit of cloud computing for a school?", o: ["Data is always available without an internet connection", "Storage and software can be scaled up without buying new servers", "The school has full physical control of the servers", "There are no ongoing costs"], a: 1 },
      { q: "Which is a limitation of mobile networks compared with wired broadband?", o: ["They cannot carry data", "Coverage and speed can vary with location and number of users", "They only work indoors", "They do not use IP addresses"], a: 1 },
    ]
  ),
  // ---------------- A2.1.3 Network devices ----------------
  mcq(
    { u: "A2", ref: "A2.1.3", title: "A2.1 Network devices", d: "Easy", cmd: "Identify" },
    "Identify the network device described in each statement.",
    [
      { q: "Forwards frames to the correct device within a LAN using MAC addresses.", o: ["Router", "Switch", "Modem", "Gateway"], a: 1 },
      { q: "Forwards packets between different networks using IP addresses.", o: ["Switch", "Network interface card", "Router", "Wireless access point"], a: 2 },
      { q: "Converts digital signals from a computer into a form that can be sent over a telephone or cable line, and back again.", o: ["Modem", "Switch", "Hardware firewall", "Gateway"], a: 0 },
      { q: "Allows wireless devices to connect to a wired network.", o: ["Modem", "Wireless access point", "Network interface card", "Gateway"], a: 1 },
    ]
  ),
  table(
    { u: "A2", ref: "A2.1.3", title: "A2.1 Devices and TCP/IP layers", d: "Moderate", cmd: "Identify" },
    "For each network device, select the layer of the TCP/IP model at which it mainly operates.",
    [given("Device"), { label: "TCP/IP layer", type: "select", options: ["Application", "Transport", "Internet", "Network interface"] }],
    [
      ["=Network interface card (NIC)", "Network interface"],
      ["=Switch", "Network interface"],
      ["=Router", "Internet"],
      ["=Wireless access point", "Network interface"],
      ["=Hardware firewall filtering by IP address and port", "Internet|Transport"],
    ],
    5,
    "Accept Internet or Transport for the firewall; accept Application for an application-level firewall if justified."
  ),
  theory(
    { u: "A2", ref: "A2.1.3", title: "A2.1 Routers and gateways", d: "Moderate", cmd: "Describe" },
    "Describe the function of a router and of a gateway.",
    {
      m: 4,
      kw: ["IP address", "routing table", "best path", "different networks", "protocol conversion", "translates"],
      pts: [
        "A router receives packets and reads the destination IP address",
        "It uses a routing table to forward each packet towards its destination along the best available path",
        "A gateway connects networks that use different protocols / architectures",
        "It translates / converts data between the protocols so the networks can communicate; it is the entry / exit point of a network (e.g. default gateway)",
      ],
    }
  ),
  // ---------------- A2.1.4 Protocols ----------------
  mcq(
    { u: "A2", ref: "A2.1.4", title: "A2.1 Choosing a protocol", d: "Easy", cmd: "Identify" },
    "Identify the most appropriate protocol for each task.",
    [
      { q: "Automatically giving a new laptop an IP address when it joins the network.", o: ["HTTP", "DHCP", "TCP", "UDP"], a: 1 },
      { q: "Sending live voice data in an online call, where speed matters more than resending lost data.", o: ["TCP", "HTTPS", "UDP", "DHCP"], a: 2 },
      { q: "Logging in to online banking through a web browser.", o: ["HTTP", "HTTPS", "UDP", "DHCP"], a: 1 },
      { q: "Ensuring that a downloaded file arrives complete and in the correct order.", o: ["UDP", "DHCP", "TCP", "HTTP"], a: 2 },
      { q: "Requesting a public web page that contains no personal data, without encryption.", o: ["HTTP", "DHCP", "UDP", "TCP only"], a: 0 },
    ]
  ),
  multi(
    { u: "A2", ref: "A2.1.4", title: "A2.1 TCP and UDP in a video-call app", d: "Moderate", cmd: "Compare" },
    "A video-call app lets users talk live and send files to each other during a call.",
    [
      { q: "Identify the transport protocol that is most suitable for the live audio and video.", m: 1, cmd: "Identify", kw: ["UDP"], pts: [["UDP", "user datagram protocol"]] },
      { q: "Explain why this protocol is suitable for the live audio and video.", m: 2, cmd: "Explain", kw: ["no retransmission", "low latency", "lost packet"], pts: ["UDP is connectionless with no acknowledgements / retransmission, so there is less delay", "Losing an occasional packet only causes a small glitch, whereas waiting for retransmission would make the call lag"] },
      {
        q: "Compare TCP and UDP for sending the files.",
        m: 4,
        cmd: "Compare",
        kw: ["reliable", "acknowledgement", "order", "connection", "overhead"],
        pts: [
          "Both are transport-layer protocols that use port numbers to deliver data to the right application",
          "TCP is connection-oriented (handshake) whereas UDP sends without setting up a connection",
          "TCP uses acknowledgements and retransmits lost segments; UDP does not guarantee delivery",
          "TCP reorders segments using sequence numbers; UDP may deliver them out of order",
          "TCP has more overhead / is slower, but is required for files that must arrive complete and uncorrupted",
        ],
      },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.1.4", title: "A2.1 How DHCP works", d: "Moderate", cmd: "Describe" },
    "Describe how the dynamic host configuration protocol (DHCP) gives a device its network settings when it joins a network.",
    {
      m: 3,
      kw: ["discover", "offer", "request", "acknowledge", "lease", "broadcast"],
      pts: [
        "The new device broadcasts a DHCP discover message to find a DHCP server",
        "The server replies with an offer of an available IP address (and settings such as subnet mask, default gateway, DNS server)",
        "The device sends a request to accept the offer",
        "The server acknowledges and the address is leased to the device for a set time, after which it must be renewed or returned to the pool",
      ],
    }
  ),
  // ---------------- A2.1.5 TCP/IP model (HL) ----------------
  inspect(
    { u: "A2", ref: "A2.1.5", title: "A2.1 Layers of the TCP/IP model", d: "Easy", cmd: "Identify", hl: true },
    "Identify the TCP/IP layer (application, transport, internet or network interface) responsible for each function.",
    [
      { q: "Adding source and destination port numbers and splitting data into segments.", a: ["transport", "transport layer"] },
      { q: "Adding source and destination IP addresses and routing packets between networks.", a: ["internet", "internet layer", "network", "network layer"] },
      { q: "Providing protocols such as HTTP and DHCP that applications use directly.", a: ["application", "application layer"] },
      { q: "Converting frames into signals and using MAC addresses to move them over the physical link.", a: ["network interface", "network interface layer", "link", "link layer", "network access"] },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.1.5", title: "A2.1 Encapsulation in the TCP/IP model", d: "Moderate", cmd: "Describe", hl: true },
    "Describe how data from a web browser passes down the layers of the TCP/IP model before it is sent across the network.",
    {
      m: 4,
      kw: ["application", "transport", "internet", "network interface", "header", "encapsulation", "segment", "packet", "frame"],
      pts: [
        "Application layer: the browser creates an HTTP / HTTPS request",
        "Transport layer: data is split into segments and a header with port numbers and sequence numbers is added (TCP)",
        "Internet layer: each segment is put into a packet with a header containing source and destination IP addresses",
        "Network interface layer: each packet is put into a frame with MAC addresses and converted to signals on the medium",
        "Each layer adds its own header to the data from the layer above (encapsulation) and only interacts with the layers directly above and below",
      ],
    }
  ),
  multi(
    { u: "A2", ref: "A2.1.5", title: "A2.1 Reliable delivery across layers", d: "Hard", cmd: "Explain", hl: true },
    "A student downloads a large assignment file from a school server across the internet.",
    [
      { q: "State the TCP/IP layer at which TCP operates.", m: 1, cmd: "State", kw: ["transport"], pts: [["Transport layer", "transport"]] },
      {
        q: "Describe how the transport layer ensures the file arrives complete and in order.",
        m: 3,
        cmd: "Describe",
        kw: ["sequence numbers", "acknowledgement", "retransmit", "checksum", "reorder"],
        pts: [
          "Each segment is given a sequence number so segments can be reassembled in the correct order",
          "The receiver sends acknowledgements; segments not acknowledged within a time-out are retransmitted",
          "A checksum detects corrupted segments, which are discarded and resent",
          "Flow control prevents the sender from overwhelming the receiver",
        ],
      },
      {
        q: "Explain how the internet layer and the network interface layer interact to move each packet to the student's computer.",
        m: 3,
        cmd: "Explain",
        kw: ["IP address", "next hop", "router", "frame", "MAC address", "each link"],
        pts: [
          "The internet layer uses the destination IP address to choose the next hop / router for the packet",
          "The packet is passed to the network interface layer, which encapsulates it in a frame addressed to the MAC address of the next hop",
          "At each router the frame is removed, the IP header is examined and the packet is re-framed for the next link, until it reaches the destination network",
        ],
      },
    ]
  ),
  // ---------------- A2.2.1 Topologies ----------------
  mcq(
    { u: "A2", ref: "A2.2.1", title: "A2.2 Network topologies", d: "Easy", cmd: "Identify" },
    "Answer each question about network topologies.",
    [
      { q: "In which topology is every device connected to a central switch?", o: ["Mesh", "Star", "Hybrid", "Point-to-point"], a: 1 },
      { q: "Which topology offers the most alternative routes if one link fails?", o: ["Star", "Full mesh", "Single star", "Bus"], a: 1 },
      { q: "What is a main weakness of a star topology?", o: ["Adding devices is difficult", "If the central switch fails, the whole network fails", "It requires more cable than a full mesh", "Data collisions are very frequent"], a: 1 },
      { q: "A college connects several star networks in different buildings through a backbone. This is an example of:", o: ["a mesh topology", "a hybrid topology", "a PAN", "a point-to-point topology"], a: 1 },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.2.1", title: "A2.2 Star versus mesh", d: "Moderate", cmd: "Compare" },
    "Compare star and mesh topologies in terms of reliability, cost and scalability.",
    {
      m: 4,
      kw: ["central switch", "single point of failure", "redundant paths", "cabling", "cost", "add devices"],
      pts: [
        "Both can provide high transmission speeds and, using switching, avoid most data collisions",
        "Reliability: a star depends on the central switch (single point of failure), whereas a mesh has multiple paths so one failed link does not stop communication",
        "Cost: a star needs one cable per device, whereas a full mesh needs many more links / interfaces, so it is more expensive",
        "Scalability: a star is easy to extend by connecting a new device to the switch, whereas each new node in a full mesh requires connections to many others",
        "A failed cable in a star only affects one device",
      ],
    }
  ),
  multi(
    { u: "A2", ref: "A2.2.1", title: "A2.2 Topologies for a campus and a hospital", d: "Hard", cmd: "Discuss" },
    "A university campus has twelve buildings. Each building has its own network of computers, which are all joined together. The university also runs a hospital, where the network connecting patient-monitoring systems must keep working at all times.",
    [
      { q: "Identify the topology that best describes the whole campus network.", m: 1, cmd: "Identify", kw: ["hybrid"], pts: [["Hybrid topology (e.g. star networks joined by a backbone / tree)", "hybrid", "tree", "star of stars"]] },
      { q: "Describe how a switch in a star topology reduces data collisions.", m: 2, cmd: "Describe", kw: ["MAC address", "only to destination", "separate link", "full duplex"], pts: ["Each device has its own dedicated link to the switch", "The switch sends each frame only to the port of the destination device (using its MAC address table), so devices do not compete for the same medium"] },
      {
        q: "Discuss whether a mesh topology should be used for the hospital's patient-monitoring network.",
        m: 6,
        cmd: "Discuss",
        bands: BANDS6,
        kw: ["reliability", "redundancy", "cost", "scalability", "transmission speed", "collisions"],
        pts: [
          "Reliability is critical: a mesh has redundant paths, so data still reaches the nurses' station if a link or node fails",
          "No single point of failure, unlike a single star whose central switch could stop all monitoring",
          "Multiple paths allow load to be shared, maintaining transmission speed",
          "Cost: a full mesh needs many more cables / ports / devices to install and maintain",
          "Scalability: adding new wards to a full mesh is complex; a partial mesh or hybrid could be a compromise",
          "Configuration and troubleshooting are more complex",
          "Conclusion: a (partial) mesh or a hybrid with redundant switches is justified for life-critical systems despite the cost",
        ],
      },
    ]
  ),
  // ---------------- A2.2.2 Servers (HL) ----------------
  mcq(
    { u: "A2", ref: "A2.2.2", title: "A2.2 Types of server", d: "Easy", cmd: "Identify", hl: true },
    "Identify the type of server described.",
    [
      { q: "Translates a domain name such as example.org into an IP address.", o: ["Web server", "DNS server", "Proxy server", "Mail server"], a: 1 },
      { q: "Acts as an intermediary between users and the internet, and can cache pages and filter requests.", o: ["Proxy server", "File server", "DHCP server", "DNS server"], a: 0 },
      { q: "Stores users' documents centrally and controls who may read or change them.", o: ["Mail server", "Web server", "File server", "DHCP server"], a: 2 },
      { q: "Hosts web pages and responds to HTTP requests from browsers.", o: ["Web server", "Proxy server", "DNS server", "Mail server"], a: 0 },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.2.2", title: "A2.2 How DNS resolves a name", d: "Moderate", cmd: "Describe", hl: true },
    "Describe how a domain name server (DNS) system finds the IP address of a website when a user types its domain name into a browser.",
    {
      m: 4,
      kw: ["cache", "resolver", "root", "top-level domain", "authoritative", "IP address returned"],
      pts: [
        "The computer first checks its local DNS cache for the domain name",
        "If not found, the request is sent to a DNS resolver (e.g. at the ISP), which checks its own cache",
        "If still not found, the resolver queries a root server, then the top-level domain server (e.g. .org), then the authoritative name server for the domain",
        "The IP address is returned to the browser, which uses it to contact the web server; the result is cached for future requests",
      ],
    }
  ),
  multi(
    { u: "A2", ref: "A2.2.2", title: "A2.2 Servers in a company network", d: "Moderate", cmd: "Describe", hl: true },
    "An online retailer runs its own mail server, a proxy server for staff internet access, and web servers for its shop.",
    [
      { q: "Describe the function of the proxy server, including one security benefit.", m: 2, cmd: "Describe", kw: ["intermediary", "hides IP", "filter", "cache"], pts: ["Staff requests go to the proxy, which forwards them to the internet and returns the responses (intermediary)", "Security: it hides internal IP addresses / filters and blocks malicious or banned sites / logs activity", "It can cache frequently used pages to reduce bandwidth"] },
      { q: "Describe the function of the mail server.", m: 2, cmd: "Describe", kw: ["send", "receive", "store", "SMTP", "mailboxes"], pts: ["Receives incoming email and stores it in users' mailboxes until collected", "Sends / forwards outgoing email to the recipient's mail server", "Can filter spam / malicious attachments"] },
      {
        q: "Explain how the retailer could make its web servers scalable and reliable during busy sales periods.",
        m: 3,
        cmd: "Explain",
        kw: ["load balancer", "multiple servers", "redundancy", "failover", "cloud"],
        pts: [
          "Use several web servers behind a load balancer that shares requests between them",
          "More servers can be added when demand rises (horizontal scaling / cloud resources)",
          "If one server fails, the load balancer sends traffic to the others (redundancy / failover), so the shop stays available",
        ],
      },
    ]
  ),
  // ---------------- A2.2.3 Networking models ----------------
  theory(
    { u: "A2", ref: "A2.2.3", title: "A2.2 Client-server versus peer-to-peer", d: "Moderate", cmd: "Compare" },
    "Compare the client-server and peer-to-peer (P2P) networking models.",
    {
      m: 4,
      kw: ["central server", "equal status", "security", "backup", "single point of failure", "cost", "scalability"],
      pts: [
        "Both allow devices to share resources and communicate over a network",
        "In client-server, clients request services from a central server; in P2P every node can act as both client and server with equal status",
        "Client-server allows centralized security, backup and management; in P2P each user manages their own resources",
        "Client-server has a single point of failure / bottleneck at the server; P2P has no central point, so it is more resilient",
        "Client-server is more expensive (server hardware, specialist staff); P2P is cheap and simple to set up",
        "Examples: client-server for online banking and email; P2P for file sharing, some VoIP services and blockchain",
      ],
    }
  ),
  multi(
    { u: "A2", ref: "A2.2.3", title: "A2.2 Networking model for a school", d: "Hard", cmd: "Evaluate" },
    "A secondary school with 900 students and 80 staff is choosing a networking model for storing and sharing coursework.",
    [
      { q: "State one real-world application that commonly uses a peer-to-peer model.", m: 1, cmd: "State", kw: ["file sharing", "blockchain", "VoIP"], pts: [["Peer-to-peer file sharing / torrenting", "blockchain", "cryptocurrency", "some VoIP services", "file sharing"]] },
      {
        q: "Evaluate the use of client-server and peer-to-peer models for the school.",
        m: 6,
        cmd: "Evaluate",
        bands: BANDS6,
        kw: ["central backup", "security", "permissions", "cost", "single point of failure", "management"],
        pts: [
          "Client-server allows coursework to be backed up centrally, reducing the risk of losing students' work",
          "A server can enforce user accounts and permissions so students cannot see or alter each other's work",
          "Students can log in from any computer and access their files",
          "Client-server needs expensive server hardware and a technician to manage it",
          "The server is a single point of failure unless backups / redundant servers are used",
          "P2P is cheap and easy to set up but is unmanageable with 980 users; files would be scattered across machines and lost if a computer is off or fails",
          "Conclusion: client-server is more appropriate for a school of this size",
        ],
      },
    ]
  ),
  // ---------------- A2.2.4 Segmentation ----------------
  theory(
    { u: "A2", ref: "A2.2.4", title: "A2.2 Virtual LANs", d: "Moderate", cmd: "Explain" },
    "A school uses one set of switches for all of its devices. Explain how virtual local area networks (VLANs) could be used to improve its network.",
    {
      m: 3,
      kw: ["logical groups", "same switches", "broadcast", "security", "separate"],
      pts: [
        "VLANs divide one physical network into separate logical networks, configured on the switches",
        "Devices can be grouped by role (e.g. staff, students, guests) regardless of their physical location",
        "Broadcast traffic stays within each VLAN, reducing congestion",
        "Traffic between VLANs must pass through a router / firewall, so students cannot directly access staff systems",
      ],
    }
  ),
  mcq(
    { u: "A2", ref: "A2.2.4", title: "A2.2 Subnetting concepts", d: "Easy", cmd: "Identify" },
    "Answer each question about subnetting and its role in a network.",
    [
      { q: "What is subnetting?", o: ["Dividing one IP network into smaller logical networks", "Joining several networks into one large broadcast domain", "Encrypting the host part of an IP address", "Replacing private IP addresses with a public one"], a: 0 },
      { q: "What does a subnet mask allow a device to determine?", o: ["The MAC address of the router", "Which part of an IP address identifies the network and which identifies the host", "Whether a website uses HTTPS", "The bandwidth of its connection"], a: 1 },
      { q: "Traffic from one subnet to another must pass through which device?", o: ["A hub", "A repeater", "A router", "A wireless access point"], a: 2 },
      { q: "How does subnetting reduce congestion?", o: ["It compresses every packet", "It increases the speed of the cables", "It removes the need for acknowledgements", "Broadcast traffic stays within each subnet"], a: 3 },
    ]
  ),
  multi(
    { u: "A2", ref: "A2.2.4", title: "A2.2 Segmenting a hospital network", d: "Moderate", cmd: "Explain" },
    "A hospital network carries patient records, medical devices, staff email and free guest Wi-Fi on the same physical network.",
    [
      { q: "Define network segmentation.", m: 1, cmd: "Define", kw: ["divide", "smaller", "sub-networks"], pts: [["Dividing a network into smaller, separate sub-networks (segments)", "splitting a network into segments"]] },
      { q: "Explain how segmentation could improve the performance of the network.", m: 2, cmd: "Explain", kw: ["broadcast", "congestion", "local traffic", "bandwidth"], pts: ["Traffic stays within its own segment, so there is less congestion / fewer broadcasts on each segment", "Bandwidth can be allocated / prioritized for critical segments such as medical devices"] },
      {
        q: "Explain how segmentation using subnetting and VLANs could improve security.",
        m: 3,
        cmd: "Explain",
        kw: ["guest isolated", "firewall between", "contain", "access control"],
        pts: [
          "Guest Wi-Fi is placed in its own VLAN / subnet with access only to the internet",
          "Traffic between segments passes through a router / firewall where access rules can be enforced",
          "If one segment is compromised (e.g. malware), the attack is contained and cannot easily spread to patient records",
        ],
      },
    ]
  ),
  // ---------------- A2.3.1 IP addressing ----------------
  mcq(
    { u: "A2", ref: "A2.3.1", title: "A2.3 IP address types", d: "Easy", cmd: "Identify" },
    "Answer each question about IP addressing.",
    [
      { q: "How many bits are in an IPv4 address?", o: ["16", "32", "64", "128"], a: 1 },
      { q: "Which is a valid IPv6 address format?", o: ["192.168.1.1", "2001:db8::8a2e:370:7334", "00-1A-2B-3C-4D-5E", "www.example.org"], a: 1 },
      { q: "Which device on a home network most needs a static IP address?", o: ["A visitor's phone", "A shared network printer", "A games console", "A smart speaker"], a: 1 },
      { q: "Which address is a private IPv4 address?", o: ["8.8.8.8", "172.217.3.110", "192.168.0.12", "203.0.113.5"], a: 2 },
    ]
  ),
  inspect(
    { u: "A2", ref: "A2.3.1", title: "A2.3 Public or private addresses", d: "Moderate", cmd: "Identify" },
    "The private IPv4 ranges are 10.0.0.0-10.255.255.255, 172.16.0.0-172.31.255.255 and 192.168.0.0-192.168.255.255. State whether each address is public or private.",
    [
      { q: "10.4.2.1", a: ["private"] },
      { q: "172.20.5.5", a: ["private"] },
      { q: "172.32.0.1", a: ["public"], why: "Outside 172.16-172.31." },
      { q: "192.169.1.1", a: ["public"], why: "Not 192.168." },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.3.1", title: "A2.3 Network address translation", d: "Hard", cmd: "Explain" },
    "Explain how network address translation (NAT) allows many devices on a home network to share a single public IP address.",
    {
      m: 4,
      kw: ["private address", "public address", "router", "translation table", "port", "replaces"],
      pts: [
        "Devices in the home have private IP addresses, which are not routable on the internet",
        "When a device sends a packet out, the router replaces the private source address (and port) with its own public IP address (and a unique port)",
        "The router records the mapping in a NAT translation table",
        "When a reply arrives, the router looks up the table and forwards it to the correct private address",
        "This reduces the number of public IPv4 addresses needed / conserves the limited IPv4 address space",
      ],
    }
  ),
  multi(
    { u: "A2", ref: "A2.3.1", title: "A2.3 IPv4, IPv6, static and dynamic", d: "Moderate", cmd: "Distinguish" },
    "A family's home network contains laptops, phones, a smart TV and a network printer.",
    [
      { q: "State the number of bits in an IPv6 address.", m: 1, cmd: "State", kw: ["128"], pts: [["128 bits", "128"]] },
      { q: "Outline why IPv6 was introduced.", m: 2, cmd: "Outline", kw: ["run out", "4.3 billion", "more devices"], pts: ["IPv4 only provides about 4.3 billion (2^32) addresses, which is not enough for all internet-connected devices", "IPv6 provides a vastly larger number of addresses (2^128)"] },
      {
        q: "Distinguish between static and dynamic IP addresses, and state which the printer should use.",
        m: 3,
        cmd: "Distinguish",
        kw: ["fixed", "manually", "DHCP", "changes", "printer"],
        pts: [
          "A static IP address is fixed / manually assigned and does not change",
          "A dynamic IP address is assigned automatically by a DHCP server and may change each time the device connects",
          "The printer should use a static address (or a DHCP reservation) so other devices can always find it",
        ],
      },
    ]
  ),
  // ---------------- A2.3.2 Transmission media ----------------
  table(
    { u: "A2", ref: "A2.3.2", title: "A2.3 Comparing transmission media", d: "Moderate", cmd: "Identify" },
    "For each statement, select the transmission medium it best describes.",
    [given("Statement"), { label: "Medium", type: "select", options: ["Fibre optic", "Twisted pair", "Wireless"] }],
    [
      ["=Highest bandwidth and can carry signals over many kilometres with little attenuation", "Fibre optic"],
      ["=Signals can be intercepted by anyone within range unless encrypted", "Wireless"],
      ["=Uses light, so it is not affected by electromagnetic interference", "Fibre optic"],
      ["=Cheap copper cable commonly used to connect desktop computers to a switch", "Twisted pair"],
      ["=Easiest to install because no cables are needed, but reliability is affected by walls and other devices", "Wireless"],
    ],
    5
  ),
  theory(
    { u: "A2", ref: "A2.3.2", title: "A2.3 Fibre optic versus twisted pair", d: "Moderate", cmd: "Compare" },
    "Compare fibre optic cable and twisted pair cable for connecting two buildings that are 800 m apart.",
    {
      m: 4,
      kw: ["light", "electrical", "attenuation", "range", "bandwidth", "interference", "cost", "installation"],
      pts: [
        "Both are wired media that are more secure and reliable than wireless",
        "Fibre carries data as light; twisted pair carries electrical signals in copper",
        "Twisted pair suffers more attenuation, with a typical maximum of about 100 m, so it could not cover 800 m without repeaters; fibre can cover kilometres",
        "Fibre has much higher bandwidth",
        "Fibre is immune to electromagnetic interference and harder to tap; twisted pair is susceptible to interference / crosstalk",
        "Twisted pair is cheaper and easier to install / terminate; fibre is more expensive and needs specialist installation",
      ],
    }
  ),
  multi(
    { u: "A2", ref: "A2.3.2", title: "A2.3 Wired or wireless in a warehouse", d: "Hard", cmd: "To what extent" },
    "A large warehouse uses handheld scanners carried by staff and fixed computers in the office. It contains metal shelving and heavy electrical machinery.",
    [
      { q: "Define attenuation.", m: 1, cmd: "Define", kw: ["loss of signal strength", "distance"], pts: [["The loss of signal strength as it travels through a medium / over distance", "weakening of a signal over distance"]] },
      { q: "Outline two disadvantages of wireless transmission in this warehouse.", m: 2, cmd: "Outline", kw: ["interference", "metal", "range", "security"], pts: ["Metal shelving can block / reflect signals, causing dead spots", "Electrical machinery causes interference, reducing reliability / speed", "Signals can be intercepted, so strong encryption is needed", "Many access points are needed to cover the large area, increasing cost"] },
      {
        q: "To what extent should the warehouse rely on wireless transmission rather than wired transmission?",
        m: 6,
        cmd: "To what extent",
        bands: BANDS6,
        kw: ["mobility", "bandwidth", "installation", "cost", "range", "interference", "reliability", "security"],
        pts: [
          "The handheld scanners must move around, so wireless is essential for them",
          "Wireless avoids running cables across a large floor, reducing installation complexity",
          "Interference from machinery and metal shelving reduces wireless reliability; careful access point placement is needed",
          "Wired (twisted pair or fibre) gives higher bandwidth, reliability and security for the fixed office computers",
          "Fibre could link distant parts of the warehouse to avoid attenuation and electromagnetic interference",
          "Wireless is less secure; WPA encryption and authentication are required",
          "Conclusion: a hybrid approach - wireless for mobile scanners, wired for fixed equipment and the backbone",
        ],
      },
    ]
  ),
  // ---------------- A2.3.3 Packet switching ----------------
  theory(
    { u: "A2", ref: "A2.3.3", title: "A2.3 Packet switching", d: "Moderate", cmd: "Explain" },
    "Explain how packet switching is used to send an email across the internet.",
    {
      m: 4,
      kw: ["split", "packets", "header", "destination address", "sequence number", "different routes", "reassembled", "routers"],
      pts: [
        "The email is split into small packets",
        "Each packet has a header containing the source and destination IP addresses and a sequence number",
        "Routers read the destination address and forward each packet independently along the best available route, so packets may take different routes",
        "Switches forward packets / frames within each local network to the correct device",
        "At the destination, packets are reordered using the sequence numbers and reassembled; missing packets are requested again",
      ],
    }
  ),
  inspect(
    { u: "A2", ref: "A2.3.3", title: "A2.3 Packet calculations", d: "Moderate", cmd: "Calculate" },
    "A message of 6000 bytes is sent across a network. Each packet can be at most 1500 bytes in total, of which 40 bytes are header. Give whole numbers.",
    [
      { q: "What is the maximum number of data (payload) bytes in one packet?", a: ["1460"] },
      { q: "How many packets are needed to send the message?", a: ["5"], why: "6000 / 1460 = 4.1, rounded up to 5." },
      { q: "What is the total number of bytes transmitted, including headers?", a: ["6200"], why: "6000 + 5 x 40" },
    ]
  ),
  mcq(
    { u: "A2", ref: "A2.3.3", title: "A2.3 Roles in packet switching", d: "Easy", cmd: "Identify" },
    "Answer each question about packet switching.",
    [
      { q: "Which information in a packet header lets the receiver put packets back in the correct order?", o: ["Time to live", "Sequence number", "Source MAC address", "Checksum"], a: 1 },
      { q: "Which device decides the next hop for a packet travelling between networks?", o: ["Switch", "Router", "Network interface card", "Modem"], a: 1 },
      { q: "Why do packets from the same message sometimes arrive out of order?", o: ["They are encrypted differently", "They may travel along different routes with different delays", "Switches always reverse their order", "The sender transmits them in random order"], a: 1 },
    ]
  ),
  // ---------------- A2.3.4 Routing (HL) ----------------
  theory(
    { u: "A2", ref: "A2.3.4", title: "A2.3 Static versus dynamic routing", d: "Moderate", cmd: "Compare", hl: true },
    "Compare static routing and dynamic routing.",
    {
      m: 4,
      kw: ["manually configured", "routing protocol", "automatic", "convergence", "resource usage", "scalability", "failure"],
      pts: [
        "Both use routing tables to decide where to forward packets",
        "Static routes are entered manually by an administrator; dynamic routes are learned automatically as routers exchange information using a routing protocol",
        "Static routing uses no extra bandwidth / CPU / memory for route updates; dynamic routing uses more resources",
        "Static routes do not adapt to link failures without manual changes; dynamic routing re-routes automatically after convergence",
        "Static routing suits small, stable networks; dynamic routing scales better to large or changing networks",
        "Static routing is more predictable / secure because routes are not advertised",
      ],
    }
  ),
  multi(
    { u: "A2", ref: "A2.3.4", title: "A2.3 Routing for a growing company", d: "Hard", cmd: "Evaluate", hl: true },
    "A company currently has two offices connected by one router each. Over the next three years it plans to open 15 more offices, with several links between them so that traffic can be rerouted if a link fails.",
    [
      { q: "Outline the process of static routing.", m: 2, cmd: "Outline", kw: ["administrator", "manually", "routing table", "fixed"], pts: ["An administrator manually enters routes (destination network and next hop / interface) into each router's routing table", "Packets always follow these fixed routes until the administrator changes them"] },
      {
        q: "Evaluate the use of static routing and dynamic routing for the company as it grows.",
        m: 8,
        cmd: "Evaluate",
        bands: BANDS8,
        kw: ["configuration", "maintenance", "complexity", "resource usage", "convergence", "scalability", "network size"],
        pts: [
          "With two offices, static routing is simple to configure, uses no extra resources and is easy to understand",
          "As the network grows to 17 offices, the number of manual routes increases rapidly, making configuration and maintenance time-consuming and error-prone",
          "Static routes cannot react automatically to a failed link, so the redundant links would not be used without manual intervention",
          "Dynamic routing automatically discovers routes and updates tables when the topology changes, using the backup links",
          "Dynamic routing uses router CPU, memory and bandwidth to exchange routing information",
          "During convergence, routes may be temporarily inconsistent; convergence time matters for recovery speed",
          "Dynamic routing is more complex to set up and secure (routing updates should be authenticated)",
          "Conclusion: static may stay for small stub links, but dynamic routing is more appropriate for the large, redundant network",
        ],
      },
    ]
  ),
  // ---------------- A2.4.1 Firewalls ----------------
  inspect(
    { u: "A2", ref: "A2.4.1", title: "A2.4 Applying firewall rules", d: "Moderate", cmd: "Identify" },
    "A firewall checks incoming packets against the rules below in order. The first rule that matches is applied. State ALLOW or DENY for each packet.\n\nRule 1: DENY if source IP is 203.0.113.9 (blacklisted)\nRule 2: ALLOW if destination port is 443\nRule 3: ALLOW if destination port is 25 and destination IP is 10.0.0.5 (mail server)\nRule 4: DENY all other traffic",
    [
      { q: "Source 198.51.100.7, destination 10.0.0.8, port 443", a: ["ALLOW"] },
      { q: "Source 203.0.113.9, destination 10.0.0.8, port 443", a: ["DENY"], why: "Rule 1 matches first." },
      { q: "Source 198.51.100.7, destination 10.0.0.8, port 25", a: ["DENY"], why: "Rule 3 needs destination 10.0.0.5." },
      { q: "Source 192.0.2.44, destination 10.0.0.5, port 25", a: ["ALLOW"] },
      { q: "Source 192.0.2.44, destination 10.0.0.5, port 23", a: ["DENY"] },
    ]
  ),
  multi(
    { u: "A2", ref: "A2.4.1", title: "A2.4 Effectiveness of firewalls", d: "Hard", cmd: "Discuss" },
    "A small accounting firm protects its network with a hardware firewall on its internet connection. The router also uses NAT.",
    [
      { q: "Distinguish between a whitelist and a blacklist in a firewall.", m: 2, cmd: "Distinguish", kw: ["only allowed", "blocked", "default deny"], pts: ["A whitelist lists only the addresses / ports / applications that are allowed; everything else is blocked", "A blacklist lists those that are blocked; everything else is allowed"] },
      { q: "Describe how NAT enhances the security of the firm's network.", m: 2, cmd: "Describe", kw: ["hides private addresses", "unsolicited", "no mapping"], pts: ["Internal devices use private IP addresses that are hidden from the internet", "Unsolicited incoming connections have no entry in the translation table, so they are dropped / cannot reach internal devices directly"] },
      {
        q: "Discuss the effectiveness of the firewall at protecting the firm's network.",
        m: 6,
        cmd: "Discuss",
        bands: BANDS6,
        kw: ["filter", "rules", "ports", "encrypted traffic", "insider", "phishing", "misconfiguration", "malware"],
        pts: [
          "The firewall inspects incoming and outgoing traffic and filters it using rules, whitelists and blacklists",
          "It can block unused ports and known malicious addresses, preventing many external attacks",
          "Stateful / application-level inspection can block unexpected or malformed traffic",
          "It cannot stop threats that arrive through allowed traffic, e.g. phishing emails or malware downloaded over HTTPS",
          "It gives no protection against insiders or infected devices (e.g. USB drives) already inside the network",
          "It is only as effective as its rules; misconfiguration or out-of-date rules leave gaps",
          "Encrypted traffic may not be inspected",
          "Conclusion: effective as one layer, but must be combined with other measures (antivirus, updates, training)",
        ],
      },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.4.1", title: "A2.4 Function of a firewall", d: "Easy", cmd: "Outline" },
    "Outline the function of a firewall.",
    {
      m: 2,
      kw: ["monitors", "filters", "incoming", "outgoing", "rules", "blocks"],
      pts: [
        "It monitors / inspects incoming and outgoing network traffic",
        "It allows or blocks traffic according to a set of rules (e.g. IP addresses, ports, protocols)",
        "It acts as a barrier between a trusted internal network and an untrusted external network",
      ],
    }
  ),
  // ---------------- A2.4.2 Vulnerabilities (HL) ----------------
  mcq(
    { u: "A2", ref: "A2.4.2", title: "A2.4 Identifying network attacks", d: "Easy", cmd: "Identify", hl: true },
    "Identify the vulnerability or attack described.",
    [
      { q: "An attacker secretly intercepts and possibly alters messages between a user and a website.", o: ["Phishing", "Man-in-the-middle attack", "SQL injection", "DDoS"], a: 1 },
      { q: "Thousands of compromised devices flood a web server with requests so genuine users cannot access it.", o: ["Zero-day exploit", "Cross-site scripting", "Distributed denial of service (DDoS)", "Weak authentication"], a: 2 },
      { q: "A malicious script entered in a comment box runs in other users' browsers when they view the page.", o: ["Cross-site scripting (XSS)", "SQL injection", "Phishing", "Man-in-the-middle attack"], a: 0 },
      { q: "An attacker uses a software flaw that the vendor does not yet know about.", o: ["Unpatched software", "Zero-day exploit", "Malware signature", "Insecure protocol"], a: 1 },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.4.2", title: "A2.4 SQL injection and XSS", d: "Hard", cmd: "Describe", hl: true },
    "Describe how SQL injection and cross-site scripting (XSS) attacks are carried out against a website.",
    {
      m: 4,
      kw: ["input field", "SQL code", "query", "database", "script", "browser", "other users", "cookies"],
      pts: [
        "SQL injection: the attacker enters SQL code into an input field, e.g. ' OR '1'='1",
        "If input is not validated, the code becomes part of the query and is executed by the database, allowing data to be read, changed or deleted / login to be bypassed",
        "XSS: the attacker inserts a malicious script (e.g. JavaScript) into content the website stores or reflects",
        "The script runs in other users' browsers, e.g. stealing session cookies or redirecting users",
      ],
      notes: ["Award a maximum of [2] for each attack."],
    }
  ),
  multi(
    { u: "A2", ref: "A2.4.2", title: "A2.4 Securing an online shop", d: "Hard", cmd: "Describe", hl: true },
    "An online shop has noticed that: customers have received emails asking them to 'confirm' their card details on a fake site; its web server becomes unavailable during sales; and staff still use simple passwords such as 'shop123'.",
    [
      { q: "Identify the vulnerability shown by the fake emails.", m: 1, cmd: "Identify", kw: ["phishing"], pts: [["Phishing", "phishing attack"]] },
      { q: "Describe how a DDoS attack could make the web server unavailable.", m: 2, cmd: "Describe", kw: ["botnet", "flood", "requests", "overwhelm"], pts: ["Many compromised devices (a botnet) send huge numbers of requests to the server at the same time", "The server / its connection is overwhelmed, so it cannot respond to genuine customers"] },
      {
        q: "Describe two countermeasures the shop should introduce to address these problems.",
        m: 4,
        cmd: "Describe",
        kw: ["password policy", "MFA", "DDoS mitigation", "email filtering", "training"],
        pts: [
          "Complex password policy: minimum length, mixture of character types, no reuse",
          "so passwords are harder to guess / crack by brute force",
          "Multifactor authentication: a second factor (e.g. code sent to a phone) is needed",
          "so a stolen password alone does not give access",
          "DDoS mitigation service / tools: filter or absorb malicious traffic",
          "so genuine customers can still reach the server",
          "Email filtering and staff / customer awareness training",
          "so phishing emails are blocked or recognized",
        ],
        notes: ["Award [1] for each countermeasure and [1] for describing how it helps, up to [2] per countermeasure."],
      },
    ]
  ),
  // ---------------- A2.4.3 Countermeasures (HL) ----------------
  theory(
    { u: "A2", ref: "A2.4.3", title: "A2.4 IDS and IPS", d: "Moderate", cmd: "Distinguish", hl: true },
    "Distinguish between an intrusion detection system (IDS) and an intrusion prevention system (IPS).",
    {
      m: 3,
      kw: ["monitors", "alerts", "blocks", "inline", "passive", "active"],
      pts: [
        "Both monitor network traffic for suspicious patterns / known attack signatures / anomalies",
        "An IDS only detects and alerts administrators / logs the event (passive); it does not stop the traffic",
        "An IPS sits inline and automatically blocks or drops malicious traffic (active)",
        "An IPS can block legitimate traffic if there is a false positive, whereas an IDS relies on a human response",
      ],
    }
  ),
  theory(
    { u: "A2", ref: "A2.4.3", title: "A2.4 Multifactor authentication", d: "Easy", cmd: "Outline", hl: true },
    "Outline how multifactor authentication (MFA) improves network security.",
    {
      m: 2,
      kw: ["two or more", "something you know", "have", "are", "stolen password"],
      pts: [
        "The user must provide two or more different types of evidence (something they know, have or are) to log in",
        "An attacker who has stolen or guessed the password still cannot log in without the other factor",
      ],
    }
  ),
  theory(
    { u: "A2", ref: "A2.4.3", title: "A2.4 Wireless security, testing and training", d: "Moderate", cmd: "Describe", hl: true },
    "A college wants to protect its wireless network and reduce the number of successful attacks. Describe how MAC address filtering, regular security testing and employee training each contribute to network security.",
    {
      m: 4,
      kw: ["MAC address", "whitelist", "spoofed", "penetration testing", "vulnerabilities", "phishing", "awareness"],
      pts: [
        "MAC filtering: the access point only allows devices whose MAC addresses are on a whitelist (or blocks a blacklist)",
        "Limitation: MAC addresses can be spoofed, so filtering should be combined with encryption (e.g. WPA)",
        "Regular security testing (e.g. penetration tests, vulnerability scans) finds weaknesses before attackers do",
        "Employee training helps staff recognize phishing and social engineering, and follow password / security policies",
        "Human error is a major cause of breaches, so training reduces risk that technical measures cannot address",
      ],
    }
  ),
  // ---------------- A2.4.4 Encryption and certificates ----------------
  mcq(
    { u: "A2", ref: "A2.4.4", title: "A2.4 Public and private keys", d: "Moderate", cmd: "Identify" },
    "Alice wants to send a confidential message to Bob using asymmetric encryption.",
    [
      { q: "Which key should Alice use to encrypt the message?", o: ["Alice's private key", "Alice's public key", "Bob's public key", "Bob's private key"], a: 2 },
      { q: "Which key does Bob use to decrypt it?", o: ["Bob's private key", "Bob's public key", "Alice's public key", "A shared symmetric key sent with the message"], a: 0 },
      { q: "Which is an advantage of symmetric encryption over asymmetric encryption?", o: ["No key needs to be kept secret", "It is much faster for encrypting large amounts of data", "It solves the key distribution problem", "It uses two different keys"], a: 1 },
    ]
  ),
  theory(
    { u: "A2", ref: "A2.4.4", title: "A2.4 Role of digital certificates", d: "Moderate", cmd: "Describe" },
    "Describe the role of a digital certificate when a browser connects to a bank's website using HTTPS.",
    {
      m: 3,
      kw: ["certificate authority", "public key", "identity", "digital signature", "trusted", "verifies"],
      pts: [
        "The website sends its digital certificate, which contains the bank's public key and identity (domain name)",
        "The certificate is digitally signed by a trusted certificate authority (CA)",
        "The browser verifies the CA's signature / validity dates, confirming that the site is genuine and not an impostor",
        "The verified public key is then used to set up the encrypted session",
      ],
    }
  ),
  multi(
    { u: "A2", ref: "A2.4.4", title: "A2.4 Encryption in a secure session", d: "Hard", cmd: "Explain" },
    "A student logs in to a school's online learning platform using HTTPS, which uses transport layer security (TLS).",
    [
      { q: "Distinguish between symmetric and asymmetric encryption.", m: 2, cmd: "Distinguish", kw: ["same key", "key pair", "public", "private"], pts: ["Symmetric encryption uses the same secret key to encrypt and decrypt", "Asymmetric encryption uses a mathematically related key pair: a public key to encrypt and a private key to decrypt"] },
      {
        q: "Explain how TLS uses both asymmetric and symmetric encryption to secure the session.",
        m: 4,
        cmd: "Explain",
        kw: ["certificate", "public key", "session key", "key exchange", "faster"],
        pts: [
          "The server sends its certificate containing its public key, which the browser verifies",
          "Asymmetric cryptography (public / private keys) is used to securely agree / exchange a symmetric session key",
          "The rest of the session is encrypted with the symmetric session key",
          "Symmetric encryption is used for the data because it is much faster; asymmetric solves the problem of sharing the key securely",
        ],
      },
      { q: "Outline why encryption key management is important for the school.", m: 2, cmd: "Outline", kw: ["private key", "stolen", "rotate", "revoke", "secure storage"], pts: ["If a private / secret key is lost or stolen, encrypted data can be read or the server impersonated", "Keys must be generated, stored securely, rotated / renewed and revoked when compromised"] },
    ]
  ),
];

export const IB_TASKS_A12: IGCSETask[] = [...A1, ...A2];
