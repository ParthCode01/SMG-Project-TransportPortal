import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Main pages
import Dashboard from "./pages/Dashboard";
import TrackVehicle from "./pages/TrackVehicle";
import RequestVehicle from "./pages/RequestVehicle";

// PDI
import PDI from "./pages/pdi";

// Checklist
import DealerList from "./pages/checklist/DealerList";
import CreateDealerOrder from "./pages/checklist/CreateDealerOrder";
import DealerOrderChecklist from "./pages/checklist/DealerOrderChecklist";

// Logistics
import LogisticsDashboard from "./pages/logistics/LogisticsDashboard";
import RequestTransport from "./pages/logistics/RequestTransport";
import PartnerDetails from "./pages/logistics/PartnerDetails";
import ManagePartners from "./pages/logistics/ManagePartners";
import AddPartner from "./pages/logistics/AddPartner";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes with Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/request" element={<RequestVehicle />} />
            <Route path="/track" element={<TrackVehicle />} />

            {/* Delivery CheckSheets */}
            <Route path="/checksheets" element={<DealerList />} />
            <Route path="/checksheets/create" element={<CreateDealerOrder />} />
            <Route path="/checksheets/order/:orderId" element={<DealerOrderChecklist />} />

            {/* PDI */}
            <Route path="/pdi" element={<PDI />} />

            {/* Logistics */}
            <Route path="/logistics" element={<LogisticsDashboard />} />
            <Route path="/logistics/add-partner" element={<AddPartner />} />
            <Route path="/logistics/request" element={<RequestTransport />} />
            <Route path="/logistics/partner/:id" element={<PartnerDetails />} />
            <Route path="/logistics/manage-partners" element={<ManagePartners />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
