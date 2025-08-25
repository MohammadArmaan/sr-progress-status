import { Link, useLocation } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SR</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground hidden xs:block">SR Portraits & Events</h1>
            <h1 className="text-lg font-bold text-foreground block xs:hidden">SR Events</h1>
          </div>
          
          <div className="flex space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'bg-primary text-primary-foreground shadow-elegant' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Home size={18} />
              <span className="font-medium text-sm sm:text-base hidden sm:block">Home</span>
            </Link>
            
            <Link
              to="/admin"
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/admin' 
                  ? 'bg-primary text-primary-foreground shadow-elegant' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Settings size={18} />
              <span className="font-medium text-sm sm:text-base hidden sm:block">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;