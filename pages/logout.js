import React, { useEffect } from "react";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const isLoggedIn = await new Magic(
          process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
        ).user.logout();

        if (isLoggedIn) {
          router.push("/");
        }
      } catch {
        // Handle errors if required!
      }
    };

    if (window) {
      logout();
    }
  }, [router]);

  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      logout
    </div>
  );
}
