import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import AdminLayout from "@/components/admin-layout";
import type { Post, InsertPost } from "@shared/schema";

interface EditPostProps {
  id?: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export default function EditPost({ id }: EditPostProps) {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const isNew = !id;

  const [formData, setFormData] = useState<Partial<InsertPost>>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    status: "draft",
    type: "post",
    author: "admin",
  });

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ["/api/posts", id],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${id}`);
      return res.json();
    },
    enabled: !isNew,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || "",
        status: post.status,
        type: post.type,
        author: post.author || "admin",
      });
    }
  }, [post]);

  const createMutation = useMutation({
    mutationFn: async (data: InsertPost) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      navigate("/posts");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<InsertPost>) => {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      navigate("/posts");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      slug: formData.slug || slugify(formData.title || "untitled"),
    } as InsertPost;

    if (isNew) {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isNew && !prev.slug ? slugify(title) : prev.slug,
    }));
  };

  if (!isNew && isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 text-center text-muted-foreground">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/posts")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-light flex-1">
              {isNew ? "Add New Post" : "Edit Post"}
            </h1>
            <Button 
              type="submit" 
              disabled={createMutation.isPending || updateMutation.isPending}
              data-testid="button-save"
            >
              <Save className="w-4 h-4 mr-2" />
              {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter post title..."
                      className="mt-1"
                      data-testid="input-title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">/</span>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="post-slug"
                        data-testid="input-slug"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your content here..."
                      className="mt-1 min-h-[300px] font-mono"
                      data-testid="textarea-content"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Excerpt</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.excerpt || ""}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the post..."
                    className="min-h-[100px]"
                    data-testid="textarea-excerpt"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger className="mt-1" data-testid="select-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="publish">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger className="mt-1" data-testid="select-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">Post</SelectItem>
                        <SelectItem value="page">Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={formData.author || ""}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    data-testid="input-author"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
