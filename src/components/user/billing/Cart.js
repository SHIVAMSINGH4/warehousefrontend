import { Button, Col, Container, Row } from "react-bootstrap";
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
                <Row className="text-center mt-2" style={{ backgroundColor: "lightgrey" }}>
                    <h1>Cart</h1>
                </Row>
                <Container fluid>
                    <Row className=" mt-3" style={{ backgroundColor: "#428BCA" }}>
                        <Col className=" text-center">
                            <span><h6>Sales person = Ramu</h6></span>
                        </Col>
                        <Col className="text-center">
                            <span><h6>Invoice Id = 246</h6></span>
                        </Col>
                    </Row>
                    <Row>
                        <div style={{ backgroundColor: "#428BCA" }}>
                            <input name="scan" ></input>
                            <button>scan</button>
                        </div>
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
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Col className="">
                            <div style={{ display: "block" }}>
                                <Button onClick={moveToBill}>View Bill</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </Container>
        </>
    )
}