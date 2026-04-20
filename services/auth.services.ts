/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse, IRegisterResponse } from "@/types/auth.types";
import { ILoginPayload, IRegisterPayload, loginZodSchema, registerZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

// import { setTokenInCookies } from "@/lib/tokenUtils";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}


export const registerAction = async (
  payload: IRegisterPayload,
  redirectPath?: string,
): Promise<IRegisterResponse | ApiErrorResponse> => {
  const parsedPayload = registerZodSchema.safeParse(payload);

  console.log(parsedPayload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";

    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await httpClient.post<IRegisterResponse>(
      "/auth/register",
      parsedPayload.data,
    );

    console.log("response==========", response.data);

    const { accessToken, refreshToken, token, user, message } = response.data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }

    if (refreshToken) {
      await setTokenInCookies("refreshToken", refreshToken);
    }

    if (token) {
      await setTokenInCookies(
        "better-auth.session_token",
        token,
        24 * 60 * 60,
      );
    }

    if (user) {
      const { role, emailVerified, email } = user;

      if (!emailVerified) {
        redirect(`/verify-email?email=${email}`);
      }

      const targetPath =
        redirectPath && isValidRedirectForRole(redirectPath, role as UserRole)
          ? redirectPath
          : getDefaultDashboardRoute(role as UserRole);

      redirect(targetPath);
    }

    return response.data;
  } catch (error: any) {
    console.log(error, "error");

    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        `Registration failed: ${error.message}`,
    };
  }
};



export const loginAction = async (
  payload: ILoginPayload,
  redirectPath?: string,
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginZodSchema.safeParse(payload);

  console.log(parsedPayload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    };
  }
  try {
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data,
    );

    console.log("response==========", response.data);

    const { accessToken, refreshToken, token, user } = response.data;
    const { role, emailVerified, needPasswordChange, email } = user;
    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds

    // if(!emailVerified){
    //     redirect("/verify-email");
    // }else // in the catch block

    if (needPasswordChange) {
      //TODO : refactoring
      redirect(`/reset-password?email=${email}`);
    } else {
      // redirect(redirectPath || "/dashboard");
      const targetPath =
        redirectPath && isValidRedirectForRole(redirectPath, role as UserRole)
          ? redirectPath
          : getDefaultDashboardRoute(role as UserRole);
      console.log("targetPath====", targetPath);

      redirect(targetPath);
    }
  } catch (error: any) {
    console.log(error, "error");
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    if (
      error &&
      error.response &&
      error.response.data.message === "Email not verified"
    ) {
      redirect(`/verify-email?email=${payload.email}`);
    }
    return {
      success: false,
      message: `Login failed: ${error.message}`,
    };
  }
};

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    const { data } = await res.json();

    const { accessToken, refreshToken: newRefreshToken, token } = data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }

    if (token) {
      await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken) {
      return null;
    }

    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status, res.statusText);
      return null;
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

export const logoutAction = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    //  Call your backend logout endpoint
    // This triggers the AuthController.logoutUser logic you provided
    await fetch(`${BASE_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Backend logout failed:", error);
  } finally {
    // Always clear the cookies locally even if the fetch fails
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("better-auth.session_token");

    // Redirect to the home page
    redirect("/");
  }
};
