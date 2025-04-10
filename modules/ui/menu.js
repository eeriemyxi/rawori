import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
export function Menu({
  setAddTaskPopupOpen
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "menu-container"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setAddTaskPopupOpen(true),
    className: "menu-btn menu-add-btn"
  }, /*#__PURE__*/React.createElement(MdAdd, null))));
}