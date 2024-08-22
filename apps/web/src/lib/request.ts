import axios from "axios";

export const request = async (path: string, method: string, data: any) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const response = await axios.request({
    url: `${baseUrl}${path}`,
    method,
    data,
  });
  return response.data;
};
