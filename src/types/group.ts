import { Contest } from "./contest";
import { User } from "./user";
import { ContestProcessGroup } from "./contest-process-group";

export interface Group {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  contest: Contest;
  name: string;
  captain: User;
  teacher?: User;
  introduction?: string;
  members?: User[];
  processes?: ContestProcessGroup[];
  awards?: string[];
}
