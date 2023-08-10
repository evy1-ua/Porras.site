import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'


function Navbar({ isAuthenticated, handleLogout, setActiveDiv }) {
  const handleLinkClick = (divName) => {
    setActiveDiv(divName);
  };
  
  return (
    <nav className='nav'>

        <div className='Logo '>
             <img src="./img/Logos/porras_logo.png" alt="" /> 
            
        </div>
        <p className='Name_logo'>Porras</p>
      <ul className=''>
        <li className='nav-li'>
          <span class="material-icons nav-icon">
          home
          </span>
          
          {<Link onClick={handleLinkClick('inicio')} className='nav-link'>Inicio</Link> }
        </li>
        <li className='nav-li'>
          <span class="material-icons nav-icon">
            collections_bookmark
          </span>
          <Link to="/cursos" className='nav-link'>Mis Cursos</Link>
        </li>
        <li className='nav-li'>
          <span className='material-icons nav-icon'>
            language
          </span>
          <Link to="/cursos" className='nav-link'>Comunidad</Link>
        </li>
        <li className='nav-li'>
          <span className='material-icons nav-icon'>
            settings
          </span>
          <Link to="/cursos" className='nav-link'>Soporte</Link>
        </li>
        {/* Agrega más elementos del navbar según tus necesidades */}
        
      </ul>
      {isAuthenticated ? (
        <div className='Logout'>
            <li className='nav-li'>
              <span class="material-icons nav-icon">
                logout
              </span>
              <Link onClick={handleLogout} className='nav-link'>Cerrar Sesión</Link>
              
              
      
            {/* <button onClick={handleLogout}>Salir</button> */}
            </li>
        </div>
          
        ) : null}
    </nav>
  );
}

export default Navbar;
