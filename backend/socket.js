import { Server } from 'socket.io'
import User from './models/User.js'

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('join', async ({ userId }) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { socketId: socket.id, active: true },
          { new: true }
        );
        socket.userId = userId;
        const friendSocketIds = await getFriendsSocketIds(userId);
        friendSocketIds.forEach(sId => {
          io.to(sId).emit("onlineStatus", { userId, online: true });
        });
      } catch (err) {}
    });

    socket.on("typing", async ({ to }) => {
      const receiverSocketId = await getSocketId(to);
      if (receiverSocketId) {
        
        io.to(receiverSocketId).emit("typing", { from: socket.userId });
      }
    });

    socket.on("stopTyping", async ({ to }) => {
      const receiverSocketId = await getSocketId(to);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", { from: socket.userId });
      }
    });

    socket.on('disconnect', async () => {
      try {
        if (socket.userId) {
          await User.findByIdAndUpdate(socket.userId, {
            active: false,
            socketId: null,
          });
          const friendSocketIds = await getFriendsSocketIds(socket.userId);
          friendSocketIds.forEach(sId => {
            io.to(sId).emit("onlineStatus", { userId: socket.userId, online: false });
          });
        }
      } catch (err) {}
    });
  });
}

export function sendMessageToSocketId(socketId, { event, data }) {
  if (!io) throw new Error('Socket not initialized!');
  io.to(socketId).emit(event, data);
}

export async function getSocketId(userId) {
  const user = await User.findById(userId);
  return user?.socketId;
}

export async function getFriendsSocketIds(userId) {
  const user = await User.findById(userId).populate("friends.user");
  return user.friends
    .map(f => f.user?.socketId)
    .filter(sId => sId);
}
