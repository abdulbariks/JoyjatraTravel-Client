import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

interface RegisterParams {
  searchParams: Promise<{ redirect?: string }>;
}
export default async function RegisterPage({ searchParams }: RegisterParams) {
  const params = await searchParams;
  const redirectPath = params.redirect;
  return <RegisterForm redirectPath={redirectPath} />;
}
