import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { getUsers } from "./service/user/GetUser"
import EditUser from "./service/user/EditUser";
import { deleteUsers } from "./service/user/DeleteUser"
import AddUser from "./service/user/AddUser";

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
    name: string;
    email: string;
    phoneNumber: string;
    role: 'ADMIN' | 'STAFF' | 'USER' | "";
}
// Outside the component
export const loadData = async (
    setUserData: React.Dispatch<React.SetStateAction<User[]>>
) => {
    const userDetails = await getUsers();
    console.log(userDetails);
    setUserData(userDetails);
};

export function UserConsole() {

    const [userData, setUserData] = useState<User[]>([])
    const [selectedRow, setSelectedRow] = useState<User | null>(null)
    const [showEditUserModal, setShowEditUserModal] = useState(false)
    const [showAddUserForm, setShowAddUserForm] = useState(false)

    useEffect(() => {

        loadData(setUserData)


    }, [])
    const refreshTableData = () => {
        loadData(setUserData);
    };

    const tHeads: string[] = [
        "User Id",
        "Name",
        "Email",
        "Phone Number",
        "Role"
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
        try {
            await deleteUsers(userId)
            setUserData(userData.filter(user => user.userId !== userId))

        } catch (error) {
            console.error("Delete user failed with", error)

        }

    }
    const handleAdd = (newUser: User) => (
        setUserData((prevData) => [...prevData, newUser])
    )
    return (
        <>
            <div className='d-flex justify-content-end p-3' >
                <Button style={{ marginRight: '60px' }} variant="outline-success" onClick={() => setShowAddUserForm(true)} >Add User</Button>
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
            <AddUser
                show={showAddUserForm}
                handleClose={() => setShowAddUserForm(false)}
                handleAdd={handleAdd}
                refreshTable={refreshTableData}
            />


        </>
    )
}