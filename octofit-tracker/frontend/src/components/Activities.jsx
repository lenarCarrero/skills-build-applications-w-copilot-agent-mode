import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('/activities')
      .then((data) => {
        if (isMounted) {
          setActivities(data);
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
        <h2 className="h4">Activities</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || activity.id || activity.type + activity.date}>
                    <td>{activity.type}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.date}</td>
                    <td>{activity.calories}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
