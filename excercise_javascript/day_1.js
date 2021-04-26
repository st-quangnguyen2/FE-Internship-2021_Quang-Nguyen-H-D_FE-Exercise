/*
1. Write a JavaScript program to compute the sum of the two given integers. If the two values are same, then returns triple their sum.
Input: a = 5, b = 10
Output: 15
​
Input: a = 5, b = 5
Output: 30
*/

function sum(valA, valB){
  return valA === valB ? valA * 6 : valA + valB;
}
console.log(sum(5, 10));
console.log(sum(5, 5));

/*
2. Write a JavaScript program to compute the absolute difference between a specified number and 19. Returns triple their absolute difference if the specified number is greater than 19.
​

Input: a = 12
Output: 7
​
Input: a = 19
Output: 0
​
Input: a = 22
Output: 9
*/

function absDiff(val){
  return val > 19 ? (val - 19) * 3 : 19 - val;
}
console.log(absDiff(12));
console.log(absDiff(19));
console.log(absDiff(22));

/*
3. A masked number is a string that consists of digits and one asterisk (*) that should be replaced by exactly one digit. Given a masked number find all the possible options to replace the asterisk with a digit to produce an integer divisible by 3.
​

Input: a = '1*9'
Output: ['129', '159', '189']
​

Input: a = '1234567890*'
Output: ['12345678900', 
 '12345678903', 
 '12345678906', 
 '12345678909']
*/

function findAllDivThree(strDigits){
  let res = [];
  for(let i = 0; i < 10; i++){
    let str = strDigits.replace('*', i);
    if(+str % 3 === 0){
      res.push(str);
    }
  }
  return res;
}

console.log(findAllDivThree('1*9'));
console.log(findAllDivThree('1234567890*'));

/*
4. A masked number is a string that consists of digits and one asterisk (*) that should be replaced by exactly one digit. Given a masked number find all the possible options to replace the asterisk with a digit to produce an integer divisible by 6.
Input: a = '1*9'
Output: []
Input: a = '1234567890*'
Output: ['12345678900', 
 '12345678906']
*/

function findAllDivSix(strDigits){
  let res = [];
  for(let i = 0; i < 10; i++){
    let str = strDigits.replace('*', i);
    if(+str % 6 === 0){
      res.push(str);
    }
  }
  return res;
}

console.log(findAllDivSix('1*9'));
console.log(findAllDivSix('1234567890*'));
