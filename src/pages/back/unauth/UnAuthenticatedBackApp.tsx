import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Card, Divider, Row, Col } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import { useDocumentTitle } from "utils";
import { Register } from "./register";
import { Login } from "./login";
import { Forget } from "./forget";
import { Routes, Route, Navigate } from "react-router";

export const UnAuthenticatedBackApp = () => {
  useDocumentTitle("请登录注册以继续");

  return (
    <Row>
      <Col xs={0} sm={4} md={6} lg={8} xl={8} />
      <Col
        xs={24}
        sm={16}
        md={12}
        lg={8}
        xl={8}
        style={{ paddingTop: "5vh", paddingBottom: "10vh" }}
      >
        <Header />
        <ShadowCard>
          <Routes>
            <Route path={"/login/*"} element={<Login />} />
            <Route path={"/register/*"} element={<Register />} />
            <Route path={"/forget/*"} element={<Forget />} />
            <Navigate to={"login"} />
          </Routes>
        </ShadowCard>
      </Col>
      <Col xs={0} sm={4} md={6} lg={8} xl={8} />
    </Row>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

export const CardTitle = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  min-height: 46rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
