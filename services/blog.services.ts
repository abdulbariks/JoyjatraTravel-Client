"use server";

import { IBlog } from "@/types/blog.types";
import { httpClient } from "@/lib/axios/httpClient";

export const getBlogs = async (queryString?: string): Promise<IBlog[]> => {
  try {
    const res = await httpClient.get<IBlog[]>(
      queryString ? `/blog?${queryString}` : "/blog",
    );

    return res?.data ?? [];
  } catch (error) {
    console.log("Error fetching blogs:", error);
    return [];
  }
};
