// src/api/userApi.js
import API from './axiosInstance';

// Function to add a place to the user's favorites
export const addFavoritePlace = async (placeData) => {
  try {
    // This request will automatically have the user's token attached by our axios instance
    const response = await API.post('/user/favorites', placeData);
    return response.data;
  } catch (error) {
    console.error('Failed to add favorite:', error.response.data);
    throw error.response.data;
  }
};


export const getFavoritePlaces = async () => {
  try {
    const response = await API.get('/user/favorites');
    // return the full response.data so callers can read savedPlaces or other metadata
    return response.data;
  } catch (error) {
    console.error('Failed to get favorites:', error.response.data);
    throw error.response.data;
  }
};

export const removeFavoritePlace = async (placeId) => {
  try {
    // backend exposes DELETE /user/favorites/:name
    // here `placeId` may actually be an identifier or a name; callers should pass the name
    const response = await API.delete(`/user/favorites/${encodeURIComponent(placeId)}`);
    return response.data;
  } catch (error) {
    console.error('Failed to remove favorite:', error.response.data);
    throw error.response.data;
  }
};