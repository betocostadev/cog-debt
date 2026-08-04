export class AppError extends Error {
  public statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class AuthError extends AppError {
  constructor(message: string = 'Authentication failed.') {
    super(message, 401)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found.') {
    super(message, 404)
  }
}

export class ServerError extends AppError {
  constructor(message: string = 'Internal server error.') {
    super(message, 500)
  }
}

export class TokenExpiredError extends AuthError {
  constructor() {
    super('Token Expired.')
  }
}
