import { useHttp } from "utils/http";
import { useMutation, useQuery } from "react-query";
import { useNoOpsConfig } from "utils/use-optimistic-options";
import { Process } from "../types/process";
import { Group } from "../types/group";

export const useProcess = (contestId?: number, processId?: number) => {
  const client = useHttp();

  return useQuery<Process>(
    ["contest", "process", "info", { processId }],
    () =>
      client(`contest/process/getInfo`, {
        data: {
          contestId: contestId,
          processId: processId,
        },
      }),
    {
      enabled: Boolean(contestId) && Boolean(processId),
    }
  );
};

export const useProcesses = (contestId?: number) => {
  const client = useHttp();
  return useQuery<Process[]>(
    ["contest", "process", "all", { contestId }],
    () =>
      client(`contest/process/listAll`, {
        data: {
          contestId: contestId,
        },
      }),
    {
      enabled: Boolean(contestId),
    }
  );
};

export interface ProcessCreateRequest {
  contestId: number;
  name: string;
  description: string;
  submitList: string;
  endSubmitTime: Date;
}

export const useCreateProcessInfo = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ProcessCreateRequest>) =>
      client(`contest/process/create`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["contest"])
  );
};

export interface ProcessEditRequest {
  contestId: number;
  processId: number;
  name: string;
  description: string;
  submitList: string;
  endSubmitTime: Date;
}

export const useEditProcessInfo = (contestId?: number, processId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ProcessEditRequest>) =>
      client(`contest/process/edit`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["contest"])
  );
};

export const useDeleteProcess = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { processId: number }) =>
      client(`contest/process/delete`, {
        method: "DELETE",
        data: { ...params, contestId },
      }),
    useNoOpsConfig(["contest"])
  );
};

export const usePromotableGroups = (targetProcessId?: number) => {
  const client = useHttp();
  return useQuery<Group[]>(
    ["contest", "process", "promotable-groups", { targetProcessId }],
    () =>
      client(`contest/process/listPromotableGroups`, {
        data: { targetProcessId },
      })
  );
};

export const usePromoteGroups = (processId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { groupIds: number[] }) =>
      client(`contest/process/promoteGroups`, {
        method: "POST",
        data: { ...params, processId },
      }),
    useNoOpsConfig(["contest"])
  );
};

export const useDemoteGroups = (processId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { groupIds: number[] }) =>
      client(`contest/process/demoteGroups`, {
        method: "POST",
        data: { ...params, processId },
      }),
    useNoOpsConfig(["contest"])
  );
};
