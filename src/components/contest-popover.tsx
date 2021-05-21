import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import { Popover } from "antd";
import React from "react";
import { Contest } from "../types/contest";

export const ContestPopover = ({
  contest,
}: {
  contest: Contest | undefined;
}) => {
  return (
    <>
      {contest ? (
        <Popover
          content={
            <div>
              竞赛名：{contest.name}
              <br />
              简介：{contest.summary}
              <br />
              状态：{contest.status}
              {contest.creator ? (
                <>
                  <br />
                  创建人：{contest.creator.name}
                </>
              ) : (
                <></>
              )}
              <br />
              创建时间：{new Date(contest.createdTime).toLocaleString()}
            </div>
          }
          title="竞赛信息"
        >
          <Link
            to={generatePath("/back/contest/info/:contestId", {
              contestId: String(contest?.id),
            })}
          >
            {contest.name}
          </Link>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
};
