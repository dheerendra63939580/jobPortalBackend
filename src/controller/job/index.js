import { Job } from "../../model/jobModel.js";
import { SuccessResponse } from "../../utils/successResponse.js";

export const createJob = async (req, res, next) => {
    const {userId} = req;
    const job = await Job.insertOne({...req?.validatedData, createBy: userId});
    res.status(201).json(new SuccessResponse("Job created successfully", job));
}

export const getJobListing = async (req, res, next) => {
    const jobs = await Job.find({});
    return res.status(200).json(new SuccessResponse("Jobs found successfully", jobs));
}