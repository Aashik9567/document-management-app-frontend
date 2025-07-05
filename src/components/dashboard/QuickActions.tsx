import { FileText, Notebook, Users, Upload, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      name: 'Create NDA',
      description: 'Generate a new NDA document',
      icon: FileText,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      bgColor: 'bg-indigo-600',
      onClick: () => navigate('/dashboard/create/nda'),
      popular: true
    },
    {
      name: 'Employment Contract',
      description: 'Create employment agreement',
      icon: Users,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgColor: 'bg-emerald-600',
      onClick: () => navigate('/dashboard/create/contract'),
      popular: false
    },
    {
      name: 'Use Template',
      description: 'Start from existing template',
      icon: Notebook,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      bgColor: 'bg-violet-600',
      onClick: () => navigate('/dashboard/templates'),
      popular: true
    },
    {
      name: 'Upload Document',
      description: 'Upload and manage files',
      icon: Upload,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      bgColor: 'bg-orange-600',
      onClick: () => navigate('/dashboard/upload'),
      popular: false
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="p-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500 text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Quick Actions
              </h3>
              <p className="text-sm text-gray-600">
                Create documents quickly with these shortcuts
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-sm font-medium text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
            See all
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all"
          >
            {action.popular && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-xs font-bold text-white shadow-sm">
                <Zap className="h-3 w-3" />
                Popular
              </div>
            )}
            
            <div className="p-5 flex items-start gap-5">
              <div className={cn(
                "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-white shadow-md",
                action.bgColor
              )}>
                <action.icon className="h-7 w-7" />
              </div>
              
              <div className="text-left">
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2 flex items-center">
                  {action.name}
                  <ArrowRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </h4>
                <p className="text-sm text-gray-600">
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