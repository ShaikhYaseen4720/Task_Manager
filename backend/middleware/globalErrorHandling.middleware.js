import {NODE_ENV} from "../config/config.js"

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "An unexpected internal server error"

    if (statusCode === 500){
        console.log(err)
    }
    else{
        console.log(err)
    }

    return res.status(statusCode).json({
        success : false,
        error : {
            message : message,
            stack : NODE_ENV === 'development' ? err.stack : undefined
        }
    })
}

export  { globalErrorHandler }