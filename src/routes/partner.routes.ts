import { Router } from "express";
import { createPartner, getPartner } from "../controllers/partner.controller";
const router = Router();

router.route("/").post(createPartner);
router.route("/:id").get(getPartner);

export default router;
