import React, { useEffect } from "react";
import moment from "moment";
import {
  ProcessEditRequest,
  useEditProcessInfo,
  useProcess,
} from "../../../../utils/process";
import { DatePicker, Form, Input, message, Modal, Select } from "antd";
import { LongButton } from "../../unauth";

export const ProcessEditModal = ({
  contestId,
  processId,
  visible,
  setVisible,
}: {
  contestId: number;
  processId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    mutateAsync: editProcess,
    isLoading: editProcessLoading,
  } = useEditProcessInfo(contestId, processId);
  const { data: process } = useProcess(contestId, processId);

  const handleSubmit = async (values: ProcessEditRequest) => {
    try {
      await editProcess({
        ...values,
        contestId: contestId,
        processId: processId,
      });
      // 关闭Modal
      setVisible(false);
    } catch (e) {
      message.error(e.message);
    }
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      ...process,
      endSubmitTime: moment(process?.endSubmitTime),
    });
  }, [form, process]);

  return (
    <>
      <Modal
        title="编辑竞赛流程"
        footer={null}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            ...process,
            endSubmitTime: moment(process?.endSubmitTime),
          }}
          scrollToFirstError
        >
          <Form.Item
            name={"name"}
            label={"流程名称"}
            rules={[{ required: true, message: "请输入流程名称名称" }]}
          >
            <Input type="text" maxLength={32} />
          </Form.Item>
          <Form.Item
            name={"status"}
            label={"流程状态"}
            rules={[{ required: true, message: "请选择流程状态" }]}
          >
            <Select>
              <Select.Option value="CREATING">创建中</Select.Option>
              <Select.Option value="RUNNING">流程中</Select.Option>
              <Select.Option value="FINISH">流程结束</Select.Option>
            </Select>
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
            <LongButton
              loading={editProcessLoading}
              htmlType={"submit"}
              type={"primary"}
            >
              提交
            </LongButton>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
