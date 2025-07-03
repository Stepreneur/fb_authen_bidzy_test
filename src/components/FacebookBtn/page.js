"use client";
import { signIn } from "next-auth/react";

export default function FacebookBtn() {
  return (
    <button onClick={() => signIn("facebook")}>
      Sign in with Facebook
    </button>
  );
}