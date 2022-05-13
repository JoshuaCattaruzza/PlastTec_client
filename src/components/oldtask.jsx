import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
const OldTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4201/api/task/closed")
            .then((res) => {
                return res.json();
            }).then((data) => {
                setTasks(data);
            })
    }, []);

    const deleteTask = (id) => {
        fetch("http://localhost:4201/api/task/" + id, {
            method: "DELETE"
        }).then(() => {
            const updatedTasks = tasks.filter(task => task._id !== id);
            setTasks(updatedTasks);
        })
    }
    return (
        <Container>
            <Row >
                {
                    tasks && tasks.map(task => {
                        return (
                            <Col>
                                <Card className={"m-2"} style={{ width: "18rem" }} key={task._id} >
                                    <Card.Header>{task.name}</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            Fine: {task.expiry_date}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Descrizione: {task.description}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Svolta da: {task.assignee}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Assegnata da: {task.assigner}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <Button variant="dark" type="submit" onClick={() => deleteTask(task._id)}>
                                        Elimina task
                                    </Button>
                                </Card>
                            </Col>
                        )
                    })
                }

            </Row>
        </Container>
    )
}
export default OldTasks; 