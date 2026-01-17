'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // Component to show while checking auth or when not authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = <div>Checking authentication...</div> 
}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession();
        if (session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    // Still checking authentication
    return <>{fallback}</>;
  }

  if (isAuthenticated === false) {
    // Redirect is happening, show fallback
    return <>{fallback}</>;
  }

  // User is authenticated, show children
  return <>{children}</>;
};

export default ProtectedRoute;