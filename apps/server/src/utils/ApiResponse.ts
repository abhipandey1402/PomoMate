class ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: T, message: string = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // Success if statusCode is less than 400
    }
}

export { ApiResponse };