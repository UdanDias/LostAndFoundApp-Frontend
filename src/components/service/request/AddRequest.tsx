import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addRequests } from './AddRequests';



interface Request {
  requestId: string;
  itemId: string;
  userId: string;
  requestStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | "";
  isActiveRequest?: string;
  requestedDate?: string;
  requestedTime?: string;
  reward: string;
}
interface AddRequestProps {
  show: boolean;
  handleClose: () => void;
  handleAdd: (request: Request) => void;
  refreshTable: () => void;   // Make sure this is here!
}



function AddRequest({ show, handleClose, handleAdd, refreshTable }: AddRequestProps) {

  const [newRequestDetails, setNewRequestDetails] = useState<Omit<Request, 'isActiveRequest' | 'requestedDate' | 'requestedTime'|'requestStatus'>>({
    requestId: "",
    itemId: "",
    userId: "",
    

    reward: ""
  });
  useEffect(() => {
    if (show) {
      setNewRequestDetails({
        requestId: "",
        itemId: "",
        userId: "",
        



        reward: ""
      });
    }
  }, [show]);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRequestDetails((prev) => ({ ...prev, [name]: value }))
  }
  const handleOnSubmit = async () => {
    try {
      const addRequestDetails = await addRequests(newRequestDetails)
      console.log('✅ Full request from backend:', addRequestDetails);
      handleAdd(addRequestDetails)
      console.log("new RequestDetails", newRequestDetails)
      console.log("add RequestDetails", addRequestDetails)
      refreshTable();
      handleClose()
      setTimeout(() => {
        alert("Added Successfully");
      }, 300);
    } catch (err) {
      console.error("failed to add request", err)
    }

  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="ItemId"
            className="mb-3"
          >
            <Form.Control
              
              type="text"
              name="itemId"
              value={newRequestDetails.itemId}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="UserId"
            className="mb-3"
          >
            <Form.Control
              
              type="text"
              name="userId"
              value={newRequestDetails.userId}
              onChange={handleOnChange} />
          </FloatingLabel>
          {/* <FloatingLabel

            controlId="floatingInput"
            label="RequestStatus"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="text"
              name="requestStatus"
              value={newRequestDetails.requestStatus}
              onChange={handleOnChange} />
          </FloatingLabel> */}
          
          <FloatingLabel
            controlId="floatingInput"
            label="Reward"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="reward"
              value={newRequestDetails.reward}
              onChange={handleOnChange} />
          </FloatingLabel>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSubmit}>
          Add Request
        </Button>

      </Modal.Footer>
    </Modal>
  );
}

export default AddRequest;