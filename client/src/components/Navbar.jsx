import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <header className="navbar glass">
      <div className="navbar-left">
        <button className="mobile-menu flex-center">
          <Menu size={20} />
        </button>
        <div className="search-bar glass">
          <Search size={18} className="text-muted" />
          <input type="text" placeholder="Search tasks, projects..." />
        </div>
      </div>

      <div className="navbar-right">
        <button className="icon-btn glass flex-center">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="theme-toggle">
          {/* Theme switcher would go here */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
