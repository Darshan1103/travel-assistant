// src/pages/CityDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getPlacesByCity } from '../api/travelApi';
import { getEventsByCity } from '../api/eventApi';
import { addFavoritePlace } from '../api/userApi';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast'; // Using toast for notifications

export default function CityDetails() {
  const { cityName } = useParams();
  const { user } = useContext(AuthContext);

  const [details, setDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [placesData, eventsData] = await Promise.all([
          getPlacesByCity(cityName),
          getEventsByCity(cityName)
        ]);
        setDetails(placesData);
        setEvents(eventsData);
      } catch (err) {
        setError('Could not fetch all data for this city.');
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cityName]);

  // Updated handleSave to accept a 'type'
  const handleSave = async (place, type) => {
    try {
      const placeData = {
        name: place.name,
        address: place.address,
        city: cityName,
        type: type, // 'attraction' or 'hotel'
      };
      await addFavoritePlace(placeData);
      toast.success(`${place.name} has been saved!`);
    } catch (err) {
      toast.error(err.error || 'Failed to save favorite.');
    }
  };

  if (loading) {
    return <p className="text-center mt-8 text-lg">Loading details for {cityName}...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-lg text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize text-center">{cityName} Details</h1>
      
      {/* === TOP ATTRACTIONS === */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Attractions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details?.top_attractions.map((place) => (
            <div key={place.name} className="border p-4 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{place.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{place.address}</p>
              </div>
              {user && (
                <button
                  onClick={() => handleSave(place, 'attraction')}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded self-start hover:bg-green-600"
                >
                  Save Favorite
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* === TOP HOTELS (NEW) === */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details?.top_hotels.map((place) => (
            <div key={place.name} className="border p-4 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{place.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{place.address}</p>
              </div>
              {user && (
                <button
                  onClick={() => handleSave(place, 'hotel')}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded self-start hover:bg-green-600"
                >
                  Save Favorite
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* === UPCOMING EVENTS === */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.name} className="border p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg">{event.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{event.venue}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
                <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
                  View Tickets
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No upcoming events found for this city.</p>
        )}
      </div>
    </div>
  );
}