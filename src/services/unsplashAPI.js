import axios from "axios";

const BASE_URL = "https://api.unsplash.com";
const ACCESS_KEY = "0xoLXr0upGb2_3NuNJpCAoqPSYoFG3G_rHOvnGHD_ZI";

export const fetchImages = async (query, page) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: 12,
      orientation: "squarish",
    },
  });

  return response.data;
};
