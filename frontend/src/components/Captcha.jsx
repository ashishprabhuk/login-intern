import React, { useEffect, useRef, useState } from 'react';
import './Captcha.css';
// import axios from 'axios';
import Login from './login.jsx';

const Captcha = props => {
	const canvasRef = useRef(null);
	const [captcha, setCaptcha] = useState('');
	const [userInput, setUserInput] = useState('');

	useEffect(() => {
		generateCaptcha();
	}, []);

	const generateCaptcha = () => {
				const canvas = canvasRef.current;
				const context = canvas.getContext('2d');
				const characters =
					'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				const captchaLength = 6;
				const captcha = [];
		
				// Generate random captcha string
				for (let i = 0; i < captchaLength; i++) {
					const randomIndex = Math.floor(Math.random() * characters.length);
					captcha.push(characters[randomIndex]);
				}
		
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.font = '40px Arial';
		
				// Add noise effect
				for (let i = 0; i < captcha.length; i++) {
					const xOffset = i * 35 + Math.random() * 10;
					const yOffset = 50 + Math.random() * 10;
					const angle = Math.random() * 0.1;
					const scaleFactor = 1 + Math.random() * 0.1;
		
					context.save();
					context.translate(xOffset, yOffset);
					context.rotate(angle);
					context.scale(scaleFactor, scaleFactor);
					context.fillText(captcha[i], 0, 0);
					context.restore();
				}
		
				// Add curvy lines
				for (let i = 0; i < 5; i++) {
					context.beginPath();
					context.moveTo(
						Math.random() * canvas.width,
						Math.random() * canvas.height
					);
					context.bezierCurveTo(
						Math.random() * canvas.width,
						Math.random() * canvas.height,
						Math.random() * canvas.width,
						Math.random() * canvas.height,
						Math.random() * canvas.width,
						Math.random() * canvas.height
					);
					context.strokeStyle = '#252525'; // Set the stroke color to black
					context.stroke();
				}
		
				// Set the generated captcha string
				setCaptcha(captcha.join(''));
			};

	const handleRefresh = e => {
		e.preventDefault();
		generateCaptcha();
	};

	return (
		<div>
			<div className="captcha">
				<canvas id="canvas" ref={canvasRef} width={220} height={75} />
				<button id="btnRef" onClick={handleRefresh}>
					<img src="./refresh.png" alt="refresh icon" id="refIcon" />
				</button>
			</div>
			<Login
				userInput={userInput}
				setUserInput={setUserInput}
				captcha={captcha}
				email={props.data.email}
				password={props.data.password}
				name={props.name}
				generateCaptcha={generateCaptcha}
			/>
		</div>
	);
};

export default Captcha;
