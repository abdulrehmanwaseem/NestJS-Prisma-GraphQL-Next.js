"use client";

import { useEffect, useState } from "react";
import { Camera, User, Lock, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import TwoFactorModal from "@/components/TwoFactorModal";
import { useUpdateUserMutation } from "@/graphql/mutations/user.mutation.generated";
import {
  useDisable2FAMutation,
  useEnable2FAMutation,
} from "@/graphql/mutations/auth.mutation.generated";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function EditProfile() {
  const { user } = useCurrentUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showTwoFAModal, setShowTwoFAModal] = useState(false);
  const router = useRouter();

  const [updateUser] = useUpdateUserMutation();
  const [enable2FA, { data: enableData }] = useEnable2FAMutation();
  const [disable2FA] = useDisable2FAMutation();

  useEffect(() => {
    setUsername(user?.username || "");
    setTwoFAEnabled(user?.isTwoFAEnabled || false);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Record<string, any> = { username };

      if (password.trim()) {
        payload.password = password;
      }

      await updateUser({ input: payload }).unwrap();
      router.push("/profile");
    } catch (err) {
      console.log("Error updating profile:", err);
    }
  };

  const handleTwoFAToggle = async () => {
    try {
      if (!twoFAEnabled) {
        await enable2FA().unwrap();
        setTwoFAEnabled(true);
        setShowTwoFAModal(true);
      } else {
        await disable2FA().unwrap();
        setTwoFAEnabled(false);
      }
    } catch (err) {
      console.error("Error toggling 2FA:", err);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-xl mt-20 mb-4">
        <h2 className="text-3xl font-bold text-white mb-8">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold">
                {username ? username.charAt(0).toUpperCase() : "JD"}
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors">
                <Camera className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Enter username"
                />
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Enter new password"
                />
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-indigo-400" />
                  <div>
                    <h3 className="text-white font-medium">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-300">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={twoFAEnabled}
                    onChange={handleTwoFAToggle}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <TwoFactorModal
        isOpen={showTwoFAModal}
        onClose={() => setShowTwoFAModal(false)}
        qrCodeData={enableData?.enable2FA || ""}
      />
    </>
  );
}
