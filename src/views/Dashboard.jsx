import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Content from './components/Content';
import axios from 'axios';

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [activeDiv,setActiveDiv] = useState(null);
  // const handleLinkClick = (divName) => {
  //   setActiveDiv(divName);
  // }

  useEffect(() => {
    axios.get('https://porras-api-production.up.railway.app/dashboard')
    .then(response => {
      if (response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
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
    fetch('http://porras-api-production.up.railway.app/logout')
      .then(() => {
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
      })
      .catch(error => {
        console.log('Error al cerrar sesión', error);
      });
  };

  return (
    <div style={{display: "flex",width:"100%",backgroundColor:"#84754E"}}>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} setActiveDiv={setActiveDiv} />
        <div style={{ marginTop: '65px', paddingLeft: '250px' }}></div>
        <Content activeDiv={activeDiv} isAuthenticated={isAuthenticated} user={user} />
       
    </div>
  );
}

export default Dashboard;
