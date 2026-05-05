import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../store/slices/authSlice';
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react';
import '../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'member'
  });
  const { name, email, password, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, role }));
  };

  return (
    <div className="auth-page flex-center">
      <div className="auth-card glass card">
        <div className="auth-header">
          <div className="logo-icon glass flex-center">
            <UserPlus size={28} className="text-primary" />
          </div>
          <h1>Create Account</h1>
          <p>Join WorkflowX and start collaborating</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label><User size={16} /> Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="John Doe"
              onChange={onChange}
              required
            />
          </div>
          <div className="input-group">
            <label><Mail size={16} /> Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="name@company.com"
              onChange={onChange}
              required
            />
          </div>
          <div className="input-group">
            <label><Lock size={16} /> Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="••••••••"
              onChange={onChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Role</label>
            <select name="role" value={role} onChange={onChange}>
              <option value="member">Member</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
      <style>{`
        select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-main);
          color: var(--text-main);
        }
      `}</style>
    </div>
  );
};

export default Register;
