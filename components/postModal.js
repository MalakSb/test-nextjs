"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function PostModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");

  useEffect(() => {
    setTitle(initialData?.title || "");
    setBody(initialData?.body || "");
  }, [initialData, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Post" : "Create Post"}</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ title, body });
          }}
        >
          <div>
            <Label className="mb-4">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label className="mb-4">Body</Label>
            <div data-color-mode="light">
              <MDEditor value={body} onChange={setBody} height={200} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{initialData ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
