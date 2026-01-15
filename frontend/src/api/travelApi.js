// src/api/travelApi.js
import API from './axiosinstance';

export const getPlacesByCity = async (city) => {
  try {
    const res = await API.get(`/travel/${city}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching travel data for ${city}:`, error);
    throw error;
  }
};