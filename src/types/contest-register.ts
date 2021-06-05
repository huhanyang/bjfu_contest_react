import { Contest } from "./contest";
import { User } from "./user";
import { Group } from "./group";

export type ContestRegisterStatus = "SIGN_UP" | "BAN" | "DELETE";

export const getContestRegisterStatusInfo = (status: ContestRegisterStatus) => {
  switch (status) {
    case "SIGN_UP":
      return "登记";
    case "BAN":
      return "禁赛";
    case "DELETE":
      return "删除";
    default:
      return status;
  }
};

export interface ContestRegister {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  contest: Contest;
  user: User;
  status: ContestRegisterStatus;
  groups?: Group[];
}
