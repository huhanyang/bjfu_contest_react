import React, { useState } from "react";
import {
  ContestListCreatedRequest,
  useCreatedContests,
} from "../../utils/contest";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
  TablePaginationConfig,
} from "antd/lib/table/interface";
import { Contest, getContestStatusInfo } from "../../types/contest";
import { SingleFieldSorter } from "../../types/request";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ContestPopover } from "../contest-popover";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";

export const ContestListCreated = () => {
  const [requestParams, setRequestParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  } as ContestListCreatedRequest);
  const { data: createdContests, isLoading } = useCreatedContests(
    requestParams
  );

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Contest> | SorterResult<Contest>[],
    extra: TableCurrentDataSource<Contest>
  ) => {
    if (!Array.isArray(sorter)) {
      sorter = [sorter];
    }
    const newSorter = sorter.map((s) => {
      return {
        ...s,
        order: s.order === "descend" ? "DESC" : "ASC",
      } as SingleFieldSorter;
    });
    setRequestParams({
      ...requestParams,
      ...filters,
      pagination: pagination,
      sorter: newSorter,
    });
  };

  return (
    <>
      <Table<Contest>
        dataSource={createdContests}
        rowKey="id"
        onChange={handleTableChange}
        bordered
        scroll={{ x: "100%" }}
        loading={isLoading}
      >
        <Table.Column<Contest>
          title="名称"
          dataIndex="name"
          key="name"
          sorter={{ multiple: 1 }}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{ color: filtered ? "#1890ff" : undefined }}
            />
          )}
          filterDropdown={({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
          }) => (
            <div style={{ padding: 8 }}>
              <Input
                value={selectedKeys[0]}
                onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => confirm()}
                style={{ width: 188, marginBottom: 8, display: "block" }}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => confirm()}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  搜索
                </Button>
                <Button
                  onClick={() => {
                    if (clearFilters) {
                      clearFilters();
                    }
                  }}
                  size="small"
                  style={{ width: 90 }}
                >
                  重置
                </Button>
              </Space>
            </div>
          )}
          render={(text, record) => <ContestPopover contest={record} />}
        />
        <Table.Column<Contest>
          title="状态"
          dataIndex="status"
          key="status"
          sorter={{ multiple: 2 }}
          filters={[
            { text: "创建中", value: "CREATING" },
            { text: "报名中", value: "REGISTERING" },
            { text: "进程中", value: "RUNNING" },
            { text: "结束", value: "FINISH" },
          ]}
          render={(text, record) => getContestStatusInfo(record.status)}
        />
        <Table.Column<Contest>
          title="队伍人数上限"
          dataIndex="groupMemberCount"
          key="groupMemberCount"
          sorter={{ multiple: 3 }}
        />
        <Table.Column<Contest>
          title="创建时间"
          dataIndex="createdTime"
          key="createdTime"
          sorter={{ multiple: 4 }}
          render={(text, record) => {
            return new Date(record.createdTime).toLocaleString();
          }}
        />
        <Table.Column<Contest>
          title="操作"
          dataIndex="operate"
          key="operate"
          render={(text, record) => (
            <Link
              to={generatePath("/back/contest/info/:contestId", {
                contestId: String(record.id),
              })}
            >
              详情
            </Link>
          )}
        />
      </Table>
    </>
  );
};
