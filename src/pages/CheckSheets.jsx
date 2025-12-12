// src/pages/CheckSheets.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listChecksheets, deleteChecksheet } from "../api/checksheetAPI";
import "../styles/checksheet.css";

export default function CheckSheets() {
  const [list, setList] = useState([]);
  const nav = useNavigate();

  async function load() {
    const data = await listChecksheets();
    setList(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!window.confirm("Delete this checksheet?")) return;
    await deleteChecksheet(id);
    load();
  }

  return (
    <div className="checksheet-container">
      <h2>Delivery CheckSheets</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <Link to="/checksheets/new">
          <button className="btn primary">Create New</button>
        </Link>
        <button className="btn" onClick={load}>
          Refresh
        </button>
      </div>

      <table className="checksheet-table" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Dealer</th>
            <th>Logistics</th>
            <th>#Rows</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 && (
            <tr>
              <td colSpan="7">No checksheets yet.</td>
            </tr>
          )}
          {list.map((s) => (
            <tr key={s.id}>
              <td>{s.invoiceNo || "—"}</td>
              <td>{s.dealerName || "—"}</td>
              <td>{s.logisticPartnerName || "—"}</td>
              <td>{(s.rows || []).length}</td>
              <td>{s.status}</td>
              <td>
                {s.updatedAt ? new Date(s.updatedAt).toLocaleString() : "—"}
              </td>
              <td style={{ display: "flex", gap: 6 }}>
                <button
                  className="btn"
                  onClick={() => nav(`/checksheets/${s.id}/edit`)}
                >
                  Edit
                </button>
                <Link
                  to={`/checksheets/${s.id}/edit`}
                  state={{ viewOnly: true }}
                >
                  <button className="btn">View</button>
                </Link>
                <button className="btn danger" onClick={() => remove(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
