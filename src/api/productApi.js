import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/products";

export const getAllProducts = () => axios.get(API_BASE_URL);
export const getProductById = (id) => axios.get(`${API_BASE_URL}/${id}`);
export const createProduct = (data) => axios.post(API_BASE_URL, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE_URL}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/${id}`);
