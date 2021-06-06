import { useAuth } from "../../context/auth-context";
import React, { useState } from "react";
import { useUser } from "../../utils/user";
import { Button, Descriptions } from "antd";
import { PageLoading } from "../lib";
import {
  getUserGenderInfo,
  getUserStatusInfo,
  getUserTypeInfo,
} from "../../types/user";
import { EditUserInfoModal } from "./edit-user-info-modal";
import { EditSelfInfoModal } from "./edit-self-info-modal";

export const UserInfo = ({ userId }: { userId: number | undefined }) => {
  const { user: me } = useAuth();
  const [editInfoVisible, setEditInfoVisible] = useState(false);
  const { data: user, isLoading } = useUser(Number(userId));

  const ChangeButton = ({
    isSelf,
    isAdmin,
  }: {
    isSelf: boolean;
    isAdmin: boolean;
  }) => {
    if (isAdmin || isSelf) {
      return (
        <Button
          onClick={() => {
            setEditInfoVisible(!editInfoVisible);
          }}
        >
          编辑信息
        </Button>
      );
    }
    return <></>;
  };

  if (!userId) {
    return <>页面参数错误，请返回重试!</>;
  }

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          <Descriptions
            bordered
            title="个人信息"
            extra={
              <ChangeButton
                isAdmin={me?.type === "ADMIN"}
                isSelf={me?.id === user?.id}
              />
            }
          >
            <Descriptions.Item label="学工号">
              {user?.account}
            </Descriptions.Item>
            <Descriptions.Item label="账号类型">
              {user ? getUserTypeInfo(user.type) : ""}
            </Descriptions.Item>
            <Descriptions.Item label="账号状态">
              {user ? getUserStatusInfo(user?.status) : ""}
            </Descriptions.Item>
            <Descriptions.Item label="真实姓名">{user?.name}</Descriptions.Item>
            <Descriptions.Item label="性别">
              {user ? getUserGenderInfo(user?.gender) : ""}
            </Descriptions.Item>
            <Descriptions.Item label="邮箱">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="年级">{user?.grade}</Descriptions.Item>
            <Descriptions.Item label="学院">{user?.college}</Descriptions.Item>
            <Descriptions.Item label="专业">{user?.major}</Descriptions.Item>
            <Descriptions.Item label="个人介绍">
              {user?.introduction}
            </Descriptions.Item>
          </Descriptions>
          {me?.type === "ADMIN" ? (
            <EditUserInfoModal
              userId={userId}
              visible={editInfoVisible}
              setVisible={setEditInfoVisible}
            />
          ) : (
            <EditSelfInfoModal
              visible={editInfoVisible}
              setVisible={setEditInfoVisible}
            />
          )}
        </>
      )}
    </>
  );
};
