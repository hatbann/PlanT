/** @format */

import React, { useEffect, useRef, useState } from 'react';
import style from '../../styles/components/boardPlan.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DragPlanType, PlanType } from '@/types/plan.types';
import { isHotelType, isRestuarantType } from '@/util/checkType';
import { getDate2digit } from '@/util/getDate';

const BoardPlan = ({
  draggingItem,
}: {
  draggingItem: DragPlanType | undefined;
}) => {
  const planRefs = useRef<HTMLDivElement[]>([]);

  const [dates, setDates] = useState<Date[]>([]);
  const [tempdate, SetTempdate] = useState<Date>(new Date());
  const [tempTime, setTempTime] = useState<string>('');
  const [isShowCal, setIsShowCal] = useState<boolean>(false);
  const [isShowSelectTime, setIsShowSelectTime] = useState<boolean>(false);
  const [plans, setPlans] = useState<PlanType[]>([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tempTotal = 0;
    console.log('adsf');
    plans.map((plan, i) => {
      if (plan.detail && isHotelType(plan.detail)) {
        tempTotal += plan.detail.price;
      }
    });
    setTotal(total);
  }, [plans.length]);

  const sortDates = (date: Date) => {
    const tempDates: Date[] = [...dates, date];
    const orderedDate = tempDates.sort((a, b) => a.getTime() - b.getTime());
    setDates(orderedDate);
  };

  const addTime = () => {
    const { year, month, day } = getDate2digit(tempdate);
    const date = new Date(
      year,
      Number(month),
      Number(day),
      Number(tempTime.substring(0, 2)),
      Number(tempTime.substring(3))
    );

    const tempPlans = [...plans, { date }];
    const orderdPlans = tempPlans.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    setPlans(orderdPlans);
    setIsShowSelectTime(false);
  };

  const addPlanRef = (el: HTMLDivElement, idx: number) => {
    planRefs.current[idx] = el;
  };

  useEffect(() => {
    planRefs.current.map((d, i) => {
      if (d !== null) {
        const { top, bottom, left, right } = d.getBoundingClientRect();
        if (draggingItem) {
          if (
            draggingItem.x <= right &&
            draggingItem.x >= left &&
            draggingItem.y <= bottom &&
            draggingItem.y >= top
          ) {
            const date =
              planRefs.current[i].parentNode?.parentNode?.firstChild
                ?.textContent;
            const time = planRefs.current[i].firstChild?.textContent;

            const tempDate =
              date && time
                ? new Date(
                    Number(date.substring(0, 4)),
                    Number(date.substring(5, 7)),
                    Number(date?.substring(8)),
                    Number(time.substring(0, 2)),
                    Number(time.substring(5))
                  )
                : null;
            if (tempDate) {
              //그 다음요소가 있다면
              if (planRefs.current[i + 1]) {
                const tempPlanArr = plans;
                if (i !== 0) {
                  tempPlanArr.splice(i, 1, {
                    date: tempDate,
                    detail: draggingItem.data,
                  });
                } else {
                  tempPlanArr[0].detail = draggingItem.data;
                }
                setPlans(tempPlanArr);
              } else {
                const tempplan = {
                  date: tempDate,
                  detail: draggingItem.data,
                };
                const tempPlanArr = [...plans];
                tempPlanArr.map((plan, idx) => {
                  if (
                    plan.date.getDate() === tempplan.date.getDate() &&
                    plan.date.getTime() === tempplan.date.getTime()
                  ) {
                    tempPlanArr[idx] = {
                      ...tempPlanArr[idx],
                      detail: tempplan.detail,
                    };
                  }
                });
                setPlans(tempPlanArr);
                // 그냥 plan 맨뒤에 넣기
              }
            }
          }
        }
      }
    });
  }, [draggingItem?.y, draggingItem?.data.name]);

  return (
    <div className={style['plan-board-container']}>
      <div
        className={style['plan-add-date']}
        onClick={() => setIsShowCal(true)}
      >
        날짜추가
      </div>
      {isShowCal && (
        <div className={style['cal-container']}>
          <DatePicker
            selected={tempdate}
            onChange={(date) => {
              if (date) {
                sortDates(date);
                setIsShowCal(false);
              }
            }}
          />
          <div
            className={style['close-cal-btn']}
            onClick={() => {
              setIsShowCal(false);
            }}
          >
            X
          </div>
        </div>
      )}
      {dates.map((date, idx) => {
        const { year, month, day } = getDate2digit(date);
        return (
          <div className={style['plan']}>
            <div className={style['plan-date']}>
              {year}/{month}/{day}
            </div>
            <div className={style['plan-details']}>
              {plans.map((plan, idx) => {
                if (date.getDate() === plan.date.getDate()) {
                  return (
                    <div
                      className={style['plan-date-detail']}
                      ref={(el) => {
                        if (el) addPlanRef(el, idx);
                      }}
                    >
                      <div className={style['plan-date-detail-time']}>
                        {plan.date.getHours()} : {plan.date.getMinutes()}
                      </div>
                      <div>
                        {plan.detail && (
                          <>
                            {plan.detail.name}(
                            {isHotelType(plan.detail)
                              ? `가격 : ${plan.detail.price}`
                              : isRestuarantType(plan.detail)
                              ? `유형 : ${plan.detail.type}`
                              : plan.detail.desc}
                            )
                          </>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
              <div
                className={style['add-time']}
                onClick={() => {
                  SetTempdate(date);
                  setIsShowSelectTime(true);
                }}
              >
                + 시간추가
              </div>
            </div>
          </div>
        );
      })}
      {isShowSelectTime && (
        <div className={style['add-time-container']}>
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
            className={style['add-time-cancel-btn']}
            onClick={() => {
              setIsShowSelectTime(false);
            }}
          >
            취소
          </button>
          <button className={style['add-time-add-btn']} onClick={addTime}>
            추가
          </button>
        </div>
      )}
      {plans.length !== 0 && (
        <div className={style['total-container']}>
          <div>총액</div>
          <div>{total}</div>
        </div>
      )}
    </div>
  );
};

export default BoardPlan;
