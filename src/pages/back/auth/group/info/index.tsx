import { useAuth } from "../../../../../context/auth-context";
import { Button, Descriptions, Divider, List, message, Popconfirm } from "antd";
import {
  useDeleteGroup,
  useGroup,
  useGroupJoinMember,
  useGroupKickMember,
  useTeacherJoinGroup,
  useTeacherQuitGroup,
} from "../../../../../utils/group";
import { useParams } from "react-router";
import { UserPopover } from "../../../../../components/user-popover";
import React, { useState } from "react";
import { ContestPopover } from "../../../../../components/contest-popover";
import { ProcessPopover } from "../../../../../components/process-popover";
import { GroupEditModal } from "../edit-modal";
import { useRegister } from "../../../../../utils/register";
import { useAllTeachers } from "../../../../../utils/teacher";

export const GroupInfo = () => {
  const { user } = useAuth();
  const { groupId } = useParams();

  const { data: groupInfo } = useGroup(Number(groupId));
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const {
    mutateAsync: deleteGroup,
    isLoading: isDeleteGroupLoading,
  } = useDeleteGroup();

  // 验证是否报名竞赛
  const { data: register } = useRegister(Number(groupInfo?.contest.id));
  // 验证是否为竞赛指导教师
  const { data: teachers } = useAllTeachers(Number(groupInfo?.contest.id));

  const {
    mutateAsync: joinGroup,
    isLoading: isJoinGroupLoading,
  } = useGroupJoinMember(Number(groupInfo?.contest.id));
  const {
    mutateAsync: kickMember,
    isLoading: isKickMemberLoading,
  } = useGroupKickMember(Number(groupInfo?.contest.id));
  const {
    mutateAsync: teacherJoinGroup,
    isLoading: isTeacherJoinGroupLoading,
  } = useTeacherJoinGroup(Number(groupInfo?.contest.id));
  const {
    mutateAsync: teacherQuitGroup,
    isLoading: isTeacherQuitGroupLoading,
  } = useTeacherQuitGroup(Number(groupInfo?.contest.id));

  const deleteGroupRequest = async () => {
    try {
      await deleteGroup({ groupId: Number(groupId) });
    } catch (e) {
      message.error(e.message);
    }
  };

  const joinGroupRequest = async () => {
    try {
      await joinGroup({ groupId: Number(groupId) });
    } catch (e) {
      message.error(e.message);
    }
  };

  const teacherJoinGroupRequest = async () => {
    try {
      await teacherJoinGroup({ groupId: Number(groupId) });
    } catch (e) {
      message.error(e.message);
    }
  };

  const teacherQuitGroupRequest = async () => {
    try {
      await teacherQuitGroup({ groupId: Number(groupId) });
    } catch (e) {
      message.error(e.message);
    }
  };

  const GroupCaptainOperates = () => {
    return (
      <>
        <Button
          onClick={() => {
            setIsEditModalVisible(true);
          }}
        >
          编辑
        </Button>
        <Button onClick={deleteGroupRequest}>解散</Button>
      </>
    );
  };

  const ContestCreatorOperates = () => {
    return (
      <>
        <GroupCaptainOperates />
        <ContestTeacherOperates />
      </>
    );
  };

  const ContestTeacherOperates = () => {
    if (groupInfo?.teacher?.id === user?.id) {
      return <Button onClick={teacherQuitGroupRequest}>退出指导</Button>;
    }
    return <Button onClick={teacherJoinGroupRequest}>成为指导</Button>;
  };

  const ContestRegisterOperates = () => {
    if (groupInfo?.members?.filter((member) => member.id === user?.id).length) {
      return (
        <Button
          onClick={async () => {
            try {
              await kickMember({
                groupId: Number(groupId),
                userAccount: String(user?.account),
              });
            } catch (e) {
              message.error(e.message);
            }
          }}
        >
          退出队伍
        </Button>
      );
    } else if (
      Number(groupInfo?.contest?.groupMemberCount) >
      Number(groupInfo?.members?.length)
    ) {
      return <Button onClick={joinGroupRequest}>加入队伍</Button>;
    }
    return <></>;
  };

  const GroupOperates = () => {
    if (groupInfo?.captain.id === user?.id) {
      return <GroupCaptainOperates />;
    } else if (groupInfo?.contest.creator.id === user?.id) {
      return <ContestCreatorOperates />;
    } else if (teachers?.filter((teacher) => teacher.id === user?.id).length) {
      return <ContestTeacherOperates />;
    } else if (register?.status === "SIGN_UP") {
      return <ContestRegisterOperates />;
    }
    return <></>;
  };

  const GroupInfo = () => {
    return (
      <>
        <Descriptions
          bordered
          layout="vertical"
          title={groupInfo?.contest.name + "-" + groupInfo?.name}
          extra={<GroupOperates />}
        >
          <Descriptions.Item label="竞赛信息">
            {<ContestPopover contest={groupInfo?.contest} />}
          </Descriptions.Item>
          <Descriptions.Item label="队伍名称">
            {groupInfo?.name}
          </Descriptions.Item>
          <Descriptions.Item label="队长">
            {<UserPopover user={groupInfo?.captain} />}
          </Descriptions.Item>
          <Descriptions.Item label="指导教师">
            {<UserPopover user={groupInfo?.teacher} />}
          </Descriptions.Item>
          {groupInfo ? (
            <Descriptions.Item label="创建时间">
              {new Date(groupInfo?.createdTime).toLocaleString()}
            </Descriptions.Item>
          ) : (
            <></>
          )}
          <Descriptions.Item span={2} label="队伍介绍">
            {groupInfo?.introduction}
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  };

  const GroupMembersList = () => {
    return (
      <>
        <List
          bordered
          itemLayout="horizontal"
          dataSource={groupInfo?.members}
          renderItem={(member) => (
            <List.Item
              actions={
                user?.id === groupInfo?.contest.creator.id ||
                user?.id === groupInfo?.captain.id
                  ? [
                      <Popconfirm
                        disabled={member.id === groupInfo?.captain.id}
                        title="确定要踢出此队员么?"
                        onConfirm={async () => {
                          try {
                            await kickMember({
                              groupId: Number(groupId),
                              userAccount: member.account,
                            });
                          } catch (e) {
                            message.error(e.message);
                          }
                        }}
                        okText="踢出"
                        cancelText="取消"
                      >
                        <Button
                          type="link"
                          loading={isKickMemberLoading}
                          disabled={member.id === groupInfo?.captain.id}
                        >
                          踢出
                        </Button>
                      </Popconfirm>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                title={<UserPopover user={member} />}
                description={
                  (member.id === groupInfo?.captain.id ? "队长 " : "队员 ") +
                  member.college +
                  member.major +
                  member.grade
                }
              />
            </List.Item>
          )}
        />
      </>
    );
  };

  const GroupProcessesList = () => {
    return (
      <>
        <List
          bordered
          itemLayout="horizontal"
          dataSource={groupInfo?.processes}
          renderItem={(member) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <ProcessPopover
                    contestId={groupInfo?.contest.id}
                    process={member.process}
                  />
                }
                description={
                  member.status + member.submitList + member.createdTime
                }
              />
            </List.Item>
          )}
        />
      </>
    );
  };

  return (
    <>
      <GroupInfo />
      <Divider orientation="left">队员列表</Divider>
      <GroupMembersList />
      <Divider orientation="left">流程列表</Divider>
      <GroupProcessesList />
      <GroupEditModal
        contestId={Number(groupInfo?.contest.id)}
        groupId={Number(groupId)}
        visible={isEditModalVisible}
        setVisible={setIsEditModalVisible}
      />
    </>
  );
};
