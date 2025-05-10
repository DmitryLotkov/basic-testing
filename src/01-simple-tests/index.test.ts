// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const arg = { a: 2, b: 3, action: Action.Add };
    const result = simpleCalculator(arg);

    expect(result).toBe(5);
    expect(result).not.toBeNull();
  });

  test('should subtract two numbers', () => {
    const arg = { a: 2, b: 3, action: Action.Subtract };
    const result = simpleCalculator(arg);

    expect(result).toBe(-1);
    expect(result).not.toBeNull();
  });

  test('should multiply two numbers', () => {
    const arg = { a: 2, b: 3, action: Action.Multiply };
    const result = simpleCalculator(arg);

    expect(result).toBe(6);
    expect(result).not.toBeNull();
  });

  test('should divide two numbers', () => {
    const arg = { a: 8, b: 2, action: Action.Divide };
    const result = simpleCalculator(arg);

    expect(result).toBe(4);
    expect(result).not.toBeNull();
  });

  test('should exponentiate two numbers', () => {
    const arg = { a: 9, b: 2, action: Action.Exponentiate };
    const result = simpleCalculator(arg);

    expect(result).toBe(81);
    expect(result).not.toBeNull();
  });

  test('should return null for invalid action', () => {
    const arg = { a: 9, b: 2, action: '%' };
    const result = simpleCalculator(arg);

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const arg = { a: '9', b: '2', action: Action.Add };
    const result = simpleCalculator(arg);

    expect(result).not.toBe(11);
    expect(result).not.toBe('92');
    expect(result).toBeNull();
  });
});
