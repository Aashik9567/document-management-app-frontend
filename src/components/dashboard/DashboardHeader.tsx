import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Bell, Search } from 'lucide-react';
import { useAuthStore } from '../../states/authStore';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || 'User';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left side - Logo/Title */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </div>

        {/* Center - Search Bar (Hidden on mobile) */}
        <div className="hidden md:block flex-1 max-w-lg mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
            {/* Notification badge */}
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {/* User Avatar */}
              <div className="flex-shrink-0">
                {user?.profileImage ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200"
                    src={user.profileImage}
                    alt={getDisplayName()}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-gray-200">
                    {getInitials(user?.firstName, user?.lastName)}
                  </div>
                )}
              </div>

              {/* User Info - Hidden on mobile */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700">
                  {getDisplayName()}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email}
                </p>
              </div>

              {/* Dropdown Arrow */}
              <div className="flex-shrink-0">
                <svg
                  className={`h-4 w-4 text-gray-400 transform transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  {/* User Info in Dropdown - Visible on mobile */}
                  <div className="md:hidden px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {getDisplayName()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Handle profile navigation
                      console.log('Navigate to profile');
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  >
                    <User className="h-5 w-5 mr-3 text-gray-400" />
                    View Profile
                  </button>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Handle settings navigation
                      console.log('Navigate to settings');
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  >
                    <Settings className="h-5 w-5 mr-3 text-gray-400" />
                    Settings
                  </button>

                  <div className="border-t border-gray-100"></div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3 text-red-500" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}