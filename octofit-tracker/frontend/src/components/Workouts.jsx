import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
      ? codespaceEndpoint
      : '/api/workouts/';

    fetchCollection(apiEndpoint)
      .then((data) => {
        if (isMounted) {
          setWorkouts(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Workouts</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.id || workout.title}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6">{workout.title}</h3>
                  <p className="small text-muted mb-2">{workout.focus}</p>
                  <p className="small mb-0">
                    {workout.difficulty} • {workout.durationMinutes} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
