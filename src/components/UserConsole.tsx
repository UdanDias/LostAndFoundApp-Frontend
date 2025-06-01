import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { getUsers } from "./service/user/GetUser"
import EditUser from "./service/user/EditUser";
import { deleteUsers } from "./service/user/DeleteUser"
// import AddUser from "./service/user/AddUser";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// interface User{
//     userId:string;
//     name:string;
//     email:string;
//     phoneNumber:string;
//     role:'ADMIN'|'STAFF'|'USER'|""
// }
// export function UserConsole(){
//     const theads:String[]=[
//         "User Id",
//         "Name",
//         "Email",
//         "Phone Number",
//         "Role"

//     ]

//     const [userData,setUserData]=useState<User[]>([])
//     const [selectedRow,setSelectedRow]=useState<User|null>(null)
//     const [showEditUserModal,setShowEditUserModal]=useState(false)

//     useEffect(()=>{
//         const loadData=async()=>{
//             const userDetails=await getUsers()
//             setUserData(userDetails)
//         }
//         loadData()
//     },[])

//     const handleEdit=(row:User)=>{
//         console.log("handle Edit",row)
//         setSelectedRow(row)
//         setShowEditUserModal(true)
//     }
//     const handleClose=()=>setShowEditUserModal(false)
//     const handleUpdate=(updatedUser:User)=>{
//        const updatedUsers=userData.map((user)=>
//         user.userId===updatedUser.userId?updatedUser:user);
//        setUserData(updatedUsers)
//     }

//     return(
//         <>
//         <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         {theads.map((headings)=>(
//                             <th className="text-center">{headings}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {userData.map((row)=>(
//                         <tr key={row.userId}>
//                             {Object.values(row).map((cell,index)=>(
//                                 <td key={index} className="text-center">{cell}</td>
//                             ))}

//                             <td className="d-flex justify-content-center align-items-center gap-2">
//                                     <Button variant="outline-secondary" onClick={()=>handleEdit(row)}>Edit</Button>
//                                     <Button variant="outline-danger">Delete</Button>

//                                 </td>
//                         </tr>
//                     ))}

//                 </tbody>
//             </Table>
//             <EditUser
//             show={showEditUserModal}
//             selectedRow={selectedRow}
//             handleClose={handleClose}
//             handleUpdate={handleUpdate}
//             />
//         </>
//     )
// }

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: 'ADMIN' | 'STAFF' | 'USER' | "";
}
// Outside the component
export const loadData = async (navigate: any,
    setUserData: React.Dispatch<React.SetStateAction<User[]>>
) => {
    const userDetails = await getUsers(navigate);
    console.log(userDetails);
    setUserData(userDetails);
};

export function UserConsole() {

    const [userData, setUserData] = useState<User[]>([])
    const [selectedRow, setSelectedRow] = useState<User | null>(null)
    const [showEditUserModal, setShowEditUserModal] = useState(false)
    const [showAddUserForm, setShowAddUserForm] = useState(false)
    const navigate = useNavigate();

    // useEffect(() => {

    //     loadData(navigate,setUserData)


    // }, [navigate])
    useEffect(() => {
        const fetchData = async () => {
            await loadData(navigate, setUserData); // no try/catch needed
        };
        fetchData();
    }, [navigate]);

    const refreshTableData = () => {
        loadData(navigate, setUserData);
    };

    const tHeads: string[] = [
        "User Id",
        "First Name",
        "Last Name",
        "Email",
        "Phone Number",
        "Password",
        "Role",
        "Action"
    ];
    const handleEdit = (row: User) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditUserModal(true)
    }
    const handleClose = () => setShowEditUserModal(false)

    const handleUpdate = (updatedUser: User) => {
        const updatedUsers = userData.map((user) =>
            user.userId === updatedUser.userId ? updatedUser : user);
        setUserData(updatedUsers)
    }

    const handleDelete = async (userId: string) => {
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
                await deleteUsers(userId)
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
                        title: "User Deleted Successfully"
                      });
                setUserData(userData.filter(user => user.userId !== userId))

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
                        title: "Failed to Delete User"
                      });
                console.error("Delete user failed with", error)

            }
        }


    }
    const handleAdd = (newUser: User) => (
        setUserData((prevData) => [...prevData, newUser])
    )
    const location = useLocation();
    const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home"
    const formattedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1, -1) + " Console"
    return (
        <>
            <div className="position-relative d-flex align-items-center p-3" style={{ width: '100%' }}>
                {/* Title absolutely centered */}
                <h1
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: "2.5rem",
                        fontWeight: "600",
                        color: "#2c3e50",
                        letterSpacing: "1px",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        textShadow: "1px 1px 2px rgba(60, 60, 120, 0.2)",
                        margin: 0,
                        whiteSpace: 'nowrap', // prevents line breaks
                        zIndex: 1,
                        marginTop: "20px",
                        marginBottom: "15px"

                    }}
                >
                    <span
                        style={{
                            color: "#7c60d1",
                            fontWeight: "700",
                            fontSize: "2.8rem",
                            textShadow: "1px 1px 3px rgba(124, 96, 209, 0.5)",
                        }}
                    >
                        User
                    </span>
                    &nbsp;
                    <span
                        style={{
                            color: "#7e6df0",
                            fontWeight: "700",
                            fontSize: "2.8rem",
                            textShadow: "1px 1px 3px rgba(126, 109, 240, 0.5)",
                        }}
                    >
                        Console
                    </span>
                </h1>

                {/* Button aligned right */}
                {/* <Button
    variant="outline-success"
    style={{ marginLeft: 'auto', marginRight: '17px', zIndex: 2 }}
    onClick={() => setShowAddUserForm(true)}
  >
    Add User
  </Button> */}
            </div>

            <Table striped bordered hover style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        {tHeads.map((headings) => (
                            <th className="text-center">{headings}</th>
                        ))}


                    </tr>
                </thead>
                <tbody>
                    {userData.map((row) => (
                        <tr key={row.userId}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index} className="text-center">{cell}</td>

                            ))}



                            <td className='d-flex justify-content-center gap-2'>
                                <Button variant="outline-secondary" onClick={() => handleEdit(row)}>Edit</Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(row.userId)}>Delete</Button>

                            </td>


                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditUser
                show={showEditUserModal}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                refreshTable={refreshTableData}
            />
            {/* <AddUser
                show={showAddUserForm}
                handleClose={() => setShowAddUserForm(false)}
                handleAdd={handleAdd}
                refreshTable={refreshTableData}
            /> */}


        </>
    )
}