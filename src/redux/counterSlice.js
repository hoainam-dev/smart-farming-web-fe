import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    totalRecord: 0,
  },
  reducers: {
    increase: (state) => {
      state.value += 1;
      console.log("couter: ", state.value);
    },
    descrease: (state) => {
      state.value -= 1;
    },
    totalRecord: (state, action) => {
      state.totalRecord = action.payload;
    },
  },
});

export const {
  increase,
  descrease,
  totalRecord
} = counterSlice.actions;

export default counterSlice.reducer