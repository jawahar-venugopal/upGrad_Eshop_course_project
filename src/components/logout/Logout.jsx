import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";

const Logout = ({ sx, resetMetadata }) => {

	const { AuthContext } = useAuth();
	const { logout } = useContext(AuthContext);

	if (sx === null || sx === undefined) {
		sx = {};
	}
	const navigate = useNavigate();

	let performLogout = () => {
		logout().then(() => {
			navigate("/login");
		});
	}

	return (
		<Button sx={sx}
			variant="contained"
			color="secondary"
			onClick={() => performLogout()}>
			LOGOUT
		</Button>
	);
};

export default Logout;