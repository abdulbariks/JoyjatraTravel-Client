"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import JoditEditor from "jodit-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBlog } from "@/services/blog.services";
import { useMutation } from "@tanstack/react-query";

const blogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  location: z.string().min(3, "Location is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  content: z.string().min(20, "Content is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface MyJoditConfig {
  readonly?: boolean;
  height?: number;
  statusbar?: boolean;
  showCharsCounter?: boolean;
  showWordsCounter?: boolean;
  showPoweredBy?: boolean;
}

const editorConfig: MyJoditConfig = {
  readonly: false,
  height: 300,
  statusbar: false,
  showCharsCounter: false,
  showWordsCounter: false,
  showPoweredBy: false,
};

export default function CreateBlog() {
  const [errors, setErrors] = useState<
    Partial<Record<keyof BlogFormData, string[]>>
  >({});

  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      alert("Event Created ✅");
      form.reset();
    },
    onError: () => {
      alert("Failed to create event ❌");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      imageUrl: "",
      content: "",
    } as BlogFormData,

    // onSubmit: async ({ value }) => {
    //   const result = blogSchema.safeParse(value);

    //   if (!result.success) {
    //     const fieldErrors = result.error.flatten().fieldErrors;
    //     setErrors(fieldErrors);
    //     return;
    //   }

    //   console.log("Blog Data:", result.data);

    //   setErrors({});
    //   form.reset();
    // },
    onSubmit: async ({ value }) => {
      const result = blogSchema.safeParse(value);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
        return;
      }
      const formData = new FormData();
      formData.append("title", result.data.title);
      formData.append("description", result.data.description);
      formData.append("location", result.data.location);
      formData.append("content", result.data.content);

      // image file
      if (imageFile) {
        formData.append("image", imageFile);
      }
      mutate(formData);

      setErrors({});
    },
  });

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <h2 className="text-2xl font-semibold">Create Blog</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Title */}
        <form.Field name="title">
          {(field) => (
            <div>
              <Input
                placeholder="Blog Title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => (
            <div>
              <Input
                placeholder="Short Description"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Location */}
        <form.Field name="location">
          {(field) => (
            <div>
              <Input
                placeholder="Location"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Image URL */}
        {/* <form.Field name="image">
          {(field) => (
            <div>
              <Input
                placeholder="Image URL"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image[0]}</p>
              )}
            </div>
          )}
        </form.Field> */}
        {/* Image */}
        <form.Field name="imageUrl">
          {(field) => (
            <div className="space-y-2">
              {/* File Input */}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImageFile(file);
                  //  show file name instead of preview
                  field.handleChange(file.name);
                }}
              />
              {/* File Name Display */}
              {field.state.value && (
                <p className="text-sm text-muted-foreground">
                  Selected: {field.state.value}
                </p>
              )}

              {/* Error */}
              {errors.imageUrl && (
                <p className="text-red-500 text-sm">{errors.imageUrl[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Content (Jodit Editor) */}
        <form.Field name="content">
          {(field) => (
            <div>
              <JoditEditor
                value={field.state.value}
                config={editorConfig}
                onBlur={(newContent) => field.handleChange(newContent)}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Submit */}
        <Button type="submit" className="w-full">
          Create Blog
        </Button>
      </form>
    </div>
  );
}
