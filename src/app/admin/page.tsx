'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const HARDCODED_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
};

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e : any) => {
    e.preventDefault();
    if (username === HARDCODED_CREDENTIALS.username && password === HARDCODED_CREDENTIALS.password) {
      sessionStorage.setItem('isAuthenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Connexion Admin</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Se connecter</button>
      </form>
    </div>
  );
}