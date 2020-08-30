# OEIS golf

This is a collection of sequence generators ordered by their OEIS number. Said generators, which are all in a separate file in the `a` folder, should:

1. Return a function with n as a parameter
2. Be golfed, as in, optimize the size
3. Calculate the sequence according to its definition in the OEIS and not just hardcoding it
4. n lower than the offset defined in the OEIS can lead to undefined behaviour

## Usage

```javascript
A=require('.')
A(OEISnumber, n)
```