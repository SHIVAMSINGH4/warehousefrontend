import React, { Component, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
// import "./css/login.css";
import { Container, Navbar ,Row} from "react-bootstrap";
import { login } from "../api/Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Dashboard from "../component/Dashboard/Dashboard";
// import SetToken from "../constant/Constant";
// import { Maincontext } from "../context/Context";

export default function Login() {
    const [form, setForm] = useState();
    const navigate = useNavigate();

    // const{setid}=useContext(Maincontext)

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(form)
        const response = await login(form)
        console.log(response)
        // if (response.status == "success") {
        //     toast("login done");
        //     SetToken(response)
        //     sessionStorage.setItem("idinfo",JSON.stringify(response.name))
        //     setid(JSON.parse(sessionStorage.getItem("idinfo")))

        //     setTimeout(() => {
        //         navigate("dashboard")
        //     }, 2000)

        // }
        // else {
        //     toast.error(response.message)
        // }

        // return response.data;
    }

    return (
        <>
            <Container className="justify-content-end bg-success">
                <Row>
                    <div className="col-md-12" >
                    <Card border="secondary" style={{ width: '25rem' }} className="card mx-auto">
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" onClick={handleSubmit} className="login" style={{ width: '23rem' }}>
                                    Login
                                </Button>
                                <Link to={"forgot"} className="forgot">forgoton password?</Link>
                                <div style={{ width: "23rem" }} className="br"></div>
                                <Link to={"signup"} ><Button variant="secondary" className="signup">signup</Button></Link>
                            </Form>
                        </Card.Body>
                    </Card>    
                    </div>                    
                    

                </Row>

            </Container>

            <ToastContainer />

            {/* <Dashboard data={form}/> */}
        </>
    )
}