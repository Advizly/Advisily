import React from "react";

function Row({ children, className, ...props }) {
  if (!className) className = "";
  return (
    <div className={"row " + className} {...props}>
      {children}
    </div>
  );
}

export default Row;
