import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const apiURL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await axios.get(`${apiURL}/api/products`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, [apiURL]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const token = JSON.parse(localStorage.getItem("token"));

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${apiURL}/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(data.filter((item) => item._id !== id)); // Remove deleted item from state
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-data/${id}`);
  };

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <section className="container mx-auto px-6 py-10">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-medium">All Data</h2>
          <button
            onClick={() => navigate("/add-data")}
            className="px-4 py-3 rounded-lg font-medium transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            &#43; Add data
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Thumbnail
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-100 transition-colors duration-300"
                  >
                    <td className="px-4 py-3 border-b border-gray-200">
                      <img
                        src={item.thumbnailUrl}
                        alt=""
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-800">
                        {item.name}
                      </h3>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm text-gray-600">{item.sell_price}</p>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="py-2 px-4 rounded-md text-sm bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="py-2 px-4 rounded-md text-white text-sm bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
