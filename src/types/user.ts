export interface User {
  id: number;
  token?: string;
  account: string;
  email: string;
  type: "STUDENT" | "TEACHER" | "ADMIN";
  status: "UNACTIVE" | "ACTIVE" | "BANNED" | "DELETE";
  name: string;
  gender: "MALE" | "FEMALE" | "SECRECY";
  grade: string;
  college: string;
  major: string;
  introduction: string;
}
