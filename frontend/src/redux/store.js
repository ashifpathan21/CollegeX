import { configureStore } from '@reduxjs/toolkit';

// Slices
import userReducer from '../Slices/userSlice';
import productReducer from '../Slices/productSlice';
import categoryReducer from '../Slices/categorySlice';
import detailsReducer from '../Slices/detailsSlice';
import messageReducer from '../Slices/messageSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    details: detailsReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To ignore non-serializable values like FormData
    }),
});

export default store;
