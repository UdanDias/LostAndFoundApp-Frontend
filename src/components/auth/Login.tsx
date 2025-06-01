
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { LoginTask } from "../service/auth/RegisterLogin";
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



export const Login = () => {
    interface Login {
        email: string,
        password: string
    }

    const [user, setUser] = useState<Login>({
        email: "",
        password: ""
    });
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const { login } = useAuth();
    const navigate = useNavigate();

    // const handleOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     const token = await LoginTask(user)
    //     console.log(token)
    //     const Toast = await Swal.mixin({
    //         toast: true,
    //         position: "top-end",
    //         showConfirmButton: false,
    //         timer: 3000,
    //         timerProgressBar: true,
    //         didOpen: (toast) => {
    //             toast.onmouseenter = Swal.stopTimer;
    //             toast.onmouseleave = Swal.resumeTimer;
    //         }
    //     });
    //     Toast.fire({
    //         icon: "success",
    //         title: "Signed in successfully"
    //     });
    //     console.log(user);
    //     login(token)
    //     setUser({

    //         email: "",
    //         password: "",

    //     })
    //     navigate("/items");
    // }
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = await LoginTask(user);

        if (!token) {
            const Toast = await Swal.mixin({
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
                    title: "Login Failed!"
                  });
            return ;
        }

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
            title: "Signed In Successfully"
        });

        console.log(user); // Optional: may not be needed for production
        login(token);
        setUser({ email: "", password: "" });
        navigate("/items");
    };

    return (
        <><div style={{ marginTop: "170px" }}>

            <h1
                className="text-center fw-bold mb-4"
                style={{ fontSize: "40px", letterSpacing: "1px", textShadow: "1px 1px 2px rgba(0,0,0,0.1)", color: "#444" }}
            >
                Login
            </h1>



            <Form className="d-flex flex-column align-items-center mt-5" onSubmit={handleOnSubmit}>
                <div className="w-25">


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email Address" name="email" value={user.email} onChange={handleOnChange} />

                    </Form.Group>



                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" name="password" value={user.password} onChange={handleOnChange} />

                    </Form.Group>


                    <div className="d-flex justify-content-center" >
                        <Button variant="success" type="submit">
                            Login
                        </Button>
                    </div>
                </div>
            </Form>
        </div>


        </>
    )
}