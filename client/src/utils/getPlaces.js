import axios from "axios";
import { MAPBOX_TOKEN } from "../config-global";

const getPlaces = async (searchText, types) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          types: types,
          country: "il",
          language: "en",
        },
      }
    );

    return response.data.features;
  } catch (error) {
    console.error("There was an error while fetching places:", error);
  }
};

export default getPlaces;
