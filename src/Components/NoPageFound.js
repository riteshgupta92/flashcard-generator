import React from "react";

// When user try to visit any undefined routes this will Page_Not_Found appear.
const NoPageFound = () => {
  document.body.innerHTML = "Page Not Found";
  return (
    <>
      <h1>Page Not Found</h1>
    </>
  );
};

export default NoPageFound;
