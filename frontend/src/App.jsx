import { useState } from 'react';
import './App.css';
import Popup from './components/Popup.jsx';
import FormInput from './components/FormInput.jsx';
import Captcha from './components/Captcha.jsx';
import ProfilePage from './components/ProfilePage.jsx';

const App = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const inputs = [
		{
			id: 1,
			name: 'email',
			type: 'email',
			placeholder: 'Email',
			errorMessage: 'Please enter a valid email',
			label: 'Username',
			required: true,
		},
		{
			id: 2,
			name: 'password',
			type: 'password',
			placeholder: 'password',
			errorMessage: 'Password should be 4-12 characters',
			label: 'Password',
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,12}$`,
			required: true,
			minLength: 4,
			maxLength: 12,
		},
	];

	const handleSubmit = e => {
		e.preventDefault();
	};
	console.log(values.email);
	console.log(values.password);

	const onChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<div className="app">
			<form onSubmit={handleSubmit}>
				<h1 className="title">Login Page</h1>
				{inputs.map(input => (
					<FormInput
						key={input.id}
						{...input}
						value={values[input.name]}
						onChange={onChange}
					/>
				))}
				<div>
					<Captcha data={values} />
				</div>
				<div>
				</div>
				<div>
					<Popup />
				</div>
			</form>
		</div>
	);
};

export default App;
