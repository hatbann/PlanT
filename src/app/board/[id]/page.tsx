/** @format */

import React from "react";

const BoardDetail = ({ params }: { params: { id: number } }) => {
  return <div>{params.id}</div>;
};

export default BoardDetail;
