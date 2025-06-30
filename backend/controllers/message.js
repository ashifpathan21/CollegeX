import Message from '../models/Message.js';
import User from '../models/User.js';

export const sendMessage = async (req, res) => {
  try {
    const { receiver, product, text } = req.body;
    const sender = req.user.id;

    if (!receiver || !product || !text) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Create message
    const message = await Message.create({
      sender,
      receiver,
      product,
      content:text,
      isSeen: false,
    });

    // Helper: update friend record
    const updateFriendArray = async (userId, friendId, productId, messageId) => {
      const user = await User.findById(userId);
      const existing = user.friends.find(
        (f) =>
          f.user.toString() === friendId &&
          f.product.toString() === productId
      );

      if (existing) {
        existing.messages.push(messageId);
      } else {
        user.friends.push({
          user: friendId,
          product: productId,
          messages: [messageId],
        });
      }

      await user.save();
    };

    // Update for sender and receiver
    await updateFriendArray(sender, receiver, product, message._id);
    await updateFriendArray(receiver, sender, product, message._id);

    res.status(201).json({ success: true, message });
  } catch (err) {
    console.error("Send message error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: err.message,
    });
  }
};

// ========== GET MESSAGES ========== //
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

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not retrieve messages",
      error: err.message,
    });
  }
};

// ========== MARK MESSAGES AS SEEN ========== //
export const markMessagesAsSeen = async (req, res) => {
  try {
    const userId = req.user.id;
 
    const { from, productId } = req.body;
    if (!from || !productId) {
      return res.status(400).json({ success: false, message: "Sender and Product ID required" });
    }

    await Message.updateMany(
      {
        sender: from,
        receiver: userId,
        product: productId,
        isSeen: false,
      },
      { $set: { isSeen: true } }
    );

    res.status(200).json({ success: true, message: "Messages marked as seen" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not mark messages as seen",
      error: err.message,
    });
  }
};
