import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import CryptoJS from 'crypto-js';
import Navbar from '../components/Home/Navbar.jsx';
import { ShieldCheck, MessageSquareLock, Ban } from 'lucide-react'; // optional icons
import { setAllMessages } from '../Slices/messageSlice.js';
import { getMessages, sendMessage, seenMessages } from '../actions/messageAction';
import toast from "react-hot-toast";

const secretKey = import.meta.env.VITE_CHAT_SECRET_KEY;

const Chat = () => {
  const [receiver, setReceiver] = useState(null);
  const [product, setProduct] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [filter, setFilter] = useState('All');
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const location = useLocation();
  const navigate = useNavigate();
  const chatWindowRef = useRef(null);
  const [typingUser, setTypingUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatWindow, setChatWindow] = useState(false);
  const [chatters, setChatters] = useState(user?.friends || []);
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [filteredChatters, setFilteredChatters] = useState([]);
  const [selectedChat , setSelectedChat ] = useState({})
  const messages = useSelector((state) => state.message.allMessages);
  const [message , setMessage]= useState([])
  const token = localStorage.getItem('token') 

 
  useEffect(() => {
   setMessage(messages)
  }, [messages])
  

  useEffect(() => {
  if (receiver && product) {
  
    dispatch(getMessages(receiver._id, product._id , token));
  }
}, [receiver, product]);




useEffect(() => {
  if (!receiver?._id || !product?._id) return;
  if(message[message?.length -1 ]?.isSeen )return ;
  dispatch(seenMessages( receiver._id, product._id , token));
  socket.emit('messageSeen', {
    to: receiver._id,
    productId: product._id,
  });
}, [message, receiver?._id]);

useEffect(() => {
  socket.on('messageSeen', ({ from, productId }) => {
    // Update messages state
   
    dispatch(getMessages( from, productId , token));
  });

  return () => socket.off('messageSeen');
}, [socket, dispatch, token]);


   useEffect(() => {
    if (!user?._id) return;

    socket.emit('join', { userId: user._id });

    socket.on('onlineStatus', ({ userId, online }) => {
      setOnlineUsers((prev) => {
        const updated = new Set(prev);
        online ? updated.add(userId) : updated.delete(userId);
        return [...updated];
      });
    });

    socket.on('typing', ({ from }) => setTypingUser(from));
    socket.on('stopTyping', ({ from }) => setTypingUser((prev) => (prev === from ? null : prev)));

    socket.on('newMessage', ({text}) => {
      dispatch(setAllMessages([...messages, text]));
      scrollToBottom();
    });

    return () => {
      socket.off('onlineStatus');
      socket.off('typing');
      socket.off('stopTyping');
      socket.off('newMessage');
    };
  }, [user?._id, socket, dispatch, messages]);

  useEffect(() => {
    
    if (!user?.friends || !user?.products) return;

    const productIds = new Set(user.products.map(prod => prod._id.toString()));

    const tempBuyers = [];
    const tempSellers = [];

    user.friends.forEach(friend => {
      const productId = friend.product?._id?.toString();
      if (productIds.has(productId)) {
        tempSellers.push(friend);
      } else {
        tempBuyers.push(friend);
      }
    });

    setBuyers(tempBuyers);
    setSellers(tempSellers);
  }, [user]);

  useEffect(() => {
    switch (filter.toLowerCase()) {
      case "sell":
        setFilteredChatters(sellers);
        break;
      case "buy":
        setFilteredChatters(buyers);
        break;
      default:
        setFilteredChatters(chatters);
    }
  }, [filter, chatters, buyers, sellers]);




   const handleSend = async () => {
    if (!inputMessage.trim()) return;
    if (receiver._id === user._id) return toast.error("You can't message yourself");

    const encryptedText = encrypt(inputMessage)
    const payload = {
      sender: user._id,
      receiver: receiver._id,
      product: product._id,
      text: encryptedText
    };

    try {
     const message =  await dispatch(sendMessage(payload, token)); 
      dispatch(setAllMessages([...messages, message]));
      setInputMessage('');
      socket.emit('stopTyping', { to: receiver._id });
      socket.emit('sendMessage', { to:receiver._id, text:message });
   
      scrollToBottom();
    } catch {
      toast.error('Failed to send message');
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatWindowRef.current?.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  const handleTyping = () => {
    socket.emit('typing', { to: receiver._id });
    setTimeout(() => {
      socket.emit('stopTyping', { to: receiver._id });
    }, 1500);
  };

  useEffect(() => {
    const state = location.state;
    if (state?.receiver && state?.product) {
      const data = {
        user:state.receiver ,
        product:state.product
      }
      setReceiver(state.receiver);
      setProduct(state.product);
      setSelectedChat(data) ;
      setChatWindow(true);
    }
  }, [location.state]);

  const encrypt = (input) => {
    const encryptedText = CryptoJS.AES.encrypt(input, secretKey).toString();
    return encryptedText;
  };



  const decrypt = (cipher) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipher, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted || cipher;
    } catch {
      return cipher;
    }
  };

  return (
    <div className='bg-[#080b19f2] text-white w-screen min-h-screen h-full'>
      <Navbar />
      <h2 className='w-full flex justify-center items-center gap-3 p-2 text-2xl font-semibold text-center'>Chats   <MessageSquareLock className="text-blue-600" /> </h2>

      <div className='p-2 flex  w-screen h-full min-h-screen gap-5   items-start'>
     {/* chatters  */}
         
            <div className={`${chatWindow ? "hidden" : "flex"} md:flex lg:flex w-full md:w-1/2 lg:w-1/2  flex-col`}>
          <div className='w-full px-2 p-1 flex gap-3'>
            <button onClick={() => setFilter('All')} className={`p-2 px-4 ${filter === 'All' && "bg-gray-500"} rounded-xl shadow-cyan-400 shadow`}>All</button>
            <button onClick={() => setFilter('Buy')} className={`p-2 px-4 ${filter === 'Buy' && "bg-gray-500"} rounded-xl shadow-cyan-400 shadow`}>Buy</button>
            <button onClick={() => setFilter('Sell')} className={`p-2 px-4 ${filter === 'Sell' && "bg-gray-500"} rounded-xl shadow-cyan-400 shadow`}>Sell</button>
          </div>

          <div className='p-3 mt-5 flex flex-col gap-3'>
            {filteredChatters?.length > 0 && filteredChatters.map((friend, i) => (
              <div  onClick={() => {
                setReceiver(friend?.user);
               setProduct(friend?.product)
                setSelectedChat(friend) ;
                setChatWindow(true) ;
              }} key={i} className='shadow flex items-center gap-4 shadow-cyan-300 p-3 px-4 rounded-xl w-full'>
                <div className='relative h-10 w-10 '>
                  <img className='h-10 w-10 aspect-square rounded-full' src={friend?.user?.profilePic} alt='' />
                 {friend?.user?.active &&  <div className='h-2 w-2 bg-green-400 rounded-full animate-pulse absolute bottom-1 right-0'></div>}
                </div>
                <div>
                  <p className='font-semibold capitalize '>{friend?.user?.fullName + " - "  }<span className='text-sm  font-medium '>{friend?.user?.branch}</span></p>
                  <p className='text-sm  capitalize text-slate-400'>{friend?.user?.college}</p>
                  <p className=' text-gray-400 capitalize'>{friend?.product?.title + " - ₹" + friend?.product?.price}</p>
                </div>

                <div className='flex flex-col gap-2 p-3 '>
                  {friend?.user?.isSpammer &&    <Ban className="text-red-500" /> }
                  {friend?.user?.isVerified &&   <ShieldCheck className="text-green-600" /> }
                </div>
              </div>
            ))}
          </div>
        </div>

          
          {/* Chat window content here */}

        {chatWindow && selectedChat &&  <div className=' flex flex-col  rounded-xl w-full shadow-cyan-300 h-screen shadow  '>
                     <div  
           className='shadow flex items-center gap-4 shadow-cyan-300 p-3 px-4 rounded-xl w-full'>
                <div className='relative h-10 w-10 '>
                  <img className='h-10 w-10 aspect-square rounded-full' src={selectedChat?.user?.profilePic} alt='' />
                 {selectedChat?.user?.active &&  <div className='h-2 w-2 bg-green-400 rounded-full animate-pulse absolute bottom-1 right-0'></div>}
                </div>
                <div>
                  <p className='font-semibold capitalize '>{selectedChat?.user?.fullName + " - "  }<span className='text-sm  font-medium '>{selectedChat?.user?.branch}</span></p>
                  <p className='text-sm  capitalize text-slate-400'>{selectedChat?.user?.college}</p>
                  <p className=' text-gray-400 capitalize'>{selectedChat?.product?.title + " - ₹" + selectedChat?.product?.price}</p>
                </div>

                <div className='flex flex-col gap-2 p-3 '>
                  {selectedChat?.user?.isSpammer &&    <Ban className="text-red-500" /> }
                  {selectedChat?.user?.isVerified &&   <ShieldCheck className="text-green-600" /> }
                </div>
              </div>
            

          <div ref={chatWindowRef} className='overflow-y-scroll h-full flex flex-col gap-2 p-3'>
             {message?.filter(
             (msg) => msg.sender === user._id && msg.receiver === receiver._id || 
                 msg.receiver === user._id && msg.sender === receiver._id
             )?.map((msg, i) => (
              <div
                 key={i}
               className={`p-2 px-3 max-w-[70%] rounded-xl ${msg.sender === user._id ? "bg-blue-600 self-end" : "bg-gray-700 self-start"}`}
             >
              {decrypt(msg.content)}
               {msg.sender === user._id && msg.isSeen && (
               <span className='text-xs text-gray-300 ml-2'>✓✓</span>
              )}
              </div>
                ))}
            </div>

              {typingUser === receiver._id && (
              <div className='text-sm text-gray-400 px-4 -mt-3'>Typing...</div>
                )}

              <div className='w-full p-3 gap-2  flex relative '>
               <input
  type="text"
  value={inputMessage}
  onChange={(e) => {
    setInputMessage(e.target.value);
    handleTyping();
  }}
  placeholder='Send Message'
  className='bg-slate-900 rounded-xl shadow shadow-cyan-300 px-4 p-2 w-full text-white'
/>

<button
  onClick={handleSend}
  className='p-2 bg-green-500 font-semibold rounded-xl px-4'
>
  Send
</button>
 </div>
        </div>}
      </div>
    </div>
  );
};

export default Chat;
