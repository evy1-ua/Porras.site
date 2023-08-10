import React, {useState, useEffect} from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import './Sidebar.css';
import axios from 'axios';

const Sidebar = ({ semanas }) => {

  const [clasesPorSemana, setClasesPorSemana] = useState({}); // Usar un objeto para almacenar las clases por semana

  useEffect(() => {
    // Llamada a la API para obtener las clases por semana
    semanas.forEach((semana, index) => {
      axios.get(`/api/courses/${semana.id}/getClases`)
        .then(response => {
          setClasesPorSemana(prevState => ({
            ...prevState,
            [index]: response.data
          }));
        })
        .catch(error => {
          console.error(`Error al obtener las clases de la semana ${semana.nombre}:`, error);
        });
    });
  }, [semanas]);
  return (
    <div className='sidebar-container'>
      <Accordion>
      {semanas.map((semana, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header>{semana.nombre}</Accordion.Header>
          <Accordion.Body>
            <Accordion>
             {/* Cargar las clases de esta semana */}
             {clasesPorSemana[index] &&
                  clasesPorSemana[index].map((clase, claseIndex) => (
                    <Accordion.Item key={claseIndex} eventKey={`${index}-${claseIndex}`}>
                      <Accordion.Header>{clase.nombre}</Accordion.Header>
                      <Accordion.Body>{/* Contenido de la clase */}</Accordion.Body>
                    </Accordion.Item>
                  ))}
              
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      ))}
      {/* Item para añadir sesiones */}
      <Card>
        <Card.Header className='text-center'>
        <Button variant="primary">Añadir Sesión</Button>
        </Card.Header>
      </Card>
    </Accordion>
    </div>
  );
};

export default Sidebar;
