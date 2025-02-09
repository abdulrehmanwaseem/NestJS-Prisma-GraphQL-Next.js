import Link from "next/link";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

export default function PostCard() {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
      <figure className="relative">
        <img
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          alt="Post cover"
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost bg-base-100/50 backdrop-blur-sm hover:bg-base-100">
          <Bookmark className="h-4 w-4" />
        </button>
      </figure>

      <div className="card-body p-5">
        <div className="flex items-center space-x-3 mb-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span className="text-xs">SW</span>
            </div>
          </div>
          <div>
            <p className="font-medium text-base-content">Sarah Wilson</p>
            <p className="text-xs text-base-content/60">2 hours ago</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex flex-wrap gap-2">
            {["Design", "UI/UX"].map((tag) => (
              <span key={tag} className="badge badge-primary badge-outline">
                {tag}
              </span>
            ))}
          </div>
          <Link
            href="/post/1"
            className="card-title text-base-content hover:text-primary transition-colors"
          >
            The Future of Web Development
          </Link>
          <p className="text-base-content/80 text-sm line-clamp-2">
            Exploring the latest trends and technologies shaping the future of
            web development. From new frameworks to innovative approaches...
          </p>
        </div>

        <div className="card-actions justify-between items-center pt-4 border-t border-base-200">
          <div className="flex items-center space-x-4">
            <button className="btn btn-ghost btn-sm gap-2">
              <Heart className="h-4 w-4" />
              <span className="text-xs">24</span>
            </button>
            <button className="btn btn-ghost btn-sm gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">12</span>
            </button>
          </div>
          <button className="btn btn-ghost btn-sm">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
