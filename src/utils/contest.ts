import { useHttp } from "utils/http";
import { useMutation, useQuery } from "react-query";
import { useNoOpsConfig } from "utils/use-optimistic-options";
import { PageAndSingleFieldSorterRequest } from "../types/request";
import { Contest, ContestStatus } from "../types/contest";
import { cleanObject } from "./index";

export const useContest = (id?: number) => {
  const client = useHttp();
  return useQuery<Contest>(
    ["contest", "info", { id }],
    () =>
      client(`contest/getInfo`, {
        data: {
          contestId: id,
        },
      }),
    {
      enabled: Boolean(id),
    }
  );
};

export interface ContestListCreatedRequest
  extends PageAndSingleFieldSorterRequest {
  name?: string[];
  status?: ContestStatus[];
}

export const useCreatedContests = (
  params: Partial<ContestListCreatedRequest>
) => {
  const client = useHttp();
  return useQuery<Contest[]>(
    ["contest", "created-contests", cleanObject(params)],
    () =>
      client("contest/listCreated", { data: params, method: "POST" }).then(
        (value) => value.content
      )
  );
};

export interface ContestListAllRequest extends PageAndSingleFieldSorterRequest {
  name?: string[];
  status?: ContestStatus[];
  creatorName?: string[];
  creatorCollege?: string[];
}

export const useAllContests = (params: Partial<ContestListAllRequest>) => {
  const client = useHttp();
  return useQuery<Contest[]>(
    ["contest", "all-contests", cleanObject(params)],
    () =>
      client("contest/listAll", { data: params, method: "POST" }).then(
        (value) => value.content
      )
  );
};

export interface ContestEditRequest {
  contestId: number;
  name: string;
  summary: string;
  description: string;
  groupMemberCount: number;
}

export const useEditContest = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ContestEditRequest>) =>
      client(`contest/edit`, {
        method: "POST",
        data: { ...params, contestId: contestId },
      }),
    useNoOpsConfig(["contest"])
  );
};

export interface ContestCreateRequest {
  name: string;
  summary: string;
  description: string;
  groupMemberCount: number;
  isCreateDefaultProcess: boolean;
}

export const useCreateContest = () => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ContestCreateRequest>) =>
      client(`contest/create`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["contest"])
  );
};

export const useDeleteContest = () => {
  const client = useHttp();
  return useMutation(
    (contestId: number) =>
      client(`contest/delete`, {
        method: "DELETE",
        data: { contestId },
      }),
    useNoOpsConfig(["contest"])
  );
};
