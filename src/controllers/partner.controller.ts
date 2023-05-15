import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createPartnerService } from "../services/partner.services";
const prisma = new PrismaClient();

const createPartner = async (req: Request, res: Response) => {
  await prisma.partner.deleteMany();

  const body: Prisma.PartnerCreateInput = req.body;
  const partner = await createPartnerService(body);

  return res.status(201).json(partner);
};

export { createPartner };
