import React, { useState } from "react";
import { RcFile } from "antd/lib/upload/interface";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { LongButton } from "../../pages/back/unauth";
import { ResourceAddRequest, useAddResource } from "../../utils/resource";
import { ResourceType } from "../../types/resource";

export const AddResourceModal = ({
  targetId,
  type,
  visible,
  setVisible,
}: {
  targetId: number;
  type: ResourceType;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    mutateAsync: addResource,
    isLoading: isAddResourceLoading,
  } = useAddResource();
  const [file, setFile] = useState<RcFile>();

  const handleSubmit = async (values: ResourceAddRequest) => {
    try {
      if (!file) {
        message.warn("未选取文件");
      } else {
        await addResource({
          ...values,
          file,
          targetId,
          fileName: file?.name,
          type,
          contentType: "OTHER",
        }).then(() => {
          setVisible(false);
        });
      }
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
        <Form
          initialValues={{ classification: "默认分类" }}
          onFinish={handleSubmit}
          scrollToFirstError
        >
          <Form.Item
            name={"classification"}
            label={"分类名"}
            rules={[{ required: true, message: "请输入分类名" }]}
          >
            <Input type="text" maxLength={32} />
          </Form.Item>
          <Upload
            maxCount={1}
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
          <Form.Item>
            <LongButton
              disabled={file === undefined}
              loading={isAddResourceLoading}
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
