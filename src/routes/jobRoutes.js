import express from "express";
import { catchHandler } from "../utils/catchHandler.js";
import { tokenValidater } from "../middleware/validateToken.js";
import { validateRole } from "../middleware/validateRole.js";
import { createJob, getJobListing } from "../controller/job/index.js";
import { validateJob } from "../middleware/validateJob.js";

const router = express.Router();

router.route("/")
.post(
    catchHandler(tokenValidater),
    catchHandler(validateRole(["admin"])),
    catchHandler(validateJob),
    catchHandler(createJob)
)
.get(
    catchHandler(tokenValidater),
    catchHandler(validateRole(["admin", "user"])),
    catchHandler(getJobListing)
)
export default router;