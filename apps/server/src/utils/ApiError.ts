class ApiError extends Error {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    errors: string[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: string[] = [],
        data: any = null, // Optional data property for additional context
        stack: string = ""
    ) {
        super(message);

        // Assign values to the properties
        this.statusCode = statusCode;
        this.data = data; // Additional contextual data, useful for Prisma-specific errors
        this.message = message;
        this.success = false;
        this.errors = errors;

        // Capture the stack trace if no stack is provided
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
