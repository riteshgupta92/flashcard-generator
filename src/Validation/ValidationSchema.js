import * as Yup from "yup";

const validationSchema = Yup.object({
  // Specifies that the field should be a string.
  groupName: Yup.string()
    .min(3, "Group name must be min 3 character.")
    .max(20, "Group name must be between 3 - 20 character.")
    .required("Required!"),
  groupDescription: Yup.string()
    .min(20, "Description should be min 20 characters")
    .max(300, "Description allowed only upto 300 characters")
    .required("Required!"),
  // Specifies that the field should be an array.
  term: Yup.array(
    Yup.object({
      termName: Yup.string()
        .min(3, "Term name must be min 3 characters")
        .max(20, "Term name must be within 20 characters")
        .required("Term Name is Required!"),
      termDefinition: Yup.string()
        .min(20, "Definition should be min 20 characters")
        .max(500, "Definition contains only up to 500 characters")
        .required("Term Definitions is Required!"),
    })
  ),
});

export default validationSchema;
