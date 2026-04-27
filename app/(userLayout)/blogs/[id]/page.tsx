import BlogDetails from "@/components/BlogDetails";
import React from "react";

const blogData = {
  id: "019daf15-a535-774a-8a18-e8a7ce146295",
  title: "Excepturi porro quis",
  location: "Et excepturi ab eius",
  description: "Quisquam molestias o",
  imageUrl:
    "https://res.cloudinary.com/di4lxioem/image/upload/v1776758922/joyjatra-travel/images/uh6fdqk380e-1776758920136-----sajek-valley-tour-package-2.webp",
  content: "<p>Eu veniam, minim nob. nice</p>",
  isDeleted: false,
  deletedAt: null,
  createdAt: "2026-04-21T08:08:44.597Z",
  updatedAt: "2026-04-21T08:08:44.597Z",
  moderatorId: "019da9ca-843e-70e9-a747-2f150958a16d",
  moderator: {
    id: "019da9ca-843e-70e9-a747-2f150958a16d",
    name: "Abdul Barik",
    email: "moderator@gmial.com",
    profilePhoto: null,
    contactNumber: null,
    address: null,
    isDeleted: false,
    deletedAt: null,
    experience: 0,
    gender: "MALE",
    qualification: null,
    createdAt: "2026-04-20T07:28:34.878Z",
    updatedAt: "2026-04-20T07:28:34.878Z",
    userId: "GuQWZf7lAunCnczZkh2u64VAk5XBuDwf",
  },
  reviews: [],
};

export default function BlogDetailsPage() {
  return <BlogDetails blog={blogData} />;
}
