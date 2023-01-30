import authApi from './auth-api';

describe('auth-api', () => {
  test('should return response', async () => {
    const response = await authApi.create({
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
    }) as XMLHttpRequest;

    expect(JSON.parse(response.responseText).reason).toStrictEqual('email is not valid');
  });

  test('should return response', async () => {
    const response = await authApi.request() as XMLHttpRequest;

    expect(JSON.parse(response.responseText).reason).toStrictEqual('Cookie is not valid');
  });

  test('should return response', async () => {
    const response = await authApi.get({
      login: '',
      password: '',
    }) as XMLHttpRequest;

    expect(JSON.parse(response.responseText).reason).toStrictEqual('Login or password is incorrect');
  });

  test('should return response', async () => {
    const response = await authApi.delete() as XMLHttpRequest;

    expect(JSON.parse(response.responseText).reason).toStrictEqual('Cookie is not valid');
  });
});
