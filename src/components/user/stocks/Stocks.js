import { Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import SideNav from '../../sidenav/SideNav';

export default function Stocks() {
    return (
        <>
            <SideNav />
            <Container id='main'>
                <Row>
                    <Table striped bordered hover>
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
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}