// src/pages/pdi/index.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";

/* EXACT SAME PART LIST – DO NOT MODIFY */
const PARTS = [
  "Lockset ON/OFF function",
  "Seat lock and Side lock function",
  "Instrument Cluster Functions/Battery Level indication",
  "Electrical Part Check (Head light, Tail light, Horn, Indicators, USB port)",
  "Throttle Operation Check",
  "Switch Function",
  "Brake Sensing Function",
  "Motor cut off while applying brake",
  "Tail light function / Brake sensing symbol",
  "Handle bar position / fitment",
  "Charging socket Proper Functioning",
  "Luggage box accessories confirmation",
  "Mirror",
  "Charger",
  "Tool kit",
  "Chakori connector fitment",
  "MCB terminal wire connection fitment",
  "Front Wheel tyre (Seating / Wobbling / Air leakage)",
  "Rear Wheel tyre (Seating / Wobbling / Air leakage)",
  "PP parts aesthetic inspection",
  "Battery Clamp fitment",
  "Rear shocker function / Abnormal noise on test drive",
  "Battery charging upto 100%",
  "Test drive minimum 5km (share remarks if any)",
  "Any other remark not mentioned above",
];

const OPTIONS = ["Pass", "Fail", "NA"];
const emptyRows = () => PARTS.map(p => ({ part: p, result: "NA" }));

export default function PDI() {
  /* Batch / Truck Info */
  const [batchMeta, setBatchMeta] = useState({
    truck_no: "",
    inspector_name: "",
    inspector_id: "",
    date: "",
  });

  /* Current Vehicle */
  const [vin, setVin] = useState("");
  const [rows, setRows] = useState(emptyRows());

  /* Batch Results */
  const [batch, setBatch] = useState([]);

  const handleRowChange = (i, value) => {
    const copy = [...rows];
    copy[i].result = value;
    setRows(copy);
  };

  const saveVehicleInspection = () => {
    if (!vin) {
      toast.error("VIN is required");
      return;
    }

    let fail = rows.some(r => r.result === "Fail");
    const status = fail ? "FAIL" : "PASS";

    setBatch(prev => [
      ...prev,
      { vin, status }
    ]);

    localStorage.setItem(
      `inspection_${vin}`,
      JSON.stringify({ vin, rows, status })
    );

    toast.success(`Vehicle ${vin} saved as ${status}`);

    // Reset for next scooter
    setVin("");
    setRows(emptyRows());
  };

  const generateBatchPDF = () => {
    const passVehicles = batch.filter(v => v.status === "PASS");

    if (passVehicles.length === 0) {
      toast.error("No PASS vehicles to generate PDF");
      return;
    }

    window.print();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">
          Company Batch PDI – Dispatch Certification
        </h1>

        {/* Batch Meta */}
        <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.keys(batchMeta).map(key => (
            <input
              key={key}
              placeholder={key.replace("_", " ").toUpperCase()}
              value={batchMeta[key]}
              onChange={e =>
                setBatchMeta({ ...batchMeta, [key]: e.target.value })
              }
              className="border p-2 rounded"
            />
          ))}
        </div>

        {/* Vehicle VIN */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <input
            value={vin}
            onChange={e => setVin(e.target.value)}
            placeholder="ENTER VEHICLE VIN"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Inspection Table */}
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Inspection Item</th>
                <th className="border p-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="border p-2 text-center">{i + 1}</td>
                  <td className="border p-2">{r.part}</td>
                  <td className="border p-2">
                    <select
                      value={r.result}
                      onChange={e => handleRowChange(i, e.target.value)}
                      className="border p-1 rounded w-full"
                    >
                      {OPTIONS.map(o => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex gap-2">
            <button
              onClick={saveVehicleInspection}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Vehicle & Add to Batch
            </button>

            <button
              onClick={generateBatchPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Generate Dispatch PDF (PASS ONLY)
            </button>
          </div>
        </div>

        {/* Batch Summary */}
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Batch Summary</h2>
          {batch.map((b, i) => (
            <p key={i}>
              {b.vin} —{" "}
              <span className={b.status === "PASS" ? "text-green-600" : "text-red-600"}>
                {b.status}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
