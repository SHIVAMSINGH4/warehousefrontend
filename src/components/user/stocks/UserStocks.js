import { Container, Row, Col, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import * as ai from "react-icons/ai";
import "./stocks.css"
import { getAllProducts, getOneProduct } from '../../../api/Api';

export default function UserStocks() {
    //data fetch
    const [data, setData] = useState()
    // const callData = async () => {
    //     const d = await getAllProducts();
    //     setData([...d])
    // };
    // useEffect(() => {        
    //     callData()        
    // }, [])
    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    //filtered data on search
    var searchD = {};

    // input box function 
    var result = [];
    const [sInput, setInput] = useState([{ keywords: "" }])
    // const handleChange = function (event) {
    //     searchD = { [event.target.name]: event.target.value }
    //     if (searchD.keywords != "") {
    //         handleShow();
    //         result = data.filter(e => {
    //             return e.sapref.toLowerCase().startsWith(searchD.keywords)
    //         })
    //         setInput(result)
    //     };
    //     if (searchD.keywords == "") {
    //         setInput([searchD])
    //         handleClose();
    //     }
    //     console.log(result);
    // }

    //search box
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // useEffect(() => {
    //     var searchbox = document.getElementsByClassName("searchbox")[0];
    //     var card = document.getElementsByClassName("cad")[0];
    //     var stable = document.getElementsByClassName("stable")[0];
    //     if (show == true) {
    //         searchbox.style.display = "block";
    //         card.classList.add("anime");
    //         stable.style.height = "35vh"
    //     }
    //     if (show == false) {
    //         setTimeout(() => {
    //             searchbox.style.display = "none";
    //         }, 100);
    //         card.classList.remove("anime");
    //         stable.style.height = "79vh"
    //     }

    // }, [sInput, show]);

    // item desc box

    // const [showVbox, setVbox] = useState(false);
    // const [Vdata, setVdata] = useState({});
    // function view(i) {
    //     setVdata(data[i]);
    //     setVbox(true);
    // }

    //search item

    const [sItem, setSItem] = useState()      //search items functions
    const [sItemList,setSItemList] = useState()     //search items list to be used in cartList in cart section
    const [q, setQ] = useState("")          //keywords being typed in search box input
    function handleSChange(e) {     //search values on change in search tab input
        const q = e.target.value    
        setQ(q)
        // data.filter(ele => {
        //     for (let key in ele) {
        //         if (ele[`${key.toLowerCase()}`] == q.toLowerCase()) {
        //             console.log(key)
        //             // setSItem([...sItem])
        //         }
        //     }
        // })
    }

    async function search(e) {          //on click search button data fetch from server for one product
        const id = q;
        // setSItem(data)
        await getOneProduct(q).then(x => setSItem(x))                
    }
    useEffect(() => {      //then store that one product to sesssion storage everytime on click search
        if(sItem){
            sessionStorage.setItem("sItem",JSON.stringify(sItem)) 
            setSItemList([sItem])
            console.log("sItem1")
        }
        if(sItem&&sItemList){
            setSItemList([...sItemList,sItem])
        }
        if(!sItem&&sessionStorage.getItem("sItem")){
            console.log("sItem2")
            setSItem(JSON.parse(sessionStorage.getItem("sItem")))  
        }                    
    }, [sItem])
    useEffect(()=>{
        if(sItemList){ 
            sessionStorage.setItem("srchProducts",JSON.stringify(sItemList))
        }        
    },[sItemList])


    const [cartList, setCartList] = useState()      //state of array of items to push in cart
    const [cartItem, setCartItem] = useState()      //state for item ref.     
    useEffect(() => {                                //setting cartlist by adding item from search table
        if (cartItem && !cartList) {
            setCartList([cartItem])
            console.log("Ok1")
        }
        if (cartList) {
            var counter = 0;
            if (cartList)
                cartList.forEach(i => {
                    if (i == cartItem) {
                        counter += 1;
                    }
                })
            if (counter == 0){
                console.log(cartList)
                setCartList([...cartList, cartItem])            
            }
                
        }
    }, [cartItem])
    useEffect(() => {           //cartlist connection with session storage
        if (cartList) {               //setting cart list in session storage
            sessionStorage.setItem("stockitem", JSON.stringify(cartList))
            console.log("ok3")
        }
        if (!cartList && sessionStorage && sessionStorage.getItem("stockitem")) {    //setting cart list in session storage
            setCartList(JSON.parse(sessionStorage.getItem("stockitem")))
            console.log("ok4")
        }
    }, [cartList])

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
                        </Row>
                    </Col>
                </Row>


                {/* search box */}
                {/* <Row>
                    <Col>
                        <div className='searchbox cad' style={{ borderRadius: "1rem", backgroundColor: "lightgray", width: "100%" }} >
                            {/* close button
                            <div style={{ width: "98%", display: "inline-block" }}></div>
                            <div style={{ width: "1%", display: "inline-block" }}>
                                <span className="closebtn" onClick={handleClose}>
                                    <ai.AiOutlineClose size=".9rem" />
                                </span>
                            </div>

                            {/* search table */}
                {/* <div style={{ width: "100%", marginBottom: "0.5rem", height: "auto", overflowY: "scroll", overflowX: "scroll", }}>
                                <Table striped bordered variant="dark" hover responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>SAPREF</th>
                                            <th>ITEMS REF</th>
                                            <th>O.E. REF.</th>
                                            <th>MEYLE REF.</th>
                                            <th>Ref. Id</th>
                                            <th>MAHLE REF.</th>
                                            <th>MAAN REF.</th>
                                            <th>HENGEST/OTH</th>
                                            <th>OTHER REF</th>
                                            <th>DESCRIPTION</th>
                                            <th>APPLICATION</th>
                                            <th>LOC</th>
                                            <th>QUANTITY</th>
                                            <th>MRP</th>
                                            <th>MAKE</th>
                                            <th>NEW MRP</th>
                                            <th>P COST</th>
                                            <th>OP BALANCE</th>
                                            <th>PUR</th>
                                            <th>SALES</th>
                                            <th>MUNDKA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sInput.map((e, i) => {
                                            // console.log(v)
                                            return (
                                                <tr key={i} onClick={() => { view(i) }}>
                                                    <td >{i + 1}</td>
                                                    <td>{e.sapref}</td>
                                                    <td>{e.description}</td>
                                                    <td>{e.application}</td>
                                                    <td>{e.make}</td>
                                                    <td>{e.qty}</td>
                                                    <td>{e.mrp}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row> */}

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
                                        {sItem&& sItem.MAKER[0].LOCATION.map((ele, i) => {
                                            var loc;
                                            if (ele.BRANCH_CODE == "GGM01")
                                                loc = "GURUGRAM"
                                            else if (ele.BRANCH_CODE == "MUN01")
                                                loc = "MUNDKA"
                                            else if (ele.BRANCH_CODE == "DEL01")
                                                loc = "DELHI"
                                            return (
                                                <>
                                                    <th key={i} colSpan={5}>{loc}</th>
                                                    <th key={i + 1}></th>
                                                </>
                                            )
                                        })}
                                    </tr>
                                    <tr>
                                        <th>MAKER</th>
                                        <th>ITEMS REF</th>
                                        {sItem&& sItem.MAKER[0].LOCATION.map((ele, i) => {
                                            return (
                                                <>
                                                    <th key={i}></th>
                                                    <th key={i + 1}></th>
                                                    <th key={i + 2}>QUANTITY</th>
                                                    <th key={i + 3}>OLD MRP</th>
                                                    <th key={i + 4}>NEW MRP</th>
                                                    <th key={i + 5}></th>
                                                </>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody >
                                    {sItem && sItem.MAKER.map((e, i) => {
                                        return (
                                            <>
                                                <tr     >
                                                    <td>{e.BRAND_NAME}</td>
                                                    <td>{e.ITEMS_REF}</td>
                                                    {e.LOCATION.map((ele, j) => {
                                                        return (
                                                            <>
                                                                <td></td>
                                                                <td></td>
                                                                <td>{ele.STOCK.QUANTITY}</td>
                                                                <td>{ele.STOCK["OLD_MRP"]}</td>
                                                                <td>{ele.STOCK["NEW_MRP"]}</td>
                                                                <td style={{ padding: "0" }} width="30">
                                                                    <div style={{}} className="addbtn " onClick={() => { setCartItem(e.ITEMS_REF) }} >
                                                                        +
                                                                    </div>
                                                                </td>
                                                            </>
                                                        )
                                                    })}
                                                </tr>
                                            </>)
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

            {/* view stock component */}

            {/* <Modal
                show={showVbox}
                onHide={() => { setVbox(false); console.log(Vdata) }}
                // dialogClassName="modal-90w"
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        view stock
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ width: "100%", overflowY: "scroll", overflowX: "auto" }}>
                    <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>SAPREF</th>
                                <th>ITEMS REF</th>
                                <th>O.E. REF.</th>
                                <th>MEYLE REF.</th>
                                <th>Ref. Id</th>
                                <th>MAHLE REF.</th>
                                <th>MAAN REF.</th>
                                <th>HENGEST/OTH</th>
                                <th>OTHER REF</th>
                                <th>DESCRIPTION</th>
                                <th>APPLICATION</th>
                                <th>LOC</th>
                                <th>QUANTITY</th>
                                <th>MRP</th>
                                <th>MAKE</th>
                                <th>NEW MRP</th>
                                <th>P COST</th>
                                <th>OP BALANCE</th>
                                <th>PUR</th>
                                <th>SALES</th>
                                <th>MUNDKA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>{Vdata.sapref}</td>
                                <td>{Vdata.description}</td>
                                <td>{Vdata.application}</td>
                                <td>{Vdata.make}</td>
                                <td>{Vdata.qty}</td>
                                <td>{Vdata.mrp}</td>
                                {/* <td><button value={i} onClick={deldata}>-</button></td> 
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
             </Modal> */}
        </>
    )
}