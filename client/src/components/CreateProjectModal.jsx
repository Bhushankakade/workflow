import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../store/slices/projectSlice';
import { getUsers } from '../store/slices/authSlice';
import { X, UserPlus, Check } from 'lucide-react';

const CreateProjectModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTeam, setSelectedTeam] = useState([]);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isOpen) {
      dispatch(getUsers());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const toggleMember = (id) => {
    if (selectedTeam.includes(id)) {
      setSelectedTeam(selectedTeam.filter(memberId => memberId !== id));
    } else {
      setSelectedTeam([...selectedTeam, id]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject({ title, description, team: selectedTeam }));
    onClose();
    setTitle('');
    setDescription('');
    setSelectedTeam([]);
  };

  return (
    <div className="modal-overlay flex-center glass">
      <div className="modal-content card slide-up">
        <div className="modal-header">
          <h3>Create New Project</h3>
          <button onClick={onClose} className="icon-btn flex-center">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Project Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Website Redesign"
              required 
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Briefly describe the project goals..."
              rows={4}
            />
          </div>
          <div className="input-group">
            <label>Add Team Members</label>
            <div className="user-selector glass">
              {users.map(user => (
                <div 
                  key={user._id} 
                  className={`user-item ${selectedTeam.includes(user._id) ? 'selected' : ''}`}
                  onClick={() => toggleMember(user._id)}
                >
                  <div className="user-avatar">{user.name.charAt(0)}</div>
                  <div className="user-details">
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                  {selectedTeam.includes(user._id) && <Check size={16} className="text-primary" />}
                </div>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Create Project</button>
          </div>
        </form>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(0, 0, 0, 0.4);
        }
        .modal-content {
          width: 100%;
          max-width: 500px;
          padding: 2rem;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }
        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          background: var(--bg-side);
          color: var(--text-main);
        }
        .slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .user-selector {
          max-height: 200px;
          overflow-y: auto;
          border-radius: 8px;
          border: 1px solid var(--border);
          padding: 0.5rem;
        }
        .user-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .user-item:hover {
          background: var(--bg-card);
        }
        .user-item.selected {
          background: rgba(59, 130, 246, 0.1);
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.8rem;
        }
        .user-details {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .user-name {
          font-size: 0.9rem;
          font-weight: 500;
        }
        .user-email {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CreateProjectModal;
