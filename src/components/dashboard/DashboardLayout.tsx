import {  useState, createContext, useContext } from 'react';
import { FileText, Menu, X } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Mobile sidebar overlay */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
            onClick={toggleMobile}
          />
        )}

        {/* Mobile sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1.5 rounded-xl shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">DocuMate</span>
              </div>
              <button
                onClick={toggleMobile}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <DashboardSidebar />
          </div>
        </div>

        {/* Desktop sidebar - FIXED POSITION */}
        <div className={`hidden lg:block fixed inset-y-0 left-0 z-30 transition-all duration-300 ${sidebarWidth}`}>
          <div className="h-full bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-xl">
            <DashboardSidebar />
          </div>
        </div>

        {/* Main content with left margin for desktop sidebar */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          {/* Mobile header with menu button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/20 bg-white/95 backdrop-blur-xl">
            <button
              onClick={toggleMobile}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1.5 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">DocuMate</span>
            </div>
            <div className="w-9"></div>
          </div>

          <DashboardHeader />
          
          <main className="flex overflow-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}