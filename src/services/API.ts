import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9600/admin/",
  responseType: "json",
  headers: {
  },
});

export const URL_PRODUCTS = "/products"
export const URL_CUSTOMERS = "/customers"
export const URL_ORDER = "/orders"
export const URL_ORDER_RETURN = "/orders/returns"
export const URL_ORDER_HISTORY = (id: number) => `${URL_ORDER}/${id}/histories`
export const URL_ORDER_RETURN_HISTORY = (id: number) => `${URL_ORDER_RETURN}/${id}/histories`
export const URL_CUSTOMERS_ORDERS = (id: number) => `/customers/${id}/orders`