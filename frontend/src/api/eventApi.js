// src/api/eventApi.js
import API from './axiosinstance.js';

export const getEventsByCity = async (cityName) => {
  try {
    const response = await API.get(`/events/${cityName}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get events:', error.response?.data);
    // Return an empty array so the page doesn't crash if events aren't found
    return []; 
  }
};