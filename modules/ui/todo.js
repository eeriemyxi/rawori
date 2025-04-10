import React, { useContext, useState } from "react";
import { MdOutlineClose, MdOutlineContentCopy, MdOutlineDone, MdOutlineMoreTime } from "react-icons/md";
import { AppContext } from "../app.js";
export function TodoItemMenu({
  todo,
  setContainerOutlineColor,
  originalColor,
  setIsMenuActive
}) {
  const appContext = useContext(AppContext);
  const onMouseOver = event => {
    setIsMenuActive(true);
    const color = getComputedStyle(event.currentTarget)["background-color"];
    setContainerOutlineColor(color);
  };
  const onMouseOut = event => {
    setIsMenuActive(false);
    setContainerOutlineColor(originalColor);
  };
  const element = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "todo-item-menu-container"
  }, /*#__PURE__*/React.createElement("button", {
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    className: "todo-item-menu-btn todo-item-menu-done-btn",
    onClick: event => appContext.todos.dispatch({
      type: "done",
      name: todo.name
    })
  }, /*#__PURE__*/React.createElement(MdOutlineDone, null)), /*#__PURE__*/React.createElement("button", {
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    className: "todo-item-menu-btn todo-item-menu-close-btn",
    onClick: event => appContext.todos.dispatch({
      type: "cancel",
      name: todo.name
    })
  }, /*#__PURE__*/React.createElement(MdOutlineClose, null)), /*#__PURE__*/React.createElement("button", {
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    className: "todo-item-menu-btn todo-item-menu-stall-btn",
    onClick: event => appContext.todos.dispatch({
      type: "stall",
      name: todo.name
    })
  }, /*#__PURE__*/React.createElement(MdOutlineMoreTime, null)), /*#__PURE__*/React.createElement("button", {
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    className: "todo-item-menu-btn todo-item-menu-copy-content-btn",
    onClick: event => appContext.todos.dispatch({
      type: "copy",
      name: todo.name
    })
  }, /*#__PURE__*/React.createElement(MdOutlineContentCopy, null))));
  return element;
}
export function TodoItem({
  todo
}) {
  const originalColor = "var(--bg2)";
  const [containerIsHovered, setContainerIsHovered] = useState(false);
  const [containerOutlineColor, setContainerOutlineColor] = useState(originalColor);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const menuProps = {
    todo,
    setContainerOutlineColor,
    originalColor,
    setIsMenuActive
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onMouseOver: () => setContainerIsHovered(true),
    onMouseOut: () => setContainerIsHovered(false),
    className: "todo-item-container",
    style: {
      "outline-color": containerIsHovered && !isMenuActive ? "var(--fg)" : containerOutlineColor
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "todo-item-label"
  }, todo.name), /*#__PURE__*/React.createElement(TodoItemMenu, menuProps)));
}
export function TodoList({
  todos
}) {
  const appContext = useContext(AppContext);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "todo-list-container"
  }, Object.entries(appContext.todos.data).map(([name, todo]) => /*#__PURE__*/React.createElement(TodoItem, {
    todo: todo
  }))));
}