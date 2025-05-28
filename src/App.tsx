
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/use-cart";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Store from "./pages/Store";
import Community from "./pages/Community";
import Profiles from "./pages/Profiles";
import NotFound from "./pages/NotFound";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Cart from "./pages/Cart";
import AdminPage from "./pages/AdminPage";
import ScrollToTop from "./components/ui/scrolltotop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
            <NavBar />
            <main className="flex-grow">
            <ScrollToTop /> {/* Must be inside Router */}

              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/store" element={<Store />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/adminpage" element={<AdminPage/>}/>
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
