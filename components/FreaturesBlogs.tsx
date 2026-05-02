import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBlogs } from "@/services/blog.services";
import Link from "next/link";

export default async function FreaturesBlogs() {
  const blogs = await getBlogs();
  // console.log("==========events", events);
  if (!blogs || blogs.length === 0) {
    return <div className="text-center py-20">No adventures found.</div>;
  }

  return (
    <div className="mx-auto w-full max-w-(--breakpoint-lg) px-6 py-12 xl:px-0">
      <div className="flex items-end justify-between">
        <h2 className="font-semibold text-3xl tracking-tight">Latest Blogs</h2>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`}>
            <Card className="gap-3 bg-muted/30 py-0 shadow-none">
              <CardHeader className="p-1.5 pb-0">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    alt={post.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={post.imageUrl}
                    unoptimized
                  />
                </div>
              </CardHeader>
              <CardContent className="px-4 pt-0 pb-5">
                <Badge variant="secondary">
                  {post.description || "Sports"}
                </Badge>

                <h3 className="mt-4 font-semibold text-2xl text-[1.4rem] tracking-[-0.015em]">
                  {post.title}
                </h3>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      alt={post?.moderator?.name}
                      className="size-8 rounded-full object-cover"
                      height={32}
                      src={
                        post?.moderator?.profilePhoto || "/default-profile.png"
                      }
                      width={32}
                    />
                    <span className="font-medium text-muted-foreground">
                      {post.moderator?.name}
                    </span>
                  </div>

                  <span className="text-muted-foreground text-sm">
                    {post.createdAt.slice(0, 10)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
