import { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated (e.g., token exists)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '/howitworks' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  const renderAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          Dashboard
        </button>
      );
    }
    return (
      <>
        <button
          onClick={() => navigate('/login')}
          className="text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-blue-600  text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          Get Started
        </button>
      </>
    );
  };

  const renderMobileAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <button
          onClick={() => {
            navigate('/dashboard');
            setIsMenuOpen(false);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all mx-3"
        >
          Dashboard
        </button>
      );
    }
    return (
      <>
        <button
          onClick={() => {
            navigate('/login');
            setIsMenuOpen(false);
          }}
          className="text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium text-left"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate('/signup');
            setIsMenuOpen(false);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all mx-3"
        >
          Get Started
        </button>
      </>
    );
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <a href="/" className="ml-3 text-xl font-bold text-gray-900">DocuFlow</a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {renderAuthButtons()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-3">
                  {renderMobileAuthButtons()}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}