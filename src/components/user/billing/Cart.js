import { useReducer, useState,useEffect } from "react";
import { Button, Col, Container, Row, InputGroup, Form, Dropdown } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import BillModal from "./Bill";
import db from "../../../db.json";
import Card from 'react-bootstrap/Card';
import * as ai from "react-icons/ai";

export default function Cart() {

    //cart
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
        // navigate("/bill")
        setModalShow(true)
    }

     //data fetch from db.stock file
     const data = db.stock; 

     //filtered data on search
     var searchD = {};
 
     // input box function 
     var result = [];
     const [sInput, setInput] = useState([{ keywords: "" }])
     const handleChange = function (event) {        
         searchD = { [event.target.name]: event.target.value }  
         console.log(searchD)      
         if(searchD.keywords!=""){
             handleShow();
             result = data.filter(e => {                    
                 return e.sapref.toLowerCase().startsWith(searchD.keywords)
             })
         setInput(result)
         console.log(sInput)
         };
         if(searchD.keywords==""){
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
         if(show==true){
             searchbox.style.display = "block";
             card.classList.add("anime");
         }
         if (show==false) {
                 setTimeout(() => {
                     searchbox.style.display = "none";
                 }, 500);
                 card.classList.remove("anime");
             }
         
     }, [sInput]);

    return (
        <>            

            {/* cart */}
            <Container fluid id="main" style={{ display: "inline-block", verticalAlign: "middle" }}>
                <Row className=" mt-1" >
                    <Col sm="4"></Col>
                    <Col sm="4" className="text-center">
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
                <Row className=" mt-1 p-2" style={{ backgroundColor: "#428BCA" }}>
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
                            />
                        </InputGroup>
                    </Col>
                </Row>

                {/* search box */}
                <Row>
                    <Col className="">                    
                        <div className='searchbox mt-1 bg-primary' style={{ height: "auto" }}>
                            <Card className="cad mx-auto my-0 bg-primary" style={{ width: "100%" }}>                            
                            <div>
                                <span className="closebtn" style={{ marginRight: "0.5%" }} onClick={handleClose}>
                                    <ai.AiOutlineClose />
                                </span>
                            </div>
                                <Card.Body className=' bg-light' style={{height:"auto", display: "inline-block", backgroundColor: "orange" }}>
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
                                                // console.log(e)                                                
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

                <Row>
                    <Table striped bordered hover responsive="sm" >
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Ref. Id</th>
                                <th>Desciption</th>
                                <th>Application</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>FGLX4397</td>
                                <td>Air Filter</td>
                                <td>Discovery V</td>
                                <td>4</td>
                                <td>1688</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>1003</td>
                                <td>Air Filter</td>
                                <td>Volkswagen</td>
                                <td>6</td>
                                <td>1688</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>1002</td>
                                <td>Air Filter</td>
                                <td>Rolls Royace</td>
                                <td>2</td>
                                <td>168800</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
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