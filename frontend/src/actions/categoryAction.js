import { apiConnector } from "../api/apiConnector";
import { categoryEndpoints } from "../api/apis";
import { setCategories } from "../slices/categorySlice";
import toast from "react-hot-toast";

export function fetchCategories() {
  return async (dispatch) => {
    try {
      const response = await apiConnector('GET', categoryEndpoints.GET_ALL_CATEGORIES);
      dispatch(setCategories(response.data.categories));
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };
}
