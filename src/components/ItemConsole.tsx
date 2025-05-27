import Table from 'react-bootstrap/Table';
import { getItems } from './service/items/GetItems';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EditItem from './service/items/EditItem';
import { deleteItems } from './service/items/DeleteItem';
import AddItem from './service/items/AddItem';


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
// Outside the component
export const loadData = async (
  setItemData: React.Dispatch<React.SetStateAction<Item[]>>
) => {
  const itemDetails = await getItems();
  console.log(itemDetails);
  setItemData(itemDetails);
};

export function ItemConsole() {

    const [itemData, setItemData] = useState<Item[]>([])
    const [selectedRow, setSelectedRow] = useState<Item | null>(null)
    const [showEditItemModal, setShowEditItemModal] = useState(false)
    const [showAddItemForm, setShowAddItemForm] = useState(false)

    useEffect(() => {

        loadData(setItemData)


    }, [])
    const refreshTableData = () => {
    loadData(setItemData);
  };

    const tHeads: string[] = [
        "Item ID",
        "User ID",
        "Item Name",
        "Description",
        "Color",
        "Location Found",
        "Item Status",
        "Lost Date",
        "Action"
    ];
    const handleEdit = (row: Item) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditItemModal(true)
    }
    const handleClose = () => setShowEditItemModal(false)
    const handleUpdate = (updatedItem: Item) => {
        const updatedItems = itemData.map((item) =>
            item.itemId === updatedItem.itemId ? updatedItem : item);
        setItemData(updatedItems)
    }

    const handleDelete = async (itemId: string) => {
        try {
            await deleteItems(itemId)
            setItemData(itemData.filter(item => item.itemId !== itemId))

        } catch (error) {
            console.error("Delete item failed with", error)

        }

    }
    const handleAdd = (newItem: Item) => (
        setItemData((prevData) => [...prevData, newItem])
    )
    return (
        <>
            <div className='d-flex justify-content-end p-3'>
                <Button variant="outline-success" onClick={() => setShowAddItemForm(true)} >Add Item</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tHeads.map((headings) => (
                            <th className="text-center">{headings}</th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {itemData.map((row) => (
                        <tr key={row.itemId}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index} className="text-center">{cell}</td>

                            ))}

                            <td className='d-flex gap-2'>
                                <Button variant="outline-secondary" onClick={() => handleEdit(row)}>Edit</Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(row.itemId)}>Delete</Button>

                            </td>


                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditItem
                show={showEditItemModal}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                refreshTable={refreshTableData}
            />
            <AddItem
                show={showAddItemForm}
                handleClose={() => setShowAddItemForm(false)}
                handleAdd={handleAdd}
                refreshTable={refreshTableData}
            />
            

        </>
    )
}