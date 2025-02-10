import Link from "next/link";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

export default function PostCard() {
  return (
    <div className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
      <figure className="relative">
        <img
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          alt="Post cover"
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors">
          <Bookmark className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </button>
      </figure>

      <div className="p-5">
        <div className="flex items-center space-x-3 mb-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
              SW
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Sarah Wilson
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              2 hours ago
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex flex-wrap gap-2">
            {["Design", "UI/UX"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href="/post/1" className="block">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              The Future of Web Development
            </h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            Exploring the latest trends and technologies shaping the future of
            web development. From new frameworks to innovative approaches...
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm">24</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">12</span>
            </button>
          </div>
          <button className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
