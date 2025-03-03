type RequestInterceptor = (config: ExtendedRequestInit) => Promise<RequestInit>;
type ResponseInterceptor = (response: Response) => Promise<Response>;

interface ExtendedRequestInit extends RequestInit {
  withoutAuth?: boolean;
}

interface HttpClientInstance {
  get: <TResponse>(
    url: string,
    config?: ExtendedRequestInit
  ) => Promise<TResponse>;
  post: <TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: ExtendedRequestInit
  ) => Promise<TResponse>;
  put: <TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: ExtendedRequestInit
  ) => Promise<TResponse>;
  patch: <TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: ExtendedRequestInit
  ) => Promise<TResponse>;
  delete: <TResponse>(
    url: string,
    config?: ExtendedRequestInit
  ) => Promise<TResponse>;
  addRequestInterceptor: (interceptor: RequestInterceptor) => void;
  addResponseInterceptor: (interceptor: ResponseInterceptor) => void;
}
