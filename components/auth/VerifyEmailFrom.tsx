"use client";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { verifyEmailAction } from "@/services/auth.services";
import {
  verifyEmailZodSchema,
  IVerifyEmailPayload,
} from "@/zod/auth.validation";

interface VerifyEmailFormProps {
  email: string;
}

const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IVerifyEmailPayload) => verifyEmailAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: email, // Pre-filled from URL params
      code: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      const result = await mutateAsync(value);
      if (!result.success) {
        setServerError(result.message);
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-md my-5">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          Enter the code sent to <strong>{email}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Hidden Email Field */}
          <form.Field name="email">
            {(field) => <input type="hidden" value={field.state.value} />}
          </form.Field>

          {/* OTP Input */}
          <form.Field
            name="code"
            validators={{ onChange: verifyEmailZodSchema.shape.code }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Verification Code"
                type="text"
                placeholder="Enter 6-digit code"
              />
            )}
          </form.Field>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Verifying..."
                disabled={!canSubmit}
              >
                Verify Email
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyEmailForm;
