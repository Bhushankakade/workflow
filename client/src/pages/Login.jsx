import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../store/slices/authSlice';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import '../styles/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

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
    dispatch(login({ email, password }));
  };

  return (
    <div className="auth-page flex-center">
      <div className="auth-card glass card">
        <div className="auth-header">
          <div className="logo-icon glass flex-center">
            <LogIn size={28} className="text-primary" />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to WorkflowX to manage your team</p>
        </div>

        <form onSubmit={onSubmit}>
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
          <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
