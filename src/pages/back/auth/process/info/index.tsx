import React, { useEffect, useState } from "react";
import {
  Button,
  Descriptions,
  Divider,
  message,
  Popconfirm,
  Steps,
} from "antd";
import { useParams, useNavigate } from "react-router";
import { useDeleteProcess, useProcess } from "../../../../../utils/process";
import { useAuth } from "../../../../../context/auth-context";
import { ContestPopover } from "../../../../../components/contest-popover";
import {
  ExperimentOutlined,
  FormOutlined,
  LoadingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Process, ProcessStatus } from "../../../../../types/process";
import { ProcessEditModal } from "../edit-modal";
import { GroupListAllByProcess } from "../../group/list/list-all-by-process";
import { ProcessPromoteGroups } from "../../group/promote/promote-groups";

export const ProcessInfo = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { contestId, processId } = useParams();
  const [processEditModalVisible, setProcessEditModalVisible] = useState(false);
  const {
    mutateAsync: deleteProcess,
    isLoading: isProcessDeleteLoading,
  } = useDeleteProcess(Number(contestId));
  const [promoteGroupsModalVisible, setPromoteGroupsModalVisible] = useState(
    false
  );

  const { data: process, isLoading: isProcessLoading } = useProcess(
    Number(contestId),
    Number(processId)
  );

  const ProcessStatusSteps = ({
    process,
  }: {
    process: Process | undefined;
  }) => {
    type StepStatus = "finish" | "process" | "wait";
    const stepStatusArray: StepStatus[][] = [
      ["process", "wait", "wait", "wait"],
      ["finish", "process", "wait", "wait"],
      ["finish", "finish", "process", "wait"],
      ["finish", "finish", "finish", "finish"],
    ];
    const statusWeight: ProcessStatus[] = [
      "CREATING",
      "RUNNING",
      "FINISH",
      "DELETE",
    ];
    return (
      <>
        {process ? (
          <Steps direction="vertical" size="small">
            <Steps.Step
              status={stepStatusArray[statusWeight.indexOf(process.status)][0]}
              title="流程创建"
              icon={
                stepStatusArray[statusWeight.indexOf(process.status)][0] ===
                "process" ? (
                  <LoadingOutlined />
                ) : (
                  <FormOutlined />
                )
              }
            />
            <Steps.Step
              status={stepStatusArray[statusWeight.indexOf(process.status)][1]}
              title="流程中"
              icon={
                stepStatusArray[statusWeight.indexOf(process.status)][1] ===
                "process" ? (
                  <LoadingOutlined />
                ) : (
                  <SolutionOutlined />
                )
              }
            />
            <Steps.Step
              status={stepStatusArray[statusWeight.indexOf(process.status)][2]}
              title="流程结束"
              icon={<ExperimentOutlined />}
            />
          </Steps>
        ) : (
          <></>
        )}
      </>
    );
  };

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
        <Popconfirm
          title="确定要删除此流程么?"
          onConfirm={async () => {
            try {
              await deleteProcess({ processId: Number(processId) }).then(() => {
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
        <Button
          onClick={() => {
            setPromoteGroupsModalVisible(true);
          }}
        >
          队伍管理
        </Button>
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
          extra={
            process?.contest.creator.id === user?.id ? (
              <ProcessCreatorOperate />
            ) : (
              <></>
            )
          }
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
      <GroupListAllByProcess
        contestId={Number(contestId)}
        processId={Number(processId)}
      />
      <ProcessEditModal
        contestId={Number(contestId)}
        processId={Number(processId)}
        visible={processEditModalVisible}
        setVisible={setProcessEditModalVisible}
      />
      <ProcessPromoteGroups
        contestId={Number(contestId)}
        processId={Number(processId)}
        visible={promoteGroupsModalVisible}
        setVisible={setPromoteGroupsModalVisible}
      />
    </>
  );
};
