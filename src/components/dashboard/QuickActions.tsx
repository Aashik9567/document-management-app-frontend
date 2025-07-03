import {  FileText, Notebook, Users, Upload, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      name: 'Create NDA',
      description: 'Generate a new NDA document',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      onClick: () => navigate('/dashboard/create/nda')
    },
    {
      name: 'Employment Contract',
      description: 'Create employment agreement',
      icon: Users,
      color: 'from-green-500 to-green-600',
      onClick: () => navigate('/dashboard/create/contract')
    },
    {
      name: 'Use Template',
      description: 'Start from existing template',
      icon: Notebook,
      color: 'from-purple-500 to-purple-600',
      onClick: () => navigate('/dashboard/templates')
    },
    {
      name: 'Upload Document',
      description: 'Upload and manage files',
      icon: Upload,
      color: 'from-orange-500 to-orange-600',
      onClick: () => navigate('/dashboard/upload')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <Zap className="h-5 w-5 text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className="group p-4 text-left rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                  {action.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}