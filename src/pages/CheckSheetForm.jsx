import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckSheetRow from "../components/CheckSheetRow";
import {
  createChecksheet,
  getChecksheet,
  updateChecksheet,
} from "../api/checksheetAPI";
import "../styles/checksheet.css";

const blankRow = () => ({
  modelName: "",
  chassisNo: "",
  batteryNumber: "",
  company: {
    mirrors: false,
    medicalKit: false,
    toolKit: false,
    chargers: false,
    keys: false,
  },
  logistics: {
    mirrors: false,
    medicalKit: false,
    toolKit: false,
    chargers: false,
    keys: false,
  },
  dealer: {
    mirrors: false,
    medicalKit: false,
    toolKit: false,
    chargers: false,
    keys: false,
  },
  comments: "",
});

export default function CheckSheetForm() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    invoiceNo: "",
    dealerCode: "",
    dealerName: "",
    logisticPartnerName: "",
    dateOfDispatch: "",
    stockyardNumber: "",
    resourcePerson: "",
    truckNo: "",
    rows: [blankRow()],
    companyStatus: "pending",
    logisticsStatus: "pending",
    dealerStatus: "pending",
    finalStatus: "in_progress",
    createdAt: null,
    updatedAt: null,
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("company");

  const roleLocked = {
    company: form.companyStatus === "done" || form.finalStatus === "finalized",
    logistics:
      form.logisticsStatus === "done" || form.finalStatus === "finalized",
    dealer: form.dealerStatus === "done" || form.finalStatus === "finalized",
  };

  // Load existing checksheet
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getChecksheet(id).then((data) => {
      if (data) {
        setForm((prev) => ({
          ...prev,
          ...data,
          companyStatus: data.companyStatus || prev.companyStatus,
          logisticsStatus: data.logisticsStatus || prev.logisticsStatus,
          dealerStatus: data.dealerStatus || prev.dealerStatus,
          finalStatus: data.finalStatus || prev.finalStatus,
        }));
      }
      setLoading(false);
    });
  }, [id]);

  // Update field
  const setField = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));

  // Row changes
  const handleRowChange = (idx, path, value) => {
    const parts = path.split(".");
    const group = parts.length > 1 ? parts[0] : null;

    // Locks
    if (group && ["company", "logistics", "dealer"].includes(group)) {
      if (roleLocked[group] || activeTab !== group) return;
    } else {
      if (activeTab !== "company" || roleLocked.company) return;
    }

    setForm((prev) => {
      const rows = prev.rows.map((r) => ({ ...r }));
      if (parts.length === 1) rows[idx][parts[0]] = value;
      else {
        const [, key] = parts;
        rows[idx][group] = { ...rows[idx][group], [key]: value };
      }
      return { ...prev, rows, updatedAt: new Date().toISOString() };
    });
  };

  // Add / Remove rows (company only)
  const addRow = () => {
    if (activeTab !== "company" || form.finalStatus === "finalized") return;
    setForm((prev) => ({ ...prev, rows: [...prev.rows, blankRow()] }));
  };

  const removeRow = (idx) => {
    if (activeTab !== "company" || form.finalStatus === "finalized") return;
    setForm((prev) => ({
      ...prev,
      rows: prev.rows.filter((_, i) => i !== idx),
    }));
  };

  // Save form
  const save = async () => {
    if (!form.invoiceNo || !form.dealerName) {
      alert("Invoice and Dealer required");
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await updateChecksheet(id, form);
        alert("Saved successfully");
      } else {
        const created = await createChecksheet(form);
        setForm(created);
        nav(`/checksheets/${created.id}/edit`);
      }
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
    setLoading(false);
  };

  // Stage finalize
  const finalizeStage = async (stage) => {
    if (!window.confirm(`Finalize ${stage.toUpperCase()} stage?`)) return;

    const statusKey = stage + "Status";
    const updated = {
      ...form,
      [statusKey]: "done",
      updatedAt: new Date().toISOString(),
    };
    if (
      updated.companyStatus === "done" &&
      updated.logisticsStatus === "done" &&
      updated.dealerStatus === "done"
    ) {
      updated.finalStatus = "finalized";
    }

    setForm(updated);
    setLoading(true);
    try {
      if (id) await updateChecksheet(id, updated);
      else await createChecksheet(updated);
      alert(`${stage.toUpperCase()} finalized`);
    } catch (err) {
      console.error(err);
      alert("Finalize failed");
    }
    setLoading(false);
  };

  // Finalize all
  const finalizeAll = async () => {
    if (!window.confirm("Finalize entire sheet?")) return;
    const updated = {
      ...form,
      finalStatus: "finalized",
      updatedAt: new Date().toISOString(),
    };
    setForm(updated);
    setLoading(true);
    try {
      if (id) await updateChecksheet(id, updated);
      else await createChecksheet(updated);
      alert("Sheet fully finalized");
    } catch (err) {
      console.error(err);
      alert("Finalize failed");
    }
    setLoading(false);
  };

  // Print / PDF
  const printPreview = () => {
    const printable = document.getElementById("print-area");
    if (!printable) return alert("No printable area found");

    const win = window.open("", "_blank", "width=1000,height=800");
    win.document.write("<html><head><title>Print Checksheet</title>");
    const styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style')
    )
      .map((n) => n.outerHTML)
      .join("\n");
    win.document.write(styles + "</head><body>");
    win.document.write(printable.outerHTML);
    win.document.write("</body></html>");
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 500);
  };

  // Copy JSON
  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(form, null, 2));
    alert("JSON copied to clipboard");
  };

  // Refresh (reset or reload)
  const refreshForm = async () => {
    if (!window.confirm("Refresh form? Unsaved changes will be lost.")) return;
    if (id) {
      setLoading(true);
      const data = await getChecksheet(id);
      setForm(data || { ...form, rows: [blankRow()] });
      setLoading(false);
    } else {
      setForm({ ...form, rows: [blankRow()] });
    }
  };

  if (loading) return <div className="checksheet-container">Loading...</div>;

  return (
    <div className="checksheet-container">
      <h2>SMG ELECTRIC - Delivery Checksheet</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {["company", "logistics", "dealer"].map((tab) => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? "primary" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div>
          <strong>Company:</strong> {form.companyStatus} •{" "}
          <strong>Logistics:</strong> {form.logisticsStatus} •{" "}
          <strong>Dealer:</strong> {form.dealerStatus} • <strong>Sheet:</strong>{" "}
          {form.finalStatus}
        </div>
      </div>

      {/* Top Fields */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {["invoiceNo", "dealerCode", "dealerName", "logisticPartnerName"].map(
          (field) => (
            <input
              key={field}
              className="small-input"
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={form[field]}
              onChange={(e) => setField(field, e.target.value)}
              disabled={form.finalStatus === "finalized" || roleLocked.company}
            />
          )
        )}
      </div>

      {/* Table */}
      <div id="print-area" className="print-area" style={{ marginTop: 12 }}>
        <table className="checksheet-table" role="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Model</th>
              <th>Chassis No</th>
              <th>Battery No</th>
              <th colSpan="5">Company (sent)</th>
              <th colSpan="5">Logistics (received)</th>
              <th colSpan="5">Dealer (final)</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
            <tr>
              <th />
              <th />
              <th />
              <th />
              {Array(3)
                .fill(["Mirrors", "Med Kit", "Tool Kit", "Chargers", "Keys"])
                .flat()
                .map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {form.rows.map((r, i) => (
              <CheckSheetRow
                key={i}
                index={i}
                row={r}
                onChange={handleRowChange}
                onRemove={removeRow}
                currentRole={activeTab}
                readOnly={form.finalStatus === "finalized"}
                lockedStages={roleLocked}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="checksheet-actions" style={{ marginTop: 12 }}>
        <button
          className="btn"
          onClick={addRow}
          disabled={activeTab !== "company" || form.finalStatus === "finalized"}
        >
          Add Scooter Row
        </button>
        <button
          className="btn primary"
          onClick={save}
          disabled={form.finalStatus === "finalized"}
        >
          Save
        </button>
        <button className="btn" onClick={printPreview}>
          Print / PDF
        </button>
        <button className="btn" onClick={copyJSON}>
          Copy JSON
        </button>
        <button className="btn" onClick={refreshForm}>
          Refresh
        </button>

        {activeTab === "company" && form.companyStatus !== "done" && (
          <button
            className="btn primary"
            onClick={() => finalizeStage("company")}
          >
            Finalize Company
          </button>
        )}
        {activeTab === "logistics" && form.logisticsStatus !== "done" && (
          <button
            className="btn primary"
            onClick={() => finalizeStage("logistics")}
          >
            Finalize Logistics
          </button>
        )}
        {activeTab === "dealer" && form.dealerStatus !== "done" && (
          <button
            className="btn primary"
            onClick={() => finalizeStage("dealer")}
          >
            Finalize Dealer
          </button>
        )}

        {form.companyStatus === "done" &&
          form.logisticsStatus === "done" &&
          form.dealerStatus === "done" &&
          form.finalStatus !== "finalized" && (
            <button className="btn danger" onClick={finalizeAll}>
              Finalize Entire Sheet
            </button>
          )}

        <div style={{ flex: 1 }} />
        <button className="btn" onClick={() => nav("/checksheets")}>
          Back to list
        </button>
      </div>
    </div>
  );
}
