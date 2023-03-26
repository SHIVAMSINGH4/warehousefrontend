import { Container, Row, Col, Table, Button, InputGroup, Form } from "react-bootstrap";
import { getBill, getCustBill } from "../../../api/Api";
import { useMemo, useState } from "react";


export default function UserOrder() {
    const [BillNo, setBill] = useState();    //bill no. by input
    function handleBillNo(event) {
        setBill(event.target.value)
    }

    const [custBill, setCustBill] = useState();  //customer no. by input
    function handleCustBill(event) {
        setCustBill(event.target.value)
    }

    const [data, setData] = useState();
    function fetchBill() {
        getBill(BillNo).then(x => { setData(x) })
    }

    function fetchCustBill() {
        getCustBill(custBill).then()
    }
    
    let totalItem;
    if(data){
        totalItem = data.map(e=>{return( e.Quantity)}).reduce((a,b)=>{return a+b})
    }

    return (
        <>

            <Container fluid id="main" style={{ display: "inline-block", verticalAlign: "middle" }}>
                <Row className="header justify-content-center mt-1">
                    <Col className="text-center">
                        <h2>ORDER HISTORY</h2>
                        <div style={{ margin: "auto", display: "block", width: "25%", height: "0.2rem", backgroundColor: "black" }}></div>
                    </Col >
                </Row>
                <Row className="inputs justify-content-center mt-1 p-1" style={{ backgroundColor: "#428BCA" }}>
                    <Col sm="4">
                        <InputGroup>
                            <Form.Control
                                placeholder="ORDER ID"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={handleBillNo}
                            />
                            <Button variant="light" id="button-addon2" onClick={fetchBill}>
                                SEARCH
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col sm="1">
                    </Col>
                    <Col sm="4">
                        <InputGroup>
                            <Form.Control
                                placeholder="CUSTOMER PHONE NO"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={handleCustBill}
                            />
                            <Button variant="light" id="button-addon2" onClick={fetchCustBill}>
                                SEARCH
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className=" table justify-content-center">
                    <Col sm="10">
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Order Id</th>
                                    <th>Customer Phone</th>
                                    <th>Items</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((d,i) => {
                                        
                                        return (
                                            <tr key={i} onClick={() => { console.log("orderId") }}>
                                                <td>{i+1}</td>
                                                <td>{data.Bill_no}</td>
                                                <td>9555356244</td>
                                                <td>{totalItem}</td>
                                                <td>price</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}