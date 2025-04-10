import React, { useContext, useState } from "react";
import {
  MdOutlineClose,
  MdOutlineContentCopy,
  MdOutlineDone,
  MdOutlineMoreTime,
} from "react-icons/md";

import { AppContext } from "../app.js";

export function TodoItemMenu(
  { todo, setContainerOutlineColor, originalColor, setIsMenuActive },
) {
  const appContext = useContext(AppContext);

  const onMouseOver = (event) => {
    setIsMenuActive(true);
    const color = getComputedStyle(event.currentTarget)["background-color"];
    setContainerOutlineColor(color);
  };
  const onMouseOut = (event) => {
    setIsMenuActive(false);
    setContainerOutlineColor(originalColor);
  };

  const element = (
    <>
      <div className="todo-item-menu-container">
        <button
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          className="todo-item-menu-btn todo-item-menu-done-btn"
          onClick={(event) =>
            appContext.todos.dispatch({ type: "done", name: todo.name })}
        >
          <MdOutlineDone />
        </button>
        <button
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          className="todo-item-menu-btn todo-item-menu-close-btn"
          onClick={(event) =>
            appContext.todos.dispatch({ type: "cancel", name: todo.name })}
        >
          <MdOutlineClose />
        </button>
        <button
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          className="todo-item-menu-btn todo-item-menu-stall-btn"
          onClick={(event) =>
            appContext.todos.dispatch({ type: "stall", name: todo.name })}
        >
          <MdOutlineMoreTime />
        </button>
        <button
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          className="todo-item-menu-btn todo-item-menu-copy-content-btn"
          onClick={(event) =>
            appContext.todos.dispatch({ type: "copy", name: todo.name })}
        >
          <MdOutlineContentCopy />
        </button>
      </div>
    </>
  );

  return element;
}

export function TodoItem({ todo }) {
  const originalColor = "var(--bg2)";
  const [containerIsHovered, setContainerIsHovered] = useState(false);
  const [containerOutlineColor, setContainerOutlineColor] = useState(
    originalColor,
  );
  const [isMenuActive, setIsMenuActive] = useState(false);

  const menuProps = {
    todo,
    setContainerOutlineColor,
    originalColor,
    setIsMenuActive,
  };

  return (
    <>
      <div
        onMouseOver={() => setContainerIsHovered(true)}
        onMouseOut={() => setContainerIsHovered(false)}
        className="todo-item-container"
        style={{
          "outline-color": containerIsHovered && !isMenuActive
            ? "var(--fg)"
            : containerOutlineColor,
        }}
      >
        <p className="todo-item-label">{todo.name}</p>
        <TodoItemMenu {...menuProps} />
      </div>
    </>
  );
}

export function TodoList({ todos }) {
  const appContext = useContext(AppContext);

  return (
    <>
      <div className="todo-list-container">
        {Object.entries(appContext.todos.data).map(([name, todo]) => (
          <TodoItem todo={todo}></TodoItem>
        ))}
      </div>
    </>
  );
}
