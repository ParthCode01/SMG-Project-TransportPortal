import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

/* Pages */
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TrackVehicle from "./pages/TrackVehicle";
import RequestVehicle from "./pages/RequestVehicle";
import PDI from "./pages/pdi";

/* Checklist */
import DealerList from "./pages/checklist/DealerList";
import CreateDealerOrder from "./pages/checklist/CreateDealerOrder";
import DealerOrderChecklist from "./pages/checklist/DealerOrderChecklist";

/* Logistics */
import LogisticsDashboard from "./pages/logistics/LogisticsDashboard";
import RequestTransport from "./pages/logistics/RequestTransport";
import PartnerDetails from "./pages/logistics/PartnerDetails";
import ManagePartners from "./pages/logistics/ManagePartners";
import AddPartner from "./pages/logistics/AddPartner";

/* Layout */
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  // GLOBAL DARK MODE
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />

          {/* Protected / Dashboard */}
          <Route
            element={<DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode} />}
          >
            {/* Main */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/request" element={<RequestVehicle />} />
            <Route path="/track" element={<TrackVehicle />} />

            {/* CheckSheets */}
            <Route path="/checksheets" element={<DealerList />} />
            <Route path="/checksheets/create" element={<CreateDealerOrder />} />
            <Route
              path="/checksheets/order/:orderId"
              element={<DealerOrderChecklist />}
            />

            {/* PDI */}
            <Route path="/pdi" element={<PDI />} />

            {/* Logistics */}
            <Route path="/logistics" element={<LogisticsDashboard />} />
            <Route path="/logistics/request" element={<RequestTransport />} />
            <Route path="/logistics/add-partner" element={<AddPartner />} />
            <Route path="/logistics/manage-partners" element={<ManagePartners />} />
            <Route path="/logistics/partner/:id" element={<PartnerDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
