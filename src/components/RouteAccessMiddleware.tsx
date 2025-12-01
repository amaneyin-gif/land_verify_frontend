import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RouteAccessMiddlewareProps {
  children: React.ReactNode;
}

/**
 * Middleware to verify route access with backend
 * Fetches accessible routes once per session when user tries to access a protected route
 */
const RouteAccessMiddleware = ({ children }: RouteAccessMiddlewareProps) => {
  const { user, accessibleRoutes, isLoadingRoutes } = useAuth();
  const { refreshAccessibleRoutes } = useAuth();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      // Only verify if user is authenticated and routes haven't been loaded yet
      if (user && accessibleRoutes.length === 0 && !isLoadingRoutes && !isVerifying) {
        setIsVerifying(true);
        await refreshAccessibleRoutes();
        setIsVerifying(false);
      }
    };

    verifyAccess();
  }, [user, accessibleRoutes.length, isLoadingRoutes, refreshAccessibleRoutes, isVerifying]);

  // Show loading while verifying access
  if ((isLoadingRoutes || isVerifying) && accessibleRoutes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteAccessMiddleware;