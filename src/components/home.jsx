import React, { useEffect, useState } from 'react'
import { useSelector, } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getData } from "../actions/data";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../style/activetask.css';
// import Badge from "react-bootstrap/Badge";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
// import FormControl from 'react-bootstrap/FormControl';
// import InputGroup from 'react-bootstrap/InputGroup';
//DA FILTRARE I GIOCATORI CHE SONO NELLA PARTITA E QUELLI CHE HANNO ABBANDONATO, ANCHE NELLA SEZIONE STATISTICHE 

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { data: tasks } = useSelector((state) => state.data);
    const [show, setShow] = useState(false);
    const [task, setTask] = useState({})
    // const [showLeave, setShowLeave] = useState(false);
    const [closed, setClosed] = useState(false);
    const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true)
    };
    // const handleCloseLeave = () => {
    //     setShowLeave(false);
    // }
    // const handleShowLeave = () => {
    //     setShowLeave(true)
    // };
    useEffect(() => {
        if (currentUser) {
            setIsLoading(false);
            // checkAdmin(tasks, user);
            dispatch(getData());

        } else {
            window.location.reload();
        }
    }, [currentUser, dispatch])
    const filterTasks = (tasks) => {
        var returnArr = [];
        tasks.forEach(task => {
            if (task.active === true)
                returnArr.push(task);
        });
        return returnArr;
    }

    const closeGame = (e, id) => {
        console.log(id)
        e.preventDefault();
        setIsLoading(true);
        fetch("http://localhost:4201/task/close/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        }).then(() => { setIsLoading(false); setClosed(true); })

    }

    // const leaveGame = (e, user_id, id) => {
    //     setIsLoading(true);
    //     var body = { _id: user_id, finishing_stack: finishingStack }
    //     e.preventDefault();
    //     fetch("http://localhost:4200/game/leave/" + id, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(body),

    //     }).then(() => { handleCloseLeave(); setIsLoading(false); })

    // }
    const activeTasks = filterTasks(tasks);
    console.log(activeTasks);
    return (
        <>
            {isLoading ? (<Spinner animation="grow" />) : activeTasks && activeTasks.length !== 0 ? (
                <>
                    <Card className={'m-2'}>
                        <Card.Header>
                            Benvenuto {currentUser.username}, al momento ci sono le seguenti manutenzioni in corso
                        </Card.Header>
                    </Card>

                    <Container>
                        <Row>

                            {activeTasks.map((task) => {
                                return (
                                    <Col>
                                        <Card className={'m-2'} key={task._id} style={{ width: '18rem' }} >
                                            <Card.Header>
                                                Nome: {task.name}
                                                <svg className="blinking m-2">
                                                    <circle cx="10" cy="10" r="10" fill="red" />
                                                </svg>
                                            </Card.Header>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>Descrizione: {task.description}</ListGroup.Item>
                                            </ListGroup>
                                            <Button variant="dark" type="submit" onClick={() => { handleShow(); setTask(task) }}>
                                                Approva
                                            </Button>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>
                </>
            ) : (<>
                <Card className={'m-2'}>
                    <Card.Header>
                        Benvenuto {currentUser.username}, al momento non ci sono manutenzioni in corso
                    </Card.Header>
                </Card>
            </>)}
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Gestisci task</Modal.Title>
                </Modal.Header>
                <Form className={"p-3"}>
                    <Form.Group className="mb-3" >
                        <Button variant="dark" type="submit" onClick={(e) => { closeGame(e, task._id) }} >
                            Chiudi task
                        </Button>
                        {closed ? (<Alert variant="danger">
                            Task chiusa!
                        </Alert>) : null}
                    </Form.Group>
                </Form>
            </Modal>
        </>
    )
}
export default Home;