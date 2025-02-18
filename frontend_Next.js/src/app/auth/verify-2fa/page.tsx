"use client";

import { useState, useEffect } from "react";
import { Key, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useVerify2FALoginMutation } from "@/graphql/mutations/auth.mutation.generated";

export default function Verify2FA() {
  const [token, setToken] = useState("");
  const router = useRouter();
  const [verify2FA, { isLoading }] = useVerify2FALoginMutation();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userIdFor2FA"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("User ID not found. Please sign in again.");
      router.push("/auth/signin");
      return;
    }

    try {
      await verify2FA({ token, userId }).unwrap();
      localStorage.removeItem("userIdFor2FA");
      router.push("/");
    } catch (err) {
      toast.error((err as any)?.message || "Invalid OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Two-Factor Authentication
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="token"
              className="block text-sm font-medium text-blue-100 mb-2"
            >
              Enter OTP
            </label>
            <div className="relative">
              <input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                placeholder="Enter your OTP"
                required
              />
              <Key className="absolute right-3 top-3 h-5 w-5 text-white/40" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] flex items-center justify-center group disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
