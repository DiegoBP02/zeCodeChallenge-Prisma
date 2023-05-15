import { Prisma, PrismaClient } from "@prisma/client";
import { IPartner } from "../dtos/partner.dto";
const prisma = new PrismaClient();

const createPartnerService = async (
  createPartnerInput: Prisma.PartnerCreateInput
): Promise<IPartner> => {
  const {
    address,
    coverageArea,
    document,
    ownerName,
    tradingName,
  }: Prisma.PartnerCreateInput = createPartnerInput;

  const input: Prisma.PartnerCreateInput = {
    tradingName,
    ownerName,
    document,
    coverageArea: {
      create: coverageArea as Prisma.CoverageAreaCreateInput,
    },
    address: {
      create: address as Prisma.AddressCreateInput,
    },
  };

  const partner = await prisma.partner.create({
    data: input,
    include: {
      address: true,
      coverageArea: true,
    },
  });

  return partner;
};

const getPartnerById = async (partnerId: string): Promise<IPartner | null> => {
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    include: {
      coverageArea: true,
      address: true,
    },
  });

  return partner as IPartner;
};

export { createPartnerService, getPartnerById };
