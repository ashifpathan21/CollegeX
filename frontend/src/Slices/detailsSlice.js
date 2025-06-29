import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  states: [],
  colleges: [],
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setStates(state, action) {
      state.states = action.payload;
    },
    setColleges(state, action) {
      state.colleges = action.payload;
    },
  },
});

export const { setStates, setColleges } = detailsSlice.actions;
export default detailsSlice.reducer;
