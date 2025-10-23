import { User } from "../model/userModel.js";
import { ErrorResponse } from "../utils/errorResponse.js";

export const validateAdmin = async (req, res, next) => {
    console.log("come here admin validation")
    let userId;
    const {adminId} = req?.body ?? {};
    console.log(adminId)
    console.log(req.userId)
    console.log(req.params?.adminId)
    userId = adminId ?? req.params?.adminId ?? req.userId;
    const admin = await User.findById(userId);
    if(!admin || admin.role !== "admin")
        return next(new ErrorResponse("Please provide valid admin id", [], 400));
    next()
}