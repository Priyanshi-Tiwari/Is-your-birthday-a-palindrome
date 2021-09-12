function reverseStr(string) {
  var listOfChars = string.split("");
  var listOfCharsReverse = listOfChars.reverse();
  var reversedStr = listOfCharsReverse.join("");
  return reversedStr;
}

function isPalindrome(string) {
  var reversedString = reverseStr(string);
  if (string === reversedString) {
    return true;
  } else {
    return false;
  }
}

function numberToString(date) {
  var dateStr = {
    day: "",
    month: "",
    year: ""
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function convertDateInAllFormats(date) {
  var strDate = numberToString(date);

  var ddmmyyyy = strDate.day + strDate.month + strDate.year;
  var mmddyyyy = strDate.month + strDate.day + strDate.year;
  var yyyymmdd = strDate.year + strDate.month + strDate.day;
  var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
  var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
  var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;
  yymmdd;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function palindromeInAllDateFormats(date) {
  var listOfDateFormats = convertDateInAllFormats(date);
  for (i = 0; i < listOfDateFormats.length; i++) {
    if (isPalindrome(listOfDateFormats[i])) {
      return true;
    } else return false;
  }
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  } else return false;
}

function getNextDate(date) {
  var nextdate = {
    day: date.day + 1,
    month: date.month,
    year: date.year,
  };

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (nextdate.month === 2) {
    if (isLeapYear(nextdate.year)) {
      if (nextdate.day > 29) {
        nextdate.day = 1;
        nextdate.month++;
      }
    } else {
      if (nextdate.day > 28) {
        nextdate.day = 1;
        nextdate.month++;
      }
    }
  } else {
    if (nextdate.day > daysInMonth[nextdate.month - 1]) {
      nextdate.day = 1;
      nextdate.month++;
    }

    if (nextdate.month > 12) {
      nextdate.day = 1;
      nextdate.month = 1;
      nextdate.year++;
    }
  }
  return nextdate;
}

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var checkPalindrome = palindromeInAllDateFormats(nextDate);
    if (checkPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

//console.log(getNextPalindromeDate(date));

function getPreviousDate(date) {
  var prevDate = {
    day: date.day - 1,
    month: date.month,
    year: date.year,
  };

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (prevDate.month == 3) {
    if (isLeapYear(prevDate.year)) {
      if (prevDate.day === 0) {
        prevDate.day = 29;
        prevDate.month--;
      }
    }
  }
  if (prevDate.day === 0) {
    prevDate.day = daysInMonth[date.month - 2];
    prevDate.month--;
  }

  if (prevDate.month === 0) {
    prevDate.day = 31;
    prevDate.month = 12;
    prevDate.year--;
  }

  return prevDate;
}

var date = {
  day: 11,
  month: 9,
  year: 2021,
};
console.log(getPreviousDate(date));

function getPreviousPalindromeDate(date) {
  var previousDate = getPreviousDate(date);
  ctr = 0;
  while (1) {
    ctr++;
    var checkPreviousPalindrome = palindromeInAllDateFormats(previousDate);
    if (checkPreviousPalindrome) {
      break;
    } else {
      previousDate = getPreviousDate(previousDate);
    }
  }
  return [ctr, previousDate];
}





var input = document.querySelector("#date-input");
var button = document.querySelector("#check-btn");
var output = document.querySelector("#output-div")

function clickHandler() {
  var userInput = input.value;
  var inputDateString = userInput.split("-");
  var date = {
    day: Number(inputDateString[2]),
    month: Number(inputDateString[1]),
    year: Number(inputDateString[0])
  }
  var checkPalindrome = palindromeInAllDateFormats(date);
  if (checkPalindrome) {
    output.innerText = "Yay! your birthday is a Palindrome"
  } else {
    var ctrOne = getNextPalindromeDate(date);
    var ctrTwo = getPreviousPalindromeDate(date);
    console.log(ctrOne[0]);
    console.log(ctrTwo[0]);
    if (ctrOne[0] < ctrTwo[0]) {
      output.innerText =
        `Oops! Your birthday is not a palindrome. The nearest palindrome date is ${ctrOne[1].day}-${ctrOne[1].month}-${ctrOne[1].year} and you missed it by ${ctrOne[0]} days`
    } else {
      output.innerText = `Oops! Your birthday is not a palindrome. The nearest palindrome date is ${ctrTwo[1].day}-${ctrTwo[1].month}-${ctrTwo[1].year} and you missed it by ${ctrTwo[0]} days`
    }

  }

}


button.addEventListener("click", clickHandler)






















// function getNextDate(date) {
//     var day = date.day + 1;
//     var month = date.month;
//     var year = date.year;

//     var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//     if (month === 2) {
//       if (isLeapYear(year)) {
//         if (day > 29) {
//           day = 1;
//           month = 3;
//         }
//       }
//       else {
//         if (day > 28) {
//           day = 1;
//           month = 3;
//         }
//       }
//     }
//     else {
//       if (day > daysInMonth[month - 1]) {
//         day = 1;
//         month++;
//       }
//     }

//     if (month > 12) {
//       month = 1;
//       year++;
//     }

//     return {
//       day: day,
//       month: month,
//       year: year
//     }
//   }