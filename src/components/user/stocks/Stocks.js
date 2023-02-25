import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import db from "../../../db.json";
import Card from 'react-bootstrap/Card';
import { useEffect,useState } from 'react';
import * as ai from "react-icons/ai";
import "./stocks.css"

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
        if(searchD.keywords!=""){
            handleShow();
            result = data.filter(e => {                    
                return e.sapref.toLowerCase().startsWith(searchD.keywords)
            })
        setInput(result)
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

    // item desc box

    // const ibox = 
    

    return (
        <>
            <Container fluid id='main'>
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
                                                // console.log(v)                                                
                                                return (
                                                    <tr  key={i}>
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
                                    <tr key={i}>
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
        </>
    )
}