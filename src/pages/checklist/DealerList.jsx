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
      <h2 className="text-2xl font-bold text-blue-900">Delivery Checklists</h2>

      <Link to="/checksheets/create">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Create New Checklist
        </button>
      </Link>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Dealer</th>
              <th className="border px-3 py-2 text-left">Created On</th>
              <th className="border px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lists.length > 0 ? (
              lists.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{item.dealer.name}</td>
                  <td className="border px-3 py-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-3 py-2">
                    <Link
                      to={`/checksheets/order/${item.id}`}
                      className="text-blue-600 hover:underline"
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
                  className="border px-3 py-4 text-center text-gray-500"
                >
                  No checklists created
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
