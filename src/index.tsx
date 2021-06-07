import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "antd/dist/antd.less";
import { AppProviders } from "context";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <AppProviders>
        <App />
      </AppProviders>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

//todo 路由参数非法页面
//todo 路由组件传id改为传实体
//todo react query 不设置入参
