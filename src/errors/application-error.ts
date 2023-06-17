interface IApplicationError {
  message: string;
  status: number;
}

export default class ApplicationError extends Error implements IApplicationError {
  public message: string;

  public status: number;

  constructor({ message, status }: Partial<IApplicationError> = {}) {
    super();
    this.message = message || 'ApplicationError';
    this.status = status || 500;
  }
}
