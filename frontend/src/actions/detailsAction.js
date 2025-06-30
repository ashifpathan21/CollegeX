import { apiConnector } from "../api/apiConnector";
import { detailsEndpoints } from "../api/apis";
import { setStates, setColleges } from "../slices/detailsSlice";
import toast from "react-hot-toast";

export function fetchStates() {
  return async (dispatch) => {
    try {
      const response = await apiConnector('GET', detailsEndpoints.GET_STATES);
      dispatch(setStates(response.data));
    } catch (error) {
      toast.error("Failed to load states");
    }
  };
}

export function fetchColleges(stateId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector('GET', `${detailsEndpoints.GET_COLLEGE}${stateId}`);
      dispatch(setColleges(response.data.data));
    } catch (error) {
      toast.error("Failed to load colleges");
    }
  };
}
