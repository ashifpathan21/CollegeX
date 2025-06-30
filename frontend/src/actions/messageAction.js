import { apiConnector } from "../api/apiConnector";
import { messageEndpoints } from "../api/apis";
import { setAllMessages } from "../slices/messageSlice";
import toast from "react-hot-toast";

export function sendMessage(data, token) {
  return async () => {
    try {
     const res =  await apiConnector('POST', messageEndpoints.SEND_MESSAGE, data, {
        Authorization: `Bearer ${token}`
      });
      toast.success('Message Sent')
      return res.data.message
    } catch (error) {
      toast.error("Failed to send message");
    }
  };
}
export function getMessages(receiverId, productId, token) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "GET",
        `${messageEndpoints.GET_ALL_MESSAGE}?receiverId=${receiverId}&productId=${productId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
    
      dispatch(setAllMessages(res.data.messages)); // or .data.data based on your structure
      return res.data.messages
    } catch (error) {
      toast.error("Failed to load messages");
    }
  };
}


export function seenMessages( from, productId  , token) {
  return async () => {
    try {
      const res = await apiConnector(
        "POST",
        messageEndpoints.SEEN_MESSAGES,
        {
      from , productId
    },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      return res.data.data;
    } catch (error) {
      toast.error("Failed to fetch conversations");
      return [];
    }
  };
}