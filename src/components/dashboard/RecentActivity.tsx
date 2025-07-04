import { FileText, Download, Eye, Clock, ArrowRight, Activity, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'document_created',
      title: 'NDA Agreement created',
      description: 'New NDA document for client collaboration',
      time: '2 hours ago',
      icon: FileText,
      gradient: 'from-blue-500 to-indigo-600',
      user: 'John Doe',
      avatar: 'JD',
      status: 'completed'
    },
    {
      id: 3,
      type: 'document_downloaded',
      title: 'Offer letter downloaded',
      description: 'Senior developer offer letter downloaded by candidate',
      time: '6 hours ago',
      icon: Download,
      gradient: 'from-purple-500 to-violet-600',
      user: 'Mike Johnson',
      avatar: 'MJ',
      status: 'downloaded'
    },
    {
      id: 4,
      type: 'document_viewed',
      title: 'Service agreement viewed',
      description: 'Client viewed the service agreement document',
      time: '8 hours ago',
      icon: Eye,
      gradient: 'from-orange-500 to-amber-600',
      user: 'Emma Davis',
      avatar: 'ED',
      status: 'viewed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shared':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'downloaded':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'viewed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl shadow-2xl shadow-black/5">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative flex flex-col space-y-1 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 shadow-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
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
          <button className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-white/20 text-sm font-medium text-gray-700 hover:bg-white/80 hover:border-white/40 transition-all duration-200 shadow-sm">
            View all
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
      
      <div className="relative p-8 pt-0">
        <div className="space-y-1">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={cn(
                "group relative flex items-start gap-5 rounded-2xl p-5 transition-all duration-300 hover:bg-white/60 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 cursor-pointer border border-transparent hover:border-white/40",
                index !== activities.length - 1 && "mb-2"
              )}
            >
              {/* Timeline line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-gray-200 to-transparent" />
              )}
              
              <div className={cn(
                "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg",
                activity.gradient
              )}>
                <activity.icon className="h-5 w-5" />
              </div>
              
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 text-xs font-bold text-gray-700 shadow-sm">
                      {activity.avatar}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {activity.user}
                    </span>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border shadow-sm",
                    getStatusColor(activity.status)
                  )}>
                    {activity.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {activities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 mb-6">
              <Clock className="h-10 w-10 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No recent activity</h4>
            <p className="text-sm text-gray-600">Activity will appear here as you work</p>
          </div>
        )}
      </div>
    </div>
  );
}