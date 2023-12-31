import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';

import Index from './views/Index';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Register from './views/Register';
import CourseDetailPage from './views/components/Cursos/CourseDetailPage';
import './App.css';

function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/register/:codigo' element={<Register />} />
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/dashboard/curso/:id" element={<CourseDetailPage />}/>
        </Routes>
      </Router>
    </div>
  );
}
// function DashboardRoute() {
//   const [isAuthenticated, setIsAuthenticated] = useState(true);
//   // const [user, setUser] = useState(null);
//   useEffect(() => {
//     fetch('/dashboard')
//       .then(response => response.json())
//       .then(data => {
//         if(data.user) {
//           setIsAuthenticated(true);
//         }else{
//           setIsAuthenticated(false);
//         }        
//       })    
//       .catch(error => {
//         console.error('Error al obtener el usuario:', error);
//         setIsAuthenticated(false);
//         // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
//       });
//   }, []);
//   if(!isAuthenticated){
//     return <Navigate to="/" />;
//   }
//   return <Dashboard />
// }

export default App;
