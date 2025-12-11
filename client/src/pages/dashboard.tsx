import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileCode, Image, Download, Upload, Plus, LayoutDashboard, Settings, Users } from "lucide-react";
import AdminLayout from "@/components/admin-layout";

interface Stats {
  posts: number;
  pages: number;
  media: number;
  published: number;
  drafts: number;
}

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const handleExport = async () => {
    const response = await fetch("/api/export");
    const data = await response.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wordpress-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      const data = JSON.parse(text);
      await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      window.location.reload();
    };
    input.click();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome to your WordPress staging site</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleImport} data-testid="button-import">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="card-posts">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : stats?.posts ?? 0}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-pages">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pages</CardTitle>
              <FileCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : stats?.pages ?? 0}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-published">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : stats?.published ?? 0}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-drafts">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : stats?.drafts ?? 0}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/posts/new">
                <Button className="w-full justify-start" variant="outline" data-testid="button-new-post">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Post
                </Button>
              </Link>
              <Link href="/posts">
                <Button className="w-full justify-start" variant="outline" data-testid="button-view-posts">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Posts
                </Button>
              </Link>
              <Link href="/pages">
                <Button className="w-full justify-start" variant="outline" data-testid="button-view-pages">
                  <FileCode className="w-4 h-4 mr-2" />
                  View All Pages
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Site Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Storage</span>
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Ready
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API</span>
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Online
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
