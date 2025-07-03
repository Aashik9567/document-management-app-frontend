import { FileText, Shield, Users, Zap, Clock, Globe } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Generation',
      description: 'Create professional documents in seconds with our advanced AI technology.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Legal Compliance',
      description: 'All templates are legally reviewed and updated to ensure compliance.',
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together on documents with real-time collaboration features.',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: FileText,
      title: 'Smart Templates',
      description: '100+ professional templates for contracts, NDAs, and business documents.',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Clock,
      title: 'Time Saving',
      description: 'Reduce document creation time by 90% with automated workflows.',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your documents anywhere, anytime with cloud-based storage.',
      color: 'from-teal-400 to-cyan-500'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-400 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Modern Teams
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, manage, and share professional documents 
            with your team and clients.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}