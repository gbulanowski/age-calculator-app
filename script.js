const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const submitButton = document.getElementById("btn-submit");

function validateDate(value, input, range, message) {
  const errorMsg = input.parentNode.children[2];
  if (!value == "") {
    if (value >= 1 && value <= range) {
      correctStyling(input);
      return true;
    } else {
      errorMsg.textContent = `Must be a valid ${message}`;
      errorStyling(input);
    }
  } else {
    errorMsg.textContent = "This field is required";
    errorStyling(input);
  }
}

function errorStyling(input) {
  input.parentNode.children[0].classList.add("error-label");
  input.parentNode.children[1].classList.add("error-input");
}

function correctStyling(input) {
  const errorMsg = input.parentNode.children[2];
  errorMsg.textContent = ``;
  input.parentNode.children[0].classList.remove("error-label");
  input.parentNode.children[1].classList.remove("error-input");
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const dayValue = dayInput.value;
  const monthValue = monthInput.value;
  const yearValue = yearInput.value;

  const validateDay = validateDate(dayValue, dayInput, 31, "day");
  const validateMonth = validateDate(monthValue, monthInput, 12, "month");

  const validateYear = function () {
    if (!yearValue == "") {
      if (yearValue >= 1900) {
        if (yearValue <= currentYear) {
          correctStyling(yearInput);
          return true;
        } else {
          const errorMsg = yearInput.parentNode.children[2];
          errorStyling(yearInput);
          errorMsg.textContent = `Must be in the past`;
        }
      } else {
        const errorMsg = yearInput.parentNode.children[2];
        errorStyling(yearInput);
        errorMsg.textContent = `Must be bigger then 1900`;
      }
    } else {
      const errorMsg = yearInput.parentNode.children[2];
      errorStyling(yearInput);
      errorMsg.textContent = "This field is required";
    }
  };
  validateYear();
  console.log(validateDay, validateMonth, validateYear());

  if (validateDay == true && validateMonth == true && validateYear() == true) {
    const date =
      yearInput.value + "-" + monthInput.value + "-" + dayInput.value;
    const time = new Date(date);
    // const ageCalc = age / (24 * 60 * 60 * 1000);
    let years = currentDate.getFullYear() - time.getFullYear();
    let months = currentDate.getMonth() - time.getMonth();
    if (months < 0) {
      months += 12;
      years--;
    }
    let days = currentDate.getDate() - time.getDate();
    if (days < 0) {
      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      console.log(lastDay);
      days += lastDay;
      months--;
    }
    document.querySelector(".years-text").children[0].textContent = years;
    document.querySelector(".months-text").children[0].textContent = months;
    document.querySelector(".days-text").children[0].textContent = days;
  } else {
    console.log("error");
  }
});
