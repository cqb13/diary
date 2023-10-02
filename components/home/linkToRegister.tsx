"use client";

import { useRouter } from "next/navigation";

export default function LinkToRegister() {
  const router = useRouter();

  return (
    <button
      className="rounded-lg bg-black p-2 tracking-wide transition-all hover:text-primary active:tracking-widest"
      onClick={() => router.push("/register")}
    >
      Join Now
    </button>
  );
}
