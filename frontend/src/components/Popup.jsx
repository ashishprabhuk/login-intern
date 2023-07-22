import React, { useState } from 'react';
import './Popup.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormInput from './FormInput.jsx';
import axios from 'axios';

const Signup = props => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [showModal, setShowModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const inputs = [
		{
			id: 1,
			name: 'name',
			type: 'text',
			placeholder: 'Enter Name',
			label: 'Name',
			errorMessage: 'Enter Name',
			required: true,
			maxLength: 20,
		},
		{
			id: 2,
			name: 'email',
			type: 'email',
			placeholder: 'Enter Your Email',
			errorMessage: 'Enter valid Email',
			label: 'Email',
			required: true,
		},
		{
			id: 3,
			name: 'Password',
			type: 'Password',
			placeholder: 'Enter PassWord',
			errorMessage:
				'Password should be 4-12 characters , Should Contain 1-Number, 1-Uppercase, 1-Special Character',
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,12}$`,
			label: 'Create Password',
			required: true,
			maxLength: 12,
		},
		{
			id: 4,
			name: 'ConfirmPassword',
			type: 'PAssword',
			placeholder: 'Confirm PassWord',
			errorMessage: errorMessage,
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,12}$`,
			label: 'Confirm Password',
			required: true,
			maxLength: 12,
		},
	];

	const [values, setValues] = useState({
		name: '',
		email: '',
		Password: '',
		ConfirmPassword: '',
	});

	const onChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const sendRequest = async () => {
		try {
			const res = await axios.post('http://localhost:5000/api/users', {
				name: values.name,
				email: values.email,
				password: values.Password,
			});
			const data = res.data;
			console.log(data);
			// Do something with the response data
		} catch (error) {
			if (error.response && error.response.status === 409) {
				// User already exists
				const errorMessage = error.response.data.message;
				console.log(errorMessage);
			} else {
				// Other error occurred
				console.error(error);
			}
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		// Check if password and confirm password match
		if (
			values.Password !== values.ConfirmPassword ||
			values.Password === ''
		) {
			setErrorMessage('Password does not match');
			console.log('Password not matched');
			return;
		} else {
			setShowModal(true);
			console.log('Password matched');
		}

		// Clear error message
		setErrorMessage('');

		// Send HTTP request
		await sendRequest();
		console.log('Successfully Signed Up');
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			<Button onClick={handleOpen} id="signup">
				Sign Up
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="modal-container"
			>
				<form onSubmit={handleSubmit}>
					<Box className="box">
						<h1 id="modal-modal-title" variant="h6" component="h1">
							SIGN UP
						</h1>
						{inputs.map(input => (
							<FormInput
								key={input.id}
								{...input}
								value={values[input.name]}
								onChange={onChange}
								className="formsSU"
							/>
						))}
						{/* {errorMessage && (
						<p className="error-message">{errorMessage}</p>
					)} */}
						<div className="btns">
							<button onClick={handleSubmit} className="btnSU">
								Sign Up
							</button>
							{showModal && (
								<div className="modal">
									<div className="modal-content">
										<h3>
											Welcome {[values.name]} <br/>
											Successfully  Signed Up!
										</h3>
										<button onClick={closeModal}>
											Close
										</button>
									</div>
								</div>
							)}
							<button onClick={handleClose} className="btnCL">
								Cancel
							</button>
						</div>
					</Box>
				</form>
			</Modal>
		</div>
	);
};

const Forgot = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [showModal, setShowModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [focused, setFocused] = useState(false);

	const inputs = [
		{
			id: 1,
			name: 'email',
			type: 'email',
			placeholder: 'Enter Your Email',
			errorMessage: 'Enter valid Email',
			label: 'Username',
			required: true,
		},
		{
			id: 2,
			name: 'Password',
			type: 'password',
			placeholder: 'Enter Password',
			errorMessage:
				'Password should be 4-12 characters , Should Contain 1-Number, 1-Uppercase, 1-Special Character',
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,12}$`,
			label: 'New Password',
			required: true,
			maxLength: 12,
		},
		{
			id: 2,
			name: 'ConfirmPassword',
			type: 'password',
			placeholder: 'Confirm Password',
			errorMessage: errorMessage,
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,12}$`,
			label: 'Confirm Password',
			required: true,
			maxLength: 12,
		},
	];

	const [values, setValues] = useState({
		name: '',
		email: '',
		Password: '',
		ConfirmPassword: '',
	});
	const onChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (
			values.Password !== values.ConfirmPassword ||
			values.Password === ''
		) {
			setErrorMessage('Password do not match');
			console.log('password not matched');
			return;
		} else {
			setShowModal(true);
			console.log('password matched and changed');
		}
		// Clear error message
		setErrorMessage('');
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const handleFocus = e => {
		setFocused(true);
	};

	return (
		<div>
			<Button onClick={handleOpen} id="forgot">
				Forgot password
			</Button>
			<form>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					className="modal-container"
				>
					<Box className="fpBox">
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h1"
						>
							Change Password
						</Typography>
						{inputs.map(input => (
							<FormInput
								key={1}
								{...input}
								value={values[input.name]}
								onBlur={handleFocus}
								onFocus={() =>
									values.name === 'password' &&
									setFocused(true)
								}
								focused={focused.toString()}
								onChange={onChange}
								className="formsFP"
							/>
						))}
						<div className="btns">
							{/* <button className="btnSU">Save</button> */}
							<button
								className="btnSU"
								type="submit"
								onClick={handleSubmit}
							>
								Save
							</button>
							{showModal && (
								<div className="modal">
									<div className="modal-content">
										<h3>Password Changed</h3>
										<button onClick={closeModal}>
											Close
										</button>
									</div>
								</div>
							)}
							<button onClick={handleClose} className="btnCL">
								Cancel
							</button>
						</div>
					</Box>
				</Modal>
			</form>
		</div>
	);
};

const Popup = () => {
	return (
		<div className="popup">
			<Forgot className="forgot" />
			<Signup className="signup" />
			{/* <Success/> */}
		</div>
	);
};

export default Popup;
