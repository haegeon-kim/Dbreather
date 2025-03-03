interface CustomError extends Error {
  statusCode: number;
  error: string;
  title: string;
  message: string;
  resetText: string;
}
