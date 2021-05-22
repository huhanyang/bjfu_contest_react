import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  Descriptions,
  Divider,
  message,
  Popconfirm,
  Steps,
} from "antd";
import {
  FormOutlined,
  SmileOutlined,
  SolutionOutlined,
  LoadingOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../../../context/auth-context";
import { useContest, useDeleteContest } from "../../../../../utils/contest";
import { PageLoading } from "../../../../../components/lib";
import { ContestEditModal } from "../edit-modal";
import { ContestRegisterListAll } from "../../register/list/list-all";
import {
  useCreateRegister,
  useDeleteRegister,
  useRegister,
} from "../../../../../utils/register";
import { ContestProcessListAll } from "../../process/list/list-all";
import { UserPopover } from "../../../../../components/user-popover";
import { TeacherListAll } from "../../teacher/list/list-all";
import { GroupListAllByContest } from "../../group/list/list-all-by-contest";
import { Contest, ContestStatus } from "../../../../../types/contest";

export const ContestInfo = () => {
  const { user } = useAuth();
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [contestEditModalVisible, setContestEditModalVisible] = useState(false);
  const { data: contest, isLoading } = useContest(Number(contestId));
  const { data: register } = useRegister(Number(contestId));
  const {
    mutateAsync: deleteContest,
    isLoading: isDeleteContestLoading,
  } = useDeleteContest();
  const {
    mutateAsync: createRegister,
    isLoading: isCreateRegisterLoading,
  } = useCreateRegister(Number(contestId));
  const {
    mutateAsync: deleteRegister,
    isLoading: isDeleteRegisterLoading,
  } = useDeleteRegister(Number(contestId));

  const Operate = () => {
    if (user?.id === contest?.creator.id) {
      return <CreatorOperate />;
    } else if (user?.type === "STUDENT") {
      return <StudentOperate />;
    } else {
      return <></>;
    }
  };
  const CreatorOperate = () => {
    return (
      <>
        <Button
          onClick={() => {
            setContestEditModalVisible(true);
          }}
        >
          编辑信息
        </Button>
        <Popconfirm
          onConfirm={async () => {
            try {
              await deleteContest(Number(contestId)).then(() => {
                navigate("/back/contest/listCreated", { replace: true });
              });
            } catch (e) {
              message.error(e.message);
            }
          }}
          title="确定要删除此竞赛么?"
          okText="删除"
          cancelText="取消"
        >
          <Button loading={isDeleteContestLoading}>删除竞赛</Button>
        </Popconfirm>
      </>
    );
  };
  const StudentOperate = () => {
    return (
      <>
        {contest?.status === "REGISTERING" ? (
          <>
            {register?.status === "SIGN_UP" ? (
              <Popconfirm
                onConfirm={async () => {
                  try {
                    await deleteRegister({
                      contestId: Number(contestId),
                      deleteUserAccount: String(user?.account),
                    });
                  } catch (e) {
                    message.error(e.message);
                  }
                }}
                title="确定要取消报名么?"
                okText="取消报名"
                cancelText="不取消"
              >
                <Button loading={isDeleteRegisterLoading}>取消报名</Button>
              </Popconfirm>
            ) : (
              <Button
                onClick={async () => {
                  try {
                    await createRegister({ contestId: Number(contestId) });
                  } catch (e) {
                    message.error(e.message);
                  }
                }}
                loading={isCreateRegisterLoading}
              >
                报名
              </Button>
            )}
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  const ContestStatusSteps = ({
    contest,
  }: {
    contest: Contest | undefined;
  }) => {
    type StepStatus = "finish" | "process" | "wait";
    const stepStatusArray: StepStatus[][] = [
      ["process", "wait", "wait", "wait"],
      ["finish", "process", "wait", "wait"],
      ["finish", "finish", "process", "wait"],
      ["finish", "finish", "finish", "finish"],
    ];
    const statusWeight: ContestStatus[] = [
      "CREATING",
      "REGISTERING",
      "RUNNING",
      "FINISH",
    ];
    return (
      <>
        {contest ? (
          <Steps direction="vertical" size="small">
            <Steps.Step
              status={stepStatusArray[statusWeight.indexOf(contest.status)][0]}
              title="竞赛创建"
              icon={
                stepStatusArray[statusWeight.indexOf(contest.status)][0] ===
                "process" ? (
                  <LoadingOutlined />
                ) : (
                  <FormOutlined />
                )
              }
            />
            <Steps.Step
              status={stepStatusArray[statusWeight.indexOf(contest.status)][1]}
              title="报名组队"
              icon={
                stepStatusArray[statusWeight.indexOf(contest.status)][1] ===
                "process" ? (
                  <LoadingOutlined />
                ) : (
                  <SolutionOutlined />
                )
              }
            />
            <Steps.Step
              status={stepStatusArray[statusWeight.indexOf(contest.status)][2]}
              title="比赛流程"
              icon={
                stepStatusArray[statusWeight.indexOf(contest.status)][2] ===
                "process" ? (
                  <LoadingOutlined />
                ) : (
                  <ExperimentOutlined />
                )
              }
            />
            <Steps.Step
              status={stepStatusArray[statusWeight.indexOf(contest.status)][3]}
              title="比赛结束"
              icon={<SmileOutlined />}
            />
          </Steps>
        ) : (
          <></>
        )}
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
            layout="vertical"
            bordered
            title={contest?.name}
            extra={<Operate />}
          >
            <Descriptions.Item label="竞赛名称">
              {contest?.name}
            </Descriptions.Item>
            <Descriptions.Item label="创建人">
              <UserPopover user={contest?.creator} />
            </Descriptions.Item>
            <Descriptions.Item label="竞赛简介">
              {contest?.summary}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="竞赛状态">
              <ContestStatusSteps contest={contest} />
            </Descriptions.Item>
            <Descriptions.Item label="队伍人数上限">
              {contest?.groupMemberCount}
            </Descriptions.Item>
            <Descriptions.Item label="指导教师">
              <TeacherListAll
                contestId={Number(contestId)}
                isCreator={user?.id === contest?.creator.id}
              />
            </Descriptions.Item>
            <Descriptions.Item label="竞赛描述">
              {contest?.description}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">竞赛流程</Divider>
          <ContestProcessListAll
            contestId={Number(contestId)}
            isCreator={user?.id === contest?.creator.id}
          />

          <Divider orientation="left">报名人数</Divider>
          <ContestRegisterListAll
            contestId={Number(contest?.id)}
            isCreator={contest?.creator.id === user?.id}
          />

          <Divider orientation="left">竞赛队伍</Divider>
          <GroupListAllByContest
            contestId={Number(contestId)}
            isCreator={contest?.creator.id === user?.id}
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
        </>
      ) : (
        <></>
      )}
    </>
  );
};
