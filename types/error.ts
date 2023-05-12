export abstract class StatusError extends Error {
  abstract status: number;
}

export class AuthError extends StatusError {
  public status: number = 401;

  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
