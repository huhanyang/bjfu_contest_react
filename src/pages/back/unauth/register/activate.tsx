import { useEffect } from "react";
import { message } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useUrlQueryParam } from "../../../../utils/url";
import { useAsync } from "../../../../utils/use-async";
import { useAuth } from "../../../../context/auth-context";

export const RegisterActivate = () => {
  const { activate } = useAuth();
  const navigate = useNavigate();
  const [{ token }] = useUrlQueryParam(["token"]);
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  useEffect(() => {
    if (!token) {
      message
        .error("Token不合法")
        .then(() => navigate("../../login", { replace: true }));
    } else {
      run(activate({ token }));
    }
  }, [token]);

  return (
    <>
      {isLoading ? (
        <>
          <SyncOutlined spin />
          正在激活中...
        </>
      ) : (
        <>激活失败，token失效！</>
      )}
    </>
  );
};
