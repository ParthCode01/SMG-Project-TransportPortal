// src/api/checksheetAPI.js
const LS_KEY = "checksheets_v1";

function readAll() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function makeId() {
  return `cs-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

// List all checksheets
export async function listChecksheets() {
  return readAll();
}

// Get one checksheet by ID
export async function getChecksheet(id) {
  return readAll().find((s) => s.id === id) || null;
}

// Create a new checksheet
export async function createChecksheet(payload) {
  const now = new Date().toISOString();
  const item = {
    ...payload,
    id: makeId(),
    createdAt: now,
    updatedAt: now,
    finalizedBy: { company: false, logistics: false, dealer: false }, // track role finalization
  };
  const list = readAll();
  list.unshift(item);
  writeAll(list);
  return item;
}

// Update checksheet (supports role-based finalization)
export async function updateChecksheet(
  id,
  payload,
  role = null,
  finalize = false
) {
  const list = readAll();
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Not found");

  const existing = list[idx];

  // Prevent editing finalized section
  if (role && existing.finalizedBy[role]) {
    throw new Error(`${role} section already finalized`);
  }

  const updated = {
    ...payload,
    id,
    updatedAt: new Date().toISOString(),
    finalizedBy: { ...existing.finalizedBy },
  };

  // If finalize is true, mark role section as finalized
  if (role && finalize) {
    updated.finalizedBy[role] = true;
  }

  list[idx] = updated;
  writeAll(list);
  return updated;
}

// Delete a checksheet
export async function deleteChecksheet(id) {
  writeAll(readAll().filter((s) => s.id !== id));
  return true;
}
