import React from "react";

function ConfirmationDialog({
  buttonType = "button",
  cancelText = "Cancel",
  confirmText = "Confirm",
  title = "title",
  description = "Some description...",
  onConfirm,
  onCancel,
  visible = true,
}) {
  const className = visible
    ? "show d-flex fade modal modal-dialog-centered"
    : "d-none";
  return (
    <>
      <div
        className={className}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body">{description}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onCancel}
              >
                {cancelText}
              </button>
              <button
                type={buttonType}
                className="btn btn-primary"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationDialog;
