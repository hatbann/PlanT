/** @format */

import React, { DragEventHandler, useState } from "react";
import { HotelType, RestuarantType, SpotType } from "@/types/data.types";
import style from "../../styles/components/boardList.module.scss";
import { isHotelType, isRestuarantType } from "@/util/checkType";
import { DragPlanType } from "@/types/plan.types";

const BoardList = ({
  data,
  title,
  setDraggingItem,
}: {
  data: Array<HotelType | RestuarantType | SpotType>;
  title: string;
  setDraggingItem: React.Dispatch<
    React.SetStateAction<DragPlanType | undefined>
  >;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onDragEnd = (
    e: React.DragEvent<HTMLDivElement>,
    item: HotelType | RestuarantType | SpotType
  ) => {
    const info: DragPlanType = {
      x: e.clientX,
      y: e.clientY,
      sort: isHotelType(item)
        ? "HOTEL"
        : isRestuarantType(item)
        ? "RESTUARANT"
        : "SPOT",
      data: item,
    };
    setDraggingItem(info);
  };

  return (
    <div className={style["board-list-container"]}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={style["board-list-title"]}>
        {title}
      </div>
      {isOpen && (
        <div className={style["board-lists"]}>
          {data.map((d, ix) => {
            return (
              <div
                className={style["board-list-detail"]}
                draggable={true}
                onDragEnd={(e) => onDragEnd(e, d)}>
                <span className={style["hover-hide"]}>{d.name}</span>
                <span className={style["hover-show"]}>
                  {isHotelType(d)
                    ? `가격 : ${d.price}`
                    : isRestuarantType(d)
                    ? `종류 : ${d.type}`
                    : `설명 : ${d.desc}`}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BoardList;
