import { useAuth } from "../../context/auth-context";
import { generatePath, useNavigate } from "react-router";
import React, { useState } from "react";
import { useContest, useDeleteContest } from "../../utils/contest";
import {
  useCreateRegister,
  useDeleteRegister,
  useRegister,
} from "../../utils/register";
import { Button, Descriptions, Divider, message, Popconfirm } from "antd";
import { PageLoading } from "../lib";
import { UserPopover } from "../user-popover";
import { ContestStatusSteps } from "./contest-status-steps";
import { ContestTeacherMenus } from "./contest-teacher-menus";
import { EditContestModal } from "./edit-contest-modal";
import { ProcessList } from "../process/process-list";
import { UserListRegistered } from "../user/user-list-registered";
import { GroupListByContest } from "../group/group-list-by-contest";
import { AddResourceModal } from "../resource/add-resource-modal";

export const ContestInfo = ({ contestId }: { contestId: number }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contestEditModalVisible, setContestEditModalVisible] = useState(false);
  const [addResourceModalVisible, setAddResourceModalVisible] = useState(false);
  const { data: contest, isLoading } = useContest(contestId);
  const { data: register } = useRegister(contestId);
  const {
    mutateAsync: deleteContest,
    isLoading: isDeleteContestLoading,
  } = useDeleteContest();
  const {
    mutateAsync: createRegister,
    isLoading: isCreateRegisterLoading,
  } = useCreateRegister(contestId);
  const {
    mutateAsync: deleteRegister,
    isLoading: isDeleteRegisterLoading,
  } = useDeleteRegister(contestId);

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
            setAddResourceModalVisible(true);
          }}
        >
          上传文件
        </Button>
        <Button
          onClick={() => {
            navigate(
              generatePath("/back/resource/list/:type/:targetId", {
                type: "CONTEST",
                targetId: String(contestId),
              }),
              { replace: true }
            );
          }}
        >
          文件列表
        </Button>
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
              await deleteContest(contestId).then(() => {
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
                      contestId,
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
                    await createRegister({ contestId });
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
              <ContestTeacherMenus
                contestId={contestId}
                isCreator={user?.id === contest?.creator.id}
              />
            </Descriptions.Item>
            <Descriptions.Item label="竞赛描述">
              {contest?.description}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">竞赛流程</Divider>
          <ProcessList
            contestId={contestId}
            isCreator={user?.id === contest?.creator.id}
          />

          <Divider orientation="left">报名人数</Divider>
          <UserListRegistered
            contestId={Number(contest?.id)}
            isCreator={contest?.creator.id === user?.id}
          />

          <Divider orientation="left">竞赛队伍</Divider>
          <GroupListByContest
            contestId={contestId}
            isCreator={contest?.creator.id === user?.id}
          />
        </>
      )}
      {contest?.creator.id === user?.id ? (
        <EditContestModal
          contestId={Number(contest?.id)}
          visible={contestEditModalVisible}
          setVisible={setContestEditModalVisible}
        />
      ) : (
        <></>
      )}
      {contest?.creator.id === user?.id ||
      contest?.teachers?.filter((teacher) => user?.id === teacher.id).length ? (
        <AddResourceModal
          targetId={contestId}
          type={"CONTEST"}
          visible={addResourceModalVisible}
          setVisible={setAddResourceModalVisible}
        />
      ) : (
        <></>
      )}
    </>
  );
};
