import { Container, Row ,Col,Table,Button,InputGroup,Form} from "react-bootstrap";
import SideNav from "../../sidenav/SideNav";

export default function Order() {
    return (
        <>
            <Container fluid id="main" style={{ display: "inline-block", verticalAlign: "middle" }}>
                <Row className="justify-content-center mt-1">
                    <Col className="text-center">
                    <h2>ORDER HISTORY</h2>
                    <div style={{margin:"auto", display: "block", width: "25%", height: "0.2rem", backgroundColor: "black" }}></div>                    
                    </Col >                                    
                </Row>
                <Row  className="justify-content-center mt-1 p-1" style={{ backgroundColor: "#428BCA" }}>                   
                    <Col sm="4">
                        <InputGroup>
                            <Form.Control
                                placeholder="ORDER ID"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <Button variant="light" id="button-addon2">
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
                            />
                            <Button variant="light" id="button-addon2">
                                SEARCH
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Table striped bordered hover responsive="sm" >
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Order Id</th>
                                <th>Customer Phone</th>
                                <th>Desciption</th>
                                <th>Application</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>1001</td>
                                <td>9555356244</td>
                                <td>Air Filter</td>
                                <td>Discovery V</td>
                                <td>4</td>
                                <td>1688</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>1003</td>
                                <td>9555356244</td>
                                <td>Air Filter</td>
                                <td>Volkswagen</td>
                                <td>6</td>
                                <td>1688</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>1002</td>
                                <td>9555356244</td>
                                <td>Air Filter</td>
                                <td>Rolls Royace</td>
                                <td>2</td>
                                <td>168800</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>           
            </Container>
        </>
    )
}