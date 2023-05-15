import { Router } from "express";
import { createPartner } from "../controllers/partner.controller";
const router = Router();

router.route("/").post(createPartner);

export default router;
