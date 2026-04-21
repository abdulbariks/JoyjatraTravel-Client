import VerifyEmailForm from "@/components/auth/VerifyEmailFrom";
import { redirect } from "next/navigation";

interface PageParams {
  searchParams: Promise<{ email?: string }>;
}

const VerifyEmailPage = async ({ searchParams }: PageParams) => {
  const params = await searchParams;
  const email = params.email;

  // If no email is provided, redirect to registration
  if (!email) {
    redirect("/register");
  }

  return <VerifyEmailForm email={email} />;
};

export default VerifyEmailPage;
