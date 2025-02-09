"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, Moon, PenSquare, Search, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const pathname = usePathname();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="fixed top-0 z-50 shadow-lg navbar bg-base-100 w-full">
      <div className="flex-none">
        {isAuthenticated && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="btn btn-ghost btn-circle lg:hidden"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
      <div className="flex-1">
        <Link
          href="/"
          className="ml-2 text-2xl font-bold transition-opacity cursor-pointer text-primary hover:opacity-80"
        >
          BlogSpace
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="flex-none gap-2">
          <div className="hidden form-control lg:block">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-64 input input-bordered"
              />
              <button className="btn btn-square btn-primary">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="badge badge-sm badge-primary indicator-item">
                    {notifications}
                  </span>
                )}
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 New Notifications</span>
                <span className="text-info">View all notifications</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View all
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Link href="/create-post" className="btn btn-primary btn-sm">
            <PenSquare className="w-4 h-4" />
            <span className="hidden ml-2 md:inline">New Post</span>
          </Link>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div className="w-10 rounded-full bg-neutral text-neutral-content">
                <span>JD</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link href="/edit-profile">Edit Profile</Link>
              </li>
              <li>
                <details>
                  <summary>Settings</summary>
                  <ul>
                    <li>
                      <a>Account</a>
                    </li>
                    <li>
                      <a>Security</a>
                    </li>
                    <li>
                      <a>Notifications</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a onClick={() => setIsAuthenticated(false)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex-none">
          <button
            onClick={toggleTheme}
            className="mr-2 btn btn-ghost btn-circle"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          <Link href="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link href="/signup" className="ml-2 btn btn-primary">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
