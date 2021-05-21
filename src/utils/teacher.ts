import { useHttp } from "./http";
import { useMutation, useQuery } from "react-query";
import { useNoOpsConfig } from "./use-optimistic-options";
import { User } from "../types/user";
import { PageAndSingleFieldSorterRequest } from "../types/request";
import { Contest, ContestStatus } from "../types/contest";

export const useAllTeachers = (contestId: number) => {
  const client = useHttp();
  return useQuery<User[]>(
    ["teacher", "all-teachers", contestId],
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
    useNoOpsConfig(["teacher"])
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
    useNoOpsConfig(["teacher"])
  );
};

export const useAllTeachContests = (params?: TeacherListAllTeachContest) => {
  const client = useHttp();
  return useQuery<Contest[]>(["teacher", "all-teach-contests", params], () =>
    client(`contest/teacher/listAllTeachContests`, {
      data: params,
      method: "post",
    }).then((value) => value.content)
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
    useNoOpsConfig(["teacher"])
  );
};
