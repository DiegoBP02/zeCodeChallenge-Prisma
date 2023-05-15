import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  createPartnerService,
  getPartnerById,
} from "../services/partner.services";
import { IPartner } from "../dtos/partner.dto";
const prisma = new PrismaClient();

const createPartner = async (
  req: Request,
  res: Response
): Promise<Response<IPartner>> => {
  await prisma.partner.deleteMany();

  const body: Prisma.PartnerCreateInput = req.body;
  const partner = await createPartnerService(body);

  return res.status(201).json(partner);
};

const getPartner = async (
  req: Request,
  res: Response
): Promise<Response<IPartner>> => {
  const { id } = req.params;
  const partner = await getPartnerById(id);

  if (!partner) {
    return res
      .status(404)
      .json({ msg: `Partner with ID ${id} not found!`, statusCode: 404 });
  }

  return res.status(200).json(partner);
};

export { createPartner, getPartner };
