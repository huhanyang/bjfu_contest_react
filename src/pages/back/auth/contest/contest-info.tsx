import { useParams } from "react-router";
import { ContestInfo as ContestInfoComponents } from "../../../../components/contest/contest-info";

export const ContestInfo = () => {
  const { contestId } = useParams();

  return (
    <>
      {contestId ? (
        <ContestInfoComponents contestId={Number(contestId)} />
      ) : (
        <></>
      )}
    </>
  );
};
