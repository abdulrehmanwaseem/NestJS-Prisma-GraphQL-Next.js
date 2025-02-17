"use client";

import { useState } from "react";
import { Camera, Mail, User, Lock, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import TwoFactorModal from "@/components/TwoFactorModal";
import { useUpdateUserMutation } from "@/graphql/mutations/user.mutation.generated";

const QR_CODE_DATA =
  "data:image/png;base64,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";
export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTwoFAEnabled, setIsTwoFAEnabled] = useState(false);
  const [showTwoFAModal, setShowTwoFAModal] = useState(false);
  const router = useRouter();
  const [updateUser] = useUpdateUserMutation();

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
      console.log(err);
    }
  };

  const handleTwoFAToggle = () => {
    if (!isTwoFAEnabled) {
      setShowTwoFAModal(true);
    } else {
      setIsTwoFAEnabled(false);
      // Handle disabling 2FA
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
                JD
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
                    checked={isTwoFAEnabled}
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
        onClose={() => {
          setShowTwoFAModal(false);
          setIsTwoFAEnabled(true);
        }}
        qrCodeData={QR_CODE_DATA}
      />
    </>
  );
}
