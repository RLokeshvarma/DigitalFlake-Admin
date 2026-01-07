import logo from "../assets/logo.png";

const Dashboard = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="logo" height={50} />
      <h5 className="mt-3">Welcome to Digitalflake admin</h5>
    </div>
  );
};

export default Dashboard;
