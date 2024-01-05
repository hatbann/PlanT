/** @format */
"use client";

import BoardList from "@/components/pages/boardList";
import BoardPlan from "@/components/pages/boardPlan";
import React, { useEffect, useState } from "react";
import style from "../../../styles/pages/board.module.scss";
import { DragPlanType } from "@/types/plan.types";

const BoardDetail = ({ params }: { params: { id: number } }) => {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [spots, setSpots] = useState([]);
  const [draggingItem, setDraggingItem] = useState<DragPlanType>();

  useEffect(() => {
    fetch("/json/data1.json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setHotels(res["hotel"]);
        setRestaurants(res["restaurant"]);
        setSpots(res["spot"]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className={style["board-container"]}>
      <div className={style["board-lists"]}>
        <BoardList
          data={hotels}
          title="숙소"
          setDraggingItem={setDraggingItem}
        />
        <BoardList
          data={restaurants}
          title="맛집"
          setDraggingItem={setDraggingItem}
        />
        <BoardList
          data={spots}
          title="관광지"
          setDraggingItem={setDraggingItem}
        />
      </div>
      <BoardPlan draggingItem={draggingItem} />
    </div>
  );
};

export default BoardDetail;
