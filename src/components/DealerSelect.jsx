function DealerSelect({ dealers, selectedDealer, setSelectedDealer }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ fontWeight: "bold" }}>Dealer Name</label>
      <br />

      <select
        value={selectedDealer?.id || ""}
        onChange={(e) => {
          const dealer = dealers.find((d) => d.id === e.target.value);
          setSelectedDealer(dealer);
        }}
        style={{ padding: "6px", width: "250px" }}
      >
        <option value="">-- Select Dealer --</option>

        {dealers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DealerSelect;
