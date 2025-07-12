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
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    <header className="sticky top-0 z-30 bg-white/95 border-b border-gray-200/70 shadow-2xl">
      <div className="flex h-20 items-center justify-between px-8">
        {/* Left side - Sidebar toggle + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCollapsed}
            className="hidden lg:flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-lg"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-xl">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Center - Enhanced Search Bar */}
        <div className="hidden md:block flex-1 max-w-2xl mx-10">
          <div className="relative">
            <Search className={cn(
              "absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-200",
              isSearchFocused ? "text-indigo-600" : "text-gray-400"
            )} />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-xs text-gray-500 flex items-center">
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
                "w-full h-12 pl-14 pr-20 rounded-xl border bg-gray-50 text-base placeholder:text-gray-400 transition-all duration-200",
                isSearchFocused 
                  ? "border-indigo-500 bg-white shadow-lg ring-2 ring-indigo-500/20" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            />
          </div>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Search Button */}
          <button 
            className="md:hidden flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-lg"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-gray-700" />
          </button>
          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-4 rounded-xl bg-white border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-all shadow-lg"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              {/* User Avatar */}
              <div className="relative">
                {user?.profileImage ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-white"
                    src={user.profileImage}
                    alt={getDisplayName()}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-base border-2 border-white">
                    {getInitials(user?.firstName, user?.lastName)}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              {/* User Info */}
              <div className="hidden sm:block text-left min-w-0">
                <p className="text-base font-medium text-gray-900 truncate max-w-40">
                  {getDisplayName()}
                </p>
              </div>
              {/* Dropdown Arrow */}
              <ChevronDown className={cn(
                "h-5 w-5 text-gray-500 transition-transform duration-200",
                isDropdownOpen && "rotate-180"
              )} />
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                {/* User Info Header */}
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {user?.profileImage ? (
                        <img
                          className="h-14 w-14 rounded-full object-cover border-2 border-white shadow"
                          src={user.profileImage}
                          alt={getDisplayName()}
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold border-2 border-white shadow">
                          {getInitials(user?.firstName, user?.lastName)}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 truncate">
                        {getDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Menu Items */}
                <div className="p-3">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/dashboard/profile');
                    }}
                    className="flex items-center w-full px-3 py-3 text-base text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <div className="w-9 h-9 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center mr-4 shadow-sm">
                      <User className="h-5 w-5 text-blue-600" />
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
                    className="flex items-center w-full px-3 py-3 mt-1 text-base text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <div className="w-9 h-9 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-center mr-4 shadow-sm">
                      <Settings className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Settings</div>
                      <div className="text-xs text-gray-500">Preferences & privacy</div>
                    </div>
                  </button>
                  <div className="border-t border-gray-100 my-3"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-3 text-base text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <div className="w-9 h-9 bg-red-50 rounded-xl border border-red-100 flex items-center justify-center mr-4 shadow-sm">
                      <LogOut className="h-5 w-5 text-red-600" />
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