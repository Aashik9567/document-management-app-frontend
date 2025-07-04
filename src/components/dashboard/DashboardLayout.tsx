import {  useState, createContext, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface SidebarContextType {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapsed: () => void;
  toggleMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';

  return (
    <SidebarContext.Provider value={{ isCollapsed, isMobileOpen, toggleCollapsed, toggleMobile }}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile sidebar overlay */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 z-40 lg:hidden"
            onClick={toggleMobile}
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
        )}

        {/* Mobile sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-semibold">DocuFlow</span>
            <button
              onClick={toggleMobile}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <DashboardSidebar />
        </div>

        {/* Desktop sidebar */}
        <div className={`hidden lg:flex lg:flex-shrink-0 transition-all duration-300 ${sidebarWidth}`}>
          <div className={`flex flex-col ${sidebarWidth} transition-all duration-300`}>
            <DashboardSidebar />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Mobile header with menu button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <button
              onClick={toggleMobile}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-lg font-semibold">DocuFlow</span>
            <div className="w-9"></div> {/* Spacer for centering */}
          </div>

          <DashboardHeader />
          
          <main className="flex-1 overflow-auto">
            <div className="py-6">
              <div className={`max-w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
                {children}
               </div>
              </div>
            </main>
          </div>
        </div>
    </SidebarContext.Provider>
  )
}