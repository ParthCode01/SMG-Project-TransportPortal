function Navbar() {
  return (
    <div style={styles.navbar}>
      <h3>Transport Portal Dashboard</h3>
    </div>
  );
}

const styles = {
  navbar: {
    width: "100%",
    background: "#f5f5f5",
    padding: "15px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  }
};

export default Navbar;
