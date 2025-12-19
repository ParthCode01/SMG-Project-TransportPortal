import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DealerList() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checklists")) || [];
    setLists(data);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-900 text-center">
        Delivery Checklists
      </h2>

      <div className="text-center">
        <Link to="/checksheets/create">
          <button className="mt-2 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition">
            Create New Checklist
          </button>
        </Link>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2 text-left">Dealer</th>
              <th className="border px-4 py-2 text-left">Created On</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lists.length > 0 ? (
              lists.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="border px-4 py-2">{item.dealer.name}</td>
                  <td className="border px-4 py-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    <Link
                      to={`/checksheets/order/${item.id}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="border px-4 py-6 text-center text-gray-500"
                >
                  No checklists created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DealerList;
