import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../api/dataApi';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users = await getUsers();
      const user = users.find(
        (user: any) => user.username === username && user.password === password
      );
      if (user) {
        // Erfolg: Benutzerdaten speichern (z.B. in localStorage oder Context API)
        alert(`Willkommen, ${user.username}`);
        navigate('/dashboard'); // Weiterleitung nach erfolgreichem Login
      } else {
        setErrorMessage('Falscher Benutzername oder Passwort');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Fehler bei der Anmeldung');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Anmelden</h2>
        
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">Benutzername</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Benutzername"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Passwort</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Passwort"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Anmelden
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Noch kein Konto?{' '}
          <a href="/signup" className="text-indigo-600 hover:text-indigo-800">
            Registrieren
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
