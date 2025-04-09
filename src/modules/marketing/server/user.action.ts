"use server";

import { handleServerError } from "@/lib/handle-server-error";
import { LoginFormSchemaType } from "../Login";
import { env } from "@/data/env/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const userLogin = async (loginInfo: LoginFormSchemaType) => {
  try {
    if (loginInfo.userName !== env.ADMIN_USERNAME) {
      return { error: "invalid credentials" };
    }
    if (loginInfo.password !== env.ADMIN_PASSWORD) {
      return { error: "invalid credentials" };
    }

    const cookieStore = await cookies();

    // Generate JWT token
    const token = jwt.sign({ userName: loginInfo.userName }, env.JWT_SECRET, {
      expiresIn: "365d",
    });

    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: 60 * 60 * 24 * 365,
      maxAge: 60 * 60 * 24 * 365,
    });

    return { message: "Login successfull" };
  } catch (error) {
    return handleServerError(error);
  }
};

export const isAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) {
    return false;
  }
  const decoded = jwtDecode(token) as { userName: string; exp: number };

  const now = Math.floor(Date.now() / 1000); // current time in seconds
  const isExpired = decoded.exp < now;

  if (!isExpired) {
    return true;
  } else {
    cookieStore.delete("auth_token");
  }
  return false;
};

export const userLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/");
};
