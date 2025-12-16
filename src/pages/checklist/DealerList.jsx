import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DealerList() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checklists")) || [];
    setLists(data);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Delivery Checklists</h2>

      <Link to="/checksheets/create">
        <button>Create New Checklist</button>
      </Link>

      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Dealer</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {lists.map((item) => (
            <tr key={item.id}>
              <td>{item.dealer.name}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>
                <Link to={`/checksheets/order/${item.id}`}>Open</Link>
              </td>
            </tr>
          ))}

          {lists.length === 0 && (
            <tr>
              <td colSpan="3" align="center">
                No checklists created
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DealerList;
