/** @format */

import { HotelType, RestuarantType, SpotType } from "./data.types";

type PlanSortType = "HOTEL" | "RESTUARANT" | "SPOT";

export type PlanType = {
  date: Date; // 년월일, 시간 모두 포함
  detail?: HotelType | RestuarantType | SpotType;
};

export type DragPlanType = {
  x: number;
  y: number;
  sort: PlanSortType;
  data: HotelType | RestuarantType | SpotType;
};
