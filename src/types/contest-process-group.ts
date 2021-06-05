import { Group } from "./group";
import { Process } from "./process";

export type ContestProcessGroupStatus = "PREPARING" | "READY";

export const getContestProcessGroupStatusInfo = (
  status: ContestProcessGroupStatus
) => {
  switch (status) {
    case "PREPARING":
      return "准备中";
    case "READY":
      return "准备完成";
    default:
      return status;
  }
};

export interface ContestProcessGroup {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  process: Process;
  group: Group;
  status: ContestProcessGroupStatus;
  submitList?: string;
}
