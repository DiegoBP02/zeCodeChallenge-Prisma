import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createPartnerService = async (
  createPartnerInput: Prisma.PartnerCreateInput
) => {
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

export { createPartnerService };
