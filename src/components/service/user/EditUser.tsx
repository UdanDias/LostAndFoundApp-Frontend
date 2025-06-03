import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateUser } from './UpdateUser';
import Swal from 'sweetalert2';

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth:string,
    gender:string,
    accountCreatedDate:string,
    phoneNumber: string;
    password: string;
    role: 'ADMIN' | 'STAFF' | 'USER' | "";
}

interface UserEditProps {
  show: boolean;
  selectedRow: User | null;
  handleClose: () => void;
  handleUpdate: (updatedUser: User) => void
  refreshTable: () => void;
}

function EditUser({ show, selectedRow, handleClose, handleUpdate, refreshTable }: UserEditProps) {
  const [userDetails, setUserDetails] = useState<Omit<User,'password'|'accountCreatedDate'>>({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth:"",
    gender:"",
    
    phoneNumber: "",
    
    role: ""

  })
  useEffect(() => {
    if (selectedRow) {
      setUserDetails({ ...selectedRow })
    }
  }, [selectedRow])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }
  const handleSave = async () => {
    try {
      const updatedUser = await updateUser(userDetails)
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: "success",
        title: "User Updated Successfully"
      });
      handleUpdate(updatedUser)
      refreshTable()
      handleClose()
      
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
            label="First Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Date Of Birth"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={userDetails.dateOfBirth}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingSelect"
            label="Gender"
            className="mb-3"
          >
            <Form.Select
              name="gender"
              value={userDetails.gender}
              onChange={handleOnChange}
            >
              <option value="" disabled>Select a gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="PhoneNumber"
            className="mb-3"
          >
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleOnChange} />
          </FloatingLabel>
          {/* <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleOnChange} />
          </FloatingLabel> */}
          <FloatingLabel
            controlId="floatingSelect"
            label="Role"
            className="mb-3"
          >
            <Form.Select
              name="role"
              value={userDetails.role}
              onChange={handleOnChange}
            >
              <option value="" disabled>Select a role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
              <option value="USER">USER</option>
            </Form.Select>
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