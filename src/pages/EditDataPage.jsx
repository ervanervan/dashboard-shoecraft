import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDataPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [stock, setStock] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewImage2, setPreviewImage2] = useState("");
  const apiURL = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${apiURL}/api/products/${id}`);
        const item = response.data.data;
        setData(item);
        setName(item.name);
        setDescription(item.description);
        setSellPrice(item.sell_price);
        setPurchasePrice(item.purchase_price);
        setStock(item.stock);
        setSelectedCategory(item.category._id); // Assuming category is part of the item data
        setPreviewThumbnail(item.thumbnailUrl);
        setPreviewImage1(item.image1Url);
        setPreviewImage2(item.image2Url);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchCategories() {
      try {
        const response = await axios.get(`${apiURL}/api/categories`);
        setCategories(response.data.data); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchData();
    fetchCategories();
  }, [id, apiURL]);

  const handleUpdateData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("sell_price", sellPrice);
    formData.append("purchase_price", purchasePrice);
    formData.append("stock", stock);
    formData.append("category", selectedCategory);
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    if (image1File) formData.append("image1", image1File);
    if (image2File) formData.append("image2", image2File);

    const token = JSON.parse(localStorage.getItem("token"));

    try {
      await axios.put(`${apiURL}/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleFileChange = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  if (!data)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <section className="container mx-auto px-6 py-10">
      <button
        onClick={() => navigate("/")}
        className="text-base text-gray-500 mb-4"
      >
        &lt;&lt; back
      </button>
      <h2 className="text-2xl font-medium mb-5">Edit Data</h2>
      <form onSubmit={handleUpdateData} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sell Price
          </label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Purchase Price
          </label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Thumbnail
          </label>
          <input
            type="file"
            onChange={(e) =>
              handleFileChange(e, setPreviewThumbnail, setThumbnailFile)
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              alt="Preview"
              className="mt-2 w-16 h-16 object-cover"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image 1
          </label>
          <input
            type="file"
            onChange={(e) =>
              handleFileChange(e, setPreviewImage1, setImage1File)
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
          {previewImage1 && (
            <img
              src={previewImage1}
              alt="Preview"
              className="mt-2 w-16 h-16 object-cover"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image 2
          </label>
          <input
            type="file"
            onChange={(e) =>
              handleFileChange(e, setPreviewImage2, setImage2File)
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
          {previewImage2 && (
            <img
              src={previewImage2}
              alt="Preview"
              className="mt-2 w-16 h-16 object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
        >
          Update data
        </button>
      </form>
    </section>
  );
};

export default EditDataPage;
