import { User } from "./user";

export type NotifyType =
  | "ALL_NOTIFY"
  | "USERS_NOTIFY"
  | "STUDENTS_NOTIFY"
  | "TEACHERS_NOTIFY"
  | "CONTEST_NOTIFY"
  | "CONTEST_PROCESS_NOTIFY"
  | "GROUP_NOTIFY";

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
