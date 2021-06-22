import React from "react";

function FormError({ error, visible, ...props }) {
  if (!error || !visible) return null;
  return (
    <div className="alert alert-danger" {...props}>
      {error}
    </div>
  );
}

export default FormError;
