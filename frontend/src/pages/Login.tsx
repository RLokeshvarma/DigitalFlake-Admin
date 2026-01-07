import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { loginApi, forgotPasswordApi } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import illustration from "../assets/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginApi(email, password);
    login(res.data.token);
    navigate("/");
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPasswordApi(email);
    setMessage("Reset link sent to your email");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f2eefe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
        }}
      >
        {/* LEFT CARD */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "380px", padding: "30px" }}>
            <div className="text-center mb-4">
              <img src={logo} alt="logo" height={40} />
              <p className="text-muted mt-2">
                Welcome to Digitalflake admin
              </p>
            </div>

            {!showForgot ? (
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Label className="floating-label">
                    Email-id
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2 position-relative">
                  <Form.Label className="floating-label">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="text-end mb-3">
                  <span
                    style={{ cursor: "pointer", color: "#6f2dbd" }}
                    onClick={() => setShowForgot(true)}
                  >
                    Forgot Password?
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-100"
                  style={{ backgroundColor: "#6f2dbd", border: "none" }}
                >
                  Log in
                </Button>
              </Form>
            ) : (
              <Form onSubmit={handleForgotPassword}>
                <h6 className="text-center mb-3">
                  Did you forget password?
                </h6>
                <p className="text-muted text-center">
                  Enter your email address and we’ll send you a link to restore
                  password
                </p>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                {message && (
                  <p className="text-success text-center">{message}</p>
                )}

                <Button
                  type="submit"
                  className="w-100 mb-2"
                  style={{ backgroundColor: "#6f2dbd", border: "none" }}
                >
                  Request reset link
                </Button>

                <div className="text-center">
                  <span
                    style={{ cursor: "pointer", color: "#6f2dbd" }}
                    onClick={() => setShowForgot(false)}
                  >
                    Back to login
                  </span>
                </div>
              </Form>
            )}
          </Card>
        </div>

        {/* RIGHT IMAGE */}
        <div className="text-center">
          <img
            src={illustration}
            alt="illustration"
            style={{ width: "80%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
