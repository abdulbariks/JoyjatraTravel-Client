"use server";

import { ICreateEventPayload, IEvent } from "@/types/event.types";
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
