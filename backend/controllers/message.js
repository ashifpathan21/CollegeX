import Message from '../models/Message.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { getSocketId, sendMessageToSocketId } from '../socket.js';

// ======= SEND MESSAGE =========
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id; // From JWT middleware
    const { receiverId, productId, content } = req.body;

    if (!receiverId || !productId || !content) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate users
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ success: false, message: "Sender or receiver not found" });
    }

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Save the message
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      product: productId,
      content,
    });

    // Add to sender's friend list if not already there
    if (!sender.friends.includes(receiverId)) {
      sender.friends.push(receiverId);
      await sender.save();
    }

    // Add to receiver's friend list if not already there
    if (!receiver.friends.includes(senderId)) {
      receiver.friends.push(senderId);
      await receiver.save();
    }

    // Emit message via socket
    const receiverSocketId = await getSocketId(receiverId);
    if (receiverSocketId) {
      sendMessageToSocketId(receiverSocketId, {
        event: 'newMessage',
        data: {
          message,
          from: senderId,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: err.message,
    });
  }
};

// ======= GET CONVERSATION BETWEEN TWO USERS ON A PRODUCT =======
export const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { receiverId, productId } = req.query;

    if (!receiverId || !productId) {
      return res.status(400).json({ success: false, message: "Receiver and Product ID required" });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
      product: productId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not retrieve messages",
      error: err.message,
    });
  }
};
