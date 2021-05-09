import React, { useState } from "react";
import { Link } from "react-router-dom";
import { generatePath, useNavigate, useParams } from "react-router";
import { Button, Descriptions, message, Popconfirm } from "antd";
import { useAuth } from "../../../../../context/auth-context";
import { useContest } from "../../../../../utils/contest";
import { PageLoading } from "../../../../../components/lib";
import { ContestEditInfoModal } from "./ContestEditInfoModal";
import { useHttp } from "../../../../../utils/http";
import { useAsync } from "../../../../../utils/use-async";

export const ContestInfo = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const { contestId } = useParams();
  const { data: contest, isLoading } = useContest(Number(contestId));
  const navigate = useNavigate();
  const client = useHttp();
  const { run } = useAsync(undefined, { throwOnError: true });

  const Operate = ({ id }: { id: number }) => {
    return (
      <>
        <Button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          编辑信息
        </Button>
        <Popconfirm
          onConfirm={async () => {
            try {
              await run(
                client("contest/delete", {
                  data: { contestId: id },
                  method: "DELETE",
                })
              ).then(() => {
                navigate("../", { replace: true });
              });
            } catch (e) {
              message.error(e.message);
            }
          }}
          title="确定要删除此竞赛么?"
          okText="删除"
          cancelText="取消"
        >
          <Button>删除竞赛</Button>
        </Popconfirm>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <Descriptions
          title={contest?.name}
          extra={
            user?.id === contest?.creator.id ? (
              <Operate id={Number(contest?.id)} />
            ) : (
              <></>
            )
          }
        >
          <Descriptions.Item label="竞赛名称">
            {contest?.name}
          </Descriptions.Item>
          <Descriptions.Item label="创建人">
            <Link
              to={generatePath("/back/userInfo/:userId", {
                userId: String(contest?.creator.id),
              })}
            >
              {contest?.creator.name}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="竞赛简介">
            {contest?.summary}
          </Descriptions.Item>
          <Descriptions.Item label="竞赛描述">
            {contest?.description}
          </Descriptions.Item>
          <Descriptions.Item label="竞赛状态">
            {contest?.status}
          </Descriptions.Item>
          <Descriptions.Item label="队伍人数上限">
            {contest?.groupMemberCount}
          </Descriptions.Item>
        </Descriptions>
      )}
      {contest?.creator.id === user?.id ? (
        <ContestEditInfoModal
          contestId={Number(contest?.id)}
          visible={visible}
          setVisible={setVisible}
        />
      ) : (
        <></>
      )}
    </>
  );
};
