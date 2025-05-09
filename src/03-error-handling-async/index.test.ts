// Uncomment the code below and write your tests
// import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

import {resolveValue, throwError, throwCustomError, MyAwesomeError, rejectCustomError} from "./index";

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(2);
    const arg = 'testValue'
    const result = await resolveValue('testValue')

    expect(result).toBeDefined()
    expect(result).toBe(arg)
  });
});

describe('throwError', () => {
  const dummyError = 'Error message'

  test('should throw error with provided message', () => {
    expect.assertions(1);
    expect(() => throwError(dummyError)).toThrow(dummyError);
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(1);
    expect(() => throwError()).toThrow('Oops!')
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(1);
    expect(() => throwCustomError()).toThrow(MyAwesomeError)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1)

    await expect(rejectCustomError()).rejects.toThrow('This is my awesome custom error!')
  });
});
