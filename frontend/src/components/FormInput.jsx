import { useState } from 'react';
import './FormInput.css';

const FormInput = props => {
	const [focused, setFocused] = useState(false);
	const { label, errorMessage, onChange, id, ...inputProps } = props;
	const [showPassword, setShowPassword] = useState(false);

	const handleFocus = e => {
		setFocused(true);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(prevState => !prevState);
	};

	return (
		<div className="formInput">
			<label>{label}</label>
			<input
				{...inputProps}
				type={inputProps.name === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
				onChange={onChange}
				onBlur={handleFocus}
				onFocus={() =>
					inputProps.name === 'password' && setFocused(true)
				}
				focused={focused.toString()}
			/>
			<span>{errorMessage}</span>
		</div>
	);
};

export default FormInput;

// -------------------------------------------------------


// import { useState } from 'react';
// import './FormInput.css';

// const FormInput = props => {
// 	const [focused, setFocused] = useState(false);
// 	const { label, errorMessage, onChange, id, ...inputProps } = props;
// 	const [showPassword, setShowPassword] = useState(false);

// 	const handleFocus = e => {
// 		setFocused(true);
// 	};

// 	const togglePasswordVisibility = () => {
// 		setShowPassword(prevState => !prevState);
// 	};

// 	const isInvalid = inputProps.required && inputProps.value.trim() === '';

// 	return (
// 		<div className={`formInput ${focused ? 'focused' : ''}`}>
// 			<label>{label}</label>
// 			{inputProps.name === 'password' ? (
// 				<div className="passwordField">
// 					<input
// 						{...inputProps}
// 						type={showPassword ? 'text' : 'password'}
// 						onChange={onChange}
// 						onBlur={handleFocus}
// 						onFocus={() => setFocused(true)}
// 						invalid={isInvalid} // Add invalid prop to the input element
// 					/>
// 					<button
// 						className="btnSH"
// 						type="button"
// 						onClick={togglePasswordVisibility}
// 					>
// 						<img
// 							src={showPassword ? 'eye.png' : 'ceye.png'}
// 							alt={
// 								showPassword ? 'Hide' : 'Show'
// 							}
// 						/>
// 					</button>
// 				</div>
// 			) : (
// 				<input
// 					{...inputProps}
// 					type="text"
// 					onChange={onChange}
// 					onBlur={handleFocus}
// 					onFocus={() => setFocused(true)}
// 					invalid={isInvalid} // Add invalid prop to the input element
// 				/>
// 			)}
// 			{isInvalid && <span className="error-message">{errorMessage}</span>}
// 		</div>
// 	);
// };

// export default FormInput;
