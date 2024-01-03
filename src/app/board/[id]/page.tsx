/** @format */
"use client";

import BoardList from "@/components/pages/boardList";
import BoardPlan from "@/components/pages/boardPlan";
import React, { useEffect, useState } from "react";

const BoardDetail = ({ params }: { params: { id: number } }) => {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [spots, setSpots] = useState([]);

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
    <div>
      <div>
        <BoardList data={hotels} title="숙소" />
        <BoardList data={restaurants} title="맛집" />
        <BoardList data={spots} title="관광지" />
      </div>
      <BoardPlan />
    </div>
  );
};

export default BoardDetail;
