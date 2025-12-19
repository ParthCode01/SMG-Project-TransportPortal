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
  const [totalScooters, setTotalScooters] = useState(1);
  const [scooters, setScooters] = useState([{ ...emptyScooter }]);

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
      <h2 className="text-3xl font-bold text-blue-900 text-center">
        SMG ELECTRIC SCOOTERS LTD
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Create Delivery Checklist
      </p>

      {/* Dealer Details */}
      <div className="bg-white shadow rounded p-4 space-y-4">
        <h4 className="font-semibold text-gray-700 text-lg">Dealer Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Dealer Name"
            value={dealer.name}
            onChange={(e) => setDealer({ ...dealer, name: e.target.value })}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Dealer Code"
            value={dealer.code}
            onChange={(e) => setDealer({ ...dealer, code: e.target.value })}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Dispatch Details */}
      <div className="bg-white shadow rounded p-4 space-y-4">
        <h4 className="font-semibold text-gray-700 text-lg">Dispatch Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Invoice No"
            value={generalInfo.invoice}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, invoice: e.target.value })
            }
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={generalInfo.date}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, date: e.target.value })
            }
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Stockyard No"
            value={generalInfo.stockyard}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, stockyard: e.target.value })
            }
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Truck No"
            value={generalInfo.truckNo}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, truckNo: e.target.value })
            }
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
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
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Total Scooters */}
      <div className="bg-white shadow rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <h4 className="font-semibold text-gray-700 text-lg">
          Total Scooters in Order: {totalScooters}
        </h4>
        <input
          type="number"
          min="1"
          value={totalScooters}
          onChange={(e) => handleTotalChange(e.target.value)}
          className="border p-2 rounded w-32 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Scooters Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-3 py-2 text-left">S.No</th>
              <th className="border px-3 py-2 text-left">Model</th>
              <th className="border px-3 py-2 text-left">Chassis</th>
              <th className="border px-3 py-2">Mirrors</th>
              <th className="border px-3 py-2">Medical</th>
              <th className="border px-3 py-2">Tool</th>
              <th className="border px-3 py-2">Charger</th>
              <th className="border px-3 py-2">Keys</th>
              <th className="border px-3 py-2">Battery</th>
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
      <div className="text-right">
        <button
          onClick={saveChecklist}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Save Checklist
        </button>
      </div>
    </div>
  );
}

export default CreateDealerOrder;
