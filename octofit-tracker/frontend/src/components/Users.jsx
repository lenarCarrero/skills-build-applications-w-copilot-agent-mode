import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
      ? codespaceEndpoint
      : '/api/users/';

    fetchCollection(apiEndpoint)
      .then((data) => {
        if (isMounted) {
          setUsers(data);
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
        <h2 className="h4">Users</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Goal</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id || `${user.name}-${user.email}`}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.fitnessGoal}</td>
                    <td>{user.city}</td>
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

export default Users;
