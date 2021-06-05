import { ContestProcessGroup } from "./contest-process-group";
import { Contest } from "./contest";

export type ProcessStatus = "CREATING" | "RUNNING" | "FINISH" | "DELETE";

export const getProcessStatusInfo = (status: ProcessStatus) => {
  switch (status) {
    case "CREATING":
      return "创建中";
    case "RUNNING":
      return "进程中";
    case "FINISH":
      return "结束";
    case "DELETE":
      return "软删除";
    default:
      return status;
  }
};

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
