export class ErrorResponse extends Error {
    constructor(message, error, statusCode) {
        super(message);
        this.error = error;
        this.status = statusCode;
    }
}