import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Lock,
  AlertCircle,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { Input } from '../ui/form-field';
import { useAuthStore } from '../../states/authStore';
import { toast } from 'sonner';

// Validation schemas
const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function DashboardSetting() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('en');

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    documentUpdates: true,
    teamInvitations: true,
    securityAlerts: true,
    marketingEmails: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'team',
    activityTracking: true,
    analyticsData: false,
    thirdPartyIntegrations: true,
  });

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: '',
      jobTitle: '',
      location: '',
      website: '',
      bio: '',
    }
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data Management', icon: Database },
  ];

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      // Here you would make an API call to update the profile
      console.log('Profile update:', data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      // Here you would make an API call to change password
      console.log('Password change:', data);
      toast.success('Password changed successfully!');
      passwordForm.reset();
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const exportData = () => {
    toast.success('Data export initiated. You will receive an email when ready.');
  };

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion initiated. Please check your email for confirmation.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                </div>

                {/* Profile Photo */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-50">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Profile Photo</h3>
                    <p className="text-sm text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                      Upload new photo
                    </button>
                  </div>
                </div>

                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <Input
                        {...profileForm.register('firstName')}
                        className={profileForm.formState.errors.firstName ? 'border-red-300' : ''}
                      />
                      {profileForm.formState.errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{profileForm.formState.errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <Input
                        {...profileForm.register('lastName')}
                        className={profileForm.formState.errors.lastName ? 'border-red-300' : ''}
                      />
                      {profileForm.formState.errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{profileForm.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        {...profileForm.register('email')}
                        type="email"
                        className={`pl-10 ${profileForm.formState.errors.email ? 'border-red-300' : ''}`}
                      />
                    </div>
                    {profileForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">{profileForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          {...profileForm.register('phone')}
                          type="tel"
                          className="pl-10"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          {...profileForm.register('location')}
                          className="pl-10"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          {...profileForm.register('company')}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title
                      </label>
                      <Input {...profileForm.register('jobTitle')} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        {...profileForm.register('website')}
                        type="url"
                        className="pl-10"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      {...profileForm.register('bio')}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>

                {/* Change Password Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          {...passwordForm.register('currentPassword')}
                          type={showCurrentPassword ? 'text' : 'password'}
                          className={`pl-10 pr-10 ${passwordForm.formState.errors.currentPassword ? 'border-red-300' : ''}`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{passwordForm.formState.errors.currentPassword.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password *
                        </label>
                        <div className="relative">
                          <Input
                            {...passwordForm.register('newPassword')}
                            type={showNewPassword ? 'text' : 'password'}
                            className={`pr-10 ${passwordForm.formState.errors.newPassword ? 'border-red-300' : ''}`}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {passwordForm.formState.errors.newPassword && (
                          <p className="mt-1 text-sm text-red-600">{passwordForm.formState.errors.newPassword.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password *
                        </label>
                        <div className="relative">
                          <Input
                            {...passwordForm.register('confirmPassword')}
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={`pr-10 ${passwordForm.formState.errors.confirmPassword ? 'border-red-300' : ''}`}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {passwordForm.formState.errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">{passwordForm.formState.errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Lock className="h-4 w-4" />
                        <span>Change Password</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>

                <div className="space-y-4">
                  {Object.entries({
                    emailNotifications: 'Email Notifications',
                    pushNotifications: 'Push Notifications',
                    documentUpdates: 'Document Updates',
                    teamInvitations: 'Team Invitations',
                    securityAlerts: 'Security Alerts',
                    marketingEmails: 'Marketing Emails',
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
                        <p className="text-sm text-gray-500">
                          {key === 'emailNotifications' && 'Receive important updates via email'}
                          {key === 'pushNotifications' && 'Get instant notifications on your device'}
                          {key === 'documentUpdates' && 'Be notified when documents are updated'}
                          {key === 'teamInvitations' && 'Receive team collaboration invites'}
                          {key === 'securityAlerts' && 'Important security-related notifications'}
                          {key === 'marketingEmails' && 'Product updates and promotional content'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[key as keyof typeof notifications]}
                          onChange={(e) => handleNotificationChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy & Security Tab */}
            {activeTab === 'privacy' && (
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Profile Visibility</h3>
                    <div className="space-y-2">
                      {[
                        { value: 'public', label: 'Public', desc: 'Anyone can see your profile' },
                        { value: 'team', label: 'Team Only', desc: 'Only team members can see your profile' },
                        { value: 'private', label: 'Private', desc: 'Only you can see your profile' },
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value={option.value}
                            checked={privacy.profileVisibility === option.value}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{option.label}</p>
                            <p className="text-sm text-gray-500">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {Object.entries({
                    activityTracking: 'Activity Tracking',
                    analyticsData: 'Analytics Data Collection',
                    thirdPartyIntegrations: 'Third-party Integrations',
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
                        <p className="text-sm text-gray-500">
                          {key === 'activityTracking' && 'Track your activity for insights'}
                          {key === 'analyticsData' && 'Help improve our service with usage data'}
                          {key === 'thirdPartyIntegrations' && 'Allow connections to external services'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacy[key as keyof typeof privacy] as boolean}
                          onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Theme</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'dark', label: 'Dark', icon: Moon },
                        { value: 'system', label: 'System', icon: Monitor },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className={`flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition-colors ${
                            theme === option.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <option.icon className="h-6 w-6 text-gray-600" />
                          <span className="text-sm font-medium">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Language</h3>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="it">Italiano</option>
                      <option value="pt">Português</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Data Management Tab */}
            {activeTab === 'data' && (
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Data Management</h2>

                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Download className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-blue-900">Export Your Data</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          Download a copy of all your documents and account data.
                        </p>
                        <button
                          onClick={exportData}
                          className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Request Data Export
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Upload className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-yellow-900">Import Data</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          Import documents and data from other platforms.
                        </p>
                        <button className="mt-3 text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                          Import Data
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-red-900">Danger Zone</h3>
                        <p className="text-sm text-red-700 mt-1">
                          Permanently delete your account and all associated data.
                        </p>
                        <button
                          onClick={deleteAccount}
                          className="mt-3 flex items-center space-x-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}