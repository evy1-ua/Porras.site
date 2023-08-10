import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import './LastUsers_Admin.css'
import UserInfo from './components/User_info'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios';
const { format } = require('date-fns');


function LastUsersAdmin(){

    const [isModalOpen, setIsModalOpen ] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [urlGenerated, setUrlGenerated] = useState(false);

    //Referencia al input para coiar al portapapeles
    const urlInputRef = useRef(null);

    //Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    };
    //Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
    }
    // Función que maneja el cambio de seleccion de rol
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    }

    const generateUrl = () => {
      const codigo = uuidv4();
      setInvitationCode(codigo);
      //Llamada POST a la API para guardar el código de invitación y sea válido
      axios.post('/api/crear_invitaciones', {
        codigo,
        fecha_creacion: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        estado: 'valido',
        usuario_id:null,
        rol:selectedRole
      })
      .then(response => {
        const urlRegistro = `http://localhost/register/${codigo}`;
        console.log('URL de registro:', urlRegistro);
        setUrlGenerated(true);
      })
      .catch(error => {
        console.error('Error al guardar el código de invitación:', error);
        // Maneja el error de la llamada POST aquí si es necesario
      });

    
    }

    //Función para copiar la URL al portapapeles
    const copyToClipboard = () => {
      urlInputRef.current.select();
      document.execCommand('copy');
    }

    return(
        <div className='last_users'>
            <h3>Ultimos usuarios añadidos</h3>
            <UserInfo></UserInfo>
            <UserInfo></UserInfo>
            <UserInfo></UserInfo>
           <div className='add_user' onClick={openModal}>
           <span class="material-icons content-icon ">
                add_box
            </span>
                <p >Añade un nuevo usuario</p>
           </div>
           {/* Modal de Bootstrap */}
           <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <BsFillPersonFill style={{ marginRight: '10px' }} />
            Modal Content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="roleSelect">
            <Form.Label>Seleccionar Rol</Form.Label>
            <Form.Control as="select" onChange={handleRoleChange}>
              <option value="">Seleccione un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Estudiante">Estudiante</option>
              <option value="Profesor">Profesor</option>
            </Form.Control>
          </Form.Group>
          {urlGenerated && (
          <div>
            <Form.Group>
              <Form.Label>URL generada</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  value={`http://localhost:3000/register/${invitationCode}`}
                  readOnly
                  ref={urlInputRef} // Referencia al input para copiar al portapapeles
                />
                <Button variant="outline-secondary" onClick={copyToClipboard}>
                  Copiar
                </Button>
              </div>
            </Form.Group>
          </div>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={generateUrl} disabled={!selectedRole}>
            Generar URL
          </Button>
        </Modal.Footer>
      </Modal>
      

        </div>
    )
}
export default LastUsersAdmin;