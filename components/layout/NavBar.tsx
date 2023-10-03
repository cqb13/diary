"use client";

import { useAuthContext } from "@/lib/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import signOutUser from "@/utils/firebase/signOut";
import useScroll from "@lib/hooks/useScroll";
import routes from "@lib/routes";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext() as { user: any };

  const findVisibility = (signedIn: boolean, signedOut: boolean) => {
    if (signedIn && signedOut) return true;
    if (signedIn && !signedOut && user) return true;
    if (!signedIn && signedOut && !user) return true;
    return false;
  };

  const handleSignOut = async () => {
    await signOutUser();
    router.push("/");
  };

  return (
    <nav
      className={`${
        useScroll(75) ? "shadow-bar backdrop-blur-sm sticky top-0 " : ""
      }
        : ""} flex items-center justify-between gap-2 max-xs:flex-col z-50 transition-all px-2 rounded-b-lg`}
    >
      <p className="p-1 text-primary">My Online Diary</p>
      <div className="flex items-center gap-2">
        {routes.map((route) => (
          <button
            type="button"
            key={route.name}
            onClick={() => router.push(route.path)}
            className={`${
              pathname === route.path ? "text-highlight" : ""
            } rounded p-1 text-primary ${
              findVisibility(route.signedIn, route.signedOut) ? "" : "hidden"
            }`}
          >
            {route.name}
          </button>
        ))}

        {user && (
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded p-1 text-primary"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
