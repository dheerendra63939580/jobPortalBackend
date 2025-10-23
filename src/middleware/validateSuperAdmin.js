import { User } from "../model/userModel.js";
import { ErrorResponse } from "../utils/errorResponse.js";

export const validateSuperAdmin = async (req, res, next) => {
    const superAdmin = await User.findById(req?.userId);
    if(!superAdmin || superAdmin?.role !== "superAdmin")
        return next(new ErrorResponse("Unauthorized access", [], 400));
    next();
}