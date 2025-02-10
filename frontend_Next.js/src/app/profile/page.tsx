"use client";

import {
  Camera,
  MapPin,
  LinkIcon,
  Twitter,
  Github,
  Edit2,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pt-20 px-4 mb-20">
      {/* Cover Image */}
      <div className="relative h-64 rounded-xl overflow-hidden mb-10 bg-gradient-to-r from-purple-600 to-indigo-600">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
          alt="Cover"
          className="w-full h-full object-cover opacity-75"
        />
        <button className="absolute bottom-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
          <Camera className="h-5 w-5 text-white" />
        </button>

        {/* Profile Picture */}
        <div className="absolute bottom-4 left-4">
          <div className="relative">
            <div className="h-28 w-28 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
              <Edit2 className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="">
        <div className="bg-gray-800 shadow-lg rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">John Doe</h1>
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <a
                  href="#"
                  className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300"
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>johndoe.dev</span>
                </a>
              </div>
            </div>
            <Link
              href="/profile/edit-profile"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Edit Profile
            </Link>
          </div>

          <p className="text-gray-300 mb-6 max-w-2xl">
            Full-stack developer passionate about creating beautiful and
            functional web applications. Love to explore new technologies and
            share knowledge with the community.
          </p>

          <div className="flex space-x-4 mb-8">
            <a
              href="#"
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <Twitter className="h-5 w-5 text-indigo-400" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <Github className="h-5 w-5 text-indigo-400" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Posts", value: "24" },
              { label: "Followers", value: "2.4k" },
              { label: "Following", value: "186" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-700 rounded-lg p-4 text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* User Posts */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={`https://source.unsplash.com/random/400x200?sig=${i}`}
                  alt="Post cover"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                        JD
                      </div>
                      <span className="text-sm text-gray-400">3 days ago</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">42</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white hover:text-indigo-400 transition-colors cursor-pointer mb-2">
                    Building Scalable Web Applications
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    Learn how to build web applications that can handle millions
                    of users while maintaining performance and reliability...
                  </p>
                  <div className="mt-4 flex space-x-2">
                    {["Web Dev", "Scalability"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700 text-indigo-400 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
