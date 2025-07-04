import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Search, Menu, ChevronDown, Sparkles, Command } from 'lucide-react';
import { useAuthStore } from '../../states/authStore';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from './DashboardLayout';
import { cn } from '../../lib/utils';

export default function DashboardHeader() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { isCollapsed, toggleCollapsed } = useSidebar();
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
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Sidebar toggle + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCollapsed}
            className="hidden lg:flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-sm"
          >
            <Menu className="h-4 w-4 text-gray-700" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Center - Enhanced Search Bar */}
        <div className={cn(
          "hidden md:block flex-1 max-w-2xl mx-8 transition-all duration-300"
        )}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Search className={cn(
                "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-200",
                isSearchFocused ? "text-indigo-600 scale-110" : "text-gray-400"
              )} />
              <Command className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents, templates, or type a command..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cn(
                  "w-full h-12 pl-12 pr-12 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-sm placeholder:text-gray-400 transition-all duration-200 shadow-sm",
                  isSearchFocused 
                    ? "border-indigo-500 bg-white shadow-lg ring-4 ring-indigo-500/20" 
                    : "border-white/30 hover:border-white/50"
                )}
              />
            </div>
          </div>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Button */}
          <button className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-sm">
            <Search className="h-4 w-4 text-gray-700" />
          </button>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 px-4 py-2 hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-sm"
            >
              {/* User Avatar */}
              <div className="relative">
                {user?.profileImage ? (
                  <img
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-white/50"
                    src={user.profileImage}
                    alt={getDisplayName()}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-white/50 shadow-lg">
                    {getInitials(user?.firstName, user?.lastName)}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>

              {/* User Info */}
              <div className="hidden sm:block text-left min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate max-w-32">
                  {getDisplayName()}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-32">
                  {user?.email}
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
              <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 focus:outline-none z-50">
                <div className="p-2">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {user?.profileImage ? (
                          <img
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-white/50"
                            src={user.profileImage}
                            alt={getDisplayName()}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                            {getInitials(user?.firstName, user?.lastName)}
                          </div>
                        )}
                        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {getDisplayName()}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 font-medium">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate('/dashboard/profile');
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
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
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                        <Settings className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">Settings</div>
                        <div className="text-xs text-gray-500">Preferences & privacy</div>
                      </div>
                    </button>

                    <div className="border-t border-gray-100 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
                    >
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
                        <LogOut className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">Sign out</div>
                        <div className="text-xs text-red-500">End your session</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}