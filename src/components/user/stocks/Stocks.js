import { Container, Row ,Col} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import db from "../../../db.json";

export default function Stocks() {
    const data = db.stock;
    // console.log(data)
    return (
        <>
            <Container fluid id='main'>
                <Col className='text-center'>
                    <h1>
                        Stocks
                    </h1>
                    <div style={{ marginLeft: "40%", marginBottom: "1%", display: "block", width: "20%", height: "0.2rem", backgroundColor: "black" }}></div>
                    <Row className="text-justify">
                    <div style={{ backgroundColor: "#428BCA" }}>
                        <input name="scan"  placeholder="search items" ></input>
                        <button>search</button>
                    </div>
                </Row>
                </Col>
                <Row>
                    <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Ref. Id</th>
                                <th>Desciption</th>
                                <th>Application</th>
                                <th>Maker</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td >{i + 1}</td>
                                        <td>{v.sapref}</td>
                                        <td>{v.description}</td>
                                        <td>{v.application}</td>
                                        <td>{v.make}</td>
                                        <td>{v.qty}</td>
                                        <td>{v.mrp}</td>
                                        {/* <td><button value={i} onClick={deldata}>-</button></td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}