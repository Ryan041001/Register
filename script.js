const form = document.getElementById("Register");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isRequiredValid = checkRequired([
    usernameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
  ]);

  let isFormValid = isRequiredValid;
  if (isRequiredValid) {
    const isUsernameValid = checkLength(usernameInput, 3, 15);
    const isEmailValid = checkEmail(emailInput);
    const isPasswordValid = checkLength(passwordInput, 6, 25);
    const isPasswordsMatch = checkPasswordsMatch(
      passwordInput,
      confirmPasswordInput
    );

    isFormValid =
      isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }

  if (isFormValid) {
    alert("Registration successful!");
    form.reset();
    document.querySelectorAll(".item").forEach((group) => {
      group.className = "item";
    });
  }
});

function checkRequired(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    // Password is required
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${formatFieldName(input)} must be at least ${min} characters.`
    );
    // If this is the password input and it's invalid, clear and mark confirm password as error
    if (input === passwordInput) {
      confirmPasswordInput.value = "";
      showError(confirmPasswordInput, "Password is invalid, please re-enter");
    }
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${formatFieldName(input)} must be less than ${max} characters.`
    );
    // If this is the password input and it's invalid, clear and mark confirm password as error
    if (input === passwordInput) {
      confirmPasswordInput.value = "";
      showError(confirmPasswordInput, "Password is invalid, please re-enter");
    }
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  }
  return true;
}

// Format field name with proper capitalization
function formatFieldName(input) {
  // input id: username -> Username
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "item error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "item success";
}
