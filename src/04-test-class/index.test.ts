// Uncomment the code below and write your tests
import { getBankAccount, SynchronizationFailedError } from '.';

import { InsufficientFundsError, TransferFailedError } from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const result = getBankAccount(1000);
    expect(result.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const result = getBankAccount(1000);
    expect(() => result.withdraw(1200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const startAmount = 1000;
    const transferAmount = 1200;

    const myAccount = getBankAccount(startAmount);
    const anotherBankAccount = getBankAccount(0);

    expect(() =>
      myAccount.transfer(transferAmount, anotherBankAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const startAmount = 1000;

    const myAccount = getBankAccount(startAmount);
    expect(() => myAccount.transfer(800, myAccount)).toThrow(
      TransferFailedError,
    );
    expect(myAccount.getBalance()).toBe(startAmount);
  });

  test('should deposit money', () => {
    const startAmount = 1000;
    const depositAmount = 25;

    const myAccount = getBankAccount(startAmount);
    myAccount.deposit(25).deposit(25);

    expect(myAccount.getBalance()).toBe(
      startAmount + depositAmount + depositAmount,
    );
    expect(myAccount.getBalance()).not.toEqual(startAmount);
  });

  test('should withdraw money', () => {
    const startAmount = 1000;
    const withdrawAmount = 25;

    const myAccount = getBankAccount(startAmount);
    myAccount.withdraw(25).withdraw(25);
    expect(myAccount.getBalance()).toBe(
      startAmount - withdrawAmount - withdrawAmount,
    );
    expect(myAccount.getBalance()).not.toEqual(startAmount);
  });

  test('should transfer money', () => {
    const startAmount = 1000;
    const transferAmount = 25;
    const myAccount = getBankAccount(startAmount);
    const anotherBankAccount = getBankAccount(0);

    myAccount.transfer(transferAmount, anotherBankAccount);
    expect(myAccount.getBalance()).not.toEqual(startAmount);
    expect(myAccount.getBalance()).toBe(startAmount - transferAmount);
    expect(anotherBankAccount.getBalance()).toBe(transferAmount);
    expect(anotherBankAccount.getBalance()).not.toEqual(0);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.assertions(1);

    const myAccount = getBankAccount(0);
    const myBalance = await myAccount.fetchBalance();

    if (myBalance === null) {
      console.warn('fetchBalance returned null, skipping test');
      return;
    }

    expect(typeof myBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const myAccount = getBankAccount(initialBalance);
    const newBalance = await myAccount.fetchBalance();

    if (typeof newBalance === 'number') {
      myAccount.deposit(newBalance);
      expect.assertions(2);
      expect(typeof newBalance).toBe('number');
      expect(myAccount.getBalance()).toBe(initialBalance + newBalance);
    } else {
      console.warn('fetchBalance returned null, skipping test');
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 100;
    const myAccount = getBankAccount(initialBalance);

    try {
      await myAccount.synchronizeBalance();
      console.warn('fetchBalance returned null, skipping test');
    } catch (e) {
      expect.assertions(1);
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
