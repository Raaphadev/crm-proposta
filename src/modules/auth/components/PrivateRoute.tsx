import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

export function PrivateRoute({ children, requiredPermissions = [] }: PrivateRouteProps) {
  const location = useLocation();
  const { isAuthenticated, user, checkAuth } = useAuthStore();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    const verify = async () => {
      await checkAuth();
      setIsChecking(false);
    };
    verify();
  }, [checkAuth]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every((permission) => user?.permissions.includes(permission))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}