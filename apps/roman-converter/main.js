function convertToRoman(num) {
  // @params num: a decimal integer <= 4999
  // @returns roman: a string representing the converted number

  // limit num type and num range
  if (!(Number.isInteger(num)) || num > 3999 || num <= 0) {
    return undefined;
  }
  

  var romanChars = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
  }

  var roman = "";
  var base = Math.pow(10,3);
  var residue = num;
  var quotient;
  
  do {
    //calculates quotient
    quotient = Math.floor(residue / base);

    // check quotient to determine right romans chars to add
    if (quotient === 9) {
      roman += romanChars[base] + romanChars[base * 10];
    } else if ([8, 7, 6, 5].indexOf(quotient) != -1) {
      roman += romanChars[5 * base] + romanChars[base].repeat(quotient % 5);
    } else if (quotient === 4) {
      roman += romanChars[base] + romanChars[5 * base];
    } else {
      // for quotient = 1,2,3
      roman += romanChars[base].repeat(quotient);
    }

    //update residue for the next round
    residue = residue % base
    // update base for the next round
    base = base / 10;

  } while (residue > 0)
  
  return roman;
}



//-------------------------
// Converter WebApp
//-------------------------

var output = document.querySelector(".output");
var input = document.querySelector(".input-container input")

// focus input field when the page loads
input.focus();

// convertion bot
function convertBot() {
  var inputValue = Number(input.value);
  if (input.value.trim() === "") {
    output.textContent = "";
    output.classList.remove("error");
  } else if (checkValue(inputValue) && input.value) {
    var romanNumber = convertToRoman(inputValue);
    output.textContent = romanNumber;
    output.classList.remove("error");
  }
}

// input validation
// provides text feedback for wrong input
function checkValue(value) {
  if (!(Number.isInteger(value)) || value <= 0) {
    output.textContent = "Only positive integers are valid";
    output.classList.add("error");
    return false;
  } else if (value > 3999) {
    output.textContent = "Number is too big";
    output.classList.add("error");
    return false;
  }
  return true;
}



// call convertion bot every time text input is changed
input.addEventListener("input",  function () {
  convertBot();
});
