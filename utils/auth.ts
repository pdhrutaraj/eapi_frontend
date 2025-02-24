//import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { jwtDecode } from "jwtDecode";
export const storeTokens = (access: string, refresh: string) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
};

export const getAccessToken = () => localStorage.getItem("access");

//import { useRouter } from "next/router";

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  window.location.href = "/login"; // Ensures full reload and redirect
};
/*
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
*/
