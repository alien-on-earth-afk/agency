import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useCart } from '@/context/CartContext';
import { Menu, X, ShoppingCart } from 'lucide-react';

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Services', path: '/services' },
  { title: 'Our Work', path: '/work' },
  { title: 'About Us', path: '/about' },
  { title: 'Careers', path: '/careers' },
  { title: 'Contact Us', path: '/contact' },
  { title: 'Our Team', path: '/about/team' }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  

  

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md py-2 shadow-md' 
          : 'bg-white dark:bg-gray-600 py-2'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-12">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center"
          aria-label="WebARK Home"
        >
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-white dark:to-white/80">
            Web<span className="font-extrabold">ARK</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1 items-center">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link px-3 py-1 text-sm ${
                location.pathname === item.path ? 'text-primary dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-300'
              } hover:text-primary dark:hover:text-white transition-colors`}
            >
              {item.title}
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <Link 
            to="/cart" 
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={16} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white dark:bg-white dark:text-primary text-xs w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </Link>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`fixed inset-0 bg-white dark:bg-black z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ top: '48px' }}
      >
        <nav className="h-full flex flex-col pt-3 pb-20 px-4 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-3 text-sm border-b border-gray-100 dark:border-gray-800 ${
                location.pathname === item.path ? 'text-primary dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
