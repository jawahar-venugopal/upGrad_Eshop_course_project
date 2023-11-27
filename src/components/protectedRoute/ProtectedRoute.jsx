import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import Login from "../login/Login";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
	const { AuthContext } = useAuth();
	const { loggedInUser, hasRole } = useContext(AuthContext);
	let page = <Login />;
	if (loggedInUser !== null) {
		if (hasRole(role)) {
			page = children;
		} else {
			page = <Navigate to={"/home"} />;
		}
	}
	return page;
};

export default ProtectedRoute;