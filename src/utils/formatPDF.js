import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePDF(data) {
  const doc = new jsPDF("p", "mm", "a4");

  // HEADER
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 128);
  doc.text("SMG ELECTRIC SCOOTERS LTD", 14, 15);

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("DELIVERY CHECKLIST", 14, 22);

  // DETAILS
  doc.setFontSize(9);
  let y = 32;

  doc.text(`Dealer Name : ${data.dealer.name}`, 14, y);
  y += 6;
  if (data.dealer.code) {
    doc.text(`Dealer Code : ${data.dealer.code}`, 14, y);
    y += 6;
  }

  doc.text(`Invoice No : ${data.generalInfo.invoice}`, 14, y);
  y += 6;
  doc.text(`Date of Dispatch : ${data.generalInfo.date}`, 14, y);
  y += 6;
  doc.text(`Stockyard No : ${data.generalInfo.stockyard}`, 14, y);
  y += 6;
  doc.text(`Truck No : ${data.generalInfo.truckNo}`, 14, y);
  y += 6;
  doc.text(`Resource Person : ${data.generalInfo.resourcePerson}`, 14, y);
  y += 8;

  // TABLE (YES / NO instead of ✔)
  const rows = data.scooters.map((s, i) => [
    i + 1,
    s.model,
    s.chassis,
    s.mirrors ? "YES" : "NO",
    s.medicalKit ? "YES" : "NO",
    s.toolKit ? "YES" : "NO",
    s.chargers ? "YES" : "NO",
    s.keys ? "YES" : "NO",
    s.batteryNumber,
  ]);

  autoTable(doc, {
    startY: y,
    head: [
      [
        "S.No",
        "Model Name",
        "Chassis No",
        "Mirrors",
        "Medical Kit",
        "Tool Kit",
        "Charger",
        "Keys",
        "Battery No",
      ],
    ],
    body: rows,
    theme: "grid",
    styles: {
      fontSize: 8,
      halign: "center",
    },
    headStyles: {
      fillColor: [230, 230, 230],
      textColor: 0,
      fontStyle: "bold",
    },
  });

  doc.save(`SMG_Checklist_${data.dealer.name}.pdf`);
}
