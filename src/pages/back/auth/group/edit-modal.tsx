import React from "react";
import { Form, Input, message, Modal } from "antd";
import { LongButton } from "../../unauth";
import {
  GroupEditRequest,
  useEditGroup,
  useGroup,
} from "../../../../utils/group";

export const GroupEditModal = ({
  contestId,
  groupId,
  visible,
  setVisible,
}: {
  contestId: number;
  groupId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutateAsync: editGroup, isLoading: isEditFinish } = useEditGroup(
    contestId
  );
  const { data: group, isLoading: isGroupLoading } = useGroup(groupId);

  const handleSubmit = async (values: GroupEditRequest) => {
    try {
      await editGroup({ ...values, groupId: groupId });
      // 关闭Modal
      setVisible(false);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Modal
        title="编辑队伍信息"
        footer={null}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form onFinish={handleSubmit} initialValues={group} scrollToFirstError>
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
              loading={isEditFinish || isGroupLoading}
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
