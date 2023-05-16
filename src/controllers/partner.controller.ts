import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  createPartnerService,
  findNearestPartner,
  getPartnerById,
} from "../services/partner.services";
import { IPartner } from "../dtos/partner.dto";

const createPartner = async (
  req: Request,
  res: Response
): Promise<Response<IPartner>> => {
  // you can use delete many to test the application without having to provide a different unique document each time
  // await prisma.partner.deleteMany();

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

const searchPartner = async (req: Request, res: Response) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ msg: "Latitute and longitude are required!" });
  }

  const partner = await findNearestPartner(lat as string, lng as string);

  if (!partner) {
    return res.status(404).json({ msg: "No partner found!" });
  }

  return res.status(200).json(partner);
};

export { createPartner, getPartner, searchPartner };
