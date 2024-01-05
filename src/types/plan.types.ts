/** @format */

import { HotelType, RestuarantType, SpotType } from "./data.types";

export type PlanType = {
  date: Date; // 년월일, 시간 모두 포함
  detail?: HotelType | RestuarantType | SpotType;
};
