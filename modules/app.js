import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom/client";
import * as ui from "./ui/index.js";
import * as utils from "./utils.js";
const container = document.getElementById("container");
const root = ReactDOM.createRoot(container);
export const AppContext = /*#__PURE__*/createContext(null);
export function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
export function getTodos() {
  return JSON.parse(localStorage.getItem("todos") || "{}");
}
function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      state[action.name] = {
        name: action.name,
        description: action.description
      };
      break;
    case "done":
      // TODO: think of something else to do instead
      delete state[action.name];
      break;
    case "cancel":
      delete state[action.name];
      break;
    case "stall":
      alert("'stall' not implemented yet.");
      break;
    case "copy":
      navigator.clipboard.writeText(action.name);
      break;
  }
  saveTodos(state);

  // React uses Object.is() to know if state changed. We'll have create a
  // new reference to babysit React, sadly.
  return {
    ...state
  };
}
function KeyboardHandler({
  setAddTaskPopupOpen
}) {
  const appCtx = useContext(AppContext);
  useEffect(() => {
    const handleKeyPress = event => {
      const activeElement = document.activeElement;
      if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable) return;
      switch (event.key) {
        case "a":
          setAddTaskPopupOpen(true);
          break;
        case "t":
          appCtx.theme.set(theme => {
            let newTheme = theme == "gruvbox-medium-dark" ? "gruvbox-medium-light" : "gruvbox-medium-dark";
            localStorage.setItem("theme", newTheme);
            return newTheme;
          });
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", null);
}
function App(props) {
  const [addTaskPopupOpen, setAddTaskPopupOpen] = useState(false);
  const [todos, dispatchTodo] = useReducer(todoReducer, getTodos());
  const [activeTheme, setActiveTheme] = useState(localStorage.getItem("theme") || "gruvbox-medium-dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);
  return /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: {
      todos: {
        data: todos,
        dispatch: dispatchTodo
      },
      theme: {
        name: activeTheme,
        set: setActiveTheme
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "base-container"
  }, /*#__PURE__*/React.createElement(KeyboardHandler, {
    setAddTaskPopupOpen: setAddTaskPopupOpen
  }), /*#__PURE__*/React.createElement("h1", {
    className: "title-header"
  }, "Rawori"), utils.isObjEmpty(todos) ? /*#__PURE__*/React.createElement("p", {
    className: "no-tasks-label"
  }, "Add a few tasks first. (tip: try pressing 'a' and 't')") : /*#__PURE__*/React.createElement(ui.todo.TodoList, null), /*#__PURE__*/React.createElement(ui.menu.Menu, {
    setAddTaskPopupOpen: setAddTaskPopupOpen
  }), /*#__PURE__*/React.createElement(ui.popup.Popup, {
    open: addTaskPopupOpen,
    setOpen: setAddTaskPopupOpen,
    element: /*#__PURE__*/React.createElement("div", {
      className: "add-task-popup-container"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "add-task-popup-title"
    }, "Add Task"), /*#__PURE__*/React.createElement("input", {
      className: "add-task-popup-input",
      type: "text",
      placeholder: "Enter Task Name",
      minLength: "1",
      required: true,
      autoFocus: true
    })),
    closeBtnText: "Add Task",
    closeCallback: (s, e, event) => {
      event.preventDefault();
      if (!event.target.checkValidity()) {
        return;
      }
      setAddTaskPopupOpen(false);
      dispatchTodo({
        type: "add",
        name: event.target[0].value.trim()
      });
    }
  })));
}
root.render(/*#__PURE__*/React.createElement(App, null));