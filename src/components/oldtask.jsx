import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import Button from "react-bootstrap/Button";
const OldTasks = () =>{
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:4201/task")
        .then((res) =>{
            return res.json();
        }).then((data) =>{
            var oldTasks = [];
            data.forEach(task => {
               if(task.active === false){
                oldTasks.push(task)
               }
            });
            setTasks(oldTasks);
        })
    }, [])
    // const deleteGame = (id)=>{
    //     fetch("http://localhost:4200/game/" + id, {
    //         method: "DELETE"
    //     }).then(()=>{
    //         const updatedGames = games.filter(game=> game._id !== id);
    //         setGames(updatedGames);
    //     })
    // }
    return (
        <>
        {
        tasks && tasks.map(task => {
            return(
        <Card className={"m-2"} key={task._id} >
        <Card.Header>{task.name}</Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item>
            Inzio: {task.description}
            </ListGroup.Item>
        </ListGroup>
        {/* <Button variant="dark" type="submit" onClick={()=>deleteGame(task._id)}>
            Elimina partita
        </Button> */}
        </Card>
        )})
        }
        
        </>
        
    )
}
export default OldTasks; 