import { useReducer, useState, useEffect, useContext, useRef } from "react";
import { Button, Col, Container, Row, InputGroup, Form, Dropdown } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import {UserBillModal} from "./UserBill";
import db from "../../../db.json";
import Card from 'react-bootstrap/Card';
import * as ai from "react-icons/ai";
import { MainContext } from "../../../context/Context";
import { useReactToPrint } from "react-to-print";

export default function UserCart() {
    const { cart } = useContext(MainContext) //context data

    //data for cart list
    const [data, setData] = useState();         //data state (cartList data)
    const [itemId, setItemId] = useState();     //cartList item id of products
    const [loc, setLoc] = useState();            //location of store
    useEffect(() => {       //cartlist update on page or page reload/ component render
        if (sessionStorage.getItem("cartList")) {
            setItemId(JSON.parse(sessionStorage.getItem("cartList")))
            setData(JSON.parse(sessionStorage.getItem("cartListData")))
        }
        if (sessionStorage.getItem("userinfo")) {
            setLoc(JSON.parse(sessionStorage.getItem("userinfo")).store)
        }
    }, [])

    //cart list   
    const [cList, setCList] = useState();     //array of objects having data nd quantity for cart
    function updateList() {      //add item in Clist                 
        let newItem = {};
        itemId && itemId.forEach(y => {         //loop on itemId/cartList            
            data && data.forEach((e) => {       //loop on data/cartListData
                if (e.ITEMS_REF == y) {
                    newItem = { data: e, item: y, qty: 1 }
                    if (!cList) {                   //set cList if  cList empty
                        setCList([newItem])
                        console.log("ok9")
                    }
                    else {
                        var counter = 0;
                        cList.forEach(z => {
                            if (z.item == y)
                                counter += 1
                        })
                        if (counter == 0) {
                            setCList([...cList, newItem])
                        }
                    }
                }
            })
        })
    }
    function rList(id) {                          //remove item in list        
        let a = [...itemId.filter(e => e != id)]
        let b = [...cList.filter(e => e.item != id)]
        let c = [...data.filter(e => e.ITEMS_REF != id)]
        if (a.length == 0) {
            sessionStorage.removeItem("cartList")
            sessionStorage.removeItem("cList")
            sessionStorage.removeItem("cartListData")
            cart.setCartCount(0)
        }
        else {
            sessionStorage.setItem("cartList", JSON.stringify(a))
            sessionStorage.setItem("cList", JSON.stringify(b))
            sessionStorage.setItem("cartListData", JSON.stringify(c))
            cart.setCartCount(JSON.parse(sessionStorage.getItem("cartList")).length)
        }
        setItemId(JSON.parse(sessionStorage.getItem("cartList")))
        setCList(JSON.parse(sessionStorage.getItem("cList")))
        setData(JSON.parse(sessionStorage.getItem("cartListData")))
    }
    function handleQty(e, id) {                  // increase/decrease funtion for quantity of item in list      
        if (e.target.value >= 0) {
            let newQty = e.target.value
            let obj = cList;
            obj.forEach((x) => {
                if (x.item == id) {
                    x.qty = newQty;
                }
            })
            setCList([...obj])
        }
    }
    function blurQty(e, id) {                     //input quantity after focus out
        if (e.target.value == "" || e.target.value == 0) {
            let newQty = 1
            let obj = cList;
            obj.forEach((x) => {
                if (x.item == id) {
                    x.qty = newQty;
                    console.log("Ok")
                }
            })
            setCList([...obj])
        }
    }

    //show cartlist after render cart component
    useEffect(() => {
        if (!cList && sessionStorage.getItem("cList")) {
            setCList(JSON.parse(sessionStorage.getItem("cList")))
        }
        if (cList) {
            sessionStorage.setItem("cList", JSON.stringify(cList))
        }
        updateList()
    }, [itemId, cList])

    //cart tab
    const carttype = { type: "purchase", option: "sell" }
    const [state, dispatch] = useReducer(reducer, carttype)
    function reducer(state, action) {
        switch (action.type) {
            case "sell":
                return { type: "purchase", option: "sell" };
            case "purchase":
                return { type: "sell", option: "purchase" };
        }
    }

    // BILL modal
    const [modalShow, setModalShow] = useState(false);
    function moveToBill() {
        if(custPhone)
            setModalShow(true)
        else{
           alert("add customer phone no.")
        }
    }

    //print setting
    const printRef = useRef();
    const handlePrint = useReactToPrint  (
        {
            content:()=>printRef.current
          
        }
    )
    
    //customer Phone
    const [custPhone,setCustPhone]=useState();
    const handleCustPhone = (event)=>{
        setCustPhone(event.target.value)
    }

    return (
        <>
            {/* cart */}
            <Container fluid id="main" style={{ caretColor: "transparent", display: "inline-block", verticalAlign: "middle" }}>

                {/* header */}
                <Row className=" mt-1" >
                    <Col sm="4"></Col>
                    <Col sm="4" className="text-center" style={{ cursor: "pointer" }}>
                        <h2>Cart</h2>
                        <div style={{ margin: "auto", width: "30%", height: "0.2rem", backgroundColor: "black" }}></div>
                    </Col>

                    {/*cart button */}

                    <Col sm="4" className="text-end pt-2">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ backgroundColor: "ghostwhite", color: "#428BCA" }}>
                                {state.type}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { dispatch({ type: state.type }); console.log(state) }}>{state.option}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                {/* add item block */}
                <Row className=" mt-1 p-2 justify-content-" style={{ caretColor: "initial", borderRadius: ".5rem", backgroundColor: "#428BCA" }}>
                    <Col sm="3">
                        <InputGroup>
                            <Form.Control
                                placeholder="CUSTOMER PHONE NO."
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={handleCustPhone}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                {/* CART LIST */}
                <Row>
                    <Col>
                        <div className='cTable' style={{ caretColor: "transparent", width: "100%", overflowY: "scroll", overflowX: "scroll" }}>
                            <Table striped bordered hover style={{ cursor: "pointer", }}>
                                <thead className="sticky-top" style={{ zIndex: "1", backdropFilter: "blur(5px)" }}>
                                    <tr style={{ textAlign: "center" }}>
                                        <th>S.No.</th>
                                        <th></th>
                                        <th>MAKER</th>
                                        <th>ITEM ID</th>
                                        <th>DESCRIPTION</th>
                                        <th>APPLICATION</th>
                                        <th>MRP</th>
                                        <th>NEW MRP </th>
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
                                                <td>
                                                    <span>
                                                        <button style={{ border: ".09rem solid black" }} onClick={() => { rList(e.data["ITEMS_REF"]) }}>
                                                            -
                                                        </button>
                                                    </span>
                                                </td>
                                                <td>{e.data.MAKE}</td>
                                                <td>{e.item}</td>
                                                <td>{e.data.Descripation}</td>
                                                <td>{e.data.APPLICATION}</td>
                                                <td>{e.data["PUR"]}</td>
                                                <td>{e.data["MRP"]}</td>
                                                <td>
                                                    <input style={{ width: "100%", caretColor: "auto", textAlign: 'center', overflowX: "scroll" }} name="quantity" type="number"
                                                        onBlur={(eve) => blurQty(eve, e.item)} onChange={eve => handleQty(eve, e.data["ITEMS_REF"])} value={e.qty} min={1} />
                                                </td>
                                                <td width="100"><div style={{ width: "100%" }}>{e.data["MRP"] * e.qty}</div></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>

                {/* BILL BUTTON */}
                <Row>
                    <Col className="text-end ">
                        <div>
                            <Button onClick={moveToBill}>View Bill</Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* bill */}
        
            <UserBillModal custphone={custPhone} print={handlePrint} ref={printRef} clist={cList} loc={loc} show={modalShow} onHide={() => setModalShow(false)} />
           
            
        </>
    )
}