import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard () {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

   useEffect(() => {
     fetch('/dashboard')
       .then(response => response.json())
       .then(data => setUser(data.user))
       .catch(error => {
         console.error('Error al obtener el usuario:', error);
         navigate('/login');
         // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
       });
   }, []);
  const handleLogout = () => {
    fetch('/logout')
    .then(() => {
      setUser(null);
      navigate('/login');
    })
    .catch(error => {
      console.log('Error al cerrar sesión', error);
    })
  };
  return (
    <div>
     
        
        
        {user && (
        <div>
          <h1>Esto es el Dashboard</h1>
          <h2>Bienvenido, {user.name}</h2>
          <button onClick={handleLogout}>Salir</button>
        </div>
      )}
             
     
      
      
    </div>
  );
}

export default Dashboard;
