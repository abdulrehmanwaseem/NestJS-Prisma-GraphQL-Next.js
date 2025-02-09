"use client";

import { useState } from "react";
import { Camera, Mail, User, Lock, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTwoFAEnabled, setIsTwoFAEnabled] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    router.push("/profile");
  };

  const handleTwoFAToggle = () => {
    setIsTwoFAEnabled(!isTwoFAEnabled);
    // Implement two-factor authentication logic here
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mt-20">
      <h2 className="text-3xl font-bold text-white mb-8">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-32 w-32 rounded-full gradient-blue flex items-center justify-center">
              <span className="text-4xl text-white font-bold">JD</span>
            </div>
            <button className="absolute bottom-0 right-0 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all">
              <Camera className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-blue-100 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                placeholder="Enter username"
              />
              <User className="absolute right-3 top-3 h-5 w-5 text-white/40" />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-100 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                placeholder="Enter email"
              />
              <Mail className="absolute right-3 top-3 h-5 w-5 text-white/40" />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-100 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                placeholder="Enter new password"
              />
              <Lock className="absolute right-3 top-3 h-5 w-5 text-white/40" />
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-sky-400" />
                <div>
                  <h3 className="text-white font-medium">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-blue-200">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isTwoFAEnabled}
                  onChange={handleTwoFAToggle}
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg gradient-blue text-white hover:opacity-90 transition-all transform hover:scale-[1.02]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
