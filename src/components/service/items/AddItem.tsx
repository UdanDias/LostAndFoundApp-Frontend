import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addItems } from './AddItems';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



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
  const navigate = useNavigate();

  const [newItemDetails, setNewItemDetails] = useState<Omit<Item, 'itemStatus'>>({
    itemId: "",
    userId: "",
    itemName: "",
    description: "",
    color: "",
    locationFound: "",

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

        lostDate: ""
      });
    }
  }, [show]);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItemDetails((prev) => ({ ...prev, [name]: value }))
  }
  const handleOnSubmit = async () => {
    try {
      const addItemDetails = await addItems(newItemDetails, navigate)
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
        title: "Item Added Successfully"
      });

      console.log('✅ Full item from backend:', addItemDetails);
      handleAdd(addItemDetails)
      refreshTable();
      handleClose()

    } catch (err) {
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
        icon: "error",
        title: "Failed to Add Item"
      });
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
          {/* <FloatingLabel
            controlId="floatingInput"
            label="ItemStatus"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="itemStatus"
              value={newItemDetails.itemStatus}
              onChange={handleOnChange} />
          </FloatingLabel> */}
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