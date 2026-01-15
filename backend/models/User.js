// models/User.js
import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String },
});

const searchSchema = new mongoose.Schema({
  city: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    savedPlaces: [placeSchema],
    searchHistory: [searchSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
