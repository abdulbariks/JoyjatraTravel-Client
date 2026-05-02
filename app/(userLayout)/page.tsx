import Blog from "@/components/blog";
import Contact from "@/components/contact";
import Features from "@/components/features";
import FreaturesBlogs from "@/components/FreaturesBlogs";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <Features />
      <FreaturesBlogs />
      <Contact />
    </div>
  );
}
