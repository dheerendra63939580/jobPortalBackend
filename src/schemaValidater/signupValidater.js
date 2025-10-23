import Joi from "joi";

export const commonSignupSchemaValidater = Joi.object({
    name: Joi.string().trim().min(2).max(20).pattern(/^[A-Za-z ]+$/).required(),
    email: Joi.string().trim().max(40).email().required(),
    password: Joi.string().trim().min(6).max(15).required(),
    phone: Joi.string().trim().min(4).max(13).pattern(/^[0-9]+$/).required(),
    country: Joi.string().trim().max(40).required()
});