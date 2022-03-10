import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { ieee754 } from "../ieee754.js";

const EPSILON = 0.00001

Deno.test('read & write float', function () {
  const val = 42.42
  const buf = new Uint8Array(4);
  
  ieee754.write(buf, val, 0, true, 23, 4);
  const num = ieee754.read(buf, 0, true, 23, 4)

  assert(Math.abs(num - val) < EPSILON)
})

Deno.test('read & write double', function () {
  const value = 12345.123456789
  const buf = new Uint8Array(8);

  ieee754.write(buf, value, 0, true, 52, 8)
  const num = ieee754.read(buf, 0, true, 52, 8)

  assert(Math.abs(num - value) < EPSILON)
})
