import * as geolib from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import { IPartner } from "../dtos/partner.dto";

export type Location = {
  latitude: number;
  longitude: number;
};

const getCoverage = (point: Location, partners: IPartner[]): IPartner[] => {
  const coveragePartners = partners.filter((partner: any) => {
    if (partner?.coverageArea?.coordinates) {
      const coverageDate = partner.coverageArea.coordinates[0][0];
      return isCoverage(point, coverageDate);
    }
    return false;
  });

  return coveragePartners;
};

const findNearest = (
  point: Location,
  partners: IPartner[]
): IPartner | null => {
  let nearestDistance: number | null = null;
  let nearestPartner: IPartner | null = null;

  partners.forEach((partner: IPartner) => {
    const partnerPoint = partner.address.coordinates;
    const distance = geolib.getDistance(
      point,
      partnerPoint as GeolibInputCoordinates
    );

    if (!nearestDistance) {
      nearestDistance = distance;
      nearestPartner = partner;
    }
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestPartner = partner;
    }
  });

  return nearestPartner;
};

const isCoverage = (point: Location, coverageArea: any): boolean => {
  return geolib.isPointInPolygon(point, coverageArea);
};

export { findNearest, getCoverage, isCoverage };
