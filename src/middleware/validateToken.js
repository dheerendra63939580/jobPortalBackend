import jwt from "jsonwebtoken"
import { ErrorResponse } from "../utils/errorResponse.js";
export const tokenValidater = async (req, res, next) => {
    const token = (req.headers.authorization)?.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err)
            return next(new ErrorResponse("Unauthorized access", 401));
        else {
            req.userId = decoded?.id;
            next()
        }
    })
} 