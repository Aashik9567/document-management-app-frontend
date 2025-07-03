import { FileText, Users, Download, Eye, Clock } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'document_created',
      title: 'NDA Agreement created',
      description: 'New NDA document for client collaboration',
      time: '2 hours ago',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'document_shared',
      title: 'Contract shared with team',
      description: 'Employment contract shared with HR team',
      time: '4 hours ago',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'document_downloaded',
      title: 'Offer letter downloaded',
      description: 'Senior developer offer letter downloaded by candidate',
      time: '6 hours ago',
      icon: Download,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      type: 'document_viewed',
      title: 'Service agreement viewed',
      description: 'Client viewed the service agreement document',
      time: '8 hours ago',
      icon: Eye,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
              <activity.icon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <div className="flex items-center mt-1">
                <Clock className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}