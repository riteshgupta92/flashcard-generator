import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import CreateFlashCardPage from "../Pages/CreateFlashCardPage";

// Create a mock store
const mockStore = configureStore([]);
const store = mockStore({
  flashCard: {
    formData: {} // Add mock data as needed
  }
});

describe("CreateFlashCardPage", () => {
  it("renders the component and displays correct text", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateFlashCardPage />
        </MemoryRouter>
      </Provider>
    );

    // Print the rendered output for debugging
    screen.debug();

    // Check for the correct elements and text
    const createGroupText = screen.getByText(/Create Group\*/i); // Adjust text based on actual content
    expect(createGroupText).toBeInTheDocument();

    const uploadImageText = screen.getByText(/Upload Image/i);
    expect(uploadImageText).toBeInTheDocument();
    
    const addDescriptionText = screen.getByText(/Add description/i);
    expect(addDescriptionText).toBeInTheDocument();
    
    const addMoreText = screen.getByText(/\+ Add More/i);
    expect(addMoreText).toBeInTheDocument();
    
    // Specifically target the button with the "Create" text
    const createButton = screen.getByRole('button', { name: /Create/i });
    expect(createButton).toBeInTheDocument();
  });

  // Add more test cases as needed
});
