import React from "react";
import {
  ProcessCreateRequest,
  useCreateProcessInfo,
} from "../../utils/process";
import { DatePicker, Form, Input, message, Modal } from "antd";
import { LongButton } from "../../pages/back/unauth";

export const CreateProcessModal = ({
  contestId,
  visible,
  setVisible,
}: {
  contestId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    mutateAsync: createProcess,
    isLoading: loading,
  } = useCreateProcessInfo(contestId);

  const handleSubmit = async (values: ProcessCreateRequest) => {
    try {
      await createProcess({ ...values, contestId: contestId });
      // 关闭Modal
      setVisible(false);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Modal
        title="创建竞赛流程"
        footer={null}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form onFinish={handleSubmit} scrollToFirstError>
          <Form.Item
            name={"name"}
            label={"流程名称"}
            rules={[{ required: true, message: "请输入流程名称名称" }]}
          >
            <Input type="text" maxLength={32} />
          </Form.Item>
          <Form.Item
            name={"description"}
            label={"流程描述"}
            rules={[{ required: true, message: "请输入流程描述" }]}
          >
            <Input.TextArea maxLength={512} />
          </Form.Item>
          <Form.Item
            name={"endSubmitTime"}
            label={"停止提交时间"}
            rules={[{ required: true, message: "请选择停止提交时间" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item>
            <LongButton loading={loading} htmlType={"submit"} type={"primary"}>
              创建竞赛
            </LongButton>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
