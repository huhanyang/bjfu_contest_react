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
import { ChangeUserInfo } from "./user";

interface Contest {
  id: number;
  name: string;
  summary: string;
  description: string;
  creator: User;
  status: "CREATING" | "REGISTERING" | "RUNNING" | "FINISH" | "DELETE";
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
