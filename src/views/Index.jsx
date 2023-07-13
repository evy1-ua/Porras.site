import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      <Link to="/login">
        <button>Iniciar sesión</button>
      </Link>
    </div>
  );
}

export default Index;
