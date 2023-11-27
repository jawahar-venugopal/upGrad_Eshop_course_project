import jwt_decode from "jwt-decode";

export const doUserSignUp = (requestJson) => {
	let rejectRef = null;
	let resolveRef = null;
	let promise = new Promise((resolve, reject) => {
		rejectRef = reject;
		resolveRef = resolve;
	});
	fetch('http://localhost:8080/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify(requestJson),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	}).then((response) => {
		response.json().then((json) => {
			if (response.ok) {
				resolveRef({
					message: json.message,
					response: response,
				});
			} else {
				let message = json.message;
				if (message === undefined || message === null) {
					message = "Server error occurred. Please try again..";
				}
				rejectRef({
					reason: message,
					response: response,
				});
			}
		}).catch((err) => {
			rejectRef({
				reason: "Error occurred. Please try again..",
				response: err,
			});
		});
	}).catch((err) => {
		rejectRef({
			reason: "Some error occurred. Please try again.",
			response: err,
		});
	});
	return promise;
};

export const doUserLogin = (email, password) => {
	let rejectRef = null;
	let resolveRef = null;
	let promise = new Promise((resolve, reject) => {
		rejectRef = reject;
		resolveRef = resolve;
	});
	fetch('http://localhost:8080/api/auth/signin', {
		method: 'POST',
		body: JSON.stringify({
			username: email,
			password: password,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	}).then((response) => {
		response.json().then((json) => {
			if (response.ok) {
				let token = response.headers.get("x-auth-token");
				let decoded = jwt_decode(token);
				resolveRef({
					username: json.email,
					accessToken: token,
					accessTokenTimeout: decoded.exp * 1000,
					roles: json.roles,
					userId: json.id,
					response: response,
				});
			} else {
				rejectRef({
					reason: "Server error occurred. Please try again.",
					response: response,
				});
			}
		}).catch((error) => {
			rejectRef({
				reason: "Invalid Credentials. Please try again..",
				response: error,
			});
		});
	}).catch((err) => {
		rejectRef({
			reason: "Error occurred. Please try again..",
			response: err,
		});
	});
	return promise;
};