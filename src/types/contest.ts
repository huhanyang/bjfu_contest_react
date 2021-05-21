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
