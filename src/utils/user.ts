import { useHttp } from "utils/http";
import { useMutation, useQuery } from "react-query";
import { useNoOpsConfig } from "utils/use-optimistic-options";
import { User, UserGender, UserStatus, UserType } from "../types/user";

export const useUser = (id?: number) => {
  const client = useHttp();
  return useQuery<User>(
    ["user", "info", { id }],
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
  type: UserType;
  status: UserStatus;
  name: string;
  gender: UserGender;
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
    useNoOpsConfig(["user"])
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
    useNoOpsConfig(["user"])
  );
};

export const useSearchUser = (name?: string, types?: UserType[]) => {
  const client = useHttp();
  return useQuery<User[]>(
    ["user", "search", { name, types }],
    () =>
      client(`user/search`, {
        data: {
          name: name,
          types: types,
        },
        method: "POST",
      }),
    {
      enabled: Boolean(name),
    }
  );
};
