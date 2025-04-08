
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      "with search params:",
      location.search
    );
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! Page not found</p>
        <p className="text-gray-600 mb-6">
          The requested URL <span className="font-mono bg-gray-100 px-2 py-1 rounded">{location.pathname}</span> was not found.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          If you're using the FlowKit SDK, please check that you're using the correct app ID and that the URL is properly formatted.
        </p>
        <Button 
          onClick={() => window.location.href = '/'} 
          className="bg-blue-500 hover:bg-blue-600"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
