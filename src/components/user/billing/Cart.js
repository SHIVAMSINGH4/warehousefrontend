import { useReducer, useState, useEffect } from "react";
import { Button, Col, Container, Row, InputGroup, Form, Dropdown } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import BillModal from "./Bill";
import db from "../../../db.json";
import Card from 'react-bootstrap/Card';
import * as ai from "react-icons/ai";
import { continueStatement } from "@babel/types";

export default function Cart() {

    //cart tab
    const cart = { type: "purchase", option: "sell" }
    const [state, dispatch] = useReducer(reducer, cart)

    function reducer(state, action) {
        switch (action.type) {
            case "sell":
                return { type: "purchase", option: "sell" };
            case "purchase":
                return { type: "sell", option: "purchase" };
        }
    }

    // BILL
    const [modalShow, setModalShow] = useState(false);
    function moveToBill() {
        setModalShow(true)
    }

    const data = db.stock;    //data fetch from db.stock file

    // input box function 
    var searchD = {};   //filtered data on search
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
        var sTable = document.getElementsByClassName("sTable")[0];
        var cTable = document.getElementsByClassName("cTable")[0];
        if (show == true) {
            searchbox.style.display = "block";
            card.classList.add("anime");
            sTable.style.height = "38vh"
            cTable.style.height = "30vh"
        }
        if (show == false) {
            setTimeout(() => {
                searchbox.style.display = "none";
            }, 500);
            card.classList.remove("anime");
            cTable.style.height = "70vh"
        }

    }, [sInput, show]);

    //cart list
    const [cList, setClist] = useState([]);

    function aList(i) {
        let itemid = sInput[i].sapref
        let item = {}
        data.forEach((e, i) => {
            if (e.sapref == itemid) {
                item = { data: e, qty: 1 }
                console.log(item)
                setClist([...cList, item])
            }
        })        
    }

    function rList(i) {
        let itemid = cList[i].sapref
        cList.forEach((e, i) => {
            if (e.sapref == itemid) {
                continueStatement()
            }
            setClist([...cList, e])
        })
        setClist(cList.filter(e => e.sapref !== itemid))
    }

    function inc(id){
        let update = {data:cList[id].data,qty:cList[id].qty+1};
        console.log(cList.filter(e =>e[id].data!==cList[id].data))       
        setClist([...cList.filter(e =>e[id].data.sapref!==cList[id].data.sapref),update]);
    }

    function dec(id){
        let update = {...cList[id],qty:cList[id].qty-1};
        if(update.qty>0)
            setClist([...cList,update]);
    }

    return (
        <>

            {/* cart */}
            <Container fluid id="main" style={{ display: "inline-block", verticalAlign: "middle" }}>

                {/* header */}
                <Row className=" mt-1" >
                    <Col sm="4"></Col>
                    <Col sm="4" className="text-center" >
                        <h2>Cart</h2>
                        <div style={{ margin: "auto", width: "30%", height: "0.2rem", backgroundColor: "black" }}></div>
                    </Col>

                    {/*cart button */}

                    <Col sm="4" className="text-end pt-2">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ backgroundColor: "ghostwhite", color: "#428BCA" }}>
                                {state.type}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { dispatch({ type: state.type }); console.log(state) }}>{state.option}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                {/* add item block */}
                <Row className=" mt-1 p-2" style={{ borderRadius: "1rem", backgroundColor: "#428BCA" }}>
                    <Col sm="3">
                        <InputGroup>
                            <Form.Control
                                placeholder="search item"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={handleChange}
                                name="keywords"
                                autoComplete="disabled"
                            />
                            {/* <Button variant="light" id="button-addon2">
                                ADD
                            </Button> */}
                        </InputGroup>
                    </Col>
                    <Col >
                        <Button variant="light" id="button-addon2">
                            SCAN
                        </Button>
                    </Col>
                    <Col sm="3">
                        <InputGroup>
                            <Form.Control
                                placeholder="CUSTOMER PHONE NO."
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            // onChange={{ cphone }}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                {/* search box */}
                <Row>
                    <Col>
                        <div className='searchbox cad' style={{ borderRadius: "1rem", backgroundColor: "lightgray", width: "100%" }} >
                            <div style={{ width: "98%", display: "inline-block" }}></div>
                            {/* close button */}
                            <div style={{ width: "1%", display: "inline-block" }}>
                                <span className="closebtn" onClick={handleClose}>
                                    <ai.AiOutlineClose size=".9rem" />
                                </span>
                            </div>

                            {/* search table */}
                            <div className="sTable" style={{ width: "100%", marginBottom: "0.5rem", overflowY: "scroll", overflowX: "scroll", }}>
                                <Table striped bordered variant="dark" hover responsive="sm">
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
                                        {sInput.map((e, i) => {
                                            // console.log(v)                                                
                                            return (
                                                <tr key={i} >
                                                    <td >
                                                        <div style={{ display: "inline-block", width: "50%" }}>{i + 1}</div>
                                                        <span>
                                                            <button style={{ border: ".09rem solid black" }} onClick={() => { aList(i) }}>
                                                                +
                                                            </button>
                                                        </span>
                                                    </td>
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


                {/* CART LIST */}
                <Row>
                    <Col>
                        <div className='cTable' style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                            <Table striped bordered hover responsive="sm" >
                                <thead className="sticky-top">
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Ref. Id</th>
                                        <th>Desciption</th>
                                        <th>Application</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cList.map((e, i) => {
                                        return (
                                            <tr key={i}>
                                                <td >
                                                    <div style={{ display: "inline-block", width: "50%" }}>{i + 1}</div>
                                                    <span>
                                                        <button style={{ border: ".09rem solid black" }} onClick={() => { rList(i) }}>
                                                            -
                                                        </button>
                                                    </span>
                                                </td>
                                                <td>{e.data.sapref}</td>
                                                <td>{e.data.description}</td>
                                                <td>{e.data.application}</td>
                                                <td>{e.data.make}</td>
                                                <td>
                                                    <div style={{ display: "inline-block", width: "50%" }}>{e.qty}</div>
                                                    <span>
                                                        <button style={{ border: ".09rem solid black" }} onClick={() => { inc(i) }}>
                                                            ~
                                                        </button>
                                                        <button style={{ border: ".09rem solid black" }} onClick={() => { dec(i) }}>
                                                            *
                                                        </button>                                                        
                                                    </span>
                                                </td>
                                                <td>{e.data.mrp}</td>
                                                {/* <td></td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Col>

                </Row>

                {/* BILL BUTTON */}
                <Row>
                    <Col className="text-end ">
                        <div>
                            <Button onClick={moveToBill}>View Bill</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
          
            {/* bill */}
            <BillModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}