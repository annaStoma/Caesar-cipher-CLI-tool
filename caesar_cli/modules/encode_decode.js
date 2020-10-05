const engSymbolsArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const modeTypes = Object.freeze({'to': 'encode', 'from': 'decode'});

const EncryptOrDecrypt = (inputText, shift, mode) => {
  let arrayOfInputData = inputText.split('');
  // определяем, в какую строну двигаться
  if (mode !== modeTypes.to) shift *= -1;

  return arrayOfInputData.map(letter => {
    const lowerCaseOfSymbol = letter.toLowerCase();
    const index = engSymbolsArr.indexOf(lowerCaseOfSymbol);
    if (index < 0) return letter;
    const isLowerCase = letter === lowerCaseOfSymbol;
    let shiftedIndex = (index + shift) % engSymbolsArr.length;
    if (shiftedIndex < 0) shiftedIndex += engSymbolsArr.length;
    let transformedLetter = engSymbolsArr[shiftedIndex];
    if (!isLowerCase) transformedLetter = transformedLetter.toUpperCase();
    return transformedLetter;
  }).join('');
};

module.exports = {EncryptOrDecrypt};
