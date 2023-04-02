import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Todo() {
  const navigate = useNavigate();
  const checkJWT = () => {
    if (!localStorage.getItem("JWT")) {
      alert("로그인 후 이용해주세요");
      navigate("/signin");
    }
  };
  useEffect(() => {
    checkJWT();
  }, []);
  return <div>Todo</div>;
}
