import React from "react";

function ErrorMessage({ error, visible, ...props }) {
  if (!error || !visible) return null;
  return (
    <div className="alert alert-danger" {...props}>
      {error}
    </div>
  );
}

export default ErrorMessage;
