import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateRequest } from './UpdateRequest';
import Swal from 'sweetalert2';

interface Request {
  requestId: string;
  itemId: string;
  userId: string;
  requestStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | "";
  isActiveRequest?: string;
  requestedDate?: string;
  requestedTime?: string;
  updatedDate: string;
  updatedTime: string;
  reward: string;
}

interface RequestEditProps {
  show: boolean;
  selectedRow: Request | null;
  handleClose: () => void;
  handleUpdate: (updatedRequest: Request) => void
  refreshTable: () => void;
}

function EditRequest({ show, selectedRow, handleClose, handleUpdate, refreshTable }: RequestEditProps) {
  const [requestDetails, setRequestDetails] = useState<Request>({
    requestId: "",
    itemId: "",
    userId: "",
    requestStatus: "",
    isActiveRequest: "",
    requestedDate: "",
    requestedTime: "",
    updatedDate: "",
    updatedTime: "",
    reward: ""
  })
  useEffect(() => {
    if (selectedRow) {
      setRequestDetails({ ...selectedRow })
    }
  }, [selectedRow])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Change detected: ${name} = ${value}`);
    setRequestDetails(prev => ({ ...prev, [name]: value }));
  }
  const handleSave = async () => {
    try {
      console.log('Saving request with data:', requestDetails);
      const updatedRequest = await updateRequest(requestDetails)
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
        title: " Request Updated Successfully"
      });
      handleUpdate(updatedRequest)
      refreshTable()
      handleClose()
      
    } catch (err) {
      console.error("failed to update request", err)
    }

  }
  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   console.log(`Change detected: ${name} = ${value}`);
  //   setRequestDetails((prev) => {
  //     const updated = { ...prev, [name]: value };
  //     console.log('Updated requestDetails:', updated);
  //     return updated;
  //   });
  // };

  // const handleSave = async () => {
  //   try {
  //     console.log('Saving request with data:', JSON.stringify(requestDetails, null, 2));
  //     const updatedRequest = await updateRequest(requestDetails);
  //     console.log('Backend response (full):', JSON.stringify(updatedRequest, null, 2));
  //     handleUpdate(updatedRequest);
  //     await refreshTable();
  //     handleClose();
  //     setTimeout(() => {
  //       alert("Updated Successfully");
  //     }, 300);
  //   } catch (err) {
  //     console.error("Failed to update request:", err);
  //     alert("Failed to update request. Please try again.");
  //   }
  // };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="RequestId"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="text"
              name="requestId"
              value={requestDetails.requestId}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="ItemId"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="text"
              name="itemId"
              value={requestDetails.itemId}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="UserId"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="text"
              name="userId"
              value={requestDetails.userId}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingSelect"
            label="Request Status"
            className="mb-3"
          >
            <Form.Select
              name="requestStatus"
              value={requestDetails.requestStatus}
              onChange={handleOnChange}
            >
              <option value="" disabled>Select request status</option>
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingSelect"
            label="Is Request Active "
            className="mb-3"
          >
            <Form.Select
              name="isActiveRequest"
              value={requestDetails.isActiveRequest}
              onChange={handleOnChange}
            >
              <option value="" disabled>Is request active</option>
              <option value="true">true</option>
              <option value="false">false</option>

            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="RequestedDate"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="string"
              name="requestedDate"
              value={requestDetails.requestedDate}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="RequestedTime"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="string"
              name="requestedTime"
              value={requestDetails.requestedTime}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
          
            controlId="floatingInput"
            label="Reward"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="reward"
              value={requestDetails.reward}
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

export default EditRequest;