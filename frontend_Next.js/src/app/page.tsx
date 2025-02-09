"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation */}
      <div className="navbar bg-base-100 fixed top-0 z-50 shadow-lg">
        <div className="flex-none">
          {isAuthenticated && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn btn-ghost btn-circle lg:hidden"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>
        <div className="flex-1">
          <h1
            onClick={() => setCurrentView("home")}
            className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity ml-2"
          >
            BlogSpace
          </h1>
        </div>

        {isAuthenticated ? (
          <div className="flex-none gap-2">
            <div className="form-control hidden lg:block">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="input input-bordered w-64"
                />
                <button className="btn btn-square btn-primary">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <Bell className="h-5 w-5" />
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
                  <span className="font-bold text-lg">8 New Notifications</span>
                  <span className="text-info">View all notifications</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View all
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView("create")}
              className="btn btn-primary btn-sm"
            >
              <PenSquare className="h-4 w-4" />
              <span className="hidden md:inline ml-2">New Post</span>
            </button>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar placeholder"
              >
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span>JD</span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a
                    onClick={() => setCurrentView("profile")}
                    className="justify-between"
                  >
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a onClick={() => setCurrentView("edit-profile")}>
                    Edit Profile
                  </a>
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
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex-none">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle mr-2"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setCurrentView("login")}
              className="btn btn-ghost"
            >
              Login
            </button>
            <button
              onClick={() => setCurrentView("signup")}
              className="btn btn-primary ml-2"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
