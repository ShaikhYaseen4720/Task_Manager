class AppError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
        this.isOprational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

class ValidationError extends AppError{
    constructor(message = "Invalid input data"){
        super(message, 422)
    }
}

class ConflictError extends AppError{
    constructor(message = "Resource already exits"){
        super(message, 400)
    }
}


export {
    ValidationError, ConflictError
}