import Table from 'react-bootstrap/Table';
import { getItems } from './service/items/GetItems';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EditItem from './service/items/EditItem';
import EditRequest from './service/request/EditRequest';
import { getRequest } from './service/request/GetRequests';
import { deleteRequests } from './service/request/DeleteRequest';
import AddRequest from './service/request/AddRequest';
import { useLocation } from 'react-router-dom';

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
export const loadData = async (
    setRequestData: React.Dispatch<React.SetStateAction<Request[]>>
) => {
    const requestDetails = await getRequest();
    console.log(requestDetails);
    setRequestData(requestDetails);
};
export function RequestConsole() {

    const [requestData, setRequestData] = useState<Request[]>([])
    const [selectedRow, setSelectedRow] = useState<Request | null>(null)
    const [showEditRequestModal, setShowEditRequestModal] = useState(false)
    const [showAddRequestForm, setShowAddRequestForm] = useState(false)
    useEffect(() => {

        loadData(setRequestData)


    }, [])
    const refreshTableData = () => {
        loadData(setRequestData);
    };

    // const tHeads: string[] = [
    //     "Request Id",
    //     "itemId",
    //     "userId",
    //     "requestStatus",
    //     "isActiveRequest",
    //     "requestedDate",
    //     "requestedTime",
    //     "reward"
    // ];
    const tHeads: { label: string; key: keyof Request }[] = [
        { label: "Request Id", key: "requestId" },
        { label: "Item Id", key: "itemId" },
        { label: "User Id", key: "userId" },
        { label: "Request Status", key: "requestStatus" },
        { label: "Is Active Request", key: "isActiveRequest" },
        { label: "Requested Date", key: "requestedDate" },
        { label: "Requested Time", key: "requestedTime" },
        { label: "Reward", key: "reward" },
    ];

    const handleEdit = (row: Request) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditRequestModal(true)
    }
    const handleClose = () => setShowEditRequestModal(false)
    const handleUpdate = (updatedRequest: Request) => {
        const updatedRequests = requestData.map((request) =>
            request.requestId === updatedRequest.requestId ? updatedRequest : request);
        setRequestData(updatedRequests)
    }

    const handleDelete = async (requestId: string) => {
        try {
            await deleteRequests(requestId)
            setRequestData(requestData.filter(request => request.requestId !== requestId))

        } catch (error) {
            console.error("Delete request failed with", error)

        }

    }
    const handleAdd = (newRequest: Request) => (
        setRequestData((prevData) => [...prevData, newRequest])
    )
    const location = useLocation();
    const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home"
    const formattedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1, -1) + " Console"
    return (
        <>
            <div
                className="d-flex align-items-center p-3 position-relative" // Added position-relative here
                style={{ width: '100%' }} // Ensure full width container
            >
                {/* Title absolutely centered */}
                <h1
                    style={{
                        position: 'absolute',            // Changed: absolute positioning for centering
                        left: '50%',                    // Changed: center horizontally
                        transform: 'translateX(-50%)', // Changed: shift back by 50% width
                        fontSize: "2.5rem",
                        fontWeight: "600",
                        color: "#2c3e50",
                        letterSpacing: "1px",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        textShadow: "1px 1px 2px rgba(60, 60, 120, 0.2)",
                        margin: 0,
                        whiteSpace: 'nowrap',           // Prevent line wrap for title
                        zIndex: 1                      // Ensure title is below button in layering
                    }}
                >
                    <span
                        style={{
                            color: "#7c60d1", // Lightened version of #2b1055
                            fontWeight: "700",
                            fontSize: "2.8rem",
                            textShadow: "1px 1px 3px rgba(124, 96, 209, 0.5)",
                        }}
                    >
                        Request
                    </span>
                    &nbsp;
                    <span
                        style={{
                            color: "#7e6df0", // Lightened version of #0f0c29
                            fontWeight: "700",
                            fontSize: "2.8rem",
                            textShadow: "1px 1px 3px rgba(126, 109, 240, 0.5)",
                        }}
                    >
                        Console
                    </span>
                </h1>

                {/* Button aligned right */}
                <Button
                    variant="outline-success"
                    style={{ marginLeft: 'auto', marginRight: "3px", zIndex: 2 }} // Changed: margin-left:auto to push right & zIndex for layering
                    onClick={() => setShowAddRequestForm(true)}
                >
                    Add Request
                </Button>
            </div>

            <Table striped bordered hover>
                {/* <thead>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {requestData.map((row) => (
                        <tr key={row.requestId}>
                            {tHeads.map((head, index) => (
                                <td key={index}>
                                    {head === 'requestedDate'
                                        ? String(row[head as keyof Request]) // will already be 'YYYY-MM-DD'
                                        : head === 'requestedTime'
                                            ? String(row[head as keyof Request])?.slice(0, 8) // 'HH:mm:ss'
                                            : String(row[head as keyof Request] ?? '')
                                    }
                                </td>
                            ))}


                            <td className='d-flex gap-2'>
                                <Button variant="outline-secondary" onClick={() => handleEdit(row)}>Edit</Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(row.requestId)}>Delete</Button>

                            </td>


                        </tr>
                    ))}
                </tbody> */}
                <thead>
                    <tr>
                        {tHeads.map(({ label }) => (
                            <th key={label} className="text-center">{label}</th>
                        ))}
                        <th className="text-center">Action</th>
                    </tr>
                    
                </thead>

                <tbody>
                    {requestData.map((row) => (
                        <tr key={row.requestId}>
                            {tHeads.map(({ key }) => (
                                <td key={key} className="text-center">
                                    {key === 'requestedDate'
                                        ? String(row[key]) // already "YYYY-MM-DD"
                                        : key === 'requestedTime'
                                            ? String(row[key])?.slice(0, 8) // "HH:mm:ss"
                                            : String(row[key] ?? '')
                                    }
                                </td>
                            ))}
                            <td className='d-flex gap-2'>
                                <Button variant="outline-secondary" onClick={() => handleEdit(row)}>Edit</Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(row.requestId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            <EditRequest
                show={showEditRequestModal}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                refreshTable={refreshTableData}
            />
            <AddRequest
                show={showAddRequestForm}
                handleClose={() => setShowAddRequestForm(false)}
                handleAdd={handleAdd}
                refreshTable={refreshTableData}
            />

        </>
    )
}