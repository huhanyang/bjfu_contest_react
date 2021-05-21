import React from "react";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./pages/back/auth";
import { UnauthenticatedApp } from "./pages/back/unauth";

export const BackApp = () => {
  const { user } = useAuth();

  return <>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
};
