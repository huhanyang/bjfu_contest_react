import { Select, Spin } from "antd";
import { useState } from "react";
import { useSearchUser } from "../utils/user";
import { useDebounce } from "../utils";
import { UserType } from "../types/user";

export const UserSelect = ({
  types,
  value,
  setValue,
}: {
  types: UserType[];
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [name, setName] = useState("");
  const { data: users, isLoading } = useSearchUser(
    useDebounce(name, 200),
    types
  );

  return (
    <>
      <Select
        value={value}
        mode="multiple"
        placeholder="选择用户"
        filterOption={false}
        onSearch={(value) => {
          setName(value);
        }}
        notFoundContent={isLoading ? <Spin size="small" /> : null}
        onChange={(values) => {
          setValue(values);
        }}
        style={{ width: "100%" }}
        options={users?.map((value) => {
          return {
            label: `${value.college}:${value.name}:${value.account}`,
            value: value.account,
          };
        })}
      />
    </>
  );
};
