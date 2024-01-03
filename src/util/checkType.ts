/** @format */

import { HotelType, RestuarantType, SpotType } from "@/types/data.types";

export function isHotelType(
  tag: HotelType | RestuarantType | SpotType
): tag is HotelType {
  return (tag as HotelType).price !== undefined;
}

export function isRestuarantType(
  tag: HotelType | RestuarantType | SpotType
): tag is RestuarantType {
  return (tag as RestuarantType).type !== undefined;
}

export function isSpotType(
  tag: HotelType | RestuarantType | SpotType
): tag is SpotType {
  return (tag as SpotType).desc !== undefined;
}
