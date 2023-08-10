import React , {useState, useEffect} from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function Register() {
    const [isValidInvitation, setIsValidInvitation] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellidos: '',
        fecha_nacimiento: '',
        contraseña: '',
        correo_electronico: '',
        telefono: '',
        direccion: '',
        rol: '',
    });

    //Obtenemos el código de invitación desde el URL
    const { codigo } = useParams();

    useEffect(() => {
        // Realizar la petición al servidor para verificar el código de invitación
        axios.get(`/api/register/${codigo}`)
        .then(response => {
            setIsValidInvitation(response.data.isValid);
            setLoading(true);
            console.log(response.data.rol)
            setFormData(prevData => ({ ...prevData, rol: response.data.rol}));
          })
          .catch(error => {

            console.error(error);
            setLoading(false);
          });
    }, [codigo]);
    useEffect(() => {
        if (codigo && formData.id) {
          axios.put(`/api/usar_invitacion/${codigo}`, { codigo : codigo, estado: 'invalido', usuario_id: formData.id })
            .then(response => {
              console.log('Invitación usada correctamente');
            })
            .catch(error => {
              console.error('Error al usar la invitación:', error);
            });
        }
      }, [codigo, formData.id]);

    

    if(!isValidInvitation){
        return <p>El código de invitación no es válido</p>
    }
    if(!loading) {
      return <p>Cargando...</p>
  }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value}));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            axios.post('/api/crear_usuario', formData)
            .then(response => {
                console.log('Usuario creado:',response.data);
                //Actualizamos la invitacion
                const {id} = response.data;
                setFormData(prevData => ({ ...prevData, id }));
            })
        }
       
    return(

      <Card style={{maxWidth:'400px',margin: 0 , padding: '20px'}} className='registration-card'>
        <Card.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>
                Rol
            </Form.Label>
            <Form.Control
            type='text'
            name='rol'
            value={formData.rol}
            onChange={handleChange}
            readOnly
            >
            </Form.Control>
        </Form.Group>    
            
      <Form.Group controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="apellidos">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="fecha_nacimiento">
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="contraseña">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="correo_electronico">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          name="correo_electronico"
          value={formData.correo_electronico}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="telefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="direccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
        </Card.Body>
      </Card>
    )
};

export default Register;