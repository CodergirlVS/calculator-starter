export const add = (first: number, second: number): number => {
<<<<<<< HEAD
=======
  if (isNaN(first) || isNaN(second) || first === null || second === null) {
    throw new Error("Expected numbers");
  }
>>>>>>> 95a61ef43ec5ab8a34cf8e29d9db3ba6eb3d6b0a
  return first + second;
};

export const subtract = (first: number, second: number): number => {
  return first - second;
};

export const multiply = (first: number, second: number): number => {
  return first * second;
};

<<<<<<< HEAD
export const divide =(first: number, second: number): number => {
=======
export const divide = (first: number, second: number): number => {
>>>>>>> 95a61ef43ec5ab8a34cf8e29d9db3ba6eb3d6b0a
  return first / second;
};

