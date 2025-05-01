import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Video, Home, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleLogout = () => {
    closeMenu();
    logout();
  };
  
  const navItems = [
    { label: 'Dashboard', path: '/', icon: <Home size={18} /> },
    { label: 'Create Content', path: '/create', icon: <Plus size={18} /> },
  ];
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Video className="h-8 w-8 text-purple-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">VideoAI</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      location.pathname === item.path
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-1">{item.label}</span>
                  </Link>
                ))}
                
                <div className="ml-3 relative flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar}
                      alt={user.name}
                    />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="small"
                    onClick={handleLogout}
                    icon={<LogOut size={16} />}
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
            
            {!user && (
              <Button
                onClick={() => navigate('/login')}
                variant="primary"
                size="small"
              >
                Log In
              </Button>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {user && navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  location.pathname === item.path
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMenu}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </div>
          
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              
              <div className="mt-3 space-y-1 px-4">
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                >
                  <LogOut size={18} />
                  <span className="ml-2">Sign out</span>
                </button>
              </div>
            </div>
          )}
          
          {!user && (
            <div className="pt-2 pb-3 px-4">
              <Button
                onClick={() => {
                  closeMenu();
                  navigate('/login');
                }}
                variant="primary"
                fullWidth
              >
                Log In
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;