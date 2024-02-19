//This class will extend the native built-in express Error 
class AppError extends Error{

    constructor(message, status){
        super();
        this.message = message;
        this.status = status;
    }


}

module.exports = AppError;