import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getInventory = () => API.get("/inventory");
export const addProduct = (data) => API.post("/inventory/add", data);
export const updateProduct = (id, data) => API.put(`/inventory/update/${id}`, data);
export const deleteProduct = (id) => API.delete(`/inventory/delete/${id}`);
