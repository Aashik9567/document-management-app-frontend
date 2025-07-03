import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginSchema } from '../../lib/validations/auth';
import type { LoginFormData } from '../../lib/validations/auth';
import { Input } from '../../components/ui/form-field';
import { loginUser } from '../../endpoints/login/login';
import { toast } from 'sonner'; 
import { useAuthStore } from '../../states/authStore'; // Import your auth store

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

 const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { userWithoutPassword, token, message } = response;
      
      if (userWithoutPassword && token) {
        setAuth(userWithoutPassword,token);
        localStorage.setItem('token', token); // Store token in localStorage
        toast.success(message || 'Login successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.error || 'Login failed. Please try again.');
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);


  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-xl bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>


          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    {...register('email')}
                    type="email"
                    autoComplete="email"
                    className={`pl-10 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Forgot password clicked');
                  }}
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isPending }
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {(isPending ) ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>

            {/* Sign up link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="hidden lg:block lg:flex-1 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="flex items-center justify-center h-full p-12">
          <div className="max-w-md text-center text-white">
            <FileText className="h-20 w-20 mx-auto mb-8" />
            <h3 className="text-2xl font-bold mb-4">Document Management Made Simple</h3>
            <p className="text-blue-100">
              Create, manage, and organize all your business documents in one place. 
              From NDAs to offer letters, we've got you covered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
