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

const activities = [
  {
    id: 1,
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

const statusColors = {
  completed: "bg-green-50 text-green-700 border-green-200",
  downloaded: "bg-purple-50 text-purple-700 border-purple-200",
  viewed: "bg-orange-50 text-orange-700 border-orange-200",
  default: "bg-gray-50 text-gray-700 border-gray-200",
};

export default function RecentActivity() {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl border border-gray-100/70">
      <div className="p-7 pb-5 border-b border-gray-200 bg-white/80 rounded-t-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-blue-400 text-white shadow-lg">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Recent Activity</h3>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-base text-gray-500">4 actions in the last 24 hours</p>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gray-50 to-white text-sm font-semibold text-gray-700 border border-gray-200 shadow hover:shadow-lg hover:border-gray-300 transition-all">
            View all
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-7">
        <div className="space-y-7">
          {activities.length === 0 ? (
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
          ) : (
            activities.map((activity, idx) => (
              <div
                key={activity.id}
                className={cn(
                  "group relative flex items-start rounded-2xl p-5 bg-white border-0 shadow-[0_8px_32px_0_rgba(60,120,220,0.12),_0_2px_8px_0_rgba(80,80,120,0.09)] hover:shadow-[0_16px_48px_0_rgba(60,120,220,0.15),_0_4px_16px_0_rgba(80,80,120,0.12)] transition-all duration-300 cursor-pointer"
                )}
              >
                {/* Timeline vertical line */}
                {idx !== activities.length - 1 && (
                  <div className="absolute left-9 top-16 bottom-[-2.5rem] w-1 bg-gradient-to-b from-gray-200 via-gray-100 to-transparent z-0" />
                )}

                <div
                  className={cn(
                    "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white z-10 shadow-xl ring-2 ring-white",
                    activity.bgColor
                  )}
                  style={{
                    boxShadow: "0 8px 32px 0 rgba(60,120,220,0.19), 0 2px 8px 0 rgba(80,80,120,0.16)"
                  }}
                >
                  <activity.icon className="h-7 w-7" />
                </div>

                <div className="min-w-0 flex-1 ml-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-xs font-bold text-gray-700 shadow-sm">
                        {activity.avatar}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{activity.user}</span>
                    </div>
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold border shadow",
                        statusColors[activity.status as keyof typeof statusColors] ||
                          statusColors.default
                      )}
                    >
                      {activity.status}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}