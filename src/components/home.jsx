import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getData } from "../actions/data";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "../style/activetask.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getData());
      setIsLoading(false);
    }
  }, [currentUser, dispatch]);

  const activeTasks = useSelector((state) => state.data.tasks);
  console.log(activeTasks);
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({});
  const [closed, setClosed] = useState(false);

  const handleClose = () => {
    setShow(false);
    setClosed(false);
    dispatch(getData());
  };

  const handleShow = () => {
    setShow(true);
  };

  const closeTask = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://api.joshuacattaruzza.com/api/task/done/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        active: false,
        pending: false,
        done: true,
      }),
    }).then(() => {
      setIsLoading(false);
      setClosed(true);
    });
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="grow" />
      ) : activeTasks && activeTasks.length !== 0 ? (
        <>
          <Container style={{width: "100%"}}>
            <Card>
              <Card.Header>
                Benvenuto <b>{currentUser.username}</b>, al momento ci sono le
                seguenti manutenzioni in corso
              </Card.Header>
            </Card>
            <Row style={{display: "flex", flexWrap: "left"}}>
              {activeTasks.map((task) => {
                return (
                  <Col key={task._id}>
                    <Card className={"m-2"} style={{ width: "23rem" }}>
                      <Card.Body>
                        <Card.Title>
                          Nome: {task.name}
                          {task.status.active ? (
                            <svg className="blinking m-2">
                              <circle cx="10" cy="10" r="10" fill="green" />
                            </svg>
                          ) : null}
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
                        <ListGroup.Item>
                          Luogo: {task.location.name}
                        </ListGroup.Item>
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
                      {task.status.pending && !task.status.active ? (
                        <>
                        <ListGroup variant="flush">
                        <ListGroup.Item>
                          Tempo impiegato: {task.timer}
                        </ListGroup.Item>
                      </ListGroup>
                        <Button
                          variant="dark"
                          type="submit"
                          onClick={() => {
                            handleShow();
                            setTask(task);
                          }}
                        >
                          Approva
                        </Button>
                        </>
                      ) : task.status.active ? (
                        <Button variant="dark" type="submit" disabled>
                          Manutenzione in corso
                        </Button>
                      ) : (
                        <Button variant="dark" type="submit" disabled>
                          Da prendere in carico
                        </Button>
                      )}
                    </Card>
                  </Col>
                );
              })}
              {/* <Col>
            <Card className={"m-2"} style={{ width: "18rem", height:"350px" }}>
            <iframe
              allow="microphone;"
              height="350px"
              src="https://console.dialogflow.com/api-client/demo/embedded/376111a1-e687-4ac1-b535-7dec36bc34b4"
            ></iframe>
            </Card>
            </Col> */}
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Card className="m-2">
            <Card.Header>
              Benvenuto <b>{currentUser.username}</b>, al momento non ci sono
              manutenzioni in corso
            </Card.Header>
          </Card>
        </>
      )}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title style={{ marginLeft: "auto", marginRight: "auto" }}>
            Gestisci task
          </Modal.Title>
        </Modal.Header>
        <Form className="p-3">
          <Form.Group className="mb-3">
            <Button
              variant="dark"
              style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}
              type="submit"
              onClick={(e) => {
                closeTask(e, task._id);
              }}
            >
              Chiudi task
            </Button>
            {closed ? (
              <Alert variant="success" className="m-2">
                Task chiusa!
              </Alert>
            ) : null}
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
};
export default Home;
