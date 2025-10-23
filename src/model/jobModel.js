import mongoose from "mongoose";
import { jobCategory, jobType } from "../constants/enums";

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String
    },
    companyName: {
        type: String
    },
    jobType: {
        type: String,
        enum: jobType
    },
    category: {
        type: String,
        enum: jobCategory
    },
    vacency: {
        type: Number
    },
    minSalary: {
        type: Number
    },
    maxSalary: {
        type: Number
    },
    location: {
        type: String
    },
    education: {
        type: String
    },
    experience: {
        type: Number
    },
    skills: {
        type: [String]
    },
    description: {
        type: String
    },
    deadline: {
        type: Date
    }
})

export const Job = mongoose.model("Job", jobSchema)