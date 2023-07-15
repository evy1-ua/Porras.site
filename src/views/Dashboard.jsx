import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/dashboard')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener el usuario');
        }
        return response.json();
      })
      .then(data => {
        if (data.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
        setIsAuthenticated(false);
        // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    fetch('/logout')
      .then(() => {
        setIsAuthenticated(false);
        navigate('/login');
      })
      .catch(error => {
        console.log('Error al cerrar sesión', error);
      });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Esto es el Dashboard</h1>
          <h2>Bienvenido, {user.name}</h2>
          <button onClick={handleLogout}>Salir</button>
        </div>
      ) : (
        <h1>No estás autenticado. Redirigiendo...</h1>
      )}
    </div>
  );
}

export default Dashboard;
