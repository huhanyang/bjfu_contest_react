import React from "react";
import { useAuth } from "../../context/auth-context";
import { useAsync } from "../../utils/use-async";
import { EditSelfInfo, useEditSelfInfo } from "../../utils/user";
import { Form, Input, message, Modal, Radio } from "antd";
import { LongButton } from "../../pages/back/unauth";
import { getUserGenderInfo, UserGenders } from "../../types/user";

export const EditSelfInfoModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { refresh, user: me } = useAuth();
  const { run } = useAsync(undefined, { throwOnError: true });
  const {
    mutateAsync: editSelfInfo,
    isLoading: isEditSelfInfoLoading,
  } = useEditSelfInfo(me?.id);

  const handleSubmit = async (values: EditSelfInfo) => {
    try {
      await editSelfInfo({ ...values });
      // 重新获取一下自己的信息
      await run(refresh());
      setVisible(false);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Modal
      title="编辑个人信息"
      footer={null}
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form
        initialValues={me ? me : undefined}
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Form.Item
          name={"name"}
          label={"真实姓名"}
          rules={[{ required: true, message: "请输入真实姓名" }]}
        >
          <Input type="text" maxLength={32} />
        </Form.Item>
        <Form.Item
          name={"gender"}
          label={"性别"}
          rules={[{ required: true, message: "请选择性别" }]}
        >
          <Radio.Group>
            {UserGenders.map((gender) => (
              <Radio value={gender}>{getUserGenderInfo(gender)}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item name={"introduction"} label={"个人介绍"}>
          <Input.TextArea maxLength={256} />
        </Form.Item>
        <Form.Item>
          <LongButton
            loading={isEditSelfInfoLoading}
            htmlType={"submit"}
            type={"primary"}
          >
            提交修改
          </LongButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
