// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const write = process.stdout.write;
    process.stdout.write = jest.fn(); // replace console output with a spy function

    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
    expect(process.stdout.write).not.toHaveBeenCalled(); //means that no console.log has been called

    process.stdout.write = write;
  });

  test('should log correct message to console', () => {
    const write = process.stdout.write;
    const writeMock = jest.fn();

    process.stdout.write = writeMock;

    unmockedFunction();

    const output = writeMock.mock.calls[0][0]; // get console string (first string from first invoke)
    expect(output).toContain('I am not mocked'); // check weather console includes original string

    process.stdout.write = write;
  });
});
