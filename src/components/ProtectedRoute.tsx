import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore, type User } from "../states/authStore";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../endpoints/profile/getProfile";

interface WithAuthOptions {
  redirectTo?: string;
}

export default function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { redirectTo = "/login" } = options;

  // Return a new component that wraps the provided component
  return function ProtectedComponent(props: P) {
    const token = localStorage.getItem("token");
    const { setUser, logout } = useAuthStore();
    const location = useLocation();
    const Comp = Component as React.ComponentType<P>;

    const { data, isRefetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["get-user", token, location.pathname], // Add pathname to force refetch on route changes
      queryFn: getProfile,
      staleTime: 0, // Consider data stale immediately
      gcTime: 1000 * 60 * 5, // Cache for 5 minutes to avoid excessive API calls
      retry: 1,
      enabled: !!token,
      refetchOnWindowFocus: true, // Enable refetch on window focus
      refetchOnMount: true, // Always refetch when component mounts
    });

    // Set user data when profile loads
    useEffect(() => {
      if (data?.data?.user) {
        setUser(data.data.user as User);
      }
    }, [data, setUser]);

    // Handle errors
    useEffect(() => {
      if (isError) {
        logout();
      }
    }, [isError, logout]);

    // Force refetch on component mount and navigation changes
    useEffect(() => {
      if (token) {
        refetch();
      }
    }, [token, refetch, location.pathname]);

    // If no token exists, redirect to login immediately
    if (!token) {
      return (
        <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
      );
    }

    // Show loading state while verifying authentication
    if (isLoading || isRefetching) {
      return (
        <div className="flex min-h-screen items-center justify-center text-lg">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            <p>Verifying authentication...</p>
          </div>
        </div>
      );
    }

    // Handle authentication errors or missing user data
    if (isError || !data?.data?.user) {
      return (
        <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
      );
    }

    // User is authenticated, render the wrapped component with all props
    return <Comp {...props} />;
  };
}
