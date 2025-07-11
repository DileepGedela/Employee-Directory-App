const Validation = {
  validateRequired: function (inputElement, errorMessageElement) {
    if (inputElement.value.trim() === "") {
      errorMessageElement.textContent = "This field is required.";
      inputElement.classList.add("is-invalid");
      return false;
    }
    errorMessageElement.textContent = "";
    inputElement.classList.remove("is-invalid");
    return true;
  },

  validateEmail: function (inputElement, errorMessageElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputElement.value.trim())) {
      errorMessageElement.textContent = "Please enter a valid email address.";
      inputElement.classList.add("is-invalid");
      return false;
    }
    errorMessageElement.textContent = "";
    inputElement.classList.remove("is-invalid");
    return true;
  },

  validateForm: function (formId) {
    let isValid = true;
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll(
      'input[required], input[type="email"]'
    );

    inputs.forEach((input) => {
      const errorMessageElement = document.getElementById(input.id + "-error");
      if (input.hasAttribute("required")) {
        if (!this.validateRequired(input, errorMessageElement)) {
          isValid = false;
        }
      }
      if (input.type === "email") {
        if (!this.validateEmail(input, errorMessageElement)) {
          isValid = false;
        }
      }
    });
    return isValid;
  },

  clearValidationErrors: function (formId) {
    const form = document.getElementById(formId);
    const errorMessages = form.querySelectorAll(".error-message");
    const invalidInputs = form.querySelectorAll(".is-invalid");

    errorMessages.forEach((msg) => (msg.textContent = ""));
    invalidInputs.forEach((input) => input.classList.remove("is-invalid"));
  },
};
