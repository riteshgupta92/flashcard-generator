import React from "react";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik"; // for form handling
import validationSchema from "../Validation/ValidationSchema"; // for form validation
import validateImage from "../Validation/ValidateImage"; // image validation
import { MdOutlineUploadFile } from "react-icons/md"; // icons for UI
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { GiCrossMark } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";  // toast notifications
import { useSelector, useDispatch } from "react-redux"; // Redux hooks for state management
import { addFlashCard } from "../Stores/FlashCardSlice"; // Action for adding flashcards

const CreateFlashCardPage = () => {
  const dispatch = useDispatch();

  // Selecting form data from Redux store
  const formData = useSelector((state) => state.flashCard.formData);
  console.log(formData)

  // Function to add more terms to the form
  const addMoreTermS = (values, moreTerm) => {
    moreTerm.insert(values.term.length + 1, {
      termName: "",
      termDefinition: "",
      termImage: "",
    });
    // Toast notification for adding a term card
    toast.info("Term Card Added !", {
      position: "top-right",
      pauseOnFocusLoss: false,
    });
  };

  // Function to submit the form
  const submitForm = (values) => {
    dispatch(addFlashCard(values)); // Dispatching action to add flashcard using Redux
    // Toast notification for successful flashcard creation
    toast.success("FlashCard Created Successfully", {
      theme: "colored",
      position: "top-center",
      pauseOnFocusLoss: false,
    });
  };

  return (
    <div
      className="w-[78%] m-auto mt-2 flex flex-col md:mt-10 "
      name="createFlashcardDiv"
    >
      {/* Container for toast notifications */}
      <ToastContainer />
      <Formik
        initialValues={formData} // // Initial form values from Redux store
        validationSchema={validationSchema} // // Validation schema for form validation
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm({ values: "" }); //  Resetting form after submission
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            {/* Group creation section */}
            <div
              className="bg-white w-[100%] h-[30%] p-[15px] flex flex-col text-left pl-[25px] commonBorder"
              name="createGroupDiv"
            >
              <div className="flex flex-col md:flex-row ">
                <div className="flex flex-col">
                  <label htmlFor="groupName"> Create Group*</label>
                  <Field
                    name="groupName"
                    id="groupName"
                    type="text"
                    placeholder="Group Name"
                    className="w-full md:w-96"
                  ></Field>

                  <ErrorMessage name="groupName">
                    {(emsg) => <div className="error ">{emsg}</div>}
                  </ErrorMessage>
                </div>

                <div>
                  {/* Handling group image upload */}
                  {values.groupImage ? (
                    <div className="flex ">
                      <img
                        className="text-center rounded-full h-28 w-28 mx-7 "
                        src={values.groupImage}
                        alt=""
                      />

                      <GiCrossMark
                        name="groupImgDelIcon"
                        className="mt-[10px] -ml-[20px] text-gray-400 hover:text-red-600 hover:text-xl hover:cursor-pointer "
                        onClick={() => setFieldValue("groupImage", null)}
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="groupImage"
                      className="groupImage order w-40 h-[3px] cursor-pointer px-2  ml-5 my-3 mt-[24px] p-4  border border-gray-400 flex  items-center justify-center rounded text-sm  "
                    >
                      <MdOutlineUploadFile className=" text-[2em] text-blue-700" />
                      <span className="font-bold text-blue-700 ">
                        Upload Image
                      </span>
                    </label>
                  )}

                  <input
                    className="hidden "
                    name="groupImage"
                    id="groupImage"
                    type="file"
                    onClick={(event) => (event.target.value = null)}
                    onChange={(event) => {
                      event.preventDefault();
                      // Handling image validation and setting group image
                      if (
                        event.target.files[0] &&
                        !validateImage.includes(event.target.files[0].type)
                      ) {
                        toast.warning("Please Upload in Image Format !", {
                          pauseOnFocusLoss: false,
                        });
                      } else if (event.target.files[0].size > 304800) {
                        toast.warning(
                          "Image size is very Large ! Please Select Image size less than 300kb",
                          {
                            pauseOnFocusLoss: false,
                          }
                        );
                      } else {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue("groupImage", reader.result);
                        };
                      }
                    }}
                  />
                </div>
              </div>
              {/* Group description input */}
              <div className="flex flex-col" name="groupDescriptionDiv">
                <label htmlFor="groupDescription"> Add description</label>
                <Field
                  as="textarea"
                  name="groupDescription"
                  id="groupDescription"
                  placeholder="Group Description... "
                  className="w-full md:w-[70%]  h-28 resize-none scrollbar-hide"
                ></Field>

                <ErrorMessage name="groupDescription">
                  {(emsg) => <div className="error ">{emsg}</div>}
                </ErrorMessage>
              </div>
            </div>
            {/* Term card creation section */}
            <div
              className=" w-[100%] mt-3 pt-1 bg-white commonBorder flex flex-col text-left pl-[25px] "
              name="createTermCardDiv"
            >
              <FieldArray
                name="term"
                render={(moreTerm) => (
                  <div className="flex-col overflow-hidden bg-white rounded-md">
                    {/* Mapping over term array to display each term card */}
                    {values.term &&
                      values.term.map((term, index) => (
                        <div
                          name="termsDiv"
                          className="relative flex-row flex-wrap w-full mt-2 border-gray-400 md:flex md:space-x-4 md:items-center"
                          key={index}
                        >
                          {/* Index label */}
                          <div className="w-8 h-8 px-2 text-xl text-center text-white bg-red-500 rounded-full ">
                            {index + 1}
                          </div>
                          <div className="flex flex-col">
                            {/* Term name input */}
                            <label htmlFor={`term.${index}.termName`}>
                              Enter Term*
                            </label>
                            <Field
                              className="p-2 text-sm text-gray-900 border border-gray-400 rounded-md w-50 md:w-72 inField bg-gray-50"
                              name={`term.${index}.termName`}
                              id={`term.${index}.termName`}
                              value={term.termName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Name"
                            ></Field>

                            <ErrorMessage name={`term.${index}.termName`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>

                          <div className="flex flex-col">
                            {/* Term definition textarea */}
                            <label htmlFor={`term.${index}.termDefinition`}>
                              Enter Definition*
                            </label>
                            <Field
                              as="textarea"
                              className="w-full h-10 p-2 text-sm text-gray-700 transition-all duration-500 border border-gray-400 rounded-md resize-none inField focus:h-24 md:w-72 bg-gray-50 "
                              name={`term.${index}.termDefinition`}
                              id={`term.${index}.termDefinition`}
                              value={term.termDefinition}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Definition..."
                            ></Field>

                            <ErrorMessage name={`term.${index}.termDefinition`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>

                          <div className="flex">
                            {/* Handling term image upload */}
                            {term.termImage ? (
                              <div className="flex ">
                                <img
                                  className="w-20 h-20 p-1 rounded-lg"
                                  src={term.termImage}
                                  alt=""
                                />
                                <GiCrossMark
                                  className="mr-5 text-lg cursor-pointer hover:text-red-600"
                                  onClick={() =>
                                    setFieldValue(`term.${index}.termImage`, "")
                                  }
                                />
                              </div>
                            ) : (
                              <label
                                htmlFor={`term.${index}.termImage`}
                                className=" selectImage w-44 h-[44px] cursor-pointer px-3 ml-3  mt-7 py-1  flex  items-center justify-center rounded"
                              >
                                <span className="flex w-32 p-2 mx-auto font-bold text-blue-700 transition-all ease-in-out border border-blue-700 rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white ">
                                  Select Image
                                </span>
                              </label>
                            )}
                            {/* Input for term image */}
                            <input
                              onClick={(event) => (event.target.value = null)}
                              onChange={(event) => {
                                event.preventDefault();
                                // Handling image validation and setting term image
                                if (
                                  event.target.files[0] &&
                                  !validateImage.includes(
                                    event.target.files[0].type
                                  )
                                ) {
                                  toast.warning(
                                    "Please Upload in Image Format !",
                                    {
                                      pauseOnFocusLoss: false,
                                    }
                                  );
                                } else if (
                                  event.target.files[0].size > 304800
                                ) {
                                  toast.warning(
                                    "Image size is very Large ! Please Select Image size less than 300kb",
                                    {
                                      pauseOnFocusLoss: false,
                                    }
                                  );
                                } else {
                                  const file = event.target.files[0];
                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onload = () => {
                                    setFieldValue(
                                      `term.${index}.termImage`,
                                      reader.result
                                    );
                                  };
                                }
                              }}
                              className="hidden"
                              id={`term.${index}.termImage`}
                              name={`term.${index}.termImage`}
                              type="file"
                            />
                            <div>
                              {/* Delete term button */}
                              {values.term.length <= 1 ? null : (
                                <RiDeleteBin6Line
                                  className="text-[1.8em]  text-gray-500 m-2 cursor-pointer hover:text-red-600"
                                  onClick={() => {
                                    moreTerm.remove(index);
                                    toast.warn("Term Card Deleted !", {
                                      position: "top-right",
                                      pauseOnFocusLoss: false,
                                    });
                                  }}
                                />
                              )}
                              {/* Edit term button */}
                              {values.term.length <= 1 ? null : (
                                <label htmlFor={`term.${index}.termName`}>
                                  <BiEdit className="text-[1.8em] text-gray-500 m-2 cursor-pointer hover:text-yellow-600" />
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    {/* Button to add more terms */}
                    <div
                      className="inline-block mt-4 mb-6 font-bold text-blue-700 cursor-pointer mx-7"
                      onClick={() => addMoreTermS(values, moreTerm)}
                    >
                      + Add More
                    </div>
                  </div>
                )}
              ></FieldArray>
            </div>

            <div className="relative pt-20">
              <button
                type="submit"
                className="absolute left-0 right-0 w-40 px-6 py-2 mx-auto mt-10 text-lg font-bold text-white transition-all ease-in-out bg-red-500 border-red-500 rounded-lg shadow-lg bottom-1 hover:bg-red-600 hover:text-white hover:-translate-y-1 "
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    
  );
};

export default CreateFlashCardPage;
