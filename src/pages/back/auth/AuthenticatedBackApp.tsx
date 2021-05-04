import React from "react";
import { Navigate } from "react-router";

export const AuthenticatedBackApp = () => {
  return (
    <>
      <Navigate to={"/test"} />
    </>
  );
};
