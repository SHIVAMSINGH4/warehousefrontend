import React from "react";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import logo from "../../../public/img/logo.jpg";
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBill } from "../../../api/Api";

function CheckoutModal(props) {

    const navigate = useNavigate()
    function moveO() {
        props.onHide()
        props.print()
        navigate("/user/order")
    }


    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ORDER
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>DONE</h4>
                <p>
                    ORDER CHECKOUT SUCCESSFULLY
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={moveO}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export const UserBillModal = React.forwardRef((props, ref) => {
    // clist data
    const cList = props.clist
    const loc = props.loc
    const custPhone = props.custphone
    // console.log(cList)

    const [checkoutShow, setModalShow] = useState(false);
    async function checkout() {
       
        await addBill(
            {
                phoneNO:custPhone,
                PRODUCTS:cList.map(x=>{
                    return (
                        {
                            ITEMS_REF:x.item,
                            LOCATION:loc,
                            QUANTITY:x.qty
                        }
                    )
                })
            }
        ).then(res=>{
            sessionStorage.setItem("bill",JSON.stringify(res))
        })
        setModalShow(true);
        // props.print()
        // props.onHide()
    }

    return (
        <>
            {/* checkout dialog */}
            <CheckoutModal print={props.print} show={checkoutShow} onHide={() => { setModalShow(false) }} />

            {/* modal */}


            <Modal {...props}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
            >
                 <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Receipt
                        </Modal.Title>
                    </Modal.Header>
                {/* <div className="print" style={{margin:"auto"}} >                    */}
                    <Modal.Body className="show-grid" ref={ref} >
                        <Container fluid id="main" className="mb-5" style={{ padding: "1rem" }}>
                            {/* gap / blue line*/}
                            <Row className="mt-1" style={{ backgroundColor: "#428BCA" }}>
                                <Col>
                                    <div style={{ width: "100%", height: "1rem" }}></div>
                                </Col>
                            </Row>
                            {/* receipt header */}
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
                            {/* customer info */}
                            <Row>
                                <Col className="px-5 mt-3">
                                    <div style={{ display: "inline-block", width: "38%", verticalAlign: "middle", fontSize: "1rem" }}>
                                        <span style={{ fontSize: "1.2rem" }}>
                                            BILL TO
                                        </span>
                                        <hr style={{ margin: "0", marginBottom: "0.5rem" }} />
                                        <span>
                                            CUSTOMER PHONE : {custPhone}
                                        </span>

                                    </div>
                                </Col>
                            </Row>
                            {/* receipt body */}
                            <Row>
                                <Col className="px-1 mt-4">
                                    <Table striped bordered hover responsive="sm" style={{ fontSize: "1rem", }} >
                                        <thead className="sticky-top" style={{ position: "relative", zIndex: "1", backdropFilter: "blur(5px)" }}>
                                            <tr style={{ textAlign: "center" }}>
                                                <th>S.No.</th>
                                                <th>MAKER</th>
                                                <th>ITEM ID</th>
                                                <th>DESCRIPTION</th>
                                                <th>APPLICATION</th>
                                                <th>MRP</th>
                                                <th>QUANTITY</th>
                                                <th>TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cList && cList.map((e, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <div style={{ display: "inline-block", width: "50%" }}>{i + 1}</div>
                                                        </td>
                                                        <td>{e.data.MAKE}</td>
                                                        <td>{e.item}</td>
                                                        <td>{e.data.Descripation}</td>
                                                        <td>{e.data.APPLICATION}</td>
                                                        <td>{e.data.MRP}</td>
                                                        <td>{e.qty}</td>
                                                        <td width="100"><div style={{ width: "100%" }}>{e.data.MRP * e.qty}</div></td>
                                                    </tr>
                                                )
                                            })}
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
                                        <div style={{ width: "30%", display: "inline-block", verticalAlign: "middle" }}></div>
                                        <div style={{ width: "70%", height: "0.1rem", backgroundColor: "black", display: "inline-block", verticalAlign: "middle" }}></div>
                                        <div style={{ width: "30%", display: "inline-block", verticalAlign: "middle" }}></div>
                                        <div style={{ marginBottom: "1rem", width: "70%", display: "inline-block", verticalAlign: "middle" }}>
                                            <div style={{ textAlign: "center", display: "inline-block", width: "50%", fontSize: "1rem", fontWeight: "bold" }}>
                                                BALANCE
                                            </div>
                                            <div style={{ backgroundColor: "lightblue", display: "inline-block", width: "50%", fontSize: "1rem" }}>
                                                <div style={{ textAlign: "center", display: "inline-block", width: "50%" }}>
                                                    <span style={{}}>$</span>
                                                </div>
                                                <div style={{ textAlign: "center", display: "inline-block", width: "25%" }}>
                                                    <span style={{}}>
                                                        {cList&&cList.map(e=>{
                                                            return e.data.MRP * e.qty
                                                        }).reduce((a,b)=>{return a+b},0)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{ marginLeft: "50%", width: "50%", height: "0.1rem", backgroundColor: "black" }}></div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { checkout() }}>CHECKOUT</Button>
                    </Modal.Footer>                
            </Modal>

        </>
    )
}
)