import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Search, Menu, ChevronDown, Sparkles, Command } from 'lucide-react';
import { useAuthStore } from '../../states/authStore';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from './DashboardLayout';
import { cn } from '../../lib/utils';

export default function DashboardHeader() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { toggleCollapsed } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Sidebar toggle + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCollapsed}
            className="hidden lg:flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-4 w-4 text-gray-700" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Center - Enhanced Search Bar */}
        <div className="hidden md:block flex-1 max-w-2xl mx-8">
          <div className="relative">
            <div className="relative">
              <Search className={cn(
                "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-200",
                isSearchFocused ? "text-indigo-600" : "text-gray-400"
              )} />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-xs text-gray-500 flex items-center">
                <Command className="h-3 w-3 mr-1" />
                <span>K</span>
              </div>
              <input
                type="text"
                placeholder="Search documents, templates, or type a command..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cn(
                  "w-full h-10 pl-12 pr-16 rounded-lg border bg-gray-50 text-sm placeholder:text-gray-400 transition-all duration-200",
                  isSearchFocused 
                    ? "border-indigo-500 bg-white shadow-md ring-2 ring-indigo-500/20" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              />
            </div>
          </div>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Button */}
          <button 
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-gray-700" />
          </button>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 rounded-lg bg-white border border-gray-200 px-3 py-2 hover:bg-gray-50 transition-all shadow-sm"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              {/* User Avatar */}
              <div className="relative">
                {user?.profileImage ? (
                  <img
                    className="h-8 w-8 rounded-full object-cover border-2 border-white"
                    src={user.profileImage}
                    alt={getDisplayName()}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-white">
                    {getInitials(user?.firstName, user?.lastName)}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* User Info */}
              <div className="hidden sm:block text-left min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                  {getDisplayName()}
                </p>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown className={cn(
                "h-4 w-4 text-gray-500 transition-transform duration-200",
                isDropdownOpen && "rotate-180"
              )} />
            </button>

            {/* Enhanced Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 focus:outline-none z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {user?.profileImage ? (
                        <img
                          className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                          src={user.profileImage}
                          alt={getDisplayName()}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold border-2 border-white shadow-sm">
                          {getInitials(user?.firstName, user?.lastName)}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {getDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/dashboard/profile');
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">View Profile</div>
                      <div className="text-xs text-gray-500">Manage your account</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/dashboard/settings');
                    }}
                    className="flex items-center w-full px-3 py-2 mt-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-center mr-3">
                      <Settings className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Settings</div>
                      <div className="text-xs text-gray-500">Preferences & privacy</div>
                    </div>
                  </button>

                  <div className="border-t border-gray-200 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center mr-3">
                      <LogOut className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Sign out</div>
                      <div className="text-xs text-red-500">End your session</div>
                    </div>
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