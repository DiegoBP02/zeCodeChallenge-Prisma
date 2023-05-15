import { Address, CoverageArea, Partner } from "@prisma/client";

export type IPartner = Partner & {
  coverageArea: CoverageArea;
  address: Address;
};
