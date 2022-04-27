import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
// import { ReactComponent as Logo } from '../assets/logo-mobile.svg';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth.js';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
	const { isLoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<>
			<Navbar collapseonselect="true" expand="true" bg="dark" variant="dark" fixed="top">
				<Container >
					<Navbar.Brand collapseonselect="true" as={Link} to="/home">
						{/* <Logo /> */}
						Dashboard manutenzioni
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav collapseonselect="true" className="me-auto">
							{!isLoggedIn ? (
								<Nav.Link as={Link} to="/login">
									Login
								</Nav.Link>
							) : (
								<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
							)}
							{!isLoggedIn ? (
							<Nav.Link as={Link} to="/signup">Registrati</Nav.Link>
							): null}
							<NavDropdown title="Gestione task" id="collapsible-nav-dropdown">
								<NavDropdown.Item as={Link} to="/newtask">
									Crea Task
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/oldtask">
									Storico Task
								</NavDropdown.Item>
								{/* <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
							</NavDropdown>
							<Nav.Link as={Link} to="/newmachine">Inserimento macchinario</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
export default NavBar;
