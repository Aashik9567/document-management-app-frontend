import { useAuthStore } from "../../states/authStore";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import { Calendar, FileText, Sparkles, ChevronRight } from "lucide-react";
import UserDocument from "../../components/dashboard/UserDocument";

export default function Dashboard() {
  const { user } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const templates = [
    {
      name: "NDA Agreement",
      category: "Legal",
      usage: "89%",
      color: "from-purple-500 to-indigo-600",
    },
    {
      name: "Employment Contract",
      category: "HR",
      usage: "76%",
      color: "from-blue-500 to-cyan-600",
    },
    {
      name: "Service Agreement",
      category: "Business",
      usage: "65%",
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "Offer Letter",
      category: "HR",
      usage: "54%",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6 space-y-8">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600 rounded-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 rounded-3xl"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium text-white/90">
                  Dashboard
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {getGreeting()}, {user?.firstName || "User"}!
              </h1>
              <p className="text-white/80 mb-6 text-lg">
                Ready to create something amazing? Your productivity hub awaits.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-40 h-40 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <div className="w-32 h-32 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-24 h-24 bg-gradient-to-br from-white/40 to-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <FileText className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserDocument />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Quick Actions - Enhanced */}
        <div className="xl:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Activity - Enhanced */}
        <div className="xl:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Premium Templates Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Premium Templates
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Most popular document templates
            </p>
          </div>
          <button className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.name}
              className="group relative overflow-hidden rounded-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-90`}
              ></div>
              <div className="relative p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    {template.category}
                  </div>
                </div>
                <h4 className="font-semibold text-sm mb-2">{template.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80">
                    {template.usage} usage
                  </span>
                  <button className="text-xs bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 transition-colors">
                    Use
                  </button>
                </div>
                <div className="mt-3 w-full bg-white/20 rounded-full h-1">
                  <div
                    className="bg-white rounded-full h-1 transition-all duration-500"
                    style={{ width: template.usage }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">{/* Nested routes will render here */}</div>
    </div>
  );
}
