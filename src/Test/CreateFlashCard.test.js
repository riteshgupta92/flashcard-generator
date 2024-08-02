import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import flashCardReducer from "../Stores/FlashCardSlice";
import CreateFlashCardPage from "../Pages/CreateFlashCardPage";

// Mock Redux store
const store = configureStore({
  reducer: {
    flashCard: flashCardReducer,
  },
});

test("Render input fields", () => {
  render(
    <Provider store={store}>
      <CreateFlashCardPage />
    </Provider>
  );

  // Debugging: Output the rendered DOM to inspect the issue
  screen.debug();

  // Check that the group name input is rendered
  const groupNameInput = screen.getByPlaceholderText("Group Name");
  expect(groupNameInput).toBeInTheDocument();

  // Attempt to use getByLabelText instead
  const groupDescriptionTextarea = screen.getByLabelText("Add description");
  expect(groupDescriptionTextarea).toBeInTheDocument();

  // Check that the "Add More" button is rendered
  const addMoreButton = screen.getByText("+ Add More");
  expect(addMoreButton).toBeInTheDocument();

  // Check that the submit button is rendered
  const submitButton = screen.getByText("Create");
  expect(submitButton).toBeInTheDocument();
});
