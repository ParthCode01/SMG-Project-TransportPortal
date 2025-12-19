import React, { createContext, useState, useEffect } from "react";

// 1. Create the context
export const ChecklistsContext = createContext();

// 2. Create the provider
export function ChecklistsProvider({ children }) {
  const [checklists, setChecklists] = useState([]);

  // Load checklists from localStorage on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checklists")) || [];
    setChecklists(data);
  }, []);

  // Sync checklists to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("checklists", JSON.stringify(checklists));
  }, [checklists]);

  // Add a new checklist
  const addChecklist = (checklist) => {
    setChecklists((prev) => [...prev, checklist]);
  };

  // Update an existing checklist
  const updateChecklist = (updatedChecklist) => {
    setChecklists((prev) =>
      prev.map((c) => (c.id === updatedChecklist.id ? updatedChecklist : c))
    );
  };

  // Delete a checklist
  const deleteChecklist = (id) => {
    setChecklists((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ChecklistsContext.Provider
      value={{
        checklists,
        addChecklist,
        updateChecklist,
        deleteChecklist,
      }}
    >
      {children}
    </ChecklistsContext.Provider>
  );
}
