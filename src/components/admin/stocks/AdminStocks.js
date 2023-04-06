import { Container, Row, Col, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import db from "../../../db.json";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import * as ai from "react-icons/ai";
import "./stocks.css"
import { getAllProducts, getOneProduct, updateProduct } from '../../../api/Api';
import index from 'toastify';
// import Modal from 'react-bootstrap/Modal';

export default function AdminStocks() {
    //search item
    const [sItem, setSItem] = useState()
    const [q, setQ] = useState("")
    function handleSChange(e) {    //search values on change in search tab input
        const q = e.target.value
        setQ(q.toUpperCase())
    }
    function keydown(event) {
        if (event.key == 'Enter') search()
    }

    async function search(e) {  //on click search button data fetch from server for one product
        const id = q;
        const loc = ["GGN_001", "MUN_001", "DEL_001"];
        Promise.all(loc.map((e, i) => {
            return getOneProduct(id, e)
        })
        )
            .then(res => {

                Promise.all(res.map((ele) => {
                    return getOneProduct(ele[0].OE_REF, ele[0].LOC)
                })).then(res => setSItem(res))

            })
    }

    useEffect(() => {
        console.log(sItem)
        if (sItem)
            sessionStorage.setItem("sItem", JSON.stringify(sItem))
        if (!sItem && sessionStorage.getItem("sItem")) {
            setSItem(JSON.parse(sessionStorage.getItem("sItem")))
        }
    }, [sItem])

    //TABLE COMPONENTS
    let items;
    if (sItem) items = sItem[0].map(x => { return (x.ITEMS_REF) })
    let MAKE;
    if (sItem) MAKE = sItem[0].map(x => { return (<td></td>) })

    let GGN = [];
    let MUN = [];
    let DEL = [];
    let row;
    if (sItem) {
        items.forEach((a) => {

            sItem.forEach((ele) => {
                ele.forEach(x => {
                    if (x.LOC == "GGN_001") {
                        if (x.ITEMS_REF == a) {
                            console.log("ok")
                            row = <>
                                <td>{x.QTY}</td>
                                <td>{x.PUR}</td>
                                <td>{x.MRP}</td>
                                <td></td>
                            </>
                            GGN.push(row)
                            row = ""
                        }
                    }
                    else if (x.LOC == "MUN_001") {
                        if (x.ITEMS_REF == a) {
                            row = <>
                                <td>{x.QTY}</td>
                                <td>{x.PUR}</td>
                                <td>{x.MRP}</td>
                                <td></td>
                            </>
                            MUN.push(row)
                            row = ""
                        }
                    }
                    else if (x.LOC == "DEL_001") {
                        if (x.ITEMS_REF == a) {
                            row = <>
                                <td>{x.QTY}</td>
                                <td>{x.PUR}</td>
                                <td>{x.MRP}</td>
                                <td></td>
                            </>
                            DEL.push(row)
                            row = ""
                        }
                    }
                })
            })
        });

    }

    // item desc box
    const [showVbox, setVbox] = useState(false);
    const [Vdata, setVdata] = useState({});
    const [locOne, setLocOne] = useState();
    const [locTwo, setLocTwo] = useState();
    const [qty, setQty] = useState(1);

    function vBox(event, e, i) {        //vbox or view box
        console.log(e)
        setVdata(e)
        setVbox(true)
    }
    async function swap() {          //swap function
        let objOne;
        let objTwo;
        sItem.forEach(e => {
            e.forEach(x => {
                if (x.ITEMS_REF == Vdata.ITEMS_REF && x.LOC == locOne) {
                    objOne = x
                    // console.log(`obj 1 :${objOne.LOC}`)
                }
                if (x.ITEMS_REF == Vdata.ITEMS_REF && x.LOC == locTwo) {
                    objTwo = x
                    // console.log(`obj 1 :${objTwo.LOC}`)
                }
            })
        })
        if (objOne.QTY - qty > 0) objOne.QTY = objOne.QTY - qty
        else alert("select appropriate quantity")
        
        objTwo.QTY = parseFloat(objTwo.QTY) +parseFloat(qty)
        console.log(objOne.QTY,objTwo.QTY)
        await updateProduct(objOne,locOne).then(async res=>{
            console.log(res)
            await updateProduct(objTwo,locTwo).then(res => console.log(res))
        }
            
        )
    }
    useEffect(() => {
        console.log(Vdata)
    }, [Vdata])

    return (
        <>
            <Container fluid id='main'>
                {/* header */}
                <Row>
                    <Col className='text-center'>
                        <Row>
                            <div style={{ marginTop: ".2%", width: "100%", paddingLeft: "35%", position: "fixed", zIndex: "1", backgroundColor: "white", height: "6%" }}>
                                <div style={{ width: "18%" }}>
                                    <h2 style={{ marginBottom: "-0.1rem" }}>Stocks</h2>
                                    <div style={{ margin: "auto", display: "block", width: "100%", height: "0.1rem", backgroundColor: "black" }}></div>
                                </div>
                            </div>
                        </Row>

                        {/* search input */}
                        <Row className="justify-content-center p-1" style={{ borderRadius: "1rem", marginTop: "4.2%", backgroundColor: "#428BCA" }}  >
                            <Col sm="5">
                                <InputGroup >
                                    <Form.Control
                                        placeholder="Search Item"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={handleSChange}
                                        name="keywords"
                                        autoComplete='disabled'
                                        onKeyDown={keydown}
                                    />
                                </InputGroup>
                            </Col>
                            <Col sm="1"><Button variant="light" onClick={search}>Search</Button></Col>
                        </Row>
                    </Col>
                </Row>

                {/* stocks table */}
                <Row>
                    <Col >

                        <div className='stable' style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                            <Table striped bordered hover variant='light' >
                                <thead>
                                    <tr className="text-center">
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        {sItem && sItem.map((e, i) => {
                                            let loc;
                                            if (e[0].LOC == "GGN_001") loc = "GURUGRAM"
                                            if (e[0].LOC == "MUN_001") loc = "MUNDKA"
                                            if (e[0].LOC == "DEL_001") loc = "DELHI"

                                            return (
                                                <th key={i} colSpan={4}>
                                                    {loc}
                                                </th>
                                            )
                                        })}


                                    </tr>
                                    <tr>
                                        <th>MAKER</th>
                                        <th>ITEMS REF</th>
                                        <th></th>
                                        {sItem && sItem.map((ele, i) => {
                                            return (
                                                <>
                                                    <th key={i}>QUANTITY</th>
                                                    <th key={i + 1}>PUR MRP</th>
                                                    <th key={i + 2}>NEW MRP</th>
                                                    <th key={i + 3}></th>

                                                </>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sItem && sItem[0].map((e, i) => {
                                        return (
                                            <tr onClick={(event) => vBox(event, e, i)}>
                                                <td>{e.MAKE}</td>
                                                <td>{e.ITEMS_REF}</td>
                                                <td></td>
                                                {GGN[i]}
                                                {MUN[i]}
                                                {DEL[i]}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>

                        <div className='stable' style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                            <Table striped bordered hover variant='light' >
                                <tbody>
                                    <tr>
                                        <th>DESCRIPTION</th>
                                        <td>{sItem && sItem[0][0].Descripation}</td>
                                    </tr >
                                    <tr>
                                        <th>APPLICATION</th>
                                        <td>{sItem && sItem[0][0].APPLICATION}</td>
                                    </tr>
                                    <tr>
                                        <th>O.E. REF</th>
                                        <td>{sItem && sItem[0][0]["OE_REF"]}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>


            <Modal
                show={showVbox}
                onHide={() => { setVbox(false); console.log(Vdata) }}
                // dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        view stock
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                    <Table striped bordered hover responsive="sm">
                        <tbody>
                            <tr>
                                <th>MAKER</th>
                                <td>{Vdata.MAKE}</td>
                            </tr >
                            <tr>
                                <th>ITEM_REF</th>
                                <td>{Vdata.ITEMS_REF}</td>
                            </tr >

                            <tr>
                                <th>DESCRIPTION</th>
                                <td>{sItem && sItem[0][0].Descripation}</td>
                            </tr >
                            <tr>
                                <th>APPLICATION</th>
                                <td>{sItem && sItem[0][0].APPLICATION}</td>
                            </tr>
                            <tr>
                                <th>O.E. REF</th>
                                <td>{sItem && sItem[0][0]["OE_REF"]}</td>
                            </tr>
                            <tr>
                                <th>QUANTITY</th>
                                <td>
                                    <input style={{ width: "100%", caretColor: "auto", textAlign: 'center', overflowX: "scroll" }} name="quantity" type="number"
                                        onBlur={(eve) => setQty(eve.target.value)} onChange={eve => setQty(eve.target.value)} value={qty} min={1} />
                                </td>
                            </tr>
                            <tr>
                                <th>FROM</th>
                                <th>
                                    <Form.Select
                                        onChange={(e) => { setLocOne(e.target.value) }}
                                        aria-label="Default select example"
                                        placeholder='FROM WHICH STORE'
                                    >
                                        <option>FORM WHICH STORE</option>
                                        <option value="GGN_001">GURUGRAM</option>
                                        <option value="MUN_001">MUNDKA</option>
                                        <option value="DEL_001">DELHI</option>
                                    </Form.Select>
                                </th>
                            </tr>
                            <tr>
                                <th>TO</th>
                                <th>
                                    <Form.Select
                                        onChange={(e) => { setLocTwo(e.target.value) }}
                                        aria-label="Default select example"
                                        placeholder='TO WHICH STORE'
                                    >
                                        <option>TO WHICH STORE</option>
                                        <option value="GGN_001">GURUGRAM</option>
                                        <option value="MUN_001">MUNDKA</option>
                                        <option value="DEL_001">DELHI</option>
                                    </Form.Select>
                                </th>
                            </tr>

                        </tbody>
                    </Table>
                    <div style={{ textAlign: "center", marginBottom: "5%" }}>
                        <Button onClick={swap}>
                            SWAP
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}