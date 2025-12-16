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
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "navy" }}>
        SMG ELECTRIC SCOOTERS LTD – Create Delivery Checklist
      </h2>

      {/* DEALER */}
      <h4>Dealer Details</h4>
      <input
        placeholder="Dealer Name"
        value={dealer.name}
        onChange={(e) => setDealer({ ...dealer, name: e.target.value })}
      />
      <input
        placeholder="Dealer Code"
        value={dealer.code}
        onChange={(e) => setDealer({ ...dealer, code: e.target.value })}
        style={{ marginLeft: "10px" }}
      />

      {/* GENERAL INFO */}
      <h4 style={{ marginTop: "20px" }}>Dispatch Details</h4>
      <input
        placeholder="Invoice No"
        value={generalInfo.invoice}
        onChange={(e) =>
          setGeneralInfo({ ...generalInfo, invoice: e.target.value })
        }
      />
      <input
        type="date"
        value={generalInfo.date}
        onChange={(e) =>
          setGeneralInfo({ ...generalInfo, date: e.target.value })
        }
        style={{ marginLeft: "10px" }}
      />
      <input
        placeholder="Stockyard No"
        value={generalInfo.stockyard}
        onChange={(e) =>
          setGeneralInfo({ ...generalInfo, stockyard: e.target.value })
        }
        style={{ marginLeft: "10px" }}
      />
      <input
        placeholder="Truck No"
        value={generalInfo.truckNo}
        onChange={(e) =>
          setGeneralInfo({ ...generalInfo, truckNo: e.target.value })
        }
        style={{ marginLeft: "10px" }}
      />
      <input
        placeholder="Resource Person"
        value={generalInfo.resourcePerson}
        onChange={(e) =>
          setGeneralInfo({ ...generalInfo, resourcePerson: e.target.value })
        }
        style={{ marginLeft: "10px" }}
      />

      {/* TOTAL COUNT */}
      <h4 style={{ marginTop: "20px" }}>
        Total Scooters in Order: {totalScooters}
      </h4>
      <input
        type="number"
        min="1"
        value={totalScooters}
        onChange={(e) => handleTotalChange(e.target.value)}
      />

      {/* TABLE */}
      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Model</th>
            <th>Chassis</th>
            <th>Mirrors</th>
            <th>Medical</th>
            <th>Tool</th>
            <th>Charger</th>
            <th>Keys</th>
            <th>Battery</th>
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

      <button onClick={saveChecklist} style={{ marginTop: "20px" }}>
        Save Checklist
      </button>
    </div>
  );
}

export default CreateDealerOrder;
