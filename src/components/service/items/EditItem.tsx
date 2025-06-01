import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateItems } from './UpdateItem';
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

interface ItemEditProps {
  show: boolean;
  selectedRow: Item | null;
  handleClose: () => void;
  handleUpdate: (updatedItem: Item) => void
  refreshTable: () => void; 
}

function EditItem({ show, selectedRow, handleClose, handleUpdate,refreshTable }: ItemEditProps) {
  const navigate=useNavigate();
  const [itemDetails, setItemDetails] = useState<Item>({
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
    if (selectedRow) {
      setItemDetails({ ...selectedRow })
    }
  }, [selectedRow])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setItemDetails({ ...itemDetails, [e.target.name]: e.target.value })
  }
  const handleSave = async () => {
    try {
      const updatedItem = await updateItems(itemDetails,navigate)
      await Swal.fire({
            title:"Success!",
            text:"Book details updated successfully",
            icon:"success",
            confirmButtonText:"OK"

        })
      handleUpdate(updatedItem)
      refreshTable()
      handleClose()
      
    } catch (err) {
      console.error("failed to update item", err)
    }

  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="ItemId"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="text"
              name="itemId"
              value={itemDetails.itemId}
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
              value={itemDetails.userId}
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
              value={itemDetails.itemName}
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
              value={itemDetails.description}
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
              value={itemDetails.color}
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
              value={itemDetails.locationFound}
              onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel
                      controlId="floatingSelect"
                      label="Item Status"
                      className="mb-3"
                    >
                      <Form.Select
                        name="itemStatus"
                        value={itemDetails.itemStatus}
                        onChange={handleOnChange}
                      >
                        <option value="" disabled>Select item status</option>
                        <option value="LOST">LOST</option>
                        <option value="FOUND">FOUND</option>
                        <option value="CLAIMED">CLAIMED</option>
                      </Form.Select>
                    </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="LostDate"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="lostDate"
              value={itemDetails.lostDate}
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

export default EditItem;