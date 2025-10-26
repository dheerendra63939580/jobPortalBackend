import { jobSchema } from "../schemaValidater/jobValidater.js";

export const validateJob = async (req, res, next) => {
   const validatedData = await jobSchema.validateAsync(req.body);
   req.validatedData = validatedData;
   next()
}