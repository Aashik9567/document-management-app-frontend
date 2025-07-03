import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User, FileText, Phone, Camera, X } from 'lucide-react';
import { signupSchema } from '../../lib/validations/auth';
import type { SignupFormData } from '../../lib/validations/auth';
import { Input } from '../../components/ui/form-field';
import { convertFileToBase64 } from '../../utils/fileUtils';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../endpoints/register/register';
import { toast } from 'sonner'; 

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    setError
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: registerUser,
  });

  const onSubmit = (data: SignupFormData) => mutate(data);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const password = watch('password');

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: '', color: '' };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[@$!%*?&]/.test(pwd)) score++;

    const levels = [
      { strength: 1, label: 'Weak', color: 'bg-red-500' },
      { strength: 2, label: 'Fair', color: 'bg-yellow-500' },
      { strength: 3, label: 'Good', color: 'bg-blue-500' },
      { strength: 4, label: 'Strong', color: 'bg-green-500' }
    ];

    if (score < 2) return levels[0];
    if (score < 4) return levels[1];
    if (score < 5) return levels[2];
    return levels[3];
  };

  const passwordStrength = getPasswordStrength(password || '');

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 2000000) {
      setError('profileImage', { type: 'manual', message: 'File size must be less than 2MB' });
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
      setError('profileImage', { type: 'manual', message: 'File must be JPEG, PNG, or WebP format' });
      return;
    }

    try {
      const base64String = await convertFileToBase64(file);
      setProfileImageBase64(base64String);
      setValue('profileImage', event.target.files);
      clearErrors('profileImage');
    } catch {
      setError('profileImage', { type: 'manual', message: 'Error processing image file' });
    }
  };

  const removeProfileImage = () => {
    setProfileImageBase64(null);
    setValue('profileImage', undefined);
  };

  const getErrorMessage = () => {
    if (!error) return 'Registration failed. Please try again.';
    
    if (error instanceof Error) return error.message;
    if (typeof error === 'object' && 'message' in error) return (error as any).message;
    if (typeof error === 'object' && 'response' in error) {
      const response = (error as any).response;
      return response?.data?.message || response?.statusText || 'Registration failed. Please try again.';
    }
    
    return 'Registration failed. Please try again.';
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:block lg:flex-1 bg-gradient-to-br from-purple-600 to-blue-700">
        <div className="flex items-center justify-center h-full p-12">
          <div className="max-w-md text-center text-white">
            <FileText className="h-20 w-20 mx-auto mb-8" />
            <h3 className="text-2xl font-bold mb-4">Join Thousands of Users</h3>
            <p className="text-purple-100 mb-6">
              Start creating professional documents today. Our platform offers templates for all your business needs.
            </p>
            <div className="space-y-4 text-left">
              {['Professional document templates', 'Easy customization tools', 'Secure document management'].map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-xl bg-purple-100">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">Start your document management journey</p>
          </div>

          {isSuccess && (
            toast.success('Account created successfully!!!')
          )}

          {isError && (
            toast.error(getErrorMessage())
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                  {profileImageBase64 ? (
                    <img src={profileImageBase64} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="h-8 w-8 text-gray-400" />
                  )}
                </div>

                {profileImageBase64 && (
                  <button
                    type="button"
                    onClick={removeProfileImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}

                <input
                  {...register('profileImage')}
                  id="profileImage"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="text-center">
              <label htmlFor="profileImage" className="text-sm text-purple-600 hover:text-purple-500 cursor-pointer font-medium">
                Upload Profile Picture
              </label>
              <p className="text-xs text-gray-500 mt-1">Optional • Max 2MB • JPEG, PNG, WebP</p>
              {errors.profileImage && (
                <p className="mt-1 text-sm text-red-600">
                  {typeof errors.profileImage.message === 'string' ? errors.profileImage.message : 'Invalid file selection'}
                </p>
              )}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { name: 'firstName' as const, label: 'First Name', placeholder: 'First name', autoComplete: 'given-name' },
                { name: 'lastName' as const, label: 'Last Name', placeholder: 'Last name', autoComplete: 'family-name' }
              ].map(({ name, label, placeholder, autoComplete }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      {...register(name)}
                      type="text"
                      autoComplete={autoComplete}
                      className={`pl-10 ${errors[name] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder={placeholder}
                    />
                  </div>
                  {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>}
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className={`pl-10 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-gray-400 text-xs ml-1">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  {...register('phone')}
                  type="tel"
                  autoComplete="tel"
                  className={`pl-10 ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            {/* Password Fields */}
            {[
              { name: 'password' as const, label: 'Password', placeholder: 'Create a password', show: showPassword, setShow: setShowPassword },
              { name: 'confirmPassword' as const, label: 'Confirm Password', placeholder: 'Confirm your password', show: showConfirmPassword, setShow: setShowConfirmPassword }
            ].map(({ name, label, placeholder, show, setShow }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    {...register(name)}
                    type={show ? 'text' : 'password'}
                    autoComplete="new-password"
                    className={`pl-10 pr-10 ${errors[name] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder={placeholder}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>

                {/* Password Strength for password field only */}
                {name === 'password' && password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength.strength === 1 ? 'text-red-600' :
                        passwordStrength.strength === 2 ? 'text-yellow-600' :
                        passwordStrength.strength === 3 ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                  </div>
                )}

                {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>}
              </div>
            ))}

            {/* Terms */}
            <div className="flex items-start">
              <input
                id="accept-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="accept-terms" className="ml-3 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-500 font-medium" onClick={(e) => e.preventDefault()}>
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-500 font-medium" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>

            {/* Sign in link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  className="font-medium text-purple-600 hover:text-purple-500"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}