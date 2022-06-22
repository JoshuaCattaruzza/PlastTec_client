import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth.js";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  var options = {
    name: "Disable backdrop",
    scroll: true,
    backdrop: false,
  };
  return (
    <>
      <Offcanvas show={true} style={{width: "20%"}} {...options}>
        <Container>
          <Offcanvas.Header>
            <Offcanvas.Title >
              {/* <Logo /> */}
                Dashboard Ufficio Tecnico
            </Offcanvas.Title>
          </Offcanvas.Header>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          {/* {!isLoggedIn ? (
								<Navbar.Brand collapseonselect="true">
									Logged in as: {currentUser.username}
								</Navbar.Brand>
							) : null} */}
          <Offcanvas.Body>
			<Row >
            {!isLoggedIn ? (
              <Button  variant="dark" as={Link} to="/login" style={{marginTop: "20px"}}>
                Login
              </Button>
            ) : (
              <Button  variant="dark" onClick={handleLogout}>Logout</Button>
            )}
            {!isLoggedIn ? (
              <Button  variant="dark" as={Link} to="/signup" style={{marginTop: "20px"}}>
                Registrati
              </Button>
            ) : null}
			<Button  variant="dark" as={Link} to="/home" style={{marginTop: "20px"}}>
			Manutenzioni attive
			</Button>       <Button  variant="dark" as={Link} to="/oldtask" style={{marginTop: "20px"}}>
              Storico Manutenzioni
            </Button>	
			
			
			<Button  variant="dark" as={Link} to="/newtask" style={{marginTop: "20px"}}>
              Crea Manutenzione
			</Button>
     
            <Button  variant="dark" as={Link} to="/newmachine" style={{marginTop: "20px"}}>
              Crea macchinario
            </Button>

			</Row>
          </Offcanvas.Body>
		  
        </Container>
      </Offcanvas>
    </>
  );
};
export default NavBar;
