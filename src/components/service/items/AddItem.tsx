import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addItems } from './AddItems';



interface Item {
  itemId: string;
  userId: string;
  itemName: string;
  description: string;
  color: string;
  locationFound: string;
  itemStatus: 'LOST' | 'FOUND' | 'CLAIMED' | "";
  lostDate: string;
}
interface AddItemProps {
  show: boolean;
  handleClose: () => void;
  handleAdd: (item: Item) => void;
  refreshTable: () => void;   // Make sure this is here!
}



function AddItem({ show, handleClose, handleAdd, refreshTable }: AddItemProps) {

  const [newItemDetails, setNewItemDetails] = useState<Item>({
    itemId: "",
    userId: "",
    itemName: "",
    description: "",
    color: "",
    locationFound: "",
    itemStatus: "",
    lostDate: ""
  })
 useEffect(() => {
  if (show) {
    setNewItemDetails({
      itemId: "",
      userId: "",
      itemName: "",
      description: "",
      color: "",
      locationFound: "",
      itemStatus: "",
      lostDate: ""
    });
  }
}, [show]);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value}=e.target;
    setNewItemDetails((prev)=>({...prev,[name]:value }))
  }
  const handleOnSubmit = async () => {
    try {
      const addItemDetails = await addItems(newItemDetails)
      console.log('✅ Full item from backend:', addItemDetails);
      handleAdd(addItemDetails)
      refreshTable();
      handleClose()
      setTimeout(() => {
        alert("Added Successfully");
      }, 300);
    } catch (err) {
      console.error("failed to add item", err)
    }

  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          
          <FloatingLabel
            controlId="floatingInput"
            label="UserId"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="userId"
              value={newItemDetails.userId}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="ItemName"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="itemName"
              value={newItemDetails.itemName}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="description"
              value={newItemDetails.description}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Color"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="color"
              value={newItemDetails.color}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="LocationFound"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="locationFound"
              value={newItemDetails.locationFound}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="ItemStatus"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="itemStatus"
              value={newItemDetails.itemStatus}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="LostDate"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="lostDate"
              value={newItemDetails.lostDate}
              onChange={handleOnChange} />
          </FloatingLabel>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSubmit}>
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddItem;