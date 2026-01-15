import axios from "axios";

export const getCityInfoAndWeather = async (req, res) => {
  try {
    const city = req.params.city;
    if (!city) return res.status(400).json({ error: "City name is required" });

    // Get coordinates from Geoapify
    const geoResponse = await axios.get(`https://api.geoapify.com/v1/geocode/search`, {
      params: {
        text: city,
        apiKey: process.env.GEOAPIFY_KEY,
      },
    });

    const cityData = geoResponse.data.features?.[0]?.properties;
    if (!cityData || !cityData.lat || !cityData.lon) {
      return res.status(404).json({ error: "City not found" });
    }

    const { lat, lon, country, formatted } = cityData;

    // 2️ Get weather from OpenWeatherMap
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHER_KEY,
        units: "metric",
      },
    });

    const weatherData = weatherResponse.data;
    const weather = {
      temperature: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      condition: weatherData.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    };

    //  Get general info from Wikipedia
    // Get general info from Wikipedia (with User-Agent header)
    const wikiResponse = await axios.get(
       `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`,
    {
       headers: {
         'User-Agent': 'TravelAssistantApp/1.0 (https://yourdomain.com; contact@yourdomain.com)',
          'Accept': 'application/json',
        },
    }
);


    const wikiData = wikiResponse.data;
    const about = {
      title: wikiData.title,
      description: wikiData.description,
      extract: wikiData.extract,
      image: wikiData.thumbnail?.source || null,
    };

    //  Final combined response
    res.json({
      city: formatted || city,
      country,
      coordinates: { lat, lon },
      weather,
      about,
    });
  } catch (error) {
  console.error("City info API error:", {
    message: error.message,
    response: error.response?.data,
    stack: error.stack,
  });
  res.status(500).json({ error: "Failed to fetch city data" });
}

};
