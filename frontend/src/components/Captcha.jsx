import React, { useEffect, useRef, useState } from 'react';
import './Captcha.css';
// import axios from 'axios';
import Login from './login.jsx';

const Captcha = props => {
	const [userInput, setUserInput] = useState('');

	return (
		<div>
			<Login
				userInput={userInput}
				setUserInput={setUserInput}
				email={props.data.email}
				password={props.data.password}
				name={props.name}
			/>
		</div>
	);
};

export default Captcha;

