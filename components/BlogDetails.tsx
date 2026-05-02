"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, MapPin, Star, User, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// Interface based on your JSON structure
interface Blog {
  title: string;
  location: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  moderator: {
    name: string;
    profilePhoto?: string | null;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
}

export default function BlogDetails({ blog }: { blog: Blog }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-6">
        <img
          src={
            blog.imageUrl ||
            "https://res.cloudinary.com/di4lxioem/image/upload/v1776758922/joyjatra-travel/images/uh6fdqk380e-1776758920136-----sajek-valley-tour-package-2.webp"
          }
          alt={blog.title}
          className="w-full h-80 object-cover rounded-2xl shadow-md"
        />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{blog.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(blog.createdAt), "PPP")}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {blog.location}
            </div>
          </div>
        </div>

        <Separator />

        {/* Render HTML content */}
        <div
          className="prose prose-slate max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <Separator />

        {/* Review Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold">Reviews</h3>

          {/* Review Form */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Write a Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button>Submit Review</Button>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Sidebar: Moderator Info */}
      <div className="lg:col-span-1">
        <div className="sticky top-20">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Blog Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={blog.moderator.profilePhoto || ""} />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-xl font-semibold">{blog.moderator.name}</h4>
                <Badge variant="secondary" className="mt-2">
                  Travel Moderator
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
