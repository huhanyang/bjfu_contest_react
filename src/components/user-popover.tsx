import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import { Popover } from "antd";
import React from "react";
import { getUserGenderInfo, getUserTypeInfo, User } from "../types/user";

export const UserPopover = ({ user }: { user: User | undefined }) => {
  return (
    <>
      {user ? (
        <Popover
          content={
            <div>
              性别：{getUserGenderInfo(user?.gender)}
              <br />
              类型：{getUserTypeInfo(user?.type)}
              <br />
              学院：{user?.college}
              <br />
              专业：{user?.major}
            </div>
          }
          title={user?.name}
        >
          <Link
            to={generatePath("/back/user/info/:userId", {
              userId: String(user?.id),
            })}
          >
            {user?.name}
          </Link>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
};
