import documentImage from '../../assets/document.png';
import { ArrowRight, FileText, Download, Clock, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-emerald-900 to-indigo-900 overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0">
        <svg 
          className="absolute bottom-0 w-full h-64 text-white/10" 
          viewBox="0 0 1200 320" 
          fill="currentColor"
        >
          <path 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-pulse"
          />
        </svg>
        <svg 
          className="absolute bottom-0 w-full h-48 text-white/5" 
          viewBox="0 0 1200 320" 
          fill="currentColor"
        >
          <path 
            d="M0,192L48,197.3C96,203,192,213,288,218.7C384,224,480,224,576,213.3C672,203,768,181,864,170.7C960,160,1056,160,1152,165.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-pulse delay-700"
          />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce delay-300"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-400/20 rounded-full blur-lg animate-bounce delay-500"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-bounce delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Professional Document Templates
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Create Professional 
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {" "}Documents{" "}
                </span>
                in Minutes
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                Access ready-to-use templates for NDAs, offer letters, service agreements, and more. 
                Save time and ensure consistency with our professionally crafted document templates.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Save Hours</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90">
                <FileText className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">6+ Templates</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90">
                <Download className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Instant Download</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                View Templates
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">6+</div>
                <div className="text-white/60 text-sm">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-white/60 text-sm">Professional</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5min</div>
                <div className="text-white/60 text-sm">Setup Time</div>
              </div>
            </div>
          </div>

          {/* Right Content - Document Preview */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Document Image */}
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-2xl blur-2xl transform rotate-6"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <img 
                    src={documentImage }
                    alt="Document Template Preview" 
                    className="w-full h-auto rounded-lg shadow-2xl"
    
                  />
                  <div className="hidden">
                    <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <FileText className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Document Types */}
              <div className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <div className="text-white/90 text-sm font-medium">NDA</div>
              </div>
              
              <div className="absolute top-8 -right-4 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <div className="text-white/90 text-sm font-medium">Offer Letter</div>
              </div>
              
              <div className="absolute -bottom-4 left-8 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <div className="text-white/90 text-sm font-medium">Service Agreement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-900 to-transparent"></div>
    </section>
  );
};

export default HeroSection;