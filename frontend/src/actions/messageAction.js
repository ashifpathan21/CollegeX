import { apiConnector } from "../api/apiConnector";
import { messageEndpoints } from "../api/apis";
import { setAllMessages } from "../slices/messageSlice";
import toast from "react-hot-toast";

export function sendMessage(data, token) {
  return async () => {
    try {
      await apiConnector('POST', messageEndpoints.SEND_MESSAGE, data, {
        Authorization: `Bearer ${token}`
      });
    } catch (error) {
      toast.error("Failed to send message");
    }
  };
}

export function getAllMessages(chatId, token) {
  return async (dispatch) => {
    try {
      const res = await apiConnector("POST", messageEndpoints.GET_ALL_MESSAGE, { chatId }, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(setAllMessages(res.data.data));
    } catch (error) {
      toast.error("Failed to load messages");
    }
  };
}
