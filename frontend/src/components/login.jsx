import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import Modal from './Modal';

const Login = props => {
	const [errorMessage, setErrorMessage] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorModalMessage, setErrorModalMessage] = useState('');
	const [validationFailed, setValidationFailed] = useState(false);

	const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email);
	const hasValidPassword =
		/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,12}$/.test(
			props.password
		);

	const sendRequest = async () => {
		try {
			const res = await axios.post(
				'http://localhost:5000/api/users/auth',
				{
					email: props.email,
					password: props.password,
				}
			);
			const data = res.data;
			console.log(data);
			if (data.success) {
				// Login was successful, process the response data
				setShowModal(true);
				setValidationFailed(false); // Reset validationFailed to false
			} else {
				// Login failed, show the error message
				setValidationFailed(true); // Set validationFailed to true
				setErrorModalMessage(data.message); // Display the error message from the server
				setErrorModalVisible(true);
			}
            setShowModal(true);
		} catch (error) {
			console.error(error);
			setValidationFailed(true); // Set validationFailed to true on network error
			setErrorModalMessage('Unauthorized! Check username and password.'); // Set a generic error message
			setErrorModalVisible(true);
		}
	};

	const closeModal = () => {
		setShowModal(false);
		props.setUserInput('');
	};

	const handleValidate = () => {
		if (isEmailValid && hasValidPassword) {
			// Both email and password are valid
			setValidationFailed(false);
			sendRequest();
		} else {
			setErrorMessage('Email or password is not valid');
			setValidationFailed(true);
			setErrorModalVisible(true);
		}
	};
	

	const closeErrorModal = () => {
		setErrorModalVisible(false);
		setErrorModalMessage('');
	};

	return (
		<div>
			<button type="submit" onClick={handleValidate} id="btnLog">
				Login
			</button>
			{showModal && (
				<Modal
					name={props.name}
					closeModal={closeModal}
				/>
			)}
			{/* Error Modal */}
			{errorModalVisible && validationFailed && (
				<div className="error-modal">
					<div className="error-content">
						<h3>Login Failed</h3>
						<p>{errorModalMessage}</p>
						<p id="try">Please Try Again.</p>
						<button onClick={closeErrorModal} id="okBtn">
							OK
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
