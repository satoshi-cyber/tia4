export class StatusError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'StatusError';
    this.status = status;
  }
}

export class AuthError extends StatusError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'AuthError';
  }
}
