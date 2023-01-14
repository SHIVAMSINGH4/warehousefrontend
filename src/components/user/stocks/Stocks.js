import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import db from "../../../db.json";

export default function Stocks() {
    const data = db.stock;
    // console.log(data)
    return (
        <>
            <Container fluid id='main'>
                <Col className='text-center'>
                    <h2>Stocks</h2>
                    <div style={{ margin:"auto", display: "block", width: "20%", height: "0.2rem", backgroundColor: "black" }}></div>
                    <Row className="justify-content-center p-1 mt-1" style={{ backgroundColor: "#428BCA" }}  >                      
                        <Col sm="5">
                            <InputGroup>
                                <Form.Control
                                    placeholder="Search Item"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="light" id="button-addon2">
                                    Search
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
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