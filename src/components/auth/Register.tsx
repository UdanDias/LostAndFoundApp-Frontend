import { ReactElement, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { RegisterTask } from "../service/auth/RegisterLogin"
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Register = () => {
    interface Register {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        dateOfBirth:string,
        gender:string,
        accountCreatedDate:string,
        password: string,
        role: 'ADMIN' | 'STAFF' | 'USER' | ''
    }

    const [user, setUser] = useState<Omit<Register,'accountCreatedDate'>>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth:"",
        gender:"",
        password: "",
        role: ""
    })
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = await RegisterTask(user)
        console.log(token)
        const Toast =  Swal.mixin({
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
            title: " Registered Successfully"
        });

        console.log(user);
        login(token)
        setUser({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            dateOfBirth:"",
            gender:"",
            password: "",
            role: ""
        })
        navigate("/home")

    }
    return (
        <>
        
            <h1
                className="text-center fw-bold mb-4"
                style={{ fontSize: "40px", letterSpacing: "1px", textShadow: "1px 1px 2px rgba(0,0,0,0.1)", color: "#444" }}
            >
                Register
            </h1>



            <Form className="d-flex flex-column align-items-center mt-5" onSubmit={handleOnSubmit}>
                <div className="w-25">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={user.firstName} onChange={handleOnChange} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" name="lastName" value={user.lastName} onChange={handleOnChange} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email Address" name="email" value={user.email} onChange={handleOnChange} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="Enter Phone Number" name="phoneNumber" value={user.phoneNumber} onChange={handleOnChange} />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" placeholder="Enter Date Of Birth" name="dateOfBirth" value={user.dateOfBirth} onChange={handleOnChange} />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRole" >
                        <Form.Label>Gender</Form.Label>
                        <Form.Select defaultValue="" name="gender" value={user.gender} onChange={handleOnChange} >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" name="password" value={user.password} onChange={handleOnChange} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRole" >
                        <Form.Label>Role</Form.Label>
                        <Form.Select defaultValue="" name="role" value={user.role} onChange={handleOnChange} >
                            <option value="" disabled>Select Role</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="STAFF">STAFF</option>
                            <option value="USER">USER</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-center" >
                        <Button variant="success" type="submit">
                            Register
                        </Button>
                    </div>
                </div>
            </Form>

        </>
    )
}