import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Posts from "@/pages/posts";
import EditPost from "@/pages/edit-post";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/">{() => <Landing />}</Route>
      <Route path="/dashboard">{() => <Dashboard />}</Route>
      <Route path="/posts">{() => <Posts />}</Route>
      <Route path="/pages">{() => <Posts type="page" />}</Route>
      <Route path="/posts/new">{() => <EditPost />}</Route>
      <Route path="/posts/:id">{(params) => <EditPost id={parseInt(params.id)} />}</Route>
      <Route>{() => <NotFound />}</Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
