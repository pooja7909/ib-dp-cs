import type { IGCSETask } from "../types";
import { IB_TASKS_B12 } from "./ibBankB12.js";
import { IB_TASKS_B34 } from "./ibBankB34.js";
// IB Paper 2 style questions (theme B, Python).
export const IB_PAPER2_TASKS: IGCSETask[] = [...IB_TASKS_B12, ...IB_TASKS_B34];
