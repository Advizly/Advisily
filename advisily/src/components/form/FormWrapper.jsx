import React from "react";

function FormWrapper({ title, children }) {
  return (
    <div className="d-flex justify-content-center ">
      <div className="frame ">
        <h1 className="text-center mb-4 ">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default FormWrapper;
