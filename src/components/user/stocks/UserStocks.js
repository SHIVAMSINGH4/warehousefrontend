import { Container, Row, Col, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import * as ai from "react-icons/ai";
import "./stocks.css";
import { getAllProducts, getOneProduct } from '../../../api/Api';
import { useContext } from 'react';
import { MainContext } from '../../../context/Context';

export default function UserStocks() {   
    const [data, setData] = useState() // state for data 
    useEffect(() => {           //data fetch
        console.log(data)
    }, [data])
    const loc = JSON.parse(sessionStorage.getItem("userinfo")).store //location get from session storage
    const { cart } = useContext(MainContext)   //cartCount  


    //search items functions
    var searchD = {}; //filtered data on search
    const [sItem, setSItem] = useState()     //sItem/search item==stockitem   
    const [q, setQ] = useState("")     //keywords being typed in search box input
    function handleSChange(e) {    //search values on change in search tab input
        const q = e.target.value
        setQ(q)
    }
    async function search(e) {  //on click search button data fetch from server for one product
        const id = q;        
        await getOneProduct(id, loc).then(x => setSItem(x))
    }
    useEffect(() => {   //then store that one product to sesssion storage everytime on click search
        if (!sItem && sessionStorage.getItem("searchItem")) { //reload product in stock from session if exists (during component re-render)            
            setSItem(JSON.parse(sessionStorage.getItem("searchItem")))
        }
        if (sItem) {  //stock item on every search and every re render of stock component
            sessionStorage.setItem("searchItem", JSON.stringify(sItem))            
        }      
    }, [sItem])   


    const [cartList, setCartList] = useState()      //state of array of items for cart using session storage
    const [ItemId, setItemId] = useState()      //state for item ref. for cart using session storage  
    const [listData, setListData] = useState() //data of cartlist items to be used in cartList in cart section
    useEffect(() => {               //setting cartlist by adding item from search table                 
        if (ItemId && !cartList) {    //on first cartList item
            setCartList([ItemId])
        }
        if (ItemId && cartList) {         //on adding item in cartList after first cartList item
            var counter = 0;
            cartList.forEach(i => {
                if (i == ItemId) {
                    counter += 1;
                }
            })
            if (counter == 0) {
                setCartList([...cartList,ItemId])
            }
        }
    }, [ItemId])
    useEffect(() => {           //cartlist connection with session storage
        if (cartList) {         //setting cart list in session storage            
            sessionStorage.setItem("cartList", JSON.stringify(cartList))
            cart.setCartCount(cartList.length)
        }
        if (!cartList && sessionStorage && sessionStorage.getItem("cartList")) {   //setting cart list by session storage
            setCartList(JSON.parse(sessionStorage.getItem("cartList")))
        }
        if (!ItemId && cartList) {        //set cart item after stock comp reload to avoid adding duplicate item in cartList
            setItemId(cartList[cartList.length - 1])
        }
    }, [cartList])
    useEffect(() => {
        if(!listData&&sessionStorage.getItem("cartListData")){
            setListData(JSON.parse(sessionStorage.getItem("cartListData")))
        }
        if (listData) {
            sessionStorage.setItem("cartListData", JSON.stringify(listData))
        }

    }, [listData])
    function addItemCart(eve,id,data) {      //setting itemId  in this function
        if (!ItemId) {
            setItemId(id)
            setListData([data])
        }
        else {
            var counter = 0;
            cartList.forEach(e => {
                if (e == id) {
                    counter += 1;
                }
            })
            if (counter == 0) {
                setItemId(id)
                setListData([...listData, data])                                         
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
                                        <th colSpan={5}>{loc == "GGN_001" ? "GURUGRAM" : '' || loc == "MUN_001" ? "MUNDKA" : '' || loc == "DEL_001" ? "DELHI" : ''}</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <th>MAKER</th>
                                        <th>ITEMS REF</th>
                                        <th></th>
                                        <th ></th>
                                        <th >QUANTITY</th>
                                        <th>OLD MRP</th>
                                        <th>NEW MRP</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {sItem  &&sItem.map((e,i)=>{
                                        return(
                                        <tr key={i}>
                                            <td>{e.MAKE}</td>
                                            <td>{e.ITEMS_REF}</td>
                                            <td></td>
                                            <td>
                                                <Button onClick={eve=>addItemCart(eve,e.ITEMS_REF,e)}>
                                                    +
                                                </Button>
                                            </td>
                                            <td>{e.QTY}</td>
                                            <td>{e.PUR}</td>
                                            <td>{e.MRP}</td>
                                            <td></td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                        {/* ITEMS DESCRIPTION */}
                        <div className='stable' style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                            <Table striped bordered hover variant='light' >
                                <tbody>
                                    <tr>
                                        <th>DESCRIPTION</th>
                                        <td>{sItem && sItem[0].Descripation}</td>
                                    </tr >
                                    <tr>
                                        <th>APPLICATION</th>
                                        <td>{sItem && sItem[0].APPLICATION}</td>
                                    </tr>
                                    <tr>
                                        <th>O.E. REF</th>
                                        <td>{sItem && sItem[0]["OE_REF"]}</td>
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