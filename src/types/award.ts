import { Group } from "./group";
import { Contest } from "./contest";

export interface Award {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  contest: Contest;
  group: Group;
  name: string;
}
