import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notesData: [],
  },
  reducers: {
    updateData: (state, action) => {
      return [...action.payload];
    },
  },
});

export const notesReducer = notesSlice.reducer;
export const { updateData } = notesSlice.actions;
