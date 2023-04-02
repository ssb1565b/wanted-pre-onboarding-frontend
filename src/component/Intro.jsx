import React from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/signin")}>로그인</button>
      <button onClick={() => navigate("/signup")}>회원가입</button>
    </>
  );
}
