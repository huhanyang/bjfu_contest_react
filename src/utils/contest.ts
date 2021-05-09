import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useConfig,
  useDeleteConfig,
  useEditConfig,
  useEditSingleConfig,
  useNoOpsConfig,
} from "utils/use-optimistic-options";
import { User } from "../types/user";
import { PageAndSingleFieldSorterRequest } from "../types/Request";

type ContestStatus =
  | "CREATING"
  | "REGISTERING"
  | "RUNNING"
  | "FINISH"
  | "DELETE";

export interface Contest {
  id: number;
  name: string;
  summary: string;
  description: string;
  creator: User;
  createdTime: string;
  status: ContestStatus;
  groupMemberCount: number;
  extension: string;
}

export const useContest = (id?: number) => {
  const client = useHttp();
  return useQuery<Contest>(
    ["contest", { id }],
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

export const useCreatedContests = (params: ContestListCreatedRequest) => {
  const client = useHttp();
  return useQuery<Contest[]>(["created-contests", params], () =>
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

export const useAllContests = (params: ContestListAllRequest) => {
  const client = useHttp();
  return useQuery<Contest[]>(["all-contests", params], () =>
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

export const useEditContestInfo = (id?: number) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ContestEditRequest>) =>
      client(`contest/edit`, {
        method: "POST",
        data: params,
      }),
    useEditSingleConfig(["contest", { id }])
  );
};
