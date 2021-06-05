import React, { useState } from "react";
import { Avatar, Badge, Button, Dropdown, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useAuth } from "../../../context/auth-context";
import { StudentSider } from "./student-sider";
import { TeacherSider } from "./teacher-sider";
import { AdminSider } from "./admin-sider";
import { generatePath } from "react-router";
import { AuthRoutes } from "./auth-routes";

export const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={"/notify"}>通知列表</Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to={generatePath("/back/user/info/:userId", {
            userId: String(user?.id),
          })}
        >
          个人信息
        </Link>
      </Menu.Item>
      <Menu.Item>
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
        {user?.type === "STUDENT" ? (
          <StudentSider collapsed={collapsed} setCollapsed={setCollapsed} />
        ) : (
          <></>
        )}
        {user?.type === "TEACHER" ? (
          <TeacherSider collapsed={collapsed} setCollapsed={setCollapsed} />
        ) : (
          <></>
        )}
        {user?.type === "ADMIN" ? (
          <AdminSider collapsed={collapsed} setCollapsed={setCollapsed} />
        ) : (
          <></>
        )}
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
