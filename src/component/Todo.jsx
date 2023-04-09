import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo, getTodo, updateTodo, deleteTodo } from "./fetch";
export default function Todo() {
  const navigate = useNavigate();
  const [value, setValue] = useState({});
  const [modifiyInput, setModifiyInput] = useState({});
  const [modifiyMode, setModifiyMode] = useState(false);
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

  const modifyValue = async (check, todo, id) => {
    const newTodo = {
      todo: todo,
      isCompleted: check,
    };
    const res = await updateTodo(id, jwt, newTodo);
    res && getTodoList() && setModifiyMode(false);
  };

  const handleDelete = async (id) => {
    const res = await deleteTodo(id, jwt);
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
          return (
            <li key={el.id}>
              <label>
                <input
                  onChange={(e) =>
                    modifyValue(e.target.checked, el.todo, el.id)
                  }
                  type="checkbox"
                  checked={el.isCompleted}
                />
                {modifiyMode ? (
                  <input
                    defaultValue={el.todo}
                    onChange={(e) => setModifiyInput(e.target.value)}
                    data-testid="modify-input"
                  />
                ) : (
                  <>
                    <span>{el.todo}</span>
                  </>
                )}
              </label>
              {modifiyMode ? (
                <>
                  <button
                    onClick={() =>
                      modifyValue(el.isCompleted, modifiyInput, el.id)
                    }
                    data-testid="submit-button"
                  >
                    제출
                  </button>
                  <button
                    data-testid="cancel-button"
                    onClick={() => {
                      setModifiyMode((cur) => !cur);
                      setModifiyInput(el.todo);
                    }}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    data-testid="modify-button"
                    onClick={() => setModifiyMode((cur) => !cur)}
                  >
                    수정
                  </button>
                  <button
                    data-testid="delete-button"
                    onClick={() => handleDelete(el.id)}
                  >
                    삭제
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
