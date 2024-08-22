import { request } from "@/lib/request";

export const getMenu = async () => {
  const response = await request(`/api/menu`, "GET", {});
  return response;
};