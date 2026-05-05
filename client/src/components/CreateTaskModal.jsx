import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../store/slices/taskSlice';
import { X, Calendar, AlertTriangle } from 'lucide-react';

const CreateTaskModal = ({ isOpen, onClose, projectId, projectTeam }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState([]);
  const [dueDate, setDueDate] = useState('');
  
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ 
      title, 
      description, 
      project: projectId, 
      assignedTo, 
      priority, 
      dueDate 
    }));
    onClose();
    setTitle('');
    setDescription('');
    setAssignedTo([]);
    setPriority('medium');
    setDueDate('');
  };

  const toggleAssignee = (userId) => {
    if (assignedTo.includes(userId)) {
      setAssignedTo(assignedTo.filter(id => id !== userId));
    } else {
      setAssignedTo([...assignedTo, userId]);
    }
  };

  return (
    <div className="modal-overlay flex-center glass">
      <div className="modal-content card slide-up">
        <div className="modal-header">
          <h3>Create New Task</h3>
          <button onClick={onClose} className="icon-btn flex-center">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Task Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Design Landing Page"
              required 
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="What needs to be done?"
              rows={3}
            />
          </div>
          
          <div className="row-group">
            <div className="input-group flex-1">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="input-group flex-1">
              <label>Due Date</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Assign To</label>
            <div className="assignee-list">
              {projectTeam?.map(member => {
                const memberId = member?._id || member;
                const memberName = member?.name || 'User';
                return (
                  <div 
                    key={memberId} 
                    className={`assignee-pill ${assignedTo.includes(memberId) ? 'selected' : ''}`}
                    onClick={() => toggleAssignee(memberId)}
                  >
                    {memberName}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Create Task</button>
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
          margin-bottom: 1.5rem;
        }
        .row-group {
          display: flex;
          gap: 1rem;
        }
        .flex-1 { flex: 1; }
        .assignee-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .assignee-pill {
          padding: 0.4rem 0.8rem;
          background: var(--bg-side);
          border: 1px solid var(--border);
          border-radius: 20px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .assignee-pill.selected {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }
        .slide-up {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CreateTaskModal;
