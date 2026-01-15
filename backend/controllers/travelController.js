import axios from "axios";

export const getCityInfo = async (req, res) => {
  try {
    const city = req.params.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    // Get city coordinates
    const geoResponse = await axios.get(
      `https://api.geoapify.com/v1/geocode/search`,
      {
        params: {
          text: city,
          apiKey: process.env.GEOAPIFY_KEY,
        },
      }
    );

    const cityData = geoResponse.data.features?.[0]?.properties;
    if (!cityData || !cityData.lat || !cityData.lon) {
      return res.status(404).json({ error: "City coordinates not found" });
    }

    const { lat, lon } = cityData;

    // Helper function to fetch places safely
    const fetchPlaces = async (category) => {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v2/places`,
          {
            params: {
              categories: category,
              filter: `circle:${lon},${lat},5000`,
              limit: 10,
              apiKey: process.env.GEOAPIFY_KEY,
            },
          }
        );
        return response.data.features || [];
      } catch (err) {
        console.error(`${category} API error:`, err.response?.data || err.message);
        return [];
      }
    };

    //  Get top attractions and hotels
    const [attractions, hotels] = await Promise.all([
      fetchPlaces("tourism.sights"),
      fetchPlaces("accommodation.hotel"),
    ]);

    // Simplify the data
    const simplifyPlaces = (places, includeOpeningHours = true) =>
      places.map((place) => {
        const p = place.properties;
        const simplified = {
          name: p.name,
          address: p.formatted,
          country: p.country,
          lat: p.lat,
          lon: p.lon,
          website: p.website || null,
          image: p.datasource?.raw?.image || null,
        };
        if (includeOpeningHours && p.opening_hours) simplified.opening_hours = p.opening_hours;
        return simplified;
      });

    res.json({
      city,
      top_attractions: simplifyPlaces(attractions),
      top_hotels: simplifyPlaces(hotels, false), // hotels don’t usually have opening_hours
    });

  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
