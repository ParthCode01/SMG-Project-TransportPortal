import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>SMG Portal</h2>

      <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      <Link to="/request" style={styles.link}>Request Vehicle</Link>
      <Link to="/track" style={styles.link}>Track Vehicle</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#1e1e2f",
    height: "100vh",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  logo: {
    marginBottom: "30px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "6px",
    background: "#2a2a3e",
  }
};

export default Sidebar;
