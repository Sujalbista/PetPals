
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PawPrint, Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate(); // Hook to navigate after successful login


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
  
    try {
      const response = await axios.post("http://localhost:8080/api/login", { email, password });
      const { token } = response.data;
  
      // Store the token (e.g., in localStorage or cookies)
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage")); // Notify listeners like NavBar
      
      // Navigate to the home page or the page the user was trying to access
      navigate("/");
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const message = err.response.data.message;
  
        if (status === 400) {
          setError("User not registered. Please sign up.");
        } else if (status === 401) {
          setError("Invalid email or password.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
      console.log(error);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <PawPrint className="h-12 w-12 text-pet-purple dark:text-pet-purple-light" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-pet-purple dark:text-pet-purple-light">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to your PetPals account</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-sm text-pet-purple dark:text-pet-purple-light hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full bg-pet-purple hover:bg-pet-purple-dark dark:bg-pet-purple dark:hover:bg-pet-purple-dark">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className={`hover:underline font-medium ${
        error === "User not registered. Please sign up."
          ? "text-purple-100 animate-font-pulse"
          : "text-pet-purple dark:text-pet-purple-light"
      }`}
    >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
