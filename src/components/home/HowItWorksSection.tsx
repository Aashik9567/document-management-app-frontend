import { FileText, Settings, Share2, Download, ArrowRight, Play } from 'lucide-react';
import HomeHeader from './HomeHeader';

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Choose Template',
      description: 'Select from our library of professionally designed document templates or create your own custom template.',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      features: ['100+ Templates', 'Legal Compliance', 'Industry Specific']
    },
    {
      step: '02',
      title: 'Customize Content',
      description: 'Fill in your information using our intelligent form builder. AI suggests content based on your industry.',
      icon: Settings,
      color: 'from-purple-500 to-purple-600',
      features: ['Smart Forms', 'AI Suggestions', 'Real-time Preview']
    },
    {
      step: '03',
      title: 'Collaborate & Review',
      description: 'Share with your team for review and feedback. Track changes and maintain version control.',
      icon: Share2,
      color: 'from-green-500 to-green-600',
      features: ['Team Collaboration', 'Version Control', 'Comment System']
    },
    {
      step: '04',
      title: 'Generate & Download',
      description: 'Generate your final document in multiple formats. Download, share, or store securely in the cloud.',
      icon: Download,
      color: 'from-orange-500 to-orange-600',
      features: ['Multiple Formats', 'Cloud Storage', 'Digital Signatures']
    }
  ];

  return (
    <>
        <HomeHeader/>
    <section id="how-it-works" className="py-8 bg-gray-50 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-green-400 to-blue-400 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-4">
            <Play className="h-4 w-4 mr-2" />
            How DocuMate Works
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Create Professional Documents in
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}4 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes document creation fast, easy, and professional. 
            From template selection to final download in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl`}>
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3">
                  {step.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200"
                    >
                      ✨ {feature}
                    </span>
                  ))}
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex items-center text-gray-400 mt-8">
                    <ArrowRight className="h-6 w-6" />
                    <div className="ml-3 text-sm font-medium">Next Step</div>
                  </div>
                )}
              </div>

              {/* Visual */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  {/* Main Card */}
                  <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} p-4 mb-6 mx-auto`}>
                      <step.icon className="w-full h-full text-white" />
                    </div>

                    {/* Mock Interface based on step */}
                    {index === 0 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-8 w-8 text-blue-600" />
                          </div>
                          <div className="h-20 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-8 w-8 text-purple-600" />
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-8 bg-blue-50 border-2 border-blue-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-8 bg-blue-50 border-2 border-blue-200 rounded"></div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-green-100 rounded px-2 text-xs flex items-center">✓ Valid</div>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                          <div className="h-2 bg-gray-200 rounded flex-1"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                          <div className="h-2 bg-gray-200 rounded flex-1"></div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                          <div className="h-2 bg-yellow-300 rounded w-2/3"></div>
                        </div>
                      </div>
                    )}

                    {index === 3 && (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="w-16 h-20 bg-gradient-to-b from-blue-500 to-blue-600 rounded text-white flex items-center justify-center">
                            <FileText className="h-8 w-8" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-8 bg-red-100 rounded flex items-center justify-center text-xs">PDF</div>
                          <div className="h-8 bg-blue-100 rounded flex items-center justify-center text-xs">DOCX</div>
                          <div className="h-8 bg-green-100 rounded flex items-center justify-center text-xs">HTML</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Floating elements */}
                  <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full opacity-20 animate-pulse`}></div>
                  <div className={`absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r ${step.color} rounded-full opacity-30 animate-bounce`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to streamline your document workflow?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of professionals who save hours every week with DocuMate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}