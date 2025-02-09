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
    <div className="max-w-4xl mx-auto animate-fadeIn mt-20">
      {/* Cover Image */}
      <div className="relative h-64 rounded-box overflow-hidden mb-16 bg-gradient-to-r from-primary to-secondary">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
          alt="Cover"
          className="w-full h-full object-cover opacity-75"
        />
        <button className="absolute bottom-4 right-4 btn btn-circle btn-sm">
          <Camera className="h-5 w-5" />
        </button>

        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-8">
          <div className="relative">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-32 ring ring-base-100">
                <span className="text-4xl">JD</span>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 btn btn-circle btn-sm">
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-8">
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                <div className="flex items-center space-x-4 text-base-content/70">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <a
                    href="#"
                    className="flex items-center space-x-1 text-primary hover:text-primary-focus"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span>johndoe.dev</span>
                  </a>
                </div>
              </div>
              <Link href="/edit-profile" className="btn btn-primary">
                Edit Profile
              </Link>
            </div>

            <p className="text-base-content/70 mt-4 mb-6 max-w-2xl">
              Full-stack developer passionate about creating beautiful and
              functional web applications. Love to explore new technologies and
              share knowledge with the community.
            </p>

            <div className="flex space-x-4 mb-8">
              <a href="#" className="btn btn-ghost btn-sm">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="btn btn-ghost btn-sm">
                <Github className="h-5 w-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Posts</div>
                <div className="stat-value">24</div>
              </div>
              <div className="stat">
                <div className="stat-title">Followers</div>
                <div className="stat-value">2.4k</div>
              </div>
              <div className="stat">
                <div className="stat-title">Following</div>
                <div className="stat-value">186</div>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <span>JD</span>
                        </div>
                      </div>
                      <span className="text-sm text-base-content/70">
                        3 days ago
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-base-content/70">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">42</span>
                    </div>
                  </div>
                  <h3 className="card-title hover:text-primary cursor-pointer transition-colors">
                    Building Scalable Web Applications
                  </h3>
                  <p className="text-base-content/70 text-sm line-clamp-2">
                    Learn how to build web applications that can handle millions
                    of users while maintaining performance and reliability...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
