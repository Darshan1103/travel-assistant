import dotenv from "dotenv";
import Amadeus from "amadeus";

dotenv.config();

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

async function testCity() {
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: "Paris",
      subType: "CITY",
    });
    console.log(response.data);
  } catch (err) {
    console.error(err.response?.body || err.message);
  }
}

testCity();
