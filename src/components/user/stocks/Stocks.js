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
        var stable = document.getElementsByClassName("stable")[0];
        if (show == true) {
            searchbox.style.display = "block";
            card.classList.add("anime");
            stable.style.height = "35vh"
        }
        if (show == false) {
            setTimeout(() => {
                searchbox.style.display = "none";
            }, 100);
            card.classList.remove("anime");
            stable.style.height = "79vh"
        }

    }, [sInput, show]);

    // item desc box

    const [showEbox, setEbox] = useState(false);
    const [edata, setEdata] = useState({});
    function edit(i) {
        setEdata(data[i]);
        setEbox(true);
        console.log(i)
        console.log(edata)
    }



    return (
        <>
            <Container fluid id='main'>
                {/* header */}
                <Row>
                    <Col className='text-center'>
                        <div style={{ width: "100%", paddingLeft: "45%" }}>
                            <div style={{ zIndex: "2", width: "10%", position: "fixed" }}>
                                <h2 style={{ marginBottom: "-0.1rem" }}>Stocks</h2>
                                <div style={{ margin: "auto", display: "block", width: "100%", height: "0.1rem", backgroundColor: "black" }}></div>
                            </div>
                        </div>
                        <Row className="justify-content-center p-1" style={{ borderRadius: "1rem", marginTop: "2.6rem", backgroundColor: "#428BCA" }}  >
                            <Col sm="5">
                                <InputGroup >
                                    <Form.Control
                                        placeholder="Search Item"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={handleChange}
                                        name="keywords"
                                        autoComplete='disabled'
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>


                {/* search box */}
                <Row>
                    <Col>
                        <div className='searchbox cad' style={{ borderRadius: "1rem", backgroundColor: "lightgray", width: "100%" }} >                         
                            {/* close button */}
                            <div style={{ width: "98%", display: "inline-block" }}></div>                            
                            <div style={{ width: "1%", display: "inline-block" }}>
                                <span className="closebtn" onClick={handleClose}>
                                    <ai.AiOutlineClose size=".9rem" />
                                </span>
                            </div>

                            {/* search table */}
                            <div style={{ width: "100%", marginBottom: "0.5rem", height: "auto", overflowY: "scroll", overflowX: "scroll", }}>
                                <Table striped bordered variant="dark" hover responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>SAPREF</th>
                                            <th>ITEMS REF</th>
                                            <th>O.E. REF.</th>
                                            <th>MEYLE REF.</th>
                                            <th>Ref. Id</th>
                                            <th>MAHLE REF.</th>
                                            <th>MAAN REF.</th>
                                            <th>HENGEST/OTH</th>
                                            <th>OTHER REF</th>
                                            <th>DESCRIPTION</th>
                                            <th>APPLICATION</th>
                                            <th>LOC</th>
                                            <th>QUANTITY</th>
                                            <th>MRP</th>
                                            <th>MAKE</th>
                                            <th>NEW MRP</th>
                                            <th>P COST</th>
                                            <th>OP BALANCE</th>
                                            <th>PUR</th>
                                            <th>SALES</th>
                                            <th>MUNDKA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sInput.map((e, i) => {
                                            // console.log(v)                                                
                                            return (
                                                <tr key={i} onClick={() => { edit(i) }}>
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
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* stocks table */}
                <Row>
                    <Col >
                        <div className='stable' style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                            <Table striped bordered hover variant='light' >
                                <thead className="sticky-top">
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
                                            <tr key={i} onClick={() => { edit(i) }}>
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
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* view stock component */}
            <Modal
                show={showEbox}
                onHide={() => { setEbox(false); console.log(edata) }}
                // dialogClassName="modal-90w"
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        view stock
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body  style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                    <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>SAPREF</th>
                                <th>ITEMS REF</th>
                                <th>O.E. REF.</th>
                                <th>MEYLE REF.</th>
                                <th>Ref. Id</th>
                                <th>MAHLE REF.</th>
                                <th>MAAN REF.</th>
                                <th>HENGEST/OTH</th>
                                <th>OTHER REF</th>
                                <th>DESCRIPTION</th>
                                <th>APPLICATION</th>
                                <th>LOC</th>
                                <th>QUANTITY</th>
                                <th>MRP</th>
                                <th>MAKE</th>
                                <th>NEW MRP</th>
                                <th>P COST</th>
                                <th>OP BALANCE</th>
                                <th>PUR</th>
                                <th>SALES</th>
                                <th>MUNDKA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
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