import {
  FileText,
  Download,
  Eye,
  Clock,
  ArrowRight,
  Activity,
  TrendingUp,
} from "lucide-react";
import { cn } from "../../lib/utils";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "document_created",
      title: "NDA Agreement created",
      description: "New NDA document for client collaboration",
      time: "2 hours ago",
      icon: FileText,
      bgColor: "bg-blue-500",
      user: "John Doe",
      avatar: "JD",
      status: "completed",
    },
    {
      id: 3,
      type: "document_downloaded",
      title: "Offer letter downloaded",
      description: "Senior developer offer letter downloaded by candidate",
      time: "6 hours ago",
      icon: Download,
      bgColor: "bg-purple-500",
      user: "Mike Johnson",
      avatar: "MJ",
      status: "downloaded",
    },
    {
      id: 4,
      type: "document_viewed",
      title: "Service agreement viewed",
      description: "Client viewed the service agreement document",
      time: "8 hours ago",
      icon: Eye,
      bgColor: "bg-orange-500",
      user: "Emma Davis",
      avatar: "ED",
      status: "viewed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "shared":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "downloaded":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "viewed":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl ">
      <div className="p-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-500 text-white shadow-md">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <p className="text-sm text-gray-600">
                  4 actions in the last 24 hours
                </p>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-sm font-medium text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
            View all
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="group relative flex items-start border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-md cursor-pointer transition-all bg-white"
            >
              {/* Timeline line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-8 top-16 bottom-[-1.5rem] w-0.5 bg-gray-200" />
              )}

              <div
                className={cn(
                  "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white z-10 shadow-md",
                  activity.bgColor
                )}
              >
                <activity.icon className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1 ml-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-xs font-bold text-gray-700 shadow-sm">
                      {activity.avatar}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {activity.user}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium border shadow-sm",
                      getStatusColor(activity.status)
                    )}
                  >
                    {activity.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-100 mb-6">
              <Clock className="h-10 w-10 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No recent activity
            </h4>
            <p className="text-sm text-gray-600">
              Activity will appear here as you work
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
