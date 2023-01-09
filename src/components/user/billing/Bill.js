import { Container, Row } from "react-bootstrap";
import SideNav from "../../sidenav/SideNav";

export default function Bill() {
    return (
        <>
            <SideNav />
            <Container fluid id="main">
                <Row>
                    <h1>Bill component</h1>
                </Row>
            </Container>
        </>
    )
}