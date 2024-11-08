import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import noFlashCard from "../Assets/noFlashCard.jpeg";
import almabetter from "../Assets/almabetter.png";
import { GiCrossMark } from "react-icons/gi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../Components/DeleteModel";

const MyFlashcardsPage = () => {
  // state to control the visibility of the detete confirmation modal.
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // state to store the flashcard data fetched from local storage.
  const [flashCardData, setFlashCardData] = useState([]);

  // state to store the flashcard items that is selected from deletion.
  const [delClickedItem, setDelClickedItem] = useState(null);

  // state to control how many flashcard display at a time.
  const [showCard, setShowCard] = useState(6);

  // hooks from react-router-dom to naviagte between the pages.
  const navigate = useNavigate();

  // useEffect hooks to fetch flashcard data from localstorage on component did mount.
  useEffect(() => {
    const storedFlashCards =
      JSON.parse(localStorage.getItem("flashCards")) || [];
    setFlashCardData(storedFlashCards);
  }, []);

  // function to  navigate to the flashcard details page, passing the selected flashcard item as state.
  const handleViewCardsClick = (elem) => {
    navigate("/flashCardDetails", { state: elem });
  };

  // function to set the item to be deleted and show the delete confimation modal.
  const deleteFlashCard = (delClickedItem) => {
    localStorage.removeItem("flashCards")
    setDelClickedItem(delClickedItem);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="myFlashcardDiv w-[78%] m-auto mt-3 ">
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          flashCardData={flashCardData}
          setFlashCardData={setFlashCardData}
          delClickedItem={delClickedItem}
        />
        {/* Render the toast notification container*/}
        <ToastContainer />
        <div className="absolute pr-10 overflow-visible text-sm font-bold text-right text-gray-500 totalCards right-24">
          {!flashCardData.length
            ? null
            : `Total FlashCards : ${flashCardData.length}`}
        </div>
        {/* Display the flashcards */}
        <div
          name="displayFlashcardDiv"
          className="flex flex-wrap m-auto overflow-hidden "
        >
          {flashCardData.length !== 0 ? (
            flashCardData.slice(0, showCard).map((elem, index) => (
              <div
                key={index}
                name="childCards"
                className="commonBorder childCards flex flex-col m-auto bg-white w-[300px] h-[200px] p-[8px] rounded mt-[50px] relative mb-[10px] "
              >
                {/* Delete button for each flashcard*/}
                <button
                  className="absolute hidden text-3xl text-gray-500 del -right-3 -top-5 hover:text-4xl hover:text-red-600 "
                  onClick={() => {
                    deleteFlashCard(elem, index);
                  }}
                >
                  <GiCrossMark />
                </button>
                {/* Group image or default image*/}
                <img
                  className="border-2 bg-slate-400 w-[70px] h-[70px] m-auto rounded-full absolute -top-12 left-[39.3%] mb-10"
                  src={elem.groupImage ? elem.groupImage : almabetter}
                  alt=""
                />
                <h1 className="mt-4 font-bold ">{elem.groupName}</h1>
                <h2 className="h-10 mt-1 text-gray-700">
                  {elem.groupDescription.length > 60
                    ? elem.groupDescription.slice(0, 60) + "..."
                    : elem.groupDescription}
                </h2>
                <h2 className="mt-8 font-bold text-gray-500">
                  {elem.term.length} Cards
                </h2>
                <button
                  className="w-40 h-8 m-auto font-medium text-red-600 duration-300 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white"
                  onClick={() => handleViewCardsClick(elem)}
                >
                  View Cards
                </button>
              </div>
            ))
          ) : (
            // display when there are no flascards.
            <div className="w-[100%] h-[80vh] rounded noFlashcard overflow-hidden relative font-bold">
              <img
                className="absolute w-[100%] h-[100%]"
                src={noFlashCard}
                alt=""
              />
              <div className="mt-32 text-red-800 text-7xl backdrop-blur-sm">
                "No Flashcard available"
              </div>
              <br />
              <p className="mt-5 text-xl backdrop-blur-sm">
                Please go and
                <i className="underline text-amber-950 hover:text-teal-700">
                  <Link to="/createflashcards"> Create New FlashCard</Link>
                </i>
              </p>
            </div>
          )}
          {/* Conditionally render buttons to show more or fewer flashcards */}
          {flashCardData && flashCardData.length > 6 ? (
            <div className="w-[100%]">
              <div className="mt-5 text-right">
                {flashCardData.length === showCard ? (
                  <button
                    onClick={() => {
                      setShowCard(6);
                    }}
                    className="w-24 mx-5 mb-24 font-bold text-red-700"
                  >
                    See less
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowCard(flashCardData.length);
                    }}
                    className="w-24 mx-5 mb-24 font-bold text-red-500 hover:text-red-700"
                  >
                    See all
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MyFlashcardsPage;
