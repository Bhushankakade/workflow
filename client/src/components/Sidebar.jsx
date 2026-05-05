import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  Settings, 
  LogOut,
  Layers
} from 'lucide-react';
import '../styles/sidebar.css';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="logo flex-center">
          <Layers className="text-primary" size={24} />
          <span>WorkflowX</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <p className="section-title">Menu</p>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <FolderKanban size={20} />
            <span>Projects</span>
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <CheckSquare size={20} />
            <span>Tasks</span>
          </NavLink>
        </div>

        {(user?.role === 'admin' || user?.role === 'manager') && (
          <div className="nav-section">
            <p className="section-title">Admin</p>
            <NavLink to="/team" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <Users size={20} />
              <span>Team</span>
            </NavLink>
          </div>
        )}

        <div className="nav-section settings-section">
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
          <button onClick={onLogout} className="nav-item logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar flex-center">
            {user?.name.charAt(0)}
          </div>
          <div className="user-details">
            <p className="username">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
