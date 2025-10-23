import { commonSignupSchemaValidater } from "../schemaValidater/signupValidater.js"

export const validateCommonSignup = async (req, res, next) => {
   const {deletePermission, ...rest} = req.body;
   const validatedData = await commonSignupSchemaValidater.validateAsync(rest);
   req.validatedData = validatedData;
   next();
}