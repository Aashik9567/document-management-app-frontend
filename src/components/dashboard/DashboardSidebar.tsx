import { useState } from 'react';
import { 
  FileText, 
  Home, 
  Plus, 
  Users, 
  Settings, 
  Folder, 
  Layout,  // Replace Template
  History,
  Star,
  ChevronDown,
  FileCheck,  // Replace FileContract
  Mail,
  Share2,
  ChevronUp,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from './DashboardLayout';

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed} = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>(['documents']);

  const toggleExpanded = (item: string) => {
    if (isCollapsed) return; // Don't expand when collapsed
    
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
      icon: Layout,  // Changed from Template
      path: '/dashboard/templates',
      children: [
        { name: 'All Templates', path: '/dashboard/templates', icon: Layout },  // Changed from Template
        { name: 'NDAs', path: '/dashboard/templates/nda', icon: FileCheck },  // Changed from FileContract
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
    <div className="bg-white border-r border-gray-200 flex flex-col h-full relative">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <a href='/' className="text-xl font-bold text-gray-900">DocuFlow</a>
            </div>
          )}
          
          {isCollapsed && (
            <div className="mx-auto bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
          )}

 
        </div>
      </div>

      {/* Create Button */}
      <div className="p-4">
        <button
          onClick={() => navigate('/dashboard/create')}
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center group rounded-lg ${
            isCollapsed ? 'p-3' : 'px-4 py-3 space-x-2'
          }`}
          title={isCollapsed ? 'Create Document' : ''}
        >
          <Plus className={`${isCollapsed ? 'h-5 w-5' : 'h-5 w-5'} group-hover:rotate-90 transition-transform`} />
          {!isCollapsed && <span>Create Document</span>}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Main Menu Item */}
            <button
              onClick={() => {
                if (item.children.length > 0 && !isCollapsed) {
                  toggleExpanded(item.id);
                } else {
                  navigate(item.path);
                }
              }}
              className={`w-full flex items-center text-sm font-medium rounded-lg transition-colors group ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              } ${isCollapsed ? 'justify-center p-3' : 'justify-between px-3 py-2'}`}
              title={isCollapsed ? item.name : ''}
            >
              <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
                <item.icon className={`h-5 w-5 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </div>
              
              {!isCollapsed && item.children.length > 0 && (
                expandedItems.includes(item.id) ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronUp className="h-4 w-4 text-gray-400 transform rotate-180" />
                )
              )}
            </button>

            {/* Submenu Items - Only show when not collapsed */}
            {!isCollapsed && item.children.length > 0 && expandedItems.includes(item.id) && (
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

      {/* Collapsed Storage Indicator */}
      {isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}