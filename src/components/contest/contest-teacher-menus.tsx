import { useContest } from "../../utils/contest";
import React, { useState } from "react";
import { useDeleteTeacher } from "../../utils/teacher";
import { Button, Dropdown, Menu, message } from "antd";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import { ContestSelectTeacherModal } from "./contest-select-teacher-modal";

export const ContestTeacherMenus = ({
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
                  <Button
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
                  </Button>
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
        <Button type="link" className="ant-dropdown-link">
          指导教师列表
        </Button>
      </Dropdown>
      <ContestSelectTeacherModal
        contestId={Number(contestId)}
        visible={teacherAddModalVisible}
        setVisible={setTeacherAddModalVisible}
      />
    </>
  );
};
