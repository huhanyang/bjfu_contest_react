import { useAllGroupsByMember } from "../../utils/group";
import { Table } from "antd";
import { Group } from "../../types/group";
import { GroupPopover } from "../group-popover";
import { ContestPopover } from "../contest-popover";
import { UserPopover } from "../user-popover";
import React from "react";

export const GroupListJoined = () => {
  const { data: groups, isLoading: isGroupsLoading } = useAllGroupsByMember();

  return (
    <>
      <Table<Group>
        bordered
        scroll={{ x: "100%" }}
        rowKey="id"
        dataSource={groups}
        loading={isGroupsLoading}
      >
        <Table.Column<Group>
          title="队伍名"
          dataIndex="name"
          key="name"
          render={(text, record) => (
            <GroupPopover contestId={record.contest.id} group={record} />
          )}
        />
        <Table.Column<Group>
          title="创建时间"
          dataIndex="createdTime"
          key="createdTime"
          render={(text, record) => {
            return new Date(record.createdTime).toLocaleString();
          }}
        />
        <Table.Column<Group>
          title="竞赛"
          dataIndex={["captain", "name"]}
          key="captainName"
          render={(text, record) => <ContestPopover contest={record.contest} />}
        />
        <Table.Column<Group>
          title="队长"
          dataIndex={["captain", "name"]}
          key="captainName"
          render={(text, record) => <UserPopover user={record.captain} />}
        />
        <Table.Column<Group>
          title="指导教师"
          dataIndex={["teacher", "name"]}
          key="teacherName"
          render={(text, record) => <UserPopover user={record.teacher} />}
        />
        <Table.Column<Group>
          title="操作"
          dataIndex="operate"
          key="operate"
          render={(text, record) => <>233</>}
        />
      </Table>
    </>
  );
};
