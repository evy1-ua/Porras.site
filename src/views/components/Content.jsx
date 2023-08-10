import React from 'react';

import './Content.css';
import LastUsersAdmin from './Inicio/Admin/LastUsers_Admin'
import LastCoursesAdmin from './Inicio/Admin/LastCourses_Admin'

function Content({ isAuthenticated, user }) {
  console.log(user);
  return (
    <div className='content'>
      {isAuthenticated ? (
        <div className='row  m-4 d-flex'>
            <div className='col-md-6'>
                <h2>Bienvenido, {user && user.rol}</h2>
            </div>
          
            <div className='col-md-6 d-flex align-items-center justify-content-end'>
                <span style={{fontSize:"36px",marginRight:"15px"}} class="material-icons font-color">
                mark_unread_chat_alt
                </span>
                <span style={{fontSize:"46px"}} class="material-icons">
                account_circle
                </span>
                <span style={{marginRight:"15px",marginLeft:"15px"}} className='mr-3 ml-3'>
                { <p className='text-normal m-0'>Administrador</p> }
                </span>
                
                <span style={{fontSize:"36px"}} class="material-icons font-color">
                   keyboard_arrow_down
                </span>
            </div>
          {
           <div>
             <LastUsersAdmin></LastUsersAdmin>
            <LastCoursesAdmin></LastCoursesAdmin>
            </div>
          }
        </div>
      ) : (
        <h1>No estás autenticado. Redirigiendo...</h1>
      )}
    </div>
  );
}

export default Content;
