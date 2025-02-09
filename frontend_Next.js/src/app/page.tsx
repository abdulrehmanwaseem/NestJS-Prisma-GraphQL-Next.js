import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";

export default function Home() {
  return (
    <main className="container px-4 py-8 pt-20 mx-auto">
      <Hero />
      <div className="mt-12">
        <div className="justify-center mb-8 tabs tabs-boxed">
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
            <a key={tag} className="tab">
              {tag}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PostCard key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
