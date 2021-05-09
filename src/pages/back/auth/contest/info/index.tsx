import React, { useState } from "react";
import { Link } from "react-router-dom";
import { generatePath, useNavigate, useParams } from "react-router";
import { Button, Descriptions, Divider, List, message, Popconfirm } from "antd";
import { useAuth } from "../../../../../context/auth-context";
import { useContest } from "../../../../../utils/contest";
import { PageLoading } from "../../../../../components/lib";
import { ContestEditModal } from "./edit-modal";
import { useHttp } from "../../../../../utils/http";
import { useAsync } from "../../../../../utils/use-async";
import {
  Process,
  useDeleteProcess,
  useProcesses,
} from "../../../../../utils/process";
import { ProcessCreateModal } from "../../process/info/create-modal";
import { ProcessEditModal } from "../../process/info/edit-modal";

export const ContestInfo = () => {
  const { user } = useAuth();
  const { contestId } = useParams();
  const { data: contest, isLoading } = useContest(Number(contestId));
  const [contestEditModalVisible, setContestEditModalVisible] = useState(false);

  const [editProcessId, setEditProcessId] = useState(
    undefined as number | undefined
  );
  const [processCreateModalVisible, setProcessCreateModalVisible] = useState(
    false
  );
  const [processEditModalVisible, setProcessEditModalVisible] = useState(false);
  const { data: processes, isLoading: isProcessesLoading } = useProcesses(
    Number(contestId)
  );
  const {
    mutateAsync: deleteProcess,
    isLoading: isProcessDeleteLoading,
  } = useDeleteProcess(Number(contestId));
  const navigate = useNavigate();
  const client = useHttp();
  const { run } = useAsync(undefined, { throwOnError: true });

  const Operate = ({ id }: { id: number }) => {
    return (
      <>
        <Button
          onClick={() => {
            setContestEditModalVisible(!contestEditModalVisible);
          }}
        >
          编辑信息
        </Button>
        <Popconfirm
          onConfirm={async () => {
            try {
              await run(
                client("contest/delete", {
                  data: { contestId: id },
                  method: "DELETE",
                })
              ).then(() => {
                navigate("../", { replace: true });
              });
            } catch (e) {
              message.error(e.message);
            }
          }}
          title="确定要删除此竞赛么?"
          okText="删除"
          cancelText="取消"
        >
          <Button>删除竞赛</Button>
        </Popconfirm>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          <Descriptions
            title={contest?.name}
            extra={
              user?.id === contest?.creator.id ? (
                <Operate id={Number(contest?.id)} />
              ) : (
                <></>
              )
            }
          >
            <Descriptions.Item label="竞赛名称">
              {contest?.name}
            </Descriptions.Item>
            <Descriptions.Item label="创建人">
              <Link
                to={generatePath("/back/userInfo/:userId", {
                  userId: String(contest?.creator.id),
                })}
              >
                {contest?.creator.name}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="竞赛简介">
              {contest?.summary}
            </Descriptions.Item>
            <Descriptions.Item label="竞赛描述">
              {contest?.description}
            </Descriptions.Item>
            <Descriptions.Item label="竞赛状态">
              {contest?.status}
            </Descriptions.Item>
            <Descriptions.Item label="队伍人数上限">
              {contest?.groupMemberCount}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">竞赛流程</Divider>
          <List<Process>
            loading={isProcessesLoading}
            itemLayout="horizontal"
            dataSource={processes}
            renderItem={(item) => (
              <List.Item
                actions={[
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
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
            footer={
              <Button
                onClick={() => {
                  setProcessCreateModalVisible(true);
                }}
              >
                创建新流程
              </Button>
            }
          />
        </>
      )}
      {contest?.creator.id === user?.id ? (
        <>
          <ContestEditModal
            contestId={Number(contest?.id)}
            visible={contestEditModalVisible}
            setVisible={setContestEditModalVisible}
          />
          <ProcessCreateModal
            contestId={Number(contest?.id)}
            visible={processCreateModalVisible}
            setVisible={setProcessCreateModalVisible}
          />
          <ProcessEditModal
            contestId={Number(contest?.id)}
            processId={Number(editProcessId)}
            visible={processEditModalVisible}
            setVisible={setProcessEditModalVisible}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
