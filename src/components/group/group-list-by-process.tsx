import { useDemoteGroups, useProcess } from "../../utils/process";
import { Button, message, Popconfirm, Table } from "antd";
import { ContestProcessGroup } from "../../types/contest-process-group";
import { GroupPopover } from "../group-popover";
import { UserPopover } from "../user-popover";
import React from "react";

export const GroupListByProcess = ({
  contestId,
  processId,
}: {
  contestId: number;
  processId: number;
}) => {
  const { data: process, isLoading: isProcessLoading } = useProcess(
    contestId,
    processId
  );
  const {
    mutateAsync: demoteGroups,
    isLoading: isDemoteGroupsLoading,
  } = useDemoteGroups(processId);

  return (
    <>
      <Table<ContestProcessGroup>
        bordered
        scroll={{ x: "100%" }}
        rowKey="id"
        dataSource={process?.groups}
        loading={isProcessLoading}
      >
        <Table.Column<ContestProcessGroup>
          title="队伍名"
          key="name"
          render={(text, record) => (
            <GroupPopover contestId={contestId} group={record.group} />
          )}
        />
        <Table.Column<ContestProcessGroup>
          title="创建时间"
          key="createdTime"
          render={(text, record) => {
            return new Date(record.createdTime).toLocaleString();
          }}
        />
        <Table.ColumnGroup<ContestProcessGroup> title="队长">
          <Table.Column<ContestProcessGroup>
            title="姓名"
            key="captainName"
            render={(text, record) => (
              <UserPopover user={record.group.captain} />
            )}
          />
          <Table.Column<ContestProcessGroup>
            title="专业"
            dataIndex={["group", "captain", "major"]}
            key="captainMajor"
          />
        </Table.ColumnGroup>
        <Table.ColumnGroup<ContestProcessGroup> title="指导教师">
          <Table.Column<ContestProcessGroup>
            title="姓名"
            key="teacherName"
            render={(text, record) => (
              <UserPopover user={record.group.teacher} />
            )}
          />
          <Table.Column<ContestProcessGroup>
            title="学院"
            dataIndex={["group", "teacher", "college"]}
            key="captainCollege"
          />
        </Table.ColumnGroup>
        <Table.Column<ContestProcessGroup>
          title="操作"
          dataIndex="operate"
          key="operate"
          render={(text, record) => (
            <>
              <Popconfirm
                onConfirm={async () => {
                  try {
                    await demoteGroups({ groupIds: [record.group.id] });
                  } catch (e) {
                    message.error(e.message);
                  }
                }}
                title="确定要从此流程中删除此队伍么?"
                okText="删除"
                cancelText="取消"
              >
                <Button loading={isDemoteGroupsLoading}>删除队伍</Button>
              </Popconfirm>
            </>
          )}
        />
      </Table>
    </>
  );
};
