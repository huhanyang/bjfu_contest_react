import { useAllRegisteredContests } from "../../../../../utils/register";
import React from "react";
import { Table } from "antd";
import { UserPopover } from "../../../../../components/user-popover";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import {
  ContestRegister,
  getContestRegisterStatusInfo,
} from "../../../../../types/contest-register";
import { ContestPopover } from "../../../../../components/contest-popover";

export const RegisterListAllRegisteredContests = () => {
  const {
    data: contests,
    isLoading: contestsIsLoading,
  } = useAllRegisteredContests();

  return (
    <>
      <Table<ContestRegister>
        dataSource={contests}
        rowKey="id"
        bordered
        scroll={{ x: "100%" }}
        loading={contestsIsLoading}
      >
        <Table.Column<ContestRegister>
          title="状态"
          dataIndex="status"
          key="status"
        />
        <Table.Column<ContestRegister>
          title="报名时间"
          dataIndex="createdTime"
          key="createdTime"
          render={(text, record) => {
            return new Date(record.createdTime).toLocaleString();
          }}
        />
        <Table.ColumnGroup<ContestRegister> title="竞赛">
          <Table.Column<ContestRegister>
            title="竞赛名"
            dataIndex={["contest", "name"]}
            key="contestName"
            render={(text, record) => (
              <ContestPopover contest={record.contest} />
            )}
          />
          <Table.Column<ContestRegister>
            title="竞赛状态"
            dataIndex={["contest", "status"]}
            key="contestStatus"
            render={(text, record) =>
              getContestRegisterStatusInfo(record.status)
            }
          />
          <Table.Column<ContestRegister>
            title="创建人"
            dataIndex={["contest", "creator", "name"]}
            key="contestName"
            render={(text, record) => (
              <UserPopover user={record.contest.creator} />
            )}
          />

          <Table.Column<ContestRegister>
            title="创建人学院"
            dataIndex={["contest", "creator", "college"]}
            key="contestName"
          />
        </Table.ColumnGroup>
        <Table.Column<ContestRegister>
          title="操作"
          dataIndex="operate"
          key="operate"
          render={(text, record) => (
            <>
              <Link
                to={generatePath("/back/contest/info/:contestId", {
                  contestId: String(record.contest.id),
                })}
              >
                详情
              </Link>
            </>
          )}
        />
      </Table>
    </>
  );
};
