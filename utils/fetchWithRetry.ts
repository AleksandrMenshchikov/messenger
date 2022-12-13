// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fetchWithRetry(
  url: string,
  options: { tries: number; method: string } = { tries: 1, method: 'GET' },
): Promise<Response> {
  const { tries } = options;

  function onError(err: unknown) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return fetch(url, options).catch(onError);
}
