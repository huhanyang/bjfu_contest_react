import { Notify } from "./notify";
import { User } from "./user";

export interface UserInbox {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  user: User;
  notify: Notify;
  isRead: boolean;
  isSendEmailSuccess?: boolean;
}
