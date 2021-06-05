import { UserInbox } from "./user-inbox";
import { Contest } from "./contest";
import { Group } from "./group";

export type UserType = "STUDENT" | "TEACHER" | "ADMIN";
export type UserStatus = "UNACTIVE" | "ACTIVE" | "BANNED" | "DELETE";
export type UserGender = "MALE" | "FEMALE" | "SECRECY";

export const getUserTypeInfo = (type: UserType) => {
  switch (type) {
    case "STUDENT":
      return "学生";
    case "TEACHER":
      return "教师";
    case "ADMIN":
      return "管理员";
    default:
      return type;
  }
};

export const getUserStatusInfo = (type: UserStatus) => {
  switch (type) {
    case "UNACTIVE":
      return "未激活";
    case "ACTIVE":
      return "正常";
    case "BANNED":
      return "已封禁";
    case "DELETE":
      return "已删除";
    default:
      return type;
  }
};

export const getUserGenderInfo = (type: UserGender) => {
  switch (type) {
    case "MALE":
      return "男";
    case "FEMALE":
      return "女";
    case "SECRECY":
      return "保密";
    default:
      return type;
  }
};

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
