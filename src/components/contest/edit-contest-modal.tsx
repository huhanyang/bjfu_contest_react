import React from "react";
import {
  ContestEditRequest,
  useContest,
  useEditContest,
} from "../../utils/contest";
import { Form, Input, InputNumber, message, Modal, Select } from "antd";
import { LongButton } from "../../pages/back/unauth";
import { ContestStatuses, getContestStatusInfo } from "../../types/contest";

export const EditContestModal = ({
  contestId,
  visible,
  setVisible,
}: {
  contestId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: contest, isLoading } = useContest(Number(contestId));
  const { mutateAsync: editContestInfo } = useEditContest(contestId);

  const handleSubmit = async (values: ContestEditRequest) => {
    try {
      await editContestInfo({ ...values });
      // 关闭Modal
      setVisible(false);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Modal
      title="编辑竞赛信息"
      footer={null}
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form initialValues={contest} onFinish={handleSubmit} scrollToFirstError>
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
          name={"status"}
          label={"流程状态"}
          rules={[{ required: true, message: "请选择竞赛状态" }]}
        >
          <Select>
            {ContestStatuses.map((status) => {
              if (status === "DELETE") {
                return <></>;
              }
              return (
                <Select.Option value={status}>
                  {getContestStatusInfo(status)}
                </Select.Option>
              );
            })}
          </Select>
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
            { type: "number", required: true, message: "请输入队伍人数" },
            {
              type: "number",
              max: 10,
              min: 1,
              message: "队伍人数请设置到1-10人",
            },
          ]}
        >
          <InputNumber max={10} min={1} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
            提交修改
          </LongButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
