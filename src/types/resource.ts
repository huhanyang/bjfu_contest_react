import { User } from "./user";

export type ResourceType =
  | "ALL"
  | "USER"
  | "TEACHER"
  | "STUDENT"
  | "CONTEST"
  | "PROCESS"
  | "GROUP";
export type ResourceContentType = "RICH_TEXT" | "OTHER";

export const getResourceTypeInfo = (type: ResourceType) => {
  switch (type) {
    case "ALL":
      return "首页资源";
    case "USER":
      return "所有用户的资源";
    case "TEACHER":
      return "面向教师的资源";
    case "STUDENT":
      return "面向学生的资源";
    case "CONTEST":
      return "面向竞赛的资源";
    case "PROCESS":
      return "面向当前流程的资源";
    case "GROUP":
      return "面向队伍的资源";
    default:
      return type;
  }
};

export const getResourceContentType = (contentType: ResourceContentType) => {
  switch (contentType) {
    case "RICH_TEXT":
      return "富文本";
    case "OTHER":
      return "其他类型";
    default:
      return contentType;
  }
};

export interface Resource {
  id: number;
  createdTime: string;
  lastModifiedTime: string;
  type: ResourceType;
  contentType: ResourceContentType;
  creator?: User;
  targetId: number;
  fileName: string;
  classification: string;
  content: string;
}

export interface ResourceDownloadInfo {
  createdTime: string;
  lastModifiedTime: string;
  contentType: ResourceContentType;
  fileName: string;
  classification: string;
  url: string;
}
