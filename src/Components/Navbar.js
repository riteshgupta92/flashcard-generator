import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="m-auto mt-[5px] w-[80%] mb-1  p-[10px]">
      <div className="m-auto text-center relative">
        <h1 className="text-lg font-bold text-left">Create Flashcard</h1>
        <ul className="flex flex-row space-x-11 my-3 mx-1 text-gray-500 font-bold text-text-base">
          <li className="pb-2 hover:text-red-500 hover:border-b-4 hover:border-red-500 hover:pb-0.5 rounded-[0.5px] transition-colors duration-1000 active:text-red-500 transition-none">
            {/* Navlink component to sets selected route */}
            <NavLink to={"/createflashcards"}>Create New</NavLink>
          </li>
          <li className="pb-2 hover:text-red-500 hover:border-b-4 hover:border-red-500 hover:pb-0.5 rounded-[0.5px] transition-colors duration-1000 active:text-red-500 transition-none">
            {/* Navlink component to sets selected route */}
            <NavLink to={"/my-flashcards"}>My Flashcard</NavLink>
          </li>
        </ul>
      </div>
      <hr className="border-1 border-gray-400 -my-[13.5px]" />
    </div>
  );
};

export default Navbar;
