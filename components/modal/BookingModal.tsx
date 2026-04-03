"use client";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingFormData, bookingSchema } from "@/zod/booking.validation";

export default function BookingModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFormData, string[]>>
  >({});

  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      persons: "",
    } as BookingFormData,

    onSubmit: async ({ value }) => {
      const result = bookingSchema.safeParse(value);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors(fieldErrors);
        return;
      }
      setErrors({});
      console.log("Booking Data:", result.data);
      form.reset();
      setOpen(false);
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          form.reset();
          setErrors({});
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Your Trip</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Name */}
          <form.Field name="name">
            {(field) => (
              <div>
                <Input
                  placeholder="Your Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Address */}
          <form.Field name="address">
            {(field) => (
              <div>
                <Input
                  placeholder="Your Address"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Phone */}
          <form.Field name="phone">
            {(field) => (
              <div>
                <Input
                  placeholder="Phone Number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Persons */}
          <form.Field name="persons">
            {(field) => (
              <div>
                <Select
                  onValueChange={(val) => field.handleChange(val ?? "")}
                  value={field.state.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Persons" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 Persons</SelectItem>
                    <SelectItem value="3">3 Persons</SelectItem>
                    <SelectItem value="4">4 Persons</SelectItem>
                  </SelectContent>
                </Select>

                {errors.persons && (
                  <p className="text-red-500 text-sm">{errors.persons[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Confirm Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
