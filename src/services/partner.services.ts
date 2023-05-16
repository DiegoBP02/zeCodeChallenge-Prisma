import { Partner, Prisma, PrismaClient } from "@prisma/client";
import { IPartner } from "../dtos/partner.dto";
import {
  Location,
  getCoverage,
  findNearest,
} from "../utils/findNearestPartner.utils";
import { GeolibInputCoordinates } from "geolib/es/types";

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

const findNearestPartner = async (
  lat: string,
  lng: string
): Promise<IPartner | null> => {
  const location: Location = {
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
  };

  const partners = await prisma.partner.findMany({
    include: {
      coverageArea: true,
      address: true,
    },
  });

  let partnerFound: IPartner | null = null;

  const coverage = getCoverage(location, partners);

  if (coverage) {
    if (coverage.length > 1) {
      partnerFound = findNearest(location, coverage);
    } else {
      partnerFound = coverage[0];
    }
  }

  return partnerFound;
};

export { createPartnerService, getPartnerById, findNearestPartner };
