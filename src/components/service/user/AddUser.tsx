// import React, { useEffect, useState } from 'react';
// import { FloatingLabel, Form } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { addUsers } from './AddUsers';



// interface User {
//   userId: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   role: 'ADMIN' | 'STAFF' | 'USER' | "";
// }
// interface AddUserProps {
//   show: boolean;
//   handleClose: () => void;
//   handleAdd: (user: User) => void;
//   refreshTable: () => void;   // Make sure this is here!
// }



// function AddUser({ show, handleClose, handleAdd, refreshTable }: AddUserProps) {

//   const [newUserDetails, setNewUserDetails] = useState<User>({
//     userId: "",
//     name: "",
//     email: "",
//     phoneNumber: "",
//     role: ""

//   })
//   useEffect(() => {
//     if (show) {
//       setNewUserDetails({
//         userId: "",
//         name: "",
//         email: "",
//         phoneNumber: "",
//         role: ""
//       });
//     }
//   }, [show]);


//   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewUserDetails((prev) => ({ ...prev, [name]: value }))
//   }
//   const handleOnSubmit = async () => {
//     try {
//       const addUserDetails = await addUsers(newUserDetails)
//       console.log('✅ Full item from backend:', addUserDetails);
//       handleAdd(addUserDetails)
//       refreshTable();
//       handleClose()
//       setTimeout(() => {
//         alert("Added Successfully");
//       }, 300);
//     } catch (err) {
//       console.error("failed to add user", err)
//     }

//   }
//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add User</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>

          
//           <FloatingLabel
//             controlId="floatingInput"
//             label="Name"
//             className="mb-3"
//           >
//             <Form.Control
//               type="text"
//               name="name"
//               value={newUserDetails.name}
//               onChange={handleOnChange} />
//           </FloatingLabel>
//           <FloatingLabel
//             controlId="floatingInput"
//             label="Email"
//             className="mb-3"
//           >
//             <Form.Control
//               type="text"
//               name="email"
//               value={newUserDetails.email}
//               onChange={handleOnChange} />
//           </FloatingLabel>
//           <FloatingLabel
//             controlId="floatingInput"
//             label="PhoneNumber"
//             className="mb-3"
//           >
//             <Form.Control
//               type="text"
//               name="phoneNumber"
//               value={newUserDetails.phoneNumber}
//               onChange={handleOnChange} />
//           </FloatingLabel>
//           <FloatingLabel
//             controlId="floatingInput"
//             label="Role"
//             className="mb-3"
//           >
//             <Form.Control
//               type="text"
//               name="role"
//               value={newUserDetails.role}
//               onChange={handleOnChange} />
//           </FloatingLabel>
          
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleOnSubmit}>
//           Add User
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default AddUser;
export {};
