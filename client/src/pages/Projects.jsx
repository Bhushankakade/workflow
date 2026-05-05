import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../store/slices/projectSlice';
import { Plus, Search, Filter, Trash2 } from 'lucide-react';
import { deleteProject } from '../store/slices/projectSlice';
import CreateProjectModal from '../components/CreateProjectModal';
import '../styles/dashboard.css'; // Reusing some dashboard styles

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div className="projects-page">
      <header className="page-header">
        <div>
          <h1>Projects</h1>
          <p className="text-muted">Manage and track all your active projects.</p>
        </div>
        <button className="btn-primary flex-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          New Project
        </button>
      </header>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="filter-bar glass card">
        <div className="search-box">
          <Search size={18} className="text-muted" />
          <input type="text" placeholder="Filter projects..." />
        </div>
        <button className="icon-btn flex-center">
          <Filter size={18} />
        </button>
      </div>

      <div className="projects-grid">
        {isLoading ? (
          <p>Loading projects...</p>
        ) : projects.length > 0 ? (
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
                    <div key={i} className="team-avatar">{member?.name?.charAt(0) || '?'}</div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data card glass flex-center flex-column">
            <p>No projects yet.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .projects-page {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .filter-bar {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 1rem;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }
        .search-box input {
          background: transparent;
          border: none;
          width: 100%;
          color: var(--text-main);
        }
        .no-data {
          grid-column: 1 / -1;
          padding: 4rem;
          background: var(--bg-side);
        }
      `}</style>
    </div>
  );
};

export default Projects;
