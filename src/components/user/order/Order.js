import { Container, Row ,Col,Table,Button} from "react-bootstrap";
import SideNav from "../../sidenav/SideNav";

export default function Order() {
    return (
        <>
            <Container fluid id="main" style={{ display: "inline-block", verticalAlign: "middle" }}>
                <Row className="text-center mt-2" style={{ backgroundColor: "lightgrey" }}>
                    <h1>ORDER</h1>
                    <div style={{ marginLeft: "40%", marginBottom: "1%", display: "block", width: "20%", height: "0.2rem", backgroundColor: "black" }}></div>
                </Row>
                <Row>
                    <div style={{ backgroundColor: "#428BCA" }}>
                        <input name="scan" placeholder="search bill"></input>
                        <button>scan</button>
                    </div>
                </Row>
                <Row>
                    <Table striped bordered hover responsive="sm" >
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Order Id</th>
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
                {/* <Row>
                    <Col className="text-end ">
                        <div>
                            <Button onClick={moveToBill}>View Bill</Button>
                        </div>
                    </Col>
                </Row> */}
            </Container>
        </>
    )
}