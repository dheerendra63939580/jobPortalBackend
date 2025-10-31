import { User } from "../model/userModel.js"
import { ErrorResponse } from "../utils/errorResponse.js";

export const validateRole = (role) => {
    console.log(role)
    return async (req, res, next) => {
        const user = await User.findById(req?.userId);
        if(!user)
            return next(new ErrorResponse("User does not found", 400));
        if(role.includes(user?.role))
            return next()
        else
            return next(new ErrorResponse("Unauthorized access", 400));
    }
}