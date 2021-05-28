# Javascript Exercise
​
### Knowledge round-up
​
- **Javascript**
​
  - What are the differences between a variable that is: `null`, `undefined`?
    - null is an assigned value. It means nothing.
    - undefined means a variable has been declared but not defined yet.
    - null is an object. undefined is of type undefined.
    - null !== undefined but null == undefined.

  - What is `use strict`? what are the advantages and disadvantages to using it?
    - `"use strict"` defines that the JavaScript code should be executed in `"strict mode"`.
    - Advantages:
      - Eliminate some unreasonable and imprecise aspects of Javascript syntax and reduce some weird behaviors.
      - Eliminate some insecurities in the operation of the code and ensure the security of the code running.
      - Improve compiler efficiency and increase running speed.
      - Pave the way for a new version of Javascript in the future.
      - Makes debugging easier.
      - Prevents accidental globals.
      - Duplicate attribute names or parameter values ​​are not allowed.
      - Makes eval() safer.
    - Disadvantages:
      - Not supported in tested IE6, 7, 8, and 9.
      - Strict mode removes the with statement
    
  - What are the differences between `==` and `===`? Write an example for each case (if any)?
    - `Double equals` `==` is a `comparison operator`, which transforms the operands having the same type before comparison. So, when you compare `string` with a `number`, JavaScript converts any `string` to a `number`. An empty `string` is always converts to `zero`. A `string` with no numeric value is converts to `NaN` (Not a Number), which returns `false`.
    - `Triple equals` `===`  is a `strict equality comparison operator` in JavaScript, which returns false for the values which are not of a similar type. This operator  performs type casting for equality. If we compare 2 with "2" using ===, then it will return a false value.
    Ex: `1 == '1' ->> true` `1 === '1' ==> false`, `null == undefined ==> true` `null === undefined ==> false`

  - What are values in the `FALSE` group.
    - `false`
    - `0`
    - `''`
    - `null`
    - `undefined`
    - `NaN`