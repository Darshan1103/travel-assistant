// src/pages/ProfilePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getFavoritePlaces, removeFavoritePlace } from '../api/userApi';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const data = await getFavoritePlaces();
          console.log("Favorites API response:", data); // Debug
          setFavorites(data.savedPlaces || []);
        } catch (error) {
          console.error("Couldn't load favorites. Actual error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRemove = async (placeId) => {
    try {
      // backend delete expects the place name in the URL
      await removeFavoritePlace(placeId);
      setFavorites(currentFavorites =>
        currentFavorites.filter(place => place._id !== placeId && place.name !== placeId)
      );
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      alert('Failed to remove favorite');
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading your favorites...</p>;
  }

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl">Please log in to see your profile.</h2>
        <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Saved Places</h1>
      {favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map((place) => (
            <div key={place._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{place.name}</h3>
                <p className="text-gray-600">{place.address}</p>
                <p className="text-sm text-gray-500 capitalize">{place.city}</p>
              </div>
              <button 
                onClick={() => handleRemove(place.name)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't saved any places yet!</p>
      )}
    </div>
  );
}
