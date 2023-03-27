import { Container, Row, Col, Table, Button, InputGroup, Form, Modal } from "react-bootstrap";
import { getBill, getCustBill } from "../../../api/Api";
import { useMemo, useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../public/img/logo.jpg";
import { Suspense } from "react";


export default function UserOrder(props) {
    const [dataCust, setDataCust] = useState();     //data fetch by customer no.
    const [dataBill, setDataBill] = useState();     //data fetch by bill no.
    const [loading, setLoading] = useState();        //state forloading 
    function LoadingSpinner() {
        return <h2>🌀 Loading...</h2>;
    }

    const [Bill, setBill] = useState();      // bill use to fetch by api and for session storage link
    useEffect(() => {                         // set bill on first render by session storage link
        if (sessionStorage.getItem("bill")) {
            setBill({
                type: "billNo",
                id: JSON.parse(sessionStorage.getItem("bill")).billno
            })
        }
        if (sessionStorage.getItem("orderDataBill")) {
            setDataBill(JSON.parse(sessionStorage.getItem("orderDataBill")))
        }
        if (sessionStorage.getItem("orderDataCust")) {
            setDataCust(JSON.parse(sessionStorage.getItem("orderDataCust"))[0])

        }
    }, [])

    useEffect(() => {               //on render refresh data

    }, [dataCust, dataBill])
    useEffect(() => {         // fetch bill data if bill no. changes
        if (Bill && Bill.type == "billNo") {
            setDataCust()
            getBill(Bill.id).then(d => {
                setDataBill(d)
                sessionStorage.setItem("orderDataBill", JSON.stringify(d))
                sessionStorage.removeItem("orderDataCust")
            })
        }
        else if (Bill && Bill.type == "custBill") {
            setDataBill()
            getCustBill(Bill.id).then(d => {
                setDataCust(d[0])
                sessionStorage.setItem("orderDataCust", JSON.stringify(d))
                sessionStorage.removeItem("orderDataBill")
            })

        }
    }, [Bill])

    const [BillNo, setBillNo] = useState();    //bill no. by input
    function handleBillNo(event) {      // handle bill no. onChange
        setBillNo(event.target.value)
    }
    function fetchBill() {
        setLoading(true)
        setBill({
            type: "billNo",
            id: BillNo
        })
        sessionStorage.removeItem("bill")
    }

    const [custBill, setCustBill] = useState();  //customer no. by input
    function handleCustBill(event) {         // handle custBill no. onChange
        setCustBill(event.target.value)
    }
    function fetchCustBill() {
        setBill({
            type: "custBill",
            id: custBill
        })
        sessionStorage.removeItem("bill")
    }

    let totalItem;
    let table;
    if (dataBill) {         //table for data fetched by bill no.
        table = dataBill.map((d, i) => {
            return (
                <tr key={i} onClick={() => orderDetails(d.Bill_no)}>
                    <td>{i + 1}</td>
                    <td>{d.Bill_no}</td>
                    <td>{d.phoneNo}</td>
                    {/* <td>{totalItem}</td>
                    <td>price</td> */}
                </tr>
            )
        });
        totalItem = dataBill.map(e => { return (e.Quantity) }).reduce((a, b) => { return a + b })
    }
    if (dataCust) {         //table for data fetched by customer phone no.
        table = dataCust.billNo.map((d, i) => {
            return (
                <tr key={i} onClick={() => { console.log("orderId") }}>
                    <td>{i + 1}</td>
                    <td>{d}</td>
                    <td>{dataCust.phoneNO}</td>
                    {/* <td>{totalItem}</td>
                    <td>price</td> */}
                </tr>
            )
        })
    }

    const [modalShow, setModalShow] = useState(false);   //modal for order view box
    const [DataBox, setDataBox] = useState();
    function orderDetails(id) {
        getBill(id).then(d => { setDataBox(d) })
        // modalShow(true)
    }

    //print setting
    const printRef = useRef();
    const handlePrint = useReactToPrint(
        {
            content: () => printRef.current

        }
    )

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
                                    {/* <th>Items</th>
                                    <th>Price</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <Suspense fallback={<LoadingSpinner />}>
                                    {
                                        table
                                    }
                                </Suspense>
                            </tbody>
                        </Table>
                    </Col>
                </Row>


            </Container>

            <Modal {...props}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        ORDER DETAILS
                    </Modal.Title>
                </Modal.Header>
                {/* <div className="print" style={{margin:"auto"}} >                    */}
                <Modal.Body className="show-grid" ref={printRef} >
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
                                        CUSTOMER PHONE : {DataBox && DataBox.phoneNO}
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
                                        {/* {cList && cList.map((e, i) => {
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
                                            })} */}
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
                                                    {/* {cList&&cList.map(e=>{
                                                            return e.data.MRP * e.qty
                                                        }).reduce((a,b)=>{return a+b},0)} */}
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
                {/* <Modal.Footer>
                        <Button onClick={() => { checkout() }}>CHECKOUT</Button>
                    </Modal.Footer>                 */}
            </Modal>

        </>
    )
}