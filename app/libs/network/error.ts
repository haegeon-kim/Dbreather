export default class CustomError extends Error {
  title: string;
  statusCode: number;
  resetText: string;

  constructor(
    statusCode: number,
    title: string,
    message: string,
    resetText: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.title = title;
    this.resetText = resetText;
  }
}

export class UnauthorizedError extends CustomError {
  constructor(
    title: string,
    message: string = '인증이 필요합니다',
    resetText: string = '시작 화면으로 이동하기',
  ) {
    super(401, title, message, resetText);
  }
}

export class ForbiddenError extends CustomError {
  constructor(
    title: string,
    message: string = '접근 권한이 없습니다',
    resetText: string = '시작 화면으로 이동하기',
  ) {
    super(403, title, message, resetText);
  }
}
