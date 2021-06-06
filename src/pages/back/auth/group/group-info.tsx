import { useParams } from "react-router";
import { GroupInfo as GroupInfoComponent } from "../../../../components/group/group-info";

export const GroupInfo = () => {
  const { contestId, groupId } = useParams();

  return (
    <>
      {contestId && groupId ? (
        <GroupInfoComponent
          contestId={Number(contestId)}
          groupId={Number(groupId)}
        />
      ) : (
        <>页面参数不正确，请重试！</>
      )}
    </>
  );
};
