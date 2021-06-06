import React, { useState } from "react";
import { Avatar, Badge, Button, Dropdown, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useAuth } from "../../../context/auth-context";
import { StudentSider } from "./student-sider";
import { TeacherSider } from "./teacher-sider";
import { AdminSider } from "./admin-sider";
import { generatePath, useNavigate } from "react-router";
import { AuthRoutes } from "./auth-routes";

export const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="notify">
        <Button
          type="link"
          onClick={() => {
            navigate(
              generatePath("/back/notify", { account: String(user?.account) }),
              { replace: true }
            );
          }}
        >
          通知列表
        </Button>
      </Menu.Item>
      <Menu.Item key="user-info">
        <Button
          type="link"
          onClick={() => {
            navigate(
              generatePath("/back/user/info/:userId", {
                userId: String(user?.id),
              }),
              { replace: true }
            );
          }}
        >
          个人信息
        </Button>
      </Menu.Item>
      <Menu.Item key="logout">
        <Button type="link" onClick={logout}>
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Hover
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Hover>
        <Link to="/front">BJFU 竞赛网</Link>
        <AvatarDiv>
          <Dropdown overlay={menu}>
            <Badge count={1}>
              <Avatar size="large">{user?.name}</Avatar>
            </Badge>
          </Dropdown>
        </AvatarDiv>
      </Header>
      <Layout>
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          collapsedWidth="0"
          width={200}
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
        >
          {user?.type === "STUDENT" ? <StudentSider /> : <></>}
          {user?.type === "TEACHER" ? <TeacherSider /> : <></>}
          {user?.type === "ADMIN" ? <AdminSider /> : <></>}
        </Layout.Sider>
        <Layout>
          <Content>
            <AuthRoutes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const Hover = styled.div`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  float: left;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
const Header = styled(Layout.Header)`
  background: #fff;
  padding: 0;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;
const Content = styled(Layout.Content)`
  background: #fff;
  margin: 24px 16px;
  padding: 24px;
`;

const AvatarDiv = styled.div`
  float: right;
  padding: 0 24px;
  font-size: 14px;
`;
