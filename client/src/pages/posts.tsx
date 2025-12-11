import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin-layout";
import type { Post } from "@shared/schema";

interface PostsProps {
  type?: "post" | "page";
}

export default function Posts({ type = "post" }: PostsProps) {
  const queryClient = useQueryClient();
  const title = type === "page" ? "Pages" : "Posts";

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts", type],
    queryFn: async () => {
      const res = await fetch(`/api/posts?type=${type}`);
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const handleDelete = (id: number, postTitle: string) => {
    if (confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-light">{title}</h1>
          <Link href="/posts/new">
            <Button data-testid="button-add-new">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : posts?.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No {type === "page" ? "pages" : "posts"} found. Create your first one!
              </div>
            ) : (
              <table className="w-full" data-testid="table-posts">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Title</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden md:table-cell">Author</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden sm:table-cell">Status</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">Date</th>
                    <th className="text-right p-4 font-medium text-sm text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts?.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-muted/50" data-testid={`row-post-${post.id}`}>
                      <td className="p-4">
                        <Link href={`/posts/${post.id}`}>
                          <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                            {post.title || "(No title)"}
                          </span>
                        </Link>
                        <div className="text-xs text-muted-foreground mt-1">/{post.slug}</div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">
                        {post.author}
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className={`
                          inline-flex items-center px-2 py-1 rounded text-xs font-medium
                          ${post.status === "publish" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }
                        `}>
                          {post.status === "publish" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/posts/${post.id}`}>
                            <Button variant="ghost" size="icon" data-testid={`button-edit-${post.id}`}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(post.id, post.title)}
                            data-testid={`button-delete-${post.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
