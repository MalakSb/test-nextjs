"use client";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/posts")).data,
  });

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Posts</h1>
        {isLoading && <div>Loading...</div>}
        {error && <div className="text-red-500">Error loading posts.</div>}
        <div className="space-y-4">
          {posts?.slice(0, 10).map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/posts/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{post.body.slice(0, 80)}...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
