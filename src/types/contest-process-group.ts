import { Group } from "./group";
import { Process } from "./process";

export type ContestProcessGroupStatus = "PREPARING" | "READY";

export interface ContestProcessGroup {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  process: Process;
  group: Group;
  status: ContestProcessGroupStatus;
  submitList?: string;
}
