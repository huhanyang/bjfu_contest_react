import { useHttp } from "utils/http";
import { useMutation, useQuery } from "react-query";
import { useNoOpsConfig } from "utils/use-optimistic-options";
import {
  Resource,
  ResourceDownloadInfo,
  ResourceType,
} from "../types/resource";

export const useResources = (type: ResourceType, targetId: number) => {
  const client = useHttp();
  return useQuery<Resource[]>(
    ["resource", "list-all", "info", type, targetId],
    () => client(`resource/listAllByTarget`, { data: { type, targetId } }),
    {
      enabled: Boolean(type) && Boolean(targetId),
    }
  );
};

export interface ResourceEditRequest {
  resourceId: number;
  fileName: string;
  classification: string;
}

export const useEditResource = () => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ResourceEditRequest>) =>
      client(`resource/edit`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["resource"])
  );
};

export const useDeleteResource = () => {
  const client = useHttp();
  return useMutation(
    (params: { resourceId: number }) =>
      client(`resource/delete`, {
        method: "DELETE",
        data: params,
      }),
    useNoOpsConfig(["resource"])
  );
};

export interface ResourceAddInContestRequest {
  contestId: number;
  fileName: string;
  classification: string;
  file: any;
}

export const useAddResourceInContest = () => {
  const client = useHttp();
  return useMutation((params: Partial<ResourceAddInContestRequest>) => {
    const formData = new FormData();
    formData.append("contestId", String(params.contestId));
    formData.append("fileName", String(params.fileName));
    formData.append("classification", String(params.classification));
    // @ts-ignore
    formData.append("file", params.file);
    return client(`contest/addResource`, {
      method: "POST",
      data: formData,
      isFile: true,
    });
  }, useNoOpsConfig(["resource"]));
};

export const useGetResourceDownloadInfo = () => {
  const client = useHttp();
  return useMutation(
    (params: { resourceId: number }) =>
      client(`resource/getDownloadInfo`, {
        data: params,
      }).then((downLoadInfo: ResourceDownloadInfo) => downLoadInfo),
    useNoOpsConfig(["resource"])
  );
};
