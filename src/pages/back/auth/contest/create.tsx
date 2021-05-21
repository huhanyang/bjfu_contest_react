import { Checkbox, Form, Input, message } from "antd";
import { LongButton } from "../../unauth";
import React from "react";
import { useNavigate } from "react-router";
import { useHttp } from "../../../../utils/http";
import { useAsync } from "../../../../utils/use-async";

export const ContestCreate = () => {
  interface ContestCreateForm {
    name: string;
    summary: string;
    description: string;
    groupMemberCount: number;
    isCreateDefaultProcess: boolean;
  }

  const navigate = useNavigate();
  const client = useHttp();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: ContestCreateForm) => {
    try {
      await run(
        client("contest/create", { data: values, method: "POST" })
      ).then((contest) => {
        navigate(`../contestInfo/${contest.id}`, { replace: true });
        // todo 创建成功后跳转
      });
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      scrollToFirstError
      initialValues={{ isCreateDefaultProcess: true }}
    >
      <Form.Item
        name={"name"}
        label={"竞赛名称"}
        rules={[{ required: true, message: "请输入竞赛名称" }]}
      >
        <Input type="text" maxLength={32} />
      </Form.Item>
      <Form.Item
        name={"summary"}
        label={"竞赛简介"}
        rules={[{ required: true, message: "请输入竞赛简介" }]}
      >
        <Input.TextArea maxLength={128} />
      </Form.Item>
      <Form.Item
        name={"description"}
        label={"竞赛描述"}
        rules={[{ required: true, message: "请输入竞赛描述" }]}
      >
        <Input.TextArea maxLength={512} />
      </Form.Item>
      <Form.Item
        name={"groupMemberCount"}
        label={"队伍人数"}
        rules={[
          { required: true, message: "请输入队伍人数" },
          { max: 10, min: 1, message: "队伍人数请设置到1-10人" },
        ]}
      >
        <Input type={"number"} min={1} max={10} />
      </Form.Item>
      <Form.Item
        name={"isCreateDefaultProcess"}
        label={"创建默认报名流程"}
        valuePropName="checked"
      >
        <Checkbox>创建默认报名流程</Checkbox>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          创建竞赛
        </LongButton>
      </Form.Item>
    </Form>
  );
};
