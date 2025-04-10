import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

export function Menu({ setAddTaskPopupOpen }) {
  return (
    <>
      <div className="menu-container">
        <button
          onClick={() => setAddTaskPopupOpen(true)}
          className="menu-btn menu-add-btn"
        >
          <MdAdd />
        </button>
      </div>
    </>
  );
}
