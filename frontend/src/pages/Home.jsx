import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/city/${city.trim()}`);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/home.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content section */}
      <div className="relative z-10 max-w-3xl mx-auto text-center bg-white/70 dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
          Find Your Next Adventure
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Search for attractions, hotels, and events in any city.
        </p>

        <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="E.g., Paris, London, Tokyo..."
            className="w-3/4 md:w-2/3 p-2 md:p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 md:p-3 rounded-r-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
