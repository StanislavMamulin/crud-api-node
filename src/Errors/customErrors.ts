import { ErrorMessages } from "./errorMessages.js";
import { RouterCallback, RouterErrorCallback } from "../routers/router.types.js";

enum ErrorCodes {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
};

export class BaseError extends Error {
  message: string;
  code: number;

  constructor(message: string, code: number) {
      super(message);
      this.message = message;
      this.code = code;
  }
}

export class IdNotFoundError extends BaseError {
  constructor(message: string = ErrorMessages.INVALID_URL_ID) {
    super(message, ErrorCodes.BAD_REQUEST);
  }
}
export class IncorrectIdError extends BaseError {
  constructor(message: string = ErrorMessages.INCORRECT_ID) {
    super(message, ErrorCodes.BAD_REQUEST);
  }
}

export class UserNotFoundError extends BaseError {
  constructor(message: string = ErrorMessages.USER_NOT_FOUND) {
    super(message, ErrorCodes.NOT_FOUND);
  }
}

export class ServerInternalError extends BaseError {
  constructor(message: string = ErrorMessages.DEFAULT_SERVER_ERROR) {
    super(message, ErrorCodes.SERVER_ERROR);
  }
};

export class InvalidUrlError extends BaseError {
  constructor(message: string = ErrorMessages.INVALID_URL) {
    super(message, ErrorCodes.NOT_FOUND);
  }
};

export class RequiredParametersNotProvided extends BaseError {
  constructor(message: string = ErrorMessages.PARAMETERS_NOT_PROVIDED) {
    super(message, ErrorCodes.BAD_REQUEST);
  }
};

export const HandleError: RouterErrorCallback = (req, res, err) => {
  if (err instanceof BaseError) {
    res.writeHead(err.code).end(err.message);
  } else {
    const { code, message } = new ServerInternalError();
    res.writeHead(code).end(message);
  }
};