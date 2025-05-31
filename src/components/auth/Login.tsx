
import { Button, Form } from "react-bootstrap"


export const Login = () => {
    return (
        <><div style={{marginTop:"170px"}}>

            <h1
                className="text-center fw-bold mb-4"
                style={{ fontSize: "40px", letterSpacing: "1px", textShadow: "1px 1px 2px rgba(0,0,0,0.1)", color: "#444" }}
            >
                Login
            </h1>



            <Form className="d-flex flex-column align-items-center mt-5">
                <div className="w-25">


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email Address" />

                    </Form.Group>



                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" />

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