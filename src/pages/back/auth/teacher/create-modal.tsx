import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { UserSelect } from "../../../../components/user-select";
import { useCreateTeacher } from "../../../../utils/teacher";
import { LongButton } from "../../unauth";

export const TeacherCreateModal = ({
  visible,
  setVisible,
  contestId,
}: {
  contestId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [teacherAccounts, setTeacherAccounts] = useState<string[]>([]);
  const {
    mutateAsync: createTeacher,
    isLoading: isCreateTeacherLoading,
  } = useCreateTeacher(contestId);
  const createTeachers = async () => {
    try {
      await createTeacher({ contestId, teacherAccounts });
      setVisible(false);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Modal
        title="创建指导教师"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <UserSelect
          types={["TEACHER"]}
          value={teacherAccounts}
          setValue={setTeacherAccounts}
        />
        <LongButton onClick={createTeachers} loading={isCreateTeacherLoading}>
          添加指导教师
        </LongButton>
      </Modal>
    </>
  );
};
