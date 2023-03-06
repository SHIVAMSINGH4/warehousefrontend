import { Container, Row, Col, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import db from "../../../db.json";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import * as ai from "react-icons/ai";
import "./stocks.css"
import { getAllProducts, getOneProduct } from '../../../api/Api';
// import Modal from 'react-bootstrap/Modal';

export default function Stocks() {
    //data fetch from db.stock file
    const [data, setData] = useState([])
    const callData = async () => {
        const d = await getAllProducts();
        setData([...d])
    };

    useEffect(() => {
        if (data == "")
            callData()
        console.log(data)
    }, [data])
    // useEffect(() => {

    // }, [data])

    //filtered data on search
    var searchD = {};

    // input box function 
    var result = [];
    const [sInput, setInput] = useState([{ keywords: "" }])
    // const handleChange = function (event) {
    //     searchD = { [event.target.name]: event.target.value }
    //     if (searchD.keywords != "") {
    //         handleShow();
    //         result = data.filter(e => {
    //             return e.sapref.toLowerCase().startsWith(searchD.keywords)
    //         })
    //         setInput(result)
    //     };
    //     if (searchD.keywords == "") {
    //         setInput([searchD])
    //         handleClose();
    //     }
    //     console.log(result);
    // }

    //search box
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // useEffect(() => {
    //     var searchbox = document.getElementsByClassName("searchbox")[0];
    //     var card = document.getElementsByClassName("cad")[0];
    //     var stable = document.getElementsByClassName("stable")[0];
    //     if (show == true) {
    //         searchbox.style.display = "block";
    //         card.classList.add("anime");
    //         stable.style.height = "35vh"
    //     }
    //     if (show == false) {
    //         setTimeout(() => {
    //             searchbox.style.display = "none";
    //         }, 100);
    //         card.classList.remove("anime");
    //         stable.style.height = "79vh"
    //     }

    // }, [sInput, show]);

    // item desc box

    // const [showVbox, setVbox] = useState(false);
    // const [Vdata, setVdata] = useState({});
    // function view(i) {
    //     setVdata(data[i]);
    //     setVbox(true);
    // }

    //search item

    const [sItem, setSItem] = useState({})
    const [q, setQ] = useState("")
    function handleSChange(e) {
        const q = e.target.value
        setQ(q)
        // data.filter(ele => {
        //     for (let key in ele) {
        //         if (ele[`${key.toLowerCase()}`] == q.toLowerCase()) {
        //             console.log(key)
        //             // setSItem([...sItem])
        //         }
        //     }
        // })
    }

    async function search(e) {
        const id = q;
        await getOneProduct(id).then(x => setSItem(x[0]))
    }
    useEffect(() => {
        console.log(sItem)
    }, [sItem])

    return (
        <>
            <Container fluid id='main'>
                {/* header */}
                <Row>
                    <Col className='text-center'>
                        <Row>
                            <div style={{ marginTop: ".2%", width: "100%", paddingLeft: "35%", position: "fixed", zIndex: "1", backgroundColor: "white", height: "6%" }}>
                                <div style={{ width: "18%" }}>
                                    <h2 style={{ marginBottom: "-0.1rem" }}>Stocks</h2>
                                    <div style={{ margin: "auto", display: "block", width: "100%", height: "0.1rem", backgroundColor: "black" }}></div>
                                </div>
                            </div>
                        </Row>

                        {/* search input */}
                        <Row className="justify-content-center p-1" style={{ borderRadius: "1rem", marginTop: "4.2%", backgroundColor: "#428BCA" }}  >
                            <Col sm="5">
                                <InputGroup >
                                    <Form.Control
                                        placeholder="Search Item"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={handleSChange}
                                        name="keywords"
                                        autoComplete='disabled'
                                    />
                                </InputGroup>

                            </Col>
                            <Col sm="1"><Button variant="light" onClick={search}>Search</Button></Col>
                        </Row>
                    </Col>
                </Row>


                {/* search box */}
                {/* <Row>
                    <Col>
                        <div className='searchbox cad' style={{ borderRadius: "1rem", backgroundColor: "lightgray", width: "100%" }} >
                            {/* close button
                            <div style={{ width: "98%", display: "inline-block" }}></div>
                            <div style={{ width: "1%", display: "inline-block" }}>
                                <span className="closebtn" onClick={handleClose}>
                                    <ai.AiOutlineClose size=".9rem" />
                                </span>
                            </div>

                            {/* search table */}
                {/* <div style={{ width: "100%", marginBottom: "0.5rem", height: "auto", overflowY: "scroll", overflowX: "scroll", }}>
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
                                                <tr key={i} onClick={() => { view(i) }}>
                                                    <td >{i + 1}</td>
                                                    <td>{e.sapref}</td>
                                                    <td>{e.description}</td>
                                                    <td>{e.application}</td>
                                                    <td>{e.make}</td>
                                                    <td>{e.qty}</td>
                                                    <td>{e.mrp}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row> */}

                {/* stocks table */}
                <Row>
                    <Col >
                        {/* ITEMS TABLE */}
                        <div className='stable' style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                            <Table striped bordered hover variant='light' >
                                <thead>
                                     <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th colSpan={3}>{sItem && sItem.QTY_BY_STORE&& sItem.QTY_BY_STORE[0].STORE}</th>
                                        <th></th>
                                        <th colSpan={3}>{sItem && sItem.QTY_BY_STORE&& sItem.QTY_BY_STORE[0].STORE}</th>
                                    </tr>
                                    <tr>
                                        <th>MAKER</th>
                                        <th>ITEMS REF</th>
                                        <th></th>
                                        <th>QUANTITY</th>
                                        <th>PUR MRP</th>
                                        <th>NEW MRP</th>
                                        {/* <th>COST</th> */}
                                        <th></th>
                                        <th>QUANTITY</th>
                                        <th>PUR MRP</th>
                                        <th>NEW MRP</th>
                                    </tr>
                                </thead>
                                <tbody>                                   
                                    <tr >
                                        <td>{sItem && sItem.MAKE}</td>
                                        <td>{sItem && sItem["ITEMS_REF"]}</td>
                                        <td></td>
                                        <td>{sItem&&sItem.QTY_BY_STORE && sItem.QTY_BY_STORE[0].QTY}</td>
                                        <td>{sItem && sItem.MRP}</td>
                                        <td>{sItem && sItem["NEW MRP"]}</td>
                                        <td></td>
                                        <td>{sItem && sItem.QTY}</td>
                                        <td>{sItem && sItem.MRP}</td>
                                        <td>{sItem && sItem["NEW MRP"]}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        {/* ITEMS DESCRIPTION */}
                        <div className='stable' style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                            <Table striped bordered hover variant='light' >                               
                                <tbody>
                                    <tr>
                                        <th>DESCRIPTION</th>
                                        <td>{sItem && sItem.Descripation}</td>
                                    </tr >
                                    <tr>
                                        <th>APPLICATION</th>
                                        <td>{sItem && sItem["O_E REF"]}</td>
                                    </tr>
                                    <tr>
                                        <th>O.E. REF</th>
                                        <td>{sItem && sItem.APPLICATION}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* view stock component */}

            {/* <Modal
                show={showVbox}
                onHide={() => { setVbox(false); console.log(Vdata) }}
                // dialogClassName="modal-90w"
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        view stock
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
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
                                <td>{Vdata.sapref}</td>
                                <td>{Vdata.description}</td>
                                <td>{Vdata.application}</td>
                                <td>{Vdata.make}</td>
                                <td>{Vdata.qty}</td>
                                <td>{Vdata.mrp}</td>
                                {/* <td><button value={i} onClick={deldata}>-</button></td> 
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
             </Modal> */}
        </>
    )
}