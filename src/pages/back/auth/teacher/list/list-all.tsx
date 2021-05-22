import { Button, Dropdown, Menu, message } from "antd";
import { useAllTeachers, useDeleteTeacher } from "../../../../../utils/teacher";
import { TeacherCreateModal } from "../create-modal";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import { useContest } from "../../../../../utils/contest";

export const TeacherListAll = ({
  contestId,
  isCreator,
}: {
  contestId: number;
  isCreator: boolean;
}) => {
  const { data: contestInfo } = useContest(Number(contestId));

  const [teacherAddModalVisible, setTeacherAddModalVisible] = useState(false);
  const {
    mutateAsync: deleteTeacher,
    isLoading: isDeleteTeacherLoading,
  } = useDeleteTeacher(contestId);

  const menu = (
    <Menu>
      {contestInfo?.teachers?.map((teacher) => {
        return (
          <>
            <Menu.SubMenu
              title={`${teacher.college} ${teacher.major} ${teacher.name}`}
            >
              <Menu.Item>
                <Link
                  to={generatePath("/back/user/info/:userId", {
                    userId: String(teacher.id),
                  })}
                >
                  查看信息
                </Link>
              </Menu.Item>
              {isCreator ? (
                <Menu.Item>
                  <a
                    type="link"
                    onClick={async () => {
                      if (!isDeleteTeacherLoading) {
                        try {
                          await deleteTeacher({
                            contestId,
                            teacherAccount: teacher.account,
                          });
                        } catch (e) {
                          message.error(e.message);
                        }
                      }
                    }}
                  >
                    删除教师
                  </a>
                </Menu.Item>
              ) : (
                <></>
              )}
            </Menu.SubMenu>
          </>
        );
      })}
      {isCreator ? (
        <>
          <Menu.Divider />
          <Menu.Item>
            <Button
              type="link"
              onClick={() => {
                setTeacherAddModalVisible(true);
              }}
            >
              添加教师
            </Button>
          </Menu.Item>
        </>
      ) : (
        <></>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          指导教师列表
        </a>
      </Dropdown>
      <TeacherCreateModal
        contestId={Number(contestId)}
        visible={teacherAddModalVisible}
        setVisible={setTeacherAddModalVisible}
      />
    </>
  );
};
