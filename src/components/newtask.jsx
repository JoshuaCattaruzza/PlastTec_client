import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
// import FormControl from 'react-bootstrap/FormControl';
// import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


const NewTask = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [machine, setMachine] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [plannedDate, setPlannedDate] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [created, setCreated] = useState(false);
    const [dropdown, setDropdown] = useState([])
    const { user: currentUser } = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([])
      const createTask = (e) => {
        e.preventDefault();

        const Task = {
            name: name,
            description: description,
            estimated_time: estimatedTime,
            expiry_date: expiryDate,
            assigned_to_machine: [],
            assignee: null,
            assigner: currentUser.username,
            planned_date: plannedDate,
            active: true

        };

        fetch("http://localhost:4201/task/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Task)
        }).then(data => console.log(data))

    }
    const getMachine =() => {
        fetch("http://localhost:4201/machine/",
        {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).then(res=>res.json())
        .then(data => {setCategories(filterDropdown(data));});
    }
    
    useEffect(() => {
        getMachine()
    }, []);

    const filterDropdown = (item) =>{
        var returnArr = [];
        let categories = {
            type: "",
            data: []
        };

        var tmp = {
            name: "",
            description: ""
        };

        item.forEach(element=>{
            console.log(element)
            switch (element.type) {
                case "Lavorazione plastica":
                    categories.type = element.type;
                    tmp.name = element.name;
                    tmp.description = element.description;
                    break;
                case "Veicoli":
                    categories.type = element.type;
                    tmp.name = element.name;
                    tmp.description = element.description;
                    break;
                case "Apparecchiature elettroniche":
                    categories.type = element.type;
                    tmp.name = element.name;
                    tmp.description = element.description;
                    break;
                default:
                    break;
            }
            categories.data.push(tmp);
            tmp = {
                type: "",
                data: []
            };
            returnArr.push(categories);
            categories.type = "";
        })
        console.log(returnArr)
        return returnArr;
    }
     
    // console.log(categories);
    const handleSelect = (e) => {
        setMachine(e);
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
                    <Form.Label>Tempo previsto</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci tempo..." style={{textAlign:"center"}} value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Data di termine prevista</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci data..." style={{textAlign:"center"}} value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Manutenzione pianficata per il</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci data..." style={{textAlign:"center"}} value={plannedDate} onChange={(e) => setPlannedDate(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="machine">
                    <Form.Label>Seleziona macchinario:</Form.Label>
                    <DropdownButton variant="dark" title={machine} value={machine} onSelect={handleSelect} >
                        {dropdown.map((item)=>{
                            return(<Dropdown.Item>{item.name}</Dropdown.Item>)
                        })}
                    </DropdownButton>
                </Form.Group>
                <Button as={Link} to="/home" variant="dark" type="submit" onClick={(e) => { createTask(e); setCreated(true) }} >
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