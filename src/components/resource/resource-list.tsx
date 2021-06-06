import { useParams } from "react-router";
import {
  useDeleteResource,
  useGetResourceDownloadInfo,
  useResources,
} from "../../utils/resource";
import { Resource, ResourceType } from "../../types/resource";
import { Button, message, Popconfirm, Table } from "antd";
import { UserPopover } from "../user-popover";
import React from "react";

export const ResourceList = () => {
  const { type, targetId } = useParams();
  const { data: resources, isLoading: isResourcesLoading } = useResources(
    type as ResourceType,
    Number(targetId)
  );
  const {
    mutateAsync: deleteResource,
    isLoading: isDeleteLoading,
  } = useDeleteResource();
  const {
    mutateAsync: getDownloadInfo,
    isLoading: isDownloadInfoLoading,
  } = useGetResourceDownloadInfo();

  const downloadFileHandler = async (resourceId: number) => {
    try {
      await getDownloadInfo({ resourceId }).then((downLoadInfo) => {
        //todo 解决OSS下文件跨域问题 对url修改
        const link = document.createElement("a");
        link.href = downLoadInfo.url;
        link.download = downLoadInfo.fileName;
        link.click();
      });
    } catch (e) {
      message.error(e.message);
    }
  };

  const deleteResourceHandler = async (resourceId: number) => {
    try {
      await deleteResource({ resourceId });
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Table<Resource>
        dataSource={resources}
        rowKey="id"
        bordered={true}
        loading={isResourcesLoading}
        scroll={{ x: "100%" }}
      >
        <Table.Column<Resource>
          key="classification"
          title="分类名"
          dataIndex="classification"
        />
        <Table.Column<Resource>
          key="fileName"
          title="文件名"
          dataIndex="fileName"
        />
        <Table.Column<Resource>
          key="creator"
          title="创建人"
          render={(text, record) => <UserPopover user={record.creator} />}
        />
        <Table.Column<Resource>
          key="createdTime"
          title="创建时间"
          render={(text, record) =>
            new Date(record.createdTime).toLocaleString()
          }
        />
        <Table.Column<Resource>
          key="operate"
          title="操作"
          render={(text, record) => {
            return (
              <>
                <Button
                  loading={isDownloadInfoLoading}
                  onClick={() => {
                    downloadFileHandler(record.id);
                  }}
                >
                  下载
                </Button>
                <Popconfirm
                  onConfirm={() => {
                    deleteResourceHandler(record.id);
                  }}
                  title="确定要删除此文件么?"
                  okText="删除"
                  cancelText="取消"
                >
                  <Button loading={isDeleteLoading}>删除</Button>
                </Popconfirm>
              </>
            );
          }}
        />
      </Table>
    </>
  );
};
