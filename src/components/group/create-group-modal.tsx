import React from "react";
import { GroupCreateRequest, useCreateGroup } from "../../utils/group";
import { Form, Input, message, Modal } from "antd";
import { LongButton } from "../../pages/back/unauth";

export const CreateGroupModal = ({
  contestId,
  visible,
  setVisible,
}: {
  contestId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    mutateAsync: createGroup,
    isLoading: isCreateFinish,
  } = useCreateGroup(contestId);

  const handleSubmit = async (values: GroupCreateRequest) => {
    try {
      await createGroup({ ...values, contestId: contestId });
      // 关闭Modal
      setVisible(false);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Modal
        title="创建队伍"
        footer={null}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form onFinish={handleSubmit} scrollToFirstError>
          <Form.Item
            name={"name"}
            label={"队伍名"}
            rules={[{ required: true, message: "请输入队伍名" }]}
          >
            <Input type="text" maxLength={32} />
          </Form.Item>
          <Form.Item
            name={"introduction"}
            label={"队伍简介"}
            rules={[{ required: true, message: "请输入队伍简介" }]}
          >
            <Input.TextArea maxLength={256} />
          </Form.Item>
          <Form.Item>
            <LongButton
              loading={isCreateFinish}
              htmlType={"submit"}
              type={"primary"}
            >
              创建队伍
            </LongButton>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
