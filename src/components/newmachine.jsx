import React, { useState, } from 'react';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';

// import FormControl from 'react-bootstrap/FormControl';
// import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


const NewMachine = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [machine, setMachine] = useState("");
    const [created, setCreated] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    // const { data: tasks } = useSelector((state) => state.data);
    console.log(currentUser);

    
    const createMachine = (e) => {
        e.preventDefault();

        const Machine = {
            type: machine,
            name: name,
            description: description,
        };

        fetch("http://192.168.1.18:4201/api/machine/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Machine)
        }).then(data => console.log(data))

    }

    const handleSelect = (e) => {
        setMachine(e);
        console.log(machine);
    }
    return (
        <Card className='my-auto' style={{marginLeft: "auto", marginRight:"auto", width:"60%"}}>
        <Card.Header className="text-center">
            <h1>Crea macchinario</h1>
        </Card.Header>
        <Form className="text-center">
            <Form.Group  controlId="machine">
                <Form.Label>Categoria:</Form.Label>
                <DropdownButton variant="dark" title={machine} value={machine} onSelect={handleSelect} >
                    <Dropdown.Item eventKey="Lavorazione plastica">Lavorazione plastica</Dropdown.Item>
                    <Dropdown.Item eventKey="Veicoli">Veicoli</Dropdown.Item>
                    <Dropdown.Item eventKey="Apparecchiature elettroniche">Apparecchiature elettroniche</Dropdown.Item>
                </DropdownButton>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Inserisci nome..." style={{textAlign:"center"}} value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descrizione</Form.Label>
                <Form.Control type="text" placeholder="Inserisci descrizione..." style={{textAlign:"center"}} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Button as={Link} to="/home" variant="dark" type="submit" onClick={(e) => { createMachine(e); setCreated(true) }} >
                Crea macchinario
            </Button>
            {created ? (<Alert variant="success">
                Macchinario creata!
            </Alert>) : null}
        </Form>

        </Card>


        
    )
}
export default NewMachine;