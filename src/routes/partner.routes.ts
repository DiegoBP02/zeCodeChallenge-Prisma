import { Router } from "express";
import {
  createPartner,
  getPartner,
  searchPartner,
} from "../controllers/partner.controller";
const router = Router();

router.route("/").post(createPartner);
router.route("/search").get(searchPartner);
router.route("/:id").get(getPartner);

export default router;
