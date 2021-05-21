import { Contest } from "./contest";
import { User } from "./user";
import { Group } from "./group";

export type ContestRegisterStatus = "SIGN_UP" | "BAN" | "DELETE";

export interface ContestRegister {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  contest: Contest;
  user: User;
  status: ContestRegisterStatus;
  groups?: Group[];
}
