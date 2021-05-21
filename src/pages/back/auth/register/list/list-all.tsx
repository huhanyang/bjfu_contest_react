import {
  RegisterListAllRequest,
  useAllRegisters,
  useBanRegister,
  useUnBanRegister,
} from "../../../../../utils/register";
import React, { useState } from "react";
import {
  FilterConfirmProps,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/lib/table/interface";
import { SingleFieldSorter } from "../../../../../types/request";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { UserPopover } from "../../../../../components/user-popover";
import { ContestRegister } from "../../../../../types/contest-register";

export const ContestRegisterListAll = ({
  contestId,
  isCreator,
}: {
  contestId: number;
  isCreator: boolean | undefined;
}) => {
  const [requestParams, setRequestParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    contestId,
  } as RegisterListAllRequest);
  const { data: registers, isLoading } = useAllRegisters(requestParams);
  const { mutateAsync: banRegister, isLoading: isBanLoading } = useBanRegister(
    contestId
  );
  const {
    mutateAsync: unBanRegister,
    isLoading: isUnBanLoading,
  } = useUnBanRegister(contestId);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ContestRegister> | SorterResult<ContestRegister>[]
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

  const CreatorOperate = ({ register }: { register: ContestRegister }) => {
    return (
      <>
        {register.status === "SIGN_UP" ? (
          <Popconfirm
            onConfirm={async () => {
              try {
                await banRegister({
                  contestId: Number(contestId),
                  userId: register.user.id,
                });
              } catch (e) {
                message.error(e.message);
              }
            }}
            title="确定要封禁此用户么?"
            okText="封禁"
            cancelText="取消"
          >
            <Button loading={isBanLoading}>封禁</Button>
          </Popconfirm>
        ) : (
          <></>
        )}
        {register.status === "BAN" ? (
          <Popconfirm
            onConfirm={async () => {
              try {
                await unBanRegister({
                  contestId: Number(contestId),
                  userId: register.user.id,
                });
              } catch (e) {
                message.error(e.message);
              }
            }}
            title="确定要解封此用户么?"
            okText="解封"
            cancelText="取消"
          >
            <Button loading={isUnBanLoading}>解封</Button>
          </Popconfirm>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <Table<ContestRegister>
        dataSource={registers}
        rowKey="id"
        onChange={handleTableChange}
        bordered
        scroll={{ x: "100%" }}
        loading={isLoading}
      >
        <Table.Column<ContestRegister>
          title="状态"
          dataIndex="status"
          key="status"
          sorter={{ multiple: 1 }}
          filters={[
            { text: "已报名", value: "SIGN_UP" },
            { text: "封禁", value: "BAN" },
          ]}
        />
        <Table.Column<ContestRegister>
          title="创建时间"
          dataIndex="createdTime"
          key="createdTime"
          sorter={{ multiple: 2 }}
          render={(text, record) => {
            return new Date(record.createdTime).toLocaleString();
          }}
        />
        <Table.ColumnGroup<ContestRegister> title="创建人">
          <Table.Column<ContestRegister>
            title="姓名"
            dataIndex={["user", "name"]}
            key="registerName"
            filterIcon={(filtered: boolean) => (
              <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
              />
            )}
            filterDropdown={filterDropdown}
            render={(text, record) => <UserPopover user={record.user} />}
          />
          <Table.Column<ContestRegister>
            title="年级"
            dataIndex={["user", "grade"]}
            key="registerGrade"
            filterIcon={(filtered: boolean) => (
              <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
              />
            )}
            filterDropdown={filterDropdown}
          />
          <Table.Column<ContestRegister>
            title="学院"
            dataIndex={["user", "college"]}
            key="registerCollege"
            filterIcon={(filtered: boolean) => (
              <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
              />
            )}
            filterDropdown={filterDropdown}
          />
          <Table.Column<ContestRegister>
            title="专业"
            dataIndex={["user", "major"]}
            key="registerMajor"
            filterIcon={(filtered: boolean) => (
              <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
              />
            )}
            filterDropdown={filterDropdown}
          />
        </Table.ColumnGroup>
        <Table.Column<ContestRegister>
          title="操作"
          dataIndex="operate"
          key="operate"
          render={(text, record) => (
            <>{isCreator ? <CreatorOperate register={record} /> : <></>}</>
          )}
        />
      </Table>
    </>
  );
};
