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
      shadowColor: 'shadow-indigo-500/25',
      onClick: () => navigate('/dashboard/create/nda'),
      popular: true
    },
    {
      name: 'Employment Contract',
      description: 'Create employment agreement',
      icon: Users,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      shadowColor: 'shadow-emerald-500/25',
      onClick: () => navigate('/dashboard/create/contract'),
      popular: false
    },
    {
      name: 'Use Template',
      description: 'Start from existing template',
      icon: Notebook,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      shadowColor: 'shadow-violet-500/25',
      onClick: () => navigate('/dashboard/templates'),
      popular: true
    },
    {
      name: 'Upload Document',
      description: 'Upload and manage files',
      icon: Upload,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      shadowColor: 'shadow-orange-500/25',
      onClick: () => navigate('/dashboard/upload'),
      popular: false
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl shadow-2xl shadow-black/5">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative flex flex-col space-y-1.5 p-8 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Quick Actions
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Create documents quickly with these shortcuts
              </p>
            </div>
          </div>
          <button className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-white/20 text-sm font-medium text-gray-700 hover:bg-white/80 hover:border-white/40 transition-all duration-200 shadow-sm">
            See all
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      <div className="relative p-8 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {actions.map((action) => (
            <button
              key={action.name}
              onClick={action.onClick}
              className="group relative flex items-start gap-5 rounded-2xl border border-white/20 bg-white/50 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:bg-white/70 hover:border-white/40 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white/20"
            >
              {action.popular && (
                <div className="absolute -top-3 -right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-xs font-bold text-white shadow-lg">
                  <Zap className="h-3 w-3" />
                  Popular
                </div>
              )}
              
              <div className={cn(
                "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg",
                action.gradient,
                action.shadowColor
              )}>
                <action.icon className="h-7 w-7" />
              </div>
              
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {action.name}
                  </h4>
                  <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}