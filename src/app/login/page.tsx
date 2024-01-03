/** @format */

import React from "react";
import style from "../../styles/pages/login.module.scss";

const Login = () => {
  return (
    <div className={style["login-container"]}>
      <div className={style["login-form"]}>
        <h2>로그인</h2>
        <div className={style["login-input"]}>
          <label htmlFor="id">아이디</label>
          <input type="text" placeholder="아이디 입력" id="id" />
        </div>
        <div className={style["login-input"]}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" placeholder="비밀번호 입력" id="password" />
        </div>
        <div className={style["login-id-save"]}>
          <label htmlFor="saveid">아이디 저장</label>
          <input type="checkbox" id="saveid" />
        </div>
        <button className={style["login-btn"]}>로그인</button>
      </div>
    </div>
  );
};

export default Login;
