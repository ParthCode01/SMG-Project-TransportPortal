// src/pages/pdi/index.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

/*
 Parts extracted from Excel sheet (hardcoded).
*/
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

const emptyRow = (part) => ({
  part_name: part,
  col1: "NA",
});


export default function PDI() {
  const [meta, setMeta] = useState({
    vin: "",
    model: "",
    dealer_name: "",
    dealer_code: "",
    date_inspected: "",
    battery_no: "",
    charger_no: "",
    motor_no: "",
    controller_no: "",
  });

  const [rows, setRows] = useState(PARTS.map((p) => emptyRow(p)));
  const [savedVinList, setSavedVinList] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("pdi_vehicles") || "[]");
    setSavedVinList(list);
  }, []);

  const handleMetaChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const handleRowChange = (index, col, value) => {
    const copy = [...rows];
    copy[index] = { ...copy[index], [col]: value };
    setRows(copy);
  };

  const resetRows = () => {
    setRows(PARTS.map((p) => emptyRow(p)));
    toast("Table reset");
  };

  const saveInspection = () => {
    if (!meta.vin) {
      toast.error("VIN is required");
      return;
    }

    let totalPass = 0,
      totalFail = 0,
      totalNA = 0;

rows.forEach((r) => {
  const v = r.col1;
  if (v === "Pass") totalPass++;
  else if (v === "Fail") totalFail++;
  else totalNA++;
});

    const status = totalFail > 0 ? "Faulty" : "Correct";

    const payload = {
      meta,
      rows,
      summary: { totalPass, totalFail, totalNA, status },
    };

    localStorage.setItem(`inspection_${meta.vin}`, JSON.stringify(payload));

    const list = JSON.parse(localStorage.getItem("pdi_vehicles") || "[]");
    if (!list.includes(meta.vin)) {
      list.unshift(meta.vin);
      localStorage.setItem("pdi_vehicles", JSON.stringify(list));
      setSavedVinList(list);
    }

    setSummary(payload.summary);
    toast.success(`Saved. Status: ${status}`);
  };

  const loadByVin = (vin) => {
    const raw = localStorage.getItem(`inspection_${vin}`);
    if (!raw) {
      toast.error("No record found");
      return;
    }
    const payload = JSON.parse(raw);
    setMeta(payload.meta);
    setRows(payload.rows);
    setSummary(payload.summary);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">PDI Inspection</h1>

        {/* Meta info */}
        <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(meta).map((key) => (
            <input
              key={key}
              name={key}
              value={meta[key]}
              onChange={handleMetaChange}
              placeholder={key.replace("_", " ").toUpperCase()}
              className="p-2 border rounded"
            />
          ))}
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Part</th>
                <th className="border p-2">Result</th>

              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="border p-2 text-center">{i + 1}</td>
                  <td className="border p-2">{r.part_name}</td>
                  <td className="border p-2">
                  <select
               value={r.col1}
    onChange={(e) => handleRowChange(i, "col1", e.target.value)}
    className="w-full border p-1 rounded"
  >
    {OPTIONS.map((o) => (
      <option key={o} value={o}>{o}</option>
    ))}
  </select>
</td>

                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex gap-2">
            <button onClick={saveInspection} className="bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button onClick={resetRows} className="bg-gray-200 px-4 py-2 rounded">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
