const form = document.querySelector("form");
const email = document.getElementById("email");
const error = document.getElementById("error");
const dialog = document.getElementById("dialog");

// Regular expression for email validation as per HTML specification
const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

// Check if the email is valid
const isValidEmail = () => {
  const validity = email.value.length !== 0 && emailRegExp.test(email.value);
  return validity;
};

// Update email input class based on validity
const setEmailAtt = (isValid) => {
  email.setAttribute("aria-invalid", isValid ? "false" : "true");
};

const toggleErrorVisibility = (isValid) => {
  error.classList.toggle("hidden", isValid);
};

const handleDialog = (isValid) => {
  if (isValid) {
    dialog.showModal();

    const closeButton = document.getElementById("close-dialog");

    closeButton.addEventListener("click", () => {
      dialog.close();
    });
  }
};

// Handle input event to update email validity
const handleInput = () => {
  setEmailAtt(true);
  toggleErrorVisibility(true);
};

// Handle form submission to show error if email is invalid
const handleSubmit = (event) => {
  event.preventDefault();

  const validity = isValidEmail();
  setEmailAtt(validity);
  toggleErrorVisibility(validity);
  handleDialog(validity);
};

// This defines what happens when the user types in the field
email.addEventListener("input", handleInput);
// This defines what happens when the user tries to submit the data
form.addEventListener("submit", handleSubmit);
