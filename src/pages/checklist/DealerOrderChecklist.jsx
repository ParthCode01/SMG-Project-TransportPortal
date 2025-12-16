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

  if (!checklist) return <h3>Checklist not found</h3>;

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
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "navy" }}>
        SMG ELECTRIC SCOOTERS LTD – Delivery Checklist
      </h2>

      <p>
        <b>Dealer:</b> {checklist.dealer.name}
      </p>

      <p>
        <b>Total Scooters:</b>{" "}
        <input
          type="number"
          min="1"
          value={checklist.totalScooters}
          onChange={(e) => handleTotalChange(e.target.value)}
        />
      </p>

      <table border="1" width="100%">
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

      <button onClick={saveUpdates}>Save Changes</button>
      <button
        onClick={() => generatePDF(checklist)}
        style={{ marginLeft: "10px" }}
      >
        Print PDF
      </button>
    </div>
  );
}

export default DealerOrderChecklist;
