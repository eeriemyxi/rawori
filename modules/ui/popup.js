import React, { useState } from "react";
export function Popup({
  open,
  setOpen,
  element,
  closeBtnText,
  closeCallback,
  handleSubmit
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, open && /*#__PURE__*/React.createElement("div", {
    className: "popup-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "popup-content-container"
  }, /*#__PURE__*/React.createElement("form", {
    className: "popup-content-form",
    onSubmit: event => closeCallback(open, setOpen, event)
  }, /*#__PURE__*/React.createElement("div", {
    className: "popup-subcontent-main-container"
  }, element), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "popup-close-btn"
  }, closeBtnText)))));
}