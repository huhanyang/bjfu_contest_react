import { useAuth } from "../../../../../context/auth-context";
import { Button, Descriptions, Divider, List } from "antd";
import { useGroup } from "../../../../../utils/group";
import { useParams } from "react-router";
import { UserPopover } from "../../../../../components/user-popover";
import React from "react";
import { ContestPopover } from "../../../../../components/contest-popover";
import { ProcessPopover } from "../../../../../components/process-popover";

export const GroupInfo = () => {
  const { user } = useAuth();
  const { groupId } = useParams();

  const { data: groupInfo } = useGroup(Number(groupId));

  const CaptainOperates = () => {
    return (
      <>
        <Button>队长</Button>
        <Button>编辑</Button>
        <Button>解散</Button>
      </>
    );
  };

  const ContestCreatorOperates = () => {
    return (
      <>
        <Button>创建者</Button>
        <Button>编辑</Button>
        <Button>解散</Button>
      </>
    );
  };

  const GroupOperates = () => {
    if (groupInfo?.captain.id === user?.id) {
      return <CaptainOperates />;
    } else if (groupInfo?.contest.creator.id === user?.id) {
      return <ContestCreatorOperates />;
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
            <List.Item>
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

  // todo 队伍主页
  return (
    <>
      <GroupInfo />
      <Divider orientation="left">队员列表</Divider>
      <GroupMembersList />
      <Divider orientation="left">流程列表</Divider>
      <GroupProcessesList />
    </>
  );
};
