import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

function Dashboard() {
  const [checklists, setChecklists] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* ---------- THEME ---------- */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* ---------- DATA ---------- */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checklists")) || [];
    setChecklists(data);
    preparePieData(data);
  }, []);

  const preparePieData = (data) => {
    const map = {};
    data.forEach((item) => {
      const name = item.dealer?.name || "Unknown";
      map[name] = (map[name] || 0) + 1;
    });

    setChartData(
      Object.keys(map).map((key) => ({
        name: key,
        value: map[key],
      }))
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Dashboard
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Checklists" value={checklists.length} />
        <StatCard
          title="Dealers"
          value={new Set(checklists.map((c) => c.dealer?.name)).size || 0}
        />
        <StatCard title="PDI Status" value="—" />
        <StatCard title="Logistics" value="Active" />
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Checklists by Dealer
        </h2>

        {chartData.length === 0 ? (
          <p className="text-gray-500">No data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Actions + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            <ActionButton to="/checksheets/create" label="➕ Create Checklist" />
            <ActionButton to="/checksheets" label="📋 View Checklists" />
            <ActionButton to="/pdi" label="🛠 PDI Module" />
            <ActionButton to="/logistics" label="🚚 Logistics" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Recent Checklists
          </h2>

          {checklists.length === 0 ? (
            <p className="text-gray-500">No checklists yet.</p>
          ) : (
            <table className="w-full border dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="border p-2">Dealer</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {checklists.slice(-5).reverse().map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.dealer?.name}</td>
                    <td className="border p-2 text-center">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border p-2 text-center">
                      <Link
                        to={`/checksheets/order/${item.id}`}
                        className="text-indigo-500 hover:underline"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */
function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <p className="text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
        {value}
      </p>
    </div>
  );
}

function ActionButton({ to, label }) {
  return (
    <Link
      to={to}
      className="bg-indigo-600 text-white py-2 rounded text-center hover:bg-indigo-700"
    >
      {label}
    </Link>
  );
}

export default Dashboard;
