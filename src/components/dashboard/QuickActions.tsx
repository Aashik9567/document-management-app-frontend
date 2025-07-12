import {
  FileText,
  Notebook,
  Users,
  Upload,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      name: "Create NDA",
      description: "Generate a new NDA document",
      icon: FileText,
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      shadow: "shadow-[0_8px_32px_0_rgba(99,102,241,0.32),_0_1.5px_5px_0_rgba(80,40,240,0.23)]",
      bgColor: "bg-indigo-600",
      onClick: () => navigate("/dashboard/create/nda"),
    },
    {
      name: "Employment Contract",
      description: "Create employment agreement",
      icon: Users,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      shadow: "shadow-[0_8px_32px_0_rgba(16,185,129,0.33),_0_1.5px_5px_0_rgba(10,120,80,0.19)]",
      bgColor: "bg-emerald-600",
      onClick: () => navigate("/dashboard/create/contract"),
    },
    {
      name: "Use Template",
      description: "Start from existing template",
      icon: Notebook,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      shadow: "shadow-[0_8px_32px_0_rgba(139,92,246,0.33),_0_1.5px_5px_0_rgba(120,40,180,0.20)]",
      bgColor: "bg-violet-600",
      onClick: () => navigate("/dashboard/templates"),
    },
    {
      name: "Upload Document",
      description: "Upload and manage files",
      icon: Upload,
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      shadow: "shadow-[0_8px_32px_0_rgba(251,191,36,0.33),_0_1.5px_5px_0_rgba(180,120,20,0.17)]",
      bgColor: "bg-orange-600",
      onClick: () => navigate("/dashboard/upload"),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl border border-gray-100/70">
      <div className="p-7 pb-5 border-b border-gray-200 bg-white/80 rounded-t-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-pink-400 text-white shadow-lg">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Quick Actions
              </h3>
              <p className="text-base text-gray-500">
                Create documents quickly with these shortcuts
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gray-50 to-white text-sm font-semibold text-gray-700 border border-gray-200 shadow hover:shadow-lg hover:border-gray-300 transition-all">
            See all
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-7 grid grid-cols-1 sm:grid-cols-2 gap-7">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className={cn(
              "group relative flex flex-col bg-white border-0 rounded-2xl overflow-hidden hover:bg-gradient-to-br transition-all duration-300",
              "hover:from-gray-50 hover:via-purple-50 hover:to-white",
              action.shadow
            )}
          >
            <div className="p-6 flex items-start gap-5">
              <div
                className={cn(
                  "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-xl ring-2 ring-white ring-offset-2 transition-all group-hover:scale-105",
                  `bg-gradient-to-br ${action.gradient}`
                )}
              >
                <action.icon className="h-7 w-7" />
              </div>

              <div className="flex-1 text-left">
                <h4 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 mb-2 flex items-center transition-colors">
                  {action.name}
                  <ArrowRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </h4>
                <p className="text-gray-500 text-base">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}