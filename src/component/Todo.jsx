import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo, getTodo } from "./fetch";
import TodoList from "./TodoList";
export default function Todo() {
  const navigate = useNavigate();
  const [value, setValue] = useState({});

  const [todoList, setTodoList] = useState([]);
  const jwt = localStorage.getItem("JWT");

  const checkJWT = () => {
    if (!localStorage.getItem("JWT")) {
      alert("로그인 후 이용해주세요");
      navigate("/signin");
    }
  };

  const handleValue = (e) => {
    setValue({
      ...value,
      todo: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await createTodo(value, jwt);
    res && getTodoList();
  };

  const getTodoList = async () => {
    const res = await getTodo(jwt);
    setTodoList(res);
  };

  useEffect(() => {
    checkJWT();
    getTodoList();
  }, []);

  return (
    <div>
      <h1>Todo 목록</h1>
      <form onSubmit={handleCreate}>
        <input
          data-testid="new-todo-input"
          type="text"
          name="todo"
          onChange={handleValue}
        />
        <button data-testid="new-todo-add-button" type="submit">
          추가
        </button>
      </form>
      <ul>
        {todoList?.map((el) => {
          return <TodoList todo={el} getTodoList={getTodoList} jwt={jwt} />;
        })}
      </ul>
    </div>
  );
}
