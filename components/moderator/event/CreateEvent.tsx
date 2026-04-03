"use client";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import JoditEditor from "jodit-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  location: z.string().min(3, "Location is required"),
  image: z.string().min(1, "Image URL is required"),
  price: z.string().min(1, "Price is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  personLimit: z.string().min(1, "Person limit is required"),
  content: z.string().min(20, "Content is required"),
});

type EventFormData = z.infer<typeof eventSchema>;

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

export default function CreateEvent() {
  const [errors, setErrors] = useState<
    Partial<Record<keyof EventFormData, string[]>>
  >({});

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      image: "",
      price: "",
      startTime: "",
      endTime: "",
      personLimit: "",
      content: "",
    } as EventFormData,

    onSubmit: async ({ value }) => {
      const result = eventSchema.safeParse(value);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
        return;
      }

      console.log("Event Data:", result.data);

      setErrors({});
      form.reset();
    },
  });

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">Create Event</h2>
        </div>

        {/* Form */}
        <div className="bg-background border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Title */}
            <form.Field name="title">
              {(field) => (
                <div>
                  <Input
                    placeholder="Event Title"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title[0]}
                    </p>
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Image */}
              <form.Field name="image">
                {(field) => (
                  <div>
                    <Input
                      placeholder="Image URL"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Price */}
              <form.Field name="price">
                {(field) => (
                  <div>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Person Limit */}
              <form.Field name="personLimit">
                {(field) => (
                  <div>
                    <Input
                      type="number"
                      placeholder="Person Limit"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {errors.personLimit && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.personLimit[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Start Time */}
              <form.Field name="startTime">
                {(field) => (
                  <div>
                    <Input
                      type="datetime-local"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {errors.startTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.startTime[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* End Time */}
              <form.Field name="endTime">
                {(field) => (
                  <div>
                    <Input
                      type="datetime-local"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {errors.endTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.endTime[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Content */}
            <form.Field name="content">
              {(field) => (
                <div>
                  <div className="border rounded-lg overflow-hidden">
                    <JoditEditor
                      value={field.state.value}
                      config={editorConfig}
                      onBlur={(value) => field.handleChange(value)}
                    />
                  </div>
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.content[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Submit */}
            <Button type="submit" className="w-full h-11">
              Create Event
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
