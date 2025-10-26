import express from "express";
import { validateCommonSignup } from "../middleware/validateCommonSignup.js";
import { createAdmin, deleteAdmin, getAdminListing, getSuperAdminMetrics, updateAdminStatus } from "../controller/user/index.js";
import { tokenValidater } from "../middleware/validateToken.js";
import { catchHandler } from "../utils/catchHandler.js";
import { validateRole } from "../middleware/validateRole.js";
const router = express.Router();

router.route("/admin")
.post(
    catchHandler(tokenValidater), 
    catchHandler(validateRole(["superAdmin"])),
    catchHandler(validateCommonSignup),
    catchHandler(createAdmin)
)
router.route("/admin/:adminId")
.delete(
    catchHandler(tokenValidater),
    catchHandler(validateRole(["superAdmin"])),
    catchHandler(deleteAdmin)
)

router.get(
    "/admin-metrics",
    catchHandler(tokenValidater), 
    catchHandler(validateRole(["superAdmin", "admin", "reviewer"])),
    catchHandler(getSuperAdminMetrics)
);
router.get(
    "/admin-listing", 
    catchHandler(tokenValidater), 
    catchHandler(validateRole(["superAdmin"])),
    catchHandler(getAdminListing)
);

router.patch(
    "/admin-status",
    catchHandler(tokenValidater), 
    catchHandler(validateRole(["superAdmin"])),
    catchHandler(updateAdminStatus)
)
export default router;