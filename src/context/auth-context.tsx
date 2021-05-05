import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { User } from "types/user";
import { useQueryClient } from "react-query";
import { localStorageKey, LoginForm, ActivateForm } from "auth-provider";

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // 刷新token
    user = await http("user/me", { token });
    window.localStorage.setItem(localStorageKey, user.token || "");
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: LoginForm) => Promise<void>;
      activate: (form: ActivateForm) => Promise<void>;
      refresh: () => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const queryClient = useQueryClient();

  // point free
  const login = (form: LoginForm) => auth.login(form).then(setUser);
  const refresh = () => auth.refresh().then(setUser);
  const activate = (form: ActivateForm) => auth.activate(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, activate, logout, refresh }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
