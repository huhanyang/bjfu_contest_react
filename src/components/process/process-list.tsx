import { useContest } from "../../utils/contest";
import React, { useState } from "react";
import { useDeleteProcess } from "../../utils/process";
import { Button, List, message, Popconfirm } from "antd";
import { Process } from "../../types/process";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { ProcessPopover } from "../process-popover";
import { CreateProcessModal } from "./create-process-modal";
import { EditProcessModal } from "./edit-process-modal";

export const ProcessList = ({
  contestId,
  isCreator,
}: {
  contestId: number;
  isCreator: boolean;
}) => {
  const { data: contestInfo, isLoading: isContestInfoLoading } = useContest(
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
        loading={isContestInfoLoading}
        itemLayout="horizontal"
        dataSource={contestInfo?.processes}
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
                      onConfirm={async () => {
                        try {
                          await deleteProcess({ processId: item.id });
                        } catch (e) {
                          message.error(e.message);
                        }
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
      <CreateProcessModal
        contestId={contestId}
        visible={processCreateModalVisible}
        setVisible={setProcessCreateModalVisible}
      />
      <EditProcessModal
        contestId={contestId}
        processId={Number(editProcessId)}
        visible={processEditModalVisible}
        setVisible={setProcessEditModalVisible}
      />
    </>
  );
};
