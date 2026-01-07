import { Navbar, Container, Image, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-nav.png";
import profile from "../assets/profile.png";

const TopNavbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "#6f2dbd" }} variant="dark">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <img src={logo} alt="logo" height={30} />
          </Navbar.Brand>

          <Image
            src={profile}
            roundedCircle
            height={35}
            style={{ cursor: "pointer" }}
            onClick={() => setShowLogout(true)}
          />
        </Container>
      </Navbar>

      {/* LOGOUT POPUP */}
      <Modal show={showLogout} onHide={() => setShowLogout(false)} centered>
        <Modal.Body className="text-center">
          <h6 className="mb-3">⚠️ Log Out</h6>
          <p>Are you sure you want to log out?</p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="secondary" onClick={() => setShowLogout(false)}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#6f2dbd", border: "none" }}
              onClick={handleConfirmLogout}
            >
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TopNavbar;
