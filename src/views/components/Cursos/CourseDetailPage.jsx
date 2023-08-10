import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';

const CourseDetailPage = () => {
  //Obtengo el id del curso
  const {id} = useParams();
  //Creo un estado para almacenar el array de semanas
  const [semanas,setSemanas] = useState([]);

  //Uso un efecto parra llamar a mi api y obtener las llamadas
  useEffect(() => {
    axios.get(`/api/courses/${id}/getSemanas`)
    .then(response => {
      setSemanas(response.data);
    })
    .catch(error => {
      console.error('Error al obtener las semanas:', error);
    });
  },[id]);
  console.log(semanas);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar semanas={semanas} />
        </div>
        <div className="col-md-9">
          <ContentArea />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
