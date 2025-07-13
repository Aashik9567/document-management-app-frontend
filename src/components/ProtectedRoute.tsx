import { useEffect, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../states/authStore';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../endpoints/profile/getProfile';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, user, setUser, logout, isAuthenticated } = useAuthStore();

  // Redirect immediately if no token
  if (!token) return <Navigate to="/login" replace />;

  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['get-user'],
    queryFn: getProfile,
    enabled: !!token && !user,
    retry: false,
  });

  // Set user if profile loads
  useEffect(() => {
    if (data?.data?.user) {
      setUser(data.data.user as any);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (isError) logout();
  }, [isError, logout]);

  useEffect(() => {
    if (token && isAuthenticated && !user) {
      refetch();
    }
  }, [token, isAuthenticated, user, refetch]);

  if (isLoading || isRefetching) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}