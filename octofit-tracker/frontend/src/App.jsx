import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness platform for logging workouts, building teams,
            and staying motivated through a live leaderboard.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="#">Get Started</a>
            <a className="btn btn-outline-secondary btn-lg" href="#">Explore Features</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">Platform highlights</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">Activity logging and progress tracking</li>
                <li className="list-group-item">Team management and collaboration</li>
                <li className="list-group-item">Competitive leaderboard experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
