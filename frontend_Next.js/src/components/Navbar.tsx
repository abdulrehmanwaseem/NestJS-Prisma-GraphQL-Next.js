"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { Bell, PenSquare, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getInitials } from "@/lib/utils";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { signOut } from "@/redux/slice/authSlice";
import { useSignOutMutation } from "@/graphql/mutations/auth.mutation.generated";

export default function Navbar() {
  const dispatch = useDispatch();
  const [signOutMutation] = useSignOutMutation();
  const { user, isAuthenticated } = useCurrentUser();

  const [notifications, setNotifications] = useState(3);
  const pathname = usePathname();

  const signOutHandler = async () => {
    try {
      const { data } = await signOutMutation();
      if (data?.signOut) {
        dispatch(signOut());
      }
    } catch (error) {
      console.log("ERROR While signing out", error);
    }
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));
    return (
      <Link
        href={href}
        className={`px-4 py-2 rounded-full transition-colors text-purple-100 ${
          isActive
            ? "bg-purple-900 text-purple-200 font-semibold"
            : " hover:text-white hover:bg-gray-800"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700">
      <div className="container mx-auto px-10">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl font-bold gradient-primary bg-clip-text py-[0.4rem] px-3 rounded-xl text-gray-200"
            >
              BlogSpace
            </Link>

            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-2">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/explore">Explore</NavLink>
                <NavLink href="/bookmarks">Bookmarks</NavLink>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="hidden lg:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                    <input
                      type="search"
                      placeholder="Search posts..."
                      className="w-64 rounded-full bg-gray-800 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <button className="relative p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <Bell className="h-5 w-5 text-gray-300" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>

                <Link
                  href="/create-post"
                  className="hidden md:flex items-center gap-2 gradient-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <PenSquare className="h-4 w-4" />
                  <span>Write</span>
                </Link>

                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-800 transition-colors">
                    <div className="h-9 w-9 rounded-full gradient-primary text-white flex items-center justify-center text-sm font-medium">
                      {user?.profile && user.profile.avatar ? (
                        <Image
                          src={user.profile.avatar}
                          alt={user.username}
                          fill
                          className="object-cover rounded-full"
                        />
                      ) : (
                        getInitials(user?.username ?? "")
                      )}
                    </div>
                  </button>

                  <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-200"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/profile/edit-profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-200"
                    >
                      Edit Profile
                    </Link>
                    <hr className="my-2 border-gray-700" />
                    <button
                      onClick={signOutHandler}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 rounded-full text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-full gradient-primary gradient-hover text-white transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
