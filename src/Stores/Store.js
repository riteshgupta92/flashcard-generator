// Created a Redux store and combine the flashcard slice.
import { configureStore } from "@reduxjs/toolkit";
import flashCardReducer from "./FlashCardSlice";

const store = configureStore({
  reducer: {
    flashCard: flashCardReducer,
  },
});
export default store;