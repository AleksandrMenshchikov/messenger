const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  headers?: {[x:string]: string}
  method: string;
  data?: {[x: string]: unknown};
  timeout: 5000
};

function queryStringify(data: {[x: string]: unknown}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data && data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
  get = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHODS.GET },
    options.timeout,
  );

  post = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  put = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  delete = (url: string, options:Options) => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  // eslint-disable-next-line class-methods-use-this
  request = (url: string, options: Options, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

const httpTransport = new HTTPTransport();
export default httpTransport;
