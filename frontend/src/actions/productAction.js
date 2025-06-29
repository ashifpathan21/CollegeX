import { apiConnector } from "../api/apiConnector";
import { productEndpoints } from "../api/apis";
import { setAllProducts, setMyProducts } from "../slices/productSlice";
import toast from "react-hot-toast";

export function createProduct(data, token, navigate) {
  return async () => {
    try {
      await apiConnector('POST', productEndpoints.CREATE_PRODUCT, data, {
        Authorization: `Bearer ${token}`
      });
      toast.success("Product created successfully");
      navigate('/');
    } catch (err) {
      toast.error("Error creating product");
    }
  };
}

export function getAllProducts() {
  return async (dispatch) => {
    try {
      const response = await apiConnector('GET', productEndpoints.GET_ALL_PRODUCTS);
   

      dispatch(setAllProducts(response.data.products));
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };
}

export function getMyProducts(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector('GET', productEndpoints.MY_PRODUCT, null, {
        Authorization: `Bearer ${token}`
      });
      dispatch(setMyProducts(response.data.data));
    } catch (err) {
      toast.error("Error loading your products");
    }
  };
}
