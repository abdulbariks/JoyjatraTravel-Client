import { Gender } from "@/types/moderator.types";
import { z } from "zod";

export const ModeratorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
  profilePhoto: z.string().url("Invalid image URL").nullable(),
  contactNumber: z.string().min(1, "Contact number is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
  experience: z.string().min(0, "Experience is required").optional(),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
  qualification: z.string().min(1, "Qualification is required").optional(),
});

// To extract the type from the schema:
export type TModerator = z.infer<typeof ModeratorSchema>;
