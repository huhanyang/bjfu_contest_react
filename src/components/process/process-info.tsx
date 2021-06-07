import { useAuth } from "../../context/auth-context";
import { generatePath, useNavigate } from "react-router";
import React, { useState } from "react";
import { useDeleteProcess, useProcess } from "../../utils/process";
import { Button, Descriptions, Divider, message, Popconfirm } from "antd";
import { ContestPopover } from "../contest-popover";
import { EditProcessModal } from "./edit-process-modal";
import { GroupListByProcess } from "../group/group-list-by-process";
import { ProcessPromoteGroup } from "./process-promote-group";
import { ProcessStatusSteps } from "./process-status-steps";
import { AddResourceModal } from "../resource/add-resource-modal";

export const ProcessInfo = ({
  contestId,
  processId,
}: {
  contestId: number;
  processId: number;
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processEditModalVisible, setProcessEditModalVisible] = useState(false);
  const {
    mutateAsync: deleteProcess,
    isLoading: isProcessDeleteLoading,
  } = useDeleteProcess(contestId);
  const [promoteGroupsModalVisible, setPromoteGroupsModalVisible] = useState(
    false
  );
  const [addResourceModalVisible, setAddResourceModalVisible] = useState(false);

  const { data: process } = useProcess(contestId, processId);

  const ProcessCreatorOperate = () => {
    return (
      <>
        <Button
          onClick={() => {
            setProcessEditModalVisible(true);
          }}
        >
          编辑
        </Button>
        <Button
          onClick={() => {
            setPromoteGroupsModalVisible(true);
          }}
        >
          队伍管理
        </Button>
        <AddResourceOperate />
        <Popconfirm
          title="确定要删除此流程么?"
          onConfirm={async () => {
            try {
              await deleteProcess({ processId }).then(() => {
                navigate(`/back/contest/contestInfo/${contestId}`, {
                  replace: true,
                });
              });
            } catch (e) {
              message.error(e.message);
            }
          }}
          okText="删除"
          cancelText="取消"
        >
          <Button loading={isProcessDeleteLoading}>删除</Button>
        </Popconfirm>
      </>
    );
  };

  const AddResourceOperate = () => {
    return (
      <Button
        onClick={() => {
          setAddResourceModalVisible(true);
        }}
      >
        上传文件
      </Button>
    );
  };

  const ProcessOperate = () => {
    return (
      <>
        <Button
          onClick={() => {
            navigate(
              generatePath("/back/resource/list/:type/:targetId", {
                type: "PROCESS",
                targetId: String(processId),
              }),
              { replace: true }
            );
          }}
        >
          文件列表
        </Button>

        {process?.contest.creator.id === user?.id ? (
          <ProcessCreatorOperate />
        ) : (
          <></>
        )}
      </>
    );
  };

  const ProcessInfo = () => {
    return (
      <>
        <Descriptions
          bordered
          layout="vertical"
          title={
            process?.contest.name + "-" + process?.sort + "-" + process?.name
          }
          extra={<ProcessOperate />}
        >
          <Descriptions.Item label="竞赛名称">
            {<ContestPopover contest={process?.contest} />}
          </Descriptions.Item>
          <Descriptions.Item label="流程名称">
            {process?.name}
          </Descriptions.Item>
          <Descriptions.Item label="流程描述">
            {process?.description}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="流程状态">
            <ProcessStatusSteps process={process} />
          </Descriptions.Item>
          {process?.submitList ? (
            <Descriptions.Item label="需要提交的内容">
              {/*{JSON.parse(process?.submitList).map((item:any)=>{return (<>item.name+":"+item.value</>);})}*/}
            </Descriptions.Item>
          ) : (
            <></>
          )}
          {process?.endSubmitTime ? (
            <Descriptions.Item label="停止提交的时间">
              {new Date(process?.endSubmitTime).toLocaleString()}
            </Descriptions.Item>
          ) : (
            <></>
          )}
          {process?.startTime ? (
            <Descriptions.Item label="开始时间">
              {new Date(process?.startTime).toLocaleString()}
            </Descriptions.Item>
          ) : (
            <></>
          )}
          {process?.finishTime ? (
            <Descriptions.Item label="结束时间">
              {new Date(process?.finishTime).toLocaleString()}
            </Descriptions.Item>
          ) : (
            <></>
          )}
        </Descriptions>
      </>
    );
  };

  return (
    <>
      <ProcessInfo />
      <Divider orientation="left">流程中的队伍</Divider>
      <GroupListByProcess contestId={contestId} processId={processId} />
      {process?.contest.creator.id === user?.id ? (
        <>
          <EditProcessModal
            contestId={contestId}
            processId={processId}
            visible={processEditModalVisible}
            setVisible={setProcessEditModalVisible}
          />
          <ProcessPromoteGroup
            contestId={contestId}
            processId={processId}
            visible={promoteGroupsModalVisible}
            setVisible={setPromoteGroupsModalVisible}
          />
          <AddResourceModal
            targetId={processId}
            type={"PROCESS"}
            visible={addResourceModalVisible}
            setVisible={setAddResourceModalVisible}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
