import { Popover } from "antd";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import React from "react";
import { Group } from "../types/group";

export const GroupPopover = ({
  contestId,
  group,
}: {
  contestId: number | undefined;
  group: Group | undefined;
}) => {
  return (
    <>
      {group ? (
        <Popover
          content={
            <div>
              队伍名：{group.name}
              <br />
              队长：{group.captain.name}
              {group.teacher ? (
                <>
                  <br />
                  指导教师：{group.teacher?.name}
                </>
              ) : (
                <></>
              )}
              <br />
              创建时间：{new Date(group.createdTime).toLocaleString()}
            </div>
          }
          title="队伍信息"
        >
          <Link
            to={generatePath("/back/contest/group/info/:contestId/:groupId", {
              contestId: String(contestId),
              groupId: String(group?.id),
            })}
          >
            {group?.name}
          </Link>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
};
