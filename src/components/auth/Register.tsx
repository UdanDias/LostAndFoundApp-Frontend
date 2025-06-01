import { ReactElement, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { RegisterTask } from "../service/auth/RegisterLogin"
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom";

export const Register = () => {
    interface Register {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        password: string,
        role: 'ADMIN' | 'STAFF' | 'USER' | ''
    }
    
    const [user, setUser] = useState<Register>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: ""
    })
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        
        setUser ({ ...user, [e.target.name]: e.target.value })
    }
    const {login}=useAuth();
    const navigate=useNavigate();
    const handleOnSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token=await RegisterTask(user)
        console.log(token)
        alert("registered user successfully")
        console.log(user);
        login(token)
        setUser({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            role: ""
        })
        navigate("/items")
        
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