import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../../endpoints/login/login';
import { registerUser } from '../../endpoints/register/register';
import { getProfile } from '../../endpoints/profile/getProfile';

import { useAuthStore } from '../../states/authStore';

export const useLogin = () => {
  const { setUser, setLoading, setError } = useAuthStore();
  
  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('auth-token', data.data.token);
      
      // Update auth state
      setUser(data.data.user);
      setLoading(false);
      
      console.log('Login successful:', data.message);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      setLoading(false);
      console.error('Login error:', error);
    },
  });
};

export const useRegister = () => {
  const { setUser, setLoading, setError } = useAuthStore();
  
  return useMutation({
    mutationFn: registerUser,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('auth-token', data.data.token);
      
      // Update auth state
      setUser(data.data.user);
      setLoading(false);
      
      console.log('Registration successful:', data.message);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      setLoading(false);
      console.error('Registration error:', error);
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!localStorage.getItem('auth-token'),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  
  return useMutation({
    mutationFn: async () => {
      // Clear token
      localStorage.removeItem('auth-token');
      
      // Clear all queries
      queryClient.clear();
      
      // Update auth state
      logout();
    },
    onSuccess: () => {
      console.log('Logout successful');
    },
  });
};