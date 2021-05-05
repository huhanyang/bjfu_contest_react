import { Button, Descriptions } from "antd";
import { useAuth } from "../../../../context/auth-context";
import { useParams } from "react-router";
import { useUser } from "../../../../utils/user";
import React, { useState } from "react";
import { PageLoading } from "../../../../components/lib";
import { AdminEditInfoModal } from "./AdminEditInfoModal";
import { EditInfoModal } from "./EditInfoModal";

export const UserInfo = () => {
  const { user: me } = useAuth();
  const [visible, setVisible] = useState(false);
  const { userId } = useParams();
  const { data: user, isLoading } = useUser(Number(userId));

  // 查询account的个人信息并对于user来判断是否为自己
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
            setVisible(!visible);
          }}
        >
          编辑信息
        </Button>
      );
    }
    return <></>;
  };

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <Descriptions
          title="个人信息"
          extra={
            <ChangeButton
              isAdmin={me?.type === "ADMIN"}
              isSelf={me?.id === user?.id}
            />
          }
        >
          <Descriptions.Item label="学工号">{user?.account}</Descriptions.Item>
          <Descriptions.Item label="账号类型">{user?.type}</Descriptions.Item>
          <Descriptions.Item label="真实姓名">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{user?.gender}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="年级">{user?.grade}</Descriptions.Item>
          <Descriptions.Item label="学院">{user?.college}</Descriptions.Item>
          <Descriptions.Item label="专业">{user?.major}</Descriptions.Item>
          <Descriptions.Item label="个人介绍">
            {user?.introduction}
          </Descriptions.Item>
        </Descriptions>
      )}
      {me?.type === "ADMIN" ? (
        <AdminEditInfoModal
          visible={visible}
          setVisible={setVisible}
          userId={Number(userId)}
        />
      ) : (
        <EditInfoModal visible={visible} setVisible={setVisible} />
      )}
    </>
  );
};
