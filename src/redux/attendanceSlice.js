import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice( {
    name: "attendance",
    initialState: {
        date: [],
        data: [],
        error: false
    },
    reducers: {
        getDate: (state,action) => {
            state.date = action.payload;
            state.error = false
        },
        getData: (state,action) => {
            state.data = action.payload;
            state.error = false
        }
    }
});
export const {
    getDate,
    getData
} = attendanceSlice.actions;

export default attendanceSlice.reducer