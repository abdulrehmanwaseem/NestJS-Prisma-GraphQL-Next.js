import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-3xl mt-2">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 mix-blend-multiply " />
      <Image
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt="Hero background"
        layout="fill"
        fetchPriority="high"
        objectFit="cover"
        priority
      />
      <div className="relative px-8 py-24  sm:px-16 sm:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Share Your Stories,
            <br />
            Connect with the World
          </h1>
          <p className="text-lg sm:text-xl text-purple-50 mb-8 max-w-2xl">
            Join our community of writers, thinkers, and creators. Share your
            unique perspective and connect with readers from around the globe.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/auth/signup"
              className="px-8 py-3 rounded-full bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 hover:shadow-lg flex items-center group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-full border-2 border-white/80 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="grid grid-cols-3 divide-x divide-white/20">
          {[
            { value: "10K+", label: "Active Writers" },
            { value: "100K+", label: "Monthly Readers" },
            { value: "50K+", label: "Published Stories" },
          ].map((stat) => (
            <div key={stat.label} className="px-8 py-6 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-purple-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
