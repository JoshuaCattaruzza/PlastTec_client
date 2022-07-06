import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
        <Navbar bg="white" expand="true" style={{display: "flex", flexDirection: "row", justifyContent:"space-between",marginLeft:"30px", marginRight: "30px"}} >
            <Navbar.Text>LOGO</Navbar.Text>
            <Button style={{backgroundColor: "#0dcaf0"}} onClick={handleShow} >Menu</Button>
        </Navbar>
        <Offcanvas show={show} >      
            <Offcanvas.Header  onHide={handleClose} closeButton>
              <Offcanvas.Title>
                {/* <Logo /> */}
                Dashboard Ufficio Tecnico
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Row>
                <Button
                onClick={handleClose}
                  variant="dark"
                  as={Link}
                  to="/home"
                  style={{ marginTop: "20px" }}
                >
                  Manutenzioni Attive
                </Button>
                <Button
                      onClick={handleClose}
                  variant="dark"
                  as={Link}
                  to="/oldtask"
                  style={{ marginTop: "20px" }}
                >
                  Storico Manutenzioni
                </Button>
                <Button
                      onClick={handleClose}
                  variant="dark"
                  as={Link}
                  to="/newtask"
                  style={{ marginTop: "20px" }}
                >
                  Crea Manutenzione
                </Button>
                <Button
                      onClick={handleClose}
                  variant="dark"
                  as={Link}
                  to="/newmachine"
                  style={{ marginTop: "20px" }}
                >
                  Crea Macchinario
                </Button>
                {!isLoggedIn ? (
                  <Button
                  onClick={handleClose}
                    variant="dark"
                    as={Link}
                    to="/login"
                    style={{ marginTop: "20px" }}
                  >
                    Login
                  </Button>
                ) : (
                  <Button variant="outline-info" style={{ marginTop: "20px" }} onClick={handleLogout}>
                    Logout
                  </Button>
                )}
                {!isLoggedIn ? (
                  <Button
                    variant="dark"
                    as={Link}
                    to="/signup"
                    style={{ marginTop: "20px" }}
                  >
                    Registrati
                  </Button>
                ) : null}
              </Row>
            </Offcanvas.Body>
        </Offcanvas>
    </>
  );
};
export default Navigation;
