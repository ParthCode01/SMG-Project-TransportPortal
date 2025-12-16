import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckSheetRow from "../../components/CheckSheetRow";
import { generatePDF } from "../../utils/formatPDF";

const emptyScooter = {
  model: "",
  chassis: "",
  mirrors: false,
  medicalKit: false,
  toolKit: false,
  chargers: false,
  keys: false,
  batteryNumber: "",
};

function DealerOrderChecklist() {
  const { orderId } = useParams();
  const [checklist, setChecklist] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("checklists")) || [];
    setChecklist(all.find((c) => String(c.id) === orderId));
  }, [orderId]);

  if (!checklist)
    return (
      <div className="p-6">
        <h3 className="text-red-600 font-semibold">Checklist not found</h3>
      </div>
    );

  const handleTotalChange = (n) => {
    const count = Number(n);
    if (count < 1) return;

    setChecklist((prev) => {
      const list = [...prev.scooters];
      while (list.length < count) list.push({ ...emptyScooter });
      return { ...prev, totalScooters: count, scooters: list.slice(0, count) };
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...checklist.scooters];
    updated[index][field] = value;
    setChecklist({ ...checklist, scooters: updated });
  };

  const saveUpdates = () => {
    const all = JSON.parse(localStorage.getItem("checklists")) || [];
    localStorage.setItem(
      "checklists",
      JSON.stringify(all.map((c) => (c.id === checklist.id ? checklist : c)))
    );
    alert("Checklist updated");
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">
        SMG ELECTRIC SCOOTERS LTD – Delivery Checklist
      </h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Dealer:</span> {checklist.dealer.name}
        </p>

        <p className="flex items-center gap-2">
          <span className="font-semibold">Total Scooters:</span>
          <input
            type="number"
            min="1"
            value={checklist.totalScooters}
            onChange={(e) => handleTotalChange(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-20"
          />
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">S.No</th>
              <th className="border px-3 py-2">Model</th>
              <th className="border px-3 py-2">Chassis</th>
              <th className="border px-3 py-2">Mirrors</th>
              <th className="border px-3 py-2">Medical</th>
              <th className="border px-3 py-2">Tool</th>
              <th className="border px-3 py-2">Charger</th>
              <th className="border px-3 py-2">Keys</th>
              <th className="border px-3 py-2">Battery</th>
            </tr>
          </thead>
          <tbody>
            {checklist.scooters.map((s, i) => (
              <CheckSheetRow
                key={i}
                index={i}
                scooter={s}
                handleChange={handleChange}
                disabled={false}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={saveUpdates}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          onClick={() => generatePDF(checklist)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Print PDF
        </button>
      </div>
    </div>
  );
}

export default DealerOrderChecklist;
