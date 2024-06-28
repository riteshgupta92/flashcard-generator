import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateFlashCardPage from "./Pages/CreateFlashCardPage";
import MyFlashCardPage from "./Pages/MyFlashCardPage";
import FlashCardDetailPage from "./Pages/FlashCardDetailPage";
import NoPageFound from "./Components/NoPageFound";
import Navbar from "./Components/Navbar";
import Logo from "./Components/Logo";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./Stores/Store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Logo />
          <Navbar />
          <Routes>
            <Route path="/createflashcards" element={<CreateFlashCardPage />}>
              CreateFlashcard
            </Route>
            <Route path="/my-flashcards" element={<MyFlashCardPage />}>
              MyFlashcard
            </Route>
            <Route path="/flashCardDetails" element={<FlashCardDetailPage />}>
              FlashCardDetails
            </Route>
            <Route path="/" element={<CreateFlashCardPage />}>
              Default Page
            </Route>
            <Route path="*" element={<NoPageFound />}>
              Page Not Found
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
