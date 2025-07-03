// components/FacebookBtn/page.jsx หรือ .tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function FacebookBtn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <p>✅ Logged in as: {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <img src={session.user.image} alt="Profile" width={50} />
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn("facebook")}>
        Sign in with Facebook
      </button>
    </div>
  );
}
