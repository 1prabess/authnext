"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const path = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      const updateSession = async () => {
        await session.update();
      };

      updateSession();
    }
  }, [path]);

  const handleSignOut = () => {
    signOut();
  };
  return (
    <nav className={cn("flex items-center justify-between p-4 shadow-sm  ")}>
      <Link
        href="/"
        className="px-3 py-1 font-bold text-black  dark:text-white"
      >
        authNext
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />

        {!isLoggedIn && (
          <>
            <Link
              href="/login"
              className="px-3 py-1 text-black dark:text-white"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 py-1   text-black dark:text-white"
            >
              Register
            </Link>
          </>
        )}

        {isLoggedIn && <button onClick={handleSignOut}>Signout</button>}
      </div>
    </nav>
  );
}
