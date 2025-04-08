
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

  // Check if the URL looks like an app ID was attempted
  const isLikelyAppIdAttempt = /^\/[a-z0-9-]+$/.test(location.pathname);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! Page not found</p>
        <p className="text-gray-600 mb-6">
          The requested URL <span className="font-mono bg-gray-100 px-2 py-1 rounded">{location.pathname}</span> was not found.
        </p>
        
        {isLikelyAppIdAttempt && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <p className="text-amber-800 text-sm">
              It looks like you're trying to access an onboarding flow with an app ID. 
              Please make sure that:
            </p>
            <ul className="text-amber-700 text-sm list-disc list-inside mt-2">
              <li>The app ID is correct (check for typos)</li>
              <li>The onboarding flow has been created and published</li>
              <li>You're using the latest version of the FlowKit SDK</li>
            </ul>
            <p className="text-amber-800 text-sm mt-2">
              App IDs should look like: <code>my-onboarding-flow-y7opwx03</code>
            </p>
          </div>
        )}
        
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
