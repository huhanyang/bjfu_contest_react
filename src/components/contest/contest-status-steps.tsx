import { Contest, ContestStatus } from "../../types/contest";
import { Steps } from "antd";
import {
  ExperimentOutlined,
  FormOutlined,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import React from "react";

export const ContestStatusSteps = ({
  contest,
}: {
  contest: Contest | undefined;
}) => {
  type StepStatus = "finish" | "process" | "wait";
  const stepStatusArray: StepStatus[][] = [
    ["process", "wait", "wait", "wait"],
    ["finish", "process", "wait", "wait"],
    ["finish", "finish", "process", "wait"],
    ["finish", "finish", "finish", "finish"],
  ];
  const statusWeight: ContestStatus[] = [
    "CREATING",
    "REGISTERING",
    "RUNNING",
    "FINISH",
  ];
  return (
    <>
      {contest ? (
        <Steps direction="vertical" size="small">
          <Steps.Step
            status={stepStatusArray[statusWeight.indexOf(contest.status)][0]}
            title="竞赛创建"
            icon={
              stepStatusArray[statusWeight.indexOf(contest.status)][0] ===
              "process" ? (
                <LoadingOutlined />
              ) : (
                <FormOutlined />
              )
            }
          />
          <Steps.Step
            status={stepStatusArray[statusWeight.indexOf(contest.status)][1]}
            title="报名组队"
            icon={
              stepStatusArray[statusWeight.indexOf(contest.status)][1] ===
              "process" ? (
                <LoadingOutlined />
              ) : (
                <SolutionOutlined />
              )
            }
          />
          <Steps.Step
            status={stepStatusArray[statusWeight.indexOf(contest.status)][2]}
            title="比赛流程"
            icon={
              stepStatusArray[statusWeight.indexOf(contest.status)][2] ===
              "process" ? (
                <LoadingOutlined />
              ) : (
                <ExperimentOutlined />
              )
            }
          />
          <Steps.Step
            status={stepStatusArray[statusWeight.indexOf(contest.status)][3]}
            title="比赛结束"
            icon={<SmileOutlined />}
          />
        </Steps>
      ) : (
        <></>
      )}
    </>
  );
};
