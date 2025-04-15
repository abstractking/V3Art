import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Artists from "@/pages/Artists";
import ArtistDetail from "@/pages/ArtistDetail";
import ArtworkDetail from "@/pages/ArtworkDetail";
import Submit from "@/pages/Submit";
import Documentation from "@/pages/Documentation";
import CollectorDashboard from "@/pages/CollectorDashboard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Web3Provider } from "@/hooks/use-web3";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/artists" component={Artists} />
          <Route path="/artists/:id" component={ArtistDetail} />
          <Route path="/artworks/:id" component={ArtworkDetail} />
          <Route path="/submit" component={Submit} />
          <Route path="/docs" component={Documentation} />
          <Route path="/dashboard" component={CollectorDashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <Router />
        <Toaster />
      </Web3Provider>
    </QueryClientProvider>
  );
}

export default App;
