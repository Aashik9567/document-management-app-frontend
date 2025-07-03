import { useState } from 'react';
import { 
  FileText, 
  Home, 
  Plus, 
  Users, 
  Settings, 
  Folder, 
  Notebook,
  History,
  Star,
  ChevronDown,
  ChevronRight,
  File,
  Mail,
  Share2
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['documents']);

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      children: []
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: FileText,
      path: '/dashboard/documents',
      children: [
        { name: 'All Documents', path: '/dashboard/documents', icon: Folder },
        { name: 'Recent', path: '/dashboard/documents/recent', icon: History },
        { name: 'Favorites', path: '/dashboard/documents/favorites', icon: Star },
        { name: 'Shared', path: '/dashboard/documents/shared', icon: Share2 },
      ]
    },
    {
      id: 'templates',
      name: 'Templates',
      icon: Notebook,
      path: '/dashboard/templates',
      children: [
        { name: 'All Templates', path: '/dashboard/templates', icon: Notebook },
        { name: 'NDAs', path: '/dashboard/templates/nda', icon: File },
        { name: 'Contracts', path: '/dashboard/templates/contracts', icon: FileText },
        { name: 'Offer Letters', path: '/dashboard/templates/offers', icon: Mail },
      ]
    },
    {
      id: 'team',
      name: 'Team',
      icon: Users,
      path: '/dashboard/team',
      children: []
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
      children: []
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Create Button */}
      <div className="p-4">
        <button
          onClick={() => navigate('/dashboard/create')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 group"
        >
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
          <span>Create Document</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Main Menu Item */}
            <button
              onClick={() => {
                if (item.children.length > 0) {
                  toggleExpanded(item.id);
                } else {
                  navigate(item.path);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`h-5 w-5 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.children.length > 0 && (
                expandedItems.includes(item.id) ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )
              )}
            </button>

            {/* Submenu Items */}
            {item.children.length > 0 && expandedItems.includes(item.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <button
                    key={child.path}
                    onClick={() => navigate(child.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      location.pathname === child.path
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <child.icon className={`h-4 w-4 ${
                      location.pathname === child.path ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <span>{child.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section - Storage */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Storage</span>
            <span className="text-xs text-gray-500">2.3 GB / 5 GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '46%' }}></div>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 mt-2">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}