import { Menu } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export const TeacherSider = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      <SubMenu key="sub1" icon={<UserOutlined />} title="竞赛">
        <Menu.Item key="1">
          <Link to={"/back/contest/create"}>创建竞赛</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to={"/back/contest/list"}>竞赛列表</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/back/contest/listCreated"}>创建的竞赛</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={"/back/contest/listTaught"}>指导的竞赛</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<LaptopOutlined />} title="队伍">
        <Menu.Item key="5">option</Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<NotificationOutlined />} title="资源">
        <Menu.Item key="9">option</Menu.Item>
      </SubMenu>
    </Menu>
  );
};
