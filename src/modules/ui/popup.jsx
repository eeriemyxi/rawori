import React, { useState } from "react";

export function Popup(
  { open, setOpen, element, closeBtnText, closeCallback, handleSubmit },
) {
  return (
    <>
      {open &&
        (
          <div className="popup-container">
            <div className="popup-content-container">
              <form
                className="popup-content-form"
                onSubmit={(event) => closeCallback(open, setOpen, event)}
              >
                <div className="popup-subcontent-main-container">
                  {element}
                </div>
                <button type="submit" className="popup-close-btn">
                  {closeBtnText}
                </button>
              </form>
            </div>
          </div>
        )}
    </>
  );
}
