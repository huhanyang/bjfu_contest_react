import React from "react";
import { useAuth } from "./context/auth-context";
import { AuthenticatedBackApp } from "./pages/back/auth/AuthenticatedBackApp";
import { UnAuthenticatedBackApp } from "./pages/back/unauth/UnAuthenticatedBackApp";

export const BackApp = () => {
  const { user } = useAuth();
  return <>{user ? <AuthenticatedBackApp /> : <UnAuthenticatedBackApp />}</>;
};
