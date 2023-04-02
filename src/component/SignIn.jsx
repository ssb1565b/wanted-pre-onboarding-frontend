import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "./fetch";

export default function Signin() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const checkCondition = () => {
    if (values.email.includes("@") && values.password.length >= 8)
      return setDisable(false);
  };

  useEffect(() => {
    checkCondition();
  }, [values]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signin({ ...values });
    if (res) {
      alert("로그인 성공");
      navigate("/todo");
      return;
    }
  };
  return (
    <>
      <h1>로그인</h1>
      <div>
        <form onSubmit={handleLogin} method="POST">
          <label>아이디 </label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="아이디를 입력해주세요"
            data-testid="email-input"
          />
          <br />
          <label>비밀번호 </label>
          <input
            onChange={handleChange}
            type="text"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            data-testid="password-input"
          />
          <br />
          <button disabled={disable} type="submit" data-testid="signin-button">
            로그인
          </button>
        </form>
      </div>
    </>
  );
}
