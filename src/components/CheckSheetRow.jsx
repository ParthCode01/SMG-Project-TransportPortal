import React from "react";

/**
 * Props:
 * - index (number)
 * - row (object)
 * - onChange(index, path, value)
 * - onRemove(index)
 * - currentRole: 'company' | 'logistics' | 'dealer'
 * - readOnly (boolean) - full-sheet final
 * - lockedStages: { company: bool, logistics: bool, dealer: bool }
 */
export default function CheckSheetRow({
  index,
  row,
  onChange,
  onRemove,
  currentRole,
  readOnly = false,
  lockedStages = { company: false, logistics: false, dealer: false },
}) {
  const handle = (path, value) => onChange(index, path, value);

  // helpers
  const stageEditable = (stage) =>
    !readOnly && !lockedStages[stage] && currentRole === stage;

  const generalEditable =
    !readOnly && !lockedStages.company && currentRole === "company";

  return (
    <tr>
      <td style={{ width: 28 }}>{index + 1}</td>

      {/* General fields */}
      <td>
        <input
          type="text"
          value={row.modelName || ""}
          onChange={(e) => handle("modelName", e.target.value)}
          disabled={!generalEditable}
        />
      </td>
      <td>
        <input
          type="text"
          value={row.chassisNo || ""}
          onChange={(e) => handle("chassisNo", e.target.value)}
          disabled={!generalEditable}
        />
      </td>
      <td>
        <input
          type="text"
          value={row.batteryNumber || ""}
          onChange={(e) => handle("batteryNumber", e.target.value)}
          disabled={!generalEditable}
        />
      </td>

      {/* Company stage */}
      {["mirrors", "medicalKit", "toolKit", "chargers", "keys"].map(
        (field, i) => (
          <td key={i} className="checkbox-center">
            <input
              type="checkbox"
              checked={!!row.company?.[field]}
              onChange={(e) => handle(`company.${field}`, e.target.checked)}
              disabled={!stageEditable("company")}
            />
          </td>
        )
      )}

      {/* Logistics stage */}
      {["mirrors", "medicalKit", "toolKit", "chargers", "keys"].map(
        (field, i) => (
          <td key={i} className="checkbox-center">
            <input
              type="checkbox"
              checked={!!row.logistics?.[field]}
              onChange={(e) => handle(`logistics.${field}`, e.target.checked)}
              disabled={!stageEditable("logistics")}
            />
          </td>
        )
      )}

      {/* Dealer stage */}
      {["mirrors", "medicalKit", "toolKit", "chargers", "keys"].map(
        (field, i) => (
          <td key={i} className="checkbox-center">
            <input
              type="checkbox"
              checked={!!row.dealer?.[field]}
              onChange={(e) => handle(`dealer.${field}`, e.target.checked)}
              disabled={!stageEditable("dealer")}
            />
          </td>
        )
      )}

      {/* Comments */}
      <td>
        <input
          type="text"
          value={row.comments || ""}
          onChange={(e) => handle("comments", e.target.value)}
          disabled={readOnly}
          style={{ width: "100%" }}
        />
      </td>

      {/* Action */}
      <td className="checkbox-center">
        {!readOnly && currentRole === "company" && !lockedStages.company && (
          <button className="btn danger" onClick={() => onRemove(index)}>
            Remove
          </button>
        )}
      </td>
    </tr>
  );
}
