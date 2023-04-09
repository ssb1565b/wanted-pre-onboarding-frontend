import React, { useEffect, useState, useRef } from "react";
import { createTodo, getTodo, updateTodo, deleteTodo } from "./fetch";

export default function TodoList({ todo, getTodoList, jwt }) {
  const [modifiyInput, setModifiyInput] = useState({});
  const [modifiyMode, setModifiyMode] = useState(false);
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

  return (
    <li key={todo.id}>
      <label>
        <input
          onChange={(e) => modifyValue(e.target.checked, todo.todo, todo.id)}
          type="checkbox"
          checked={todo.isCompleted}
        />
        {modifiyMode ? (
          <input
            defaultValue={todo.todo}
            onChange={(e) => setModifiyInput(e.target.value)}
            data-testid="modify-input"
          />
        ) : (
          <>
            <span>{todo.todo}</span>
          </>
        )}
      </label>
      {modifiyMode ? (
        <>
          <button
            onClick={() => modifyValue(todo.isCompleted, modifiyInput, todo.id)}
            data-testid="submit-button"
          >
            제출
          </button>
          <button
            data-testid="cancel-button"
            onClick={() => {
              setModifiyMode((cur) => !cur);
              setModifiyInput(todo.todo);
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
            onClick={() => handleDelete(todo.id)}
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
}
