import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const AdminLayout = () => {
  return (
    <>
      <TopNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0 bg-light vh-100">
            <Sidebar />
          </Col>
          <Col md={10} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
