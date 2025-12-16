function CheckSheetRow({ index, scooter, handleChange, disabled }) {
  const onChange = (field, value) => {
    if (disabled) return;
    handleChange(index, field, value);
  };

  return (
    <tr>
      <td>{index + 1}</td>

      <td>
        <input
          value={scooter.model}
          disabled={disabled}
          onChange={(e) => onChange("model", e.target.value)}
        />
      </td>

      <td>
        <input
          value={scooter.chassis}
          disabled={disabled}
          onChange={(e) => onChange("chassis", e.target.value)}
        />
      </td>

      <td>
        <input
          type="checkbox"
          checked={scooter.mirrors}
          disabled={disabled}
          onChange={(e) => onChange("mirrors", e.target.checked)}
        />
      </td>

      <td>
        <input
          type="checkbox"
          checked={scooter.medicalKit}
          disabled={disabled}
          onChange={(e) => onChange("medicalKit", e.target.checked)}
        />
      </td>

      <td>
        <input
          type="checkbox"
          checked={scooter.toolKit}
          disabled={disabled}
          onChange={(e) => onChange("toolKit", e.target.checked)}
        />
      </td>

      <td>
        <input
          type="checkbox"
          checked={scooter.chargers}
          disabled={disabled}
          onChange={(e) => onChange("chargers", e.target.checked)}
        />
      </td>

      <td>
        <input
          type="checkbox"
          checked={scooter.keys}
          disabled={disabled}
          onChange={(e) => onChange("keys", e.target.checked)}
        />
      </td>

      <td>
        <input
          value={scooter.batteryNumber}
          disabled={disabled}
          onChange={(e) => onChange("batteryNumber", e.target.value)}
        />
      </td>
    </tr>
  );
}

export default CheckSheetRow;
