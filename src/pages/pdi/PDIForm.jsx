// src/pages/pdi/PDIForm.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import toast, { Toaster } from "react-hot-toast";

/*
 PARTS extracted from your Excel sheet (hardcoded as requested).
 If you want to change names, edit this array.
*/
const PARTS = [
  "Lockset ON/OFF function",
  "Seat lock and Side lock function",
  "Instrument Cluster Functions/Battery Level indication",
  "Electrical Part Check(Head light,Tail light, Hor  ,Indicators,USB port",
  "Throttle Operation Check",
  "Switch Function",
  "Brake Sensing Function",
  "1.Motor cut off while applying brake",
  "2.Tail light function /Brake sensing symbol",
  "Handle bar position/fitment",
  "Charging socket Proper Functioning",
  "Luggage box accessories confirmation",
  "1.Mirror",
  "2.Charger",
  "3.Tool kit",
  "5. Chakori connector fitment",
  "MCB terminal wire connection fittment",
  "Front Wheel tyre (Seating/Wobbling/Air leakage)",
  "Rear Wheel tyre (Seating/Wobbling/Air leakage)",
  "PP parts aesthetic inspection",
  "Battery Clamp fitment",
  "Rear shocker function/Abnormal noise on test drive",
  "Battery charging upto 100%",
  "Test drive the vehicle for minimum 5km during PDI      (if any observation please share the remarks)",
  "ANY OTHR REMARK NOT MENTIONED ABOVE"
];

const OPTIONS = ["Pass", "Fail", "NA"];

/*
 LocalStorage key structure:
 - inspections_<VIN> : JSON object { meta: {...}, rows: [...], summary: {...} }
 - vehicles index list (optional) stored in 'pdi_vehicles' -> array of VINs
*/

const emptyRow = (part) => ({
  part_name: part,
  col1: "NA",
  col2: "NA",
  col3: "NA",
  col4: "NA",
  col5: "NA",
});

const PDIForm = () => {
  // Vehicle meta fields (top of form)
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

  // rows: one per part
  const [rows, setRows] = useState(PARTS.map((p) => emptyRow(p)));

  // for quick load: list of saved VINs
  const [savedVinList, setSavedVinList] = useState([]);

  // summary after save
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    // load saved VINs from localStorage on mount
    const list = JSON.parse(localStorage.getItem("pdi_vehicles") || "[]");
    setSavedVinList(list);
  }, []);

  // handle meta change
  const handleMetaChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  // handle select change for a given row & column
  const handleRowChange = (index, col, value) => {
    const copy = [...rows];
    copy[index] = { ...copy[index], [col]: value };
    setRows(copy);
  };

  // Reset rows to default
  const resetRows = () => {
    setRows(PARTS.map((p) => emptyRow(p)));
    toast("Table reset");
  };

  // Save inspection to localStorage
  const saveInspection = () => {
    if (!meta.vin) {
      toast.error("VIN is required to save inspection");
      return;
    }

    // compute status: Faulty if any Fail exists
    let totalPass = 0,
      totalFail = 0,
      totalNA = 0;

    for (let r of rows) {
      ["col1", "col2", "col3", "col4", "col5"].forEach((c) => {
        const v = (r[c] || "NA").toString().trim();
        if (v.toLowerCase() === "pass") totalPass++;
        else if (v.toLowerCase() === "fail") totalFail++;
        else totalNA++;
      });
    }

    const status = totalFail > 0 ? "Faulty" : "Correct";

    const payload = {
      meta: { ...meta },
      rows,
      summary: { totalPass, totalFail, totalNA, status, savedAt: new Date().toISOString() },
    };

    localStorage.setItem(`inspection_${meta.vin}`, JSON.stringify(payload));

    // add VIN to index list
    const indexList = JSON.parse(localStorage.getItem("pdi_vehicles") || "[]");
    if (!indexList.includes(meta.vin)) {
      indexList.unshift(meta.vin);
      localStorage.setItem("pdi_vehicles", JSON.stringify(indexList));
      setSavedVinList(indexList);
    }

    setSummary(payload.summary);
    toast.success(`Saved. Vehicle status: ${payload.summary.status}`);
  };

  // Load existing inspection by VIN
  const loadByVin = (vin) => {
    if (!vin) return;
    const raw = localStorage.getItem(`inspection_${vin}`);
    if (!raw) {
      toast.error("No saved inspection for VIN: " + vin);
      return;
    }
    try {
      const payload = JSON.parse(raw);
      setMeta(payload.meta || { vin });
      setRows(payload.rows || PARTS.map((p) => emptyRow(p)));
      setSummary(payload.summary || null);
      toast(`Loaded inspection for VIN: ${vin}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inspection data");
    }
  };

  // Clear current form (not saved)
  const clearForm = () => {
    setMeta({
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
    resetRows();
    setSummary(null);
    toast("Cleared form");
  };

  // Export current inspection JSON (download)
  const exportJSON = () => {
    if (!meta.vin) { toast.error("Enter VIN to export"); return; }
    const payload = { meta, rows, summary };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pdi_${meta.vin}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex">
      <Toaster position="top-right" />
      <Sidebar />

      <main className="ml-64 w-full p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">PDI Inspection — Manual Entry</h1>

          {/* Vehicle meta area */}
          <section className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="vin"
                value={meta.vin}
                onChange={handleMetaChange}
                placeholder="VIN *"
                className="p-2 border rounded"
              />
              <input
                name="model"
                value={meta.model}
                onChange={handleMetaChange}
                placeholder="Model"
                className="p-2 border rounded"
              />
              <input
                name="dealer_name"
                value={meta.dealer_name}
                onChange={handleMetaChange}
                placeholder="Dealer Name"
                className="p-2 border rounded"
              />
              <input
                name="dealer_code"
                value={meta.dealer_code}
                onChange={handleMetaChange}
                placeholder="Dealer Code"
                className="p-2 border rounded"
              />
              <input
                name="date_inspected"
                type="date"
                value={meta.date_inspected}
                onChange={handleMetaChange}
                placeholder="Date"
                className="p-2 border rounded"
              />
              <input
                name="battery_no"
                value={meta.battery_no}
                onChange={handleMetaChange}
                placeholder="Battery no"
                className="p-2 border rounded"
              />
              <input
                name="charger_no"
                value={meta.charger_no}
                onChange={handleMetaChange}
                placeholder="Charger no"
                className="p-2 border rounded"
              />
              <input
                name="motor_no"
                value={meta.motor_no}
                onChange={handleMetaChange}
                placeholder="Motor no"
                className="p-2 border rounded"
              />
              <input
                name="controller_no"
                value={meta.controller_no}
                onChange={handleMetaChange}
                placeholder="Controller no"
                className="p-2 border rounded"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <button
                onClick={saveInspection}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save Inspection (local)
              </button>

              <button
                onClick={() => meta.vin && loadByVin(meta.vin)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Load by VIN
              </button>

              <select
                value=""
                onChange={(e) => { if (e.target.value) loadByVin(e.target.value); }}
                className="p-2 border rounded"
              >
                <option value="">Load saved VIN...</option>
                {savedVinList.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>

              <button onClick={clearForm} className="px-3 py-2 bg-gray-200 rounded">Clear</button>
              <button onClick={exportJSON} className="px-3 py-2 bg-yellow-400 rounded">Export JSON</button>
            </div>
          </section>

          {/* Editable grid */}
          <section className="bg-white rounded-lg shadow p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-200 sticky top-0">
                  <tr>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Part Name</th>
                    <th className="p-2 border">1</th>
                    <th className="p-2 border">2</th>
                    <th className="p-2 border">3</th>
                    <th className="p-2 border">4</th>
                    <th className="p-2 border">5</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-2 border text-center align-top">{idx + 1}</td>
                      <td className="p-2 border align-top">{r.part_name}</td>

                      {[1,2,3,4,5].map((c) => (
                        <td key={c} className="p-2 border align-top">
                          <select
                            value={r["col"+c]}
                            onChange={(e) => handleRowChange(idx, "col"+c, e.target.value)}
                            className="p-2 border rounded w-full"
                          >
                            {OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={saveInspection}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save Inspection
              </button>
              <button onClick={resetRows} className="px-4 py-2 bg-gray-200 rounded">Reset Table</button>

              <div className="ml-auto text-right">
                {summary ? (
                  <div>
                    <div className="text-sm text-gray-600">Status: <span className={`font-semibold ${summary.status === 'Faulty' ? 'text-red-600' : 'text-green-600'}`}>{summary.status}</span></div>
                    <div className="text-sm text-gray-600">{summary.totalPass} Pass • {summary.totalFail} Fail • {summary.totalNA} NA</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">No summary yet</div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PDIForm;
