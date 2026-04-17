"use server";

import { IEvent } from "@/types/event.types";
import { httpClient } from "@/lib/axios/httpClient";

export const getEvents = async (queryString?: string): Promise<IEvent[]> => {
  try {
    const res = await httpClient.get<IEvent[]>(
      queryString ? `/event?${queryString}` : "/event",
    );

    return res?.data ?? [];
  } catch (error) {
    console.log("Error fetching events:", error);
    return [];
  }
};
