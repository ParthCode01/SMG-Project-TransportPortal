import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckSheetRow from "../../components/CheckSheetRow";

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

function CreateDealerOrder() {
  const navigate = useNavigate();

  const [dealer, setDealer] = useState({ name: "", code: "" });

  const [generalInfo, setGeneralInfo] = useState({
    invoice: "",
    date: "",
    stockyard: "",
    resourcePerson: "",
    truckNo: "",
  });

  // TOTAL COUNT
  const [totalScooters, setTotalScooters] = useState(1);

  // SCOOTER LIST
  const [scooters, setScooters] = useState([{ ...emptyScooter }]);

  // WHEN USER SETS N
  const handleTotalChange = (value) => {
    const n = Number(value);
    if (n < 1) return;

    setTotalScooters(n);

    setScooters((prev) => {
      const copy = [...prev];
      while (copy.length < n) copy.push({ ...emptyScooter });
      return copy.slice(0, n);
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...scooters];
    updated[index][field] = value;
    setScooters(updated);
  };

  const saveChecklist = () => {
    if (!dealer.name.trim()) {
      alert("Dealer name is required");
      return;
    }

    const checklist = {
      id: Date.now(),
      dealer,
      generalInfo,
      totalScooters,
      scooters,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("checklists")) || [];
    localStorage.setItem(
      "checklists",
      JSON.stringify([...existing, checklist])
    );

    navigate("/checksheets");
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">
        SMG ELECTRIC SCOOTERS LTD – Create Delivery Checklist
      </h2>

      {/* Dealer Details */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700">Dealer Details</h4>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            placeholder="Dealer Name"
            value={dealer.name}
            onChange={(e) => setDealer({ ...dealer, name: e.target.value })}
            className="border p-2 rounded w-full md:w-2/3"
          />
          <input
            placeholder="Dealer Code"
            value={dealer.code}
            onChange={(e) => setDealer({ ...dealer, code: e.target.value })}
            className="border p-2 rounded w-full md:w-1/3"
          />
        </div>
      </div>

      {/* General Info / Dispatch Details */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700 mt-4">Dispatch Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Invoice No"
            value={generalInfo.invoice}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, invoice: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={generalInfo.date}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, date: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            placeholder="Stockyard No"
            value={generalInfo.stockyard}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, stockyard: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            placeholder="Truck No"
            value={generalInfo.truckNo}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, truckNo: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            placeholder="Resource Person"
            value={generalInfo.resourcePerson}
            onChange={(e) =>
              setGeneralInfo({
                ...generalInfo,
                resourcePerson: e.target.value,
              })
            }
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Total Scooters */}
      <div className="space-y-1">
        <h4 className="font-semibold text-gray-700 mt-4">
          Total Scooters in Order: {totalScooters}
        </h4>
        <input
          type="number"
          min="1"
          value={totalScooters}
          onChange={(e) => handleTotalChange(e.target.value)}
          className="border p-2 rounded w-32"
        />
      </div>

      {/* Scooters Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">S.No</th>
              <th className="border px-2 py-1 text-left">Model</th>
              <th className="border px-2 py-1 text-left">Chassis</th>
              <th className="border px-2 py-1">Mirrors</th>
              <th className="border px-2 py-1">Medical</th>
              <th className="border px-2 py-1">Tool</th>
              <th className="border px-2 py-1">Charger</th>
              <th className="border px-2 py-1">Keys</th>
              <th className="border px-2 py-1">Battery</th>
            </tr>
          </thead>
          <tbody>
            {scooters.map((s, i) => (
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

      {/* Save Button */}
      <button
        onClick={saveChecklist}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Checklist
      </button>
    </div>
  );
}

export default CreateDealerOrder;
