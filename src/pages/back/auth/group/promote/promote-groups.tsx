import { message, Modal, Popover, Transfer } from "antd";
import { Group } from "../../../../../types/group";
import React from "react";
import {
  useDemoteGroups,
  useProcess,
  usePromotableGroups,
  usePromoteGroups,
} from "../../../../../utils/process";

export const ProcessPromoteGroups = ({
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
    data: promotableGroups,
    isLoading: isPromotableGroupsLoading,
  } = usePromotableGroups(processId);
  const { data: process, isLoading: isProcessLoading } = useProcess(
    contestId,
    processId
  );
  const {
    mutateAsync: promoteGroups,
    isLoading: isPromoteGroupsFinish,
  } = usePromoteGroups(processId);
  const {
    mutateAsync: demoteGroups,
    isLoading: isDemoteGroupsFinish,
  } = useDemoteGroups(processId);

  const promoteGroupsRequest = async (ids: number[]) => {
    try {
      await promoteGroups({ groupIds: ids });
    } catch (e) {
      message.error(e.message);
    }
  };

  const demoteGroupsRequest = async (ids: number[]) => {
    try {
      await demoteGroups({ groupIds: ids });
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Modal
        title="晋升队伍"
        footer={null}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Transfer<Group>
          dataSource={promotableGroups?.map((item) => {
            return { ...item, key: String(item.id) };
          })}
          targetKeys={process?.groups
            ?.map((item) => item.group)
            .map((item) => String(item.id))}
          titles={["上一流程队伍", "本流程的队伍"]}
          onChange={async (nextTargetKeys, direction, moveKeys) => {
            if (direction === "right") {
              await promoteGroupsRequest(moveKeys.map((item) => Number(item)));
            } else {
              await demoteGroupsRequest(moveKeys.map((item) => Number(item)));
            }
          }}
          render={(item) => (
            <>
              <Popover
                content={
                  <>
                    队长:{item.captain.name}
                    <br />
                    {item.teacher?.name ? (
                      <>指导教师:{item.teacher?.name}</>
                    ) : (
                      <></>
                    )}
                  </>
                }
                title={item.name}
              >
                {item.name}
              </Popover>
            </>
          )}
        />
      </Modal>
    </>
  );
};
