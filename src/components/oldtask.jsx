import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
const OldTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://api.joshuacattaruzza.com/api/task/closed")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);

  const deleteTask = (id) => {
    fetch("https://api.joshuacattaruzza.com/api/task/" + id, {
      method: "DELETE",
    }).then(() => {
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    });
  };
  return (
    <Container>
      <Row style={{display: "flex", flexWrap: "left"}}>

          {tasks &&
            tasks.map((task) => {
              return (
                <Col key={task._id}>
                <Card
                  className={"m-2"}
                  style={{ width: "25rem" }}
                >
                  <Card.Body>
                    <Card.Title>
                      Nome: {task.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Operatore: {task.assignee.name}
                    </Card.Subtitle>
                  </Card.Body>
                  {task.image_url !== undefined ? (<Card.Img  src={task.image_url}  alt="Card image"></Card.Img>) : null}

                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Macchinario: {task.assigned_to_machine.name}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Luogo: {task.location.name}</ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Tempo stimato: {task.estimated_time}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Scadenza: {task.expiry_date}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Descrizione: {task.description}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="dark"
                    type="submit"
                    onClick={() => deleteTask(task._id)}
                  >
                    Elimina task
                  </Button>
                </Card>
                </Col>
              );
            })}
    
      </Row>
    </Container>
  );
};
export default OldTasks;
