//Cameron Burrell z5264685 Assignment 1 Task 4
const dateOfBirth = document.getElementById("birthDate");
const removeButton = document.getElementById("removeButton");
const checkBoxes = document.getElementById("citiesList");
const dropDownSelecter = document.getElementById("cheeseSelecter");
const outputBox = document.getElementById("outputInfo")
const firstName = document.getElementById("firstNameText");
const lastName = document.getElementById("lastNameText");
const citiesSelected = document.getElementsByName("city");


function checkValidDateOfBirth(dateOfBirth) {
    let regexDate = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}")
    if (!regexDate.test(dateOfBirth.value)) { 
        return false;
    }
    checkDaysMonthsYears = dateOfBirth.value.split("/");
    
    /* make sure the date and month does not exceed the bounds
    of max amount of days and months*/
    if (checkDaysMonthsYears[0] > 31 || checkDaysMonthsYears[1] > 12) { 
        return false;
    }
    if (!enteredDateInPastChecker(checkDaysMonthsYears)) { 
        return false;
    }
    return dateOfBirth.value;
}

function findAge(dateOfBirth) { 
    let correctDate = checkValidDateOfBirth(dateOfBirth);
    let daysMonthsYears = correctDate.split("/");

    let currentDay = new Date();
    // change to use yy/mm/dd
    let birthDay = new Date(daysMonthsYears[2], daysMonthsYears[1] - 1, daysMonthsYears[0]);
    let differenceBetweenDates = currentDay - birthDay;
    // https://www.codegrepper.com/code-examples/javascript/javascript+calculate+age
    return Math.floor(differenceBetweenDates/1000/60/60/24/365);
}
//https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-letters#:~:text=Use%20the%20test()%20method,only%20letters%20and%20false%20otherwise.
function checkOnlyLetters(name) { 
    return /^[a-zA-Z]+$/.test(name);
}

function citiesLivedIn() { 
    let noCities = false;
    let cities = "";
    for (let city in citiesSelected) { 
        if (citiesSelected[city].checked) { 
            cities = cities + citiesSelected[city].value + ", ";
            noCities = true;
        }
    }
    if (!noCities) { 
        return "no cities"
    }
    let fixedString = cities.slice(0, -2);
    return fixedString;
}

// https://gitlab.cse.unsw.edu.au/COMP6080/22T3/f14a-tutorial-code/-/blob/main/week3/events/script.js
function output() {
    if (!characterAndLengthChecker(firstName)) { 
        outputBox.value = "Do not enter an invalid firstname";
        return;
    } else if (!characterAndLengthChecker(lastName)) { 
        outputBox.value = "Do not enter an invalid lastname";
        return;
    } else if (!checkValidDateOfBirth(dateOfBirth)) { 
        outputBox.value = "Do not enter an invalid date of birth";
        return;
    } else { 
        outputBox.value = "Hello " + firstName.value + " " + lastName.value + ", you are " 
        + findAge(dateOfBirth) + " years old, your favourite cheese is " 
        + dropDownSelecter.value + " and you've lived in " + citiesLivedIn();
    }
}

function characterAndLengthChecker(name) {
    if (name.value.length < 3 || name.value.length > 50) { 
        return false;
    }
    /*in the spec it says "characters" I assume it means characters of the alphabet
    if my understanding is incorrect and the name can include numbers remove the 
    "checkOnlyLetters" method*/
    if (checkOnlyLetters(name.value) === true) { 
        return true;
    } else { 
        return false;
    }
}
function enteredDateInPastChecker(checkDaysMonthsYears) {
    // make sure birthdate entered is in the past
    let currentDate = new Date();
    let birthDateTime = new Date(checkDaysMonthsYears[2], checkDaysMonthsYears[1] - 1, checkDaysMonthsYears[0]);
    let enteredDateNotInFuture = birthDateTime < currentDate;
    return enteredDateNotInFuture;
}

function clear() { 
    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
    dropDownSelecter.selectedIndex = 0;
    outputBox.value = "";
    for (let city in citiesSelected) { 
        citiesSelected[city].checked = false;
    }
}

firstName.addEventListener('blur', output);
lastName.addEventListener('blur', output);
dateOfBirth.addEventListener('blur', output);
checkBoxes.addEventListener('change', output);
dropDownSelecter.addEventListener('change', output);
removeButton.addEventListener("click", clear);