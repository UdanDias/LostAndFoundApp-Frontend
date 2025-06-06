import Table from 'react-bootstrap/Table';
import { getItems } from './service/items/GetItems';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EditItem from './service/items/EditItem';
import { deleteItems } from './service/items/DeleteItem';
import AddItem from './service/items/AddItem';
import { useLocation } from 'react-router-dom';
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
        "Last Known Location",
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
    const handleUpdate = async (updatedItem: Item) => {
        // await Swal.fire({
        //     title:"Success!",
        //     text:"Book details updated successfully",
        //     icon:"success",
        //     confirmButtonText:"OK"

        // })
        const updatedItems = itemData.map((item) =>
            item.itemId === updatedItem.itemId ? updatedItem : item);
        setItemData(updatedItems)
    }

    const handleDelete = async (itemId: string) => {
        const result = await Swal.fire({
            title: 'Confirm Delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            allowOutsideClick: false,
        })
        if (result.isConfirmed) {
            try {
                await deleteItems(itemId)
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
                    title: "Item deleted successfully"
                });
                setItemData(itemData.filter(item => item.itemId !== itemId))

            } catch (error) {
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
                        title: "Item Failed to Delete"
                      });
                console.error("Delete item failed with", error)

            }
        }


    }
    const handleAdd = (newItem: Item) => (
        setItemData((prevData) => [...prevData, newItem])
    )
    const location = useLocation();
    const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home"
    const formattedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1, -1) + " Console"
    return (
        <>
            <div
                className="d-flex align-items-center p-3 position-relative" // Added position-relative
                style={{ width: '100%' }} // Ensure full width container
            >
                {/* Title absolutely centered */}
                <h1
                    style={{
                        position: 'absolute',           // Changed: absolute positioning for centering
                        left: '50%',                   // Changed: center horizontally
                        transform: 'translateX(-50%)', // Changed: shift back by 50% width
                        fontSize: "2.5rem",
                        fontWeight: "600",
                        color: "#2c3e50",
                        letterSpacing: "1px",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        textShadow: "1px 1px 2px rgba(60, 60, 120, 0.2)",
                        margin: 0,
                        whiteSpace: 'nowrap',          // Prevent line wrap
                        zIndex: 1                     // Layer behind button
                    }}
                >
                    <span
                        style={{
                            fontWeight: "700",
                            fontSize: "2.8rem",
                            fontStyle: "",
                            background: "linear-gradient(to right,rgb(64, 27, 165),rgb(96, 170, 209))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0px 4px 5px rgba(118, 212, 249, 0.4)",
                        }}
                    >
                        Item Console
                    </span>
                    {/* &nbsp;
                    <span
                        style={{
                            color: "#7e6df0", // Lightened version of #0f0c29
                            fontWeight: "700",
                            fontSize: "2.8rem",
                            textShadow: "1px 1px 3px rgba(126, 109, 240, 0.5)",
                        }}
                    >
                        Console
                    </span> */}
                </h1>

                {/* Button aligned right */}
                <Button
                    variant="outline-success"
                    style={{ marginLeft: 'auto', marginRight: "15px", zIndex: 2 }} // Changed: margin-left:auto pushes button right, zIndex above title
                    onClick={() => setShowAddItemForm(true)}
                >
                    Add Item
                </Button>
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