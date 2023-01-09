import { Button, Col, Container, Row } from "react-bootstrap";
import SideNav from "../../sidenav/SideNav";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export default function Bill() {

    function moveToCart(){
        console.log("ok")    
    }
    return (
        <>
            <SideNav />
            <Container fluid id="main">
                <Row className="text-center bg-success mt-2">
                    <h1>Invoice</h1>
                </Row>
                <Row className="bg-primary mt-3">
                    <Col className="bg-secondary">
                        <span><h6>Sales person = Ramu</h6></span>
                    </Col>
                    <Col className="bg-danger text-end">
                        <span><h6>Invoice Id = 246</h6></span>
                    </Col>
                </Row>
                <Row>
                  <div className=" bg-primary">
                    <input name="scan" ></input>
                    <button>scan</button>
                  </div>
                </Row>
                <Row>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Ref. Id</th>
                                <th>Desciption</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>                                
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <Col className="align-items-end">
                    <Button onClick={moveToCart}>View Bill</Button>
                    </Col>
                </Row>

            </Container>
        </>
    )
}