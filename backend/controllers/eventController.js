// controllers/eventController.js
import axios from "axios";

export const getCityEvents = async (req, res) => {
  try {
    const { city } = req.params;
    if (!city) return res.status(400).json({ error: "City is required" });

    const apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json";

    const response = await axios.get(apiUrl, {
      params: {
        apikey: process.env.TICKETMASTER_KEY,
        city: city,
        size: 10, // number of results
        sort: "date,asc", // upcoming first
      },
    });

    if (!response.data._embedded || !response.data._embedded.events) {
      return res.status(404).json({ error: "No events found for this city" });
    }

    // Simplify the data
    const events = response.data._embedded.events.map((event) => ({
      name: event.name,
      url: event.url,
      date: event.dates?.start?.localDate || "N/A",
      time: event.dates?.start?.localTime || "N/A",
      venue:
        event._embedded?.venues?.[0]?.name ||
        event._embedded?.venues?.[0]?.address?.line1 ||
        "Unknown Venue",
      address: event._embedded?.venues?.[0]?.address?.line1 || "",
      city: event._embedded?.venues?.[0]?.city?.name || city,
      country: event._embedded?.venues?.[0]?.country?.name || "",
      image: event.images?.[0]?.url || "",
    }));

    res.json(events);
  } catch (error) {
    console.error("Ticketmaster API error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
