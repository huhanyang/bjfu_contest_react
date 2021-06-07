import { Process, ProcessStatus } from "../../types/process";
import { Steps } from "antd";
import {
  ExperimentOutlined,
  FormOutlined,
  LoadingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import React from "react";

export const ProcessStatusSteps = ({
  process,
}: {
  process: Process | undefined;
}) => {
  type StepStatus = "finish" | "process" | "wait";
  const stepStatusArray: StepStatus[][] = [
    ["process", "wait", "wait", "wait"],
    ["finish", "process", "wait", "wait"],
    ["finish", "finish", "process", "wait"],
    ["finish", "finish", "finish", "finish"],
  ];
  const statusWeight: ProcessStatus[] = [
    "CREATING",
    "RUNNING",
    "FINISH",
    "DELETE",
  ];
  return (
    <>
      {process ? (
        <Steps direction="vertical" size="small">
          <Steps.Step
            status={stepStatusArray[statusWeight.indexOf(process.status)][0]}
            title="流程创建"
            icon={
              stepStatusArray[statusWeight.indexOf(process.status)][0] ===
              "process" ? (
                <LoadingOutlined />
              ) : (
                <FormOutlined />
              )
            }
          />
          <Steps.Step
            status={stepStatusArray[statusWeight.indexOf(process.status)][1]}
            title="流程中"
            icon={
              stepStatusArray[statusWeight.indexOf(process.status)][1] ===
              "process" ? (
                <LoadingOutlined />
              ) : (
                <SolutionOutlined />
              )
            }
          />
          <Steps.Step
            status={stepStatusArray[statusWeight.indexOf(process.status)][2]}
            title="流程结束"
            icon={<ExperimentOutlined />}
          />
        </Steps>
      ) : (
        <></>
      )}
    </>
  );
};
