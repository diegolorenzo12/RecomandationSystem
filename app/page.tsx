// mark as client component
"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (status === "authenticated") {
      router.push("/recomendations");
    } else {
      router.push("/login");
    }
  }, [status, router]);
    // rendering components for logged in users
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-2xl mb-2">Welcome to lean match</p>
      </div>
    )
}
