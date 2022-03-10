### Read/write IEEE754 floating point numbers from/to a Buffer or array-like object.

## methods

`import { ieee754 } from "https://taisukef.github.io/ieee754/ieee754.js"`

The `ieee754` object has the following functions:

```
ieee754.read = function (buffer, offset, isLE, mLen, nBytes)
ieee754.write = function (buffer, value, offset, isLE, mLen, nBytes)
```

The arguments mean the following:

- buffer = the buffer
- offset = offset into the buffer
- value = value to set (only for `write`)
- isLe = is little endian?
- mLen = mantissa length
- nBytes = number of bytes

## what is ieee754?

The IEEE Standard for Floating-Point Arithmetic (IEEE 754) is a technical standard for floating-point computation. [Read more](http://en.wikipedia.org/wiki/IEEE_floating_point).

## license

BSD 3 Clause. Copyright (c) 2008, Fair Oaks Labs, Inc.
