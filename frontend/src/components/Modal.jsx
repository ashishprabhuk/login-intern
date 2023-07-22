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

// import React from 'react';

// const Modal = ({
// 	name,
// 	closeModal,
// 	employeeCode,
// 	employeeID,
// 	loginTime,
// 	systemIP,
// 	systemMAC,
// 	logoutTime,
// }) => {
// 	return (
// 		<div className="modal">
// 			<div className="modal-content">
// 				<h3>Successfully logged in! {name}</h3>
// 				<p>Employee Code: {employeeCode}</p>
// 				<p>Employee ID: {employeeID}</p>
// 				<p>Login Time: {loginTime}</p>
// 				<p>System IP: {systemIP}</p>
// 				<p>System MAC Address: {systemMAC}</p>
// 				<p>Logout Time: {logoutTime}</p>
// 				<button onClick={closeModal}>Close</button>
// 			</div>
// 		</div>
// 	);
// };

// export default Modal;

// import React, { useState } from 'react';
// import { Button, Modal } from 'react-bootstrap';

// const MyModalComponent = () => {
//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   return (
//     <div>
//       {/* Button to trigger the modal */}
//       <Button variant="primary" onClick={handleShowModal}>
//         Open Modal
//       </Button>

//       {/* Bootstrap Modal component */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal Title</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/* Modal content goes here */}
//           This is the content of the modal.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleCloseModal}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default MyModalComponent;
