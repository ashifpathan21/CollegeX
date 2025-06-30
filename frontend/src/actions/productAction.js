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
      navigate('/myProducts');
    } catch (err) {
      toast.error("Error creating product");
    }
  };
}


export function updateProduct(productId, data, token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        'PUT',
        `${productEndpoints.UPDATE_PRODUCT}/${productId}`,
        data,
        { Authorization: `Bearer ${token}` }
      );
      toast.success("Updated successfully");
      return response.data.product;
    } catch (err) {
      toast.error("Failed to update");
    
    }
  };
}

export function deleteProduct(productId, token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        'DELETE',
        `${productEndpoints.DELETE_PRODUCT}/${productId}`,
        null,
        { Authorization: `Bearer ${token}` }
      );
      toast.success("Deleted successfully");
      return true;
    } catch (err) {
      toast.error("Failed to delete");
   
    }
  };
}


export function getAllProducts() {
  return async (dispatch) => {
    try {
      const response = await apiConnector('GET', productEndpoints.GET_ALL_PRODUCTS);
      dispatch(setAllProducts(response.data.products));
      return response.data.products
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
  
      dispatch(setMyProducts(response.data.products));
      return response.data.products
    } catch (err) {
      toast.error("Error loading your products");
    }
  };
}
