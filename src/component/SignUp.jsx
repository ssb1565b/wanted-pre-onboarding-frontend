import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./fetch";
export default function Signup() {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await signup({ ...values });
    console.log("res", res);
    if (res) {
      alert("회원가입에 성공");
      navigate("/signin");
      return;
    }
  };
  return (
    <>
      <h1>회원가입</h1>
      <div>
        <form onSubmit={handleRegister} method="POST">
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
          <button disabled={disable} type="submit" data-testid="signup-button">
            회원가입
          </button>
        </form>
      </div>
    </>
  );
}
