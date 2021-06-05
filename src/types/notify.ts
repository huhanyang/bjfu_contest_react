import { User } from "./user";

export type NotifyType =
  | "ALL_NOTIFY"
  | "USERS_NOTIFY"
  | "STUDENTS_NOTIFY"
  | "TEACHERS_NOTIFY"
  | "CONTEST_NOTIFY"
  | "CONTEST_PROCESS_NOTIFY"
  | "GROUP_NOTIFY";

export const getNotifyTypeInfo = (type: NotifyType) => {
  switch (type) {
    case "ALL_NOTIFY":
      return "首页通知";
    case "USERS_NOTIFY":
      return "全体用户";
    case "STUDENTS_NOTIFY":
      return "全体学生";
    case "TEACHERS_NOTIFY":
      return "全体教师";
    case "CONTEST_NOTIFY":
      return "竞赛内通知";
    case "CONTEST_PROCESS_NOTIFY":
      return "竞赛流程内通知";
    case "GROUP_NOTIFY":
      return "队伍内通知";
    default:
      return type;
  }
};

export interface Notify {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  title: string;
  content: string;
  author: User;
  type: NotifyType;
  targetId?: number;
  isSendEmail: boolean;
}
