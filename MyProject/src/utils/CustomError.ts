export class CustomError extends Error {
  localData: {
    status: number;
    message: string;
  };

  constructor(status: number, message: string) {
    super(message);
    this.localData = { status, message };

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
