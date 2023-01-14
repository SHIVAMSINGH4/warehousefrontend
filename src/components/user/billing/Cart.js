import { Button, Col, Container, Row ,InputGroup,Form} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    function moveToBill() {
        navigate("/bill")
    }
    return (
        <>
            <Container fluid id="main" style={{ display: "inline-block", verticalAlign: "middle" }}>
                <Row className="text-center mt-1" >
                    <h2>Cart</h2>
                    <div style={{ marginLeft: "40%", display: "block", width: "20%", height: "0.2rem", backgroundColor: "black" }}></div>
                </Row>
                <Row className=" mt-1 p-2" style={{ backgroundColor: "#428BCA" }}>
                    <Col className=" text-center">
                        <span><h6>Sales person = Ramu</h6></span>
                    </Col>
                    <Col className="text-center">
                        <span><h6>Invoice Id = 246</h6></span>
                    </Col>
                </Row>
                <Row className="pb-2" style={{ backgroundColor: "#428BCA" }}>
                    {/* <Col className="text-center">
                        <div >
                            <input name="scan" placeholder="add item" ></input>
                            <button>add</button>
                        </div>
                    </Col> */}
                    <Col sm="3">
                        <InputGroup>
                            <Form.Control
                                placeholder="Add Item"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <Button variant="light" id="button-addon2">
                                ADD
                            </Button>
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
        </>
    )
}