import { useHttp } from "utils/http";
import { useMutation, useQuery } from "react-query";
import { useNoOpsConfig } from "utils/use-optimistic-options";
import { Group } from "../types/group";

export const useGroup = (groupId?: number) => {
  const client = useHttp();
  return useQuery<Group>(
    ["group", "info", { groupId }],
    () => client(`contest/group/getInfo`, { data: { groupId } }),
    {
      enabled: Boolean(groupId),
    }
  );
};

export const useAllGroupsByContest = (contestId?: number) => {
  const client = useHttp();
  return useQuery<Group[]>(
    ["group", "all-groups-by-contest", { contestId }],
    () =>
      client(`contest/group/listAllByContest`, {
        data: {
          contestId: contestId,
        },
      }),
    {
      enabled: Boolean(contestId),
    }
  );
};

export const useAllGroupsByMember = () => {
  const client = useHttp();
  return useQuery<Group[]>(["group", "all-groups-by-member"], () =>
    client(`contest/group/listAllByMember`)
  );
};

export interface GroupCreateRequest {
  contestId: number;
  name: string;
  introduction: string;
}

export const useCreateGroup = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<GroupCreateRequest>) =>
      client(`contest/group/create`, {
        method: "POST",
        data: params,
      }),
    useNoOpsConfig(["group", "all-groups-by-contest", { contestId }])
  );
};

export interface GroupEditRequest {
  groupId: number;
  name: string;
  introduction: string;
}

export const useEditGroup = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<GroupEditRequest>) =>
      client(`contest/group/edit`, {
        method: "POST",
        data: { ...params, contestId },
      }),
    useNoOpsConfig(["group"])
  );
};

export const useDeleteGroup = (contestId?: number) => {
  const client = useHttp();
  return useMutation(
    (params: { groupId: number }) =>
      client(`contest/group/delete`, {
        method: "DELETE",
        data: { ...params, contestId },
      }),
    useNoOpsConfig(["group"])
  );
};
