import type { IGCSETask } from "../types";
import { IB_TASKS_A12 } from "./ibBankA12.js";
import { IB_TASKS_A34CS } from "./ibBankA34CS.js";
import { IB_TASKS_EXTRA } from "./ibBankExtra.js";
// IB Paper 1 style questions (theme A and the case study).
export const IB_PAPER1_TASKS: IGCSETask[] = [...IB_TASKS_A12, ...IB_TASKS_A34CS, ...IB_TASKS_EXTRA.filter((t) => !t.unit.startsWith("B"))];
