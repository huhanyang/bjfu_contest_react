import { useHttp } from "utils/http";
import { useMutation, useQuery } from "react-query";
import { useNoOpsConfig } from "utils/use-optimistic-options";
import { PageAndSingleFieldSorterRequest } from "../types/request";
import { cleanObject } from "./index";
import {
  ContestRegister,
  ContestRegisterStatus,
} from "../types/contest-register";

export const useRegister = (contestId: number) => {
  const client = useHttp();
  return useQuery<ContestRegister>(
    ["register", "info", { contestId }],
    () => client(`contest/register/getInfo`, { data: { contestId } }),
    { enabled: Boolean(contestId) }
  );
};

export interface RegisterListAllRequest
  extends PageAndSingleFieldSorterRequest {
  contestId?: number;
  status?: ContestRegisterStatus[];
  registerName?: string[];
  registerGrade?: string[];
  registerCollege?: string[];
  registerMajor?: string[];
}

export const useAllRegisters = (params: Partial<RegisterListAllRequest>) => {
  const client = useHttp();
  return useQuery<ContestRegister[]>(
    ["register", "all-registers", cleanObject(params)],
    () =>
      client(`contest/register/listAll`, {
        data: params,
        method: "POST",
      }).then((value) => value.content),
    {
      enabled: Boolean(params),
    }
  );
};

export const useCreateRegister = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { contestId: number }) =>
      client(`contest/register/create`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["register"])
  );
};

export const useDeleteRegister = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { contestId: number; deleteUserAccount: string }) =>
      client(`contest/register/delete`, {
        method: "DELETE",
        data: params,
      }),
    useNoOpsConfig(["register"])
  );
};

export const useBanRegister = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { contestId: number; userId: number }) =>
      client(`contest/register/ban`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["register"])
  );
};

export const useUnBanRegister = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { contestId: number; userId: number }) =>
      client(`contest/register/unban`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["register"])
  );
};

export const useAllRegisteredContests = () => {
  const client = useHttp();
  return useQuery<ContestRegister[]>(
    ["register", "all-registered-contests"],
    () => client(`contest/register/listAllRegistered`)
  );
};

export const useDeleteRegisteredContest = () => {
  const client = useHttp();
  return useMutation(
    (params: { contestId: number }) =>
      client(`contest/register/delete`, {
        method: "DELETE",
        data: params,
      }),
    useNoOpsConfig(["register"])
  );
};
