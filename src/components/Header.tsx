import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import uriLogo from 'figma:asset/3bd959c6124b8a4784ba9df8e5e8a6729e00e7f9.webp';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname === '/') {
      // If we're already on home page, just scroll to section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we're on another page, navigate to home page first, then scroll
      navigate('/');
      // Use setTimeout to wait for navigation to complete before scrolling
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="w-full px-4 py-4 bg-transparent sticky top-0 z-50">
      <header className={`mx-auto bg-[#4a4a4a]/80 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-[1.215rem] flex items-center justify-between transition-all duration-700 ease-out ${isScrolled ? 'max-w-5xl' : 'max-w-7xl'}`}>
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={uriLogo} alt="Uri" className="h-6 sm:h-8 w-auto" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center transition-all duration-700 ease-out ${isScrolled ? 'space-x-4 lg:space-x-6' : 'space-x-6 lg:space-x-10'}`}>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
            About
          </Link>
          <button 
            onClick={() => handleSectionClick('features')} 
            className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleSectionClick('use-cases')} 
            className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base"
          >
            Use cases
          </button>
          <button 
            onClick={() => handleSectionClick('service')} 
            className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base"
          >
            Service
          </button>
          <button 
            onClick={() => handleSectionClick('faq')} 
            className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base"
          >
            FAQ
          </button>
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop CTA */}
          <Button 
            onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z', '_blank')}
            className="hidden sm:flex bg-primary text-black hover:bg-primary/90 rounded-full text-sm lg:text-base px-4 lg:px-6 py-2 h-auto font-medium text-center"
          >
            Book a Demo
          </Button>
          
          {/* Mobile CTA - smaller */}
          <Button 
            onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z', '_blank')}
            className="sm:hidden bg-primary text-black hover:bg-primary/90 rounded-full text-xs px-3 py-1.5 h-auto font-medium text-center"
          >
            Demo
          </Button>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4">
          <nav className="bg-[rgba(68,68,68,1)] rounded-xl px-4 py-4 space-y-3">
            <Link 
              to="/about" 
              className="block text-gray-300 hover:text-white transition-colors text-base py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <button 
              onClick={() => handleSectionClick('features')} 
              className="block text-gray-300 hover:text-white transition-colors text-base py-2 text-left w-full"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleSectionClick('use-cases')} 
              className="block text-gray-300 hover:text-white transition-colors text-base py-2 text-left w-full"
            >
              Use cases
            </button>
            <button 
              onClick={() => handleSectionClick('service')} 
              className="block text-gray-300 hover:text-white transition-colors text-base py-2 text-left w-full"
            >
              Service
            </button>
            <button 
              onClick={() => handleSectionClick('faq')} 
              className="block text-gray-300 hover:text-white transition-colors text-base py-2 text-left w-full"
            >
              FAQ
            </button>
            <div className="pt-2 border-t border-gray-600">
              <Button 
                onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z', '_blank')}
                className="w-full bg-primary text-black hover:bg-primary/90 text-base px-6 py-3 h-auto font-medium text-center"
              >
                Book a Demo
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}