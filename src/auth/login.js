import React, { Component, useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "./login.css";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/Context";
import { userLogin } from "../api/Api";

export default function Login() {
    // context data
    const { profile } = useContext(MainContext);

    // toggle 
    const [toggle, setToggle] = useState(false);
    const [User, setUser] = useState({ user: "ADMIN" });
    const [info, setInfo] = useState();

    //data from response (dummy)


    //form handling
    const [form, setForm] = useState();
    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    //login function on click login button
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();             //prevent reload page after clicking form submit
        await userLogin(form).then(data => {
            data.body.role = User.user
            data.body.user = User.user
            import("../constant/Constant").then(ff => { ff.SetToken(data) })  //dynamice import //session storage setup for userInfo      
            profile.setProfile(data.body)    //set userinfo in context state   
            if (data.body.role == "ADMIN")
                setTimeout(() => {
                    navigate("admin/dashboard")
                }, 100)
            else if (data.body.role == "USER")
                setTimeout(() => {
                    navigate("user/stocks")
                }, 100)
        })
        // reducer(hello)

        // console.log(form)
        // setTimeout(()=>{
        //     navigate("dashboard")
        // },2000)
        // const response = await login(form)
        // console.log(response)
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
            <Container fluid className="mt-5">
                {/* profile button */}
                <Row>
                    <Col className="pbtn mt-5 justify-content-center">
                        <div onClick={() => setToggle(!toggle)} style={{ position: "absolute", caretColor: "transparent", paddingLeft: "0", marginLeft: "70%", backgroundColor: `${toggle ? "lightgrey" : "dodgerblue"}`, color: `${toggle ? 'black' : "#f1f1f1"}`, textAlign: "center", fontSize: "1rem", width: "5rem", border: ".1rem solid", borderRadius: ".4rem" }}>
                            {!toggle && User.user}
                            {toggle &&
                                (<ul style={{ listStyle: "none", padding: "0", marginBottom: "0", }}>
                                    <li onClick={() => setUser({ user: "USER" })}><span>USER</span></li>
                                    <li onClick={() => setUser({ user: "ADMIN" })}>ADMIN</li>
                                </ul>)
                            }
                        </div>
                    </Col>
                </Row>

                {/* login area */}
                <Row className="mx-5 ">
                    <div className="col-md-12" >
                        <Card border="secondary" style={{
                            boxShadow: 'inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)',
                            width: '25rem'
                        }}
                            className="card mx-auto">
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                                        <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" />
                                    </Form.Group>
                                    <hr />
                                    <Button onClick={handleSubmit} className="login mt-2" style={{ width: '23rem' }}>
                                        Login
                                    </Button>
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