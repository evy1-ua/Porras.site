import React, {useEffect,useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Index from './views/Index';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import './App.css';

function App() {
  const [backenData, setBackendData] = useState([{}])
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  },[])
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardRoute />}/>
        </Routes>
      </Router>
    </div>
  );
}
function DashboardRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/dashboard')
      .then(response => response.json())
      .then(data => {
        if(data.user) {
          setIsAuthenticated(true);
        }else{
          setIsAuthenticated(false);
        }        
      })    
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
        setIsAuthenticated(false);
        // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
      });
  }, []);
  if(!isAuthenticated){
    return <Navigate to="/" />;
  }
  return <Dashboard />
}

export default App;
