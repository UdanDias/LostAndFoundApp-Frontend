import { useEffect, useState } from "react";
import { getUserbyId } from "./service/user/GetUserById";
import { getRequestsByUserId } from "./service/request/GetRequestByUser";
import { Table } from "react-bootstrap";
import { Card, Row, Col, Button } from "react-bootstrap";
import EditUser from "./service/user/EditUser"; // Make sure this import is added

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    accountCreatedDate: string;
    phoneNumber: string;
    password: string;
    role: 'ADMIN' | 'STAFF' | 'USER' | "";
}

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

export const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const userId = localStorage.getItem("LFUserId");
    const [request, setrequest] = useState<Request | null>(null)
    const [requestData, setRequestData] = useState<Request[]>([])
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    
    const handleOpenEditModal = () => setShowEditProfileModal(true);
    const handleCloseEditModal = () => setShowEditProfileModal(false);

    const handleProfileUpdate = async (updatedUser: User) => {
        console.log("Updating user with:", updatedUser); // Debug log
        try {
            setUser(updatedUser); // Update local state first
            setShowEditProfileModal(false); // Close modal
            
            // Optional: Re-fetch from server to ensure consistency
            if (userId) {
                const freshUserData = await getUserbyId(userId);
                setUser(freshUserData);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            // Re-fetch original data if update fails
            if (userId) {
                const userData = await getUserbyId(userId);
                setUser(userData);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const userData = await getUserbyId(userId);
                    setUser(userData);
                } catch (error) {
                    console.error("Error fetching user data", error);
                }
            }
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const requestData = await getRequestsByUserId(userId);
                    setRequestData(requestData);
                } catch (error) {
                    console.error("Error fetching user data", error);
                }
            }
        };

        fetchData();
    }, [userId]);

    const tHeads: { label: string; key: keyof Request }[] = [
        { label: "Request Id", key: "requestId" },
        { label: "Item Id", key: "itemId" },
        { label: "User Id", key: "userId" },
        { label: "Request Status", key: "requestStatus" },
        { label: "Is Active Request", key: "isActiveRequest" },
        { label: "Requested Date", key: "requestedDate" },
        { label: "Requested Time", key: "requestedTime" },
        { label: "Updated Date", key: "updatedDate" },
        { label: "Updated Time", key: "updatedTime" },
        { label: "Reward", key: "reward" },
    ];

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <Card className="mx-auto mt-4 shadow-sm" style={{ maxWidth: '600px' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        <h3>USER PROFILE</h3>
                        <h5>Welcome, {user.firstName} {user.lastName}</h5>
                    </Card.Title>

                    <Row>
                        <Col sm={6}><strong>Name:</strong></Col>
                        <Col sm={6}>{user.firstName} {user.lastName}</Col>
                    </Row>
                    <Row>
                        <Col sm={6}><strong>Date Of Birth:</strong></Col>
                        <Col sm={6}>{user.dateOfBirth}</Col>
                    </Row>
                    <Row>
                        <Col sm={6}><strong>Gender:</strong></Col>
                        <Col sm={6}>{user.gender}</Col>
                    </Row>
                    <Row>
                        <Col sm={6}><strong>Account Created:</strong></Col>
                        <Col sm={6}>{user.accountCreatedDate}</Col>
                    </Row>
                    <Row>
                        <Col sm={6}><strong>Email:</strong></Col>
                        <Col sm={6}>{user.email}</Col>
                    </Row>
                    <Row>
                        <Col sm={6}><strong>Phone:</strong></Col>
                        <Col sm={6}>{user.phoneNumber}</Col>
                    </Row>
                    <Row>
                        <Col sm={6}><strong>Role:</strong></Col>
                        <Col sm={6}>{user.role}</Col>
                    </Row>

                    <div className="text-center mt-4">
                        <Button variant="outline-primary" onClick={handleOpenEditModal}>Edit Profile</Button>
                    </div>
                </Card.Body>
            </Card>

            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {tHeads.map(({ label }) => (
                                <th key={label} className="text-center">{label}</th>
                            ))}
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Move EditUser component here, inside the return statement */}
            {user && (
                <EditUser
                    show={showEditProfileModal}
                    selectedRow={user}
                    handleClose={handleCloseEditModal}
                    handleUpdate={handleProfileUpdate}
                    refreshTable={() => {}} 
                />
            )}
        </>
    );
};