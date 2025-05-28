import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, PawPrint, Moon, Sun, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { useCart } from "@/hooks/use-cart";
import GlobalSearch from "./GlobalSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [isLoggedIn, setIsLoggedIn] = useState(false); //

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const { totalItems } = useCart();
  useEffect(() => {
    document.documentElement.classList.add('dark');
  
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
  
    // 🔹 Check immediately when component mounts
    checkLogin();
  
    // 🔹 Also listen to changes from other tabs
    window.addEventListener("storage", checkLogin);
  
    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/";
  };
  

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm py-4 px-6 sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-pet-purple dark:text-pet-purple-light" />
            <span className="text-2xl font-bold text-pet-purple dark:text-pet-purple-light">PetPals</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-gray-700 dark:text-gray-200 hover:text-pet-purple dark:hover:text-pet-purple-light font-medium">
              Marketplace
            </Link>
            <Link to="/store" className="text-gray-700 dark:text-gray-200 hover:text-pet-purple dark:hover:text-pet-purple-light font-medium">
              Store
            </Link>
            <Link to="/community" className="text-gray-700 dark:text-gray-200 hover:text-pet-purple dark:hover:text-pet-purple-light font-medium">
              Community
            </Link>
            <Link to="/profiles" className="text-gray-700 dark:text-gray-200 hover:text-pet-purple dark:hover:text-pet-purple-light font-medium">
              Pet Profiles
            </Link>
          </div>

          {/* Search, Cart, Auth Buttons, and Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <GlobalSearch />
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5 dark:text-gray-200" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pet-purple dark:bg-pet-purple-light text-white dark:text-gray-900 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Toggle 
              pressed={isDarkMode} 
              onPressedChange={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="mr-2"
            >
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-gray-200" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700" />
              )}
            </Toggle>
            {isLoggedIn ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-pet-purple hover:bg-pet-purple-dark  dark:bg-pet-purple-light dark:text-gray-500  dark:hover:bg-pet-purple">
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">View Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              ) : (
                <>
                  <Link to="/signin">
                    <Button variant="outline" className="border-pet-purple text-pet-purple hover:text-pet-purple hover:bg-pet-purple-light dark:border-pet-purple-light dark:text-pet-purple-light dark:hover:bg-gray-800">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-pet-purple hover:bg-pet-purple-dark text-white dark:bg-pet-purple-light dark:hover:bg-pet-purple">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Toggle 
              pressed={isDarkMode} 
              onPressedChange={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-gray-200" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700" />
              )}
            </Toggle>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6 dark:text-gray-200" /> : <Menu className="h-6 w-6 dark:text-gray-200" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden animate-fade-in">
            <div className="flex flex-col space-y-4 py-4">
              <Link to="/marketplace" className="text-gray-700 dark:text-gray-200 hover:text-pet-purple dark:hover:text-pet-purple-light font-medium px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                Marketplace
              </Link>
              <Link to="/store" className="text-gray-700 dark:text-gray-200 hover:text-pet-purple dark:hover:text-pet-purple-light font-medium px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                Store
              </Link>
              <Link to="/community" className="text-gray-700 dark:text-gray-200 hover:text-pet-purple dark:hover:text-pet-purple-light font-medium px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                Community
              </Link>
              <Link to="/profiles" className="text-gray-700 dark:text-gray-200 hover:text-pet-purple dark:hover:text-pet-purple-light font-medium px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                Pet Profiles
              </Link>
              <div className="flex space-x-4 mt-2 px-4">
              
              {isLoggedIn ? (
                <div className="flex flex-col space-y-3 w-full px-4">
                <Link to="/profile">
                  <Button className="w-full text-left bg-pet-purple hover:bg-pet-purple-dark text-white dark:bg-pet-purple-light dark:hover:bg-pet-purple">
                    View Profile
                  </Button>
                </Link>
                <Link to="/adminpage">
                  <Button className="w-full text-left bg-pet-purple hover:bg-pet-purple-dark text-white dark:bg-pet-purple-light dark:hover:bg-pet-purple">
                    Admin Page
                  </Button>
                </Link>
                <Button onClick={handleLogout} className="w-full text-left border border-gray-300 dark:border-gray-600">
                  Logout
                </Button>
              </div>
              
              ) : (
                <>
                  <Link to="/signin" className="flex-1">
                    <Button variant="outline" className="border-pet-purple text-pet-purple w-full dark:border-pet-purple-light dark:text-pet-purple-light">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/signup" className="flex-1">
                    <Button className="bg-pet-purple hover:bg-pet-purple-dark text-white w-full dark:bg-pet-purple-light dark:hover:bg-pet-purple">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            

              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
