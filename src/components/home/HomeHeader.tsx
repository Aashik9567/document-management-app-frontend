import { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '/howitworks' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  const renderAuthButtons = () => isLoggedIn ? (
    <button
      onClick={() => navigate('/dashboard')}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
    >
      Dashboard
    </button>
  ) : (
    <>
      <button
        onClick={() => navigate('/login')}
        className="text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors"
      >
        Login
      </button>
      <button
        onClick={() => navigate('/signup')}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
      >
        Get Started
      </button>
    </>
  );

  const renderMobileAuthButtons = () => isLoggedIn ? (
    <button
      onClick={() => {
        navigate('/dashboard');
        setIsMenuOpen(false);
      }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:from-blue-700 hover:to-purple-700 transition-all mx-3 shadow-lg"
    >
      Dashboard
    </button>
  ) : (
    <>
      <button
        onClick={() => {
          navigate('/login');
          setIsMenuOpen(false);
        }}
        className="text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-semibold text-left"
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate('/signup');
          setIsMenuOpen(false);
        }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:from-blue-700 hover:to-purple-700 transition-all mx-3 shadow-lg"
      >
        Get Started
      </button>
    </>
  );

  return (
    <header className="bg-white/95 shadow-2xl border-b border-gray-100/70">
      <nav className="max-w-full mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
                <FileText className="h-9 w-9 text-white" />
              </div>
              <a href="/" className="ml-4 text-2xl font-extrabold tracking-tight text-gray-900">DocuMate</a>
            </div>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 px-4 py-2 text-base font-semibold rounded-lg transition-colors hover:bg-blue-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {renderAuthButtons()}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-700 p-2 rounded-lg transition-all focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3 bg-white border-t border-gray-100/70 shadow-2xl rounded-b-2xl">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 hover:text-blue-600 px-4 py-2 text-base font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-100">
                <div className="flex flex-col space-y-4">
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