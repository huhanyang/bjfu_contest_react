import { ContestProcessGroup } from "./contest-process-group";
import { Contest } from "./contest";

export type ProcessStatus = "CREATING" | "RUNNING" | "FINISH" | "DELETE";

export interface Process {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  contest: Contest;
  name: string;
  sort: number;
  status: ProcessStatus;
  description: string;
  submitList?: string;
  endSubmitTime: string;
  startTime?: string;
  finishTime?: string;
  groups?: ContestProcessGroup[];
}
