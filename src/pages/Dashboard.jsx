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
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Checklists by Dealer
        </h2>

        {chartData.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No data available.</p>
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
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            <ActionButton to="/checksheets/create" label="➕ Create Checklist" />
            <ActionButton to="/checksheets" label="📋 View Checklists" />
            <ActionButton to="/pdi" label="🛠 PDI Module" />
            <ActionButton to="/logistics" label="🚚 Logistics" />
          </div>
        </div>

        {/* Recent Checklists */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Checklists
          </h2>

          {checklists.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No checklists yet.</p>
          ) : (
            <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="border p-3 text-left">Dealer</th>
                  <th className="border p-3 text-center">Date</th>
                  <th className="border p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {checklists.slice(-5).reverse().map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="border p-3 text-gray-900 dark:text-white">{item.dealer?.name}</td>
                    <td className="border p-3 text-center text-gray-900 dark:text-white">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border p-3 text-center">
                      <Link
                        to={`/checksheets/order/${item.id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 p-6">
      <p className="text-gray-600 dark:text-gray-300">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
    </div>
  );
}

function ActionButton({ to, label }) {
  return (
    <Link
      to={to}
      className="bg-indigo-600 text-white py-2 rounded text-center hover:bg-indigo-700 transition-colors"
    >
      {label}
    </Link>
  );
}

export default Dashboard;
