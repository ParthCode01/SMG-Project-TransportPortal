import { createContext, useState, useEffect } from "react";

export const PDIContext = createContext();

export const PDIProvider = ({ children }) => {
  const [pdiList, setPdiList] = useState([]); // All VIN inspections

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("pdi_vehicles")) || [];
    const allInspections = list.map((vin) => {
      const raw = localStorage.getItem(`inspection_${vin}`);
      return raw ? JSON.parse(raw) : null;
    }).filter(Boolean);
    setPdiList(allInspections);
  }, []);

  const addOrUpdateInspection = (payload) => {
    const { meta } = payload;
    localStorage.setItem(`inspection_${meta.vin}`, JSON.stringify(payload));

    let vinList = JSON.parse(localStorage.getItem("pdi_vehicles") || "[]");
    if (!vinList.includes(meta.vin)) {
      vinList.unshift(meta.vin);
      localStorage.setItem("pdi_vehicles", JSON.stringify(vinList));
    }

    // Update context
    setPdiList((prev) => {
      const exists = prev.find((p) => p.meta.vin === meta.vin);
      if (exists) {
        return prev.map((p) => (p.meta.vin === meta.vin ? payload : p));
      } else {
        return [payload, ...prev];
      }
    });
  };

  return (
    <PDIContext.Provider value={{ pdiList, addOrUpdateInspection }}>
      {children}
    </PDIContext.Provider>
  );
};
