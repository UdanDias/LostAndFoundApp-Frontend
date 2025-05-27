import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateUser } from './UpdateUser';

interface User {
  userId:string;
  name:string;
  email:string;
  phoneNumber:string;
  role:'ADMIN'|'STAFF'|'USER'|"";
}

interface UserEditProps {
  show: boolean;
  selectedRow: User | null;
  handleClose: () => void;
  handleUpdate: (updatedUser: User) => void
  refreshTable: () => void;
}

function EditUser({ show, selectedRow, handleClose, handleUpdate ,refreshTable}: UserEditProps) {
  const [userDetails, setUserDetails] = useState<User>({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    role: ""
    
  })
  useEffect(() => {
    if (selectedRow) {
      setUserDetails({ ...selectedRow })
    }
  }, [selectedRow])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }
  const handleSave = async () => {
    try {
      const updatedUser = await updateUser(userDetails)
      handleUpdate(updatedUser)
      refreshTable()
      handleClose()
      setTimeout(() => {
        alert("Updated Successfully");
      }, 300);
    } catch (err) {
      console.error("failed to update user", err)
    }

  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="UserId"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="text"
              name="userId"
              value={userDetails.userId}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="email"
              value={userDetails.email}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="PhoneNumber"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Role"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="role"
              value={userDetails.role}
              onChange={handleOnChange} />
          </FloatingLabel>
          

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUser;