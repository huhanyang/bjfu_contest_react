import { getProcessStatusInfo, Process } from "../types/process";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import React from "react";

export const ProcessPopover = ({
  contestId,
  process,
}: {
  contestId: number | undefined;
  process: Process | undefined;
}) => {
  return (
    <>
      {process ? (
        <Popover
          content={
            <div>
              流程名：{process.name}
              <br />
              状态：{getProcessStatusInfo(process.status)}
              <br />
              创建时间：{new Date(process.createdTime).toLocaleString()}
            </div>
          }
          title="流程信息"
        >
          <Link
            to={generatePath(
              "/back/contest/process/info/:contestId/:processId",
              {
                contestId: String(contestId),
                processId: String(process?.id),
              }
            )}
          >
            {process.sort + "-" + process.name}
          </Link>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
};
