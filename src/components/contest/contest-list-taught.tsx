import React, { useState } from "react";
import {
  TeacherListAllTeachContest,
  useAllTeachContests,
  useDeleteTeachContest,
} from "../../utils/teacher";
import { useAuth } from "../../context/auth-context";
import {
  FilterConfirmProps,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
  TablePaginationConfig,
} from "antd/lib/table/interface";
import {
  Contest,
  ContestStatuses,
  getContestStatusInfo,
} from "../../types/contest";
import { SingleFieldSorter } from "../../types/request";
import {
  Button,
  Input,
  message,
  Popconfirm,
  Popover,
  Space,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { User } from "../../types/user";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import { ContestPopover } from "../contest-popover";

export const ContestListTaught = () => {
  const [requestParams, setRequestParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  } as TeacherListAllTeachContest);
  const { data: contests, isLoading: isContestLoading } = useAllTeachContests(
    requestParams
  );
  const {
    mutateAsync: deleteTeachContest,
    isLoading: isDeleteTeachContestLoading,
  } = useDeleteTeachContest();
  const { user } = useAuth();

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

  const filterDropdown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: {
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    selectedKeys: React.Key[];
    confirm: (param?: FilterConfirmProps) => void;
    clearFilters?: () => void;
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
  );

  const Creator = ({ creator }: { creator: User }) => (
    <Popover
      content={
        <div>
          性别：{creator.gender}
          <br />
          类型：{creator.type}
          <br />
          学院：{creator.college}
          <br />
          专业：{creator.major}
        </div>
      }
      title={creator.name}
    >
      <Link
        to={generatePath("/back/user/info/:userId", {
          userId: String(creator.id),
        })}
      >
        {creator.name}
      </Link>
    </Popover>
  );

  return (
    <>
      <Table<Contest>
        dataSource={contests?.content}
        pagination={{
          ...requestParams.pagination,
          total: contests?.totalElements,
          showSizeChanger: true,
        }}
        rowKey="id"
        onChange={handleTableChange}
        bordered
        scroll={{ x: "100%" }}
        loading={isContestLoading}
      >
        <Table.Column<Contest>
          title="竞赛名称"
          dataIndex={"name"}
          key="name"
          filterIcon={(filtered: boolean) => (
            <SearchOutlined
              style={{ color: filtered ? "#1890ff" : undefined }}
            />
          )}
          filterDropdown={filterDropdown}
          render={(text, record) => <ContestPopover contest={record} />}
        />
        <Table.Column<Contest>
          title="竞赛状态"
          dataIndex={"status"}
          key="status"
          render={(text, record) => getContestStatusInfo(record.status)}
          filters={ContestStatuses.map((status) => {
            return { text: getContestStatusInfo(status), value: status };
          })}
        />
        <Table.Column<Contest>
          title="竞赛创建时间"
          dataIndex={"createdTime"}
          key="createdTime"
          render={(text, record) => {
            return new Date(record.createdTime).toLocaleString();
          }}
        />
        <Table.ColumnGroup<Contest> title="竞赛创建人">
          <Table.Column<Contest>
            title="姓名"
            dataIndex={["creator", "name"]}
            key="creatorName"
            filterIcon={(filtered: boolean) => (
              <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
              />
            )}
            filterDropdown={filterDropdown}
            render={(text, record) => <Creator creator={record.creator} />}
          />
          <Table.Column<Contest>
            title="学院"
            dataIndex={["creator", "college"]}
            key="creatorCollege"
            filterIcon={(filtered: boolean) => (
              <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
              />
            )}
            filterDropdown={filterDropdown}
          />
        </Table.ColumnGroup>
        <Table.Column<Contest>
          title="操作"
          dataIndex="operate"
          key="operate"
          render={(text, record) => (
            <>
              <Link
                to={generatePath("/back/contest/info/:contestId", {
                  contestId: String(record.id),
                })}
              >
                竞赛详情
              </Link>
              <Popconfirm
                title="确定要退出此竞赛么?"
                onConfirm={async () => {
                  try {
                    await deleteTeachContest({
                      contestId: record.id,
                      teacherAccount: user?.account,
                    });
                  } catch (e) {
                    message.error(e.message);
                  }
                }}
                okText="退出"
                cancelText="取消"
              >
                <Button loading={isDeleteTeachContestLoading} type="link">
                  退出
                </Button>
              </Popconfirm>
            </>
          )}
        />
      </Table>
    </>
  );
};
