import React from "react";
import jsPDF from "jspdf";

// PDF options to reduce the size of images
const options = {
  image: { type: "jpeg", quality: 0.6 },
};

// Function to create a PDF document containing all terms
function createPDFForAllTerms(flashcardData) {
  const doc = new jsPDF(options);

  // Set the background color for the entire PDF to white
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");

  // Add group image (if it exists) as a circle at the top-left corner
  if (flashcardData.groupImage) {
    const imageSize = 40; // Width and height of the group image
    const x = 10; // X position for the image
    const y = 10; // Y position for the image
    doc.addImage(flashcardData.groupImage, "JPEG", x, y, imageSize, imageSize);
  }

  // Add group name to the right of the group image
  doc.setFontSize(40);
  doc.setTextColor(29, 53, 87); // Text color for the group name
  doc.setFont("helvetica", "bold");
  doc.text(flashcardData.groupName, 90, 30);

  // Add group description below the group name and image
  doc.setFontSize(16);
  doc.setTextColor(64, 61, 57); // Text color for the description
  doc.text(doc.splitTextToSize(flashcardData.groupDescription, 200), 10, 65);

  // Initial Y position for the term cards
  let yPos = 120;

  // Iterate over each term to add its details to the PDF
  flashcardData.term.forEach((term, termIndex) => {
    // Calculate term content height dynamically based on term definition length and image height
    doc.setFontSize(12);
    doc.setFillColor(255, 255, 255);
    const termDefinitionLines = doc.splitTextToSize(term.termDefinition, 100);
    const termImageHeight = term.termImage ? 60 : 0;
    const totalHeight = Math.max(
      termImageHeight + termDefinitionLines.length * 10,
      70 // Minimum height for a term
    );

    // Check if there's enough space for the current term on the current page
    if (yPos + 50 > 290) {
      doc.addPage(); // Add a new page if there's not enough space
      yPos = 20; // Reset Y position for the new page
    }

    // Add term serial number and name
    doc.setFontSize(15);
    doc.setTextColor(64, 61, 57);
    doc.text(`${termIndex + 1}. ${term.termName}`, 10, yPos);

    // Add term image (if it exists) to the PDF
    if (term.termImage) {
      doc.addImage(term.termImage, "JPEG", 15, yPos + 10, 45, 45);
    }

    // Add term definition text
    doc.setFontSize(12);
    doc.setTextColor(0, 48, 73);
    doc.text(termDefinitionLines, 83, yPos + 10);

    // Update the Y position for the next term content
    yPos += totalHeight;
  });

  // Save the generated PDF with the name 'flashcard-details-all-terms.pdf'
  doc.save("flashcard-details-all-terms.pdf");
}

// React component to render a download button for the PDF
const PdfDownloadModal = ({ buttonLabel, flashcardData }) => {
  // Handler function to initiate PDF creation and download
  const handleDownload = () => {
    createPDFForAllTerms(flashcardData);
  };
  return (
    <div>
      <button onClick={handleDownload}>{buttonLabel}</button>
    </div>
  );
};

export default PdfDownloadModal;
