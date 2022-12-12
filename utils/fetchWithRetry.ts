function fetchWithRetry(
  url: string,
  options: { tries: number; method: string } = { tries: 1, method: "GET" }
): Promise<Response> {
  const { tries } = options;

  function onError(err: any) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return fetch(url, options).catch(onError);
}

fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1");
