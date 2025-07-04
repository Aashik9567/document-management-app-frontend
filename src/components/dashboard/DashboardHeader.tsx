import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Search, Menu } from 'lucide-react';
import { useAuthStore } from '../../states/authStore';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from './DashboardLayout';

export default function DashboardHeader() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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
    console.log(isAuthenticated);
    localStorage.removeItem('token');
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
        {/* Left side - Mobile menu + Page title */}
        <div className="flex items-center space-x-4">
          {/* Desktop sidebar toggle */}
          <button
            onClick={toggleCollapsed}
            className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <div className="flex-shrink-0">
            <h1 className={`font-bold text-gray-900 transition-all duration-300 ${
              isCollapsed ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
            }`}>
              Dashboard
            </h1>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className={`hidden md:block flex-1 max-w-lg mx-8 transition-all duration-300 ${
          isCollapsed ? 'max-w-2xl' : 'max-w-lg'
        }`}>
          <div className={`relative transition-all duration-300 ${
            isSearchFocused ? 'transform scale-105' : ''
          }`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 transition-colors ${
                isSearchFocused ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
            <input
              type="text"
              placeholder="Search documents, templates..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`block w-full pl-10 pr-3 py-2 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 ${
                isSearchFocused ? 'border-blue-300 shadow-md' : 'border-gray-300'
              }`}
            />
          </div>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search Button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-colors">
            <Search className="h-6 w-6" />
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

              {/* User Info - Hidden on small screens */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-700 truncate max-w-32">
                  {getDisplayName()}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-32">
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
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform transition-all duration-200 scale-100 opacity-100">
                <div className="py-1">
                  {/* User Info in Dropdown - Visible on small screens */}
                  <div className="sm:hidden px-4 py-3 border-b border-gray-100">
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
                      navigate('/dashboard/profile');
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  >
                    <User className="h-5 w-5 mr-3 text-gray-400" />
                    View Profile
                  </button>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/dashboard/settings');
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