"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostModal from "@/components/postModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { toast } from "sonner";

export default function AdminDashboard() {
  const [localPosts, setLocalPosts] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [deletePost, setDeletePost] = useState(null);

  const {
    data: apiPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/posts")).data,
  });

  const posts = useMemo(() => {
    let merged = apiPosts ? [...apiPosts] : [];
    merged = merged.filter((p) => !deletedIds.includes(p.id));
    localPosts.forEach((lp) => {
      if (lp._action === "add") {
        merged.unshift(lp);
      } else if (lp._action === "edit") {
        const idx = merged.findIndex((p) => p.id === lp.id);
        if (idx !== -1) merged[idx] = lp;
      }
    });
    return merged.slice(0, 10);
  }, [apiPosts, localPosts, deletedIds]);

  const handleSave = (data) => {
    if (editPost) {
      setLocalPosts((prev) => [
        ...prev.filter((p) => p.id !== editPost.id || p._action === "add"),
        { ...editPost, ...data, _action: "edit" },
      ]);
      toast.success("Alright,Post updated!");
    } else {
      setLocalPosts((prev) => [
        { ...data, id: Math.random().toString(36).slice(2), _action: "add" },
        ...prev,
      ]);
      toast.success("Nice, Post created!");
    }
    setModalOpen(false);
    setEditPost(null);
  };

  const handleDelete = () => {
    if (deletePost._action === "add") {
      setLocalPosts((prev) => prev.filter((p) => p.id !== deletePost.id));
    } else {
      setDeletedIds((prev) => [...prev, deletePost.id]);
    }
    toast.success("Oups, post deleted!");
    setDeletePost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button
            size="lg"
            onClick={() => {
              setEditPost(null);
              setModalOpen(true);
            }}
          >
            Create New Post
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[80vh] overflow-y-auto">
              {isLoading && <div>Loading...</div>}
              {error && (
                <div className="text-red-500">Error loading posts.</div>
              )}
              <ul className="pr-4">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="flex items-center justify-between border-b py-3"
                  >
                    <span className="font-medium">{post.title}</span>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditPost(post);
                          setModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeletePost(post)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Modal */}
      <PostModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={editPost}
        onSubmit={handleSave}
      />

      {/* Delete Confirmation */}
      <Dialog open={!!deletePost} onOpenChange={() => setDeletePost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete <b>{deletePost?.title}</b>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletePost(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
