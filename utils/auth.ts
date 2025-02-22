import jwtDecode from "jwt-decode";

export const storeTokens = (access: string, refresh: string) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
};

export const getAccessToken = () => localStorage.getItem("access");

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

