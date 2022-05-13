import React, { useEffect, useState } from 'react'
import { useSelector, } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getData } from "../actions/data";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../style/activetask.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

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
    const [show, setShow] = useState(false);
    const [task, setTask] = useState({});
    const [closed, setClosed] = useState(false);

    
    const handleClose = () => {
        setShow(false);
        setClosed(false);
        dispatch(getData());
    };
    
    const handleShow = () => {
        setShow(true)
    };

    const closeTask = (e, id) => {

        e.preventDefault();
        setIsLoading(true);
        fetch("http://localhost:4201/api/task/close/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        }).then(() => { setIsLoading(false); setClosed(true); })

    }

    return (
        <>
            {isLoading ? (<Spinner animation="grow" />) : activeTasks && activeTasks.length !== 0 ? (
                <>
                    <Card className={'m-2'}>
                        <Card.Header>
                            Benvenuto <b>{currentUser.username}</b>, al momento ci sono le seguenti manutenzioni in corso
                        </Card.Header>
                    </Card>

                    <Container>
                        <Row >

                            {activeTasks.map((task) => {
                                return (
                                    <Col key={task._id} >
                                        <Card className={'m-2'} style={{ width: '18rem' }} >
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
            ) : (
            <>
                <Card className='m-2'>
                    <Card.Header>
                        Benvenuto <b>{currentUser.username}</b>, al momento non ci sono manutenzioni in corso
                    </Card.Header>
                </Card>
            </>)}
            <Modal show={show} onHide={handleClose}
                centered>
                <Modal.Header>
                    <Modal.Title style={{ marginLeft: "auto", marginRight: "auto" }}>Gestisci task</Modal.Title>
                </Modal.Header>
                <Form className="p-3">
                    <Form.Group className="mb-3" >
                        <Button variant="dark" style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }} type="submit" onClick={(e) => { closeTask(e, task._id) }} >
                            Chiudi task
                        </Button>
                        {closed ? (<Alert variant="danger" className='m-2'>
                            Task chiusa!
                        </Alert>) : null}
                    </Form.Group>
                </Form>
            </Modal>
        </>
    )
}
export default Home;