import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    saveCategory: (state, action) => {
      state.category = action.payload;
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
    setCategories: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { saveCategory, addCategory, setCategories } =
  categorySlice.actions;

export default categorySlice.reducer;
