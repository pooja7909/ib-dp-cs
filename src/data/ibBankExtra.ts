import type { IGCSETask, MarkPoint, QuestionPart, TableCell, TableColumn, QuestionDifficulty, QuestionLevel } from "../types";
import { IB_STATEMENT_MAP } from "./ibSyllabus.js";

// IB DP Computer Science (first assessment 2027) - extra built-in questions that complete the
// coverage of every understanding statement in the guide (at least four questions each).
// Original questions. ibLevel and paper are derived from the statement (src/data/ibSyllabus.ts).

/** A mark point: the text, optionally followed by accepted answer phrasings. */
type P = string | string[];

interface Meta {
  ref: string; // statement code, e.g. "A1.2.3"
  title: string;
  d: QuestionDifficulty;
  cmd: string; // IB command term
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

const counters: Record<string, number> = {};

function base(s: Meta): IGCSETask {
  const st = IB_STATEMENT_MAP[s.ref];
  if (!st) throw new Error(`Unknown statement ${s.ref}`);
  const u = st.topic;
  counters[u] = (counters[u] ?? 500) + 1;
  const paper = u.startsWith("B") ? "Paper 2" : "Paper 1";
  return {
    id: `ib_${u.toLowerCase()}_${counters[u]}`,
    unit: u,
    title: s.title,
    difficulty: s.d,
    level: s.lvl ?? (s.d === "Easy" ? "Starter" : s.d === "Moderate" ? "Core" : "Exam-style"),
    type: "theory",
    brief: "",
    marks: 0,
    specReference: s.ref,
    ibLevel: st.hlOnly ? "HL" : "SL",
    paper,
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
  return p.pts.map((pt, i) => ({ id: `MP${i + 1}`, marks: 1, criterion: ptText(pt), acceptedAnswers: ptAlts(pt) }));
}

/** Single written question. */
function th(s: Meta, brief: string, p: Omit<PartDef, "q">): IGCSETask {
  const t = base(s);
  const part: PartDef = { ...p, q: brief, cmd: p.cmd ?? s.cmd };
  t.type = "theory";
  t.marks = p.m;
  t.brief = `${brief} [${p.m}]`;
  t.markScheme = schemeText(part);
  t.markPoints = markPoints(part);
  t.questions = [{ q: brief, keywords: p.kw, maxMarks: p.m, criteria: p.pts.map(ptText) }];
  return t;
}

/** Structured exam-style question with parts (a), (b), ... */
function mu(s: Meta, stem: string, parts: PartDef[]): IGCSETask {
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
    stem + "\n\n" + parts.map((p, i) => `(${letters[i]}) ${p.q} [${p.m}]`).join("\n\n") + "\n\nLabel each part of your answer (a), (b), ...";
  t.markScheme = qp.map((p) => `${p.label} [${p.marks}]\n${p.markScheme}`).join("\n\n");
  t.questions = parts.map((p, i) => ({ q: `(${letters[i]}) ${p.q}`, keywords: p.kw, maxMarks: p.m, criteria: p.pts.map(ptText) }));
  return t;
}

/** Multiple choice: one mark per question. */
function mc(s: Meta, brief: string, qs: { q: string; o: string[]; a: number }[]): IGCSETask {
  const t = base(s);
  t.type = "mcq";
  t.brief = brief;
  t.marks = qs.length;
  t.questions = qs.map((x) => ({ q: x.q, options: x.o, a: x.a }));
  t.markScheme = `Award [1] for each correct answer, up to [${t.marks}]:\n` + qs.map((x, i) => `- Q${i + 1}: ${x.o[x.a]} [1]`).join("\n");
  return t;
}

/** Short exact answers. */
function ins(s: Meta, brief: string, qs: { q: string; a: string[]; why?: string }[], code?: string): IGCSETask {
  const t = base(s);
  t.type = "inspect";
  t.brief = brief;
  if (code) t.code = code;
  t.marks = qs.length;
  t.questions = qs.map((x) => ({ q: x.q, a: x.a, why: x.why }));
  t.markScheme =
    `Award [1] for each correct answer, up to [${t.marks}]:\n` +
    qs.map((x, i) => `- ${i + 1}. ${x.a[0]}${x.a.length > 1 ? ` (accept ${x.a.slice(1).join(" / ")})` : ""} [1]`).join("\n");
  return t;
}

/** Table: cells starting with "=" are given; others are answered. "|" separates accepted alternatives. */
function tab(s: Meta, brief: string, columns: TableColumn[], rows: string[][], marks: number, note?: string): IGCSETask {
  const t = base(s);
  t.type = "table";
  t.brief = brief;
  t.columns = columns;
  const cells: TableCell[][] = rows.map((r) => r.map((c) => (c.startsWith("=") ? { v: c.slice(1), g: true } : { v: c, g: false })));
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
  ["1-2", "Limited understanding. Points are mostly listed with little development and little or no reference to the scenario. No real evaluation or conclusion."],
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

const given = (label: string): TableColumn => ({ label });
const pick = (label: string, options: string[]): TableColumn => ({ label, type: "select", options });

// =====================================================================
// A1 Computer fundamentals
// =====================================================================
const A1: IGCSETask[] = [
  // A1.1.2 GPU
  mc(
    { ref: "A1.1.2", title: "A1.1 What makes a GPU different", d: "Easy", cmd: "Identify" },
    "Answer each question about graphics processing units (GPUs).",
    [
      { q: "Which feature of a GPU's architecture makes it suited to rendering graphics?", o: ["A few very powerful cores with large caches", "Hundreds or thousands of simpler cores that apply the same operation to many data items at once", "A single core with a very high clock speed", "Built-in secondary storage"], a: 1 },
      { q: "Which task is a GPU best suited to?", o: ["Running a word processor's spell checker", "Handling keyboard interrupts", "Training a neural network on large batches of images", "Managing the file system"], a: 2 },
      { q: "Why are GPUs used for large scientific simulations, such as weather models?", o: ["The same calculation is applied to millions of data points, which can be done in parallel", "Simulations need very little memory", "GPUs are cheaper than RAM", "Simulations only use integer arithmetic"], a: 0 },
      { q: "Why does a GPU have its own very high-bandwidth memory?", o: ["To store the operating system", "To keep data after the power is switched off", "To replace the CPU's registers", "To supply large amounts of data to its many cores quickly enough"], a: 3 },
    ]
  ),
  th(
    { ref: "A1.1.2", title: "A1.1 The GPU in a games console", d: "Moderate", cmd: "Describe" },
    "Describe the role of the graphics processing unit (GPU) in a games console.",
    {
      m: 3,
      kw: ["render", "frames", "pixels", "parallel", "many cores", "frame rate", "vram"],
      pts: [
        "It renders the images/frames that are displayed, calculating the colour of each pixel",
        "Its many cores process large numbers of pixels/vertices in parallel",
        "This produces a high frame rate / smooth, detailed 3D graphics",
        "It takes graphics work away from the CPU, which is left free for game logic/physics/AI",
        "It uses its own fast graphics memory (VRAM) to hold textures and frame data",
      ],
    }
  ),
  mu(
    { ref: "A1.1.2", title: "A1.1 GPUs in a weather service", d: "Hard", cmd: "Explain" },
    "A national weather service runs a forecasting model that divides the atmosphere into millions of grid cells. Every few seconds of simulated time, the same set of equations is applied to every cell.",
    [
      { q: "Outline the architecture of a GPU.", m: 2, cmd: "Outline", kw: ["many cores", "simple", "parallel", "same instruction", "memory bandwidth"], pts: ["A very large number of small/simple cores grouped together", "Designed to run the same instruction on many data items in parallel (SIMD) / high-bandwidth memory"] },
      {
        q: "Explain why the forecasting model runs much faster on GPUs than on CPUs alone.",
        m: 3,
        cmd: "Explain",
        kw: ["same equations", "independent", "parallel", "thousands", "throughput"],
        pts: [
          "The calculation for each grid cell is the same and largely independent of the others",
          "So the cells can be shared out across thousands of GPU cores and processed at the same time",
          "A CPU has only a few cores, so it would process far fewer cells at once / GPU gives much higher throughput",
        ],
      },
      { q: "Identify two other real-world applications that benefit from GPUs.", m: 2, cmd: "Identify", kw: ["machine learning", "video games", "video editing", "rendering", "cryptography", "simulation"], pts: [["Training machine learning / AI models", "neural networks"], ["Video games / 3D rendering", "games"], ["Video editing / encoding", "film rendering"], ["Other large simulations (physics, medical imaging)", "simulation"]] },
    ]
  ),
  // A1.1.3 CPU vs GPU (HL)
  mc(
    { ref: "A1.1.3", title: "A1.1 CPU or GPU?", d: "Easy", cmd: "Identify" },
    "Answer each question comparing the central processing unit (CPU) and the graphics processing unit (GPU).",
    [
      { q: "Which is designed for low latency on a wide variety of sequential tasks?", o: ["GPU", "CPU", "Both equally", "Neither"], a: 1 },
      { q: "Which is designed for high throughput on large amounts of similar, parallel work?", o: ["CPU", "Hard disk controller", "GPU", "Network interface card"], a: 2 },
      { q: "When a CPU and a GPU work together, which normally divides up the work and coordinates execution?", o: ["The CPU", "The GPU", "The monitor", "The power supply"], a: 0 },
      { q: "For highly parallel workloads, which usually completes more operations per watt of power?", o: ["CPU", "Both use identical power", "Neither can run parallel work", "GPU"], a: 3 },
    ]
  ),
  tab(
    { ref: "A1.1.3", title: "A1.1 Distinguishing CPU and GPU features", d: "Moderate", cmd: "Distinguish" },
    "For each feature, select whether it describes a typical CPU or a typical GPU.",
    [given("Feature"), pick("Processor", ["CPU", "GPU"])],
    [
      ["=Large caches and complex control logic such as branch prediction for each core", "CPU"],
      ["=Thousands of simple cores sharing control logic", "GPU"],
      ["=Memory optimized for very high bandwidth when streaming large blocks of data", "GPU"],
      ["=Memory access optimized for low latency on unpredictable, varied requests", "CPU"],
      ["=Best for running the operating system and handling interrupts", "CPU"],
      ["=Best for applying the same filter to every pixel of an image", "GPU"],
    ],
    3,
    "Award [1] for every two correct rows."
  ),
  // A1.1.4 primary memory
  th(
    { ref: "A1.1.4", title: "A1.1 Memory hierarchy and performance", d: "Hard", cmd: "Describe" },
    "Describe how the CPU uses registers, cache and RAM together to optimize performance when it runs a program.",
    {
      m: 4,
      kw: ["registers", "fastest", "cache", "frequently used", "RAM", "cache hit", "cache miss", "hierarchy"],
      pts: [
        "Registers are the fastest memory, inside the CPU, holding the current instruction/data/addresses being processed",
        "Cache holds copies of frequently/recently used instructions and data from RAM, close to the cores",
        "The CPU checks cache first (L1, then L2, then L3): if the data is there (cache hit) it is fetched quickly",
        "On a cache miss the data is fetched from the slower RAM and copied into cache for future use",
        "RAM holds the running programs and data that are too large for cache; this hierarchy balances speed, size and cost",
      ],
    }
  ),
  // A1.1.5 FDE cycle
  mc(
    { ref: "A1.1.5", title: "A1.1 Steps of the fetch-decode-execute cycle", d: "Easy", cmd: "Identify" },
    "Answer each question about the fetch, decode and execute cycle.",
    [
      { q: "At the start of the fetch stage, the contents of which register are copied into the MAR?", o: ["Accumulator", "Program counter", "Instruction register", "Memory data register"], a: 1 },
      { q: "Which bus carries the instruction from RAM to the CPU?", o: ["Data bus", "Address bus", "Control bus", "None: instructions are not sent on a bus"], a: 0 },
      { q: "Where is the fetched instruction held while it is decoded?", o: ["Program counter", "Memory address register", "Instruction register", "Cache"], a: 2 },
      { q: "Which component interprets the instruction during the decode stage?", o: ["ALU", "Address bus", "RAM", "Control unit"], a: 3 },
    ]
  ),
  mu(
    { ref: "A1.1.5", title: "A1.1 Executing a LOAD instruction", d: "Hard", cmd: "Describe" },
    "A simple CPU is about to execute the instruction stored at memory address 200. The instruction is LOAD 350, which copies the value stored at address 350 into the accumulator. Each instruction occupies one memory location.",
    [
      { q: "State the value held in the program counter (PC) after the instruction has been fetched.", m: 1, cmd: "State", kw: ["201"], pts: [["201", "two hundred and one"]] },
      {
        q: "Describe how the instruction is fetched from memory, referring to the registers and buses used.",
        m: 3,
        cmd: "Describe",
        kw: ["PC", "MAR", "address bus", "control bus", "read", "data bus", "MDR", "IR"],
        pts: [
          "The address 200 is copied from the PC to the MAR",
          "The address is sent along the address bus and a read signal is sent on the control bus",
          "The instruction is sent along the data bus into the MDR and then copied to the IR (the PC is incremented)",
        ],
      },
      {
        q: "Describe what happens during the execute stage of LOAD 350.",
        m: 2,
        cmd: "Describe",
        kw: ["350", "MAR", "data bus", "MDR", "accumulator"],
        pts: ["The operand/address 350 is placed in the MAR and a read is carried out from that location", "The value arrives in the MDR via the data bus and is copied into the accumulator"],
      },
    ]
  ),
  // A1.1.6 pipelining (HL)
  mc(
    { ref: "A1.1.6", title: "A1.1 Pipelining basics", d: "Easy", cmd: "Identify" },
    "Answer each question about pipelining.",
    [
      { q: "What is pipelining?", o: ["Running every instruction twice to check for errors", "Overlapping the stages of several instructions so that a new instruction can start before the previous one finishes", "Storing instructions in a queue on the hard disk", "Sending instructions to a GPU"], a: 1 },
      { q: "In a four-stage pipeline, which stage comes after execute?", o: ["Fetch", "Decode", "Write-back", "Interrupt"], a: 2 },
      { q: "How do the cores of a multi-core processor relate to pipelines?", o: ["Each core has its own pipeline and runs its own instruction stream in parallel", "All cores share one pipeline", "Only one core can use a pipeline at a time", "Pipelines are only found in GPUs"], a: 0 },
      { q: "Which situation reduces the benefit of pipelining?", o: ["Instructions that are independent of each other", "A higher clock speed", "More cores", "An instruction that needs the result of the previous instruction before it can execute"], a: 3 },
    ]
  ),
  th(
    { ref: "A1.1.6", title: "A1.1 Pipelining and multiple cores", d: "Moderate", cmd: "Explain" },
    "Explain how pipelining and multiple cores together improve the overall performance of a processor.",
    {
      m: 3,
      kw: ["stages", "overlap", "throughput", "each core", "own pipeline", "parallel", "independent"],
      pts: [
        "Pipelining splits instruction processing into stages (fetch, decode, execute, write-back) that work on different instructions at the same time",
        "So once the pipeline is full, about one instruction completes every clock cycle / throughput increases",
        "Each core has its own pipeline and works independently on a different thread/process",
        "So several instruction streams are processed in parallel, multiplying throughput (if the software is multi-threaded)",
      ],
    }
  ),
  // A1.1.7 secondary storage
  tab(
    { ref: "A1.1.7", title: "A1.1 Choosing a storage device", d: "Easy", cmd: "Identify" },
    "For each scenario, select the most suitable type of secondary storage.",
    [given("Scenario"), pick("Storage", ["SSD", "HDD", "eMMC", "Optical drive", "Flash drive", "NAS"])],
    [
      ["=Low-cost internal storage soldered onto the board of a budget smartphone", "eMMC"],
      ["=Several terabytes of cheap internal storage for archived CCTV footage", "HDD"],
      ["=A family wants all its devices to share photos stored on the home network", "NAS"],
      ["=Fast internal storage so that a gaming laptop starts up and loads levels quickly", "SSD"],
      ["=A student carries homework files between home and school in a pocket", "Flash drive"],
      ["=Reading films and music distributed on discs", "Optical drive"],
    ],
    6
  ),
  mu(
    { ref: "A1.1.7", title: "A1.1 Storage for a video company", d: "Moderate", cmd: "Explain" },
    "A small video production company stores current projects on its editing computers and keeps finished projects in an archive.",
    [
      { q: "Outline what is meant by network attached storage (NAS).", m: 2, cmd: "Outline", kw: ["device", "network", "shared", "drives", "file server"], pts: ["A storage device containing one or more drives that connects directly to the network", "So that all users/devices on the network can access/share the files"] },
      { q: "Explain why the company might choose HDDs rather than SSDs for its archive.", m: 2, cmd: "Explain", kw: ["cost per gigabyte", "cheaper", "large capacity", "speed not critical"], pts: ["HDDs have a much lower cost per gigabyte / higher capacity for the price", "Archived files are rarely accessed, so the faster access of SSDs is not needed"] },
      { q: "Describe one risk of relying only on external flash drives to back up the projects.", m: 2, cmd: "Describe", kw: ["lost", "stolen", "damaged", "capacity", "single copy"], pts: ["Flash drives are small and easily lost/stolen/damaged", "So the only backup copy of the projects could be lost / data may be exposed if unencrypted"] },
    ]
  ),
  // A1.1.8 compression
  mc(
    { ref: "A1.1.8", title: "A1.1 Compression methods", d: "Easy", cmd: "Identify" },
    "Answer each question about compression.",
    [
      { q: "Which method replaces a run of identical values with a single value and a count?", o: ["Transform coding", "Run-length encoding", "Encryption", "Hashing"], a: 1 },
      { q: "Which type of compression allows the original file to be rebuilt exactly?", o: ["Lossless", "Lossy", "Transform coding", "Sampling"], a: 0 },
      { q: "Transform coding, used for photos and music, is an example of which type of compression?", o: ["Lossless", "Run-length", "Lossy", "Symmetric"], a: 2 },
      { q: "Which file must be compressed losslessly?", o: ["A holiday photo", "A streamed film", "A podcast", "A program's executable file"], a: 3 },
    ]
  ),
  // A1.1.9 cloud
  th(
    { ref: "A1.1.9", title: "A1.1 Software as a service", d: "Moderate", cmd: "Describe" },
    "A school moves its email and document editing to software as a service (SaaS). Describe what SaaS provides to the school and how much control the school keeps.",
    {
      m: 3,
      kw: ["complete application", "browser", "provider manages", "updates", "little control", "settings", "subscription"],
      pts: [
        "Ready-to-use applications delivered over the internet / accessed through a web browser, usually by subscription",
        "The provider manages the infrastructure, operating system, application, updates and backups",
        "The school controls only user accounts, settings and its own data, with little control over the software itself",
      ],
    }
  ),
  tab(
    { ref: "A1.1.9", title: "A1.1 Who manages what in the cloud?", d: "Moderate", cmd: "Identify" },
    "For each layer of a computer system, select who manages it under each cloud service model.",
    [given("Layer"), pick("IaaS", ["Provider", "Customer"]), pick("PaaS", ["Provider", "Customer"]), pick("SaaS", ["Provider", "Customer"])],
    [
      ["=The application software", "Customer", "Customer", "Provider"],
      ["=The runtime environment and middleware", "Customer", "Provider", "Provider"],
      ["=The operating system", "Customer", "Provider", "Provider"],
      ["=The physical servers, storage and networking", "Provider", "Provider", "Provider"],
    ],
    4,
    "Award [1] per fully correct row."
  ),
  // A1.2.1 data representation
  mu(
    { ref: "A1.2.1", title: "A1.2 Hexadecimal colour codes", d: "Moderate", cmd: "Describe" },
    "A web designer specifies colours using three 8-bit values (red, green, blue), written in hexadecimal. For example, #2F80C8 has red 2F, green 80 and blue C8.",
    [
      { q: "Convert the red value 2F into 8-bit binary.", m: 1, cmd: "Calculate", kw: ["00101111"], pts: [["00101111", "0010 1111", "101111"]] },
      { q: "Convert the blue value C8 into denary.", m: 1, cmd: "Calculate", kw: ["200"], pts: [["200"]] },
      { q: "A green value is stored as 10110110 in binary. Convert it to hexadecimal.", m: 1, cmd: "Calculate", kw: ["B6"], pts: [["B6", "b6"]] },
      { q: "Describe why programmers often use hexadecimal rather than binary.", m: 2, cmd: "Describe", kw: ["shorter", "one hex digit", "four bits", "fewer errors", "easier to read"], pts: ["Hexadecimal is shorter / easier to read and remember than long binary strings", "Each hex digit represents exactly four bits, so it converts easily to binary and fewer mistakes are made"] },
    ]
  ),
  // A1.2.2 binary storage
  mc(
    { ref: "A1.2.2", title: "A1.2 Storing data in binary", d: "Easy", cmd: "Identify" },
    "Answer each question about how data is stored in binary.",
    [
      { q: "How many different values can be represented with 8 bits?", o: ["8", "128", "256", "255"], a: 2 },
      { q: "Why was Unicode introduced when ASCII already existed?", o: ["ASCII cannot store numbers", "ASCII cannot represent the characters of most of the world's writing systems", "Unicode uses fewer bits for every character", "ASCII is only used for images"], a: 1 },
      { q: "What does increasing the colour depth of an image do?", o: ["Increases the number of colours each pixel can show", "Increases the number of pixels", "Reduces the file size", "Converts the image to sound"], a: 0 },
      { q: "In digital audio, what is the sample rate?", o: ["The number of bits used for each sample", "The length of the recording", "The volume of the sound", "The number of samples taken per second"], a: 3 },
    ]
  ),
  // A1.2.3 logic gates
  th(
    { ref: "A1.2.3", title: "A1.2 Logic gates in binary computing", d: "Moderate", cmd: "Describe" },
    "Describe the role of logic gates in a computer.",
    {
      m: 3,
      kw: ["binary inputs", "output", "Boolean", "transistors", "circuits", "adders", "ALU", "memory"],
      pts: [
        "A logic gate takes one or more binary inputs (0/1) and produces a single binary output according to a Boolean operation",
        "Gates are built from transistors and combined into circuits",
        "Circuits of gates carry out arithmetic (e.g. adders in the ALU) and comparisons",
        "Gates are also used to make memory (flip-flops/registers) and control/decision logic",
      ],
    }
  ),
  mu(
    { ref: "A1.2.3", title: "A1.2 Gates in an adder", d: "Hard", cmd: "Explain" },
    "The arithmetic logic unit (ALU) adds binary numbers using circuits built from logic gates.",
    [
      { q: "State the output of a NAND gate when both inputs are 1.", m: 1, cmd: "State", kw: ["0"], pts: [["0", "zero", "false"]] },
      { q: "Identify the gate whose output is 1 only when its two inputs are different.", m: 1, cmd: "Identify", kw: ["XOR"], pts: [["XOR", "exclusive or", "exclusive-or"]] },
      {
        q: "A half adder adds two bits A and B, giving a sum bit S and a carry bit C. Explain which gate produces S and which produces C.",
        m: 2,
        cmd: "Explain",
        kw: ["XOR", "sum", "AND", "carry"],
        pts: ["S is produced by an XOR gate, because the sum bit is 1 when exactly one input is 1", "C is produced by an AND gate, because a carry occurs only when both inputs are 1"],
      },
      { q: "Explain why NAND gates are called universal gates.", m: 2, cmd: "Explain", kw: ["any", "other gates", "combination", "manufacture"], pts: ["Any other logic gate/Boolean function (NOT, AND, OR...) can be built using only NAND gates", "So chips can be manufactured from one type of gate, which is cheaper/simpler"] },
    ]
  ),
  // A1.2.4 truth tables (command-term variety)
  ins(
    { ref: "A1.2.4", title: "A1.2 Deducing outputs from an expression", d: "Moderate", cmd: "Deduce" },
    "A circuit computes X = (A AND NOT B) OR C. Deduce the output X for each set of inputs. Answer 0 or 1.",
    [
      { q: "A = 1, B = 0, C = 0", a: ["1"] },
      { q: "A = 0, B = 1, C = 0", a: ["0"] },
      { q: "A = 1, B = 1, C = 0", a: ["0"] },
      { q: "A = 0, B = 0, C = 1", a: ["1"] },
    ]
  ),
  // A1.2.5 logic diagrams
  mc(
    { ref: "A1.2.5", title: "A1.2 Logic gate symbols", d: "Easy", cmd: "Identify" },
    "Answer each question about the standard symbols used in logic diagrams.",
    [
      { q: "In a logic diagram, what does a small circle (bubble) on the output of a gate show?", o: ["The output is inverted (NOT)", "The gate has three inputs", "The output is connected to the clock", "The gate is an OR gate"], a: 0 },
      { q: "Which gate is drawn as a D shape with a bubble on its output?", o: ["AND", "NOR", "NAND", "XOR"], a: 2 },
      { q: "Which gate is drawn as an OR shape with an extra curved line across its inputs?", o: ["NOR", "XOR", "NAND", "NOT"], a: 1 },
      { q: "Which gate is drawn as a triangle with a bubble at its tip?", o: ["AND", "XNOR", "OR", "NOT"], a: 3 },
    ]
  ),
  ins(
    { ref: "A1.2.5", title: "A1.2 Following a logic diagram", d: "Moderate", cmd: "Deduce" },
    "In a logic diagram, inputs A and B enter an AND gate whose output is P. Inputs B and C enter an OR gate whose output is Q. P and Q are the inputs of an XOR gate whose output is X. Deduce X for each set of inputs. Answer 0 or 1.",
    [
      { q: "A = 1, B = 1, C = 0", a: ["0"], why: "P = 1, Q = 1, so X = 0." },
      { q: "A = 0, B = 1, C = 0", a: ["1"], why: "P = 0, Q = 1." },
      { q: "A = 1, B = 0, C = 0", a: ["0"], why: "P = 0, Q = 0." },
      { q: "A = 0, B = 0, C = 1", a: ["1"], why: "P = 0, Q = 1." },
    ]
  ),
  mu(
    { ref: "A1.2.5", title: "A1.2 Designing a seatbelt warning circuit", d: "Hard", cmd: "Construct" },
    "A car's warning buzzer X sounds (X = 1) when the engine is on (E = 1) and either a door is open (D = 1) or the driver's seatbelt is unfastened (S = 1).",
    [
      { q: "Construct a Boolean expression for X using E, D and S.", m: 2, cmd: "Construct", kw: ["E AND (D OR S)", "(D AND E) OR (S AND E)"], pts: ["Correct use of OR between D and S", ["Correct use of AND with E, e.g. X = E AND (D OR S)", "X = (D AND E) OR (S AND E)"]], notes: ["Accept any equivalent expression, including dot/plus notation."] },
      {
        q: "Describe the logic diagram for X = (D AND E) OR (S AND E), naming each gate and its inputs.",
        m: 3,
        cmd: "Describe",
        kw: ["two AND gates", "OR gate", "inputs", "output X"],
        pts: ["An AND gate with inputs D and E", "A second AND gate with inputs S and E", "An OR gate whose inputs are the outputs of the two AND gates, giving X"],
      },
      { q: "Use Boolean algebra to simplify (D AND E) OR (S AND E), and state how many gates the simplified circuit needs.", m: 2, cmd: "Construct", kw: ["E AND (D OR S)", "two gates", "distributive"], pts: [["E AND (D OR S) (taking out the common factor E)", "E.(D+S)"], ["Two gates (one OR and one AND)", "2"]] },
    ]
  ),
  // A1.3.1 role of OS
  mc(
    { ref: "A1.3.1", title: "A1.3 Role of the operating system", d: "Easy", cmd: "Identify" },
    "Answer each question about the role of an operating system (OS).",
    [
      { q: "Which statement best describes the role of an OS?", o: ["It converts high-level code into machine code", "It manages the hardware and resources and provides an interface for users and applications", "It stores files permanently when the power is off", "It increases the clock speed of the CPU"], a: 1 },
      { q: "Why can an application save a file without knowing which type of storage drive is fitted?", o: ["The OS hides (abstracts) the details of the hardware", "Files are always saved in RAM", "The drive installs the application", "Applications contain their own drivers for every device"], a: 0 },
      { q: "Which is an example of the OS managing a system resource?", o: ["A user typing a document", "A compiler finding a syntax error", "A website loading an image", "Sharing CPU time between running programs"], a: 3 },
      { q: "When is the OS loaded into memory?", o: ["Only when the user opens a file", "When the first application is installed", "When the computer starts up (boots)", "Only when an error occurs"], a: 2 },
    ]
  ),
  th(
    { ref: "A1.3.1", title: "A1.3 The OS as an abstraction layer", d: "Moderate", cmd: "Explain" },
    "Explain how an operating system abstracts the complexity of the hardware for application programmers.",
    {
      m: 3,
      kw: ["interface", "system calls", "API", "drivers", "same code", "hardware details hidden"],
      pts: [
        "The OS provides a standard interface (system calls / API) for tasks such as reading files, drawing on screen or sending data",
        "Device drivers handle the details of each specific piece of hardware",
        "So programmers write the same code whatever hardware is fitted / do not need to control the hardware directly",
        "The OS also decides how resources (CPU, memory, devices) are shared, so applications do not have to",
      ],
    }
  ),
  mu(
    { ref: "A1.3.1", title: "A1.3 Operating system for a smartwatch", d: "Hard", cmd: "Describe" },
    "A company is developing a smartwatch. Third-party developers will write apps for it, and the watch has a small battery, a touch screen, a heart-rate sensor and Bluetooth.",
    [
      { q: "Outline two roles of the smartwatch's operating system.", m: 2, cmd: "Outline", kw: ["manage resources", "interface", "hardware", "applications"], pts: ["Manages the watch's resources (CPU time, memory, battery, sensors) between apps", "Provides an interface between the user/apps and the hardware", "Starts and controls the running of apps"] },
      {
        q: "Describe how the operating system makes it easier for developers to write apps that use the heart-rate sensor.",
        m: 3,
        cmd: "Describe",
        kw: ["driver", "API", "standard functions", "hides details", "permission"],
        pts: [
          "A device driver in the OS communicates with the sensor hardware",
          "The OS provides standard functions/an API that apps call to get a reading",
          "Developers do not need to know how the sensor works / the same app works if the sensor model changes",
        ],
      },
      { q: "Explain why managing power is an important role for this operating system.", m: 2, cmd: "Explain", kw: ["battery", "sleep", "switch off", "background", "lifetime"], pts: ["The watch runs on a small battery", "So the OS must put unused components to sleep / limit background tasks to extend battery life"] },
    ]
  ),
  // A1.3.2 OS functions
  tab(
    { ref: "A1.3.2", title: "A1.3 Identifying OS functions", d: "Easy", cmd: "Identify" },
    "For each task, select the operating system function that carries it out.",
    [given("Task"), pick("Function", ["Memory management", "File system", "Device management", "Scheduling", "Security", "Accounting", "Virtualization"])],
    [
      ["=Deciding which process uses the CPU next", "Scheduling"],
      ["=Using a driver to send data to a printer", "Device management"],
      ["=Checking a user's password and access rights", "Security"],
      ["=Allocating RAM to a newly started program", "Memory management"],
      ["=Organizing data into folders and tracking where each file is stored", "File system"],
      ["=Recording how much CPU time each user has used", "Accounting"],
      ["=Running a second, separate operating system inside a virtual machine", "Virtualization"],
    ],
    7
  ),
  th(
    { ref: "A1.3.2", title: "A1.3 Memory management with many programs", d: "Hard", cmd: "Explain" },
    "Explain how an operating system manages memory when a user has many applications open at the same time.",
    {
      m: 4,
      kw: ["allocate", "free", "protect", "separate", "virtual memory", "paging", "swap", "secondary storage"],
      pts: [
        "It allocates RAM to each process when it starts and frees it when the process ends",
        "It keeps each process's memory separate/protected so one program cannot overwrite another's data",
        "If RAM is full, it uses virtual memory: part of secondary storage is used as an extension of RAM",
        "Pages that are not currently needed are swapped out to disk and swapped back in when needed",
        "Too much swapping slows the system (disk thrashing), so the OS tries to keep active pages in RAM",
      ],
    }
  ),
  // A1.3.3 scheduling
  mc(
    { ref: "A1.3.3", title: "A1.3 Scheduling algorithms", d: "Easy", cmd: "Identify" },
    "Answer each question about scheduling.",
    [
      { q: "Which algorithm gives each process a fixed time slice in turn?", o: ["First-come first-served", "Round robin", "Priority scheduling", "Multilevel queue"], a: 1 },
      { q: "Which algorithm runs each process to completion in the order it arrived?", o: ["First-come first-served", "Round robin", "Priority scheduling", "Multilevel queue"], a: 0 },
      { q: "Which algorithm places processes in separate queues by type, e.g. system, interactive and batch?", o: ["Round robin", "First-come first-served", "Multilevel queue", "Polling"], a: 2 },
      { q: "Which problem can occur with priority scheduling?", o: ["Every process gets exactly the same time", "Processes can never be interrupted", "The CPU stays idle", "Low-priority processes may wait indefinitely (starvation)"], a: 3 },
    ]
  ),
  // A1.3.4 polling and interrupts
  th(
    { ref: "A1.3.4", title: "A1.3 Polling compared with interrupts", d: "Moderate", cmd: "Distinguish" },
    "Distinguish between polling and interrupt handling.",
    {
      m: 3,
      kw: ["repeatedly checks", "device signals", "CPU time", "wasted", "ISR", "pauses"],
      pts: [
        "Polling: the CPU repeatedly checks the status of a device at regular intervals to see if it needs attention",
        "Interrupts: the device sends a signal to the CPU only when it needs attention",
        "With an interrupt the CPU pauses its current task, runs an interrupt service routine and then resumes; polling uses CPU time even when nothing has happened",
      ],
    }
  ),
  mu(
    { ref: "A1.3.4", title: "A1.3 Polling or interrupts in a wildlife camera", d: "Hard", cmd: "Evaluate" },
    "A battery-powered wildlife camera is left in a forest for months. It takes a photo when a motion sensor detects an animal, which may happen only a few times a day. It also checks its battery level once every hour.",
    [
      { q: "Identify one factor that affects the choice between polling and interrupts.", m: 1, cmd: "Identify", kw: ["event frequency", "power", "predictability", "latency", "overhead"], pts: [["Event frequency / predictability / power source / CPU overhead / latency", "how often events happen", "battery or mains"]] },
      {
        q: "Evaluate the use of polling and interrupts for the camera's motion sensor and battery check.",
        m: 6,
        cmd: "Evaluate",
        kw: ["battery", "rare events", "sleep", "wake", "predictable", "hourly", "latency"],
        bands: BANDS6,
        pts: [
          "Motion events are rare and unpredictable, so polling would waste processing and battery checking a sensor that rarely changes",
          "An interrupt lets the processor sleep in a low-power state and wake only when motion occurs",
          "Interrupts give a fast response (low latency), so the photo is taken before the animal moves away",
          "The battery check is regular and predictable, so polling once an hour (using a timer) is simple and cheap",
          "Polling is easier to design and test; interrupts add complexity (interrupt service routines, priorities)",
          "Conclusion: interrupts for the motion sensor, timed polling for the battery check",
        ],
      },
    ]
  ),
  // A1.3.5 multitasking (HL)
  mc(
    { ref: "A1.3.5", title: "A1.3 Multitasking and deadlock", d: "Easy", cmd: "Identify" },
    "Answer each question about multitasking and resource allocation.",
    [
      { q: "How does a single-core CPU appear to run several programs at once?", o: ["It switches between processes very quickly", "It runs all of them at exactly the same instant", "It copies them to the GPU", "It runs each program only once a day"], a: 0 },
      { q: "What is resource contention?", o: ["A resource that nobody uses", "Two or more processes competing for the same resource at the same time", "A program that has finished", "The OS deleting a file"], a: 1 },
      { q: "Which situation is a deadlock?", o: ["A process finishes early", "A process uses too much RAM", "Process A holds the printer and waits for the scanner, while process B holds the scanner and waits for the printer", "A user closes an application"], a: 2 },
      { q: "What does the OS save when it switches from one process to another (a context switch)?", o: ["The whole hard disk", "The user's password", "The screen resolution", "The process's state, such as its register values and program counter"], a: 3 },
    ]
  ),
  th(
    { ref: "A1.3.5", title: "A1.3 Preventing deadlock", d: "Moderate", cmd: "Describe" },
    "Describe two ways in which an operating system can prevent or recover from deadlock.",
    {
      m: 4,
      kw: ["request all resources", "order", "pre-empt", "terminate", "timeout", "detect"],
      pts: [
        "Require a process to request all the resources it needs at once before it starts",
        "So it never holds one resource while waiting for another",
        "Make processes request resources in a fixed order / allow resources to be pre-empted (taken away)",
        "So a circular wait cannot form",
        "Detect deadlock (e.g. with a wait-for graph or timeout) and terminate or roll back one of the processes",
        "So its resources are released and the others can continue",
      ],
      notes: ["Award [1] for each method and [1] for its explanation, up to [4]."],
    }
  ),
  // A1.3.6 control system components (HL)
  tab(
    { ref: "A1.3.6", title: "A1.3 Control system components", d: "Easy", cmd: "Identify" },
    "For each description, select the control system component.",
    [given("Description"), pick("Component", ["Sensor", "Actuator", "Controller", "Transducer", "Control algorithm", "Feedback"])],
    [
      ["=Measures a physical quantity such as temperature", "Sensor"],
      ["=Produces movement or another physical action, e.g. a motor opening a valve", "Actuator"],
      ["=The processor that receives inputs and decides on outputs", "Controller"],
      ["=Converts energy from one form to another, e.g. a physical quantity into an electrical signal", "Transducer"],
      ["=The set of rules used to decide the output from the inputs and the set point", "Control algorithm"],
      ["=The output's effect is measured and returned as an input", "Feedback"],
    ],
    6
  ),
  th(
    { ref: "A1.3.6", title: "A1.3 Open-loop and closed-loop control", d: "Moderate", cmd: "Distinguish" },
    "Distinguish between open-loop and closed-loop control systems, giving an example of each.",
    {
      m: 4,
      kw: ["no feedback", "feedback", "measures output", "adjusts", "timer", "thermostat"],
      pts: [
        "Open-loop: the output is not measured; the controller acts only on its inputs/settings (no feedback)",
        "Example of open-loop: a toaster or washing machine running on a fixed timer / simple sprinkler on a timer",
        "Closed-loop: sensors measure the output and feed it back so the controller adjusts the output to reach the set point",
        "Example of closed-loop: a thermostat-controlled heating system / cruise control",
      ],
    }
  ),
  // A1.3.7 control systems in real-world applications (HL)
  mc(
    { ref: "A1.3.7", title: "A1.3 Control systems around us", d: "Easy", cmd: "Identify" },
    "Answer each question about real-world control systems.",
    [
      { q: "In a home thermostat, which component switches the boiler on?", o: ["Temperature sensor", "Actuator / relay", "Display", "Keypad"], a: 1 },
      { q: "Which sensor would an automatic door use to detect a person approaching?", o: ["Infrared / motion sensor", "Humidity sensor", "pH sensor", "Light-dependent resistor only"], a: 0 },
      { q: "Which is an input to an automatic washing machine's controller?", o: ["The drum motor", "The water valve", "A water-level sensor", "The door lock"], a: 2 },
      { q: "Why must an autonomous vehicle's control system be real-time?", o: ["It needs to save fuel", "It must store maps", "It runs on mains power", "Decisions must be made within strict time limits to avoid collisions"], a: 3 },
    ]
  ),
  th(
    { ref: "A1.3.7", title: "A1.3 Traffic signal control", d: "Moderate", cmd: "Explain" },
    "Explain how a closed-loop control system can be used to manage traffic lights at a busy junction.",
    {
      m: 4,
      kw: ["sensors", "induction loops", "cameras", "queue", "controller", "timing", "lights", "feedback"],
      pts: [
        "Sensors (e.g. induction loops or cameras) detect the number/queue of vehicles on each approach",
        "The controller processes the sensor data using a control algorithm",
        "It changes the timing of the lights (actuators), e.g. giving longer green to the busier road",
        "The sensors keep measuring the queues after the change (feedback), so timings are continually adjusted",
        "Pedestrian buttons are additional inputs that trigger a crossing phase",
      ],
    }
  ),
  mu(
    { ref: "A1.3.7", title: "A1.3 Lift (elevator) control system", d: "Hard", cmd: "Explain" },
    "An office building has an automatic lift (elevator) that serves eight floors.",
    [
      { q: "Identify two sensors the lift's control system would use.", m: 2, cmd: "Identify", kw: ["floor position", "door", "weight", "call button", "obstruction"], pts: [["Floor position sensor", "position sensor"], ["Door / obstruction sensor (infrared)", "door sensor"], ["Load / weight sensor", "weight sensor"]], notes: ["Do not accept call buttons as sensors unless described as inputs; award [1] max for buttons."] },
      {
        q: "Explain how the controller uses feedback to stop the lift accurately at the requested floor.",
        m: 3,
        cmd: "Explain",
        kw: ["position sensor", "compare", "requested floor", "slow", "motor", "stop"],
        pts: [
          "The position sensor continually reports where the lift car is",
          "The controller compares the current position with the requested floor",
          "It signals the motor (actuator) to slow down and stop when the car is level with the floor",
        ],
      },
      { q: "Explain why the lift's door system must use a closed-loop control.", m: 2, cmd: "Explain", kw: ["obstruction", "safety", "re-open", "sensor"], pts: ["An obstruction sensor must detect a person/object in the doorway as the doors close", "So the controller can stop and re-open the doors to prevent injury (safety)"] },
    ]
  ),
  // A1.4.1 translation (HL)
  th(
    { ref: "A1.4.1", title: "A1.4 How a compiler differs from an interpreter", d: "Moderate", cmd: "Distinguish" },
    "Distinguish between how a compiler and an interpreter translate a program.",
    {
      m: 4,
      kw: ["whole program", "executable", "line by line", "errors", "each run", "faster"],
      pts: [
        "A compiler translates the whole source code into machine code (an executable) before it is run",
        "An interpreter translates and executes the program one statement at a time, each time it runs",
        "A compiler reports all errors after translating the whole program; an interpreter stops at the first error it reaches",
        "Compiled programs run faster and do not need the translator on the user's machine; interpreted programs need the interpreter every time",
      ],
    }
  ),
  mu(
    { ref: "A1.4.1", title: "A1.4 JIT and bytecode for a cross-platform app", d: "Hard", cmd: "Evaluate" },
    "A company is building a photo-editing application that must run on Windows, macOS and Linux. Some filters are performance-critical.",
    [
      { q: "Outline what is meant by bytecode.", m: 2, cmd: "Outline", kw: ["intermediate", "not machine code", "virtual machine", "platform independent"], pts: ["An intermediate, platform-independent code produced by compiling the source code", "That is executed by a virtual machine / bytecode interpreter on each platform"] },
      { q: "Describe how just-in-time (JIT) compilation improves the performance of bytecode.", m: 2, cmd: "Describe", kw: ["at run time", "frequently used", "machine code", "cached"], pts: ["During execution, frequently used parts of the bytecode are compiled into native machine code", "The machine code is cached/reused, so these parts then run at near-compiled speed"] },
      {
        q: "Evaluate the use of a bytecode/JIT approach rather than compiling separately for each platform.",
        m: 6,
        cmd: "Evaluate",
        kw: ["portability", "one build", "start-up", "virtual machine", "performance", "native"],
        bands: BANDS6,
        pts: [
          "One bytecode version runs on all three platforms (portability), reducing development and testing effort",
          "JIT compilation of hot code (e.g. filters) gives performance close to native code",
          "Start-up is slower and memory use higher because of the virtual machine and JIT warm-up",
          "Native compilation for each platform gives the fastest, most predictable performance for performance-critical filters",
          "But it needs a separate build and testing for each platform, increasing cost",
          "Conclusion: bytecode/JIT suits a cross-platform app, possibly with native libraries for the most critical filters",
        ],
      },
    ]
  ),
];
// =====================================================================
// A2 Networks
// =====================================================================
const A2: IGCSETask[] = [
  // A2.1.1
  mu(
    { ref: "A2.1.1", title: "A2.1 Networks for an architecture firm", d: "Moderate", cmd: "Describe" },
    "An architecture firm has offices in two cities. Staff sometimes work from home, and each architect uses wireless earbuds with their phone.",
    [
      { q: "Distinguish between a LAN and a WAN.", m: 2, cmd: "Distinguish", kw: ["small area", "one site", "owned", "large area", "leased", "telecommunications"], pts: ["A LAN covers a small area such as one building/site and its links are owned by the organization", "A WAN covers a large geographical area (e.g. connecting the two offices) using links leased from/provided by telecommunications companies"] },
      {
        q: "Describe how a virtual private network (VPN) allows staff working from home to access the office network securely.",
        m: 3,
        cmd: "Describe",
        kw: ["encrypted", "tunnel", "internet", "authenticate", "as if on the LAN"],
        pts: ["The VPN creates an encrypted connection (tunnel) across the public internet", "Staff must authenticate before the connection is set up", "Once connected, the home computer can use office resources as if it were on the office LAN, and intercepted data cannot be read"],
      },
      { q: "Identify the type of network formed by the earbuds and the phone.", m: 1, cmd: "Identify", kw: ["PAN"], pts: [["Personal area network (PAN)", "PAN"]] },
    ]
  ),
  // A2.1.2
  th(
    { ref: "A2.1.2", title: "A2.1 Cloud computing for a school", d: "Moderate", cmd: "Explain" },
    "A school is moving its file storage and learning software to the cloud. Explain one benefit and one limitation of this change.",
    {
      m: 4,
      kw: ["access anywhere", "scalable", "no servers", "maintenance", "internet connection", "outage", "privacy", "subscription"],
      pts: [
        "Benefit: files and software can be accessed from any device with internet access, at school or at home",
        "So pupils can continue work at home / no need to buy and maintain local servers (provider handles updates and backups)",
        "Limitation: everything depends on the internet connection / the provider's availability",
        "So an outage stops lessons / data is stored by a third party, raising privacy and cost concerns",
      ],
      notes: ["Award [1] for each benefit or limitation identified and [1] for each explanation."],
    }
  ),
  // A2.1.3
  mu(
    { ref: "A2.1.3", title: "A2.1 Devices in a home network", d: "Moderate", cmd: "Describe" },
    "A family's home network connects laptops and phones wirelessly, and a desktop computer and a games console by cable. A single box from the internet service provider combines a modem, a router, a switch and a wireless access point.",
    [
      { q: "Describe the function of the modem.", m: 2, cmd: "Describe", kw: ["converts", "digital", "signal", "telephone", "cable", "ISP"], pts: ["Converts digital data from the home network into signals that can travel over the ISP's line (telephone/cable/fibre)", "And converts incoming signals back into digital data (modulate/demodulate)"] },
      { q: "Distinguish between the functions of the switch and the wireless access point.", m: 2, cmd: "Distinguish", kw: ["wired", "MAC address", "forwards", "radio", "wireless devices"], pts: ["The switch connects wired devices and forwards frames only to the destination device using MAC addresses", "The wireless access point lets wireless devices (laptops, phones) join the network using radio signals"] },
      { q: "State the TCP/IP layer at which (i) the router and (ii) the switch mainly operate.", m: 2, cmd: "State", kw: ["internet", "network interface"], pts: [["(i) Router: internet layer", "internet"], ["(ii) Switch: network interface layer", "network interface", "link layer"]] },
    ]
  ),
  // A2.1.4
  th(
    { ref: "A2.1.4", title: "A2.1 HTTPS compared with HTTP", d: "Hard", cmd: "Explain" },
    "Explain how HTTPS protects a customer who enters card details on a shopping website, compared with HTTP.",
    {
      m: 4,
      kw: ["plain text", "intercepted", "TLS", "encrypted", "certificate", "authenticity", "integrity"],
      pts: [
        "With HTTP, data is sent as plain text, so anyone intercepting it could read the card details",
        "HTTPS uses TLS to encrypt the data between the browser and the server",
        "So intercepted data cannot be read / altered without detection (integrity)",
        "The server's digital certificate lets the browser check that the website is genuine, protecting against fake sites / man-in-the-middle",
      ],
    }
  ),
  // A2.1.5 (HL)
  th(
    { ref: "A2.1.5", title: "A2.1 Requesting a web page through the layers", d: "Moderate", cmd: "Describe" },
    "A user requests a web page. Describe the job carried out by each of the four TCP/IP layers on the sending computer.",
    {
      m: 4,
      kw: ["application", "HTTP request", "transport", "segments", "port", "internet", "IP address", "network interface", "frames", "MAC"],
      pts: [
        "Application layer: the browser creates the HTTP(S) request",
        "Transport layer: TCP splits the data into segments, adds port numbers and sequence numbers (for reliability)",
        "Internet layer: IP adds source and destination IP addresses so the packets can be routed",
        "Network interface layer: packets are put into frames with MAC addresses and sent as signals over the physical medium",
      ],
    }
  ),
  // A2.2.1
  th(
    { ref: "A2.2.1", title: "A2.2 Star topology for a small office", d: "Easy", cmd: "Outline" },
    "Outline two reasons why a small dental surgery would use a star topology for its network.",
    {
      m: 2,
      kw: ["cable fault", "one device", "easy to add", "switch", "cheap", "simple"],
      pts: ["A fault in one cable affects only that device, so the rest of the surgery keeps working", "It is simple and cheap to set up / easy to add a new device by plugging it into the switch", "Faults are easy to find / collisions are avoided because the switch gives each device its own link"],
    }
  ),
  // A2.2.2 (HL)
  th(
    { ref: "A2.2.2", title: "A2.2 Scaling a busy web service", d: "Hard", cmd: "Explain" },
    "An online shop's single web server becomes overloaded during sales and sometimes fails. Explain how the shop could improve the scalability and reliability of its web service.",
    {
      m: 4,
      kw: ["several web servers", "load balancer", "redundancy", "failover", "cloud", "caching", "proxy"],
      pts: [
        "Run the website on several web servers instead of one",
        "A load balancer shares incoming requests between the servers, so no single server is overloaded (scalability)",
        "If one server fails, the others continue to serve customers (redundancy / failover improves reliability)",
        "Use cloud hosting to add servers automatically at peak times / caching (proxy or content delivery servers) to serve common pages quickly",
      ],
    }
  ),
  // A2.2.3
  mc(
    { ref: "A2.2.3", title: "A2.2 Client-server or peer-to-peer?", d: "Easy", cmd: "Identify" },
    "Answer each question about networking models.",
    [
      { q: "In which model can every computer both request and provide resources?", o: ["Client-server", "Peer-to-peer", "Star", "WAN"], a: 1 },
      { q: "Which model is most suitable for online banking?", o: ["Client-server", "Peer-to-peer", "Neither model", "A PAN"], a: 0 },
      { q: "Which is a benefit of the peer-to-peer model?", o: ["Central backups", "Easy central security", "No need for an expensive dedicated server", "All files are always available"], a: 2 },
      { q: "Which application is typically built on a peer-to-peer model?", o: ["Web browsing", "Online banking", "Sending email through a mail server", "A cryptocurrency blockchain"], a: 3 },
    ]
  ),
  th(
    { ref: "A2.2.3", title: "A2.2 Client-server for a bank", d: "Moderate", cmd: "Describe" },
    "Describe two benefits of using a client-server model for a bank's customer accounts.",
    {
      m: 4,
      kw: ["central", "security", "access control", "backups", "consistent", "single copy"],
      pts: [
        "Security is managed centrally on the servers",
        "So access rights and authentication can be strictly controlled for every customer",
        "Data is held centrally / backed up by the bank",
        "So there is one consistent, up-to-date copy of each account that can be recovered after failure",
      ],
      notes: ["Award [1] for each benefit and [1] for its development."],
    }
  ),
  // A2.2.4 (conceptual segmentation only - no subnet arithmetic)
  th(
    { ref: "A2.2.4", title: "A2.2 Subnetting and VLANs", d: "Moderate", cmd: "Distinguish" },
    "Distinguish between subnetting and virtual local area networks (VLANs) as ways of segmenting a network.",
    {
      m: 2,
      kw: ["IP address range", "logical networks", "router", "switch configuration", "ports", "location"],
      pts: [
        "Subnetting divides an IP network into smaller logical networks, each with its own range of IP addresses; traffic between subnets goes through a router",
        "VLANs are set up in the configuration of switches, grouping ports/devices into separate logical networks regardless of their physical location",
      ],
    }
  ),
  th(
    { ref: "A2.2.4", title: "A2.2 Role of the subnet mask", d: "Easy", cmd: "Outline" },
    "Outline the role of a subnet mask.",
    {
      m: 2,
      kw: ["network part", "host part", "same subnet", "default gateway", "router"],
      pts: [
        "It shows which part of an IP address identifies the network (subnet) and which part identifies the device",
        "So a device can decide whether a destination is on its own subnet (send directly) or must be sent to the default gateway/router",
      ],
      notes: ["No calculation is required or expected."],
    }
  ),
  th(
    { ref: "A2.2.4", title: "A2.2 Segmenting a factory network", d: "Hard", cmd: "Evaluate", lvl: "Exam-style" },
    "A factory's machine-control computers, office computers and visitor Wi-Fi all share one network. Evaluate the use of physical segmentation compared with VLANs to separate the machine-control computers from the rest of the network.",
    {
      m: 6,
      kw: ["separate switches", "strongest", "cost", "flexibility", "misconfiguration", "broadcast", "firewall"],
      bands: BANDS6,
      pts: [
        "Physical segmentation uses separate switches and cabling, so there is no path to the machines unless one is deliberately added (strongest isolation)",
        "This protects safety-critical machines from malware spreading from offices or visitors",
        "But it is expensive (extra hardware) and inflexible: moving or adding devices requires re-cabling",
        "VLANs reuse the existing switches, so they are cheaper and devices can be regrouped by changing configuration",
        "Both reduce broadcast traffic/congestion and allow traffic between segments to be filtered by a router/firewall",
        "VLANs depend on correct switch configuration; a misconfiguration or switch compromise could expose the machines",
        "Conclusion: physical segmentation is justified for the safety-critical machine network; VLANs suit separating offices and visitors",
      ],
    }
  ),
  // A2.3.2
  mc(
    { ref: "A2.3.2", title: "A2.3 Transmission media facts", d: "Easy", cmd: "Identify" },
    "Answer each question about transmission media.",
    [
      { q: "Which medium is immune to electromagnetic interference?", o: ["Twisted pair", "Fibre optic", "Wireless", "Unshielded copper"], a: 1 },
      { q: "What is attenuation?", o: ["The weakening of a signal as it travels", "The speed of a network", "Encrypting a signal", "Splitting data into packets"], a: 0 },
      { q: "Which medium is usually the cheapest and simplest to install for desks in one office?", o: ["Fibre optic", "Satellite", "Twisted pair", "Microwave link"], a: 2 },
      { q: "Which medium is easiest for an attacker to intercept without physical access?", o: ["Fibre optic", "Twisted pair", "Shielded copper", "Wireless"], a: 3 },
    ]
  ),
  // A2.3.3
  mu(
    { ref: "A2.3.3", title: "A2.3 Sending a video file in packets", d: "Moderate", cmd: "Explain" },
    "A student uploads a large video file from home to a school server across the internet using packet switching.",
    [
      { q: "Outline two items of information held in a packet header.", m: 2, cmd: "Outline", kw: ["source address", "destination address", "sequence number", "TTL", "protocol"], pts: [["Source and destination IP addresses", "destination address"], ["Sequence number / packet number", "sequence number"], ["Time to live / hop limit / checksum / protocol", "TTL"]] },
      {
        q: "Explain why the packets may arrive in a different order and how the file is rebuilt.",
        m: 3,
        cmd: "Explain",
        kw: ["independently", "different routes", "congestion", "sequence numbers", "reassembled", "re-sent"],
        pts: [
          "Each packet is routed independently, so packets may take different routes depending on congestion",
          "So some packets arrive before others / out of order",
          "The receiver uses the sequence numbers to reassemble the packets in order (missing packets are requested again)",
        ],
      },
      { q: "Describe the role of routers in packet switching.", m: 2, cmd: "Describe", kw: ["destination IP", "routing table", "next hop", "forward"], pts: ["Routers read the destination IP address in each packet header", "And use their routing tables to forward the packet to the next hop on the best available route"] },
    ]
  ),
  // A2.3.4 (HL)
  mc(
    { ref: "A2.3.4", title: "A2.3 Static and dynamic routing", d: "Easy", cmd: "Identify" },
    "Answer each question about routing.",
    [
      { q: "In static routing, how are routes added to a routing table?", o: ["Routers exchange them automatically", "An administrator enters them manually", "Switches learn them from MAC addresses", "DHCP assigns them"], a: 1 },
      { q: "Which is an advantage of dynamic routing?", o: ["It adapts automatically when a link fails", "It uses no bandwidth at all", "It never needs to converge", "It cannot be changed"], a: 0 },
      { q: "Which network is best suited to static routing?", o: ["A large ISP backbone", "A network whose links change often", "A small office with a single connection to the internet", "A global multinational network"], a: 2 },
      { q: "In dynamic routing, what is convergence?", o: ["Two packets colliding", "Encrypting routing tables", "Combining two networks into one", "The point at which all routers have consistent routing information after a change"], a: 3 },
    ]
  ),
  th(
    { ref: "A2.3.4", title: "A2.3 Convergence in dynamic routing", d: "Moderate", cmd: "Describe" },
    "Describe what happens in a network that uses dynamic routing when a link between two routers fails.",
    {
      m: 3,
      kw: ["detect", "exchange", "routing protocol", "update tables", "new route", "convergence", "packets lost"],
      pts: [
        "The routers next to the failed link detect the failure",
        "Routers exchange updated routing information using the routing protocol and recalculate the best routes",
        "Until all routing tables agree (convergence), some packets may be delayed, lost or take poor routes; afterwards traffic uses the new route",
      ],
    }
  ),
  // A2.4.1
  mc(
    { ref: "A2.4.1", title: "A2.4 How firewalls filter traffic", d: "Easy", cmd: "Identify" },
    "Answer each question about firewalls.",
    [
      { q: "A rule that allows only traffic from a list of approved addresses is an example of...", o: ["a blacklist", "a whitelist", "encryption", "NAT"], a: 1 },
      { q: "Which information does a packet-filtering firewall examine?", o: ["Header details such as IP addresses, port numbers and protocol", "Only the user's password", "The colour depth of images", "The speed of the CPU"], a: 0 },
      { q: "Which threat can a firewall NOT stop on its own?", o: ["Traffic to a blocked port", "Traffic from a blacklisted address", "A user opening an infected email attachment that the firewall allowed through", "Unsolicited incoming connections"], a: 2 },
      { q: "How does NAT add to a network's security?", o: ["It encrypts all data", "It removes malware", "It replaces passwords", "It hides internal private addresses from the internet"], a: 3 },
    ]
  ),
  // A2.4.2 (HL)
  th(
    { ref: "A2.4.2", title: "A2.4 Man-in-the-middle on public Wi-Fi", d: "Moderate", cmd: "Explain" },
    "Explain how a man-in-the-middle (MitM) attack could be carried out against users of a café's public Wi-Fi.",
    {
      m: 3,
      kw: ["fake access point", "intercept", "relay", "read", "alter", "unencrypted", "credentials"],
      pts: [
        "The attacker sets up a fake access point with a similar name / positions themselves between the users and the router",
        "All traffic passes through the attacker's device, which relays it so the users do not notice",
        "The attacker can read or alter data that is not encrypted (e.g. passwords, session cookies) or use insecure protocols to steal credentials",
      ],
    }
  ),
  // A2.4.3 (HL)
  mu(
    { ref: "A2.4.3", title: "A2.4 Responding to a phishing attack", d: "Hard", cmd: "Explain" },
    "Several employees of an insurance company entered their passwords on a fake login page after receiving a phishing email. An attacker then accessed customer data.",
    [
      { q: "Describe how an email filtering solution reduces the risk of phishing.", m: 2, cmd: "Describe", kw: ["scans", "suspicious links", "known senders", "quarantine", "spam"], pts: ["Incoming emails are scanned for suspicious links, attachments, spoofed senders or known phishing patterns", "Suspicious emails are blocked, quarantined or marked as a warning before reaching users"] },
      { q: "Explain how multifactor authentication (MFA) would have limited the damage.", m: 2, cmd: "Explain", kw: ["second factor", "code", "phone", "password alone"], pts: ["MFA requires a second factor (e.g. a code on a phone, a fingerprint) as well as the password", "So the attacker could not log in with the stolen password alone"] },
      {
        q: "Explain why regular security testing and employee training are both needed.",
        m: 3,
        cmd: "Explain",
        kw: ["recognize", "phishing", "human", "penetration testing", "vulnerabilities", "before attackers"],
        pts: [
          "Training teaches staff to recognize phishing emails and report them, addressing the human weakness that technology cannot fully fix",
          "Security testing (e.g. penetration tests, simulated phishing) finds vulnerabilities before attackers do",
          "Threats change constantly, so both must be repeated regularly to stay effective",
        ],
      },
    ]
  ),
  // A2.4.4
  th(
    { ref: "A2.4.4", title: "A2.4 Encryption key management", d: "Moderate", cmd: "Explain" },
    "Explain the significance of encryption key management for an organization.",
    {
      m: 3,
      kw: ["private key", "stolen", "decrypt", "secure storage", "rotation", "revoke", "lost key"],
      pts: [
        "Encryption is only as secure as its keys: if a secret/private key is stolen, an attacker can decrypt data or impersonate the organization",
        "Keys must be generated, stored and distributed securely (e.g. access controls, hardware security modules) and changed (rotated) regularly",
        "Compromised keys/certificates must be revoked, and keys must be backed up because lost keys make encrypted data unreadable",
      ],
    }
  ),
];
// =====================================================================
// A3 Databases (A3.3 SQL items are kept in ibBankA34CS.ts)
// =====================================================================
const A3: IGCSETask[] = [
  // A3.2.1 schemas
  mu(
    { ref: "A3.2.1", title: "A3.2 Schemas for a hospital database", d: "Moderate", cmd: "Describe" },
    "A hospital is designing a new database for patients, wards and treatments.",
    [
      { q: "Describe the conceptual schema for this database.", m: 2, cmd: "Describe", kw: ["high-level", "entities", "relationships", "no technical detail", "users"], pts: ["A high-level view of the whole database: the entities (patient, ward, treatment) and the relationships between them", "It contains no implementation detail, so it can be discussed with hospital staff / non-technical users"] },
      { q: "Outline what the logical schema adds to the conceptual schema.", m: 2, cmd: "Outline", kw: ["tables", "attributes", "data types", "keys"], pts: ["The tables and their attributes/fields", "Data types, primary and foreign keys and constraints (independent of a particular DBMS's storage)"] },
      { q: "State one detail that is defined in the physical schema.", m: 1, cmd: "State", kw: ["storage", "files", "indexes", "disk"], pts: [["How/where data is stored: files, indexes, partitions or disk locations", "indexes", "file organization"]] },
    ]
  ),
  th(
    { ref: "A3.2.1", title: "A3.2 Why separate schema levels?", d: "Hard", cmd: "Explain" },
    "Explain how separating a database design into conceptual, logical and physical schemas benefits the developers and users of a database.",
    {
      m: 3,
      kw: ["data independence", "change storage", "applications unaffected", "communication", "abstraction"],
      pts: [
        "Each level hides detail from the level above (abstraction), so each group works with the level it needs",
        "Physical changes (e.g. new indexes or storage devices) can be made without changing the logical design or applications (physical data independence)",
        "The conceptual schema can be agreed with non-technical users before technical decisions are made, reducing design errors",
      ],
    }
  ),
  // A3.2.2 ERDs
  ins(
    { ref: "A3.2.2", title: "A3.2 Identifying cardinality", d: "Moderate", cmd: "Identify" },
    "For each business rule, identify the cardinality of the relationship. Answer one-to-one, one-to-many or many-to-many.",
    [
      { q: "A patient can book many appointments; each appointment is for one patient.", a: ["one-to-many", "1:M", "1:N", "one to many"] },
      { q: "A student can take many courses, and each course has many students.", a: ["many-to-many", "M:N", "M:M", "many to many"] },
      { q: "Each country has exactly one capital city, and each capital city belongs to one country.", a: ["one-to-one", "1:1", "one to one"] },
      { q: "A library member can borrow many books at once; each book is on loan to at most one member.", a: ["one-to-many", "1:M", "1:N", "one to many"] },
    ]
  ),
  // A3.2.3 data types
  th(
    { ref: "A3.2.3", title: "A3.2 Data type consistency", d: "Easy", cmd: "Outline" },
    "Outline why data type consistency is important in a relational database.",
    {
      m: 2,
      kw: ["same type", "comparisons", "calculations", "joins", "validation", "errors"],
      pts: [
        "Values in a field (and matching primary/foreign keys) must have the same data type so that comparisons, joins and sorting work correctly",
        "It allows the DBMS to validate input and perform calculations, preventing invalid data and errors",
      ],
    }
  ),
  mu(
    { ref: "A3.2.3", title: "A3.2 Data types for an online shop", d: "Moderate", cmd: "Explain" },
    "An online shop's Product table has the fields ProductID, Name, Price, StockLevel, DateAdded and OnSale.",
    [
      { q: "State a suitable data type for Price.", m: 1, cmd: "State", kw: ["DECIMAL", "NUMERIC", "currency"], pts: [["DECIMAL / NUMERIC (fixed-point)", "decimal", "currency", "numeric"]], notes: ["Accept FLOAT/REAL only with a comment about rounding; do not accept INTEGER or VARCHAR."] },
      { q: "State a suitable data type for OnSale.", m: 1, cmd: "State", kw: ["BOOLEAN"], pts: [["BOOLEAN", "bit", "true/false"]] },
      {
        q: "The developer stored DateAdded as VARCHAR. Explain two problems this could cause.",
        m: 4,
        cmd: "Explain",
        kw: ["sorting", "text order", "invalid dates", "formats", "date calculations"],
        pts: [
          "Dates would be sorted/compared as text, not in date order",
          "e.g. '10/02/2025' would come before '9/01/2025', so queries such as 'added since' give wrong results",
          "Invalid or inconsistent values (e.g. '31/02/2025', different formats) could be stored",
          "Date functions/calculations (e.g. days since added) cannot be used directly",
        ],
      },
    ]
  ),
  // A3.2.4 tables
  mc(
    { ref: "A3.2.4", title: "A3.2 Keys in table design", d: "Easy", cmd: "Identify" },
    "Answer each question about keys in relational tables.",
    [
      { q: "Which key uniquely identifies each record in a table?", o: ["Foreign key", "Primary key", "Secondary key", "Sort key"], a: 1 },
      { q: "Which key links a record to a record in another table?", o: ["Foreign key", "Primary key", "Candidate key that is not used", "Index key"], a: 0 },
      { q: "A primary key made from two or more fields is called...", o: ["a foreign key", "an index", "a composite (concatenated) key", "a surrogate key"], a: 2 },
      { q: "Which rule does referential integrity enforce?", o: ["Every field must be text", "Every table must have at least ten records", "Primary keys may be left empty", "A foreign key value must match an existing primary key value (or be null)"], a: 3 },
    ]
  ),
  mu(
    { ref: "A3.2.4", title: "A3.2 Tables for school clubs", d: "Hard", cmd: "Construct" },
    "A school wants a database to record which students belong to which clubs and the date each student joined each club. A student can join many clubs and a club has many students. Each club is run by one teacher.",
    [
      {
        q: "Construct the tables needed, showing the fields in each and identifying all primary and foreign keys.",
        m: 4,
        cmd: "Construct",
        kw: ["Student", "Club", "Membership", "StudentID", "ClubID", "composite key", "JoinDate"],
        pts: [
          "Student(StudentID [PK], name and other student details)",
          "Club(ClubID [PK], ClubName, Teacher)",
          "A link table e.g. Membership(StudentID, ClubID, JoinDate) to resolve the many-to-many relationship",
          "StudentID and ClubID are foreign keys in the link table and together form its composite primary key",
        ],
        notes: ["Accept any sensible table and field names. JoinDate must be in the link table for the final mark point."],
      },
      { q: "Explain how the foreign keys in your design help to maintain data integrity.", m: 2, cmd: "Explain", kw: ["must exist", "referential integrity", "orphan", "delete"], pts: ["A membership record cannot refer to a student or club that does not exist (referential integrity)", "So orphan records are prevented / deleting a club with members is blocked or cascaded"] },
    ]
  ),
  // A3.2.6 normalization
  mc(
    { ref: "A3.2.6", title: "A3.2 Steps towards 3NF", d: "Easy", cmd: "Identify" },
    "A library stores loans in one table: Loan(MemberID, MemberName, BookID, Title, Author, LoanDate). Answer each question about normalizing it.",
    [
      { q: "The original table stores several BookIDs in one cell for each member. Which normal form does this break?", o: ["1NF", "2NF", "3NF", "None"], a: 0 },
      { q: "With the composite key (MemberID, BookID, LoanDate), Title depends only on BookID. What type of dependency is this?", o: ["Transitive dependency", "Partial-key dependency", "Multi-valued dependency", "Full functional dependency"], a: 1 },
      { q: "Which table is created to remove the dependency in the previous question?", o: ["Member(MemberID, MemberName)", "Loan(LoanDate)", "Book(BookID, Title, Author)", "Author(Title)"], a: 2 },
      { q: "In 3NF, which statement is true?", o: ["Every field depends on another non-key field", "All data is in one table", "Composite keys are not allowed", "Every non-key field depends on the key, the whole key and nothing but the key"], a: 3 },
    ]
  ),
  // A3.2.7 denormalization
  mc(
    { ref: "A3.2.7", title: "A3.2 Normalized or denormalized?", d: "Easy", cmd: "Identify" },
    "Answer each question about normalizing and denormalizing databases.",
    [
      { q: "What is denormalization?", o: ["Deleting all keys", "Deliberately adding some redundancy (e.g. combining tables) to speed up reads", "Converting a database to 1NF", "Encrypting the database"], a: 1 },
      { q: "In which type of system is denormalization most likely to help?", o: ["A read-intensive reporting system", "A system with constant updates to every record", "A system with no queries", "A spreadsheet"], a: 0 },
      { q: "Which is a disadvantage of denormalization?", o: ["Queries need more joins", "Reads become slower", "The same data is stored in several places and may become inconsistent", "Tables can no longer have keys"], a: 2 },
      { q: "Which is an advantage of a fully normalized database?", o: ["Fewer tables", "Faster reporting queries", "No need for keys", "Less redundancy, so updates happen in one place"], a: 3 },
    ]
  ),
  th(
    { ref: "A3.2.7", title: "A3.2 Risks of denormalizing", d: "Moderate", cmd: "Explain" },
    "Explain two disadvantages of denormalizing a database that is updated frequently.",
    {
      m: 4,
      kw: ["redundancy", "update anomalies", "inconsistent", "more storage", "slower writes", "complex"],
      pts: [
        "Data is duplicated (redundancy)",
        "So an update must change every copy; if one is missed the data becomes inconsistent (update anomalies)",
        "Writes/inserts are slower and more complex",
        "Because extra copies and summary fields must be maintained, and more storage is used",
      ],
      notes: ["Award [1] for each disadvantage and [1] for its explanation."],
    }
  ),
  // A3.4.1 database types (HL)
  th(
    { ref: "A3.4.1", title: "A3.4 Cloud databases for a SaaS provider", d: "Moderate", cmd: "Outline" },
    "Outline two reasons why a software-as-a-service company would use a cloud database.",
    {
      m: 2,
      kw: ["scalable", "managed", "no hardware", "pay as you go", "available", "backups"],
      pts: ["It scales up or down with demand / pay only for what is used", "The provider manages hardware, backups, updates and high availability, reducing the company's administration", "Customers worldwide can access it with low latency from different regions"],
    }
  ),
  mu(
    { ref: "A3.4.1", title: "A3.4 Matching databases to applications", d: "Hard", cmd: "Explain" },
    "A city council runs several systems: a map of street lights and bus stops, a live dashboard of traffic sensors and a citizens' social media feed.",
    [
      { q: "Outline why a spatial database suits the map of street lights and bus stops.", m: 2, cmd: "Outline", kw: ["coordinates", "geometry", "spatial queries", "distance", "GIS"], pts: ["It stores locations and shapes (points, lines, polygons) as spatial data types", "And supports spatial queries such as 'all bus stops within 500 m' / works with GIS"] },
      { q: "Outline why an in-memory database suits the live traffic dashboard.", m: 2, cmd: "Outline", kw: ["RAM", "very fast", "real-time", "low latency"], pts: ["Data is held in RAM rather than on disk, so reads and writes are very fast", "This allows real-time analytics of constantly arriving sensor data"] },
      {
        q: "Explain why a NoSQL database may be more suitable than a relational database for the social media feed.",
        m: 3,
        cmd: "Explain",
        kw: ["unstructured", "flexible schema", "huge volume", "horizontal scaling", "documents"],
        pts: [
          "Posts contain varied/unstructured data (text, images, comments, likes), which suits a flexible schema / document store",
          "Very large volumes of data and users require horizontal scaling across many servers, which NoSQL supports well",
          "Strict relational consistency and complex joins are less important than speed and availability",
        ],
      },
    ]
  ),
  // A3.4.2 data warehouses (HL)
  mc(
    { ref: "A3.4.2", title: "A3.4 Data warehouse characteristics", d: "Easy", cmd: "Identify" },
    "Answer each question about data warehouses.",
    [
      { q: "What is the main purpose of a data warehouse?", o: ["Processing day-to-day transactions such as sales at the till", "Storing integrated historical data for analysis and business intelligence", "Replacing backups", "Running the operating system"], a: 1 },
      { q: "'Non-volatile' means that data in a data warehouse...", o: ["is not normally changed or deleted once loaded", "is lost when the power is off", "is updated every second", "is encrypted"], a: 0 },
      { q: "'Time-variant' means that the data...", o: ["is deleted after one day", "is stored only in RAM", "is recorded with time periods so that trends over time can be analysed", "changes its data type"], a: 2 },
      { q: "'Subject-oriented' means that data is organized around...", o: ["individual application programs", "the physical disks used", "the users' passwords", "key business subjects such as customers, products or sales"], a: 3 },
    ]
  ),
  tab(
    { ref: "A3.4.2", title: "A3.4 Data warehouse terms", d: "Moderate", cmd: "Identify" },
    "For each description, select the data warehouse characteristic it describes.",
    [given("Description"), pick("Characteristic", ["Subject-oriented", "Integrated", "Time-variant", "Non-volatile", "Append-only", "Optimized for query performance"])],
    [
      ["=Data from the tills, website and loyalty scheme is converted to consistent formats and combined", "Integrated"],
      ["=New data is added in batches; existing records are not overwritten", "Append-only"],
      ["=Sales figures are kept for each week of the last ten years", "Time-variant"],
      ["=Data is organized around customers, products and stores rather than around the till software", "Subject-oriented"],
      ["=Tables are denormalized and pre-aggregated so that large analytical queries run quickly", "Optimized for query performance"],
      ["=Once loaded, records are read but not edited by users", "Non-volatile"],
    ],
    6
  ),
  mu(
    { ref: "A3.4.2", title: "A3.4 A data warehouse for a supermarket chain", d: "Hard", cmd: "Explain" },
    "A supermarket chain with 300 stores wants to analyse ten years of sales, stock and loyalty-card data to plan promotions.",
    [
      { q: "Distinguish between the chain's operational database and a data warehouse.", m: 2, cmd: "Distinguish", kw: ["day-to-day", "current", "transactions", "historical", "analysis", "read-mostly"], pts: ["The operational database handles current, day-to-day transactions (sales, stock updates) and is constantly updated", "The data warehouse stores integrated historical data from many sources, used read-mostly for analysis and reporting"] },
      {
        q: "Explain why the data in the warehouse must be integrated and time-variant for this analysis.",
        m: 4,
        cmd: "Explain",
        kw: ["different sources", "consistent", "formats", "compare", "trends", "periods"],
        pts: [
          "Data comes from different systems (tills, stock, loyalty scheme) with different formats/codes",
          "Integrating it into consistent formats means products and customers can be matched and compared across sources",
          "Time-variant data records the period each value belongs to",
          "So trends and seasonal patterns over the ten years can be analysed to plan promotions",
        ],
      },
    ]
  ),
  // A3.4.3 OLAP and data mining (HL)
  mc(
    { ref: "A3.4.3", title: "A3.4 Choosing a data mining technique", d: "Easy", cmd: "Identify" },
    "Identify the data mining technique that is most suitable for each task.",
    [
      { q: "Finding that customers who buy pasta often also buy pasta sauce", o: ["Regression", "Association rule discovery", "Anomaly detection", "Classification"], a: 1 },
      { q: "Flagging a credit card payment that is very unusual for the customer", o: ["Anomaly detection", "Clustering", "Regression", "Sequential pattern discovery"], a: 0 },
      { q: "Grouping customers into segments with similar shopping habits, without predefined labels", o: ["Classification", "Regression", "Clustering", "Association rule discovery"], a: 2 },
      { q: "Predicting next month's sales value from past sales", o: ["Clustering", "Anomaly detection", "Association rule discovery", "Regression"], a: 3 },
    ]
  ),
  mu(
    { ref: "A3.4.3", title: "A3.4 OLAP at a clothing retailer", d: "Hard", cmd: "Explain" },
    "A clothing retailer uses online analytical processing (OLAP) on its data warehouse. Managers view sales by product, store and month.",
    [
      { q: "Describe how a manager could use the OLAP operations drill-down and slice.", m: 2, cmd: "Describe", kw: ["more detail", "year to month", "single value", "one dimension fixed"], pts: ["Drill-down: move from summary data to more detail, e.g. from yearly sales to monthly or daily sales", "Slice: fix one dimension to a single value, e.g. view sales for only one store"] },
      {
        q: "Explain how sequential pattern discovery could help the retailer.",
        m: 2,
        cmd: "Explain",
        kw: ["order", "over time", "next purchase", "recommend", "marketing"],
        pts: ["It finds common sequences of events over time, e.g. customers who buy a winter coat often buy boots within a month", "So the retailer can time recommendations/promotions for the likely next purchase"],
      },
      { q: "Explain one way in which OLAP and data mining together support business intelligence.", m: 2, cmd: "Explain", kw: ["patterns", "decisions", "summaries", "evidence"], pts: ["Data mining discovers hidden patterns/predictions in large data sets, which OLAP lets managers explore and verify from different viewpoints", "So decisions (e.g. stock levels, promotions) are based on evidence rather than guesswork"] },
    ]
  ),
  // A3.4.4 distributed databases (HL)
  mc(
    { ref: "A3.4.4", title: "A3.4 Distributed database features", d: "Easy", cmd: "Identify" },
    "Answer each question about distributed databases.",
    [
      { q: "Storing copies of the same data at several sites is called...", o: ["partitioning", "replication", "normalization", "indexing"], a: 1 },
      { q: "Users can query the data without knowing which site holds it. This is...", o: ["location transparency", "fault tolerance", "concurrency control", "data mining"], a: 0 },
      { q: "Splitting a table so that different rows are stored at different sites is...", o: ["replication", "encryption", "data partitioning (fragmentation)", "a view"], a: 2 },
      { q: "Why is concurrency control needed in a distributed database?", o: ["To compress data", "To speed up the network", "To allow more users", "To stop simultaneous transactions at different sites from producing inconsistent data"], a: 3 },
    ]
  ),
  th(
    { ref: "A3.4.4", title: "A3.4 Replication and consistency", d: "Moderate", cmd: "Explain" },
    "An airline stores its booking database at sites on three continents, with replicated copies of the data. Explain how replication improves fault tolerance and why it makes consistency harder to maintain.",
    {
      m: 4,
      kw: ["copies", "site fails", "continue", "update all copies", "conflict", "double booking", "two-phase commit"],
      pts: [
        "If one site or link fails, the other sites still hold copies and can continue processing bookings (fault tolerance)",
        "Users can also be served by a nearby copy, improving performance",
        "Every update must be applied to all copies; until then sites may hold different values",
        "Two sites could sell the same seat at the same time, so distributed concurrency control/ACID transactions (e.g. two-phase commit) are needed",
      ],
    }
  ),
];
// =====================================================================
// A4 Machine learning
// =====================================================================
const A4: IGCSETask[] = [
  // A4.2.2 feature selection (HL)
  tab(
    { ref: "A4.2.2", title: "A4.2 Feature selection strategies", d: "Moderate", cmd: "Identify" },
    "For each description, select the feature selection strategy being used.",
    [given("Description"), pick("Strategy", ["Filter", "Wrapper", "Embedded"])],
    [
      ["=Features are ranked by their correlation with the target before any model is trained", "Filter"],
      ["=A model is trained repeatedly on different subsets of features, keeping the subset that performs best", "Wrapper"],
      ["=The learning algorithm itself reduces the weight of unhelpful features to zero while it trains", "Embedded"],
      ["=Features with almost the same value in every record are removed using a statistical test", "Filter"],
    ],
    4
  ),
  th(
    { ref: "A4.2.2", title: "A4.2 Why select features?", d: "Moderate", cmd: "Explain" },
    "A bank's loan-approval data set has 150 attributes per applicant. Explain why feature selection should be carried out before training a model.",
    {
      m: 3,
      kw: ["informative", "irrelevant", "noise", "overfitting", "faster", "interpretable"],
      pts: [
        "It keeps only the most informative attributes and removes irrelevant or redundant ones (noise)",
        "This reduces overfitting, so the model generalizes better to new applicants",
        "Training is faster and needs less memory, and the model is easier to interpret/explain (e.g. why a loan was refused)",
      ],
    }
  ),
  // A4.2.3 dimensionality reduction (HL)
  mc(
    { ref: "A4.2.3", title: "A4.2 The curse of dimensionality", d: "Easy", cmd: "Identify" },
    "Answer each question about dimensionality.",
    [
      { q: "What is the 'curse of dimensionality'?", o: ["Data sets with too few attributes", "Problems that grow as the number of features (dimensions) increases", "A virus that affects data", "Data stored in too many tables"], a: 1 },
      { q: "As the number of features rises with a fixed number of samples, the data becomes...", o: ["sparse", "denser", "smaller", "fully labelled"], a: 0 },
      { q: "Which problem is made worse by having many features and few samples?", o: ["Underfitting", "Encryption", "Overfitting", "Faster training"], a: 2 },
      { q: "Which is a benefit of reducing dimensionality?", o: ["More memory is used", "Every feature is kept", "Data can no longer be visualized", "Models train faster and data can be visualized more easily"], a: 3 },
    ]
  ),
  th(
    { ref: "A4.2.3", title: "A4.2 Distances in high dimensions", d: "Moderate", cmd: "Explain" },
    "Explain why distance-based algorithms such as K-nearest neighbours become less effective when the data has a very large number of features.",
    {
      m: 3,
      kw: ["sparse", "distances similar", "nearest not meaningful", "noise", "more samples"],
      pts: [
        "In high-dimensional space the data points become sparse / far apart",
        "Distances between points become very similar, so the 'nearest' neighbours are not much nearer than other points",
        "Irrelevant features add noise to the distance, so similarity is measured poorly and far more samples would be needed",
      ],
    }
  ),
  mu(
    { ref: "A4.2.3", title: "A4.2 Reducing dimensions in medical data", d: "Hard", cmd: "Describe" },
    "A research team has 20 000 gene measurements for each of 300 patients and wants to predict which patients will respond to a drug.",
    [
      { q: "Outline why this data set suffers from the curse of dimensionality.", m: 2, cmd: "Outline", kw: ["far more features", "few samples", "sparse"], pts: ["There are far more features (20 000) than samples (300)", "So the data is very sparse and there are too few examples to learn reliable patterns"] },
      {
        q: "Describe two problems that the large number of features would cause when training a model.",
        m: 4,
        cmd: "Describe",
        kw: ["overfitting", "noise", "computational", "memory", "time", "visualization"],
        pts: [
          "Overfitting: the model can fit noise in the training data",
          "So it performs badly on new patients",
          "High computational cost: training needs much more time and memory",
          "And the data cannot easily be visualized/interpreted by the researchers",
        ],
      },
      { q: "Describe how dimensionality reduction helps while keeping the relevant information.", m: 2, cmd: "Describe", kw: ["fewer variables", "combine", "remove", "preserve", "important patterns"], pts: ["It reduces the number of variables, by removing or combining features", "While preserving the variation/patterns that matter for predicting the drug response"] },
    ]
  ),
  // A4.3.1 linear regression (HL)
  mc(
    { ref: "A4.3.1", title: "A4.3 Linear regression basics", d: "Easy", cmd: "Identify" },
    "Answer each question about linear regression.",
    [
      { q: "What type of outcome does linear regression predict?", o: ["A category such as 'spam' or 'not spam'", "A continuous numerical value", "A cluster number", "An association rule"], a: 1 },
      { q: "In y = mx + c, which value is the slope?", o: ["m", "c", "x", "y"], a: 0 },
      { q: "What does the intercept c represent?", o: ["The change in y for each unit of x", "The number of data points", "The predicted value of y when x is 0", "The error of the model"], a: 2 },
      { q: "An r2 value of 0.95 means that...", o: ["the model is 95% accurate on every prediction", "95% of the predictions are wrong", "the slope is 0.95", "95% of the variation in y is explained by the model"], a: 3 },
    ]
  ),
  mu(
    { ref: "A4.3.1", title: "A4.3 Predicting flat prices", d: "Hard", cmd: "Explain" },
    "An estate agent trains a linear regression model on recent sales. The model is: price = 1500 x floor area (m2) + 40 000. Its r2 value is 0.82.",
    [
      { q: "Identify the independent variable and the dependent variable.", m: 2, cmd: "Identify", kw: ["floor area", "price"], pts: [["Independent (predictor): floor area", "floor area"], ["Dependent (response): price", "price"]] },
      { q: "Calculate the predicted price of a flat with a floor area of 80 m2.", m: 1, cmd: "Calculate", kw: ["160000"], pts: [["160 000", "160000", "160,000"]] },
      { q: "Explain the meaning of the slope and the intercept in this model.", m: 2, cmd: "Explain", kw: ["each extra square metre", "1500", "base", "40000"], pts: ["Slope: the price is predicted to rise by 1500 for each extra square metre", "Intercept: 40 000 is the predicted price when the area is 0 (a baseline, not meaningful on its own)"] },
      { q: "Explain what the r2 value of 0.82 shows about the model.", m: 2, cmd: "Explain", kw: ["82%", "variation", "good fit", "other factors"], pts: ["About 82% of the variation in price is explained by floor area, so the line fits the data well", "The remaining 18% is due to other factors (e.g. location, condition) not in the model"] },
    ]
  ),
  // A4.3.2 classification (HL)
  mc(
    { ref: "A4.3.2", title: "A4.3 K-NN and decision trees", d: "Easy", cmd: "Identify" },
    "Answer each question about classification algorithms.",
    [
      { q: "How does K-nearest neighbours classify a new data point?", o: ["It fits a straight line", "It takes a majority vote of the K closest labelled points", "It splits the data into K clusters", "It uses a fitness function"], a: 1 },
      { q: "In a decision tree, what does each internal node represent?", o: ["A test on a feature", "A final class label", "A cluster centre", "A reward"], a: 0 },
      { q: "Why is K often chosen to be an odd number for two-class problems?", o: ["Odd numbers are faster to compute", "It removes the need for training data", "It avoids tied votes", "It makes the tree deeper"], a: 2 },
      { q: "Which is a typical application of a decision tree?", o: ["Predicting tomorrow's exact temperature", "Grouping unlabelled photos", "Finding items bought together", "Suggesting a diagnosis from a patient's symptoms"], a: 3 },
    ]
  ),
  // A4.3.3 hyperparameters and metrics (HL)
  mc(
    { ref: "A4.3.3", title: "A4.3 Evaluation metrics and tuning", d: "Easy", cmd: "Identify" },
    "Answer each question about evaluating supervised learning models.",
    [
      { q: "Which metric is the proportion of predicted positives that are actually positive?", o: ["Recall", "Precision", "Accuracy", "F1 score"], a: 1 },
      { q: "Which metric is the proportion of actual positives that the model finds?", o: ["Recall", "Precision", "Accuracy", "Learning rate"], a: 0 },
      { q: "Which is an example of a hyperparameter?", o: ["A weight learned during training", "The predicted class", "The value of K in K-NN", "The number of records in the data set"], a: 2 },
      { q: "A model scores 99% on the training data but 70% on new data. This is...", o: ["underfitting", "a perfect model", "good generalization", "overfitting"], a: 3 },
    ]
  ),
  // A4.3.4 clustering (HL)
  mc(
    { ref: "A4.3.4", title: "A4.3 Clustering concepts", d: "Easy", cmd: "Identify" },
    "Answer each question about clustering.",
    [
      { q: "Clustering is an example of which type of learning?", o: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Transfer learning"], a: 1 },
      { q: "In k-means clustering, what is a centroid?", o: ["The centre (mean position) of a cluster", "The furthest point from a cluster", "A labelled training example", "The number of clusters"], a: 0 },
      { q: "On what basis are data points grouped?", o: ["Their labels", "Their order in the file", "The similarity of their features", "A reward signal"], a: 2 },
      { q: "Which is a typical application of clustering?", o: ["Predicting a house price", "Labelling emails using known examples", "Translating text", "Segmenting customers by purchasing behaviour"], a: 3 },
    ]
  ),
  ins(
    { ref: "A4.3.4", title: "A4.3 Assigning points to centroids", d: "Moderate", cmd: "Calculate" },
    "A k-means algorithm (k = 2) has centroids C1 at (2, 2) and C2 at (8, 8). Using straight-line (Euclidean) distance, state the centroid each point is assigned to. Answer C1 or C2.",
    [
      { q: "(1, 3)", a: ["C1"], why: "Distance to C1 is about 1.4; to C2 about 8.6." },
      { q: "(7, 9)", a: ["C2"], why: "Distance to C2 is about 1.4." },
      { q: "(5, 4)", a: ["C1"], why: "Distance to C1 is about 3.6; to C2 it is 5." },
      { q: "(6, 6)", a: ["C2"], why: "Distance to C2 is about 2.8; to C1 about 5.7." },
    ]
  ),
  mu(
    { ref: "A4.3.4", title: "A4.3 Segmenting gym members", d: "Hard", cmd: "Describe" },
    "A chain of gyms has data on each member's age, visits per week, average session length and classes attended. It wants to group members to design targeted offers, but has no predefined groups.",
    [
      {
        q: "Describe how the k-means algorithm would group the members.",
        m: 3,
        cmd: "Describe",
        kw: ["choose k", "initial centroids", "nearest", "recalculate", "repeat", "no change"],
        pts: [
          "Choose k and place k initial centroids (e.g. at random members)",
          "Assign each member to the nearest centroid based on their features",
          "Recalculate each centroid as the mean of its members and repeat until the assignments stop changing",
        ],
      },
      { q: "Explain why the features should be scaled before clustering.", m: 2, cmd: "Explain", kw: ["different ranges", "age", "dominate", "distance"], pts: ["Features have different ranges (e.g. age up to 80 versus visits up to 7)", "Without scaling, features with large ranges dominate the distance calculation"] },
      { q: "Outline how the gym could use the resulting clusters.", m: 2, cmd: "Outline", kw: ["targeted offers", "profile", "marketing", "retention"], pts: ["Interpret each cluster's typical profile (e.g. frequent early-morning users, occasional class-goers)", "Design targeted offers/timetables for each group to improve retention"] },
    ]
  ),
  // A4.3.5 association rules (HL)
  mc(
    { ref: "A4.3.5", title: "A4.3 Association rule terms", d: "Easy", cmd: "Identify" },
    "Answer each question about association rule learning.",
    [
      { q: "What does the support of an item set measure?", o: ["How often the rule is correct", "How often the item set appears in all transactions", "How many items are in a shop", "The price of the items"], a: 1 },
      { q: "For the rule {bread} -> {butter}, confidence measures...", o: ["the proportion of transactions with bread that also contain butter", "the number of shops", "the proportion of all transactions with butter", "how expensive butter is"], a: 0 },
      { q: "A lift greater than 1 suggests that...", o: ["the items are bought together less often than by chance", "the items are unrelated", "the items are bought together more often than expected by chance", "the rule is invalid"], a: 2 },
      { q: "Association rules are used in which application?", o: ["Predicting a continuous value", "Labelling images of animals", "Training a robot by reward", "Market basket analysis"], a: 3 },
    ]
  ),
  th(
    { ref: "A4.3.5", title: "A4.3 What an association rule shows", d: "Easy", cmd: "Outline" },
    "A police force finds the rule {vandalism} -> {theft} in its incident data. Outline what this rule shows and one way the police could use it.",
    {
      m: 2,
      kw: ["areas", "vandalism", "also", "theft", "patrols", "resources"],
      pts: ["Areas that have incidents of vandalism also often have incidents of theft (the two co-occur)", "The police could send extra patrols/resources to areas with rising vandalism to prevent theft (predictive policing)"],
    }
  ),
  // A4.3.6 reinforcement learning (HL)
  th(
    { ref: "A4.3.6", title: "A4.3 Cumulative reward", d: "Moderate", cmd: "Explain" },
    "Explain why a reinforcement learning agent aims to maximize cumulative reward rather than the reward from each single action.",
    {
      m: 2,
      kw: ["long term", "sequence", "short-term loss", "later reward", "goal"],
      pts: ["Good outcomes often come from a sequence of actions, so the total (long-term) reward reflects the real goal", "An action with a small or negative immediate reward may lead to much larger rewards later (e.g. a sacrifice in a game)"],
    }
  ),
  mu(
    { ref: "A4.3.6", title: "A4.3 A robot vacuum that learns", d: "Hard", cmd: "Describe" },
    "A robot vacuum cleaner uses reinforcement learning to learn an efficient way to clean a home.",
    [
      { q: "Identify the agent and two actions it can take.", m: 2, cmd: "Identify", kw: ["robot", "move forward", "turn", "dock", "suction"], pts: [["Agent: the robot vacuum (its controller)", "robot"], ["Two actions such as move forward, turn left/right, return to the dock, change suction", "turn"]] },
      {
        q: "Describe how the robot learns a good policy from rewards.",
        m: 3,
        cmd: "Describe",
        kw: ["state", "action", "reward", "collision", "dirt", "policy", "trial and error"],
        pts: [
          "In each state (position, battery, sensor readings) it chooses an action and observes the new state and a reward",
          "e.g. a positive reward for collecting dirt, negative rewards for collisions or a flat battery",
          "Over many trials it updates its policy (state to action mapping) to choose actions that maximize cumulative reward",
        ],
      },
      { q: "Explain the exploration versus exploitation trade-off for the robot.", m: 2, cmd: "Explain", kw: ["try new routes", "best known", "balance", "miss better"], pts: ["Exploration: trying new actions/routes that might be better; exploitation: using the best route found so far", "Too little exploration may miss a better route; too much wastes time and battery, so they must be balanced"] },
    ]
  ),
  // A4.3.7 genetic algorithms (HL)
  mc(
    { ref: "A4.3.7", title: "A4.3 Genetic algorithm terms", d: "Easy", cmd: "Identify" },
    "Answer each question about genetic algorithms.",
    [
      { q: "What does the fitness function do?", o: ["Randomly changes a gene", "Measures how good each candidate solution is", "Joins two parents", "Stops the computer"], a: 1 },
      { q: "Which step combines parts of two parent solutions to make offspring?", o: ["Crossover", "Mutation", "Selection", "Termination"], a: 0 },
      { q: "Why is mutation used?", o: ["To remove the weakest solutions", "To end the algorithm", "To keep diversity in the population and explore new solutions", "To calculate fitness"], a: 2 },
      { q: "Which is a common termination condition?", o: ["The first solution is created", "A mutation occurs", "Two parents are selected", "A set number of generations is reached or fitness stops improving"], a: 3 },
    ]
  ),
  ins(
    { ref: "A4.3.7", title: "A4.3 Crossover and mutation by hand", d: "Moderate", cmd: "Calculate" },
    "Candidate solutions are 5-bit strings, and fitness is the number of 1s. Parent A is 10110 and parent B is 01011. Single-point crossover is carried out after the second bit.",
    [
      { q: "Give the first child (start of A + end of B).", a: ["10011"] },
      { q: "Give the second child (start of B + end of A).", a: ["01110"] },
      { q: "The fourth bit of the first child is mutated (flipped). Give the result.", a: ["10001"] },
      { q: "State the fitness of the mutated child.", a: ["2"] },
    ]
  ),
  th(
    { ref: "A4.3.7", title: "A4.3 A genetic algorithm for exam timetabling", d: "Hard", cmd: "Explain" },
    "Explain how a genetic algorithm could be used to produce an exam timetable with as few clashes as possible.",
    {
      m: 4,
      kw: ["population", "timetables", "fitness", "clashes", "selection", "crossover", "mutation", "generations"],
      pts: [
        "Create an initial population of random timetables (each exam given a slot and room)",
        "A fitness function scores each timetable, e.g. fewer student clashes and room conflicts gives higher fitness",
        "The fittest timetables are selected as parents and combined by crossover to form new timetables",
        "Mutation randomly moves some exams to other slots to keep diversity",
        "This repeats for many generations until a timetable with no/few clashes is found or a generation limit is reached",
      ],
    }
  ),
  // A4.3.8 ANNs (HL)
  mc(
    { ref: "A4.3.8", title: "A4.3 Parts of a neural network", d: "Easy", cmd: "Identify" },
    "Answer each question about artificial neural networks (ANNs).",
    [
      { q: "In a perceptron, what multiplies each input before the inputs are added?", o: ["The bias", "A weight", "The activation function", "The output"], a: 1 },
      { q: "Which layers lie between the input layer and the output layer of a multi-layer perceptron?", o: ["Hidden layers", "Pooling layers only", "Data layers", "Bias layers"], a: 0 },
      { q: "What is the purpose of the activation function?", o: ["To store the training data", "To choose the learning rate", "To decide the neuron's output from the weighted sum, adding non-linearity", "To delete neurons"], a: 2 },
      { q: "What is adjusted during training?", o: ["The number of inputs", "The training data", "The output labels", "The weights and biases"], a: 3 },
    ]
  ),
  mu(
    { ref: "A4.3.8", title: "A4.3 Perceptron and multi-layer networks", d: "Hard", cmd: "Outline" },
    "A perceptron decides whether to switch on a garden sprinkler. It has three inputs: x1 (soil is dry), x2 (rain forecast) and x3 (it is evening), each 0 or 1.",
    [
      { q: "Outline the structure of a single perceptron.", m: 3, cmd: "Outline", kw: ["inputs", "weights", "weighted sum", "bias", "activation function", "output"], pts: ["Inputs, each multiplied by a weight", "The weighted inputs are summed and a bias is added", "An activation function (e.g. step) converts the sum into the output"] },
      {
        q: "The weights are 0.5, -0.4 and 0.3 and the bias is -0.6. The step activation outputs 1 if the sum is 0 or more, otherwise 0. Calculate the output when x1 = 1, x2 = 0 and x3 = 1. Show your working.",
        m: 2,
        cmd: "Calculate",
        kw: ["0.2", "1"],
        pts: ["Sum = 0.5 + 0 + 0.3 - 0.6 = 0.2", ["Output = 1 (sprinkler on)", "1"]],
      },
      { q: "Explain why a multi-layer perceptron can model patterns that a single perceptron cannot.", m: 2, cmd: "Explain", kw: ["hidden layers", "non-linear", "combine", "XOR", "complex"], pts: ["A single perceptron can only separate data with a straight line (linear), e.g. it cannot learn XOR", "Hidden layers with non-linear activations combine simple features into more complex ones, so non-linear patterns can be modelled"] },
    ]
  ),
  // A4.3.9 CNNs (HL)
  th(
    { ref: "A4.3.9", title: "A4.3 Kernel size and stride", d: "Moderate", cmd: "Explain" },
    "Explain how the kernel size and the stride of a convolutional layer affect how a CNN processes an image.",
    {
      m: 3,
      kw: ["kernel", "area", "larger features", "stride", "step", "smaller feature map", "computation"],
      pts: [
        "The kernel size sets the area of the image examined at once: small kernels detect fine detail, larger kernels capture larger features",
        "The stride is how far the kernel moves each step; a larger stride gives a smaller feature map",
        "A larger stride/fewer positions reduces computation but may lose detail",
      ],
    }
  ),
  // A4.3.10 model selection (HL)
  mc(
    { ref: "A4.3.10", title: "A4.3 Choosing a model", d: "Easy", cmd: "Identify" },
    "Identify the most suitable type of model for each problem.",
    [
      { q: "Predicting the number of visitors to a museum tomorrow", o: ["Clustering", "Regression", "Association rules", "Genetic algorithm"], a: 1 },
      { q: "Recognizing animals in thousands of photographs", o: ["Convolutional neural network", "Linear regression", "Association rules", "K-means"], a: 0 },
      { q: "Grouping news articles by topic when there are no labels", o: ["Linear regression", "Decision tree", "Clustering", "Reinforcement learning"], a: 2 },
      { q: "Teaching a program to play a board game by playing against itself", o: ["Linear regression", "Association rules", "Clustering", "Reinforcement learning"], a: 3 },
    ]
  ),
  th(
    { ref: "A4.3.10", title: "A4.3 Factors in model selection", d: "Moderate", cmd: "Describe" },
    "Describe three factors that a data scientist should consider when choosing between machine learning models for a problem.",
    {
      m: 3,
      kw: ["type of problem", "labelled", "size of data", "interpretability", "accuracy", "computational cost"],
      pts: [
        "The nature of the problem and data: e.g. labelled data for classification/regression, unlabelled for clustering",
        "The amount, complexity and characteristics of the data (e.g. images suit CNNs; small data sets suit simpler models)",
        "Desired outcomes: required accuracy, need to explain decisions (interpretability), training/prediction time and hardware cost",
      ],
      notes: ["Models should be compared on the same validation/test data using suitable metrics."],
    }
  ),
  // A4.4.2 ethics of emerging technologies
  th(
    { ref: "A4.4.2", title: "A4.4 Augmented reality and privacy", d: "Moderate", cmd: "Explain" },
    "Augmented reality (AR) glasses with built-in cameras are becoming popular. Explain two ethical concerns about their use in public places.",
    {
      m: 4,
      kw: ["privacy", "recording", "consent", "facial recognition", "data", "equity"],
      pts: [
        "Privacy: people nearby may be recorded without knowing or consenting",
        "The recordings could be combined with facial recognition to identify and track people",
        "Data ownership/security: images and location data are sent to the company and could be misused or leaked",
        "Equity/social impact: those who cannot afford the devices may be disadvantaged, or users may become distracted/isolated",
      ],
      notes: ["Award [1] for each concern and [1] for its explanation."],
    }
  ),
  th(
    { ref: "A4.4.2", title: "A4.4 Quantum computing and society", d: "Moderate", cmd: "Explain" },
    "Explain why the development of powerful quantum computers means that ethical and security guidelines must be reassessed.",
    {
      m: 3,
      kw: ["break encryption", "public-key", "privacy", "stored data", "new standards", "inequality"],
      pts: [
        "Quantum computers could break widely used public-key encryption",
        "So private data captured today could be decrypted in future, threatening privacy and security",
        "Guidelines and standards (e.g. quantum-resistant encryption, who may access the technology) must be updated as the technology advances",
      ],
    }
  ),
];
// =====================================================================
// Theme B (Paper 2)
// =====================================================================
const B: IGCSETask[] = [
  // B2.2.1 static and dynamic data structures
  mu(
    { ref: "B2.2.1", title: "B2.2 Data structures for a games app", d: "Moderate", cmd: "Compare" },
    "A games app keeps a high-score table that always holds exactly ten scores. It also keeps a list of every level the player has completed, which grows as the player progresses.",
    [
      { q: "Define the term static data structure.", m: 1, cmd: "Define", kw: ["fixed size", "set at creation", "cannot grow"], pts: [["A data structure whose size is fixed when it is created and cannot change while the program runs", "fixed size"]] },
      {
        q: "Compare static and dynamic data structures in terms of memory use and flexibility.",
        m: 3,
        cmd: "Compare",
        kw: ["both store collections", "fixed memory", "may waste", "grows and shrinks", "overhead", "slower allocation"],
        pts: [
          "Both store a collection of data items that can be accessed by the program",
          "A static structure reserves a fixed amount of memory in advance, which may be wasted or run out; a dynamic structure allocates memory as it grows and frees it as it shrinks",
          "Static structures allow fast direct access by index with no allocation overhead; dynamic structures are more flexible but have extra overhead (e.g. reallocation or pointers)",
        ],
      },
      { q: "Justify a suitable choice of structure for (i) the high-score table and (ii) the completed-levels list.", m: 2, cmd: "Justify", kw: ["static", "exactly ten", "dynamic", "unknown number"], pts: ["(i) Static/fixed-size array, because there are always exactly ten scores", "(ii) Dynamic list, because the number of completed levels is unknown and keeps growing"] },
    ]
  ),
  // B3.1.2 designing classes
  mc(
    { ref: "B3.1.2", title: "B3.1 Reading UML class notation", d: "Easy", cmd: "Identify" },
    "A UML class diagram for a class Book contains the lines: - isbn : String, - onLoan : Boolean, + Book(isbn : String), + lend() : void, + isAvailable() : Boolean. Answer each question.",
    [
      { q: "What does the minus sign (-) before isbn mean?", o: ["The attribute is public", "The attribute is private", "The attribute is static", "The attribute is deleted"], a: 1 },
      { q: "Which line is the constructor?", o: ["+ Book(isbn : String)", "+ lend() : void", "- onLoan : Boolean", "+ isAvailable() : Boolean"], a: 0 },
      { q: "What does ': Boolean' after isAvailable() show?", o: ["The parameter type", "That the method is private", "The method's return type", "The class name"], a: 2 },
      { q: "Which section of a class diagram lists isbn and onLoan?", o: ["The class name section", "The methods section", "The relationships section", "The attributes section"], a: 3 },
    ]
  ),
  th(
    { ref: "B3.1.2", title: "B3.1 Designing a Locker class", d: "Hard", cmd: "Construct" },
    "A school's lockers each have a number, the name of the student renting it (empty if free) and a four-digit code. A locker can be rented to a student, released, and opened only if the correct code is given. Construct a UML class diagram for a Locker class, showing attributes with data types and visibility, a constructor and suitable methods with parameters and return types.",
    {
      m: 6,
      kw: ["Locker", "- number : int", "- student : String", "- code : String", "+ rent", "+ release", "+ open(code) : Boolean", "constructor"],
      pts: [
        "Class name Locker in the top section",
        "Private attributes for number (int) and student/renter (String)",
        "Private attribute for the code (String or int) - the code must not be public",
        "A constructor, e.g. + Locker(number : int, code : String)",
        "Methods to rent and release, e.g. + rent(name : String) : void and + release() : void",
        "A method to open with a code parameter returning a Boolean, e.g. + open(code : String) : Boolean, and/or + isFree() : Boolean",
      ],
      notes: ["Accept equivalent names and Python-style types (str, int, bool). Visibility symbols (+/-) must be shown for full marks on attribute points."],
    }
  ),
  // B3.2.3 abstraction (HL)
  mc(
    { ref: "B3.2.3", title: "B3.2 Abstraction in OOP", d: "Easy", cmd: "Identify" },
    "Answer each question about abstraction in object-oriented programming.",
    [
      { q: "What is abstraction in OOP?", o: ["Copying code between classes", "Showing only the essential features of an object and hiding the implementation details", "Making every attribute public", "Storing objects in a file"], a: 1 },
      { q: "What is an abstract class?", o: ["A class that is meant to be inherited from and is not instantiated directly", "A class with no attributes", "A class that cannot have methods", "A class stored in a module"], a: 0 },
      { q: "An abstract method in a parent class...", o: ["contains the full implementation used by every child", "can never be called", "declares a method that each concrete subclass must implement", "is always private"], a: 2 },
      { q: "In Python, which module is commonly used to create formal abstract base classes?", o: ["math", "random", "os", "abc"], a: 3 },
    ]
  ),
  ins(
    { ref: "B3.2.3", title: "B3.2 Tracing an abstract account class", d: "Hard", cmd: "Deduce" },
    "Study the Python code and answer the questions. Give outputs exactly as printed.",
    [
      { q: "What is printed by the first line of output?", a: ["Ana: 0"] },
      { q: "What is printed by the second line of output?", a: ["Kofi Ltd: 11"] },
      { q: "What is printed by the third line of output?", a: ["Error: subclass must implement fee"] },
      { q: "Name the method that acts as an abstract method in Account.", a: ["fee", "fee()"] },
    ],
    `class Account:
    def __init__(self, owner):
        self.owner = owner

    def fee(self):
        raise NotImplementedError("subclass must implement fee")

    def summary(self):
        return self.owner + ": " + str(self.fee())


class Student(Account):
    def fee(self):
        return 0


class Business(Account):
    def __init__(self, owner, staff):
        super().__init__(owner)
        self.staff = staff

    def fee(self):
        return 5 + 2 * self.staff


accounts = [Student("Ana"), Business("Kofi Ltd", 3)]
for a in accounts:
    print(a.summary())
try:
    print(Account("Lee").summary())
except NotImplementedError as e:
    print("Error:", e)`
  ),
];

/** All extra questions (themes A and B). */
export const IB_TASKS_EXTRA: IGCSETask[] = [...A1, ...A2, ...A3, ...A4, ...B];
