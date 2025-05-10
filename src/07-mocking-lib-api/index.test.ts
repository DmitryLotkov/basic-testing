// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

// Моки
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: 'mocked data' }); // axiosClient.get() return Promise.resolve({ data: 'mocked data' })
    const createMock = jest.fn().mockReturnValue({ get: getMock }); //axios.create() return { get: getMock }

    mockedAxios.create.mockImplementation(createMock);

    await throttledGetDataFromApi('/posts/1');

    expect(createMock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: 'mocked data' });
    const createMock = jest.fn().mockReturnValue({ get: getMock });
    const providedUrl = '/posts/1';
    mockedAxios.create.mockImplementation(createMock);

    await throttledGetDataFromApi(providedUrl);

    expect(getMock).toHaveBeenCalledWith(providedUrl);
  });

  test('should return response data', async () => {
    const responseData = { data: 'mocked data' };
    const getMock = jest.fn().mockResolvedValue(responseData);
    const createMock = jest.fn().mockReturnValue({ get: getMock });
    mockedAxios.create.mockImplementation(createMock);
    const providedUrl = '/posts/1';

    const res = await throttledGetDataFromApi(providedUrl);

    expect(res).toBe(responseData.data);
  });
});
