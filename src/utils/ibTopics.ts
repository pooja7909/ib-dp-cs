// IB DP Computer Science topic catalogue used by the server (AI prompts, topic detection)
// and the client (filters, unit pickers). Built from src/data/ibSyllabus.ts.
import { IB_TOPICS, IB_TOPIC_MAP, type IBTopic } from "../data/ibSyllabus";

export interface IBUnitInfo {
  code: string; // "A1" ... "B4", "CS"
  title: string;
  spec: string; // subtopic codes, e.g. "A1.1, A1.2, A1.3, A1.4 (HL)"
  theme: IBTopic["theme"];
  paper: "Paper 1" | "Paper 2";
  hlOnly: boolean; // whole topic is HL only (B4)
  subtopics: IBTopic["subtopics"];
  keywords: string[];
}

const KEYWORDS: Record<string, string[]> = {
  A1: [
    "cpu", "alu", "control unit", "register", "mar", "mdr", "program counter", "fetch", "decode", "execute", "cache", "ram", "rom",
    "gpu", "primary memory", "secondary storage", "ssd", "hdd", "pipelining", "multi-core", "binary", "hexadecimal", "two's complement",
    "logic gate", "truth table", "boolean", "nand", "nor", "xor", "karnaugh", "operating system", "scheduling", "interrupt", "polling",
    "control system", "sensor", "actuator", "feedback", "compiler", "interpreter", "translation", "jit", "bytecode", "unicode", "ascii",
  ],
  A2: [
    "network", "lan", "wan", "vpn", "pan", "protocol", "tcp", "udp", "ip address", "ipv4", "ipv6", "osi", "tcp/ip", "router", "switch",
    "gateway", "dns", "dhcp", "packet", "packet switching", "topology", "star", "mesh", "client-server", "peer-to-peer", "cloud",
    "bandwidth", "latency", "firewall", "encryption", "symmetric", "asymmetric", "digital certificate", "malware", "phishing", "ddos",
    "mac address", "subnet", "nat",
  ],
  A3: [
    "database", "relational", "primary key", "foreign key", "composite key", "entity", "erd", "normalization", "normalisation", "1nf",
    "2nf", "3nf", "sql", "select", "join", "query", "transaction", "acid", "schema", "data dictionary", "nosql", "data warehouse",
    "olap", "data mining", "view", "referential integrity",
  ],
  A4: [
    "machine learning", "supervised", "unsupervised", "reinforcement learning", "neural network", "training data", "classification",
    "regression", "clustering", "k-nearest", "decision tree", "overfitting", "underfitting", "bias", "feature", "preprocessing",
    "normalization of data", "genetic algorithm", "deep learning", "ethical", "linear regression", "k-means",
  ],
  B1: ["computational thinking", "abstraction", "decomposition", "pattern recognition", "algorithmic design", "flowchart", "pseudocode"],
  B2: [
    "variable", "constant", "data type", "string", "integer", "float", "boolean", "list", "array", "2d", "tuple", "dictionary",
    "selection", "if", "elif", "while", "for", "loop", "iteration", "function", "parameter", "return", "scope", "exception", "try",
    "debug", "test", "linear search", "binary search", "bubble sort", "selection sort", "big o", "efficiency", "recursion", "file",
    "open(", "read", "write", "append", "csv", "def ", "print(", "input(",
  ],
  B3: ["class", "object", "attribute", "method", "constructor", "__init__", "encapsulation", "inheritance", "polymorphism", "self.", "uml", "instance", "getter", "setter", "aggregation", "composition"],
  B4: ["abstract data type", "adt", "linked list", "stack", "queue", "push", "pop", "enqueue", "dequeue", "binary search tree", "bst", "tree traversal", "hash table", "set", "node", "in-order", "pre-order", "post-order"],
  CS: ["case study", "generative ai", "image generation", "diffusion", "gan", "prompt", "deepfake", "training images", "copyright", "text-to-image"],
};

export const IB_UNITS: IBUnitInfo[] = IB_TOPICS.map((t) => ({
  code: t.code,
  title: t.title,
  spec: t.subtopics.map((s) => s.code + (s.hlOnly ? " (HL)" : "")).join(", "),
  theme: t.theme,
  paper: t.paper,
  hlOnly: t.subtopics.every((s) => s.hlOnly),
  subtopics: t.subtopics,
  keywords: KEYWORDS[t.code] || [],
}));

export const IB_UNIT_CODES: string[] = IB_UNITS.map((u) => u.code);

export function isIBUnitCode(code: unknown): boolean {
  return typeof code === "string" && !!IB_TOPIC_MAP[code];
}

export function ibUnitTitle(code: string): string {
  const t = IB_TOPIC_MAP[code];
  return t ? `${t.code} ${t.title}` : code;
}

/** Paper for a unit code: Paper 1 = theme A + case study, Paper 2 = theme B. */
export function ibPaperForUnit(code: string): "Paper 1" | "Paper 2" | undefined {
  return IB_TOPIC_MAP[code]?.paper;
}

/** Topic code from a subtopic reference such as "A3.2" or "B2.4.1". */
export function ibUnitFromSpec(spec: unknown): string | null {
  const m = String(spec || "").toUpperCase().match(/\b(A[1-4]|B[1-4])(?:\.\d+)*/);
  if (m) return m[1];
  if (/\bCASE STUDY\b|\bCS\b/.test(String(spec || "").toUpperCase())) return "CS";
  return null;
}

/** Rule-based topic detection for IB DP CS (used when the AI gives no valid code). */
export function classifyIBTopic(text: string, fallback?: string): string {
  const lower = String(text || "").toLowerCase();
  const fromSpec = ibUnitFromSpec(text);
  if (fromSpec) return fromSpec;
  let best = "";
  let bestScore = 0;
  for (const u of IB_UNITS) {
    let score = 0;
    for (const kw of u.keywords) if (lower.includes(kw.toLowerCase())) score += 2;
    if (lower.includes(u.title.toLowerCase())) score += 5;
    if (score > bestScore && score >= 2) {
      bestScore = score;
      best = u.code;
    }
  }
  if (best) return best;
  if (fallback && isIBUnitCode(fallback)) return fallback;
  // Code-looking text belongs to programming (Paper 2), everything else to theme A
  return /\bdef |print\(|input\(|for .* in |while /.test(lower) ? "B2" : "A1";
}

/**
 * Makes sure a question carries an IB unit code. Old non-IB codes ("U01"...) or missing
 * codes are replaced with a detected IB topic.
 */
export function ensureIBUnit<T extends { unit?: string; unitName?: string; title?: string; brief?: string; specReference?: string; paper?: string }>(task: T): T {
  if (task && isIBUnitCode(task.unit)) {
    return task.unitName ? task : { ...task, unitName: ibUnitTitle(task.unit as string) };
  }
  const paperHint = /paper\s*2/i.test(String(task?.paper || "")) ? "B2" : undefined;
  const code = ibUnitFromSpec(task?.specReference) || classifyIBTopic(`${task?.title || ""}\n${task?.brief || ""}`, paperHint);
  return { ...task, unit: code, unitName: ibUnitTitle(code) };
}

/** True when a question should be visible at the chosen level (SL hides HL-only questions). */
export function matchesIBLevel(task: { ibLevel?: string } | null | undefined, level: "All" | "SL" | "HL"): boolean {
  if (level !== "SL") return true;
  return !task || task.ibLevel !== "HL";
}
