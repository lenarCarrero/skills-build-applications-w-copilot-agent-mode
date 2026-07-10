import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('/leaderboard')
      .then((data) => {
        if (isMounted) {
          setEntries(data);
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
        <h2 className="h4">Leaderboard</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id || entry.id || `${entry.name}-${entry.rank}`}>
                    <td>{entry.rank}</td>
                    <td>{entry.name}</td>
                    <td>{entry.points}</td>
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

export default Leaderboard;
