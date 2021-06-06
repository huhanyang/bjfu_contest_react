import { useContest } from "../../utils/contest";
import { useRegister } from "../../utils/register";
import React, { useState } from "react";
import { useDeleteGroup } from "../../utils/group";
import { Button, message, Table } from "antd";
import { Group } from "../../types/group";
import { GroupPopover } from "../group-popover";
import { UserPopover } from "../user-popover";
import { CreateGroupModal } from "./create-group-modal";
import { EditGroupModal } from "./edit-group-modal";

export const GroupListByContest = ({
  contestId,
  isCreator,
}: {
  contestId: number;
  isCreator: boolean | undefined;
}) => {
  const { data: contestInfo, isLoading: isContestInfoLoading } = useContest(
    Number(contestId)
  );

  const { data: register } = useRegister(contestId);
  const [createGroupVisible, setCreateGroupVisible] = useState(false);
  const [editGroupVisible, setEditGroupVisible] = useState(false);
  const [editGroupId, setEditGroupId] = useState<number | undefined>(undefined);
  const {
    mutateAsync: deleteGroup,
    isLoading: isDeleteGroupLoading,
  } = useDeleteGroup(contestId);

  const RegisteredStudentOperate = () => {
    return (
      <>
        <Button
          onClick={() => {
            setCreateGroupVisible(true);
          }}
        >
          创建队伍
        </Button>
      </>
    );
  };

  return (
    <>
      <Table<Group>
        bordered
        scroll={{ x: "100%" }}
        rowKey="id"
        dataSource={contestInfo?.groups}
        loading={isContestInfoLoading}
        title={() => (
          <>
            {register?.status === "SIGN_UP" ? (
              <RegisteredStudentOperate />
            ) : (
              <></>
            )}
          </>
        )}
      >
        <Table.Column<Group>
          title="队伍名"
          dataIndex="name"
          key="name"
          render={(text, record) => (
            <GroupPopover contestId={contestId} group={record} />
          )}
        />
        <Table.Column<Group>
          title="介绍"
          dataIndex="introduction"
          key="introduction"
        />
        <Table.Column<Group>
          title="创建时间"
          dataIndex="createdTime"
          key="createdTime"
          render={(text, record) => {
            return new Date(record.createdTime).toLocaleString();
          }}
        />
        <Table.ColumnGroup<Group> title="队长">
          <Table.Column<Group>
            title="姓名"
            dataIndex={["captain", "name"]}
            key="captainName"
            render={(text, record) => <UserPopover user={record.captain} />}
          />
          <Table.Column<Group>
            title="专业"
            dataIndex={["captain", "major"]}
            key="captainMajor"
          />
        </Table.ColumnGroup>
        <Table.ColumnGroup<Group> title="指导教师">
          <Table.Column<Group>
            title="姓名"
            dataIndex={["teacher", "name"]}
            key="teacherName"
            render={(text, record) => <UserPopover user={record.teacher} />}
          />
          <Table.Column<Group>
            title="学院"
            dataIndex={["teacher", "college"]}
            key="captainCollege"
          />
        </Table.ColumnGroup>
        {isCreator ? (
          <Table.Column<Group>
            title="操作"
            dataIndex="operate"
            key="operate"
            render={(text, record) => (
              <>
                <Button
                  onClick={() => {
                    setEditGroupId(record.id);
                    setEditGroupVisible(true);
                  }}
                >
                  编辑信息
                </Button>
                <Button
                  loading={isDeleteGroupLoading}
                  onClick={async () => {
                    try {
                      await deleteGroup({ groupId: record.id });
                    } catch (e) {
                      message.error(e.message);
                    }
                  }}
                >
                  解散队伍
                </Button>
              </>
            )}
          />
        ) : (
          <></>
        )}
      </Table>
      {register?.status === "SIGN_UP" ? (
        <CreateGroupModal
          contestId={contestId}
          visible={createGroupVisible}
          setVisible={setCreateGroupVisible}
        />
      ) : (
        <></>
      )}
      <EditGroupModal
        contestId={contestId}
        groupId={Number(editGroupId)}
        visible={editGroupVisible}
        setVisible={setEditGroupVisible}
      />
    </>
  );
};
