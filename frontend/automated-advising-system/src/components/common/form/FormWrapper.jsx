import React from "react";

function FormWrapper({ title, children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="form-border">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default FormWrapper;
