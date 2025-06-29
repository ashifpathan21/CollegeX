import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "./context/SocketContext.jsx";
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";
import 'remixicon/fonts/remixicon.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketProvider>
          <App />
          <Toaster />
        </SocketProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
