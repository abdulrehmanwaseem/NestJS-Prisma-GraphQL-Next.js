import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";

export default function Home() {
  return (
    <main className="container px-4 py-20 mx-auto">
      <Hero />
      <div className="mt-12">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            "All",
            "Technology",
            "Design",
            "Development",
            "AI",
            "Web3",
            "Programming",
            "Career",
          ].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-purple-900 hover:text-purple-300 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PostCard key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
