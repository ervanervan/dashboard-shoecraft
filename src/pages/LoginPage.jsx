import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_APP_API_URL;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiURL}/api/auth/signin-admin`,
        formData
      );
      localStorage.setItem("token", JSON.stringify(response.data.data));
      alert("Login successfully.");
      navigate("/"); // Redirect to homepage after login successful
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <section className="container mx-auto px-6 py-10">
      <div className="w-full md:w-1/2 bg-neutral-50 border mx-auto rounded-md">
        <form onSubmit={handleSubmit} className="flex flex-col px-5 py-10">
          <h1 className="text-center text-2xl font-medium mb-10">Login</h1>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            className="p-2 border rounded-md border-neutral-300 focus:border-neutral-500 focus:outline-none mb-6"
            required
          />
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            className="p-2 border rounded-md border-neutral-300 focus:border-neutral-500 focus:outline-none mb-6"
            required
          />

          <button
            type="submit"
            className="items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:border-blue-500 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
