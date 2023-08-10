import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { BsPlus, BsFillPersonFill } from "react-icons/bs";
import axios from "axios";
import CourseInfo from "./components/Course_info";
import "./LastCourses_Admin.css";

function LasCoursesAdmin() {
  const [showModal, setShowModal] = useState(false);

  // State variables for the modal inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [sessions, setSessions] = useState(1);

  //Mostrar cursos
  const [courses,setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("/api/getLastCourses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de cursos:", error);
      });
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSaveCourse = () => {
    // Realizar la petición para guardar el curso usando axios.post
    axios
      .post("/api/create_course", {
        nombre: name,
        descripcion: description,
        foto: photoFile,
        duracion: duration,
        nivel: level,
        categoria: category,
        // Agregar otros campos del formulario aquí si es necesario
      })
      .then((response) => {
        // Si la petición es exitosa, muestra el mensaje de éxito y cierra el modal
        console.log("Curso guardado correctamente:", response.data);
        axios
        .post(`/api/courses/${response.data.id}/add_semana`, {
          curso_id: response.data.id,
          semanas: sessions,
        })
        .then((response) => {
          // Si la segunda petición es exitosa, muestra el mensaje de éxito
          console.log("Semana agregada al curso:", response.data);
          
        })
        .catch((error) => {
          // Si hay un error en la segunda petición, muestra el mensaje de error
          console.error("Error al agregar semana al curso:", error);
        });

        axios
        .post(`/api/courses/${response.data.id}/add_profesor`, {
          // Agregar los datos necesarios para agregar una semana al curso
          // Por ejemplo:
          nombreSemana: "Semana 1",
          fechaInicio: "2023-07-19",
          // Agregar más datos según sea necesario
        })
        .then((response) => {
          // Si la segunda petición es exitosa, muestra el mensaje de éxito
          console.log("Semana agregada al curso:", response.data);
        })
        .catch((error) => {
          // Si hay un error en la segunda petición, muestra el mensaje de error
          console.error("Error al agregar semana al curso:", error);
        });
        handleCloseModal();
      })
      .catch((error) => {
        // Si hay un error en la petición, muestra el mensaje de error
        console.error("Error al guardar el curso:", error);
      });
  };
  // Function to handle file input change
  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    setPhotoFile(selectedFile);
  };

  return (
    <div>
      <h3>Cursos recientes</h3>
      <div style={{ display: "flex", gap: 30 }}>
        {courses.map( course => (
          <CourseInfo
          data = {course}
          />
        ))}
        <Card
          className="custom-card-button"
          onClick={handleOpenModal}
          border="dashed"
        >
          <Card.Body className="d-flex align-items-center justify-content-center">
            <BsPlus className="plus-icon" />
            <div className="add-text">Añadir curso</div>
          </Card.Body>
        </Card>
        {/* Modal to add a new course */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <BsFillPersonFill style={{ marginRight: "10px" }} />
              Modal Content
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form enctype="multipart/form-data">
              <Form.Group controlId="nameInput">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="descriptionInput">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingrese la descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="photoInput">
                <Form.Label>Foto</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Form.Group>
              <Form.Group controlId="durationInput">
                <Form.Label>Duración</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la duración"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="levelInput">
                <Form.Label>Nivel</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nivel"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="categorySelect">
                <Form.Label>Seleccionar Categoría</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Seleccione una categoría</option>
                  {/* Add options for categories here */}
                  <option value="Categoria1">Categoria 1</option>
                  <option value="Categoria2">Categoria 2</option>
                  {/* Add more options as needed */}
                </Form.Control>
              </Form.Group>

              {/* Form for the number of sessions */}
              <Form.Group controlId="sessionsInput">
                <Form.Label>Número de Sesiones</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el número de sesiones"
                  value={sessions}
                  onChange={(e) => setSessions(e.target.value)}
                />
                <Form.Text className="text-muted">
                  ({sessions} sesión{sessions === 1 ? "" : "es"} por semana)
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="teacherSearch">
                <Form.Label>Buscar Profesor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escriba el nombre del profesor"
                  // Add the necessary state and onChange handler for the teacher search
                />
                {/* Add the logic to display the search results and handle teacher selection */}
              </Form.Group>
            </Form>

            {/* ... Rest of your code ... */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveCourse}
              disabled={!name || !description}
            >
              Guardar Curso
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default LasCoursesAdmin;
