import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack'
import { Router, Route, Switch } from 'react-router-dom';
import NavBar from './common/navbar';
import NewTask from './components/newtask';
import NewMachine from './components/newmachine';
import Home from './components/home';
import OldTask from './components/oldtask';
import LogIn from './components/login';
import SignUp from './components/signup';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from './helpers/history';
import { clearMessage } from './actions/message';
import { getData } from "./actions/data";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from "./store";
function App() {

	const { isLoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getData());
		history.listen((location) => {
			dispatch(clearMessage());
		});
	}, [dispatch]);

	return (
		<Router history={history}>
			<PersistGate loading={null} persistor={persistor}>
			<NavBar></NavBar>
			<Container className="p-3" fluid="md" style={{ marginTop: "100px", width: '100%', justifyContent: "center" }}>
				<Stack gap={3}>
					{!isLoggedIn ? (
						<>
							<Switch>
								<Route exact path="/login">
									<LogIn />
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/signup">
									<SignUp />
								</Route>
							</Switch>
						</>
					) : (
						<>
							<Switch>
								<Route exact path="/home">
									<Home />
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/newtask">
									<NewTask />
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/newmachine">
									<NewMachine />
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/oldtask">
									<OldTask />
								</Route>
							</Switch>
						</>
					)}
				</Stack>
			</Container>
			</PersistGate>
		</Router>
	);
}

export default App;
