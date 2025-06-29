import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  myProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setAllProducts(state, action) {
      state.allProducts = action.payload;
    },
    setMyProducts(state, action) {
      state.myProducts = action.payload;
    },
  },
});

export const { setAllProducts, setMyProducts } = productSlice.actions;
export default productSlice.reducer;
