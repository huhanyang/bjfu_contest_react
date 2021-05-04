import React, { useState } from "react";
import { Button, Card, Divider, Row, Col } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import { useDocumentTitle } from "utils";
import { ErrorBox } from "components/lib";
import { Register } from "./register";
import { Login } from "./login";
import { Forget } from "./forget";

export const UnAuthenticatedBackApp = () => {
  const [page, setPage] = useState("login" as "login" | "register" | "forget");
  const [error, setError] = useState<Error | null>(null);

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
          <CardTitle page={page} />
          <ErrorBox error={error} />
          <CardInnerPage page={page} setError={setError} />
          <Divider />
          <Button
            type={"link"}
            onClick={() => setPage(page === "register" ? "login" : "register")}
          >
            {page === "register" ? "去登录" : "现在注册"}
          </Button>
          <Button
            type={"link"}
            onClick={() => setPage(page === "forget" ? "login" : "forget")}
          >
            {page === "forget" ? "去登录" : "忘记密码"}
          </Button>
        </ShadowCard>
      </Col>
      <Col xs={0} sm={4} md={6} lg={8} xl={8} />
    </Row>
  );
};

const CardTitle = ({ page }: { page: "login" | "register" | "forget" }) => {
  switch (page) {
    case "login":
      return <Title>请登录</Title>;
    case "register":
      return <Title>请注册</Title>;
    case "forget":
      return <Title>找回密码</Title>;
  }
};

const CardInnerPage = ({
  page,
  setError,
}: {
  page: "login" | "register" | "forget";
  setError: (error: Error) => void;
}) => {
  switch (page) {
    case "login":
      return <Login onError={setError} />;
    case "register":
      return <Register onError={setError} />;
    case "forget":
      return <Forget onError={setError} />;
  }
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
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
