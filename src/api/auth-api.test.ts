import authApi from './auth-api';

describe('auth-api', () => {
  test('should return response', async () => {
    const response1 = await authApi.create({
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
    }) as XMLHttpRequest;
    expect(JSON.parse(response1.responseText).reason).toStrictEqual('email is not valid');

    const response2 = await authApi.request() as XMLHttpRequest;
    expect(JSON.parse(response2.responseText).reason).toStrictEqual('Cookie is not valid');

    const response4 = await authApi.delete() as XMLHttpRequest;
    expect(JSON.parse(response4.responseText).reason).toStrictEqual('Cookie is not valid');
  });
});
