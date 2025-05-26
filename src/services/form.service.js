import { axiosInstanceBearerCity } from "./instances";

export const getCities = async () => {
  try {
    const response = await axiosInstanceBearerCity.get("/City");
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}