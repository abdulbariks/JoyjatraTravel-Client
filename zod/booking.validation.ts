import z from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(11, "Phone must be at least 11 digits"),
  persons: z.string().min(1, "Select persons"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
