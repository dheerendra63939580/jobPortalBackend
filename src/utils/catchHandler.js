import { ErrorResponse } from "./errorResponse.js"

export const catchHandler = (busiFun) => {
    return async (req, res, next) => {
        try {
            await busiFun(req, res, next);
        } catch (error) {
            console.log(error)
            return next(new ErrorResponse("Internal server error", 500))
        }
    }
}