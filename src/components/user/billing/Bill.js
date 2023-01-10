import { Col, Container, Row } from "react-bootstrap";
import logo from "../../../public/img/logo.jpg";
import Table from 'react-bootstrap/Table';

export default function Bill() {
    return (
        <>
            <Container id="main">
                <Row className="mt-1" style={{ backgroundColor: "#428BCA" }}>
                    <Col>
                        <div style={{ width: "100%", height: "1rem" }}></div>
                    </Col>
                </Row>
                <Row style={{ backgroundColor: "lightgrey" }}>
                    <Col className="mt-4 ps-5">
                        <div style={{ display: "inline-block" }}>
                            <img src={logo} style={{ width: "5rem" }}></img>
                        </div>
                        <div style={{ display: "inline-block", verticalAlign: "middle", fontSize: "1rem" }}>
                            <h6 style={{ fontSize: "1.3rem" }}>
                                Your Company Name
                            </h6>
                            <span>
                                Your Address
                            </span>
                            <br />
                            <span>Your Contact details</span>
                        </div>
                    </Col>
                    <Col className="mt-4 text-end pe-5">
                        <div style={{ textAlign: "center", display: "inline-block", verticalAlign: "middle", fontSize: "1rem" }}>
                            <p style={{ fontSize: "2rem" }}>
                                INVOICE
                            </p>
                            <span style={{ marginTop: "1rem" }}>DATE:</span>
                            <hr style={{ margin: "0", marginBottom: "0.5rem" }} />
                            <span style={{ marginTop: "1rem" }}>INVOICE NO.</span>
                            <hr style={{ margin: 0, marginBottom: "0.5rem" }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="px-5 mt-3">
                        <div style={{ display: "inline-block", width: "38%", verticalAlign: "middle", fontSize: "1rem" }}>
                            <span style={{ fontSize: "1.2rem" }}>
                                BILL TO
                            </span>
                            <hr style={{ margin: "0", marginBottom: "0.5rem" }} />
                            <span>
                                PHONE : 9555356244
                            </span>

                        </div>
                        {/* <div style={{width:"4%",display:"inline-block",verticalAlign:"middle"}}></div>
                        <div style={{display:"inline-block",width:"58%",verticalAlign:"middle",backgroundColor:"dodgerblue",fontSize:"0.7rem"}}>
                            <span style={{fontSize:"0.9rem"}}>
                                BILL TO
                            </span>
                            <hr/>
                            <span>
                                PHONE :
                            </span>
                            <hr style={{margin:"0",marginBottom:"0.5rem"}}/>
                        </div> */}
                    </Col>
                </Row>
                <Row>
                    <Col className="px-5 mt-4">
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Desciption</th>
                                    <th>Application</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Discovery V</td>
                                    <td>Air Filter</td>
                                    <td>1</td>
                                    <td>1688</td>
                                    <td>1688</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className="px-5">
                        <div style={{ display: "inline-block", textAlign: "center", width: "40%", fontSize: "0.7rem", verticalAlign: "top" }}>
                            REMARKS/PAYMENT INSTRUCTIONS :
                        </div>
                        <div style={{ display: "inline-block", width: "60%", fontSize: "1rem" }}>
                            <div style={{ display: "inline-block", width: "30%" }}></div>
                            <div style={{ display: "inline-block", textAlign: "end", width: "40%", verticalAlign: "middle", fontSize: "1rem" }}>
                                <div style={{ fontSize: "1rem", marginBottom: "0.1rem" }}>SUBTOTAL</div>
                                <div style={{ fontSize: "1rem", marginBottom: "0.1rem" }}>DISCOUNT</div>
                                <div style={{ fontSize: "1rem", marginBottom: "0.1rem" }}>SUBTOTAL DISCOUNT</div>
                                <div style={{ fontSize: "1rem", marginBottom: "0.1rem" }}>TAX RATE</div>
                                <div style={{ fontSize: "1rem", marginBottom: "0.1rem" }}>TOTAL TAX</div>
                                <div style={{ fontSize: "1rem", marginBottom: "0.1rem" }}>SHIPPING HANDLING</div>
                            </div>
                            <div style={{ display: "inline-block", verticalAlign: "middle", width: "1%" }}></div>
                            <div style={{ display: "inline-block", width: "29%", verticalAlign: "middle", fontSize: "1rem" }}>
                                <div style={{ textAlign: "right", fontSize: "1rem" }}>
                                    <span style={{ display: "block", paddingRight: "3rem" }}>1</span>
                                    <hr style={{ margin: "0" }} />
                                    <span style={{ display: "block", paddingRight: "3rem" }}>0</span>
                                    <hr style={{ margin: "0" }} />
                                    <span style={{ display: "block", paddingRight: "3rem" }}>0</span>
                                    <hr style={{ margin: "0" }} />
                                    <span style={{ display: "block", paddingRight: "3rem" }}>0</span>
                                    <hr style={{ margin: "0" }} />
                                    <span style={{ display: "block", paddingRight: "3rem" }}>0</span>
                                    <hr style={{ margin: "0" }} />
                                    <span style={{ display: "block", paddingRight: "3rem" }}>0</span>
                                </div>
                            </div>
                            <div style={{ marginLeft: "9.4rem", width: "70%", height: "0.1rem", backgroundColor: "black" }}></div>
                            <div style={{marginBottom:"1rem", marginLeft: "12.6rem", width: "60%"}}>
                                <div style={{textAlign:"center",display:"inline-block", width: "50%", fontSize: "1rem",fontWeight:"bold" }}>
                                    BALANCE
                                </div>                                
                                <div style={{ backgroundColor: "lightblue" , display:"inline-block",width: "50%", fontSize: "1rem" }}>
                                    <div style={{ textAlign:"center",display:"inline-block",width: "50%" }}>
                                        <span style={{ }}>$</span>
                                    </div>                                
                                    <div style={{textAlign:"center",paddingRight:"18%",display:"inline-block", width: "50%" }}>
                                        <span style={{ }}>0</span>
                                    </div>
                                </div>
                                <div style={{ marginLeft: "50%",width: "50%", height: "0.1rem", backgroundColor: "black" }}></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}