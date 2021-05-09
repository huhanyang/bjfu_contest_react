import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useEditSingleConfig,
  useNoOpsConfig,
} from "utils/use-optimistic-options";
import { User } from "../types/user";
import { PageAndSingleFieldSorterRequest } from "../types/Request";

type ProcessStatus = "CREATING" | "RUNNING" | "FINISH" | "DELETE";

export interface Process {
  id: number;
  name: string;
  sort: number;
  status: ProcessStatus;
  description: string;
  submitList: string;
  startTime: string;
  endSubmitTime: string;
  finishTime: string;
}

export const useProcess = (contestId?: number, processId?: number) => {
  const client = useHttp();
  return useQuery<Process>(
    ["process", { contestId, processId }],
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
    ["processes", { contestId }],
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
    useEditConfig(["processes", { contestId }])
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
    useEditConfig(["processes", { contestId }])
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
    useDeleteConfig(["processes", { contestId }])
  );
};
