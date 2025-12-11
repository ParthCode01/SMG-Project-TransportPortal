import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import RequestVehicle from "./pages/RequestVehicle";
import TrackVehicle from "./pages/TrackVehicle";
import { Toaster } from "react-hot-toast";

// OPTIONAL: later use auth
// const isLoggedIn = () => !!localStorage.getItem("token");

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
          </Route>

        </Routes>
      </BrowserRouter>

      {/* Toaster for success/error messages */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
