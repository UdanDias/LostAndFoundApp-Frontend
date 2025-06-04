import { useEffect, useState } from "react";
import { getUserbyId } from "./service/user/GetUserById";
import { getRequestsByUserId } from "./service/request/GetRequestByUser";
import { Table } from "react-bootstrap";
import { Card, Row, Col, Button } from "react-bootstrap";
import EditUser from "./service/user/EditUser"; // Make sure this import is added
import { getRequestStatsByUserId } from "./service/request/GetRequestStats";

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
    const [requestStats, setRequestStats] = useState<{ [key: string]: number }>({});


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

    useEffect(() => {
        const fetchRequestStats = async () => {
            if (userId) {
                try {
                    const stats = await getRequestStatsByUserId(userId);
                    setRequestStats(stats);
                } catch (error) {
                    console.error("Error fetching request stats", error);
                }
            }
        };

        fetchRequestStats();
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
                        <h2 style={{
                            fontWeight: "700",
                            fontSize: "2rem",
                            fontStyle: "",
                            background: "linear-gradient(to right,rgb(64, 27, 165),rgb(96, 170, 209))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0px 4px 5px rgba(118, 212, 249, 0.4)",
                        }}>USER PROFILE</h2>
                        <h4>Welcome, <span style={{ fontWeight: "500",
                        fontSize: "1.5rem",
                        fontStyle: "",
                        background: "linear-gradient(to right,rgb(249, 146, 118),rgb(209, 168, 96))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0px 4px 5px rgba(249, 170, 118, 0.4)", }}><strong>{user.firstName} {user.lastName}</strong></span></h4>
                    </Card.Title>
                    <div className="px-4" style={{ marginLeft: "110px" }}>
                        <Row>
                            <Col sm={6}><strong>Name:</strong></Col>
                            <Col sm={6}><strong>{user.firstName} {user.lastName}</strong></Col>
                        </Row>
                        <Row>
                            <Col sm={6}><strong>Date Of Birth:</strong></Col>
                            <Col sm={6}><strong>{user.dateOfBirth}</strong></Col>
                        </Row>
                        <Row>
                            <Col sm={6}><strong>Gender:</strong></Col>
                            <Col sm={6}><strong>{user.gender}</strong></Col>
                        </Row>
                        <Row>
                            <Col sm={6}><strong>Account Created:</strong></Col>
                            <Col sm={6}><strong>{user.accountCreatedDate}</strong></Col>
                        </Row>
                        <Row>
                            <Col sm={6}><strong>Email:</strong></Col>
                            <Col sm={6}><strong>{user.email}</strong></Col>
                        </Row>
                        <Row>
                            <Col sm={6}><strong>Phone:</strong></Col>
                            <Col sm={6}><strong>{user.phoneNumber}</strong></Col>
                        </Row>
                        <Row>
                            <Col sm={6}><strong>Role:</strong></Col>
                            <Col sm={6}><strong>{user.role}</strong></Col>
                        </Row>
                    </div>


                    <div className="text-center mt-4">
                        <Button variant="outline-primary" onClick={handleOpenEditModal}>Edit Profile</Button>
                    </div>
                </Card.Body>
            </Card>
            <Card className="mx-auto mt-4 shadow-sm" style={{ maxWidth: '600px', marginBottom: "20px" }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4"><h5 style={{
                        fontWeight: "700",
                        fontSize: "2rem",
                        fontStyle: "",
                        background: "linear-gradient(to right,rgb(64, 27, 165),rgb(96, 170, 209))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0px 4px 5px rgba(118, 212, 249, 0.4)",
                    }}>Request Statistics</h5></Card.Title>
                    <div className="px-4" style={{ marginLeft: "160px" }}>
                        <Row>
                            <Col><strong>Total Requests:</strong></Col>
                            <Col><strong>{requestStats.totalRequests ?? 0}</strong></Col>
                        </Row>
                        <Row>
                            <Col><strong>Active Requests:</strong></Col>
                            <Col><strong>{requestStats.activeRequests ?? 0}</strong></Col>
                        </Row>
                        <Row>
                            <Col><strong>Pending Requests:</strong></Col>
                            <Col><strong>{requestStats.pendingRequests ?? 0}</strong></Col>
                        </Row>
                        <Row>
                            <Col><strong>Approved Requests:</strong></Col>
                            <Col><strong>{requestStats.approvedRequests ?? 0}</strong></Col>
                        </Row>
                        <Row>
                            <Col><strong>Rejected Requests:</strong></Col>
                            <Col><strong>{requestStats.rejectedRequests ?? 0}</strong></Col>
                        </Row>
                    </div>

                </Card.Body>
            </Card>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
                    refreshTable={() => { }}
                />
            )}
        </>
    );
};