import {
  ResourceAddInContestRequest,
  useAddResourceInContest,
} from "../../../../utils/resource";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { RcFile } from "antd/lib/upload/interface";
import { LongButton } from "../../unauth";

export const ResourceContestCreateModal = ({
  contestId,
  visible,
  setVisible,
}: {
  contestId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    mutateAsync: addResource,
    isLoading: isAddResourceLoading,
  } = useAddResourceInContest();
  const [file, setFile] = useState<RcFile>();

  const handleSubmit = async (values: ResourceAddInContestRequest) => {
    try {
      await addResource({ ...values, file, contestId, fileName: file?.name });
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Modal
        title="上传文件"
        footer={null}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form onFinish={handleSubmit} scrollToFirstError>
          <Form.Item
            name={"classification"}
            label={"分类名"}
            rules={[{ required: true, message: "请输入文件名" }]}
          >
            <Input type="text" maxLength={32} />
          </Form.Item>
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
          <Form.Item>
            <LongButton
              loading={isAddResourceLoading || file === undefined}
              htmlType={"submit"}
              type={"primary"}
            >
              上传文件
            </LongButton>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
