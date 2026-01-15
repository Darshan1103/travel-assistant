import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

export default function CityInfo() {
  const { city } = useParams(); // Get city name from URL
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCityInfo = async () => {
      try {
        // Use the project's axios instance which includes the correct baseURL and auth headers
        const res = await API.get(`/info/${encodeURIComponent(city)}`);
        setInfo(res.data);
      } catch (err) {
        // Provide more informative error messages when available
        const msg = err?.response?.data?.error || err.message || "Server not responding";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchCityInfo();
  }, [city]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-700">
        Loading city info...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {info.city}, {info.country}
        </h1>

        {/* City image */}
        {info.about?.image && (
          <img
            src={info.about.image}
            alt={info.city}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* Short info preview */}
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {info.about?.description || "A beautiful city worth exploring!"}
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          🌡️ {info.weather?.temperature}°C —{" "}
          <span className="capitalize">{info.weather?.condition}</span>
        </p>

        {/* Redirect button */}
        <button
          onClick={() => navigate(`/city/${city}`)} // ✅ redirect to your existing CityDetails.jsx
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          View More Details
        </button>
      </div>
    </div>
  );
}
