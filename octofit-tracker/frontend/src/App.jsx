import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-dark text-white py-4">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h1 className="h3 mb-1">OctoFit Tracker</h1>
              <p className="mb-0 text-light-emphasis">
                Multi-tier fitness app with React, Node.js, and MongoDB.
              </p>
            </div>
            <nav className="nav flex-wrap gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 rounded ${isActive ? 'bg-primary text-white' : 'text-white-50'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <section className="row g-4 align-items-start">
                <div className="col-lg-7">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <h2 className="h4">Welcome to OctoFit Tracker</h2>
                      <p className="text-muted">
                        Explore users, activities, teams, workouts, and leaderboard data from the Node.js API.
                      </p>
                      <p className="small text-muted mb-0">
                        Define VITE_CODESPACE_NAME in .env.local to use the Codespaces API URL automatically.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <h2 className="h4">API setup</h2>
                      <ul className="small mb-0">
                        <li>Codespaces: uses https://{import.meta.env.VITE_CODESPACE_NAME || 'your-space'}-8000.app.github.dev/api</li>
                        <li>Local: falls back to http://localhost:8000/api</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
