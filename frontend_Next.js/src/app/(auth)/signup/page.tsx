"use client";

import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/graphql/mutations/auth.query.generated";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [signUp, { isLoading, error }] = useSignUpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({ input: { username, email, password } }).unwrap();
      router.push("/");
    } catch (err) {
      console.log("Signup failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Choose a username"
                required
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
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute right-3 top-3 h-5 w-5 text-white/40" />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-100 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                placeholder="Create a password"
                required
              />
              <Lock className="absolute right-3 top-3 h-5 w-5 text-white/40" />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {(error as any)?.data?.message || "Signup failed"}
            </p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg gradient-blue text-white bg-gradient-to-r from-purple-500 to-indigo-500 font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] flex items-center justify-center group disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Account"}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-blue-100">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-sky-400 hover:text-sky-300 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
