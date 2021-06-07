import { useHttp } from "utils/http";
import { useMutation, useQuery } from "react-query";
import { useNoOpsConfig } from "utils/use-optimistic-options";
import {
  Resource,
  ResourceContentType,
  ResourceDownloadInfo,
  ResourceType,
} from "../types/resource";
import { message } from "antd";

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
    (params: ResourceEditRequest) =>
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

export interface ResourceAddRequest {
  targetId: number;
  type: ResourceType;
  contentType: ResourceContentType;
  fileName: string;
  classification: string;
  file: File;
}

export const useAddResource = () => {
  const client = useHttp();
  return useMutation((params: ResourceAddRequest) => {
    const formData = new FormData();
    formData.append("targetId", String(params.targetId));
    formData.append("type", params.type);
    formData.append("contentType", params.contentType);
    formData.append("fileName", params.fileName);
    formData.append("classification", params.classification);
    formData.append("file", params.file);
    return client(`resource/upload`, {
      method: "POST",
      data: formData,
      isFile: true,
    });
  }, useNoOpsConfig(["resource"]));
};

const appUrl = process.env.REACT_APP_URL;
const ossUrl = process.env.REACT_APP_OSS_URL;

export const useGetResourceDownloadInfo = () => {
  const client = useHttp();
  return useMutation(
    (params: { resourceId: number }) =>
      client(`resource/getDownloadInfo`, {
        data: params,
      }).then((downLoadInfo: ResourceDownloadInfo) => {
        if (downLoadInfo.url) {
          const link = document.createElement("a");
          if (appUrl && ossUrl) {
            link.href = downLoadInfo.url.replace(ossUrl, appUrl);
          } else {
            link.href = downLoadInfo.url;
          }
          link.download = downLoadInfo.fileName;
          link.click();
        } else {
          message.error("文件下载失败！");
          console.error("getApplyJobDownloadFileInfo not return url!");
        }
      }),
    useNoOpsConfig(["resource"])
  );
};
