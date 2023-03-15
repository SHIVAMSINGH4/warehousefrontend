import { Container, Row, Col, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import * as ai from "react-icons/ai";
import "./stocks.css"
import { getAllProducts, getOneProduct } from '../../../api/Api';
import { useContext } from 'react';
import { MainContext } from '../../../context/Context';

export default function UserStocks() {
    //data fetch
    const [data, setData] = useState()

    //location get from session storage
    const loc = JSON.parse(sessionStorage.getItem("userinfo")).store

    //cartCount
    const { cart } = useContext(MainContext)

    useEffect(() => {
        console.log(data)
    }, [data])

    //filtered data on search
    var searchD = {};

    //search items functions
    const [sItem, setSItem] = useState()     //sItem/search item==stockitem
    const [sItemList, setSItemList] = useState() //search items list to be used in cartList in cart section
    const [q, setQ] = useState("")     //keywords being typed in search box input
    function handleSChange(e) {    //search values on change in search tab input
        const q = e.target.value
        setQ(q)
    }

    async function search(e) {  //on click search button data fetch from server for one product
        const id = q;
        console.log(q)
        await getOneProduct(id, loc).then(x => setSItem(x))
    }
    useEffect(() => {   //then store that one product to sesssion storage everytime on click search
        if (!sItem && sessionStorage.getItem("stockItem")) { //reload product in stock from session if exists (during component re-render)            
            setSItem(JSON.parse(sessionStorage.getItem("stockItem")))
        }
        if (sItem && !sItemList) {  //stock item on every search and every re render of stock component
            sessionStorage.setItem("stockItem", JSON.stringify(sItem))
            setSItemList([sItem])
        }
        if (sItem && sItemList) {   //check if product exists in cartList or not(on new search)
            var counter = 0;
            // sItemList.forEach(e => {
            //     e.MAKER.forEach(ele => {
            //         sItem.MAKER.forEach(x => {
            //             if (ele.ITEMS_REF == x.ITEMS_REF) {
            //                 counter += 1;
            //             }
            //         })
            //     })
            // })
            if (counter == 0) {
                setSItemList([...sItemList, sItem])
                console.log("cartListProducts updates")
            }
            if (counter > 0) {
                console.log("cartListProducts already exist")
            }
        }
    }, [sItem])
    useEffect(() => {
        if (sItemList) {
            sessionStorage.setItem("cartListData", JSON.stringify(sItemList))
        }

    }, [sItemList])


    const [cartList, setCartList] = useState()      //state of array of items for cart using session storage
    const [cartItem, setCartItem] = useState()      //state for item ref. for cart using session storage  
    useEffect(() => {               //setting cartlist by adding item from search table                 
        if (cartItem && !cartList) {    //on first cartList item
            setCartList([cartItem])
        }
        if (cartItem && cartList) {         //on adding item in cartList after first cartList item
            var counter = 0;
            cartList.forEach(i => {
                if (i == cartItem) {
                    counter += 1;
                }
            })
            if (counter == 0) {
                setCartList([...cartList, cartItem])
            }
        }
    }, [cartItem])
    useEffect(() => {           //cartlist connection with session storage
        if (cartList) {         //setting cart list in session storage
            sessionStorage.setItem("cartListItems", JSON.stringify(cartList))
            cart.setCartCount(cartList.length)
        }
        if (!cartList && sessionStorage && sessionStorage.getItem("cartListItems")) {   //setting cart list by session storage
            setCartList(JSON.parse(sessionStorage.getItem("cartListItems")))
        }
        if (!cartItem && cartList) {        //set cart item after stock comp reload to avoid adding duplicate item in cartList
            setCartItem(cartList[cartList.length - 1])
        }
    }, [cartList])

    function addItemCart(id) {      //setting cartItem  in this function
        if (!cartItem) {
            setCartItem(id)
        }
        else {
            var counter = 0;
            cartList.forEach(e => {
                if (e == id) {
                    counter += 1;
                }
            })
            if (counter == 0) {
                setCartItem(id)
            }
            else {
                alert("this item is already in cart list")
            }
        }
    }



    return (
        <>
            <Container fluid id='main'>
                {/* header */}
                <Row>
                    <Col className='text-center'>
                        <Row>
                            <div style={{ caretColor: "transparent", cursor: "pointer", marginTop: ".2%", width: "100%", paddingLeft: "35%", position: "fixed", zIndex: "1", backgroundColor: "white", height: "6%" }}>
                                <div style={{ width: "18%" }}>
                                    <h2 style={{ marginBottom: "-0.1rem" }}>Stocks</h2>
                                    <div style={{ margin: "auto", display: "block", width: "100%", height: "0.1rem", backgroundColor: "black" }}></div>
                                </div>
                            </div>
                        </Row>

                        {/* search input */}
                        <Row className="justify-content-center p-1 mb-1" style={{ borderRadius: ".5rem", marginTop: "4.2%", backgroundColor: "#428BCA" }}  >
                            <Col sm="5">
                                <InputGroup >
                                    <Form.Control
                                        placeholder="Search Item"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={handleSChange}
                                        name="keywords"
                                        autoComplete='disabled'
                                    />
                                </InputGroup>

                            </Col>
                            <Col sm="1"><Button variant="light" onClick={search}>Search</Button></Col>
                            <Col >
                                <Button variant="light" id="button-addon2">
                                    SCAN
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* stocks table */}
                <Row>
                    <Col >
                        {/* ITEMS TABLE */}
                        <div className='stable' style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                            <Table bordered hover striped variant='light'>
                                <thead>
                                    <tr className="text-center">
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th colSpan={5}>{`${"GURUGRAM"?loc=="GGN_001":"MUNDKA"?loc=="MUN_001":"DELHI"?loc=="DEL_001":"NULL"}`}</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <th>MAKER</th>
                                        <th>ITEMS REF</th>
                                        {/* {sItem && sItem.LOC.map((ele, i) => {
                                            return (
                                                <>
                                                    <th key={i}></th>
                                                    <th key={i + 1}></th>
                                                    <th key={i + 2}>sItem.QUANTITY</th>
                                                    <th key={i + 3}>SiTEMOLD MRP</th>
                                                    <th key={i + 4}>NEW MRP</th>
                                                    <th key={i + 5}></th>
                                                </>
                                            )
                                        })} */}
                                    </tr>
                                </thead>
                                <tbody >
                                   
                                </tbody>
                            </Table>
                        </div>
                        {/* ITEMS DESCRIPTION */}
                        <div className='stable' style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                            <Table striped bordered hover variant='light' >
                                <tbody>
                                    <tr>
                                        <th>DESCRIPTION</th>
                                        <td>{sItem && sItem.Descripation}</td>
                                    </tr >
                                    <tr>
                                        <th>APPLICATION</th>
                                        <td>{sItem && sItem.APPLICATION}</td>
                                    </tr>
                                    <tr>
                                        <th>O.E. REF</th>
                                        <td>{sItem && sItem["OE_REF"]}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}