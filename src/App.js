import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import RequestVehicle from "./pages/RequestVehicle";
import TrackVehicle from "./pages/TrackVehicle";

// ✅ Updated imports for checksheets
import CheckSheets from "./pages/CheckSheets";
import CheckSheetForm from "./pages/CheckSheetForm";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Private Routes inside Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/request" element={<RequestVehicle />} />
            <Route path="/track" element={<TrackVehicle />} />

            {/* ✅ Checksheet Routes */}
            <Route path="/checksheets" element={<CheckSheets />} />
            <Route path="/checksheets/new" element={<CheckSheetForm />} />
            <Route path="/checksheets/:id/edit" element={<CheckSheetForm />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Toaster for success/error messages */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
