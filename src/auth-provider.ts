import { User } from "types/user";
import { Result } from "./types/result";

const apiUrl = process.env.REACT_APP_API_URL;

export const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = (result: Result<User>) => {
  if (result.object && result.object.token) {
    window.localStorage.setItem(localStorageKey, result.object.token);
  }
  return result.object;
};

export interface LoginForm {
  account: string;
  password: string;
}

export const login = (data: LoginForm) => {
  return fetch(`${apiUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export interface ActivateForm {
  token: string;
}

export const activate = (data: ActivateForm) => {
  return fetch(`${apiUrl}/user/activate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const refresh = () => {
  return fetch(`${apiUrl}/user/me`, {
    headers: {
      Authorization: getToken() ? `Bearer ${getToken()}` : "",
    },
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
