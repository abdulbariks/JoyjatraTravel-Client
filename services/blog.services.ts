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


export const createBlog = async (
  formData: FormData,
): Promise<IBlog | null> => {
  try {
    const res = await httpClient.post<IBlog>("/blog/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data ?? null;
  } catch (error) {
    console.log("Error creating blog:", error);
    return null;
  }
};
