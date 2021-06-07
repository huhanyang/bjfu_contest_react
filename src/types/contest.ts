import { User } from "./user";
import { Process } from "./process";
import { ContestRegister } from "./contest-register";
import { Award } from "./award";
import { Group } from "./group";

export type ContestStatus =
  | "CREATING"
  | "REGISTERING"
  | "RUNNING"
  | "FINISH"
  | "DELETE";

export const ContestStatuses: ContestStatus[] = [
  "CREATING",
  "REGISTERING",
  "RUNNING",
  "FINISH",
  "DELETE",
];

export const getContestStatusInfo = (status: ContestStatus) => {
  switch (status) {
    case "CREATING":
      return "创建中";
    case "REGISTERING":
      return "报名中";
    case "RUNNING":
      return "进行中";
    case "FINISH":
      return "已结束";
    case "DELETE":
      return "已删除";
    default:
      return status;
  }
};

export interface Contest {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  name: string;
  summary: string;
  description: string;
  creator: User;
  status: ContestStatus;
  groupMemberCount: number;
  extension?: string;
  processes?: Process[];
  teachers?: User[];
  registers?: ContestRegister[];
  groups?: Group[];
  awards?: Award[];
}
