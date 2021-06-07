import { useHttp } from "./http";
import { useMutation, useQuery } from "react-query";
import { useNoOpsConfig } from "./use-optimistic-options";
import { User } from "../types/user";
import { PageAndSingleFieldSorterRequest } from "../types/request";
import { Contest, ContestStatus } from "../types/contest";
import { cleanObject } from "./index";
import { Page } from "../types/page";

export const useAllTeachers = (contestId: number) => {
  const client = useHttp();
  return useQuery<User[]>(
    ["contest", "teacher", "all-teachers", contestId],
    () =>
      client(`contest/teacher/listAll`, {
        data: { contestId },
      }),
    {
      enabled: Boolean(contestId),
    }
  );
};

export interface TeacherListAllTeachContest
  extends PageAndSingleFieldSorterRequest {
  contestName?: string[];
  contestStatus?: ContestStatus[];
  creatorName?: string[];
  creatorCollege?: string[];
}

export const useCreateTeacher = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { contestId: number; teacherAccounts: string[] }) =>
      client(`contest/teacher/create`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["contest"])
  );
};

export const useDeleteTeacher = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { contestId: number; teacherAccount: string }) =>
      client(`contest/teacher/delete`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["contest"])
  );
};

export const useAllTeachContests = (
  params?: Partial<TeacherListAllTeachContest>
) => {
  const client = useHttp();
  return useQuery<Page<Contest>>(
    ["contest", "teacher", "all-teach-contests", cleanObject(params)],
    () =>
      client(`contest/teacher/listAllTeachContests`, {
        data: params,
        method: "post",
      })
  );
};

export const useDeleteTeachContest = () => {
  const client = useHttp();
  return useMutation(
    (params: { contestId: number; teacherAccount?: string }) =>
      client(`contest/teacher/delete`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["contest"])
  );
};
