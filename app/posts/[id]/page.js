"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostDetails() {
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () =>
      (await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`))
        .data,
  });

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        {isLoading && <div>Loading...</div>}
        {error && <div className="text-red-500">Error loading post.</div>}
        {post && (
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose">{post.body}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
