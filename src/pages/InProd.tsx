import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const InProd = () => {
  const location = useLocation();

  useEffect(() => {
    // Log only in non-production environments
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "404 Error: Attempted access to non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-pet-purple dark:text-pet-purple-light mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          This page is under production.
        </p>
        <Link
          to="/"
          className="inline-block bg-pet-purple hover:bg-pet-purple-dark text-white dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple font-medium px-6 py-3 rounded-lg transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default InProd;
