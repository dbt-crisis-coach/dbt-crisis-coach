export function compare(number1, number2) {
  if(!number1 || !number2){
    return false;
  }
  number1 = cleanNumber(number1)
  number2 = cleanNumber(number2)
  
  let number1Array = [...number1]
  let number2Array = [...number2]
  
  let maxLength = number1Array.length > number2Array.length ? number1Array.length: number2Array.length
  let matches = 0;
      
  for (var index = 0; index < maxLength; index++) {
    if (number1[(number1Array.length -1) - index] === number2[(number2Array.length -1) - index]) {
      matches++
    }
  }
  
  let result = matches/maxLength
  
  //>= 80% match
  return result >= 0.8
}

function cleanNumber(numberToClean) {
  return numberToClean.replace(/([-(), +])/g, '');
}