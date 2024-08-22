import { request } from "@/lib/request";

export const getFiles = async () => {
  const response = await request("/api/files", "GET", {});
  return response;
};

export const getFile = async (id: string) => {
  const response = await request(`/api/files/${id}`, "GET", {});
  return response;
};

export const createFile = async (data: any) => {
  const response = await request("/api/files", "POST", data);
  return response;
};

export const updateFile = async (id: string, data: any) => {
  const response = await request(`/api/files/${id}`, "PUT", data);
  return response;
};

export const deleteFile = async (id: string) => {
  const response = await request(`/api/files/${id}`, "DELETE", {});
  return response;
};
