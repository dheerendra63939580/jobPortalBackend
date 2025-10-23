import { User } from "../model/userModel.js";
import { ErrorResponse } from "../utils/errorResponse.js";

export const validateEmployee = async (req, res, next) => {
    const user = await User.findById(req?.userId);
    if(!user || !(["superAdmin", "admin", "reviewer"].includes(user?.role))) 
        return next(new ErrorResponse("Unauthorized access", [], 400));
    next();
}