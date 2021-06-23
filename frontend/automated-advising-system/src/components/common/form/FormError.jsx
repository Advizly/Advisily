import React from "react";

function FormError({ error, visible, ...props }) {
  if (!error || !visible) return null;
  return (
    <div style={{ color: "#dc3545" }} className="" {...props}>
      {error}
    </div>
  );
}

export default FormError;
