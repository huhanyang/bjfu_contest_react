import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useConfig,
  useDeleteConfig,
  useEditConfig,
  useNoOpsConfig,
} from "utils/use-optimistic-options";
import { User } from "../types/user";

export const useUser = (id?: number) => {
  const client = useHttp();
  return useQuery<User>(
    ["user", { id }],
    () =>
      client(`user/getUserInfo`, {
        data: {
          userId: id,
        },
      }),
    {
      enabled: Boolean(id),
    }
  );
};

export interface ChangeUserInfo {
  userId: number;
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

export const useEditUserInfo = (id?: number) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ChangeUserInfo>) =>
      client(`user/editUserInfo`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["user", { id }])
  );
};

export interface EditSelfInfo {
  name: string;
  gender: "MALE" | "FEMALE" | "SECRECY";
  introduction: string;
}

export const useEditSelfInfo = (id?: number) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<EditSelfInfo>) =>
      client(`user/editSelfInfo`, {
        method: "post",
        data: params,
      }),
    useNoOpsConfig(["user", { id }])
  );
};
