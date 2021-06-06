import { useParams } from "react-router";
import { ProcessInfo as ProcessInfoComponent } from "../../../../components/process/process-info";

export const ProcessInfo = () => {
  const { contestId, processId } = useParams();

  return (
    <>
      {contestId && processId ? (
        <ProcessInfoComponent
          contestId={Number(contestId)}
          processId={Number(processId)}
        />
      ) : (
        <></>
      )}
    </>
  );
};
