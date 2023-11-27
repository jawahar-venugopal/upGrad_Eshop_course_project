import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Login from "../login/Login";
import Error from "../error/Error";
import SignUp from "../signup/SignUp";
import Footer from "../footer/Footer";
import BroadcastAlert from "../broadcastAlert/BroadcastAlert";
import NavBar from "../navBar/NavBar";

const Home = () => {
	return (
		<Router>
			<NavBar />
			<Container maxWidth={false} sx={{ marginBottom: "30px", marginTop: "85px" }}>
				<Grid container spacing={2} sx={{ paddingTop: "24px" }}>
					<Routes>
						<Route
							path="/"
							element={
								<Navigate to="/login" />
							}
						/>
						<Route
							path="/login"
							element={
								<Login />
							}
						/>
						<Route
							path="/signup"
							element={
								<SignUp />
							}
						/>
						<Route
							path="*"
							element={
								<Error />
							}
						/>
					</Routes>
				</Grid>
			</Container>
			<Footer />
			<BroadcastAlert />
		</Router>
	);
};

export default Home;