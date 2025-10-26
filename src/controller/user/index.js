import bcrypt from "bcrypt";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { User } from "../../model/userModel.js";
import { SuccessResponse } from "../../utils/successResponse.js";
import { userStatus } from "../../constants/enums.js";

export const createAdmin = async (req, res, next) => {

    const {password, ...rest} = req.validatedData;
    const {deletePermission} = req.body;
    const currentUser = await User.findOne({email: req.validatedData.email});
    if(!!currentUser)
        return next(new ErrorResponse("User with this email already exists", [], 400));
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT));
    const role = "admin";
    console.log(req.validatedData)
    const adminUser = await User.insertOne({...rest, role, password: hashedPassword, deletePermission});
    return res.status(201).json(new SuccessResponse("Account created successfully", {}))
}

export const getSuperAdminMetrics = async (req, res, next) => {

    const metrics = await User.aggregate([
        {
            $group: {
                _id: "$role",
                totalCount: {$sum: 1}
            }
        },
        {
            $group: {
                _id: null,
                mergedData: {$push: {k:"$_id", v:"$totalCount"}}
            }
        },
        {
            $project: {
                _id: 0,
                metrics: {$arrayToObject: "$mergedData"}
            }
        }
    ]);
    const {superAdmin, ...rest} = metrics?.[0]?.metrics;
    return res.status(200).json(new SuccessResponse("Metrics found successfully", rest));

}

export const getAdminListing = async (req, res, next) => {
    const admins = await User.find({role: "admin"}).select({password: 0, education: 0});
    return res.status(200).json(new SuccessResponse("Admin listing found successfully", admins))
}

export const updateAdminStatus = async (req, res, next) => {
    const {status, adminId} = req.body;
    if(!userStatus.includes(status))
        return next(new ErrorResponse("Invalid status value", [], 400));
    const admin = await User.findById(adminId);
    if(!admin || admin?.role !== "admin")
        return next(new ErrorResponse("Invalid admin id", [], 400))
    admin.status = status;
    await admin.save();
    res.status(200).json(new SuccessResponse("Admin status updated successfully", {}))
}

export const deleteAdmin = async (req, res, next) => {
    console.log("delete admin called")
    const {adminId} = req.params;
    const user = await User.findByIdAndDelete(adminId);
    if(!user || user.role !== "admin")
        next(new ErrorResponse("Invalid admin id", [], 400))
    res.status(200).json(new SuccessResponse("Account deleted successfully", {}))
}