import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../store/slices/projectSlice';
import { getTasksByProject, updateTaskStatus } from '../store/slices/taskSlice';
import { Plus, MoreHorizontal, Calendar, User, Trash2 } from 'lucide-react';
import CreateTaskModal from '../components/CreateTaskModal';
import '../styles/tasks.css';

const Tasks = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const [selectedProject, setSelectedProject] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeProject = projects.find(p => p._id === selectedProject);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProject) {
      dispatch(getTasksByProject(selectedProject));
    }
  }, [selectedProject, dispatch]);

  const columns = [
    { id: 'todo', label: 'To Do', color: '#64748b' },
    { id: 'in-progress', label: 'In Progress', color: '#3b82f6' },
    { id: 'completed', label: 'Completed', color: '#10b981' },
  ];

  const onStatusChange = (id, newStatus) => {
    dispatch(updateTaskStatus({ id, status: newStatus }));
  };

  return (
    <div className="tasks-page">
      <header className="page-header">
        <div>
          <h1>Task Board</h1>
          <div className="project-selector">
            <select 
              value={selectedProject} 
              onChange={(e) => setSelectedProject(e.target.value)}
              className="glass"
            >
              <option value="">Select a Project</option>
              {projects.map(p => (
                <option key={p._id} value={p._id}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>
        <button 
          className="btn-primary flex-center gap-2" 
          disabled={!selectedProject}
          onClick={() => setIsModalOpen(true)}
          title={!selectedProject ? "Please select a project first" : ""}
        >
          <Plus size={18} />
          New Task
        </button>
      </header>

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        projectId={selectedProject}
        projectTeam={activeProject?.team}
      />

      {!selectedProject ? (
        <div className="no-project card glass flex-center">
          <p>Please select a project to view tasks.</p>
        </div>
      ) : (
        <div className="kanban-board">
          {columns.map(col => (
            <div key={col.id} className="kanban-column">
              <div className="column-header">
                <div className="flex-center gap-2">
                  <span className="dot" style={{ backgroundColor: col.color }}></span>
                  <h3>{col.label}</h3>
                  <span className="count">{tasks.filter(t => t.status === col.id).length}</span>
                </div>
                <button className="icon-btn flex-center" onClick={() => setIsModalOpen(true)}>
                  <Plus size={16} />
                </button>
              </div>

              <div className="task-list">
                {tasks.filter(t => t.status === col.id).map(task => (
                  <div key={task._id} className="task-card card glass slide-up">
                    <div className="task-priority" data-priority={task.priority}>
                      {task.priority}
                    </div>
                    <h4>{task.title}</h4>
                    <p className="text-muted">{task.description}</p>
                    
                    <div className="task-meta">
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
                      </div>
                      <div className="task-users">
                        {task.assignedTo?.map(user => (
                          <div key={user._id} className="mini-avatar" title={user.name}>
                            {user.name.charAt(0)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="task-actions">
                      <select 
                        value={task.status} 
                        onChange={(e) => onStatusChange(task._id, e.target.value)}
                        className="status-select"
                      >
                        {columns.map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                      <button className="icon-btn"><MoreHorizontal size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
