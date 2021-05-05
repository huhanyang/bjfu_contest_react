import React, { useState } from "react";
import { Avatar, Badge, Breadcrumb, Dropdown, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useAuth } from "../../../context/auth-context";
import { StudentSider } from "./SutdentSider";
import { TeacherSider } from "./TeacherSider";
import { AdminSider } from "./AdminSider";
import { StudentRoutes } from "./StudentRoutes";
import { TeacherRoutes } from "./TeacherRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { generatePath } from "react-router";

export const AuthenticatedBackApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={"/notify"}>通知列表</Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to={generatePath("/back/userInfo/:userId", {
            userId: String(user?.id),
          })}
        >
          个人信息
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick={logout}>退出登录</a>
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
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            {user?.type === "STUDENT" ? <StudentRoutes /> : <></>}
            {user?.type === "TEACHER" ? <TeacherRoutes /> : <></>}
            {user?.type === "ADMIN" ? <AdminRoutes /> : <></>}
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
