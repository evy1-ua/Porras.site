import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Course_info.css';

function CourseInfo({ data }) {
  console.log(data);
  const renderStars = () => {
    const stars = [];
    const estrellas = data.nivel;

    for (let i = 0; i < estrellas; i++) {
      stars.push(<FaStar key={i} />);
    }
    return stars;
  };

  return (
    <Card className="card" style={{ width: '15rem', animation: 'fadeIn 0.5s' }}>
      <Card.Img
        variant="top"
        src='https://d1aeri3ty3izns.cloudfront.net/media/64/648395/600/preview.jpg'
        alt="Course Image"
        className="course-image"
      />
      <Card.Body className="card-body">
        <Card.Title className="card-title">{data.nombre}</Card.Title>
        <Card.Text className="card-text">{data.descripcion}</Card.Text>
        <Card.Text className="category">Categoría: {data.categoria} </Card.Text>
        <div className="stars">
          {renderStars()}
        </div>
        <Link to={`/dashboard/curso/${data.id}`} style={{ textDecoration: 'none' }}>
          <Button style={{backgroundColor:'#84754E', borderColor: '#84754F'}} block>
            Ver más
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CourseInfo;
