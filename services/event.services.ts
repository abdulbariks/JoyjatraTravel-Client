"use server";

import { IEvent, IEventResponse } from "@/types/event.types";
import { httpClient } from "@/lib/axios/httpClient";

export const getEvents = async (queryString: string = ""): Promise<IEvent[]> => {
  try {
    // 1. Fetch the full API response
    const res = await httpClient.get<IEventResponse>(
      queryString ? `/event?${queryString}` : "/event"
    );
    return res.data?.data?? [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const createEvent = async (
  formData: FormData,
): Promise<IEvent | null> => {
  try {
    const res = await httpClient.post<IEvent>("/event/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data ?? null;
  } catch (error) {
    console.log("Error creating event:", error);
    return null;
  }
};
