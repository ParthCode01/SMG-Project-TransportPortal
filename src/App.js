import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import RequestVehicle from "./pages/RequestVehicle";
import TrackVehicle from "./pages/TrackVehicle";

// Delivery CheckSheets
import DealerList from "./pages/checklist/DealerList";
import CreateDealerOrder from "./pages/checklist/CreateDealerOrder";
import DealerOrderChecklist from "./pages/checklist/DealerOrderChecklist";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/request" element={<RequestVehicle />} />
            <Route path="/track" element={<TrackVehicle />} />

            {/* Delivery CheckSheets */}
            <Route path="/checksheets" element={<DealerList />} />
            <Route path="/checksheets/create" element={<CreateDealerOrder />} />
            <Route
              path="/checksheets/order/:orderId"
              element={<DealerOrderChecklist />}
            />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Toast Messages */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
