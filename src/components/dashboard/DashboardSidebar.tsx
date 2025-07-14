import { useState, useEffect } from "react";
import {
  FileText,
  Home,
  Plus,
  Users,
  Settings,
  Folder,
  Layout,
  History,
  Star,
  ChevronDown,
  FileCheck,
  Mail,
  Share2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { cn } from "../../lib/utils";

import { useSidebarStore } from "../../states/sidebarStore";

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed } = useSidebarStore();
  const [expandedItems, setExpandedItems] = useState<string[]>(["documents"]);
  const [mounted, setMounted] = useState(false);

  // This effect helps with smooth initial rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpanded = (item: string) => {
    if (isCollapsed) return; // Don't expand when collapsed

    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
      children: [],
    },
    {
      id: "documents",
      name: "Documents",
      icon: FileText,
      path: "/dashboard/documents",
      children: [
        { name: "All Documents", path: "/dashboard/documents", icon: Folder },
        { name: "Recent", path: "/dashboard/documents/recent", icon: History },
        {
          name: "Favorites",
          path: "/dashboard/documents/favorites",
          icon: Star,
        },
        { name: "Shared", path: "/dashboard/documents/shared", icon: Share2 },
      ],
    },
    {
      id: "templates",
      name: "Templates",
      icon: Layout,
      path: "/dashboard/templates",
      children: [
        { name: "All Templates", path: "/dashboard/templates", icon: Layout },
        { name: "NDAs", path: "/dashboard/templates/nda", icon: FileCheck },
        {
          name: "Contracts",
          path: "/dashboard/templates/contracts",
          icon: FileText,
        },
        {
          name: "Offer Letters",
          path: "/dashboard/templates/offers",
          icon: Mail,
        },
      ],
    },
    {
      id: "team",
      name: "Team",
      icon: Users,
      path: "/dashboard/team",
      children: [],
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
      children: [],
    },
  ];

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-full relative",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex items-center space-x-2 overflow-hidden transition-all duration-300",
              isCollapsed ? "w-10" : "w-full"
            )}
          >
            <div className="flex-shrink-0 bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span
              className={cn(
                "text-xl font-bold text-gray-900 whitespace-nowrap",
                isCollapsed
                  ? "opacity-0"
                  : "opacity-100 transition-opacity duration-300"
              )}
            >
              DocuMate
            </span>
          </div>
        </div>
      </div>

      {/* Create Button */}
      <div className="p-4">
        <button
          onClick={() => navigate("/document/create")}
          className={cn(
            "w-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all flex items-center rounded-lg shadow-sm",
            isCollapsed ? "p-3 justify-center" : "px-4 py-3 space-x-2"
          )}
          title={isCollapsed ? "Create Document" : ""}
        >
          <Plus
            className={cn(
              "h-5 w-5 transition-transform",
              !isCollapsed && "mr-2"
            )}
          />
          <span
            className={cn(
              "whitespace-nowrap transition-opacity duration-300",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            )}
          >
            Create Document
          </span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 pb-4 overflow-y-auto mt-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              {/* Main Menu Item */}
              <button
                onClick={() => {
                  if (item.children.length > 0 && !isCollapsed) {
                    toggleExpanded(item.id);
                  } else {
                    navigate(item.path);
                  }
                }}
                className={cn(
                  "w-full flex items-center text-sm font-medium rounded-lg transition-all duration-200",
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-700 border border-blue-100"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-transparent",
                  isCollapsed
                    ? "justify-center p-3"
                    : "justify-between px-3 py-2.5"
                )}
                title={isCollapsed ? item.name : ""}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isCollapsed ? "" : "space-x-3"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center",
                      isActive(item.path) ? "text-blue-600" : "text-gray-500"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  {!isCollapsed && (
                    <span className="transition-opacity duration-300">
                      {item.name}
                    </span>
                  )}
                </div>

                {!isCollapsed && item.children.length > 0 && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-gray-500 transition-transform duration-200",
                      expandedItems.includes(item.id)
                        ? "rotate-0"
                        : "rotate-180"
                    )}
                  />
                )}
              </button>

              {/* Submenu Items - Only show when not collapsed */}
              {!isCollapsed &&
                item.children.length > 0 &&
                expandedItems.includes(item.id) && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
                    {item.children.map((child) => (
                      <button
                        key={child.path}
                        onClick={() => navigate(child.path)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                          location.pathname === child.path
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                        )}
                      >
                        <div
                          className={cn(
                            "flex-shrink-0",
                            location.pathname === child.path
                              ? "text-blue-600"
                              : "text-gray-400"
                          )}
                        >
                          <child.icon className="h-4 w-4" />
                        </div>
                        <span className="transition-opacity duration-300">
                          {child.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </nav>

      {/* User/Storage Status */}
      <div
        className={cn(
          "border-t border-gray-200 transition-all duration-300",
          isCollapsed ? "p-3" : "p-3"
        )}
      >
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "space-x-3"
          )}
        >
          <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>

          {!isCollapsed && (
            <div className="flex-1 transition-opacity duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">
                  Storage
                </span>
                <span className="text-xs text-gray-500">75% used</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
