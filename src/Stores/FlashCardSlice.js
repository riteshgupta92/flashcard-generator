import { createSlice } from "@reduxjs/toolkit";

// Retrieves flashcards stored in the browser's localStorage and parses them from a JSON string into a JavaScript object.
const storeFlashCards = JSON.parse(localStorage.getItem("flashCards"));

// Define the initial state
const initialState = {
  // An object to hold form inputs for creating or updating flashcards.
  formData: {
    groupName: "",
    groupImage: "",
    groupDescription: "",
    term: [
      {
        termName: "",
        termDefinition: "",
        termImage: "",
      },
    ],
  },
  // an array to hold the list of flashcards, initialized with data from localStorage or an empty array if none is found.
  flashCards: storeFlashCards || [],
};

// Create the flashcard slice
const flashCardSlice = createSlice({
  name: "flashCard",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      // updates the formData state with the payload from the action.
      state.formData = action.payload;
    },
    addFlashCard: (state, action) => {
      state.flashCards.push(action.payload)
      localStorage.setItem("flashCards", JSON.stringify(state.flashCards));
    },
  },
});

// Export actions and reducer
export const { updateFormData, addFlashCard } = flashCardSlice.actions;
export default flashCardSlice.reducer;
