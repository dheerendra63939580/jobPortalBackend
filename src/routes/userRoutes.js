import express from "express";
import { validateSuperAdmin } from "../middleware/validateSuperAdmin.js";
import { validateCommonSignup } from "../middleware/validateCommonSignup.js";
import { createAdmin, deleteAdmin, getAdminListing, getSuperAdminMetrics, updateAdminStatus } from "../controller/user/index.js";
import { tokenValidater } from "../middleware/validateToken.js";
import { catchHandler } from "../utils/catchHandler.js";
import { validateEmployee } from "../middleware/validateEmployee.js";
import { validateAdmin } from "../middleware/validateAdmin.js";
const router = express.Router();

router.route("/admin")
.post(
    catchHandler(tokenValidater), 
    catchHandler(validateSuperAdmin),
    catchHandler(validateCommonSignup),
    catchHandler(createAdmin)
)
router.route("/admin/:adminId")
.delete(
    catchHandler(tokenValidater),
    catchHandler(validateSuperAdmin),
    catchHandler(validateAdmin),
    catchHandler(deleteAdmin)
)

router.get(
    "/admin-metrics",
    catchHandler(tokenValidater), 
    catchHandler(validateEmployee),
    catchHandler(getSuperAdminMetrics)
);
router.get(
    "/admin-listing", 
    catchHandler(tokenValidater), 
    catchHandler(validateSuperAdmin),
    catchHandler(getAdminListing)
);

router.patch(
    "/admin-status",
    catchHandler(tokenValidater), 
    catchHandler(validateSuperAdmin),
    catchHandler(validateAdmin),
    catchHandler(updateAdminStatus)
)
export default router;