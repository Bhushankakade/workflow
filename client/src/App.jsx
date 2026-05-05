import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app-container">
        {user && <Sidebar />}
        <main className={`main-content ${user ? 'with-sidebar' : 'full-width'}`}>
          {user && <Navbar />}
          <div className="page-wrapper">
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/projects" element={user ? <Projects /> : <Navigate to="/login" />} />
              <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
