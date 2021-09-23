import React from "react";

function Modal({ children }) {
  return (
    <div className="modal" tabindex="-1">
      <div className="modal-dialog">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
