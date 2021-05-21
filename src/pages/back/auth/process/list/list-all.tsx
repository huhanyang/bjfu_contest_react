import { Avatar, Button, List, Popconfirm } from "antd";
import { useDeleteProcess, useProcesses } from "../../../../../utils/process";
import React, { useState } from "react";
import { ProcessCreateModal } from "../create-modal";
import { ProcessEditModal } from "../edit-modal";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Process } from "../../../../../types/process";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import { ProcessPopover } from "../../../../../components/process-popover";

export const ContestProcessListAll = ({
  contestId,
  isCreator,
}: {
  contestId: number;
  isCreator: boolean;
}) => {
  const { data: processes, isLoading: isProcessesLoading } = useProcesses(
    Number(contestId)
  );
  const [editProcessId, setEditProcessId] = useState(
    undefined as number | undefined
  );
  const [processEditModalVisible, setProcessEditModalVisible] = useState(false);
  const [processCreateModalVisible, setProcessCreateModalVisible] = useState(
    false
  );
  const {
    mutateAsync: deleteProcess,
    isLoading: isProcessDeleteLoading,
  } = useDeleteProcess(Number(contestId));

  return (
    <>
      <List<Process>
        rowKey={(item) => String(item.id)}
        loading={isProcessesLoading}
        itemLayout="horizontal"
        dataSource={processes}
        renderItem={(item) => (
          <List.Item
            actions={
              isCreator
                ? [
                    <Button
                      type="link"
                      onClick={() => {
                        setEditProcessId(item.id);
                        setProcessEditModalVisible(true);
                      }}
                    >
                      编辑
                    </Button>,
                    <Popconfirm
                      title="确定要删除此流程么?"
                      onConfirm={() => {
                        deleteProcess({ processId: item.id });
                      }}
                      okText="删除"
                      cancelText="取消"
                    >
                      <Button type="link" loading={isProcessDeleteLoading}>
                        删除
                      </Button>
                    </Popconfirm>,
                  ]
                : []
            }
          >
            <List.Item.Meta
              avatar={
                item.status === "FINISH" ? (
                  <CheckCircleOutlined />
                ) : (
                  <LoadingOutlined />
                )
              }
              title={<ProcessPopover contestId={contestId} process={item} />}
              description={item.description}
            />
          </List.Item>
        )}
        footer={
          isCreator ? (
            <Button
              onClick={() => {
                setProcessCreateModalVisible(true);
              }}
            >
              创建新流程
            </Button>
          ) : (
            <></>
          )
        }
      />
      <ProcessCreateModal
        contestId={contestId}
        visible={processCreateModalVisible}
        setVisible={setProcessCreateModalVisible}
      />
      <ProcessEditModal
        contestId={contestId}
        processId={Number(editProcessId)}
        visible={processEditModalVisible}
        setVisible={setProcessEditModalVisible}
      />
    </>
  );
};
