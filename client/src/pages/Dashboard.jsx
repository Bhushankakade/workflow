import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../store/slices/projectSlice';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  Plus,
  Trash2
} from 'lucide-react';
import { deleteProject } from '../store/slices/projectSlice';
import CreateProjectModal from '../components/CreateProjectModal';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const stats = [
    { label: 'Completed Tasks', value: 12, icon: CheckCircle2, color: '#10b981' },
    { label: 'In Progress', value: 5, icon: Clock, color: '#3b82f6' },
    { label: 'Overdue', value: 2, icon: AlertCircle, color: '#ef4444' },
    { label: 'Productivity', value: '+14%', icon: TrendingUp, color: '#8b5cf6' },
  ];

  const chartData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 7 },
    { name: 'Wed', tasks: 5 },
    { name: 'Thu', tasks: 8 },
    { name: 'Fri', tasks: 12 },
    { name: 'Sat', tasks: 6 },
    { name: 'Sun', tasks: 3 },
  ];

  const pieData = [
    { name: 'Todo', value: 40, color: '#64748b' },
    { name: 'In Progress', value: 30, color: '#3b82f6' },
    { name: 'Completed', value: 30, color: '#10b981' },
  ];

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div className="dashboard-container">
      <header className="page-header">
        <div>
          <h1>Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-muted">Here's what's happening with your projects today.</p>
        </div>
        <button className="btn-primary flex-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create Project
        </button>
      </header>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card card glass">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}22`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <p className="text-muted">{stat.label}</p>
              <h3>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card card glass">
          <h3>Weekly Productivity</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Bar dataKey="tasks" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card card glass">
          <h3>Task Status Allocation</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="projects-section">
        <h3>Recent Projects</h3>
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="project-card card glass">
                <div className="project-card-header">
                  <h4>{project.title}</h4>
                  <button className="icon-btn delete-btn" onClick={() => onDelete(project._id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-muted">{project.description}</p>
                <div className="project-footer">
                  <div className="team-avatars">
                    {project.team.slice(0, 3).map((member, i) => (
                      <div key={i} className="team-avatar" title={member?.name || 'User'}>
                        {member?.name?.charAt(0) || '?'}
                      </div>
                    ))}
                    {project.team.length > 3 && (
                      <div className="team-avatar more">+{project.team.length - 3}</div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No projects found. Create your first one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
