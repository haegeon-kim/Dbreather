function createHttpClient(baseUrl: string): HttpClientInstance {
  const requestInterceptors: RequestInterceptor[] = [];
  const responseInterceptors: ResponseInterceptor[] = [];

  async function handleRequest<TResponse, TRequest = unknown>(
    method: string,
    url: string,
    data?: TRequest,
    config: ExtendedRequestInit = {}
  ): Promise<TResponse> {
    const requestConfig: ExtendedRequestInit = {
      ...config,
      method,
      headers: {
        ...(config.headers || {}),
        ...(data ? { "Content-Type": "application/json" } : {}),
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    };

    let finalConfig = requestConfig;
    for (const interceptor of requestInterceptors) {
      finalConfig = await interceptor(finalConfig);
    }

    const response = await fetch(baseUrl + url, finalConfig);

    return responseInterceptors.reduce(
      async (promise, interceptor) => interceptor(await promise),
      Promise.resolve(response)
    ) as Promise<TResponse>;
  }

  return {
    addRequestInterceptor: (interceptor: RequestInterceptor) => {
      requestInterceptors.push(interceptor);
    },

    addResponseInterceptor: (interceptor: ResponseInterceptor) => {
      responseInterceptors.push(interceptor);
    },

    get: <TResponse>(url: string, config?: ExtendedRequestInit) =>
      handleRequest<TResponse>("GET", url, undefined, config),

    post: <TResponse, TRequest = unknown>(
      url: string,
      data?: TRequest,
      config?: ExtendedRequestInit
    ) => handleRequest<TResponse, TRequest>("POST", url, data, config),

    put: <TResponse, TRequest = unknown>(
      url: string,
      data?: TRequest,
      config?: ExtendedRequestInit
    ) => handleRequest<TResponse, TRequest>("PUT", url, data, config),

    patch: <TResponse, TRequest = unknown>(
      url: string,
      data?: TRequest,
      config?: ExtendedRequestInit
    ) => handleRequest<TResponse, TRequest>("PATCH", url, data, config),

    delete: <TResponse>(url: string, config?: ExtendedRequestInit) =>
      handleRequest<TResponse>("DELETE", url, undefined, config),
  };
}

const https = createHttpClient(import.meta.env.VITE_BASE_API_URL);

https.addRequestInterceptor(async (config: ExtendedRequestInit) => {
  if (config.withoutAuth) {
    return config;
  }

  // const accessToken = await getStorage("accessToken");
  const accessToken = "1234";

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
});

https.addResponseInterceptor(async (response) => {
  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
});

export default https;
