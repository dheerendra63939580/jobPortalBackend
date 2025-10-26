import Joi from "joi";
import { jobCategory, jobType } from "../constants/enums.js";

export const jobSchema = Joi.object({
    jobTitle: Joi.string().trim().min(4).max(40).required(),
    companyName: Joi.string().trim().min(6).max(50).required(),
    jobType: Joi.string().valid(...jobType).required(),
    category: Joi.string().valid(...jobCategory).required(),
    vacancies: Joi.number().positive().min(1).required(),
    salaryMin: Joi.number().positive().min(240000).optional(),
    salaryMax: Joi.number().positive().min(240000).optional(),
    location: Joi.string().trim().min(6).max(60).required(),
    education: Joi.string().required(),
    experience: Joi.number().positive().min(.5).required(),
    skills: Joi.string().required(),
    description: Joi.string().min(10).max(200).optional(),
    applicationDeadline: Joi.date().min(new Date()).required()
})