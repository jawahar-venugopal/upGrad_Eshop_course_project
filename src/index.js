import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import useAuth from "./hooks/useAuth";
import useServices from "./hooks/useServices";

const ConnectedApp = () => {
	const {AuthProvider} = useAuth();
	const {ServicesProvider} = useServices();
	return (
		<AuthProvider>
			<ServicesProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</ServicesProvider>
		</AuthProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ConnectedApp />
);
