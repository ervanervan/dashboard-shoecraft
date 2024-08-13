import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDataPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [stock, setStock] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);

  const apiURL = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
    async function fetchCategories() {
      try {
        const response = await axios.get(`${apiURL}/api/categories`);
        setCategories(response.data.data); // Sesuaikan dengan struktur response dari API Anda
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, [apiURL]);

  // Update previews when files change
  useEffect(() => {
    if (thumbnailFile) {
      setThumbnailPreview(URL.createObjectURL(thumbnailFile));
    }
  }, [thumbnailFile]);

  useEffect(() => {
    if (image1File) {
      setImage1Preview(URL.createObjectURL(image1File));
    }
  }, [image1File]);

  useEffect(() => {
    if (image2File) {
      setImage2Preview(URL.createObjectURL(image2File));
    }
  }, [image2File]);

  const handleAddData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    formData.append("sell_price", sellPrice);
    formData.append("purchase_price", purchasePrice);
    formData.append("stock", stock);
    formData.append("thumbnail", thumbnailFile);
    formData.append("image1", image1File);
    formData.append("image2", image2File);

    // Ambil token dari localStorage atau state
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const response = await axios.post(`${apiURL}/api/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data added:", response.data);
      navigate("/"); // Kembali ke dashboard setelah berhasil menambahkan data
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <section className="container mx-auto px-6 py-10">
      <button
        onClick={() => navigate("/")}
        className="text-base text-gray-500 mb-4"
      >
        &lt;&lt; back
      </button>
      <h2 className="text-2xl font-medium mb-5">Add New Data</h2>
      <form onSubmit={handleAddData} className="space-y-5">
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
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
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
            Thumbnail
          </label>
          <input
            type="file"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image 1
          </label>
          <input
            type="file"
            onChange={(e) => setImage1File(e.target.files[0])}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {image1Preview && (
            <img
              src={image1Preview}
              alt="Image 1 Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image 2
          </label>
          <input
            type="file"
            onChange={(e) => setImage2File(e.target.files[0])}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {image2Preview && (
            <img
              src={image2Preview}
              alt="Image 2 Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
        >
          Add data
        </button>
      </form>
    </section>
  );
};

export default AddDataPage;
