import { Container, Row, Col, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import db from "../../../db.json";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import * as ai from "react-icons/ai";
import "./stocks.css"
// import Modal from 'react-bootstrap/Modal';

export default function Stocks() {
    //data fetch from db.stock file
    const data = db.stock;

    //filtered data on search
    var searchD = {};

    // input box function 
    var result = [];
    const [sInput, setInput] = useState([{ keywords: "" }])
    const handleChange = function (event) {
        searchD = { [event.target.name]: event.target.value }
        if (searchD.keywords != "") {
            handleShow();
            result = data.filter(e => {
                return e.sapref.toLowerCase().startsWith(searchD.keywords)
            })
            setInput(result)
        };
        if (searchD.keywords == "") {
            setInput([searchD])
            handleClose();
        }
        console.log(result);
    }

    //search box
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        var searchbox = document.getElementsByClassName("searchbox")[0];
        var card = document.getElementsByClassName("cad")[0];
        if (show == true) {
            searchbox.style.display = "block";
            card.classList.add("anime");
        }
        if (show == false) {
            setTimeout(() => {
                searchbox.style.display = "none";
            }, 100);
            card.classList.remove("anime");
        }

    }, [sInput, show]);

    // item desc box

    const [showEbox, setEbox] = useState(false);
    const [edata,setEdata] = useState({});
    function edit(event, i) {
        setEdata(data[i]);
        setEbox(true);        
        console.log(edata)
    }



    return (
        <>
            <Container fluid id='main'>
                {/* header */}
                <Col className='text-center'>
                    <h2>Stocks</h2>
                    <div style={{ margin: "auto", display: "block", width: "20%", height: "0.2rem", backgroundColor: "black" }}></div>
                    <Row className="justify-content-center p-1 mt-1" style={{ backgroundColor: "#428BCA" }}  >
                        <Col sm="5">
                            <InputGroup >
                                <Form.Control
                                    placeholder="Search Item"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={handleChange}
                                    name="keywords"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>

                {/* search box */}
                <Row>
                    <Col className="">
                        <div className='searchbox mt-1 bg-primary' style={{ height: "auto" }}>
                            <Card className="cad mx-auto my-0 bg-primary text-end" style={{ width: "100%" }}>
                                <Card.Body className=' bg-light'
                                    style={{ height: "auto", display: "inline-block", backgroundColor: "orange", paddingTop: "0" }}>
                                    <div style={{ width: "98%", display: "inline-block" }}></div>
                                    <div style={{ width: "2%", display: "inline-block" }}>
                                        <span className="closebtn" onClick={handleClose}>
                                            <ai.AiOutlineClose />
                                        </span>
                                    </div>
                                    <Table striped bordered variant="dark" hover responsive="sm">
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Ref. Id</th>
                                                <th>Desciption</th>
                                                <th>Application</th>
                                                <th>Maker</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sInput.map((e, i) => {
                                                // console.log(v)                                                
                                                return (
                                                    <tr key={i}>
                                                        <td >{i + 1}</td>
                                                        <td>{e.sapref}</td>
                                                        <td>{e.description}</td>
                                                        <td>{e.application}</td>
                                                        <td>{e.make}</td>
                                                        <td>{e.qty}</td>
                                                        <td>{e.mrp}</td>
                                                        {/* <td><button value={i} onClick={deldata}>-</button></td> */}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>

                {/* stocks table */}
                <Row>
                    <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Ref. Id</th>
                                <th>Desciption</th>
                                <th>Application</th>
                                <th>Maker</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((v, i) => {
                                return (
                                    <tr key={i} onClick={(event) => { edit(event, i) }}>
                                        <td >{i + 1}</td>
                                        <td>{v.sapref}</td>
                                        <td>{v.description}</td>
                                        <td>{v.application}</td>
                                        <td>{v.make}</td>
                                        <td>{v.qty}</td>
                                        <td>{v.mrp}</td>
                                        {/* <td><button value={i} onClick={deldata}>-</button></td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>

            {/* view stock component */}
            <Modal
                show={showEbox}
                onHide={() => {setEbox(false);console.log(edata)}}
                // dialogClassName="modal-90w"
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        view stock
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>                                
                                <th>Ref. Id</th>
                                <th>Desciption</th>
                                <th>Application</th>
                                <th>Maker</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>                                
                                <td>{edata.sapref}</td>
                                <td>{edata.description}</td>                                
                                <td>{edata.application}</td>
                                <td>{edata.make}</td>
                                <td>{edata.qty}</td>
                                <td>{edata.mrp}</td>
                                {/* <td><button value={i} onClick={deldata}>-</button></td> */}
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}