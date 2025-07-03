import { FileText, Users, TrendingUp , Eye, Download } from 'lucide-react';

export default function StatsCards() {
  const stats = [
    {
      name: 'Total Documents',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      name: 'Shared Documents',
      value: '12',
      change: '+8%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      name: 'Views This Month',
      value: '1,234',
      change: '+23%',
      changeType: 'increase',
      icon: Eye,
      color: 'bg-purple-500'
    },
    {
      name: 'Downloads',
      value: '89',
      change: '+5%',
      changeType: 'increase',
      icon: Download,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}