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
	// const [employeeCode, setEmployeeCode] = useState('');
	// const [employeeID, setEmployeeID] = useState('');

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
				// setErrorModalMessage(data.message); // Display the error message from the server
				// setErrorModalVisible(true);
			}
            setShowModal(true);
		} catch (error) {
			// Handle the error (e.g., network error)
			console.error(error);
			setValidationFailed(true); // Set validationFailed to true on network error
			setErrorModalMessage('Unauthorized! Check username and password.'); // Set a generic error message
			setErrorModalVisible(true);
		}
	};

	// const handleSuccess = () => {
	// 	setShowModal(true);
	// 	console.log('Captcha matched!');
	// Invoke sendRequest function
	// };

	const closeModal = () => {
		setShowModal(false);
		props.setUserInput('');
		props.generateCaptcha();
	};

	const handleValidate = () => {
		if (
			props.userInput === props.captcha &&
			isEmailValid &&
			hasValidPassword
		) {
			// setShowModal(true);
			// handleSuccess();
			setValidationFailed(false);
            sendRequest();
			// setEmployeeCode(generateRandomEmployeeCode(5, 12));
			// setEmployeeID(generateRandomEmployeeID());
		} else {
			setErrorMessage('Password does not match');
			setErrorModalMessage('Invalid Captcha');
			setValidationFailed(true);
			setErrorModalVisible(true);
            props.generateCaptcha();
		}
	};

	const closeErrorModal = () => {
		setErrorModalVisible(false);
		setErrorModalMessage('');
	};

	// const generateRandomEmployeeCode = (min, max) => {
	// 	const length = Math.floor(Math.random() * (max - min + 1)) + min;
	// 	const characters =
	// 		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	// 	let result = '';
	// 	for (let i = 0; i < length; i++) {
	// 		const randomIndex = Math.floor(Math.random() * characters.length);
	// 		result += characters[randomIndex];
	// 	}
	// 	return result;
	// };

	// const generateRandomEmployeeID = () => {
	// 	return Math.floor(Math.random() * 1000000) + 1;
	// };

	return (
		<div>
			<div id="captchaField">
				<input
					type="text"
					value={props.userInput}
					onChange={e => props.setUserInput(e.target.value)}
					placeholder="Enter Captcha"
					maxLength={6}
					required={true}
				/>
				<span>{errorMessage}</span>
			</div>
			<button type="submit" onClick={handleValidate} id="btnLog">
				Login
			</button>
			{showModal && (
				<Modal
					name={props.name}
					closeModal={closeModal}
					// employeeCode={employeeCode}
					// employeeID={employeeID}
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
