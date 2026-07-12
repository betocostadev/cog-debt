export class AppError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class AuthError extends AppError {
  constructor(message: string) {
    super(message)
  }
}

export class TokenExpiredError extends AuthError {
  constructor() {
    super('Token Expired.')
  }
}
