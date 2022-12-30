import {add, subtract, multiply, divide} from "../utils/calculate"

describe("Operations", () => {
    
      test("add two numbers", () => {
        const result = add(1, 2)
        expect(result).toBe(3);
      });

      test("subtract two numbers", () => {
        const result = subtract(2, 2)
        expect(result).toBe(0);
      });

      test("multiply two numbers", () => {
        const result = multiply(2, 2)
        expect(result).toBe(4);
      });

      test("divide two numbers", () => {
        const result = divide(2, 2)
        expect(result).toBe(1);
      });
})