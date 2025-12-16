import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>SMG Portal</h2>

      <NavLink
        to="/dashboard"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/request"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        Request Vehicle
      </NavLink>
      <NavLink
        to="/track"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        Track Vehicle
      </NavLink>

      {/* COMPANY-ONLY DELIVERY CHECKSHEET */}
      <NavLink
        to="/checksheets"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        Delivery CheckSheets
      </NavLink>

      {/* PDI */}
      <NavLink
        to="/pdi"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        PDI Inspection
      </NavLink>

      {/* LOGISTICS */}
      <NavLink
        to="/logistics"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        Logistics Dashboard
      </NavLink>
      <NavLink
        to="/logistics/add-partner"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        Add Partner
      </NavLink>
      <NavLink
        to="/logistics/manage-partners"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        Manage Partners
      </NavLink>
      <NavLink
        to="/logistics/request"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        Request Transport
      </NavLink>
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
    gap: "14px",
  },
  logo: {
    marginBottom: "25px",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    background: "#2a2a3e",
    fontSize: "14px",
  },
  activeLink: {
    color: "white",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    background: "#4f46e5",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default Sidebar;
