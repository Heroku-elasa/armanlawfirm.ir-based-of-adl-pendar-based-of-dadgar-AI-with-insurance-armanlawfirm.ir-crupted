import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, FileCode, Image, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/posts", icon: FileText, label: "Posts" },
  { href: "/pages", icon: FileCode, label: "Pages" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-56 bg-zinc-900 text-zinc-400 flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-bold">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">W</div>
            <span>WP Stage</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const isActive = location === item.href || 
              (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                    flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors
                    ${isActive 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-white/5 hover:text-white"
                    }
                  `}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 text-xs text-zinc-500">
          WordPress Staging v1.0
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Howdy, admin</span>
            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
