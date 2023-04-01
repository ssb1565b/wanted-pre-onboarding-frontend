import React, { useEffect, useState } from "react";
import { signup } from "./fetch";
export default function Signup() {
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

  useEffect(() => {
    checkCondition();
  }, [values]);

  const checkCondition = () => {
    if (values.email.includes("@") && values.password.length >= 8)
      return setDisable(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await signup({ ...values });
    if (!res) return alert("회원가입에 실패했습니다.");
    alert("회원가입에 성공");
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
