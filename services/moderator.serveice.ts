"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { IModerator } from "@/types/moderator.types";
import { ModeratorSchema } from "@/zod/moderator.validation";

export const getModerators = async (queryString: string) => {
  try {
    const moderators = await httpClient.get<IModerator[]>(
      queryString ? `/moderator?${queryString}` : "/moderator",
    );
    return moderators;
  } catch (error) {
    console.log("Error fetching moderators:", error);
    throw error;
  }
};

export const createModerator = async (
  payload: IModerator,
): Promise<ApiResponse<IModerator>> => {
  try {
    // Ensure the endpoint matches your backend route
    const response = await httpClient.post<ApiResponse<IModerator>>(
      "/users/create-moderator",
      payload,
    );
    return response?.data;
  } catch (error) {
    console.error("Error creating moderator:", error);
    // Throwing the error here allows the createModeratorAction
    // to catch it in its try/catch block
    throw error;
  }
};
