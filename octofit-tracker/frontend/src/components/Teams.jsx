import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
      ? codespaceEndpoint
      : '/api/teams/';

    fetchCollection(apiEndpoint)
      .then((data) => {
        if (isMounted) {
          setTeams(data);
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
        <h2 className="h4">Teams</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div className="col-md-6" key={team._id || team.id || team.name}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6">{team.name}</h3>
                  <p className="text-muted small mb-2">{team.focus}</p>
                  <ul className="small mb-0">
                    {(team.members || []).map((member) => (
                      <li key={`${team.name}-${member}`}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
