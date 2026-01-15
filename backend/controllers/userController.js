// controllers/userController.js
import User from "../models/User.js";

export const addFavorite = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("User ID:", req.userId);

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { name, address, city, country, type, url, lat, lon, website, image, opening_hours } = req.body;

    if (!name || !address) {
      return res.status(400).json({ error: "Name and address are required" });
    }

    // Auto-fill country if missing from address
    let finalCountry = country;
    if (!finalCountry && address) {
      const parts = address.split(",");
      finalCountry = parts[parts.length - 1].trim();
    }

    const newPlace = {
      name,
      address,
      city: city || "",
      country: finalCountry || "",
      type: type || "",
      url: url || null,
      lat: lat || null,
      lon: lon || null,
      website: website || null,
      image: image || null,
      opening_hours: opening_hours || null,
    };

    user.savedPlaces.push(newPlace);
    await user.save();

    console.log("Saved places now:", user.savedPlaces);

    res.json({ savedPlaces: user.savedPlaces });
  } catch (err) {
    console.error("Error in addFavorite:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// Add search history
export const addSearchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.searchHistory.push({ city: req.body.city });
    await user.save();

    res.json({ searchHistory: user.searchHistory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all favorites
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("savedPlaces");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ savedPlaces: user.savedPlaces });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a favorite by name or ID
export const deleteFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { name } = req.params; // e.g., /api/user/favorites/:name

    user.savedPlaces = user.savedPlaces.filter(
      (place) => place.name.toLowerCase() !== name.toLowerCase()
    );

    await user.save();
    res.json({ message: "Favorite deleted", savedPlaces: user.savedPlaces });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
