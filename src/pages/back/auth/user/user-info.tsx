import { useParams } from "react-router";
import { UserInfo as UserInfoComponents } from "../../../../components/user/user-info";

export const UserInfo = () => {
  const { userId } = useParams();

  return <>{userId ? <UserInfoComponents userId={Number(userId)} /> : <></>}</>;
};
