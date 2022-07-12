import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
// import FormControl from 'react-bootstrap/FormControl';
// import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


const NewTask = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [machine, setMachine] = useState("");
    const [machineId, setMachineId] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [plannedDate, setPlannedDate] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [location, setLocation] = useState("");
    const [created, setCreated] = useState(false);
    const [dropdown, setDropdown] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");
    const { user: currentUser } = useSelector((state) => state.auth);
      const createTask = (e) => {
        e.preventDefault();

        const Task = {
        name: name,
        description: description,
        estimated_time: estimatedTime,
        expiry_date: expiryDate,
        assigned_to_machine: {
            id_machine: machineId,
            name: machine
        },
        assignee: {
            user_id: userId,
            name: user
        },
        assigner: {
            user_id: currentUser.id,
            name: currentUser.username
        },
        image_url:"",
        planned_date: plannedDate,
        location: {
            name: location,
            long: 0,
            lat: 0
        },
        status:{
            active: false,
            pending: false,
            done: false
        }
    };

    console.log(Task);
        fetch("https://api.joshuacattaruzza.com/api/task/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Task)
        }).then(data => console.log(data));

    }
    const getUsers = () => {
        fetch("https://api.joshuacattaruzza.com/api/user/",
        {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((res)=>{
            return res.json();
        })
        .then((data) => 
        {
            setUsers(data);
        });
    }
    
    const getMachine = () => {
        fetch("https://api.joshuacattaruzza.com/api/machine/",
        {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((res)=>{
            return res.json();
        })
        .then((data) => 
        {
            setDropdown(data);
        });
    }
    const handleExpiryDate = (e) => {
        setExpiryDate(e)
    }
    const handlePlannedDate = (e) => {
        setPlannedDate(e)
    }
    
    useEffect(() => {
        getMachine();
        getUsers();
    }, []);

    const handleSelectMachine = (eventkey, event) => {
        setMachine(eventkey);  
        setMachineId(event.target.id);
    }
    const handleSelectUser = (eventkey, event) => {     
        setUser(eventkey);  
        setUserId(event.target.id);
    }

    return (
        <Card className='my-auto' style={{ marginLeft: "auto", marginRight: "auto", width: "60%" }}>
            <Card.Header className="text-center">
                <h1>
                    Crea una nuova task
                </h1>
            </Card.Header>
            <Form className="text-center" >
                <Form.Group className="mb-3" controlId="name" >
                    <Form.Label>Nome Manutenzione</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci nome" style={{textAlign:"center"}} value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci descrizione..." style={{textAlign:"center"}} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Luogo</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci descrizione..." style={{textAlign:"center"}} value={location} onChange={(e) => setLocation(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Tempo previsto</Form.Label>
                    <Form.Control type="time" placeholder="Inserisci tempo..." style={{textAlign:"center"}} value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Data di termine prevista</Form.Label>
                    <Form.Control type="date" placeholder="Inserisci data..." style={{textAlign:"center"}} value={expiryDate} onChange={(e) => handleExpiryDate(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Manutenzione pianficata per il</Form.Label>
                    <Form.Control type="date" placeholder="Inserisci data..." style={{textAlign:"center"}} value={plannedDate} onChange={(e) => handlePlannedDate(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="machine">
                    <Form.Label>Seleziona macchinario:</Form.Label>
                    <DropdownButton variant="dark" title={machine} value={machine} onSelect={handleSelectMachine} >
                        {dropdown.map((item)=>{
                            return(<Dropdown.Item key={item._id} id={item._id} eventKey={item.name} >{item.name}</Dropdown.Item>)
                        })}
                    </DropdownButton>
                </Form.Group>
                <Form.Group className="mb-3" controlId="machine">
                    <Form.Label>Assegna a:</Form.Label>
                    <DropdownButton variant="dark" title={user} value={user} onSelect={handleSelectUser} >
                        {users.map((item)=>{
                            return(<Dropdown.Item key={item._id} id={item._id} eventKey={item.username} >{item.username}</Dropdown.Item>)
                        })}
                    </DropdownButton>
                </Form.Group>
                <Button as={Link} to="/home" variant="dark" type="submit" onClick={(e) => { createTask(e); setCreated(true); }} >
                    Crea task
                </Button>
                {created ? (<Alert variant="success">
                    Task creata!
                </Alert>) : null}
            </Form>

        </Card>
    )
}
export default NewTask;