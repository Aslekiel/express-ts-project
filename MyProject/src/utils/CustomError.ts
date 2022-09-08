export class CustomError extends Error {

  localData: {
    status: number;
    message: string;
    payload?: object;
  };

  constructor(status: number, message: string, payload: object) {
    super(message);
    this.localData = { status, message, payload };
    console.log([status, message, payload])
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}