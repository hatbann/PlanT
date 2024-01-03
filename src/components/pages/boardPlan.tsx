/** @format */

import React, { useEffect, useState } from "react";
import style from "../../styles/components/boardPlan.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlanType } from "@/types/plan.types";
import { isHotelType, isRestuarantType } from "@/util/checkType";
import { getDate2digit } from "@/util/getDate";

const BoardPlan = () => {
  const [dates, setDates] = useState<Date[]>([]);
  const [tempdate, SetTempdate] = useState<Date>(new Date());
  const [tempTime, setTempTime] = useState<string>("");
  const [isShowCal, setIsShowCal] = useState<boolean>(false);
  const [isShowSelectTime, setIsShowSelectTime] = useState<boolean>(false);
  const [plans, setPlans] = useState<PlanType[]>([]);

  const sortDates = (date: Date) => {
    const tempDates: Date[] = [...dates, date];
    const orderedDate = tempDates.sort((a, b) => a.getTime() - b.getTime());
    setDates(orderedDate);
  };

  const addTime = () => {};

  return (
    <div className={style["plan-board-container"]}>
      <div
        className={style["plan-add-date"]}
        onClick={() => setIsShowCal(true)}>
        날짜추가
      </div>
      {isShowCal && (
        <DatePicker
          selected={tempdate}
          onChange={(date) => {
            if (date) {
              sortDates(date);
              setIsShowCal(false);
            }
          }}
        />
      )}
      {dates.map((date, idx) => {
        const { year, month, day } = getDate2digit(date);
        return (
          <div className={style["plan"]}>
            <div className={style["plan-date"]}>
              {year}/{month}/{day}
            </div>
            <div>
              {plans.map((plan) => {
                if (date.getDate() === plan.date.getDate()) {
                  return (
                    <div className={style["plan-date-detail"]}>
                      <div className={style["plan-date-detail-time"]}>
                        {plan.date.getHours()} : {plan.date.getMinutes()}
                      </div>
                      <div>
                        {plan.detail.name}(
                        {isHotelType(plan.detail)
                          ? `가격 : ${plan.detail.price}`
                          : isRestuarantType(plan.detail)
                          ? `유형 : ${plan.detail.type}`
                          : plan.detail.desc}
                        )
                      </div>
                    </div>
                  );
                }
              })}
              <div
                className={style["add-time"]}
                onClick={() => {
                  SetTempdate(date);
                  setIsShowSelectTime(true);
                }}>
                + 시간추가
              </div>
            </div>
          </div>
        );
      })}
      {isShowSelectTime && (
        <div className={style["add-time-container"]}>
          <h4>
            {getDate2digit(tempdate).year}/{getDate2digit(tempdate).month}/
            {getDate2digit(tempdate).day}
          </h4>
          <input
            type="time"
            onChange={(e) => {
              setTempTime(e.target.value);
            }}
          />
          <button
            className={style["add-time-cancel-btn"]}
            onClick={() => {
              setIsShowSelectTime(false);
            }}>
            취소
          </button>
          <button className={style["add-time-add-btn"]} onClick={addTime}>
            추가
          </button>
        </div>
      )}
    </div>
  );
};

export default BoardPlan;
