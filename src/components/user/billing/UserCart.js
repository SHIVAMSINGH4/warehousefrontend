import { useReducer, useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row, InputGroup, Form, Dropdown } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import UserBillModal from "./UserBill";
import db from "../../../db.json";
import Card from 'react-bootstrap/Card';
import * as ai from "react-icons/ai";
import { MainContext } from "../../../context/Context";

export default function UserCart() {
    //context data
    const { cart } = useContext(MainContext)

    //data for cart list
    const [data, setData] = useState();         //data state (cartList data)
    const [itemId, setItemId] = useState();     //cartList item id of products
    const [loc, setLoc] = useState();            //location of store
    useEffect(() => {       //cartlist update on page or page reload/ component render
        if (sessionStorage.getItem("cartListItems")) {
            setItemId(JSON.parse(sessionStorage.getItem("cartListItems")))
            setData(JSON.parse(sessionStorage.getItem("cartListData")))
        }
        if (sessionStorage.getItem("userinfo")) {
            setLoc(JSON.parse(sessionStorage.getItem("userinfo")).store)
        }
    }, [])

    //cart list
    var b;
    const [cList, setCList] = useState();     //array of objects having data nd quantity for cart
    function updateList() {      //add item in Clist 
        let newItem = {};
        console.log(itemId)
        if (itemId && itemId.length == 0) {
            setCList()
            console.log("nahi h item id")
        }
        else {
            itemId && itemId.forEach(y => {         //loop on itemId/cartList
                console.log("ok3")
                data && data.forEach((e) => {       //loop on data/cartListData
                    e.MAKER.forEach(x => {
                        if (x.ITEMS_REF == y) {
                            newItem = { data: e, item: y, qty: 1 }
                            if (!cList) {                   //set cList if  cList empty
                                setCList([newItem])
                                console.log("ok1")
                            }
                            else {
                                var counter = 0;
                                cList.forEach(z => {
                                    if (z.item == y)
                                        counter += 1
                                    console.log("ok9")
                                })
                                if (counter == 0) {
                                    setCList([...cList, newItem])
                                    console.log("ok2")
                                }
                            }
                        }
                    })
                })
            })
        }
    }
    function rList(id) {                          //remove item in list        
        var a = [...itemId.filter(e => e != id)]
        sessionStorage.setItem("cartListItems", JSON.stringify(a))
        cart.setCartCount(JSON.parse(sessionStorage.getItem("cartListItems")).length)
        setItemId(JSON.parse(sessionStorage.getItem("cartListItems")))
        setCList()
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
                }
            })
            setCList([...obj])
        }
    }

    //show cartlist after render cart component
    useEffect(() => {
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
        setModalShow(true)
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
                            // onChange={{ cphone }}
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
                                        let maker;
                                        let loca;
                                        e.data.MAKER.forEach(x => {
                                            if (x.ITEMS_REF == e.item) {
                                                maker = x
                                            }
                                            x.LOCATION.forEach(y => {
                                                if (y.BRANCH_CODE == loc) {
                                                    loca = y
                                                }
                                            })

                                        });

                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div style={{ display: "inline-block", width: "50%" }}>{i + 1}</div>
                                                </td>
                                                <td>
                                                    <span>
                                                        <button style={{ border: ".09rem solid black" }} onClick={() => { rList(maker["ITEMS_REF"]) }}>
                                                            -
                                                        </button>
                                                    </span></td>
                                                <td>{maker.BRAND_NAME}</td>
                                                <td>{e.item}</td>
                                                <td>{e.data.Descripation}</td>
                                                <td>{e.data.APPLICATION}</td>
                                                <td>{loca && loca.STOCK["OLD_MRP"]}</td>
                                                <td>{loca && loca.STOCK["NEW_MRP"]}</td>
                                                <td>
                                                    <input style={{ width: "100%", caretColor: "auto", textAlign: 'center', overflowX: "scroll" }} name="quantity" type="number"
                                                        onBlur={(eve) => blurQty(eve, i)} onChange={eve => handleQty(eve, maker["ITEMS_REF"])} value={e.qty} min={1} />
                                                </td>
                                                <td width="100"><div style={{ width: "100%" }}>{loca.STOCK["NEW_MRP"] * e.qty}</div></td>
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
            <UserBillModal clist={cList} loc={loc} show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}