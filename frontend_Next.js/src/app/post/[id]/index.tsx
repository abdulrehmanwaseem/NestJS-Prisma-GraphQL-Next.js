"use client";

import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PostDetail({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn mt-20">
      <Link
        href="/"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 group"
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to posts</span>
      </Link>

      <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
          alt="Post cover"
          width={2000}
          height={400}
          className="w-full h-[400px] object-cover"
        />

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 ring-4 ring-white" />
              <div>
                <h3 className="font-semibold text-gray-900">Sarah Wilson</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>2 hours ago</span>
                  <span>•</span>
                  <span>8 min read</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bookmark className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            The Future of Web Development
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Technology", "Web Development", "Future"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-indigo max-w-none">
            <p>
              The landscape of web development is constantly evolving, bringing
              new challenges and opportunities for developers. In this post,
              we'll explore the latest trends and technologies that are shaping
              the future of web development.
            </p>
            <h2>The Rise of Web Components</h2>
            <p>
              Web Components are becoming increasingly popular as they allow
              developers to create reusable custom elements with encapsulated
              functionality and styling. This approach to building user
              interfaces is changing how we think about component architecture.
            </p>
            <h2>AI-Powered Development</h2>
            <p>
              Artificial Intelligence is revolutionizing how we write and
              maintain code. From intelligent code completion to automated
              testing, AI tools are making developers more productive than ever
              before.
            </p>
          </div>

          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors">
                <Heart className="h-6 w-6" />
                <span>242 likes</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500 transition-colors">
                <MessageCircle className="h-6 w-6" />
                <span>28 comments</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500 transition-colors">
              <Share2 className="h-6 w-6" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-50 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Comments</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        Alex Johnson
                      </h4>
                      <span className="text-sm text-gray-500">1 hour ago</span>
                    </div>
                    <p className="text-gray-600">
                      Great insights! I especially agree with your points about
                      AI-powered development tools. They're definitely changing
                      the game.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 ml-4">
                    <button className="text-sm text-gray-500 hover:text-indigo-600">
                      Reply
                    </button>
                    <button className="text-sm text-gray-500 hover:text-pink-500">
                      Like
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div className="mt-8">
            <div className="flex space-x-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex-shrink-0" />
              <div className="flex-1">
                <textarea
                  placeholder="Write a comment..."
                  className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
