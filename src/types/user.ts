import { UserInbox } from "./user-inbox";
import { Contest } from "./contest";
import { Group } from "./group";

export type UserType = "STUDENT" | "TEACHER" | "ADMIN";
export type UserStatus = "STUDENT" | "TEACHER" | "ADMIN";
export type UserGender = "STUDENT" | "TEACHER" | "ADMIN";

export interface User {
  token?: string;
  id: number;
  account: string;
  email: string;
  type: UserType;
  status: UserStatus;
  name: string;
  gender: UserGender;
  grade?: string;
  college: string;
  major?: string;
  introduction?: string;
  inboxes?: UserInbox[];
  creatorContests?: Contest[];
  teacherContests?: Contest[];
  teacherGroups?: Group[];
  contests?: Contest[];
  captainGroups?: Group[];
  groups?: Group[];
}
