import { Button, Form } from "react-bootstrap"

export const Register = () => {
    return (
        <>
            <h1
                className="text-center fw-bold mb-4"
                style={{ fontSize: "40px", letterSpacing: "1px", textShadow: "1px 1px 2px rgba(0,0,0,0.1)", color: "#444" }}
            >
                Register
            </h1>



            <Form className="d-flex flex-column align-items-center mt-5">
                <div className="w-25">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email Address" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="Enter Phone Number" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select defaultValue="">
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