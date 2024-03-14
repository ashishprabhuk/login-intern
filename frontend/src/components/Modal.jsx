import React from 'react';
import './Modal.css'

const Modal = ({ name, closeModal }) => {
	return (
		<div className="modal">
			<div className="modal-content">
				<h3>Welcome! Successfully Logged In {name}</h3>
				<button onClick={closeModal}>Close</button>
			</div>
		</div>
	);
};

export default Modal;