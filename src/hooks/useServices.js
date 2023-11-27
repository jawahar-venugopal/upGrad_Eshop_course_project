import {createContext, useState} from "react";

const ServicesCtx = createContext();

const useServices = () => {

	const [message, setMessage] = useState(null);
	const [level, setLevel] = useState(null);

	const broadcastAlert = (messageBroadcast, messageLevel) => {
		setMessage(messageBroadcast);
		setLevel(messageLevel);
	};

	return {
		ServicesCtx,
		ServicesProvider: ({ children }) => (
			<ServicesCtx.Provider value={{ message, level, broadcastAlert }}>
				{children}
			</ServicesCtx.Provider>
		)
	};
};

export default useServices;