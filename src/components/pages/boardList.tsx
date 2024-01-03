/** @format */

import React, { useState } from "react";
import { HotelType, RestuarantType, SpotType } from "@/types/data.types";
import style from "../../styles/components/boardList.module.scss";

const BoardList = ({
  data,
  title,
}: {
  data: Array<HotelType | RestuarantType | SpotType>;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function isHotelType(
    tag: HotelType | RestuarantType | SpotType
  ): tag is HotelType {
    return (tag as HotelType).price !== undefined;
  }

  function isRestuarantType(
    tag: HotelType | RestuarantType | SpotType
  ): tag is RestuarantType {
    return (tag as RestuarantType).type !== undefined;
  }

  console.log(data);

  return (
    <div>
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
              <div className={style["board-list-detail"]}>
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
